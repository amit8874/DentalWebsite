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
import WelcomeVideoModal from './components/WelcomeVideoModal';
import DiwaliOfferModal from './components/DiwaliOfferModal';
import { treatmentsData } from './data/treatmentsData';

export default function App() {
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Parse URL hash on mount and on hashchange for deep-linking & back/forward navigation
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/treatment/') || hash.startsWith('#/service/')) {
        const id = hash.replace('#/treatment/', '').replace('#/service/', '').trim();
        if (treatmentsData[id]) {
          setActiveServiceId(id);
          return;
        }
      }
      // If returning to a normal hash or empty hash, clear active service
      if (!hash.startsWith('#/treatment/') && !hash.startsWith('#/service/')) {
        setActiveServiceId(null);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleSelectService = (id) => {
    setActiveServiceId(id);
    window.location.hash = `#/treatment/${id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setActiveServiceId(null);
    window.location.hash = '#services';
    setTimeout(() => {
      const targetElement = document.querySelector('#services');
      if (targetElement) {
        const headerOffset = 95;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateHome = (targetHref) => {
    if (activeServiceId) {
      setActiveServiceId(null);
      window.location.hash = targetHref;
      setTimeout(() => {
        const targetElement = document.querySelector(targetHref);
        if (targetElement) {
          const headerOffset = 95;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const targetElement = document.querySelector(targetHref);
      if (targetElement) {
        const headerOffset = 95;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
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
      <Header onNavigateHome={handleNavigateHome} onOpenOffer={handleOpenOffer} />
      
      {activeServiceId ? (
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
          <Footer />
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
          <Footer />
        </main>
      )}

      <FloatingWhatsApp />
    </>
  );
}
