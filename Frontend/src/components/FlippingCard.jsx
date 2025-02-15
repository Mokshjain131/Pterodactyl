import React from "react";
import "../styles/flippingcard.css"; // Ensure correct path

const FlippingCard = () => {
  return (
    <div className="full-width-section">
      {/* Full-width strip */}
      <div className="strip"></div>

      {/* Centered flipping card */}
      <div className="card-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            {/* Front Side */}
            <div className="flip-card-front">
              <h2>Hello World</h2>
            </div>
            
            {/* Back Side */}
            <div className="flip-card-back">
              <h2>Hello World</h2>
              <button className="flip-button">Click Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
