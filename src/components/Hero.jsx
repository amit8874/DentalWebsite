import React, { useState, useEffect, useRef } from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    titleMain: 'A better life starts with a',
    titleHighlight: 'beautiful smile',
    description:
      'Experience precision-driven aesthetic dentistry and gentle restorative treatments in Lucknow. Led by Dr. Aditi Mishra, Prosthodontist, we ensure honest, conservative care for every generation.',
    subtext: '📍 2/457, Vivek Khand 2, Gomti Nagar, Lucknow',
    images: {
      box1: {
        src: '/assets/dental_chair.png',
        alt: 'Modern Ergonomic Dental Chair Suite',
        tag: 'Modern Dental Chair'
      },
      box2: {
        src: '/assets/client_photo_2.webp',
        alt: 'Sterile Operatory Setup',
        tag: 'Sterile Operatory'
      },
      box3: {
        src: '/assets/client_photo_1.webp',
        alt: "Dr. Aditi's Treatment Suite",
        tag: 'Treatment Suite'
      }
    }
  },
  {
    id: 2,
    titleMain: 'Precision implants &',
    titleHighlight: 'maxillofacial excellence',
    description:
      'Specializing in advanced dental implants, precision dentures, and comprehensive maxillofacial smile rehabilitation. We pair cutting-edge diagnostics with hospital-grade sterilization for painless, enduring comfort.',
    subtext: '📍 2/457, Vivek Khand 2, Gomti Nagar, Lucknow',
    images: {
      box1: {
        src: '/assets/dental-working-2.PNG',
        alt: 'Dr. Aditi Performing Clinical Treatment',
        tag: 'Dental Working'
      },
      box2: {
        src: '/assets/dental-working-3.jpeg',
        alt: 'Advanced Dental Working & Equipment',
        tag: 'Clinical Equipment'
      },
      box3: {
        src: '/assets/IMG_9692.JPG.jpeg',
        alt: 'Dr. Aditi In-Clinic Consultation',
        tag: 'Clinical Consultation'
      }
    }
  }
];

export default function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isContentFading, setIsContentFading] = useState(false);
  const [boxTransitionStep, setBoxTransitionStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentSlide = heroSlides[currentSlideIndex];

  const handleNextSlide = () => {
    setIsContentFading(true);
    setBoxTransitionStep(1);

    setTimeout(() => {
      setBoxTransitionStep(2);
    }, 140);

    setTimeout(() => {
      setBoxTransitionStep(3);
    }, 280);

    setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
      setIsContentFading(false);
      setBoxTransitionStep(0);
    }, 480);
  };

  const goToSlide = (index) => {
    if (index === currentSlideIndex) return;
    setIsContentFading(true);
    setBoxTransitionStep(1);
    setTimeout(() => setBoxTransitionStep(2), 140);
    setTimeout(() => setBoxTransitionStep(3), 280);

    setTimeout(() => {
      setCurrentSlideIndex(index);
      setIsContentFading(false);
      setBoxTransitionStep(0);
    }, 480);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlideIndex, isPaused]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 95;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container hero-container animate-fade-in">
        {/* Left Side: Animated Rotating Content */}
        <div className={`hero-content ${isContentFading ? 'content-fading' : 'content-active'}`}>
          <h1 className="hero-title">
            {currentSlide.titleMain} <br />
            <span className="text-highlight">{currentSlide.titleHighlight}</span>
          </h1>

          <p className="hero-desc">
            {currentSlide.description}
          </p>

          {/* Screenshot 3-Column Info Box with Brown Border & White Combination */}
          <div className="hero-info-card-wrapper">
            {/* Dark brown blinking decorative dots on left edge */}
            <div className="card-decor-dots" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <span 
                  key={i 
} 
                  className="card-decor-dot" 
                  style={{ animationDelay: `${(i % 6) * 0.16 + Math.floor(i / 6) * 0.08}s` }}
                ></span>
              ))}
            </div>

            <div className="hero-info-card">
              {/* Column 1: Contact us */}
              <a href="tel:09208430808" className="info-card-col">
                <div className="info-icon-badge">
                  <Phone size={20} />
                </div>
                <div className="info-text-group">
                  <h4 className="info-title">Contact us</h4>
                  <p className="info-line">+91 92084 30808</p>
                  <p className="info-line">draditisdental@gmail.com</p>
                </div>
              </a>

              <div className="info-divider"></div>

              {/* Column 2: Our Hours (10-2, 4-7) */}
              <div className="info-card-col">
                <div className="info-icon-badge">
                  <Clock size={20} />
                </div>
                <div className="info-text-group">
                  <h4 className="info-title">Our Hours</h4>
                  <p className="info-line">Mon – Sat: 10:00am – 2:00pm</p>
                  <p className="info-line">4:00pm – 7:00pm</p>
                </div>
              </div>

              <div className="info-divider"></div>

              {/* Column 3: Location */}
              <a 
                href="https://maps.app.goo.gl/1ye8ETHSimo9SPKZn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="info-card-col"
              >
                <div className="info-icon-badge">
                  <MapPin size={20} />
                </div>
                <div className="info-text-group">
                  <h4 className="info-title">Location</h4>
                  <p className="info-line">2/457, Vivek Khand 2, Gomti Nagar</p>
                  <p className="info-line">Lucknow, UP 226010</p>
                </div>
              </a>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="hero-slide-dots">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`hero-slide-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                aria-label={`Switch to Hero Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: 3-Image Collage with Staggered Transition */}
        <div className="hero-collage-wrapper">
          {/* Decorative Dotted Grid Matrix */}
          <div className="collage-decor-dots" aria-hidden="true">
            {[...Array(30)].map((_, i) => (
              <span 
                key={i} 
                className="decor-dot"
                style={{ animationDelay: `${(i % 6) * 0.14 + Math.floor(i / 6) * 0.1}s` }}
              ></span>
            ))}
          </div>

          {/* Decorative Floating Soft Background Shapes */}
          <div className="collage-backdrop-shape shape-top" aria-hidden="true"></div>
          <div className="collage-backdrop-shape shape-bottom" aria-hidden="true"></div>

          <div className="hero-collage-grid">
            {/* Box 1: Large Main Left Image */}
            <div 
              className={`collage-box collage-box-main ${boxTransitionStep >= 1 ? 'box-fading' : 'box-active'}`}
            >
              <img 
                src={currentSlide.images.box1.src} 
                alt={currentSlide.images.box1.alt} 
                className="collage-img" 
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="collage-box-tag">
                <span>{currentSlide.images.box1.tag}</span>
              </div>
            </div>

            {/* Right Column: Top and Bottom Images */}
            <div className="collage-column-right">
              {/* Box 2: Top Right Image */}
              <div 
                className={`collage-box collage-box-top ${boxTransitionStep >= 2 ? 'box-fading' : 'box-active'}`}
              >
                <img 
                  src={currentSlide.images.box2.src} 
                  alt={currentSlide.images.box2.alt} 
                  className="collage-img" 
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="collage-box-tag">
                  <span>{currentSlide.images.box2.tag}</span>
                </div>
              </div>

              {/* Box 3: Bottom Right Image */}
              <div 
                className={`collage-box collage-box-bottom ${boxTransitionStep >= 3 ? 'box-fading' : 'box-active'}`}
              >
                <img 
                  src={currentSlide.images.box3.src} 
                  alt={currentSlide.images.box3.alt} 
                  className="collage-img" 
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="collage-box-tag">
                  <span>{currentSlide.images.box3.tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
