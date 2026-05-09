import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Itinerary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  if (!state) return <p>No data</p>;

  const { itinerary, destination } = state;
  const days = itinerary.split(/Day \d+/i).filter(Boolean);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          setWeatherError("Weather location not found.");
          return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        setWeather({
          city: name,
          country,
          temperature: weatherData.current.temperature_2m,
          wind: weatherData.current.wind_speed_10m,
          code: weatherData.current.weather_code,
        });
      } catch (error) {
        console.error("Weather error:", error);
        setWeatherError("Could not load weather.");
      }
    }

    fetchWeather();
  }, [destination]);

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌤️";
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />

      <div className="container mt-5 pb-5">
        <h2 className="text-white fw-bold text-center mb-4">
          🗺️ Your Trip to {destination}
        </h2>

        <div className="card shadow-lg border-0 mb-5 mx-auto"
          style={{ maxWidth: "700px", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{
            background: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)",
            padding: "18px 25px"
          }}>
            <h4 className="fw-bold mb-0 text-dark">☀️ Current Weather</h4>
          </div>

          <div className="p-4 text-center">
            {weather ? (
              <>
                <h2 className="fw-bold">
                  {getWeatherIcon(weather.code)} {weather.temperature}°C
                </h2>
                <h5 className="text-muted">
                  {weather.city}, {weather.country}
                </h5>
                <p className="mb-0 fw-semibold">
                  Wind Speed: {weather.wind} km/h
                </p>
              </>
            ) : (
              <p className="mb-0 text-muted">
                {weatherError || "Loading weather..."}
              </p>
            )}
          </div>
        </div>

        {days.map((d, i) => {
          const lines = d.split("\n").filter(l => l.trim());

          return (
            <div key={i} className="card shadow-lg border-0 mb-4"
              style={{ borderRadius: "20px", overflow: "hidden" }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "15px 25px"
              }}>
                <h4 className="text-white fw-bold mb-0">📅 Day {i + 1}</h4>
              </div>

              <div className="p-4">
                {lines.map((line, j) => {
                  const isMorning = line.toLowerCase().includes("morning");
                  const isLunch = line.toLowerCase().includes("lunch");
                  const isAfternoon = line.toLowerCase().includes("afternoon");
                  const isDinner = line.toLowerCase().includes("dinner");

                  let icon = "📌";
                  let color = "#f8f9fa";

                  if (isMorning) { icon = "🌅"; color = "#fff3cd"; }
                  if (isLunch) { icon = "🍽️"; color = "#d1ecf1"; }
                  if (isAfternoon) { icon = "☀️"; color = "#d4edda"; }
                  if (isDinner) { icon = "🌙"; color = "#e2d9f3"; }

                  return (
                    <div key={j} className="p-3 mb-3 rounded"
                      style={{ backgroundColor: color }}>
                      <p className="mb-0 fw-semibold">
                        {icon} {line.replace(/^-\s*/, "")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-4">
          <button className="btn btn-light btn-lg px-5 fw-bold"
            style={{ borderRadius: "50px" }}
            onClick={() => navigate("/plan")}>
            ✈️ Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;