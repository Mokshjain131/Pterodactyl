import React, { useState } from "react";
import "../styles/login.css";
import Navbar from "../components/navbar";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log(
      isSignUp ? "Creating account with:" : "Logging in with:",
      { email, username, password }
    );
    // Add login or signup logic here (API calls)
  };

  return (
    <div className="login-container">
      <Navbar />

      <div className="login-card">
        <h1>{isSignUp ? "Create Account" : "Login"}</h1>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
              />
            </div>
          )}

          {error && <div className="error">{error}</div>}

          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>

        <div className="toggle-link">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Create Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
