import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/investors.css';

function Investors() {
  const services = [
    {
      id: 1,
      title: "Pitch Deck Review",
      description: "AI analyzes your pitch deck and provides detailed feedback to make it more compelling.",
      icon: "📊"
    },
    {
      id: 2,
      title: "Investor Matching",
      description: "Get matched with potential investors based on your industry, stage, and funding needs.",
      icon: "🤝"
    },
    {
      id: 3,
      title: "Funding Strategy",
      description: "Receive personalized advice on fundraising strategy and valuation.",
      icon: "💰"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Pitch Deck Generator",
      description: "Create a professional pitch deck with AI-powered suggestions and templates.",
      buttonText: "Create Pitch Deck"
    },
    {
      id: 2,
      title: "Investor Database",
      description: "Access our curated database of investors filtered by industry and investment stage.",
      buttonText: "Browse Investors"
    },
    {
      id: 3,
      title: "Funding Calculator",
      description: "Calculate how much funding you need and get valuation estimates.",
      buttonText: "Calculate Needs"
    }
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
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="resources-section">
          <div className="container">
            <h2>Fundraising Resources</h2>
            <div className="resources-grid">
              {resources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a href="/chat" className="resource-button">{resource.buttonText}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="investors-cta">
          <div className="container">
            <h2>Ready to Start Fundraising?</h2>
            <p>Get AI-powered support for your fundraising journey</p>
            <a href="/chat" className="cta-button">Start Now</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Investors;




