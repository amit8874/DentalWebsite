import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

// Custom SVG Icons matching screenshot exactly
const ImplantIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3h10c.6 0 1 .4 1 1v4c0 3-2 5-6 6-4-1-6-3-6-6V4c0-.6.4-1 1-1z" />
    <path d="M10 14v2" />
    <path d="M8 16h8" />
    <path d="M9 18h6" />
    <path d="M10 20h4" />
    <path d="M12 20v2" />
  </svg>
);

const CrownBridgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3l3 2 3-3 3 3 3-2v3H6V3z" />
    <path d="M7 9h10c.8 0 1.5.5 1.8 1.2.9 2.5.2 6.8-2.8 10.8H8C5 17 4.3 12.7 5.2 10.2A2 2 0 0 1 7 9z" />
  </svg>
);

const DenturesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8c0-2.2 3.6-4 8-4s8 1.8 8 4c0 1.5-1.5 2.8-4 3.5V8h-2v3.8c-.6.1-1.3.2-2 .2s-1.4-.1-2-.2V8H8v3.5C5.5 10.8 4 9.5 4 8z" />
    <path d="M4 16c0 2.2 3.6 4 8 4s8-1.8 8-4c0-1.5-1.5-2.8-4-3.5V16h-2v-3.8c-.6-.1-1.3-.2-2-.2s-1.4.1-2 .2V16H8v-3.5C5.5 13.2 4 14.5 4 16z" />
  </svg>
);

const RootCanalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4h10c1 0 2 1 2 2.5 0 2-1 3.5-2 6-1 2.5-.5 7.5-2.5 8.5-1.5.8-2.5-3-2.5-5 0 2-1 5.8-2.5 5-2-1-1.5-6-2.5-8.5-1-2.5-2-4-2-6C5 5 6 4 7 4z" />
    <path d="M12 9v4" />
    <path d="M12 15l-1 3" />
    <path d="M12 15l1 3" />
  </svg>
);

const SmileToothIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4h10c1.2 0 2.2.8 2.6 2 .9 2.7.2 7-2.6 14-2 .5-3.5-3-5-3s-3 3.5-5 3C4.2 13 3.5 8.7 4.4 6 4.8 4.8 5.8 4 7 4z" />
    <path d="M9 10h.01" strokeWidth="3" />
    <path d="M15 10h.01" strokeWidth="3" />
    <path d="M9.5 13.5c1 1 4 1 5 0" />
  </svg>
);

const EyeEarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9s3.5-5 8-5 8 5 8 5-3.5 5-8 5-8-5-8-5z" />
    <circle cx="10" cy="9" r="2.2" />
    <path d="M16 12c1.5-1 4-1 4 2 0 4-3 5-3 8" />
    <path d="M17 15c.5.5 1 1 1 2" />
  </svg>
);

const PreventiveIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h8c1 0 1.8.6 2.1 1.6.7 2.2.1 5.7-2.1 11.4-1.6.4-2.8-2.5-4-2.5s-2.4 2.9-4 2.5C2.8 11.3 2.2 7.8 2.9 5.6A2 2 0 0 1 5 4z" />
    <path d="M18 3l3 3-8 8-3-3 8-8z" />
    <path d="M17 7l2 2" />
  </svg>
);

const DentalXrayIcon = () => (
  <div className="xray-badge-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#000" stroke="#000" strokeWidth="1">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2a10 10 0 0 0-5.77 1.82l2.88 5a4.2 4.2 0 0 1 5.78 0l2.88-5A10 10 0 0 0 12 2z" />
      <path d="M2.5 14.5a10 10 0 0 0 5.2 6.32l2.89-5a4.2 4.2 0 0 1-2.89-5l-5.2 3.68z" />
      <path d="M21.5 14.5a10 10 0 0 1-5.2 6.32l-2.89-5a4.2 4.2 0 0 0 2.89-5l5.2 3.68z" />
    </svg>
  </div>
);

export default function MediaGallery() {
  // 3D Carousel State
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [activeMedia, setActiveMedia] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const stageRef = useRef(null);
  const [translateZ, setTranslateZ] = useState(210);

  // Responsive translateZ calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setTranslateZ(170);
      } else if (window.innerWidth <= 1024) {
        setTranslateZ(200);
      } else {
        setTranslateZ(245);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3D Gallery items (3 Videos, 3 Photos)
  const galleryItems = [
    {
      type: 'photo',
      src: '/assets/client_photo_1.webp',
      title: 'Our Clinic Exterior',
      desc: 'Modern storefront located in Gomti Nagar, Lucknow.'
    },
    {
      type: 'video',
      src: '/assets/client_photo_3.webp',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A',
      title: 'Tour Our Premium Clinic',
      desc: 'Virtual walkthrough of our state-of-the-art clinic spaces.'
    },
    {
      type: 'photo',
      src: '/assets/gallery_microscope.png',
      title: 'Microscope Precision',
      desc: 'Microscopic examination for micro-precision restorations.'
    },
    {
      type: 'video',
      src: '/assets/client_photo_2.webp',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A',
      title: 'Sterile Operatory Setup',
      desc: 'Rigorous hospital-grade sterilization & hygiene protocols.'
    },
    {
      type: 'photo',
      src: '/assets/client_photo_5.webp',
      title: 'Advanced Sterilization',
      desc: 'Autoclave sterilization ensuring total patient safety.'
    },
    {
      type: 'video',
      src: '/assets/client_photo_4.webp',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A',
      title: 'Smile Assessment Consult',
      desc: 'Dr. Aditi explaining personalized smile restorative plans.'
    }
  ];

  const currentSlideIndex = (Math.round(-rotationY / 60) % galleryItems.length + galleryItems.length) % galleryItems.length;

  // Top Category Bar Data (from screenshot)
  const topServiceIcons = [
    { id: 'implants', name: 'Dental Implants', icon: <ImplantIcon /> },
    { id: 'crowns', name: 'Crowns & Bridges', icon: <CrownBridgeIcon /> },
    { id: 'dentures', name: 'Dentures', icon: <DenturesIcon /> },
    { id: 'rootcanal', name: 'Root Canal Care', icon: <RootCanalIcon /> },
    { id: 'smile', name: 'Smile Restoration', icon: <SmileToothIcon /> },
    { id: 'facial', name: 'Facial Prosthesis', icon: <EyeEarIcon /> },
    { id: 'preventive', name: 'Preventive Care', icon: <PreventiveIcon /> },
    { id: 'xray', name: 'Dental X-ray', icon: <DentalXrayIcon /> },
  ];

  // Specialty Care Services (Dark Brown cards in screenshot)
  const specialtyServices = [
    {
      id: 'implants',
      title: 'Dental Implants',
      desc: 'A fixed way to replace missing teeth, planned, placed and restored by Dr Aditi.',
      tag: 'Speciality',
      icon: <ImplantIcon />,
      theme: 'dark',
      details: {
        benefits: [
          'Biocompatible titanium implants for lifetime durability',
          'Prevents jawbone shrinkage and facial sagging',
          'Looks, feels, and functions identical to real natural teeth',
          'Single tooth, multiple teeth, or full arch implant rehabilitation'
        ],
        procedure: 'Comprehensive 3D CBCT bone scan planning followed by micro-incision precision placement and custom zirconium crown restoration.'
      }
    },
    {
      id: 'facial',
      title: 'Maxillofacial Prosthesis',
      desc: 'Custom eye, ear, nose and finger prostheses for patients after surgery or injury.',
      tag: 'Speciality',
      icon: <EyeEarIcon />,
      theme: 'dark',
      details: {
        benefits: [
          'Hand-sculpted medical grade biocompatible silicone',
          'Custom color matched to individual patient skin tones',
          'Anatomical restoration for trauma, cancer recovery, or congenital needs',
          'Secure implant-retained, magnetic, or biocompatible adhesive retention'
        ],
        procedure: 'Detailed impression taking, anatomical wax carving, patient shade customization, and final silicone curing with lifetime care guidance.'
      }
    }
  ];

  // Restore and Replace Services (Beige cards in screenshot)
  const restoreServices = [
    {
      id: 'crowns',
      title: 'Crowns & Bridges',
      desc: 'Restore a damaged tooth or close the gap left by a missing one.',
      icon: <CrownBridgeIcon />,
      theme: 'light',
      details: {
        benefits: [
          'Monolithic Zirconia & E-Max metal-free porcelain crowns',
          'High biting strength and natural translucency',
          'Protects brittle root-canal-treated teeth from fracturing',
          'Custom bridge units to bridge gaps without removable plates'
        ],
        procedure: 'Digital intraoral 3D scanning, minimal conservative tooth prep, and custom CAD/CAM milling for exact bite alignment.'
      }
    },
    {
      id: 'dentures',
      title: 'Dentures',
      desc: 'Complete and partial dentures for people with missing teeth.',
      icon: <DenturesIcon />,
      theme: 'light',
      details: {
        benefits: [
          'Ultra-lightweight acrylic and flexible BPS dentures',
          'Custom tooth alignment for comfortable speech and chewing',
          'Cast partial metal frameworks for strong selective tooth gaps',
          'Implant-supported overdentures for zero slippage'
        ],
        procedure: 'Dynamic functional impression, precise jaw relationship recording, aesthetic teeth try-in, and final delivery with adjustment checks.'
      }
    },
    {
      id: 'smile',
      title: 'Smile Restoration',
      desc: 'Repair damaged teeth and improve how they look and function.',
      icon: <SmileToothIcon />,
      theme: 'light',
      details: {
        benefits: [
          'Digital smile simulation and aesthetic shade analysis',
          'Composite edge-bonding and ultra-thin porcelain veneers',
          'Enamel-conservative techniques preserving natural tooth tissue',
          'Corrects chipping, dark spacing, and uneven worn edges'
        ],
        procedure: 'Aesthetic smile mockup, conservative surface prep if required, and high-gloss multi-layer artistic bonding or veneer cementation.'
      }
    }
  ];

  // Additional detail mapping for top bar items
  const allServiceMap = {
    rootcanal: {
      title: 'Root Canal Care',
      desc: 'Single-sitting, painless root canal therapy to save infected teeth and eliminate toothache.',
      icon: <RootCanalIcon />,
      details: {
        benefits: [
          'Advanced rotary endodontics for pain-free treatment',
          'Saves the natural tooth from extraction',
          'Completed in 1 or 2 quick, comfortable visits'
        ],
        procedure: 'Complete bacterial debridement under magnification followed by hermetic sealing and reinforced crown protection.'
      }
    },
    preventive: {
      title: 'Preventive Care & Cleaning',
      desc: 'Ultrasonic teeth scaling, stain removal, and fluoride therapy to prevent gum disease.',
      icon: <PreventiveIcon />,
      details: {
        benefits: [
          'Removes stubborn plaque and calculus buildup',
          'Stops bleeding gums, bad breath, and periodontal bone loss',
          'Includes enamel polishing and oral hygiene coaching'
        ],
        procedure: 'Gentle ultrasonic piezo scaling, interdental flossing, and high-gloss prophylactic polishing.'
      }
    },
    xray: {
      title: 'Dental Digital X-ray',
      desc: 'Low-radiation instant digital radiography for pinpoint diagnostic accuracy.',
      icon: <DentalXrayIcon />,
      details: {
        benefits: [
          '90% lower radiation than traditional film X-rays',
          'Instant high-definition image on screen within seconds',
          'Detects hidden cavities between teeth and root infections'
        ],
        procedure: 'Gentle digital sensor placement inside the mouth and immediate chairside diagnostic review with Dr. Aditi.'
      }
    }
  };

  // 3D Carousel Drag Handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotationY);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const sensitivity = 0.28;
    setRotationY(startRotation + deltaX * sensitivity);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const nearestIndex = Math.round(rotationY / 60);
    setRotationY(nearestIndex * 60);
  };

  // Autoplay cylinder
  useEffect(() => {
    if (isDragging || activeMedia || selectedService) return;
    const timer = setInterval(() => {
      setRotationY((prev) => prev - 60);
    }, 4500);
    return () => clearInterval(timer);
  }, [isDragging, activeMedia, selectedService]);

  const rotateLeft = () => setRotationY((prev) => prev + 60);
  const rotateRight = () => setRotationY((prev) => prev - 60);

  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const handleSelectTopIcon = (item) => {
    const existing = specialtyServices.find(s => s.id === item.id) 
      || restoreServices.find(s => s.id === item.id)
      || allServiceMap[item.id];
    if (existing) {
      openServiceModal(existing);
    }
  };

  const scrollToBooking = () => {
    setSelectedService(null);
    const targetElement = document.querySelector('#booking');
    if (targetElement) {
      const headerOffset = 95;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="services-gallery-section section-padding">
      {/* Anchor for gallery links as well */}
      <div id="gallery" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }}></div>

      <div className="container services-gallery-container">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN (Desktop) / BOTTOM (Mobile): Services Section */}
        {/* ======================================================== */}
        <div className="services-content-column">
          
          {/* Header matching screenshot */}
          <div className="services-headline-group">
            <h2 className="services-main-title">Services at our clinic</h2>
            <p className="services-main-subtitle">Choose a treatment to see how it works and what to expect</p>
          </div>

          {/* Top Category Icon Bar with images/icons above labels */}
          <div className="service-icons-top-bar">
            {topServiceIcons.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectTopIcon(item)}
                className="service-icon-pill"
                type="button"
                aria-label={`Learn about ${item.name}`}
              >
                <div className="icon-badge-round">
                  {item.icon}
                </div>
                <span className="icon-pill-label">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Group 1: SPECIALTY CARE */}
          <div className="services-group-block">
            <h3 className="group-category-title">SPECIALTY CARE</h3>
            
            <div className="specialty-cards-grid">
              {specialtyServices.map((card) => (
                <div key={card.id} className="service-card-box card-dark-brown">
                  <div className="card-top-header">
                    <span className="card-specialty-pill">{card.tag}</span>
                  </div>

                  <div className="card-body-row">
                    <div className="card-symbol-badge">
                      {card.icon}
                    </div>
                    <div className="card-text-area">
                      <h4 className="card-headline">{card.title}</h4>
                      <p className="card-paragraph">{card.desc}</p>
                      <button 
                        onClick={() => openServiceModal(card)} 
                        className="card-learn-more"
                        type="button"
                      >
                        <span>Learn more</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: RESTORE AND REPLACE */}
          <div className="services-group-block services-group-block-secondary">
            <h3 className="group-category-title">RESTORE AND REPLACE</h3>
            
            <div className="restore-cards-grid">
              {restoreServices.map((card) => (
                <div key={card.id} className="service-card-box card-warm-beige">
                  <div className="card-header-flex">
                    <h4 className="card-headline text-dark-brown">{card.title}</h4>
                    <div className="card-symbol-badge badge-beige">
                      {card.icon}
                    </div>
                  </div>

                  <p className="card-paragraph text-brown-muted">{card.desc}</p>
                  
                  <button 
                    onClick={() => openServiceModal(card)} 
                    className="card-learn-more text-dark-brown"
                    type="button"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>


        {/* ======================================================== */}
        {/* RIGHT COLUMN (Desktop) / TOP (Mobile): 3D Carousel Tour  */}
        {/* ======================================================== */}
        <div className="gallery-3d-column">
          
          <div className="gallery-header-badge">
            <span className="section-tag">Gallery Tour</span>
            <h3 className="gallery-3d-title">Photos & Videos 3D Tour</h3>
            <p className="gallery-3d-desc">
              Drag or swipe the 3D cylinder to tour our clinic & sterilization suites.
            </p>
          </div>

          <div className="carousel-3d-wrapper">
            {/* Shimmering backdrop spot glow */}
            <div className="carousel-glow-backdrop"></div>

            {/* 3D Carousel Cylinder Container */}
            <div className="carousel-3d-container">
              <div 
                ref={stageRef}
                className="carousel-3d-stage"
                style={{ transform: `rotateY(${rotationY}deg)` }}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
              >
                {galleryItems.map((item, index) => {
                  const angle = index * 60;
                  return (
                    <div
                      key={index}
                      className="carousel-3d-item"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`
                      }}
                      onClick={() => setActiveMedia(item)}
                    >
                      <div className="carousel-card-inner">
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="carousel-img" 
                          loading="eager"
                        />
                        
                        <div className="carousel-gradient-overlay"></div>

                        {item.type === 'video' && (
                          <div className="carousel-play-indicator">
                            <div className="play-btn-circle">
                              <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                            </div>
                          </div>
                        )}

                        <div className="carousel-caption">
                          <span className="caption-tag">
                            {item.type === 'video' ? 'Virtual Tour' : 'Photo'}
                          </span>
                          <h4 className="caption-title">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manual Controls & Indicator */}
            <div className="carousel-3d-controls">
              <button 
                onClick={rotateLeft} 
                className="btn-tour-nav" 
                aria-label="Rotate Gallery Left"
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="carousel-3d-instructions">
                Drag cylinder or click views below
              </span>

              <button 
                onClick={rotateRight} 
                className="btn-tour-nav" 
                aria-label="Rotate Gallery Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Quick Scene Selector Buttons */}
            <div className="gallery-quick-nav">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`gallery-nav-dot ${currentSlideIndex === idx ? 'active' : ''}`}
                  onClick={() => setRotationY(-idx * 60)}
                  title={item.title}
                >
                  <span className="dot-number">{idx + 1}</span>
                  <span className="dot-label">{item.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Bottom Highlights & Reassurance */}
            <div className="gallery-trust-strip">
              <div className="trust-badge-item">
                <CheckCircle2 size={13} className="badge-gold-check" />
                <span>360° Operatory Tour</span>
              </div>
              <div className="trust-badge-item">
                <CheckCircle2 size={13} className="badge-gold-check" />
                <span>Autoclave Sterilization</span>
              </div>
              <div className="trust-badge-item">
                <CheckCircle2 size={13} className="badge-gold-check" />
                <span>Private Consultations</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* Lightbox / Video Modal for 3D Carousel Items              */}
      {/* ======================================================== */}
      {activeMedia && (
        <div className="lightbox-overlay" onClick={() => setActiveMedia(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setActiveMedia(null)} 
              aria-label="Close View"
            >
              <X size={26} />
            </button>
            
            {activeMedia.type === 'video' ? (
              <iframe 
                src={activeMedia.videoUrl} 
                title={activeMedia.title}
                className="lightbox-video-frame"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <img 
                src={activeMedia.src} 
                alt={activeMedia.title} 
                className="lightbox-media" 
              />
            )}
            
            <div className="lightbox-caption">
              <h3>{activeMedia.title}</h3>
              <p>{activeMedia.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Interactive Service Detail Modal                          */}
      {/* ======================================================== */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="service-modal-close" 
              onClick={() => setSelectedService(null)} 
              aria-label="Close Details"
            >
              <X size={22} />
            </button>

            <div className="service-modal-header">
              <div className="service-modal-icon">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="service-modal-title">{selectedService.title}</h3>
                <p className="service-modal-desc">{selectedService.desc}</p>
              </div>
            </div>

            {selectedService.details && (
              <div className="service-modal-body">
                <h4 className="modal-subheading">Key Benefits & Outcomes</h4>
                <ul className="modal-benefits-list">
                  {selectedService.details.benefits.map((b, i) => (
                    <li key={i}>
                      <CheckCircle2 size={17} className="check-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {selectedService.details.procedure && (
                  <div className="modal-procedure-box">
                    <h4 className="modal-subheading">Clinical Approach</h4>
                    <p>{selectedService.details.procedure}</p>
                  </div>
                )}
              </div>
            )}

            <div className="service-modal-footer">
              <button 
                onClick={scrollToBooking} 
                className="btn btn-hero-book" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={18} />
                <span>Book Appointment for {selectedService.title}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
