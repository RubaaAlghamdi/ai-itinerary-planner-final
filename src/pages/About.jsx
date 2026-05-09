import Navbar from "../components/Navbar";

function About() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center pb-5">
        <div className="card shadow-lg p-5 border-0"
          style={{ maxWidth: "800px", width: "100%", borderRadius: "20px" }}>
          <h2 className="text-primary fw-bold text-center mb-2">
            ✈️ About AI Itinerary Planner
          </h2>
          <p className="lead text-center text-muted mb-5">
            Your smart travel companion powered by artificial intelligence
          </p>

          <h4 className="text-primary mb-3">🎯 Our Mission</h4>
          <p>
            AI Itinerary Planner was created to make travel planning
            easy, fast, and personalized. We believe everyone deserves
            a perfect trip without spending hours researching.
          </p>

          <h4 className="text-primary mb-3 mt-4">⚡ How It Works</h4>
          <p>
            Simply enter your destination, budget, interests, and number
            of days. Our AI instantly generates a complete day-by-day
            itinerary tailored just for you!
          </p>

          <h4 className="text-primary mb-3 mt-4">🛠️ Technologies Used</h4>
          <ul>
            <li>React + Vite</li>
            <li>Firebase Authentication</li>
            <li>Google Gemini AI API</li>
            <li>Bootstrap</li>
            <li>React Router</li>
          </ul>

          <h4 className="text-primary mb-3 mt-4">👥 Our Team</h4>
          <div className="row text-center mt-3">
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm border-0"
                style={{ borderRadius: "15px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <div style={{ fontSize: "40px" }}>👩‍💻</div>
                <h5 className="text-white mt-2">Refaa</h5>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm border-0"
                style={{ borderRadius: "15px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <div style={{ fontSize: "40px" }}>🎨</div>
                <h5 className="text-white mt-2">Amani</h5>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm border-0"
                style={{ borderRadius: "15px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <div style={{ fontSize: "40px" }}>🧪</div>
                <h5 className="text-white mt-2">Ruba</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;