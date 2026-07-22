import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        <div className="footer-brand-column">
          <div className="footer-logo-area">
            <img src="/assets/clinic-logo.png" alt="Dr. Aditi's Dental Logo" className="footer-logo" />
            <div className="footer-logo-text">
              <span className="footer-logo-title">Dr. Aditi's</span>
              <span className="footer-logo-sub">Dental & Maxillofacial Clinic</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Led by KGMU alumna Dr. Aditi Mishra, providing premium prosthodontics, aesthetic restorations, 
            implants, and advanced maxillofacial rehabilitation.
          </p>
          <div className="social-links">
            <a 
              href="https://instagram.com/dr_aditis_dental_clinic/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              aria-label="Instagram Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a 
              href="https://maps.app.goo.gl/1ye8ETHSimo9SPKZn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              aria-label="Google Maps Location"
            >
              <MapPin size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-col-title">Quick Links</h4>
          <nav className="footer-nav">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="footer-link">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="footer-link">About Dr. Aditi</a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="footer-link">Services</a>
            <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')} className="footer-link">Testimonials</a>
            <a href="#booking" onClick={(e) => handleNavClick(e, '#booking')} className="footer-link">Book Appointment</a>
          </nav>
        </div>

        <div className="footer-contact-column">
          <h4 className="footer-col-title">Contact</h4>
          <div className="footer-contact-info">
            <div className="footer-contact-row">
              <MapPin size={16} className="footer-contact-icon" />
              <span>Vivek Khand 2, Gomti Nagar, Lucknow</span>
            </div>
            <div className="footer-contact-row">
              <Phone size={16} className="footer-contact-icon" />
              <a href="tel:09208430808" className="footer-link-direct">+91 92084 30808</a>
            </div>
            <div className="footer-contact-row">
              <Mail size={16} className="footer-contact-icon" />
              <a href="mailto:draditisdental@gmail.com" className="footer-link-direct">draditisdental@gmail.com</a>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} Dr. Aditi's Dental & Maxillofacial Clinic. All rights reserved.
          </p>
          <p className="dev-credit">
            Premium Dental Care & Maxillofacial Rehabilitation.
          </p>
        </div>
      </div>
    </footer>
  );
}
