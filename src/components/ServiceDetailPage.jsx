import React, { useEffect } from 'react';
import { 
  ChevronRight, ArrowLeft, Phone, Calendar, 
  Sparkles, HeartPulse 
} from 'lucide-react';
import { treatmentsData, servicesNavList } from '../data/treatmentsData';

export default function ServiceDetailPage({ serviceId, onSelectService, onBack, onBookService }) {
  const treatment = treatmentsData[serviceId] || treatmentsData['teeth-braces'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  const handleSelectServiceClick = (srvId) => {
    if (onSelectService) {
      onSelectService(srvId);
    } else {
      window.location.hash = `#/treatment/${srvId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingClick = () => {
    if (onBookService) {
      onBookService(treatment.name);
    } else {
      const event = new CustomEvent('prefillBooking', {
        detail: {
          service: treatment.id,
          notes: `Interested in ${treatment.name} consultation`
        }
      });
      window.dispatchEvent(event);
      onBack();
      setTimeout(() => {
        const bookingEl = document.querySelector('#booking');
        if (bookingEl) {
          bookingEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const hasIndividualBenefitImages = treatment.benefitSection.conditions.some(c => c.image);

  return (
    <div className="treatment-detail-page animate-fade-in">
      
      {/* ======================================================== */}
      {/* 1. BREADCRUMBS & TOP NAV BAR                             */}
      {/* ======================================================== */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Specialties
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{treatment.name}</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={16} />
            <span>Back to Treatments</span>
          </button>
        </div>
      </div>

      {/* Main Page Layout Container with Left Services Sidebar */}
      <div className="container treatment-page-container">
        <div className="treatment-layout-grid">
          {/* LEFT-HAND SIDEBAR - ALL SERVICES LIST (VISIBLE & SCROLLABLE ON ALL SCREENS) */}
          <aside className="treatment-left-sidebar" aria-label="Services Navigation">
            <div className="sidebar-sticky-inner">
              <div className="treatment-sidebar-card">
                <div className="sidebar-heading-row">
                  <div className="sidebar-badge">Specialties</div>
                  <h3 className="sidebar-title">All Services</h3>
                  <span className="sidebar-count">({servicesNavList.length})</span>
                </div>

                <nav className="treatment-sidebar-list">
                  {servicesNavList.map((srv) => {
                    const isActive = srv.id === (serviceId || treatment.id);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => handleSelectServiceClick(srv.id)}
                        className={`treatment-sidebar-item ${isActive ? 'active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="sidebar-item-name">{srv.name}</span>
                        <ChevronRight size={16} className="sidebar-item-arrow" />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Consultation / Help Card in Sidebar */}
              <div className="sidebar-help-card">
                <div className="sidebar-help-header">
                  <HeartPulse size={20} className="sidebar-help-icon" />
                  <h4>Expert Consultation</h4>
                </div>
                <p>
                  Consult directly with KGMU alumna Dr. Aditi Mishra for tailored diagnosis.
                </p>
                <div className="sidebar-help-actions">
                  <button 
                    onClick={handleBookingClick}
                    className="sidebar-help-book-btn"
                    type="button"
                  >
                    <Calendar size={15} />
                    <span>Book Appointment</span>
                  </button>
                  <a href="tel:09208430808" className="sidebar-help-call-btn">
                    <Phone size={15} />
                    <span>092084 30808</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT-HAND MAIN CONTENT */}
          <div className="treatment-right-content">
            {/* ======================================================== */}
            {/* 2. HERO BANNER SECTION (Matches Screenshot 2)            */}
            {/* ======================================================== */}
            <section className="treatment-hero-section">
        <div className="container treatment-hero-grid">
          
          <div className="treatment-hero-left">
            <h1 className="treatment-hero-title">{treatment.hero.title}</h1>
            <p className="treatment-hero-subtitle">{treatment.hero.subtitle}</p>
            
            <button 
              onClick={handleBookingClick} 
              className="btn-begin-journey"
              type="button"
            >
              {treatment.hero.ctaText || 'Begin Your Smile Journey'}
            </button>
          </div>

          <div className="treatment-hero-right">
            <div className="treatment-hero-frame">
              <img 
                src={treatment.hero.image} 
                alt={treatment.name} 
                className="treatment-hero-img" 
                onError={(e) => {
                  if (treatment.hero.onlineImage && e.target.src !== treatment.hero.onlineImage) {
                    e.target.src = treatment.hero.onlineImage;
                  }
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PATIENT EXPERIENCE / QUOTE SECTION (Matches Screenshot 3) */}
      {/* ======================================================== */}
      <section className="treatment-quote-section">
        <div className="container">
          <div className="treatment-quote-card">
            
            <div className="quote-patient-col">
              <img 
                src={treatment.quote.patientImage} 
                alt="Patient Smile Transformation" 
                className="quote-patient-img" 
                onError={(e) => {
                  if (treatment.quote.onlinePatientImage && e.target.src !== treatment.quote.onlinePatientImage) {
                    e.target.src = treatment.quote.onlinePatientImage;
                  }
                }}
              />
            </div>

            <div className="quote-content-col">
              <div className="quote-mark-top">“</div>
              <h2 className="quote-headline">{treatment.quote.headline}</h2>
              <p className="quote-text">{treatment.quote.p1}</p>
              {treatment.quote.p2 && (
                <p className="quote-text">{treatment.quote.p2}</p>
              )}
              <div className="quote-mark-bottom">”</div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. WHO CAN BENEFIT SECTION (Matches Screenshot 4)        */}
      {/* ======================================================== */}
      <section className="treatment-benefit-section">
        <div className="container">
          
          <div className="benefit-header-block">
            <h2 className="benefit-main-title">{treatment.benefitSection.title}</h2>
            <p className="benefit-sub-title">{treatment.benefitSection.subtitle}</p>
          </div>

          {/* When individual condition images are provided (like Braces SVGs) */}
          {hasIndividualBenefitImages ? (
            <div className="benefit-conditions-strip-bar">
              {treatment.benefitSection.conditions.map((item, idx) => (
                <div key={idx} className="benefit-strip-item">
                  <div className="benefit-strip-visual">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="benefit-condition-svg"
                      onError={(e) => {
                        if (item.onlineUrl && e.target.src !== item.onlineUrl) {
                          e.target.src = item.onlineUrl;
                        }
                      }}
                    />
                  </div>
                  <h4 className="benefit-strip-label">{item.title}</h4>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback Condition Cards Grid */
            <div className="benefit-conditions-grid">
              {treatment.benefitSection.conditions.map((item, idx) => (
                <div key={idx} className="benefit-condition-card">
                  <div className="condition-number-badge">{idx + 1}</div>
                  <h4 className="condition-card-title">{item.title}</h4>
                  <p className="condition-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHY CHOOSE SECTION (Matches Screenshot 5)             */}
      {/* ======================================================== */}
      <section className="treatment-why-section">
        <div className="container">
          
          <div className="why-header-block">
            <h2 className="why-main-title">{treatment.whyChoose.title}</h2>
            <p className="why-main-subtitle">{treatment.whyChoose.subtitle}</p>
          </div>

          <div className="why-content-grid">
            
            {/* 6 Advantage Cards (2 Columns x 3 Rows) */}
            <div className="why-cards-matrix">
              {treatment.whyChoose.features.map((feat, idx) => (
                <div key={idx} className="why-feature-card">
                  <div className="why-icon-badge-box">
                    {feat.iconImage ? (
                      <img 
                        src={feat.iconImage} 
                        alt={feat.title} 
                        className="why-feat-custom-icon"
                        onError={(e) => {
                          if (feat.onlineUrl && e.target.src !== feat.onlineUrl) {
                            e.target.src = feat.onlineUrl;
                          }
                        }}
                      />
                    ) : (
                      <Sparkles size={22} className="why-gold-icon" />
                    )}
                  </div>
                  <div className="why-text-box">
                    <h4 className="why-feat-title">{feat.title}</h4>
                    <p className="why-feat-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side Study Model / Clinical Photo */}
            <div className="why-image-wrapper">
              <img 
                src={treatment.whyChoose.image} 
                alt={`${treatment.name} Clinical Study`} 
                className="why-model-img" 
                onError={(e) => {
                  if (treatment.whyChoose.onlineImage && e.target.src !== treatment.whyChoose.onlineImage) {
                    e.target.src = treatment.whyChoose.onlineImage;
                  }
                }}
              />
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION APPOINTMENT STRIP                      */}
      {/* ======================================================== */}
      <section className="treatment-cta-strip">
        <div className="container cta-strip-container">
          <div className="cta-strip-text">
            <span className="cta-strip-tag">Dr. Aditi's Dental & Maxillofacial Clinic</span>
            <h3 className="cta-strip-heading">Schedule Your {treatment.shortName || treatment.name} Consultation</h3>
            <p className="cta-strip-desc">
              KGMU Alumna • 10+ Years Experience • 2/457, Vivek Khand 2, Gomti Nagar, Lucknow
            </p>
          </div>

          <div className="cta-strip-buttons">
            <button 
              onClick={handleBookingClick} 
              className="btn-cta-primary"
              type="button"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>

            <a href="tel:09208430808" className="btn-cta-phone">
              <Phone size={18} />
              <span>Call: 092084 30808</span>
            </a>
          </div>
        </div>
      </section>

          </div>{/* End treatment-right-content */}
        </div>{/* End treatment-layout-grid */}
      </div>{/* End treatment-page-container */}

      {/* ======================================================== */}
      {/* 7. ALL SERVICES SECTION - SHOWN JUST ABOVE FOOTER ON MOBILE */}
      {/* ======================================================== */}
      <section className="treatment-bottom-services-section">
        <div className="container">
          <div className="bottom-services-card-wrapper">
            <div className="bottom-services-header">
              <span className="bottom-services-badge">Specialties</span>
              <h3 className="bottom-services-title">All Dental Services</h3>
              <p className="bottom-services-desc">
                Select any treatment below to view full details and clinical care.
              </p>
            </div>

            <div className="bottom-services-grid">
              {servicesNavList.map((srv) => {
                const isActive = srv.id === (serviceId || treatment.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleSelectServiceClick(srv.id)}
                    className={`bottom-service-item-btn ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="bottom-service-btn-name">{srv.name}</span>
                    <ChevronRight size={16} className="bottom-service-btn-arrow" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
