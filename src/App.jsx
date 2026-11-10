import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyAditiDental from './components/WhyAditiDental';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ServiceDetailPage from './components/ServiceDetailPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import GalleryPage from './components/GalleryPage';
import TestimonialsPage from './components/TestimonialsPage';
import ContactPage from './components/ContactPage';
import WelcomeVideoModal from './components/WelcomeVideoModal';
import DiwaliOfferModal from './components/DiwaliOfferModal';
import { treatmentsData } from './data/treatmentsData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Parse URL hash on mount and on hashchange for deep-linking & back/forward navigation
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#/treatment/') || hash.startsWith('#/service/')) {
        const id = hash.replace('#/treatment/', '').replace('#/service/', '').trim();
        if (treatmentsData[id]) {
          setActiveServiceId(id);
          setCurrentPage('treatment');
          return;
        }
      }

      if (hash === '#/about' || hash.startsWith('#/about')) {
        setCurrentPage('about');
        setActiveServiceId(null);
        return;
      }

      if (hash === '#/services' || hash.startsWith('#/services')) {
        setCurrentPage('services');
        setActiveServiceId(null);
        return;
      }

      if (hash === '#/gallery' || hash.startsWith('#/gallery')) {
        setCurrentPage('gallery');
        setActiveServiceId(null);
        return;
      }

      if (hash === '#/testimonials' || hash.startsWith('#/testimonials')) {
        setCurrentPage('testimonials');
        setActiveServiceId(null);
        return;
      }

      if (hash === '#/blog' || hash.startsWith('#/blog')) {
        setCurrentPage('blog');
        setActiveServiceId(null);
        return;
      }

      if (hash === '#/contact' || hash.startsWith('#/contact')) {
        setCurrentPage('contact');
        setActiveServiceId(null);
        return;
      }

      // Default: main page view
      setCurrentPage('home');
      setActiveServiceId(null);

      // Track page views in Google Analytics across all hash routes
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-V0BLS230GR', {
          page_path: window.location.pathname + (window.location.hash || '')
        });
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleSelectService = (id) => {
    setActiveServiceId(id);
    setCurrentPage('treatment');
    window.location.hash = `#/treatment/${id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setActiveServiceId(null);
    setCurrentPage('home');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (targetHref) => {
    // Dedicated Multi-Page routing
    if (targetHref === '#/about') {
      setActiveServiceId(null);
      setCurrentPage('about');
      window.location.hash = '#/about';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetHref === '#/services') {
      setActiveServiceId(null);
      setCurrentPage('services');
      window.location.hash = '#/services';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetHref === '#/gallery') {
      setActiveServiceId(null);
      setCurrentPage('gallery');
      window.location.hash = '#/gallery';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetHref === '#/testimonials') {
      setActiveServiceId(null);
      setCurrentPage('testimonials');
      window.location.hash = '#/testimonials';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetHref === '#/blog') {
      setActiveServiceId(null);
      setCurrentPage('blog');
      window.location.hash = '#/blog';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetHref === '#/contact') {
      setActiveServiceId(null);
      setCurrentPage('contact');
      window.location.hash = '#/contact';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Navigating back to home or a section on home
    setActiveServiceId(null);
    setCurrentPage('home');
    window.location.hash = targetHref;

    setTimeout(() => {
      if (targetHref === '#home' || !targetHref) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetHref);
      if (targetElement) {
        const headerOffset = 95;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleBookFromBlog = (subject) => {
    setActiveServiceId(null);
    setCurrentPage('home');
    window.location.hash = '#booking';
    setTimeout(() => {
      const bookingEl = document.querySelector('#booking');
      if (bookingEl) {
        const headerOffset = 95;
        const elementPosition = bookingEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 80);
  };

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const handleWelcomeClose = () => {
    setTimeout(() => {
      setIsOfferModalOpen(true);
    }, 200);
  };

  const handleOpenOffer = () => {
    setIsOfferModalOpen(true);
  };

  const handleCloseOffer = () => {
    setIsOfferModalOpen(false);
  };

  return (
    <>
      <WelcomeVideoModal onClose={handleWelcomeClose} />
      <DiwaliOfferModal 
        isOpen={isOfferModalOpen} 
        onClose={handleCloseOffer} 
        onOpenOffer={handleOpenOffer} 
      />
      <Header 
        onNavigateHome={handleNavigateHome} 
        onOpenOffer={handleOpenOffer}
        activePage={currentPage} 
      />
      
      {currentPage === 'about' ? (
        // Dedicated Multi-Page About Doctor View
        <main className="about-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <AboutPage 
            onBack={handleBackToHome}
            onBookAppointment={() => handleNavigateHome('#booking')}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'services' ? (
        // Dedicated Multi-Page All Services View
        <main className="services-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <ServicesPage 
            onBack={handleBackToHome}
            onSelectService={handleSelectService}
            onBookAppointment={() => handleNavigateHome('#booking')}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'gallery' ? (
        // Dedicated Multi-Page Gallery & Video Reels View
        <main className="gallery-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <GalleryPage 
            onBack={handleBackToHome}
            onBookAppointment={() => handleNavigateHome('#booking')}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'testimonials' ? (
        // Dedicated Multi-Page Testimonials & Reviews View
        <main className="testimonials-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <TestimonialsPage 
            onBack={handleBackToHome}
            onBookAppointment={() => handleNavigateHome('#booking')}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'blog' ? (
        // Dedicated Multi-Page Blog View
        <main className="blog-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <BlogPage 
            onBack={handleBackToHome}
            onBookAppointment={handleBookFromBlog}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'contact' ? (
        // Dedicated Multi-Page Contact View
        <main className="contact-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <ContactPage 
            onBack={handleBackToHome}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : currentPage === 'treatment' && activeServiceId ? (
        // Dedicated Multi-Page Treatment Detail View
        <main className="treatment-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <ServiceDetailPage 
            serviceId={activeServiceId} 
            onBack={() => handleNavigateHome('#/services')}
            onBookService={(serviceName) => {
              handleNavigateHome('#booking');
            }}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : (
        // CLEAN STANDARD FULL MAIN HOME PAGE - ALL THINGS REMAIN AS THEY ARE!
        <main className="site-main" style={{ flexGrow: 1 }}>
          <Hero />
          <Services onSelectService={handleSelectService} />
          <WhyAditiDental />
          <About />
          <Testimonials />
          <BookingForm />
          <ContactInfo />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      )}

      <FloatingWhatsApp />
    </>
  );
}
