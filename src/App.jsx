import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MediaGallery from './components/MediaGallery';
import TrustBadges from './components/TrustBadges';
import Services from './components/Services';
import SmileHub from './components/SmileHub';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <MediaGallery />
        <TrustBadges />
        <Services />
        <SmileHub />
        <About />
        <Testimonials />
        <BookingForm />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}
