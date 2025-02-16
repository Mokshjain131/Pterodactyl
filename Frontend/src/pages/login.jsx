import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/login.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", { email, password, name });

    navigate("/");
  };

  return (
    <div>
      <Navbar />
    <div className="containerLogin">
      <div className="background"></div>
      <div className="formContainer">
        <h1 className="title">{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggleText">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggleLink">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Login;
