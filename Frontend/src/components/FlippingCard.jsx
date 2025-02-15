import React from "react";
import "../styles/flippingcard.css"; 

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
            <h4>AI-Powered Assistance</h4><br/>
            <p>Struggling to build your startup alone? We've got your back.</p>
            </div>
            
            {/* Back Side */}
            <div className="flip-card-back">
            <h4>Chat with Your AI Advisor</h4><br/>
              <p>Instant guidance, smart strategies, and growth insights.</p>
              
              {/* Chat Button */}
              <button className="flip-button" onClick={() => navigate("/chat")}>
                Start Chat 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
