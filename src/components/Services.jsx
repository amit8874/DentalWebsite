import React, { useState } from 'react';
import { Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function Services({ onSelectService }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const treatmentsList = [
    {
      id: 'root-canal',
      name: 'Root canal',
      image: '/assets/treatments/root-canal.jpg',
      desc: 'The bacteria need to be removed when treating the infection in the root canal. This is done by eithe...',
      fullDesc: 'The bacteria need to be removed when treating the infection in the root canal. This is done by gentle rotary endodontics and single-visit therapy.'
    },
    {
      id: 'dental-implant',
      name: 'Dental Implant',
      image: '/assets/treatments/dental-implant.jpg',
      desc: 'Dental implants are a durable and natural-looking solution for missing teeth. We use high-quality ma...',
      fullDesc: 'Dental implants are a durable and natural-looking solution for missing teeth. We use high-quality biocompatible titanium and zirconia fixtures.'
    },
    {
      id: 'cosmetic-dentistry',
      name: 'Cosmetic Dentistry',
      image: '/assets/treatments/cosmetic-dentistry.jpg',
      desc: 'Enhance your smile with our cosmetic dentistry services. From teeth whitening to veneers, we offer t...',
      fullDesc: 'Enhance your smile with our cosmetic dentistry services. From teeth whitening to veneers, we offer tailor-made aesthetic treatments.'
    },
    {
      id: 'laser-dentistry',
      name: 'Dental Laser',
      image: '/assets/treatments/laser-dentistry.jpg',
      desc: 'Dental lasers offer a minimally invasive solution for many dental procedures, resulting in reduced d...',
      fullDesc: 'Dental lasers offer a minimally invasive solution for many dental procedures, resulting in reduced discomfort and accelerated healing.'
    },
    {
      id: 'teeth-braces',
      name: 'Teeth Braces',
      image: '/assets/treatments/teeth-braces.jpg',
      desc: 'Orthodontic solutions for crooked or crowded teeth and developmental bite corrections with metal and aesthetic ceramic options.',
      fullDesc: 'Orthodontic solutions for crooked or crowded teeth and developmental bite corrections with metal and aesthetic ceramic options.'
    },
    {
      id: 'aligners',
      name: 'Aligners',
      image: '/assets/treatments/aligners.jpg',
      desc: 'Virtually invisible, custom-fit transparent aligners that straighten teeth discreetly and comfortably with no dietary limits.',
      fullDesc: 'Virtually invisible, custom-fit transparent aligners that straighten teeth discreetly and comfortably with no dietary limits.'
    },
    {
      id: 'kids-dentistry',
      name: 'Kids Dentistry',
      image: '/assets/treatments/kids-dentistry.jpg',
      desc: 'Compassionate, gentle pediatric dental checkups designed to keep young children cavity-free and smiling with confidence.',
      fullDesc: 'Compassionate, gentle pediatric dental checkups designed to keep young children cavity-free and smiling with confidence.'
    },
    {
      id: 'mouth-ulcers',
      name: 'Mouth Ulcers',
      image: '/assets/treatments/mouth-ulcers.jpg',
      desc: 'Specialized diagnosis and soothing therapeutic care for painful mouth sores, recurrent ulcers, and oral mucosal lesions.',
      fullDesc: 'Specialized diagnosis and soothing therapeutic care for painful mouth sores, recurrent ulcers, and oral mucosal lesions.'
    },
    {
      id: 'dental-crowns',
      name: 'Dental Crowns',
      image: '/assets/treatments/dental-crowns.jpg',
      desc: 'Custom-crafted zirconia and porcelain crowns that shield weakened teeth and restore complete natural biting strength.',
      fullDesc: 'Custom-crafted zirconia and porcelain crowns that shield weakened teeth and restore complete natural biting strength.'
    },
    {
      id: 'dental-fillings',
      name: 'Dental Fillings',
      image: '/assets/treatments/dental-fillings.jpg',
      desc: 'Seamless tooth-colored composite restorations that repair tooth decay and blend invisibly with your natural tooth shade.',
      fullDesc: 'Seamless tooth-colored composite restorations that repair tooth decay and blend invisibly with your natural tooth shade.'
    },
    {
      id: 'wisdom-teeth',
      name: 'Wisdom Teeth',
      image: '/assets/treatments/wisdom-teeth.jpg',
      desc: 'Minimally invasive wisdom tooth removal for impacted or painful molars, ensuring rapid recovery and lasting jaw relief.',
      fullDesc: 'Minimally invasive wisdom tooth removal for impacted or painful molars, ensuring rapid recovery and lasting jaw relief.'
    },
    {
      id: 'dentures',
      name: 'Dentures',
      image: '/assets/treatments/dentures.jpg',
      desc: 'Precision complete and partial dentures designed for a snug fit, comfortable chewing function, and natural aesthetics.',
      fullDesc: 'Precision complete and partial dentures designed for a snug fit, comfortable chewing function, and natural aesthetics.'
    },
    {
      id: 'advanced-gum',
      name: 'Advance Gum Treatment',
      image: '/assets/treatments/advanced-gum.jpg',
      desc: 'Ultrasonic root scaling and laser periodontal decontamination to stop gum bleeding, eliminate infections, and protect teeth.',
      fullDesc: 'Ultrasonic root scaling and laser periodontal decontamination to stop gum bleeding, eliminate infections, and protect teeth.'
    },
    {
      id: 'snoring-sleep-apnea',
      name: 'Snoring & Sleep Apnea',
      image: '/assets/treatments/snoring-sleep-apnea.jpg',
      desc: 'Custom oral appliance therapy (MAD) preventing airway collapse to stop chronic snoring and restore restful, healthy sleep.',
      fullDesc: 'Custom oral appliance therapy (mandibular advancement device) to prevent airway collapse, eliminate chronic snoring, and restore restful sleep.'
    },
    {
      id: 'dental-xray',
      name: 'Dental X-Ray',
      image: '/assets/treatments/dental-xray.jpg',
      desc: 'Ultra-low radiation digital radiography and panoramic scans providing instant high-resolution diagnostic imaging for accurate care.',
      fullDesc: 'Ultra-low radiation digital radiography and panoramic scans providing instant high-resolution diagnostic imaging for accurate care.'
    },
    {
      id: 'teeth-whitening',
      name: 'Teeth Whitening',
      image: '/assets/treatments/cosmetic-dentistry.jpg',
      desc: 'Professional in-office whitening erasing stubborn stains and lightening enamel up to 8 shades in a 45-minute gentle session.',
      fullDesc: 'Professional in-office teeth whitening and enamel brightening, erasing stubborn food, tea, and tobacco stains in just 45 minutes.'
    },
    {
      id: 'maxillofacial-surgery',
      name: 'Maxillofacial Surgery',
      image: '/assets/clinic_interior.png',
      desc: 'Advanced surgical & prosthetic rehabilitation for facial trauma, custom silicone ocular/auricular prosthetics, and TMJ therapies.',
      fullDesc: 'Advanced maxillofacial rehabilitation led by KGMU specialist Dr. Aditi Mishra, including custom silicone prosthetics and TMJ joint therapy.'
    }
  ];

  // Show 2 rows x 4 columns = 8 cards initially; show all when expanded
  const displayedTreatments = isExpanded ? treatmentsList : treatmentsList.slice(0, 8);

  const handleCardClick = (id) => {
    if (onSelectService) {
      onSelectService(id);
    }
  };

  const handleBookAppointment = (service, e) => {
    e.stopPropagation(); // Prevent opening service detail page

    // Map service to booking category
    let serviceCategory = 'general';
    if (service.id.includes('implant')) serviceCategory = 'implants';
    else if (service.id.includes('cosmetic')) serviceCategory = 'cosmetic';
    else if (service.id.includes('denture') || service.id.includes('crown')) serviceCategory = 'prosthetic';
    else if (service.id.includes('gum') || service.id.includes('laser')) serviceCategory = 'cleaning';
    else if (service.id.includes('sleep') || service.id.includes('snoring')) serviceCategory = 'tmd';

    // Dispatch prefill event to BookingForm
    window.dispatchEvent(
      new CustomEvent('prefillBooking', {
        detail: {
          service: serviceCategory,
          notes: `Interested in ${service.name} treatment consultation.`
        }
      })
    );

    // Scroll smoothly to booking form
    const bookingEl = document.querySelector('#booking');
    if (bookingEl) {
      const headerOffset = 95;
      const elementPosition = bookingEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const section = document.querySelector('#services');
      if (section) {
        const headerOffset = 95;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section id="services" className="services-treatments-section section-padding">
      <div className="container treatments-container">
        
        {/* Main Title matching clinic styling and reference screenshot */}
        <div className="treatments-header-center">
          <span className="section-tag" style={{ marginBottom: '0.6rem', display: 'inline-block' }}>
            Clinical Specialties
          </span>
          <h2 className="treatments-main-heading-teal">
            How Can I Help You?
          </h2>
          <p className="treatments-sub-heading-clean">
            Dr. Aditi's Dental Clinic provides all kinds of treatment services including Single Visit RCT, Dental Implants, Cosmetic Dentistry, and Braces Treatment at very affordable prices.
          </p>
        </div>

        {/* 2 in a row Services Cards Grid with Hover Overlay & Brown Booking Button */}
        <div className="services-cards-grid">
          {displayedTreatments.map((item) => (
            <div
              key={item.id}
              className="service-card-item"
              onClick={() => handleCardClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(item.id);
                }
              }}
              aria-label={`Learn more about ${item.name}`}
            >
              {/* Card Image Area */}
              <div className="service-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="service-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/treatments/root-canal.jpg';
                  }}
                />
              </div>

              {/* Card Default Bottom Details (Image Above, Title & Text Below) */}
              <div className="service-card-body">
                <h3 className="service-card-title">{item.name}</h3>
                <p className="service-card-desc">{item.desc}</p>
                <button
                  type="button"
                  className="service-card-readmore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id);
                  }}
                >
                  Read More
                </button>
              </div>

              {/* Hover Overlay: shows Title and Brown "Book Appointment" Button */}
              <div className="service-card-hover-overlay">
                <div className="service-hover-content">
                  <span className="service-hover-tag">Specialized Care</span>
                  <h4 className="service-hover-title">{item.name}</h4>
                  <p className="service-hover-desc">{item.fullDesc}</p>
                  
                  {/* Brown Background Book Appointment Button */}
                  <button
                    type="button"
                    className="service-book-appointment-btn"
                    onClick={(e) => handleBookAppointment(item, e)}
                  >
                    <Calendar size={16} />
                    <span>Book Appointment</span>
                  </button>

                  {/* Secondary action to view full treatment page */}
                  <button
                    type="button"
                    className="service-hover-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item.id);
                    }}
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* "More" / "Show Less" Action Button */}
        {treatmentsList.length > 8 && (
          <div className="services-more-actions">
            <button
              type="button"
              className="services-view-more-btn"
              onClick={handleToggleExpand}
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Show Less' : 'More'}</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
