import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, ArrowRight } from 'lucide-react';

export default function DiwaliOfferModal({ isOpen: controlledIsOpen, onClose: controlledOnClose, onOpenOffer }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (onOpenOffer) {
      onOpenOffer();
    } else {
      setInternalIsOpen(true);
    }
  };

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Listen to custom events
  useEffect(() => {
    const handleOpenEvent = () => {
      handleOpen();
    };

    const handleWelcomeClosedEvent = () => {
      // Just after video pop up, offer image pop up appears
      setTimeout(() => {
        handleOpen();
      }, 200);
    };

    window.addEventListener('openOfferModal', handleOpenEvent);
    window.addEventListener('welcomeModalClosed', handleWelcomeClosedEvent);

    return () => {
      window.removeEventListener('openOfferModal', handleOpenEvent);
      window.removeEventListener('welcomeModalClosed', handleWelcomeClosedEvent);
    };
  }, [controlledIsOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClaimOffer = () => {
    handleClose();
    // Pre-fill booking form with Scaling & Whitening and festive note
    window.dispatchEvent(
      new CustomEvent('prefillBooking', {
        detail: {
          service: 'cleaning',
          notes: 'Diwali Special Offer Claimed: Flat 30% Off on Teeth Whitening & Cleaning.'
        }
      })
    );

    // If on a sub-route or hash, ensure we scroll to booking
    setTimeout(() => {
      const bookingEl = document.querySelector('#booking');
      if (bookingEl) {
        const headerOffset = 110;
        const elementPosition = bookingEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        window.location.hash = '#booking';
      }
    }, 100);
  };

  return (
    <>
      {/* Floating Left Reopen Tab - Always available to reopen anytime */}
      {!isOpen && (
        <aside 
          className="floating-festive-tab"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
          title="Click to view Diwali Special Offer (Flat 30% Off)"
          aria-label="Diwali Special Offer 30% Off"
        >
          <div className="festive-tab-badge">
            <span className="festive-tab-diya" aria-hidden="true">🪔</span>
            <span className="festive-tab-pulse"></span>
          </div>
          <div className="festive-tab-label">
            <span className="festive-tab-sub">FESTIVE OFFER</span>
            <span className="festive-tab-main">30% OFF</span>
          </div>
        </aside>
      )}

      {/* Pop-up Lightbox Modal */}
      {isOpen && (
        <div 
          className="diwali-offer-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Diwali Teeth Whitening Offer - Flat 30% Off"
        >
          <div 
            className="diwali-offer-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <div className="diwali-offer-card-header">
              <div className="diwali-header-badge-group">
                <span className="diwali-header-diya" aria-hidden="true">🪔</span>
                <div>
                  <h3 className="diwali-header-title">Diwali Festive Offer</h3>
                  <p className="diwali-header-subtitle">Dr. Aditi's Dental & Maxillofacial Clinic</p>
                </div>
              </div>

              <button
                type="button"
                className="diwali-offer-close-btn"
                onClick={handleClose}
                aria-label="Close offer popup"
                title="Close offer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Poster Image Container - Clean and completely visible from top to bottom */}
            <div className="diwali-poster-wrapper">
              <img 
                src="/assets/diwali-offer.jpg" 
                alt="Diwali Offer: Flat 30% Off Teeth Whitening & Cleaning at Dr. Aditi's Dental Clinic"
                className="diwali-poster-img"
              />
            </div>

            {/* Modal Interactive Actions */}
            <div className="diwali-offer-actions">
              <button
                type="button"
                className="btn diwali-btn-claim"
                onClick={handleClaimOffer}
              >
                <Calendar size={18} />
                <span>Claim 30% Off & Book Now</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="tel:09208430808"
                className="btn diwali-btn-call"
              >
                <Phone size={18} />
                <span>Call Clinic: 09208430808</span>
              </a>
            </div>

            {/* Location & Microcopy Footer */}
            <div className="diwali-offer-card-footer">
              <p className="diwali-clinic-loc">
                📍 Vivek Khand 2, Gomti Nagar, Lucknow • Limited Period Offer
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
