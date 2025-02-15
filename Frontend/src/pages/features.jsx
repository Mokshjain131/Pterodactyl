// import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/features.css';

function Features() {
  const features = [
    {
      id: 1,
      title: "Validate Business Ideas",
      description: "AI analyzes market feasibility, competition, and potential challenges to validate your startup idea.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Strategic Advice",
      description: "Get AI-powered insights for growth hacking and go-to-market strategies.",
      icon: "💡"
    },
    {
      id: 3,
      title: "Fundraising Support",
      description: "AI helps craft compelling pitches and connects you with potential investors.",
      icon: "💰"
    },
    {
      id: 4,
      title: "Proactive Support",
      description: "AI acts as your business mentor, providing guidance when you need it most.",
      icon: "🤝"
    },
    {
      id: 5,
      title: "Scaling & Automation",
      description: "Optimize your workflow with AI-driven automation and scaling strategies.",
      icon: "📈"
    }
  ];

  return (
    <div className="features-page">
      <Navbar />
      <main>
        <section className="features-hero">
          <h1>AI-Powered Features</h1>
          <p>Everything you need to succeed as a solo founder</p>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              {features.map((feature) => (
                <div key={feature.id} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-cta">
          <div className="container">
            <h2>Ready to Start Your Journey?</h2>
            <p>Get AI-powered support for your startup today</p>
            <a href="/chat" className="cta-button">Try AI Chat Now</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Features;




