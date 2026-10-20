import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const reviews = [
    {
      id: 1,
      text: "Best Prosthodontist in Lucknow. Dr. Aditi is very competent and hard working dentist. She did my full mouth treatment and I can chew perfectly now without any pain.",
      author: "Rajesh K.",
      time: "2 months ago",
      badge: "Full Mouth Reconstruction",
      avatarColor: "#2D1A12"
    },
    {
      id: 2,
      text: "She is a highly knowledgeable doctor, doesn’t advise unnecessary treatments and will always explain her methods. Her easy to implement advices have made significant difference.",
      author: "Shreya Singh",
      time: "1 month ago",
      badge: "Conservative Advice",
      avatarColor: "#926B43"
    },
    {
      id: 3,
      text: "Best Prosthodontist and Implantologist in Gomti Nagar. She explained the entire dental implant process so well and did a completely painless surgery.",
      author: "Amit Verma",
      time: "3 months ago",
      badge: "Dental Implants",
      avatarColor: "#49827B"
    },
    {
      id: 4,
      text: "Dr. Aditi is exceptional with aesthetic veneers. She took time to shade-match and preserve my natural enamel. My smile confidence is completely transformed!",
      author: "Dr. Priya Srivastava",
      time: "3 weeks ago",
      badge: "Smile Restoration",
      avatarColor: "#583525"
    },
    {
      id: 5,
      text: "Suffered with severe jaw clicking and TMJ pain for over a year. Dr. Aditi diagnosed the bite issue immediately with custom splint therapy. Completely pain-free now.",
      author: "Neeraj Gupta",
      time: "4 months ago",
      badge: "TMJ & Joint Care",
      avatarColor: "#2D1A12"
    },
    {
      id: 6,
      text: "Got 3 zirconia crowns done. Perfect fit on the very first trial and zero bite adjustment needed. Truly gentle, meticulous, and caring dental specialist.",
      author: "Sunita Mehrotra",
      time: "1 month ago",
      badge: "Crowns & Bridges",
      avatarColor: "#926B43"
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
      </div>

      {/* Infinite Seamless Scrolling Track (Left to Right) */}
      <div 
        className="testimonials-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Soft edge gradient masks */}
        <div className="carousel-fade-edge left"></div>
        <div className="carousel-fade-edge right"></div>

        {/* Marquee Track with duplicated items for seamless infinite loop */}
        <div className={`testimonials-marquee-track ${isPaused || isHovered ? 'is-paused' : ''}`}>
          {[...reviews, ...reviews].map((rev, index) => (
            <div 
              key={`${rev.id}-${index}`} 
              className="testimonial-card"
            >
              <div className="card-top">
                <div className="stars-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C0A070" color="#C0A070" />
                  ))}
                </div>
                <div className="quote-icon-container">
                  <Quote size={18} className="quote-icon" />
                </div>
              </div>
              
              <p className="testimonial-text">"{rev.text}"</p>
              
              <div className="testimonial-footer">
                <div className="author-row">
                  <div className="author-avatar" style={{ backgroundColor: rev.avatarColor }}>
                    {rev.author.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{rev.author}</h4>
                    <span className="review-date">{rev.time}</span>
                  </div>
                </div>
                <span className="treatment-tag">{rev.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Play / Pause toggle & CTA */}
        <div className="testimonials-bottom-bar">
          <button 
            type="button" 
            className="btn-pause-ticker"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPaused ? "Resume Auto-Slide" : "Pause on Hover / Tap"}</span>
          </button>
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
