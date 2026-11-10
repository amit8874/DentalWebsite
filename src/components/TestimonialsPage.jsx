import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Star, Quote, Calendar, 
  CheckCircle2, ExternalLink, Heart, Sparkles 
} from 'lucide-react';

export default function TestimonialsPage({ onBack, onBookAppointment }) {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const reviewsList = [
    {
      id: 1,
      text: "Best Prosthodontist in Lucknow. Dr. Aditi is very competent and hard working dentist. She did my full mouth treatment and I can chew perfectly now without any pain. Highly recommend her clinic to anyone seeking quality care.",
      author: "Rajesh K.",
      time: "2 months ago",
      badge: "Full Mouth Reconstruction",
      category: 'reconstruction',
      rating: 5,
      avatarColor: "#2D1A12"
    },
    {
      id: 2,
      text: "She is a highly knowledgeable doctor, doesn’t advise unnecessary treatments and will always explain her methods. Her easy to implement advices have made significant difference to my oral health.",
      author: "Shreya Singh",
      time: "1 month ago",
      badge: "Conservative Advice",
      category: 'general',
      rating: 5,
      avatarColor: "#926B43"
    },
    {
      id: 3,
      text: "Best Prosthodontist and Implantologist in Gomti Nagar. She explained the entire dental implant process so well and did a completely painless surgery. Recovery was seamless with zero swelling.",
      author: "Amit Verma",
      time: "3 months ago",
      badge: "Dental Implants",
      category: 'implants',
      rating: 5,
      avatarColor: "#49827B"
    },
    {
      id: 4,
      text: "Dr. Aditi is exceptional with aesthetic veneers. She took time to shade-match and preserve my natural enamel. My smile confidence is completely transformed! The clinic ambiance is also very calming.",
      author: "Dr. Priya Srivastava",
      time: "3 weeks ago",
      badge: "Smile Restoration",
      category: 'cosmetic',
      rating: 5,
      avatarColor: "#583525"
    },
    {
      id: 5,
      text: "Suffered with severe jaw clicking and TMJ pain for over a year. Dr. Aditi diagnosed the bite issue immediately with custom splint therapy. Completely pain-free now without surgery.",
      author: "Neeraj Gupta",
      time: "4 months ago",
      badge: "TMJ & Joint Care",
      category: 'tmj',
      rating: 5,
      avatarColor: "#2D1A12"
    },
    {
      id: 6,
      text: "Got 3 zirconia crowns done. Perfect fit on the very first trial and zero bite adjustment needed. Truly gentle, meticulous, and caring dental specialist. Cleanest clinic in Lucknow.",
      author: "Sunita Mehrotra",
      time: "1 month ago",
      badge: "Crowns & Bridges",
      category: 'reconstruction',
      rating: 5,
      avatarColor: "#926B43"
    },
    {
      id: 7,
      text: "Painless root canal treatment! I was terrified of dental needles, but Dr. Aditi was so patient and gentle that I didn't feel a single pinch. Exceptional hand skills and bedside manner.",
      author: "Vikas Agarwal",
      time: "2 weeks ago",
      badge: "Root Canal Therapy",
      category: 'general',
      rating: 5,
      avatarColor: "#49827B"
    },
    {
      id: 8,
      text: "Got clear aligners for my daughter. Dr. Aditi showed 3D digital simulation of teeth shifting before starting. Teeth are already straight and looking gorgeous in just 6 months!",
      author: "Meenakshi Tandon",
      time: "5 months ago",
      badge: "Clear Aligners",
      category: 'ortho',
      rating: 5,
      avatarColor: "#583525"
    }
  ];

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeFilter === 'implants') return rev.category === 'implants';
    if (activeFilter === 'cosmetic') return rev.category === 'cosmetic';
    if (activeFilter === 'reconstruction') return rev.category === 'reconstruction';
    if (activeFilter === 'general') return rev.category === 'general';
    return true;
  });

  return (
    <div className="testimonials-page animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Breadcrumb Bar */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Patient Stories & Google Reviews</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Rating Hero Score Card */}
        <div style={{
          background: 'linear-gradient(135deg, #2D1A12 0%, #3F2418 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div>
            <span style={{ background: 'rgba(192, 160, 112, 0.3)', color: '#FFDF9E', padding: '6px 14px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', display: 'inline-block', marginBottom: '0.8rem' }}>
              Verified Google Business Reviews
            </span>
            <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              5.0 Star Dental Clinic in Lucknow
            </h1>
            <p style={{ color: '#E0D0C0', maxWidth: '520px', lineHeight: '1.6' }}>
              Over 87+ patients have shared their genuine clinical experiences with Dr. Aditi Mishra. 
              Known for zero-pain treatments, honest guidance, and natural aesthetics.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            minWidth: '220px'
          }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#FFDF9E', lineHeight: '1' }}>
              5.0
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#FFDF9E" color="#FFDF9E" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#fff', opacity: 0.9 }}>
              100% Recommended
            </span>
            <div style={{ marginTop: '1.2rem' }}>
              <a 
                href="https://www.google.com/search?q=Dr+Aditi%27s+Dental+%26+Maxillofacial+Clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
                style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Write Google Review</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'implants', label: 'Dental Implants' },
            { id: 'cosmetic', label: 'Cosmetic & Veneers' },
            { id: 'reconstruction', label: 'Crowns & Full Mouth' },
            { id: 'general', label: 'Root Canal & Care' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              type="button"
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: activeFilter === tab.id ? '1px solid #926B43' : '1px solid #E5DFD5',
                background: activeFilter === tab.id ? '#2D1A12' : '#ffffff',
                color: activeFilter === tab.id ? '#ffffff' : '#555',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.8rem' }}>
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                border: '1px solid rgba(192, 160, 112, 0.2)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#C0A070" color="#C0A070" />
                  ))}
                </div>
                <span style={{
                  background: 'rgba(192, 160, 112, 0.15)',
                  color: '#926B43',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {rev.badge}
                </span>
              </div>

              <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: '1.7', fontStyle: 'italic', flexGrow: 1, marginBottom: '1.5rem' }}>
                "{rev.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F5EFEB', paddingTop: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: rev.avatarColor,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem'
                }}>
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#2D1A12' }}>{rev.author}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>{rev.time} • Google Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{
          marginTop: '4rem',
          background: '#FBF9F5',
          borderRadius: '24px',
          padding: '3rem 2rem',
          border: '1px solid #EFE8DE',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', color: '#2D1A12', marginBottom: '0.8rem' }}>
            Join Hundreds of Satisfied Patients
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', color: '#666', lineHeight: '1.6' }}>
            Book your consultation with Dr. Aditi Mishra today and experience patient-first dental care.
          </p>
          <button 
            onClick={onBookAppointment}
            className="btn btn-primary"
            type="button"
          >
            <Calendar size={18} />
            <span>Book Your Appointment Today</span>
          </button>
        </div>

      </div>
    </div>
  );
}
