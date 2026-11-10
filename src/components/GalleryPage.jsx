import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Play, X, Calendar, 
  Sparkles, Camera, Film, Eye, ShieldCheck 
} from 'lucide-react';
import { showcaseItems } from '../data/showcaseData';

export default function GalleryPage({ onBack, onBookAppointment }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredItems = showcaseItems.filter((item) => {
    if (activeTab === 'videos') return item.type === 'video';
    if (activeTab === 'photos') return item.type === 'photo';
    return true;
  });

  return (
    <div className="gallery-page animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Breadcrumb Bar */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Clinic Gallery & Video Tour</span>
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
          <span className="section-tag">Visual Showcase</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Smile Transformations & Clinic Tour
          </h1>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0.8rem auto 0' }}>
            Explore our state-of-the-art facility in Gomti Nagar, high-standard sterilization protocols, 
            and real clinical procedure reels guided by Dr. Aditi Mishra.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
          <button
            onClick={() => setActiveTab('all')}
            type="button"
            style={{
              padding: '10px 22px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: activeTab === 'all' ? '1px solid #926B43' : '1px solid #E0D7C8',
              background: activeTab === 'all' ? '#2D1A12' : '#ffffff',
              color: activeTab === 'all' ? '#ffffff' : '#444'
            }}
          >
            All Media
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            type="button"
            style={{
              padding: '10px 22px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'videos' ? '1px solid #926B43' : '1px solid #E0D7C8',
              background: activeTab === 'videos' ? '#2D1A12' : '#ffffff',
              color: activeTab === 'videos' ? '#ffffff' : '#444'
            }}
          >
            <Film size={16} />
            <span>Clinical Video Reels</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            type="button"
            style={{
              padding: '10px 22px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: activeTab === 'photos' ? '1px solid #926B43' : '1px solid #E0D7C8',
              background: activeTab === 'photos' ? '#2D1A12' : '#ffffff',
              color: activeTab === 'photos' ? '#ffffff' : '#444'
            }}
          >
            <Camera size={16} />
            <span>Facility & Care Photos</span>
          </button>
        </div>

        {/* Media Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => {
                if (item.type === 'video') setSelectedVideo(item);
              }}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid rgba(192, 160, 112, 0.2)',
                cursor: item.type === 'video' ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#111' }}>
                <img 
                  src={item.src} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(45, 26, 18, 0.85)',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.badge}
                </span>

                {item.type === 'video' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)'
                  }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'rgba(192, 160, 112, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                    }}>
                      <Play size={22} fill="#ffffff" />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '1.4rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#2D1A12', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: '1.6', flexGrow: 1 }}>
                  {item.desc}
                </p>

                {item.type === 'video' ? (
                  <span style={{ marginTop: '0.8rem', color: '#926B43', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Play size={14} /> Watch Reel
                  </span>
                ) : (
                  <span style={{ marginTop: '0.8rem', color: '#888', fontSize: '0.85rem' }}>
                    Verified Clinic Photo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video Reel Modal */}
        {selectedVideo && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.4rem', borderBottom: '1px solid #eee' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#2D1A12' }}>{selectedVideo.title}</h4>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '0', height: '540px' }}>
                <iframe 
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

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
            Experience Our Gomti Nagar Clinic in Person
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', color: '#666', lineHeight: '1.6' }}>
            Enjoy gentle, high-tech dental care with zero waiting time by scheduling an advance consultation.
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
