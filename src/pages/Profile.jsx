import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetch("http://localhost/ai-itinerary-planner/backend/get_trips.php")
      .then((res) => res.json())
      .then(async (data) => {
        setTrips(data);

        const weatherResults = {};

        for (const trip of data) {
          try {
            const geoResponse = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                trip.destination
              )}&count=1&language=en&format=json`
            );

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) continue;

            const { latitude, longitude } = geoData.results[0];

            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
            );

            const weather = await weatherResponse.json();

            weatherResults[trip.id] = {
              temperature: weather.current.temperature_2m,
              code: weather.current.weather_code,
            };
          } catch (error) {
            console.error("Weather error:", error);
          }
        }

        setWeatherData(weatherResults);
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost/ai-itinerary-planner/backend/delete_trip.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.message === "Trip deleted successfully") {
        setTrips(trips.filter((trip) => trip.id !== id));
      } else {
        alert("Could not delete trip. Try again.");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Something went wrong while deleting.");
    }
  }

  async function handleFavorite(id, currentFavorite) {
    try {
      const newFavoriteValue = currentFavorite == 1 ? 0 : 1;

      const response = await fetch("http://localhost/ai-itinerary-planner/backend/favorite_trip.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_favorite: newFavoriteValue }),
      });

      const data = await response.json();
      console.log("Favorite response:", data);

      setTrips(
        trips.map((trip) =>
          trip.id === id ? { ...trip, is_favorite: newFavoriteValue } : trip
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  }

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌤️";
  }

  const displayedTrips = showFavoritesOnly
    ? trips.filter((trip) => trip.is_favorite == 1)
    : trips;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />

      <div className="container mt-5 pb-5">
        <div className="card shadow-lg p-4 border-0 mx-auto mb-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
          <div className="text-center mb-4">
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "40px",
              }}
            >
              👤
            </div>

            <h3 className="mt-3 text-primary fw-bold">My Profile</h3>
          </div>

          <div className="mb-3 p-3 bg-light rounded">
            <label className="fw-bold text-muted">Email</label>
            <p className="mb-0 fw-semibold">{currentUser?.email}</p>
          </div>

          <div className="mb-3 p-3 bg-light rounded">
            <label className="fw-bold text-muted">Account Created</label>
            <p className="mb-0 fw-semibold">{currentUser?.metadata?.creationTime}</p>
          </div>

          <div className="mb-3 p-3 bg-light rounded">
            <label className="fw-bold text-muted">Last Sign In</label>
            <p className="mb-0 fw-semibold">{currentUser?.metadata?.lastSignInTime}</p>
          </div>
        </div>

        <h3 className="text-white fw-bold text-center mb-3">💾 Saved Trips</h3>

        <div className="text-center mb-4">
          <button
            className={`btn fw-bold px-4 ${showFavoritesOnly ? "btn-warning" : "btn-light"}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? "⭐ Showing Favorites Only" : "⭐ Favorite Trips Only"}
          </button>
        </div>

        {displayedTrips.length === 0 ? (
          <div className="card p-4 text-center shadow border-0" style={{ borderRadius: "20px" }}>
            <h5>{showFavoritesOnly ? "No favorite trips yet" : "No saved trips yet"}</h5>
            <p className="text-muted mb-0">
              {showFavoritesOnly
                ? "Click the star on a trip to add it to favorites."
                : "Generate a trip to see it here."}
            </p>
          </div>
        ) : (
          <div className="row">
            {displayedTrips.map((trip) => (
              <div className="col-md-6 mb-4" key={trip.id}>
                <div className="card shadow border-0 h-100" style={{ borderRadius: "20px", overflow: "hidden" }}>
                  <img
                    src={`https://picsum.photos/seed/${trip.destination}/600/400`}
                    alt={trip.destination}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      padding: "15px 20px",
                    }}
                  >
                    <h5 className="text-white fw-bold mb-0">
                      {trip.is_favorite == 1 ? "⭐" : "✈️"} {trip.destination}
                    </h5>
                  </div>

                  <div className="card-body">
                    <p><strong>Days:</strong> {trip.days}</p>
                    <p><strong>Budget:</strong> ${trip.budget}</p>
                    <p><strong>Created At:</strong> {trip.created_at}</p>

                    {weatherData[trip.id] && (
                      <div
                        className="p-3 rounded mb-3 text-center"
                        style={{
                          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                        }}
                      >
                        <h5 className="fw-bold mb-1">
                          {getWeatherIcon(weatherData[trip.id].code)}{" "}
                          {weatherData[trip.id].temperature}°C
                        </h5>

                        <p className="mb-0 fw-semibold text-muted">
                          Current Weather in {trip.destination}
                        </p>
                      </div>
                    )}

                    <div
                      className="bg-light p-3 rounded"
                      style={{
                        maxHeight: "180px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        fontSize: "14px",
                      }}
                    >
                      {trip.generated_plan}
                    </div>

                    <button
                      className={`btn w-100 mt-3 fw-bold ${trip.is_favorite == 1 ? "btn-warning" : "btn-outline-warning"}`}
                      onClick={() => handleFavorite(trip.id, trip.is_favorite)}
                    >
                      {trip.is_favorite == 1 ? "⭐ Favorited" : "☆ Add to Favorite"}
                    </button>

                    <button
                      className="btn btn-danger w-100 mt-3 fw-bold"
                      onClick={() => handleDelete(trip.id)}
                    >
                      🗑️ Delete Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;