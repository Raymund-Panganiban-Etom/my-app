'use client';
import { useState } from 'react';

export default function ElevatePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset status
    setStatus('');

    // Basic validation
    if (!name.trim()) {
      setStatus('Please enter your name');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setStatus('Please enter a valid email');
      return;
    }
    if (!message.trim()) {
      setStatus('Please enter a message');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (res.ok) {
        setStatus('Thanks! We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (err) {
      setStatus('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false); // Close mobile menu after click
      }
    }
  };

  return (
    <div>
      {/* Header / Navigation */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#hero" className="brand" onClick={handleSmoothScroll}>
            <img
              src="/pics/elevate.jpg"
              alt="Elevate Barbershop Logo"
              style={{ width: '70px', height: '70px', borderRadius: '50%', margin: '10px' }}
            />
            <span className="brand-text">Elevate Barbershop</span>
          </a>

          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>

          <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#hero" onClick={handleSmoothScroll}>Home</a></li>
              <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
              <li><a href="#services" onClick={handleSmoothScroll}>Services</a></li>
              <li><a href="#social-proof" onClick={handleSmoothScroll}>Testimonials</a></li>
              <li><a href="#cta" onClick={handleSmoothScroll}>Get Started</a></li>
              <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>Elevate Your Style 🔥</h1>
            <p className="subheadline">
              Cut with passion, served with heart, Crafted with Perfection 💈❤💯
            </p>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary" onClick={handleSmoothScroll}>
                Send me feedback
              </a>
              <a href="#services" className="btn btn-outline" onClick={handleSmoothScroll}>
                Explore Services
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/pics/kevin.jpg" alt="Barbershop hero visual" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2>About Elevate Barbershop</h2>
            <p>
              We deliver refined grooming with attention to detail—classic cuts,
              modern fades, and beard shaping tailored to your face and lifestyle.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h3>Precision & Craft</h3>
              <p>Every cut follows your natural profile for lasting shape and clean lines.</p>
            </div>
            <div className="feature-card">
              <h3>Friendly</h3>
              <p>Approachable experience</p>
            </div>
            <div className="feature-card">
              <h3>High End Experience</h3>
              <p>Comfortable space, and skilled barber you can trust.</p>
            </div>
          </div>

          <div className="why-choose">
            <h3>Why Choose Us</h3>
            <ul>
              <li>Experienced barbers with a modern approach</li>
              <li>Consistent results backed by client satisfaction</li>
              <li>Clean, welcoming studio in a convenient location</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section alt">
        <div className="container">
          <div className="section-header">
            <h2>Our Services & Products</h2>
            <p>Choose the service & product that fits your style.</p>
          </div>

          <div className="cards-grid">
            <article className="card">
              <img src="/pics/classic cut.jpg" alt="Classic Cut" />
              <div className="card-body">
                <h3>Classic Cut</h3>
                <p>A clean, timeless cut tailored to your face shape.</p>
                <p className="price">Starting at ₱100</p>
                <a href="#contact" className="btn btn-sm btn-primary" onClick={handleSmoothScroll}>
                  Inquire and visit our shop
                </a>
              </div>
            </article>

            <article className="card">
              <img src="/pics/modernfade.jpg" alt="Modern Fade" />
              <div className="card-body">
                <h3>Modern Fade</h3>
                <p>Sharp fades with smooth blends and crisp edges.</p>
                <p className="price">Starting at ₱100</p>
                <a href="#contact" className="btn btn-sm btn-primary" onClick={handleSmoothScroll}>
                  Inquire and visit our shop
                </a>
              </div>
            </article>

            <article className="card">
              <img src="/pics/product.jpg" alt="Hair Products" />
              <div className="card-body">
                <h3>Hair Products</h3>
                <p>
                  Fix Professional Clay Doh,<br />
                  Hair Shaver,<br />
                  Textured Powder,<br />
                  Suake Hair Bald Shadow
                </p>
                <p className="price">Chat with us for pricing</p>
                <a href="#contact" className="btn btn-sm btn-primary" onClick={handleSmoothScroll}>
                  Inquire and visit our shop
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="section">
        <div className="container">
          <div className="section-header">
            <h2>What Clients Say</h2>
            <p>Real experiences from clients who chose Elevate.</p>
          </div>

          <div className="testimonials-grid">
            <blockquote className="testimonial">
              <p>“YO! Salamat man!👊🤩❤️.”</p>
              <footer>— John Angelo Nugoy</footer>
            </blockquote>
            <blockquote className="testimonial">
              <p>“Pag pa tuloy mo dol...to more improve your work.”</p>
              <footer>— Andel Onaicna</footer>
            </blockquote>
            <blockquote className="testimonial">
              <p>“solid💇🏻🔥”</p>
              <footer>— Md Santales</footer>
            </blockquote>
          </div>

          <div className="portfolio-grid">
            <img src="/pics/Screenshot 2025-12-23 072302.png" alt="Client haircut result 1" style={{ height: '400px', width: '400px', objectFit: 'cover' }} />
            <img src="/pics/Screenshot 2025-12-23 072536.png" alt="Client haircut result 2" style={{ height: '400px', width: '400px', objectFit: 'cover' }} />
            <img src="/pics/solidfeedback.jpg" alt="Client feedback screenshot" style={{ height: '400px', width: '400px', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="section cta-section">
        <div className="container cta-inner">
          <h2>Ready to elevate your look?</h2>
          <p>Let us know and visit our barbershop.</p>
          <a href="#contact" className="btn btn-primary btn-lg" onClick={handleSmoothScroll}>
            Contact Us
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section alt">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Contact</h2>
            <p><strong>Phone:</strong> +63 970 344 5427</p>
            <p><strong>Email:</strong> nonoykevin769@gmail.com</p>
            <p><strong>Address:</strong> 📍 Eagle St. Area 2 Sitio Veterans, Brgy. Bagong Silangan, Quezon City</p>

            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61581917488945" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
              <a href="https://www.tiktok.com/@kcfc56" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                TikTok
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit} method="POST">
            <h3>Send us a message</h3>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Juan Dela Cruz"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you need"
                required
                disabled={loading}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p
                className={`form-status ${status.includes('Thanks') || status.includes('shortly') ? 'success' : 'error'}`}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <nav className="footer-links">
            <a href="#hero" onClick={handleSmoothScroll}>Home</a>
            <a href="#services" onClick={handleSmoothScroll}>Services</a>
            <a href="#social-proof" onClick={handleSmoothScroll}>Testimonials</a>
            <a href="#contact" onClick={handleSmoothScroll}>Contact</a>
            {/* <a href="#">Privacy Policy</a> */}
          </nav>
          <p className="copyright">
            &copy; 2025 Elevate Barbershop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}