import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/investors.css';

function Investors() {
  const services = [
    { id: 1, title: "Pitch Deck Review", description: "AI analyzes your pitch deck and provides detailed feedback to make it more compelling." },
    { id: 2, title: "Investor Matching", description: "Get matched with potential investors based on your industry, stage, and funding needs." },
    { id: 3, title: "Pitch Deck Generator", description: "Create a professional pitch deck with AI-powered suggestions and templates." }
  ];

  return (
    <div className="investors-page">
      <Navbar />
      <main>
        <section className="investors-hero">
          <h1>Fundraising & Investor Support</h1>
          <p>AI-powered tools to help you secure funding and connect with the right investors</p>
        </section>

        <section className="services-section">
          <div className="container">
            <h2>How We Help</h2>
            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Investors;
