import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignUp() {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/plan");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="card shadow-lg p-4 border-0" 
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}>
        <h2 className="text-center text-primary fw-bold mb-4">
          Create New Account
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <input className="form-control my-2" placeholder="Full Name"
          onChange={e => setName(e.target.value)} />
        <input className="form-control my-2" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input className="form-control my-2" type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100 mt-3 py-2 fw-bold"
          style={{ borderRadius: "10px" }}
          onClick={handleSignUp}>Sign Up</button>
        <p className="text-center mt-3">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;