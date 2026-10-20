import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MediaGallery from './components/MediaGallery';
import SmileHub from './components/SmileHub';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const containerRef = useRef(null);

  // Stacking deck-of-cards calculation: ensures 100% full section visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateStickyOffsets = () => {
      // On mobile screens, natural flow prevents any overlapping or bottom cut-offs
      if (window.innerWidth <= 768) {
        Array.from(container.children).forEach((child) => {
          child.style.top = '';
        });
        return;
      }

      const headerHeight = 74;
      const vh = window.innerHeight;
      const sections = Array.from(container.children);

      sections.forEach((section, index) => {
        if (index === 0) {
          // Hero section sits flush at top: 0 directly under the header
          section.style.top = '0px';
          return;
        }
        const sectionHeight = section.offsetHeight;
        // If a section is taller than available viewport height, pin when its bottom reaches screen bottom so the user reads full content
        if (sectionHeight > vh - headerHeight) {
          section.style.top = `${vh - sectionHeight}px`;
        } else {
          section.style.top = `${headerHeight}px`;
        }
      });
    };

    updateStickyOffsets();
    window.addEventListener('resize', updateStickyOffsets);

    // Re-check after images/fonts settle
    const t1 = setTimeout(updateStickyOffsets, 300);
    const t2 = setTimeout(updateStickyOffsets, 1000);

    return () => {
      window.removeEventListener('resize', updateStickyOffsets);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <Header />
      <main ref={containerRef} className="deck-stack-container" style={{ flexGrow: 1 }}>
        <Hero />
        <MediaGallery />
        <SmileHub />
        <About />
        <Testimonials />
        <BookingForm />
        <ContactInfo />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
