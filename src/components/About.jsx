import React from 'react';
import { Award, GraduationCap, Heart, CheckCircle } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <GraduationCap size={20} />,
      title: 'Distinguished KGMU Alumna',
      desc: 'BDS & MDS (Prosthodontics) from the prestigious King George\'s Medical University, Lucknow.'
    },
    {
      icon: <Award size={20} />,
      title: 'Advanced Implantologist',
      desc: 'Specialized in dental implants, full-mouth reconstruction, and complex crown & bridge restorations.'
    },
    {
      icon: <CheckCircle size={20} />,
      title: 'Maxillofacial Rehabilitationist',
      desc: 'Pioneering custom silicone ocular (eye), auricular (ear), and nasal (nose) prosthetics.'
    },
    {
      icon: <Heart size={20} />,
      title: 'Conservative Treatment Philosophy',
      desc: 'Dedicated to explaining all methods and strictly avoiding unnecessary treatments.'
    }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container about-container animate-fade-in">
        <div className="about-image-column">
          <div className="about-photo-wrapper">
            <img 
              src="/assets/dr-aditi.png" 
              alt="Dr. Aditi Mishra" 
              className="about-photo"
            />
            <div className="experience-badge">
              <span className="exp-years">KGMU</span>
              <span className="exp-text">Alumna & Specialist</span>
            </div>
          </div>
        </div>

        <div className="about-content-column">
          <span className="section-tag">About the Specialist</span>
          <h2 className="about-name">Meet Dr. Aditi Mishra</h2>
          <p className="about-sub">BDS, MDS (Prosthodontics & Crown-Bridge, KGMU Lucknow)</p>
          
          <div className="about-bio">
            <p>
              Dr. Aditi Mishra is a highly trained and experienced Prosthodontist and Maxillofacial Implantologist 
              with a distinguished academic and clinical background. Her education at KGMU, one of India's 
              premier medical universities, equipped her with advanced clinical skills in precision-driven, aesthetic 
              and restorative dentistry.
            </p>
            <p>
              Dr. Aditi has spent years delivering high-end dental solutions, from digital smile design 
              and permanent implant restorations to specialized facial prosthetics that restore both form and 
              self-esteem for patients recovering from surgery or trauma.
            </p>
          </div>

          <div className="about-highlights-list">
            {highlights.map((item, index) => (
              <div key={index} className="about-highlight-item">
                <div className="highlight-icon-wrapper">
                  {item.icon}
                </div>
                <div className="highlight-text-wrapper">
                  <h4 className="highlight-item-title">{item.title}</h4>
                  <p className="highlight-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
