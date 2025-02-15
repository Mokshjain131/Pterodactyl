// import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/contact.css';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="contact-page">
      <Navbar />
      <main>
        <section className="contact-hero">
          <h1>Get in Touch</h1>
          <p>Have questions? We&apos;re here to help you succeed.</p>
        </section>

        <section className="contact-content">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form-container">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">Send Message</button>
                </form>
              </div>

              <div className="contact-info">
                <h2>Contact Information</h2>
                <div className="info-items">
                  <div className="info-item">
                    <span className="icon">📧</span>
                    <div>
                      <h3>Email</h3>
                      <p>support@startupai.com</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="icon">📱</span>
                    <div>
                      <h3>Phone</h3>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="icon">⏰</span>
                    <div>
                      <h3>Hours</h3>
                      <p>Monday - Friday: 9AM - 6PM</p>
                      <p>Weekend: 10AM - 4PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;




