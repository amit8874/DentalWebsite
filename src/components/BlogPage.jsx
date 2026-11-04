import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Calendar, Clock, BookOpen, 
  ArrowRight, Sparkles, Stethoscope, HeartPulse, CheckCircle2 
} from 'lucide-react';
import { blogsData } from '../data/blogsData';
import BlogModal from './BlogModal';

export default function BlogPage({ onBack, onBookAppointment }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleOpenBlog = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredBlogs = blogsData.filter(blog => {
    if (activeFilter === 'case') return blog.type === 'case';
    if (activeFilter === 'guide') return blog.type === 'guide';
    return true;
  });

  return (
    <div className="blog-page">
      {/* 1. Slim Breadcrumbs Bar */}
      <div className="blog-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <div className="breadcrumb-path">
            <button onClick={onBack} className="breadcrumb-link" type="button">
              Home
            </button>
            <ChevronRight size={13} className="breadcrumb-separator" />
            <span className="breadcrumb-current-desktop">Dental Blog & Clinical Cases</span>
            <span className="breadcrumb-current-mobile">Dental Blog</span>
          </div>

          <button onClick={onBack} className="btn-back-treatments" type="button">
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Blog Page Hero Header (Allows Cards to Show Immediately Above Fold) */}
      <section className="blog-page-hero-compact">
        <div className="container blog-hero-compact-container">
          <div className="blog-hero-top-row">
            <span className="blog-hero-compact-badge">
              <Sparkles size={13} />
              <span>CLINICAL INSIGHTS & CASE STUDIES</span>
            </span>
          </div>
          <h1 className="blog-page-compact-title">
            Dr. Aditi's Dental Blog & Clinical Cases
          </h1>
          <p className="blog-page-compact-subtitle">
            Authentic clinical cases, advanced smile rehabilitations, and expert dental care advice from Dr. Aditi Mishra (KGMU Lucknow).
          </p>

          {/* Sleek Compact Filter Bar */}
          <div className="blog-filter-compact-wrapper">
            <div className="blog-filter-compact-bar">
              <button
                type="button"
                className={`blog-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <BookOpen size={14} />
                <span>All Articles ({blogsData.length})</span>
              </button>
              <button
                type="button"
                className={`blog-filter-pill ${activeFilter === 'case' ? 'active' : ''}`}
                onClick={() => setActiveFilter('case')}
              >
                <Stethoscope size={14} />
                <span>Clinical Cases (2)</span>
              </button>
              <button
                type="button"
                className={`blog-filter-pill ${activeFilter === 'guide' ? 'active' : ''}`}
                onClick={() => setActiveFilter('guide')}
              >
                <HeartPulse size={14} />
                <span>Oral Health Guides (2)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Blogs Grid Section */}
      {/* 
        Requirement: "add 4 blogs 3 side by side and 4th next line."
        On desktop (>= 992px): 3 columns in row 1, 4th blog on row 2!
      */}
      <section className="blog-cards-compact-section">
        <div className="container">
          <div className="blogs-grid-three-col">
            {filteredBlogs.map((blog, index) => {
              const isFourthCard = filteredBlogs.length === 4 && index === 3;
              return (
                <article 
                  key={blog.id} 
                  className={`blog-card ${isFourthCard ? 'blog-card-fourth' : ''}`}
                  onClick={() => handleOpenBlog(blog)}
                >
                  {/* Image & Badges */}
                  <div className="blog-card-media">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="blog-card-image" 
                      loading="lazy"
                    />
                    <div className="blog-card-badge-container">
                      <span className={`blog-category-badge ${blog.type === 'case' ? 'badge-case' : 'badge-guide'}`}>
                        {blog.type === 'case' ? 'Clinical Case' : 'Oral Health'}
                      </span>
                    </div>
                    <span className="blog-card-readtime">
                      <Clock size={11} />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <Calendar size={12} />
                        <span>{blog.date}</span>
                      </span>
                      <span className="blog-meta-dot">•</span>
                      <span className="blog-card-tag">{blog.tag}</span>
                    </div>

                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>

                    {/* Highlights Preview */}
                    <div className="blog-card-keypoint">
                      <CheckCircle2 size={14} className="keypoint-icon" />
                      <span>{blog.caseHighlights[0].label}: <strong>{blog.caseHighlights[0].val}</strong></span>
                    </div>

                    {/* Footer with Doctor & Read More Button */}
                    <div className="blog-card-footer">
                      <div className="blog-card-author">
                        <img 
                          src={blog.author.avatar || '/assets/dr-aditi.png'} 
                          alt={blog.author.name} 
                          className="author-mini-avatar" 
                        />
                        <div className="author-mini-text">
                          <span className="author-mini-name">{blog.author.name}</span>
                          <span className="author-mini-role">KGMU Alumna</span>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="btn-read-more"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBlog(blog);
                        }}
                        aria-label={`Read more about ${blog.title}`}
                      >
                        <span>Read more</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="blog-bottom-support-banner">
            <div className="support-banner-inner">
              <div className="support-banner-text">
                <span className="support-eyebrow">Expert Dental Guidance</span>
                <h3 className="support-title">Looking for Advice on Your Personal Dental Case?</h3>
                <p className="support-desc">
                  Every smile is unique. Dr. Aditi Mishra offers detailed digital evaluations, 3D smile planning, 
                  and honest treatment recommendations at our clinic in Gomti Nagar, Lucknow.
                </p>
              </div>
              <div className="support-banner-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => onBookAppointment && onBookAppointment('Blog Consultation')}
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Blog Modal rendered via createPortal into document.body */}
      <BlogModal 
        blog={selectedBlog} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onBookAppointment={onBookAppointment}
      />
    </div>
  );
}
