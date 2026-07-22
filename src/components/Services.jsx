import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, Layers, Award, Info, 
  CheckCircle2, ChevronRight, Activity 
} from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'cosmetic', name: 'Cosmetic & Crowns' },
    { id: 'implants', name: 'Implants & Rehab' },
    { id: 'maxillofacial', name: 'Maxillofacial Prosthetics' },
    { id: 'general', name: 'General & Joint Care' }
  ];

  const servicesData = [
    {
      id: 'smile-designing',
      category: 'cosmetic',
      title: 'Smile Designing & Veneers',
      desc: 'Elevate your confidence with cosmetic smile designs. We use ultra-thin porcelain veneers and laminates to correct discoloration, gaps, or mild crowding.',
      icon: <Sparkles size={28} />,
      imgSrc: '/assets/smile_after.png',
      benefits: ['Custom digital smile mockups', 'Preserves natural tooth enamel', 'Stain-resistant aesthetic porcelain']
    },
    {
      id: 'crowns-bridges',
      category: 'cosmetic',
      title: 'Veneers, Crowns & Bridges',
      desc: 'Restore decayed or weakened teeth with highly durable, natural-looking Zirconia, E-Max, or metal-ceramic crowns and bridges.',
      icon: <Layers size={28} />,
      imgSrc: '/assets/dental_prosthetic.png',
      benefits: ['Precise CAD/CAM metal-free design', 'Restores full biting & chewing strength', 'Matches natural teeth shades perfectly']
    },
    {
      id: 'dentures',
      category: 'cosmetic',
      title: 'Complete & Partial Dentures',
      desc: 'Restore chewing and speech functions with lightweight, comfortable complete dentures, flexible partial dentures, or implant-supported dentures.',
      icon: <CheckCircle2 size={28} />,
      imgSrc: '/assets/service_dentures.png',
      benefits: ['Lightweight, durable & comfortable fit', 'High aesthetics with personalized shades', 'Stabilized with implants if requested']
    },
    {
      id: 'dental-implants',
      category: 'implants',
      title: 'Dental Implants',
      desc: 'The gold standard for tooth replacement. Bio-compatible titanium implants restore missing teeth from root to crown with absolute stability.',
      icon: <Award size={28} />,
      imgSrc: '/assets/service_implants.png',
      benefits: ['Lifetime-warranty biocompatible titanium', 'Prevents bone loss and facial sagging', 'Looks & functions exactly like real teeth']
    },
    {
      id: 'full-mouth-reconstruction',
      category: 'implants',
      title: 'Full Mouth Rehabilitation',
      desc: 'A comprehensive treatment plan integrating implants, crowns, and bite adjustment to fully reconstruct severely worn or missing teeth.',
      icon: <Activity size={28} />,
      imgSrc: '/assets/gallery_microscope.png',
      benefits: ['Restores collapsed or damaged bites', 'Advanced 3D digital occlusion mapping', 'Saves healthy structures under microscopy']
    },
    {
      id: 'maxillofacial-prosthesis',
      category: 'maxillofacial',
      title: 'Eye, Ear, Nose Prosthesis',
      desc: 'Advanced facial restoration. Custom-sculpted, medical-grade silicone prosthesis to restore facial structure after trauma, surgery, or congenital conditions.',
      icon: <ShieldCheck size={28} />,
      imgSrc: '/assets/service_prosthesis.png',
      benefits: ['Individually sculpted medical silicone', 'Perfect matching with surrounding skin', 'Safe adhesive or magnetic attachment']
    },
    {
      id: 'tmd-management',
      category: 'general',
      title: 'TMD / TMJ Joint Management',
      desc: 'Expert therapy for jaw clicking, jaw locking, clenching, and facial pain. We design custom splints, bite correction, and exercises.',
      icon: <Info size={28} />,
      imgSrc: '/assets/smile_consultation.png',
      benefits: ['Custom-fabricated splint therapy', 'Stops jaw joint clicking & tightness', 'Relieves tension-headaches non-surgically']
    },
    {
      id: 'root-canals',
      category: 'general',
      title: 'Root Canals & Fillings',
      desc: 'Save infected teeth with precise, painless single-visit root canal treatments. Repair cavities using aesthetic, composite tooth-colored fillings.',
      icon: <CheckCircle2 size={28} />,
      imgSrc: '/assets/smile_before.png',
      benefits: ['Advanced single-visit root canal care', 'Tooth-colored aesthetic composite fills', 'Painless clinical experience']
    },
    {
      id: 'cleaning-whitening',
      category: 'general',
      title: 'Scaling & Whitening',
      desc: 'Maintain optimal oral hygiene with professional teeth cleaning (scaling & polishing) and medical-grade in-office teeth whitening.',
      icon: <Sparkles size={28} />,
      imgSrc: '/assets/dental_chair.png',
      benefits: ['Ultrasonic removal of tartar & plaque', 'Laser whitening up to 8 shades lighter', 'Strengthens gums and freshens breath']
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeTab);

  // Reset indices and progress on tab switch
  useEffect(() => {
    setActiveServiceIndex(0);
    setProgress(0);
  }, [activeTab]);

  // Slideshow Timer Loop
  useEffect(() => {
    if (isPaused) return;

    const slideDuration = 5500; // 5.5 seconds per slide
    const progressUpdateStep = 100; // update progress every 100ms
    const totalSteps = slideDuration / progressUpdateStep;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveServiceIndex((prevIndex) => (prevIndex + 1) % filteredServices.length);
          return 0;
        }
        return prev + (100 / totalSteps);
      });
    }, progressUpdateStep);

    return () => clearInterval(timer);
  }, [isPaused, filteredServices.length]);

  const handleSelectService = (index) => {
    setActiveServiceIndex(index);
    setProgress(0);
    setIsPaused(true); // Pause loop on manual selector click
  };

  const handleSelectTab = (catId) => {
    setActiveTab(catId);
    setIsPaused(false); // Reset pause on tab changes
  };

  const currentService = filteredServices[activeServiceIndex] || filteredServices[0];

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        
        <div className="section-header animate-fade-in">
          <span className="section-tag">Our Specialties</span>
          <h2 className="section-title">Comprehensive Dental & Facial Care</h2>
          <p className="section-desc">
            From routine checkups to specialized maxillofacial rehabilitation, we combine advanced digital 
            techniques with KGMU clinical excellence.
          </p>
        </div>

        {/* Categories Tab Filter */}
        <div className="tabs-container animate-fade-in delay-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectTab(cat.id)}
              className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Split Screen Slideshow */}
        {currentService && (
          <div 
            className="services-split-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Column: Mapped image */}
            <div className="services-image-panel animate-fade-in">
              <div className="services-image-frame">
                {filteredServices.map((service, idx) => (
                  <img 
                    key={service.id}
                    src={service.imgSrc} 
                    alt={service.title} 
                    className={`services-slide-img ${idx === activeServiceIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Interactive details */}
            <div className="services-content-panel animate-fade-in">
              <span className="service-side-tag">
                {categories.find(c => c.id === currentService.category)?.name}
              </span>
              
              <h3 className="service-active-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent-teal)', display: 'inline-flex' }}>{currentService.icon}</span>
                <span>{currentService.title}</span>
              </h3>
              
              <p className="service-active-desc">{currentService.desc}</p>
              
              <ul className="service-benefits-list">
                {currentService.benefits.map((benefit, idx) => (
                  <li key={idx} className="service-benefit-item">{benefit}</li>
                ))}
              </ul>

              <a href="#booking" className="btn btn-secondary">
                <span>Book Consultation</span>
                <ChevronRight size={16} />
              </a>

              {/* Sub Navigation (list of services currently active) */}
              <div className="service-sub-nav">
                {filteredServices.map((service, idx) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(idx)}
                    className={`service-sub-nav-btn ${idx === activeServiceIndex ? 'active' : ''}`}
                  >
                    {service.title.split(' & ')[0].split(', ')[0]}
                  </button>
                ))}
              </div>

              {/* Auto-play Loading bar */}
              <div className="service-progress-bar-bg">
                <div 
                  className="service-progress-bar-fill"
                  style={{ width: `${isPaused ? 0 : progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
