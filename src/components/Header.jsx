import React, { useState, useEffect, useRef } from 'react';
import { Phone, Calendar, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { servicesNavList } from '../data/treatmentsData';

export default function Header({ onNavigateHome, onSelectService, onOpenOffer, activePage = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 160);
  };

  const handleServiceSelect = (e, serviceId) => {
    e.preventDefault();
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    if (onSelectService) {
      onSelectService(serviceId);
    } else if (onNavigateHome) {
      onNavigateHome(`#/treatment/${serviceId}`);
    } else {
      window.location.hash = `#/treatment/${serviceId}`;
    }
  };

  // Lock body scrolling when mobile drawer is open to prevent background from scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

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
    { name: 'Home', href: '#home', page: 'home' },
    { name: 'About Dr. Aditi', href: '#/about', page: 'about' },
    { name: 'Services', href: '#/services', page: 'services' },
    { name: 'Gallery', href: '#/gallery', page: 'gallery' },
    { name: 'Testimonials', href: '#/testimonials', page: 'testimonials' },
    { name: 'Blog', href: '#/blog', page: 'blog' },
    { name: 'Contact', href: '#/contact', page: 'contact' },
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
          {/* Mobile Hamburger Button - Prominently on LEFT SIDE */}
          <button 
            type="button"
            className="mobile-hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>

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
              if (link.page === 'services') {
                const isServicesActive = activePage === 'services' || activePage === 'treatment';
                return (
                  <div 
                    key={link.name} 
                    className={`nav-dropdown-wrapper ${isServicesDropdownOpen ? 'open' : ''}`}
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`nav-link ${isServicesActive ? 'active' : ''} nav-link-dropdown`}
                      aria-expanded={isServicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className={`nav-dropdown-caret ${isServicesDropdownOpen ? 'rotated' : ''}`} />
                    </a>

                    <div className="services-dropdown-menu">
                      <div className="services-dropdown-header">
                        <span className="dropdown-header-title">Our Dental Services</span>
                        <a 
                          href="#/services" 
                          onClick={(e) => handleNavClick(e, link)} 
                          className="dropdown-all-link"
                        >
                          View All (17) →
                        </a>
                      </div>

                      <div className="services-dropdown-grid">
                        {servicesNavList.map((srv) => (
                          <a
                            key={srv.id}
                            href={`#/treatment/${srv.id}`}
                            onClick={(e) => handleServiceSelect(e, srv.id)}
                            className="dropdown-service-item"
                          >
                            <span className="dropdown-bullet">›</span>
                            <span className="dropdown-service-name">{srv.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = activePage === link.page || (link.page === 'home' && (!activePage || activePage === 'home'));
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

            {/* Mobile Call CTA on Right */}
            <a href="tel:09208430808" className="mobile-quick-call-btn" aria-label="Call Clinic">
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Left Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer-portal">
            {/* Backdrop: Blocks background clicks and touches */}
            <div 
              className="mobile-drawer-backdrop animate-fade-in" 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Left Sidebar Drawer */}
            <aside className="mobile-left-sidebar-drawer" aria-label="Mobile Navigation">
              {/* Drawer Top Header with Logo & Close Button */}
              <div className="mobile-drawer-header">
                <div className="drawer-logo-group">
                  <img src="/assets/clinic-logo.png" alt="Dr. Aditi's Dental Clinic" className="drawer-logo" />
                  <div className="drawer-logo-text">
                    <span className="drawer-title">Dr. Aditi's</span>
                    <span className="drawer-sub">Dental Clinic</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Navigation Menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable Drawer Body - SCROLLS FREELY WITH INERTIAL TOUCH SCROLLING */}
              <div className="mobile-drawer-scrollable-body">
                <nav className="mobile-drawer-nav">
                  {navLinks.map((link) => {
                    if (link.page === 'services') {
                      const isServicesActive = activePage === 'services' || activePage === 'treatment';
                      return (
                        <div key={link.name} className="mobile-nav-service-group">
                          <div className="mobile-service-header-row">
                            <a
                              href={link.href}
                              onClick={(e) => handleNavClick(e, link)}
                              className={`mobile-nav-link ${isServicesActive ? 'active' : ''}`}
                            >
                              <span>{link.name}</span>
                            </a>
                            <button
                              type="button"
                              className="mobile-services-accordion-toggle"
                              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                              aria-label="Toggle Services List"
                            >
                              <ChevronDown size={18} className={`mobile-acc-caret ${isMobileServicesOpen ? 'rotated' : ''}`} />
                            </button>
                          </div>

                          {/* Accordion showing all 17 services */}
                          {isMobileServicesOpen && (
                            <div className="mobile-services-accordion-list animate-fade-in">
                              {servicesNavList.map((srv) => (
                                <a
                                  key={srv.id}
                                  href={`#/treatment/${srv.id}`}
                                  onClick={(e) => handleServiceSelect(e, srv.id)}
                                  className="mobile-service-item-link"
                                >
                                  <span className="mobile-bullet">•</span>
                                  <span>{srv.name}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    const isActive = activePage === link.page || (link.page === 'home' && (!activePage || activePage === 'home'));
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

                  {/* Action buttons inside Drawer */}
                  <div className="mobile-drawer-actions">
                    <a href="tel:09208430808" className="btn btn-outline mobile-btn btn-phone">
                      <Phone size={18} />
                      <span>Call Now: 092084 30808</span>
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
            </aside>
          </div>
        )}
      </header>
    </div>
  );
}
