import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useToast } from '../components/Toast';

export default function Home() {
  const addToast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        addToast(data.message || 'Message sent!', 'success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        addToast(data.error || 'Something went wrong.', 'error');
      }
    } catch {
      addToast('Network error. Please try again.', 'error');
    }
    setSending(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>MB Robotics - Moses Brown VEX Robotics Team</title>
        <meta name="description" content="Moses Brown School VEX Robotics Team 1784 - Building a future of engineers through design, construction, and programming." />
        <meta property="og:title" content="Moses Brown Robotics" />
        <meta property="og:description" content="A bright team of engineers and coders competing in VEX Robotics." />
        <meta property="og:image" content="/images/roboticscover.jpeg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Moses Brown Robotics</h1>
          <p className="hero-subtitle">A bright team of engineers and coders.</p>
          <a href="#mission" className="hero-cta">
            Learn More <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* Mission */}
      <section className="section section-dark" id="mission">
        <div className="section-container mission-layout">
          <div className="mission-text">
            <span className="section-label">The Mission</span>
            <h2>Building a Future of Engineers</h2>
            <p>
              Robotics involves the <strong>design, construction, programming, and operation</strong> of robots.
              This is often done as part of a robotics club or team, and can involve participating in competitions
              such as FIRST Robotics or VEX Robotics. Moses Brown currently competes in <strong>VEX Robotics.</strong>
            </p>
          </div>
          <div className="mission-image">
            <img src="/images/vexrobotics.jpeg" alt="VEX Robotics Logo" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-accent" id="features">
        <div className="section-container">
          <span className="section-label">The Features</span>
          <h2>Explore the Moses Brown Robotics Program</h2>
          <div className="features-grid">
            <Link to="/game" className="feature-card">
              <div className="feature-image" style={{ backgroundImage: 'url(/images/HighStakesGame.webp)' }}></div>
              <h3>This Year's Game: High Stakes</h3>
              <p>The 2024-2025 VEX Robotics VRC game challenges teams to score by placing rings on stakes, positioning mobile goals, and climbing.</p>
            </Link>
            <Link to="/team" className="feature-card">
              <div className="feature-image" style={{ backgroundImage: 'url(/images/2023-24TeamMediaDay.JPG)' }}></div>
              <h3>Meet the Team</h3>
              <p>Three teams — 1784X (seniors), 1784Y (juniors), and 1784Z (9th graders) — made up of bright, passionate young engineers.</p>
            </Link>
            <Link to="/ylab" className="feature-card">
              <div className="feature-image" style={{ backgroundImage: 'url(/images/ylab.jpeg)' }}></div>
              <h3>Explore the Y-Lab</h3>
              <p>A 5,000 sq ft makerspace with 3D printers, laser cutters, and woodworking equipment for hands-on learning.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section section-dark" id="contact">
        <div className="section-container contact-layout">
          <div className="contact-form-wrap">
            <span className="section-label">Contact Us</span>
            <h2>Join Our Robotics Journey</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text" id="name" required maxLength={100} placeholder="Your Name"
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" required placeholder="Your Email"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message" rows={5} required maxLength={5000} placeholder="Your Message"
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button type="submit" disabled={sending}>
                {sending ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : 'Send Message'}
              </button>
            </form>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1486.3777207366309!2d-71.39903037472925!3d41.83356399234749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDUwJzAwLjgiTiA3McKwMjMnNTEuNyJX!5e0!3m2!1sen!2sus!4v1728965563085!5m2!1sen!2sus"
              width="100%" height="400" style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen loading="lazy" title="Moses Brown School Location"
            ></iframe>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
