import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="contact-icon-svg" size={24} />,
      title: 'Our Location',
      content: 'Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      link: 'https://maps.app.goo.gl/1ye8ETHSimo9SPKZn'
    },
    {
      icon: <Phone className="contact-icon-svg" size={24} />,
      title: 'Phone Number',
      content: '+91 92084 30808 / 092084 30808',
      link: 'tel:09208430808'
    },
    {
      icon: <Mail className="contact-icon-svg" size={24} />,
      title: 'Email Address',
      content: 'draditisdental@gmail.com',
      link: 'mailto:draditisdental@gmail.com'
    }
  ];

  const hours = [
    { days: 'Monday - Saturday', time: '11:00 AM - 08:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ];

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container contact-container animate-fade-in">
        
        <div className="contact-details-column">
          <span className="section-tag">Find Us</span>
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-desc">
            Have questions about a treatment or need help finding us? Reach out directly via phone, 
            email, or visit our clinic.
          </p>

          <div className="contact-info-list">
            {contactDetails.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link} 
                target={item.link.startsWith('http') ? '_blank' : '_self'} 
                rel="noopener noreferrer"
                className="contact-info-card"
              >
                <div className="contact-icon-container">
                  {item.icon}
                </div>
                <div className="contact-text-container">
                  <h4 className="contact-card-title">{item.title}</h4>
                  <p className="contact-card-text">{item.content}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="hours-container">
            <h4 className="hours-title">
              <Clock size={18} className="clock-icon" />
              <span>Clinic Hours</span>
            </h4>
            <div className="hours-list">
              {hours.map((h, idx) => (
                <div key={idx} className="hours-row">
                  <span className="hours-days">{h.days}</span>
                  <span className={`hours-time ${h.time === 'Closed' ? 'closed-time' : ''}`}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-map-column">
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.7891786566085!2d80.9930773!3d26.8466657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c02c63eb37%3A0xe5a1768fb3a8d116!2sDr%20Aditi&#39;s%20Dental%20%26%20Maxillofacial%20Clinic!5e0!3m2!1sen!2sin!4v1720800000000!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Aditi's Dental Clinic Map Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
