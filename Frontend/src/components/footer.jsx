import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>StartupAI</h3>
          <p>Your AI Co-Founder: Smart Support for Solo Entrepreneurs</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/investors">Investors</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/chat">AI Chat</Link></li>
            <li><Link to="/cofounder">AI Co-founder</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@startupai.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 StartupAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
