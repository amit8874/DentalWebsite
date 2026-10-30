import React, { useState, useEffect } from 'react';
import { Play, X, ChevronRight, Eye, Camera, ZoomIn } from 'lucide-react';
import { showcaseItems } from '../data/showcaseData';

const InstagramIcon = ({ size = 13, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function WhyAditiDental() {
  const [activeItem, setActiveItem] = useState(null);
  const [isPausedByHover, setIsPausedByHover] = useState(false);

  // Duplicate items for continuous seamless infinite marquee loop
  const marqueeItems = [...showcaseItems, ...showcaseItems];

  // Lock body scroll when modal is open & handle Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };

    if (activeItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem]);

  const handleCardClick = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  return (
    <section id="why-aditi" className="why-aditi-section section-padding">
      {/* Anchor for header Gallery navigation */}
      <div id="gallery" style={{ position: 'relative', top: '-110px', visibility: 'hidden' }}></div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title">Why Aditi Dental Clinic?</h2>
        </div>
      </div>

      {/* ======================================================== */}
      {/* INFINITE MARQUEE CAROUSEL (Alternating Video & Photo)    */}
      {/* ======================================================== */}
      <div 
        className="reels-marquee-container"
        onMouseEnter={() => setIsPausedByHover(true)}
        onMouseLeave={() => setIsPausedByHover(false)}
      >
        {/* Edge Fade Gradients for Luxury Look */}
        <div className="marquee-edge-fade left-edge"></div>
        <div className="marquee-edge-fade right-edge"></div>

        <div className={`reels-marquee-track ${isPausedByHover ? 'is-paused' : ''}`}>
          {marqueeItems.map((item, index) => {
            const isVideo = item.type === 'video';
            return (
              <div 
                key={`${item.id}-${index}`}
                className={`reel-card-item ${isVideo ? 'item-video' : 'item-photo'}`}
                onClick={(e) => handleCardClick(item, e)}
                role="button"
                tabIndex={0}
                aria-label={`View ${isVideo ? 'video' : 'photo'}: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(item, e);
                  }
                }}
              >
                {/* Poster / Thumbnail / Photo Image */}
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="reel-card-thumb"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/client_photo_1.webp';
                  }}
                />

                {/* Gradient Overlays */}
                <div className="reel-overlay-top"></div>
                <div className="reel-overlay-bottom"></div>

                {/* Top Header Tags */}
                <div className="reel-top-tags">
                  <span className="reel-badge-tag">{item.badge}</span>
                  <span className={`reel-type-pill ${isVideo ? 'type-video' : 'type-photo'}`}>
                    {isVideo ? (
                      <>
                        <InstagramIcon size={13} />
                        <span>Reel</span>
                      </>
                    ) : (
                      <>
                        <Camera size={13} />
                        <span>Photo</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Center Action Indicator */}
                <div className="reel-center-play">
                  <div className={`reel-play-button ${!isVideo ? 'photo-view-button' : ''}`}>
                    {isVideo ? (
                      <Play size={24} fill="#FFFFFF" color="#FFFFFF" className="play-triangle-icon" />
                    ) : (
                      <ZoomIn size={24} color="#FFFFFF" />
                    )}
                  </div>
                  <span className="reel-play-hint">
                    {isVideo ? 'Tap to Play on Site' : 'Tap to View Photo'}
                  </span>
                </div>

                {/* Bottom Card Information */}
                <div className="reel-card-info">
                  <h3 className="reel-card-title">{item.title}</h3>
                  <p className="reel-card-desc">{item.desc}</p>
                  <div className="reel-bottom-action">
                    <span className="reel-action-label">
                      <Eye size={14} />
                      <span>{isVideo ? 'Watch In-Clinic Story' : 'View In-Clinic Photo'}</span>
                    </span>
                    <ChevronRight size={15} className="reel-action-arrow" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* IN-SITE MODAL (Plays video or views high-res photo)      */}
      {/* ======================================================== */}
      {activeItem && (
        <div 
          className="reel-lightbox-overlay" 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={`reel-lightbox-modal ${activeItem.type === 'photo' ? 'modal-photo-mode' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="reel-modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">{activeItem.badge}</span>
                <h3 className="modal-title">{activeItem.title}</h3>
              </div>
              <button 
                className="btn-modal-close" 
                onClick={closeModal} 
                aria-label="Close View"
                type="button"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body: Video Embed or High-Res Photo */}
            {activeItem.type === 'video' ? (
              <div className="reel-modal-video-wrapper">
                <iframe 
                  src={`${activeItem.embedUrl}?autoplay=1`} 
                  title={activeItem.title}
                  className="reel-iframe-player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="photo-modal-image-wrapper">
                <img 
                  src={activeItem.src} 
                  alt={activeItem.title} 
                  className="photo-modal-img"
                />
              </div>
            )}

            {/* Modal Footer */}
            <div className="reel-modal-footer">
              <p className="modal-desc">{activeItem.desc}</p>
              <div className="modal-cta-row">
                <a 
                  href="#booking" 
                  onClick={() => {
                    closeModal();
                    const bookingEl = document.querySelector('#booking');
                    if (bookingEl) {
                      bookingEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="btn btn-primary btn-modal-book"
                >
                  Book Your Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
