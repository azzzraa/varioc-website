import React, { useState } from "react"; // React must be imported
import "./Login.css";

function Login() {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "metalSecure2025") {
      localStorage.setItem("isAdmin", "true"); // save login
      window.location.href = "/admin"; // redirect
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// ✅ Export default so App.js can import it
export default Login;
