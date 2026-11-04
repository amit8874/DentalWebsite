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
import WelcomeVideoModal from './components/WelcomeVideoModal';
import DiwaliOfferModal from './components/DiwaliOfferModal';
import { treatmentsData } from './data/treatmentsData';

export default function App() {
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [isBlogPage, setIsBlogPage] = useState(false);

  // Parse URL hash on mount and on hashchange for deep-linking & back/forward navigation
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/treatment/') || hash.startsWith('#/service/')) {
        const id = hash.replace('#/treatment/', '').replace('#/service/', '').trim();
        if (treatmentsData[id]) {
          setActiveServiceId(id);
          setIsBlogPage(false);
          return;
        }
      }
      if (hash === '#/blog' || hash.startsWith('#/blog')) {
        setIsBlogPage(true);
        setActiveServiceId(null);
        return;
      }
      // If returning to a normal hash or empty hash, clear active service and blog view
      if (!hash.startsWith('#/treatment/') && !hash.startsWith('#/service/') && !hash.startsWith('#/blog')) {
        setActiveServiceId(null);
        setIsBlogPage(false);
      }

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
    setIsBlogPage(false);
    setActiveServiceId(id);
    window.location.hash = `#/treatment/${id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setActiveServiceId(null);
    setIsBlogPage(false);
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (targetHref) => {
    if (targetHref === '#/blog') {
      setActiveServiceId(null);
      setIsBlogPage(true);
      window.location.hash = '#/blog';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (activeServiceId || isBlogPage) {
      setActiveServiceId(null);
      setIsBlogPage(false);
      window.location.hash = targetHref;
      setTimeout(() => {
        if (targetHref === '#home') {
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
    } else {
      if (targetHref === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetHref);
      if (targetElement) {
        const headerOffset = 95;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const handleBookFromBlog = (subject) => {
    setIsBlogPage(false);
    setActiveServiceId(null);
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
    // Show offer image pop up right after video pop up closes
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
        isBlogActive={isBlogPage} 
      />
      
      {isBlogPage ? (
        // Dedicated Multi-Page Blog View
        <main className="blog-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <BlogPage 
            onBack={handleBackToHome}
            onBookAppointment={handleBookFromBlog}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : activeServiceId ? (
        // Dedicated Multi-Page Treatment Detail View
        <main className="treatment-page-wrapper" style={{ flexGrow: 1, minHeight: '80vh' }}>
          <ServiceDetailPage 
            serviceId={activeServiceId} 
            onBack={handleBackToHome}
            onBookService={(serviceName) => {
              setActiveServiceId(null);
              window.location.hash = '#booking';
              setTimeout(() => {
                const bookingEl = document.querySelector('#booking');
                if (bookingEl) {
                  const headerOffset = 95;
                  const elementPosition = bookingEl.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }, 60);
            }}
          />
          <Footer onNavigate={handleNavigateHome} />
        </main>
      ) : (
        // Clean Standard Vertical Page Scroll (No Overlapping Sticky Transition)
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
