import React, { useState } from "react";
import "../styles/investorInputSection.css";

function InvestorInputSection() {
  const [businessIdea, setBusinessIdea] = useState("");
  const [pitch, setPitch] = useState("");

  return (
    <div className="investor-input-container">
      {/* Input Business Idea */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your business idea"
          value={businessIdea}
          onChange={(e) => setBusinessIdea(e.target.value)}
          className="business-input"
        />
      </div>

      {/* AI Generated Pitch Display */}
      <div className="ai-pitch-section">
        <p>AI generated pitch for that idea</p>
      </div>

      {/* Input Your Pitch */}
      <div className="input-section">
        <textarea
          placeholder="Enter your pitch"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          className="pitch-input"
        />
      </div>

      {/* Pitch Review and Investor Matching */}
      <div className="grid-section">
        <div className="pitch-review">
          <p>Pitch Review</p>
        </div>
        <div className="investor-matching">
          <p>Investor Matchmaking</p>
        </div>
      </div>
    </div>
  );
}

export default InvestorInputSection;
