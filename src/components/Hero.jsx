import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Star } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    { src: '/assets/dr-aditi.png', title: 'Dr. Aditi Mishra', sub: 'MDS (KGMU Lucknow)' },
    { src: '/assets/clinic_interior.png', title: 'Modern Reception Lounge', sub: 'Lucknow Center' },
    { src: '/assets/dental_chair.png', title: 'Advanced Treatment Room', sub: 'Safe & Hygienic Setup' },
    { src: '/assets/smile_consultation.png', title: 'Smile Assessment', sub: 'Honest Clinical Advice' },
    { src: '/assets/dental_prosthetic.png', title: 'Custom Prosthetics', sub: 'Precise Maxillofacial Rehab' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector('#booking');
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
    <section id="home" className="hero-section">
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="review-badge">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#C0A070" color="#C0A070" />
              ))}
            </div>
            <span className="review-text">5.0 Star Rated (87+ Patient Reviews)</span>
          </div>
          
          <h1 className="hero-title">
            Complete Dental Care <br />
            <span className="text-highlight">For You & Your Family</span>
          </h1>
          
          <p className="hero-desc">
            Experience premium, precision-driven dental treatments and advanced maxillofacial rehabilitation 
            in Lucknow. Led by <strong>Dr. Aditi Mishra</strong>, a highly trained Prosthodontist and 
            KGMU Alumna, we focus on honest, conservative care without unnecessary procedures.
          </p>
          
          <div className="hero-actions">
            <a href="#booking" onClick={handleScrollToBooking} className="btn btn-secondary btn-lg">
              <Calendar size={18} />
              <span>Book Appointment Now</span>
            </a>
            <a href="tel:09208430808" className="btn btn-outline-gold btn-lg">
              <Phone size={18} />
              <span>Call +91 92084 30808</span>
            </a>
          </div>
          
          <div className="hero-subtext">
            <span>📍 Vivek Khand 2, Gomti Nagar, Lucknow</span>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          {/* Animated pulsing background glow */}
          <div className="hero-glow-aura"></div>
          
          <div className="hero-image-frame">
            <div className="frame-border"></div>
            
            {/* Slideshow element */}
            <div className="hero-slideshow">
              {slideImages.map((slide, index) => (
                <img 
                  key={index}
                  src={slide.src} 
                  alt={slide.title} 
                  className={`hero-slide-img ${index === currentSlide ? 'active' : ''}`} 
                />
              ))}
            </div>
            
            {/* Dynamic text badge overlay */}
            <div className="image-badge">
              <span className="badge-title">{slideImages[currentSlide].title}</span>
              <span className="badge-sub">{slideImages[currentSlide].sub}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
