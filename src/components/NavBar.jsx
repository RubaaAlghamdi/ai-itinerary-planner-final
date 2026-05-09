import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/plan">
        ✈️ AI Itinerary Planner
      </Link>
      <div className="d-flex gap-3 ms-auto">
        <Link className="btn btn-outline-light" to="/">Home</Link>
        <Link className="btn btn-outline-light" to="/plan">Plan Trip</Link>
        <Link className="btn btn-outline-light" to="/profile">Profile</Link>
        <Link className="btn btn-outline-light" to="/about">About Us</Link>
        <button className="btn btn-light" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;