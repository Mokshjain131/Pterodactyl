import React, { useState } from "react";
import '../styles/login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For sign-up
  const [error, setError] = useState(""); // For error handling

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear error
    console.log(isSignUp ? "Creating account with:" : "Logging in with:", { email, password });
    // Add login or signup logic here (API calls)
  };

  return (
    <div className="login-container">
      <h1>{isSignUp ? "Create Account" : "Login"}</h1>
      
      <form onSubmit={handleSubmit}>
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
  );
};

export default Login;
