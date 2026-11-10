import React, { useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Award, GraduationCap, Heart, CheckCircle2, 
  ShieldCheck, Sparkles, Phone, Calendar, Stethoscope, Microscope
} from 'lucide-react';

export default function AboutPage({ onBack, onBookAppointment }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const milestones = [
    {
      year: 'KGMU Alumni',
      title: 'BDS & MDS (Prosthodontics)',
      desc: 'Earned post-graduate degree in Prosthodontics and Crown-Bridge from King George’s Medical University, Lucknow.'
    },
    {
      year: 'Specialization',
      title: 'Advanced Implantology & Reconstruction',
      desc: 'Extensive clinical focus on immediate load dental implants, full-mouth rehabilitation, and digital smile makeovers.'
    },
    {
      year: 'Maxillofacial Pioneer',
      title: 'Facial & Silicone Prosthetics',
      desc: 'Specialized expertise in custom medical-grade silicone ocular, auricular, and palatal obturators for trauma and cancer recovery.'
    },
    {
      year: 'Clinical Ethics',
      title: 'Conservative & Transparent Care',
      desc: 'Committed to explaining every procedure in detail, saving natural tooth structure, and avoiding unnecessary procedures.'
    }
  ];

  const clinicHighlights = [
    {
      icon: <ShieldCheck className="highlight-icon" size={24} />,
      title: 'Class-B Autoclave Sterilization',
      desc: 'Hospital-grade 100% sterile protocols ensuring zero cross-contamination and maximum safety.'
    },
    {
      icon: <Microscope className="highlight-icon" size={24} />,
      title: 'Digital High-Precision Radiography',
      desc: 'Chairside ultra-low radiation diagnostic digital X-rays with immediate imaging.'
    },
    {
      icon: <Sparkles className="highlight-icon" size={24} />,
      title: 'Ultra-Modern Operatory',
      desc: 'Ergonomic patient dental chairs and relaxing ambient environment in Gomti Nagar.'
    },
    {
      icon: <Heart className="highlight-icon" size={24} />,
      title: 'Compassionate Patient-First Care',
      desc: 'Painless local anesthesia techniques designed specifically for anxious or sensitive patients.'
    }
  ];

  return (
    <div className="about-page animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Breadcrumb Bar */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">About Dr. Aditi Mishra & Clinic</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Doctor Profile Hero Card */}
        <div className="about-container" style={{ alignItems: 'center' }}>
          <div className="about-image-column">
            <div className="about-photo-wrapper">
              <img 
                src="/assets/about-section.jpeg" 
                alt="Dr. Aditi Mishra - Dentist Gomti Nagar Lucknow" 
                className="about-photo"
              />
              <div className="experience-badge">
                <span className="exp-years">KGMU</span>
                <span className="exp-text">Alumna & Specialist</span>
              </div>
            </div>
          </div>

          <div className="about-content-column">
            <span className="section-tag">Senior Prosthodontist & Implantologist</span>
            <h1 className="about-name" style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
              Dr. Aditi Mishra
            </h1>
            <p className="about-sub" style={{ fontSize: '1.1rem', color: '#C0A070', fontWeight: '600', marginBottom: '1.2rem' }}>
              BDS, MDS (Prosthodontics & Crown-Bridge, KGMU Lucknow)
            </p>

            <div className="about-bio" style={{ lineHeight: '1.8' }}>
              <p>
                Dr. Aditi Mishra is one of Lucknow’s foremost specialists in restorative dentistry, dental implants, 
                and maxillofacial rehabilitation. With formal post-graduate specialization from the esteemed 
                <strong> King George's Medical University (KGMU)</strong>, she combines academic mastery with 
                advanced surgical and aesthetic techniques.
              </p>
              <p>
                Her clinical philosophy is anchored in <em>conservative dentistry</em>—preserving natural tooth structure 
                wherever possible, thoroughly explaining diagnostic findings, and recommending only biologically necessary 
                treatments with complete cost transparency.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={onBookAppointment}
                className="btn btn-primary"
                type="button"
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
              <a 
                href="tel:09208430808" 
                className="btn btn-outline"
                style={{ textDecoration: 'none' }}
              >
                <Phone size={18} />
                <span>Call Clinic (+91 92084 30808)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Credentials & Milestones Grid */}
        <div style={{ marginTop: '4rem' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Clinical Background</span>
            <h2 className="section-title">Academic Pedigree & Specializations</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {milestones.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.8rem', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(192, 160, 112, 0.2)'
                }}
              >
                <span style={{ display: 'inline-block', background: 'rgba(192, 160, 112, 0.15)', color: '#926B43', padding: '4px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                  {item.year}
                </span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinic Hygiene & Modern Infrastructure */}
        <div style={{ marginTop: '4.5rem', background: '#FBF9F5', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid #EFE8DE' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Clinic Standards</span>
            <h2 className="section-title">Safe, Modern & Patient-Centric Facility</h2>
            <p className="section-desc" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Located in Vivek Khand 2, Gomti Nagar, our clinic is equipped with global-standard sterilization, 
              digital diagnostics, and a peaceful treatment environment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {clinicHighlights.map((feat, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.6rem', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)' 
                }}
              >
                <div style={{ color: '#C0A070', marginBottom: '1rem' }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2D1A12' }}>{feat.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
