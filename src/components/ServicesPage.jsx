import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Calendar, ArrowRight, Sparkles, 
  ShieldCheck, CheckCircle2, Search, Filter 
} from 'lucide-react';
import { treatmentsData } from '../data/treatmentsData';

export default function ServicesPage({ onBack, onSelectService, onBookAppointment }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'implants', name: 'Implants & Surgery' },
    { id: 'cosmetic', name: 'Cosmetic & Whitening' },
    { id: 'ortho', name: 'Braces & Aligners' },
    { id: 'general', name: 'General & Preventive' }
  ];

  const categoryMap = {
    'dental-implant': 'implants',
    'maxillofacial-surgery': 'implants',
    'wisdom-teeth': 'implants',
    'root-canal': 'general',
    'teeth-whitening': 'cosmetic',
    'cosmetic-dentistry': 'cosmetic',
    'dental-crowns': 'cosmetic',
    'teeth-braces': 'ortho',
    'aligners': 'ortho',
    'kids-dentistry': 'general',
    'laser-dentistry': 'general',
    'mouth-ulcers': 'general',
    'dental-fillings': 'general',
    'dentures': 'implants',
    'advanced-gum': 'general',
    'snoring-sleep-apnea': 'general',
    'dental-xray': 'general'
  };

  const treatmentsArray = Object.values(treatmentsData);

  const filteredTreatments = treatmentsArray.filter((item) => {
    const matchesCategory = activeCategory === 'all' || categoryMap[item.id] === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.hero?.subtitle && item.hero.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="services-page animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Breadcrumb Bar */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">All Dental Treatments & Services</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">Clinical Specialties</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Comprehensive Dental Care in Gomti Nagar
          </h1>
          <p className="section-desc" style={{ maxWidth: '720px', margin: '0.8rem auto 0' }}>
            Led by KGMU alumna Dr. Aditi Mishra. Explore our specialized services featuring modern 
            technology, hospital-grade sterilization, and painless clinical techniques.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search treatments (e.g. Implants, Aligners, Root Canal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: '50px',
                border: '1px solid #E0D7C8',
                background: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                style={{
                  padding: '8px 18px',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: activeCategory === cat.id ? '1px solid #926B43' : '1px solid #E5DFD5',
                  background: activeCategory === cat.id ? '#2D1A12' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : '#555',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.8rem' }}>
          {filteredTreatments.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectService(item.id)}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(192, 160, 112, 0.2)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.hero?.image || '/assets/treatments/dental-implant.jpg'} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(45, 26, 18, 0.85)',
                  color: '#ffffff',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.shortName || item.name}
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: '#2D1A12', marginBottom: '0.6rem' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.2rem', flexGrow: 1 }}>
                  {item.hero?.subtitle || item.quote?.p1?.slice(0, 120) + '...'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0EAE1', paddingTop: '1rem' }}>
                  <span style={{ color: '#926B43', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    View Full Details <ArrowRight size={15} />
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
                    KGMU Certified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{
          marginTop: '4rem',
          background: 'linear-gradient(135deg, #2D1A12 0%, #4A2E20 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <span style={{ background: 'rgba(192, 160, 112, 0.3)', color: '#FFDF9E', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', display: 'inline-block', marginBottom: '1rem' }}>
            Personalized Treatment Plan
          </span>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>
            Not Sure Which Treatment is Right for You?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.8rem', color: '#E0D0C0', lineHeight: '1.6' }}>
            Schedule an in-person consultation with Dr. Aditi Mishra. We will conduct a thorough 
            examination, review digital X-rays, and provide transparent guidance.
          </p>
          <button 
            onClick={onBookAppointment}
            className="btn btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
            type="button"
          >
            <Calendar size={18} />
            <span>Book Your Clinical Consultation</span>
          </button>
        </div>

      </div>
    </div>
  );
}
