import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Camera, Video } from 'lucide-react';

export default function MediaGallery() {
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  
  // Modals state
  const [activeMedia, setActiveMedia] = useState(null); // { type: 'photo' | 'video', src: string, title: string }
  
  const stageRef = useRef(null);
  const [translateZ, setTranslateZ] = useState(250);

  // Responsive translateZ calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTranslateZ(200); // Tighter circle for mobile
      } else {
        setTranslateZ(260); // Standard circle
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryItems = [
    {
      type: 'photo',
      src: '/assets/gallery_facade.png',
      title: 'Our Clinic Exterior',
      desc: 'Elegant, modern storefront design located in Gomti Nagar, Lucknow.'
    },
    {
      type: 'video',
      src: '/assets/clinic_interior.png',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A', // KGMU or premium dental care general video placeholder
      title: 'Tour Our Premium Clinic',
      desc: 'Take a virtual walk through our state-of-the-art dental clinical spaces.'
    },
    {
      type: 'photo',
      src: '/assets/gallery_microscope.png',
      title: 'Precision Microscope Dentistry',
      desc: 'Microscopic examination for micro-precision restorations.'
    },
    {
      type: 'video',
      src: '/assets/dental_chair.png',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A',
      title: 'Sterile Clinical Environment',
      desc: 'Learn about our rigorous infection control and hygiene protocols.'
    },
    {
      type: 'photo',
      src: '/assets/gallery_sterilization.png',
      title: 'Autoclave Sterilization Tech',
      desc: 'KGMU class-leading hygiene setups ensuring complete patient safety.'
    },
    {
      type: 'video',
      src: '/assets/smile_consultation.png',
      videoUrl: 'https://www.youtube.com/embed/G1IbRujko-A',
      title: 'Smile Assessment Consult',
      desc: 'Dr. Aditi Mishra explaining personalized smile designs.'
    }
  ];

  // Drag Handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotationY);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    // Lower sensitivity for smoother rotations
    const sensitivity = 0.25;
    setRotationY(startRotation + deltaX * sensitivity);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest 60deg (since 360 / 6 = 60)
    const nearestIndex = Math.round(rotationY / 60);
    setRotationY(nearestIndex * 60);
  };

  // Autoplay cylinder
  useEffect(() => {
    if (isDragging || activeMedia) return;
    const timer = setInterval(() => {
      setRotationY((prev) => prev - 60);
    }, 4500);
    return () => clearInterval(timer);
  }, [isDragging, activeMedia]);

  const rotateLeft = () => {
    setRotationY((prev) => prev + 60);
  };

  const rotateRight = () => {
    setRotationY((prev) => prev - 60);
  };

  const openLightbox = (item) => {
    setActiveMedia(item);
  };

  const closeLightbox = () => {
    setActiveMedia(null);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        
        <div className="section-header animate-fade-in">
          <span className="section-tag">Gallery Tour</span>
          <h2 className="section-title">Photos & Videos Tour</h2>
          <p className="section-desc">
            Swipe or drag the 3D cylinder to tour our Gomti Nagar facility, check out our 
            specialist technology, and learn about our hygiene setups.
          </p>
        </div>

        <div className="carousel-3d-wrapper animate-fade-in delay-1">
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
                // Item rotation
                const angle = index * 60;
                return (
                  <div
                    key={index}
                    className="carousel-3d-item"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`
                    }}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="carousel-media-content">
                      <span className="carousel-info-tag">
                        {item.type === 'photo' ? (
                          <>
                            <Camera size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            <span>Photo</span>
                          </>
                        ) : (
                          <>
                            <Video size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            <span>Video</span>
                          </>
                        )}
                      </span>

                      {item.type === 'photo' ? (
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="carousel-img"
                        />
                      ) : (
                        <>
                          <img 
                            src={item.src} 
                            alt={item.title} 
                            className="carousel-video-cover"
                          />
                          <div className="carousel-video-overlay">
                            <div className="play-btn-circle">
                              <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="carousel-caption">
                        <h4 className="carousel-caption-title">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="carousel-3d-controls">
            <button onClick={rotateLeft} className="btn btn-outline-gold" style={{ padding: '0.6rem' }} aria-label="Rotate Left">
              <ChevronLeft size={20} />
            </button>
            <div className="carousel-3d-instructions">
              <span>Swipe left or right to spin the 3D gallery</span>
            </div>
            <button onClick={rotateRight} className="btn btn-outline-gold" style={{ padding: '0.6rem' }} aria-label="Rotate Right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Video Modal Popup */}
      {activeMedia && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="lightbox-close">
              <X size={32} />
            </button>

            {activeMedia.type === 'photo' ? (
              <img 
                src={activeMedia.src} 
                alt={activeMedia.title} 
                className="lightbox-media"
              />
            ) : (
              <iframe
                title={activeMedia.title}
                src={`${activeMedia.videoUrl}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="lightbox-video-frame"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
