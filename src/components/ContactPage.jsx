import React, { useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, MapPin, Phone, Mail, Clock, 
  MessageCircle, ShieldCheck, Calendar 
} from 'lucide-react';
import BookingForm from './BookingForm';

export default function ContactPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const contactDetails = [
    {
      icon: <MapPin size={24} />,
      title: 'Our Clinic Address',
      content: 'Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      link: 'https://maps.app.goo.gl/1ye8ETHSimo9SPKZn'
    },
    {
      icon: <Phone size={24} />,
      title: 'Direct Call / Emergency',
      content: '+91 92084 30808 / 092084 30808',
      link: 'tel:09208430808'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp Consultation',
      content: 'Chat instantly with our clinic desk',
      link: 'https://wa.me/919208430808?text=Hello%20Dr.%20Aditi%20Clinic,%20I%20would%20like%20to%20inquire%20about%20an%20appointment'
    },
    {
      icon: <Mail size={24} />,
      title: 'Official Email',
      content: 'draditisdental@gmail.com',
      link: 'mailto:draditisdental@gmail.com'
    }
  ];

  const hours = [
    { days: 'Monday – Saturday', time: '10:00 AM – 02:00 PM, 04:00 PM – 07:00 PM' },
    { days: 'Sunday', time: 'Closed (Emergency By Appointment)' }
  ];

  return (
    <div className="contact-page animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Breadcrumb Bar */}
      <div className="treatment-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Contact & Clinic Location</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Find Us</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Visit Dr. Aditi's Dental Clinic
          </h1>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0.8rem auto 0' }}>
            Conveniently located in Gomti Nagar, Lucknow. Book an appointment online below 
            or get in touch directly via phone or WhatsApp.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {contactDetails.map((item, idx) => (
            <a 
              key={idx}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '1.8rem',
                border: '1px solid rgba(192, 160, 112, 0.25)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#926B43';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(192, 160, 112, 0.25)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(192, 160, 112, 0.15)',
                color: '#926B43',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#2D1A12', marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5', margin: 0 }}>{item.content}</p>
            </a>
          ))}
        </div>

        {/* Working Hours & Map Column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {/* Clinic Hours Box */}
          <div style={{ background: '#FBF9F5', borderRadius: '20px', padding: '2rem', border: '1px solid #EFE8DE' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#2D1A12', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
              <Clock size={20} color="#926B43" />
              <span>Clinic Consultation Hours</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {hours.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: '1px solid #EAE3D9' }}>
                  <span style={{ fontWeight: '600', color: '#2D1A12' }}>{h.days}</span>
                  <span style={{ color: h.time.includes('Closed') ? '#B33927' : '#926B43', fontWeight: '500' }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.8rem', padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E8DFD3', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} color="#49827B" />
              <span style={{ fontSize: '0.88rem', color: '#555' }}>Zero waiting time with pre-booked appointments.</span>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', minHeight: '320px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.7891786566085!2d80.9930773!3d26.8466657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c02c63eb37%3A0xe5a1768fb3a8d116!2sDr%20Aditi&#39;s%20Dental%20%26%20Maxillofacial%20Clinic!5e0!3m2!1sen!2sin!4v1720800000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '320px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Aditi's Dental Clinic Map Location"
            ></iframe>
          </div>
        </div>

        {/* Online Appointment Booking Section */}
        <div style={{ marginTop: '2rem' }}>
          <BookingForm />
        </div>

      </div>
    </div>
  );
}
