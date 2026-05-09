import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateItinerary } from "../hooks/useGemini";
import Navbar from "../components/Navbar";

function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const options = ["History", "Nature", "Shopping", "Food", "Adventure"];

  function handleInterest(i) {
    setInterests(prev =>
      prev.includes(i)
        ? prev.filter(x => x !== i)
        : [...prev, i]
    );
  }

async function handleGenerate() {
  if (!destination || !budget || !days) {
    alert("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    const result = await generateItinerary(destination, budget, interests, days);

    const response = await fetch("http://localhost/ai-itinerary-planner/backend/save_trip.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: destination,
        days: days,
        budget: budget,
        plan: result,
      }),
    });

    const data = await response.json();
    console.log("Save response:", data);

    navigate("/itinerary", {
      state: {
        itinerary: result,
        destination: destination,
      },
    });
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
  }

  setLoading(false);
}

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg p-4 border-0"
          style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}>
          <h2 className="text-primary text-center mb-4 fw-bold">
            ✈️ Plan Your Trip
          </h2>
          <label className="fw-semibold mb-1">Destination</label>
          <input className="form-control mb-3" placeholder="e.g. Paris"
            onChange={e => setDestination(e.target.value)} />
          <label className="fw-semibold mb-1">Budget ($)</label>
          <input className="form-control mb-3" type="number"
            placeholder="Enter your budget"
            onChange={e => setBudget(e.target.value)} />
          <label className="fw-semibold mb-1">Number of Days</label>
          <input className="form-control mb-3" type="number"
            placeholder="e.g. 5"
            onChange={e => setDays(e.target.value)} />
          <p className="fw-bold mt-3 mb-2">Interests</p>
          <div className="d-flex flex-wrap gap-2">
            {options.map(i => (
              <button key={i} type="button"
                className={`btn ${interests.includes(i) ? "btn-primary" : "btn-outline-primary"} rounded-pill px-3`}
                onClick={() => handleInterest(i)}>
                {i}
              </button>
            ))}
          </div>
          <button className="btn btn-primary mt-4 w-100 py-2 fw-semibold"
            onClick={handleGenerate} disabled={loading}
            style={{ borderRadius: "10px" }}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Generating...
              </>
            ) : "Generate My Plan 🗺️"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;