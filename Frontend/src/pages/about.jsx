import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <main>
        <section className="about-hero">
          <h1>Why StartupAI Exists</h1>
          <p>Empowering solo founders with AI-driven support and guidance</p>
        </section>

        <section className="mission-section">
          <div className="container">
            <h2>Our Mission</h2>
            <p>We believe that great ideas shouldn&apos;t be limited by lack of resources or support. StartupAI was created to democratize access to high-quality business guidance through the power of artificial intelligence.</p>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <h2>How AI Supports Your Journey</h2>
            <div className="support-grid">
              <div className="support-item">
                <h3>Validation</h3>
                <p>AI analyzes market trends and validates business ideas with data-driven insights.</p>
              </div>
              <div className="support-item">
                <h3>Scaling</h3>
                <p>Get AI-powered recommendations for growth strategies and market expansion.</p>
              </div>
              <div className="support-item">
                <h3>Fundraising</h3>
                <p>AI assists in crafting compelling pitches and connecting with potential investors.</p>
              </div>
              <div className="support-item">
                <h3>Networking</h3>
                <p>Access AI-curated networking opportunities and industry connections.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
