import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      text: "Best Prosthodontist. Dr. Aditi is very competent and hard working dentist. She did my full mouth treatment and I can chew perfectly now.",
      author: "Rajesh K.",
      time: "2 months ago",
      badge: "Full Mouth Reconstruction"
    },
    {
      text: "She is a highly knowledgeable doctor, doesn’t advise unnecessary treatments and will always explain her methods. Her easy to implement advices have made significant difference for me.",
      author: "Shreya Singh",
      time: "1 month ago",
      badge: "Conservative Advice"
    },
    {
      text: "Best Prosthodontist and Implantologist in the area. She explained the entire dental implant process so well and did a completely painless surgery.",
      author: "Amit Verma",
      time: "3 months ago",
      badge: "Dental Implants"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section section-padding">
      <div className="container">
        <div className="section-header animate-fade-in">
          <span className="section-tag">Patient Stories</span>
          <h2 className="section-title">Loved by Our Patients</h2>
          <p className="section-desc">
            We are proud to maintain a <strong>5.0 Google Rating</strong> based on 87+ patient reviews. 
            Here is what our patients say about their experience.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="testimonial-card animate-fade-in"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="card-top">
                <div className="stars-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#C0A070" color="#C0A070" />
                  ))}
                </div>
                <div className="quote-icon-container">
                  <Quote size={20} className="quote-icon" />
                </div>
              </div>
              
              <p className="testimonial-text">"{rev.text}"</p>
              
              <div className="testimonial-footer">
                <div className="author-info">
                  <h4 className="author-name">{rev.author}</h4>
                  <span className="review-date">{rev.time}</span>
                </div>
                <span className="treatment-tag">{rev.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta animate-fade-in delay-2">
          <p className="reviews-cta-text">Want to read more stories or write a review?</p>
          <a 
            href="https://www.google.com/search?q=Dr+Aditi%27s+Dental+%26+Maxillofacial+Clinic" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-gold"
          >
            <span>View All Google Reviews</span>
          </a>
        </div>
      </div>
    </section>
  );
}
