import React from 'react';
import { Award, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <Award size={36} className="badge-icon-svg" />,
      title: 'KGMU Lucknow Alumna',
      description: 'Graduation and Post-Graduation in Prosthodontics & Crown-Bridge from King George\'s Medical University, a premier institution.'
    },
    {
      icon: <ShieldAlert size={36} className="badge-icon-svg" />,
      title: 'Maxillofacial Specialist',
      description: 'Expertise in complex face, eye, ear, and nose prosthesis and advanced full-mouth reconstructions.'
    },
    {
      icon: <HeartHandshake size={36} className="badge-icon-svg" />,
      title: 'Honest clinical advice',
      description: 'Highly commended by patients for explaining treatment methods clearly and never advising unnecessary procedures.'
    }
  ];

  return (
    <section className="badges-section">
      <div className="container">
        <div className="badges-grid">
          {badges.map((badge, idx) => (
            <div key={idx} className="badge-card animate-fade-in delay-1">
              <div className="badge-icon-container">
                {badge.icon}
              </div>
              <h3 className="badge-title">{badge.title}</h3>
              <p className="badge-desc">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
