import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Dr. Aditi', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Smile Studio', href: '#smile-hub' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="logo-area">
          <img src="/assets/clinic-logo.png" alt="Dr. Aditi's Dental Clinic" className="header-logo" />
          <div className="logo-text">
            <span className="logo-title">Dr. Aditi's</span>
            <span className="logo-subtitle">Dental & Maxillofacial Clinic</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="header-actions">
          <a href="tel:09208430808" className="btn btn-outline btn-phone">
            <Phone size={16} />
            <span>Call Now</span>
          </a>
          <a href="#booking" onClick={(e) => handleNavClick(e, '#booking')} className="btn btn-primary btn-book">
            <Calendar size={16} />
            <span>Book Appointment</span>
          </a>
          
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in">
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="mobile-nav-link"
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-actions">
              <a href="tel:09208430808" className="btn btn-outline mobile-btn">
                <Phone size={16} />
                <span>Call Now</span>
              </a>
              <a 
                href="#booking" 
                onClick={(e) => handleNavClick(e, '#booking')} 
                className="btn btn-primary mobile-btn"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
