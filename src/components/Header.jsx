import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ onNavigateHome, onOpenOffer, isBlogActive }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

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
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigateHome) {
      onNavigateHome(link.href);
      return;
    }

    const targetElement = document.querySelector(link.href);
    if (targetElement) {
      const headerOffset = showBanner ? 125 : 95;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTriggerOffer = () => {
    if (onOpenOffer) {
      onOpenOffer();
    } else {
      window.dispatchEvent(new CustomEvent('openOfferModal'));
    }
  };

  return (
    <div className={`site-header-wrapper ${isScrolled ? 'scrolled' : ''} ${showBanner ? 'has-ribbon' : 'no-ribbon'}`}>
      {/* Top Festive Announcement Ribbon - Kept Above Header */}
      {showBanner && (
        <aside 
          className="top-festive-ribbon"
          onClick={handleTriggerOffer}
          role="region"
          aria-label="Festive Promotion Announcement"
        >
          <div className="container festive-ribbon-container">
            <div className="festive-ribbon-left">
              <span className="ribbon-diya" aria-hidden="true">🪔</span>
              <span className="ribbon-badge">FESTIVE OFFER</span>
              <span className="ribbon-text">
                <strong>Flat 30% Off</strong> on Teeth Whitening & Cleaning!
              </span>
              <span className="ribbon-tag-sub">Limited Time</span>
            </div>

            <div className="festive-ribbon-actions">
              <button 
                type="button" 
                className="ribbon-cta-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTriggerOffer();
                }}
              >
                <span>View Offer & Book</span>
                <ArrowRight size={13} />
              </button>
              <button
                type="button"
                className="ribbon-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBanner(false);
                }}
                aria-label="Dismiss banner"
                title="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Navigation Header - Clean Header without 30% link */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, { href: '#home' })} 
            className="logo-area"
          >
            <img src="/assets/clinic-logo.png" alt="Dr. Aditi's Dental Clinic" className="header-logo" />
            <div className="logo-text">
              <span className="logo-title">Dr. Aditi's</span>
              <span className="logo-subtitle">Dental & Maxillofacial Clinic</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = link.href === '#/blog' && isBlogActive;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link ${isActive ? 'active' : ''} ${link.href === '#/blog' ? 'nav-link-blog' : ''}`}
                >
                  <span>{link.name}</span>
                  {link.href === '#/blog' && (
                    <span className="blog-nav-pill-dot" title="Clinical Cases & Guides" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="header-actions">
            <a href="tel:09208430808" className="btn btn-outline btn-phone">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <a 
              href="#booking" 
              onClick={(e) => handleNavClick(e, { href: '#booking' })} 
              className="btn btn-primary btn-book"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </a>
            
            <button 
              className="mobile-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay animate-fade-in">
            <nav className="mobile-nav">
              {navLinks.map((link) => {
                const isActive = link.href === '#/blog' && isBlogActive;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''} ${link.href === '#/blog' ? 'mobile-nav-link-blog' : ''}`}
                  >
                    <span>{link.name}</span>
                    {link.href === '#/blog' && (
                      <span className="mobile-blog-badge">Cases & Insights</span>
                    )}
                  </a>
                );
              })}
              <div className="mobile-actions">
                <a href="tel:09208430808" className="btn btn-outline mobile-btn btn-phone">
                  <Phone size={18} />
                  <span>Call Now</span>
                </a>
                <a 
                  href="#booking" 
                  onClick={(e) => handleNavClick(e, { href: '#booking' })} 
                  className="btn btn-primary mobile-btn btn-book"
                >
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
