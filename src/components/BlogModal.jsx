import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Calendar, Clock, Share2, CheckCircle2, Check,
  Sparkles, ArrowRight, MessageSquare, ShieldCheck, Stethoscope, ArrowLeft 
} from 'lucide-react';

export default function BlogModal({ blog, isOpen, onClose, onBookAppointment }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll cleanly
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: blog.subtitle,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        // Clipboard write failed fallback
      }
    }
  };

  const handleBook = () => {
    onClose();
    if (onBookAppointment) {
      onBookAppointment(blog.title);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Aditi's Dental Clinic, I just read your blog article: "${blog.title}" and would like to consult with Dr. Aditi.`
  );

  const modalContent = (
    <div 
      className="blog-modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="blog-modal-title"
    >
      <div 
        className="blog-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Modal Header Bar */}
        <header className="blog-modal-top-bar">
          <div className="blog-modal-top-left">
            <button 
              type="button" 
              className="blog-modal-back-btn" 
              onClick={onClose}
              aria-label="Back to articles"
            >
              <ArrowLeft size={16} />
              <span>Back to Articles</span>
            </button>
            <span className="crumb-sep">/</span>
            <span className="blog-modal-cat-crumb">{blog.category}</span>
          </div>

          <div className="blog-modal-top-actions">
            <button 
              type="button" 
              className={`blog-share-btn ${copied ? 'copied' : ''}`}
              onClick={handleShare}
              title="Share this article"
              aria-label="Share article"
            >
              {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
            <button 
              type="button" 
              className="blog-modal-close-btn" 
              onClick={onClose}
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Modal Scrollable Body */}
        <div className="blog-modal-scroll-body">
          {/* Streamlined Hero Image Banner */}
          <div className="blog-modal-hero-wrapper">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="blog-modal-hero-img" 
            />
            <div className="blog-modal-hero-overlay" />
            <div className="blog-modal-hero-tags">
              <span className={`blog-badge-pill ${blog.type === 'case' ? 'case-pill' : 'guide-pill'}`}>
                {blog.type === 'case' ? 'Clinical Case' : 'Oral Health Guide'}
              </span>
              <span className="blog-badge-subpill">{blog.tag}</span>
            </div>
          </div>

          <div className="blog-modal-article-wrap">
            {/* Header info - tightly integrated with minimal gap */}
            <header className="blog-modal-header">
              <h1 id="blog-modal-title" className="blog-modal-title">{blog.title}</h1>
              <p className="blog-modal-subtitle">{blog.subtitle}</p>

              <div className="blog-modal-meta-row">
                <div className="blog-author-card">
                  <img 
                    src={blog.author.avatar || '/assets/dr-aditi.png'} 
                    alt={blog.author.name} 
                    className="blog-author-avatar"
                  />
                  <div className="blog-author-info">
                    <span className="blog-author-name">{blog.author.name}</span>
                    <span className="blog-author-role">{blog.author.role}</span>
                  </div>
                </div>

                <div className="blog-meta-pills">
                  <span className="blog-meta-item">
                    <Calendar size={13} />
                    <span>{blog.date}</span>
                  </span>
                  <span className="blog-meta-item">
                    <Clock size={13} />
                    <span>{blog.readTime}</span>
                  </span>
                </div>
              </div>
            </header>

            {/* Quick Summary / Case Highlights Box */}
            <div className="blog-highlights-box">
              <div className="blog-highlights-header">
                <Sparkles size={16} className="highlights-icon" />
                <h3>{blog.type === 'case' ? 'Clinical Case Highlights' : 'Key Article Takeaways'}</h3>
              </div>
              <div className="blog-highlights-grid">
                {blog.caseHighlights.map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <span className="highlight-label">{highlight.label}:</span>
                    <span className="highlight-value">{highlight.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Flow */}
            <div className="blog-modal-content-flow">
              {/* Introduction */}
              <div className="blog-content-section">
                <p className="blog-lead-text">{blog.content.introduction}</p>
                <p className="blog-body-text">{blog.content.patientBackground}</p>
              </div>

              {/* Diagnosis / Presentation */}
              <div className="blog-content-section diagnosis-section">
                <h3 className="blog-section-heading">
                  <Stethoscope size={18} className="section-icon" />
                  <span>{blog.type === 'case' ? 'Clinical Diagnosis & Findings' : 'Signs, Symptoms & When to Seek Care'}</span>
                </h3>
                <ul className="blog-check-list">
                  {blog.content.diagnosis.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step Breakdown */}
              <div className="blog-content-section steps-section">
                <h3 className="blog-section-heading">
                  <ShieldCheck size={18} className="section-icon" />
                  <span>{blog.type === 'case' ? 'Step-by-Step Clinical Protocol' : 'Comprehensive Treatment Insights'}</span>
                </h3>
                <div className="blog-steps-list">
                  {blog.content.treatmentSteps.map((stepItem, idx) => (
                    <div key={idx} className="blog-step-card">
                      <div className="step-number-badge">{idx + 1}</div>
                      <div className="step-text-wrap">
                        <h4 className="step-title">{stepItem.step}</h4>
                        <p className="step-desc">{stepItem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor's Quote */}
              <div className="blog-doctor-quote-box">
                <div className="quote-mark">“</div>
                <p className="quote-body">{blog.content.clinicalTakeaway}</p>
                <div className="quote-author-sign">
                  — <strong>Dr. Aditi Mishra</strong>, BDS, MDS (Prosthodontics, KGMU)
                </div>
              </div>

              {/* Post-Care Advice */}
              <div className="blog-content-section care-section">
                <h3 className="blog-section-heading">
                  <Sparkles size={18} className="section-icon" />
                  <span>{blog.type === 'case' ? 'Post-Treatment Care & Longevity Advice' : 'Home Care & Prevention Recommendations'}</span>
                </h3>
                <ul className="blog-care-tips-list">
                  {blog.content.postCareAdvice.map((tip, idx) => (
                    <li key={idx} className="care-tip-item">
                      <span className="tip-bullet">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Modal Consultation Card */}
            <div className="blog-modal-cta-card">
              <div className="cta-card-content">
                <span className="cta-card-eyebrow">Personalized Dental Evaluation</span>
                <h3 className="cta-card-title">Have a Similar Dental Concern?</h3>
                <p className="cta-card-desc">
                  Schedule a personal consultation with Dr. Aditi Mishra at our clinic in Gomti Nagar, Lucknow for a thorough evaluation and tailored treatment plan.
                </p>
                <div className="cta-card-buttons">
                  <button 
                    type="button" 
                    className="btn btn-primary cta-modal-book-btn"
                    onClick={handleBook}
                  >
                    <span>Book Appointment</span>
                    <ArrowRight size={15} />
                  </button>
                  <a 
                    href={`https://wa.me/919208430808?text=${whatsappMessage}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline cta-modal-wa-btn"
                  >
                    <MessageSquare size={15} />
                    <span>WhatsApp Enquiry</span>
                  </a>
                  <button 
                    type="button" 
                    className="btn btn-outline cta-modal-close-btn"
                    onClick={onClose}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : modalContent;
}
