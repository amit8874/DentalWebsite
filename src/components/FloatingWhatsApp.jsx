import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [arrowHit, setArrowHit] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let hitTimer;
    let bubbleTimer;
    let loopTimer;

    // Phase 1: Archer draws (0s - 0.6s)
    setArrowHit(false);

    // Phase 2: Arrow flies across screen and strikes WhatsApp button at 1.4s
    hitTimer = setTimeout(() => {
      setArrowHit(true);
    }, 1400);

    // Phase 3: "Book Appointment" arrow bubble bursts out on impact
    bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    // Phase 4: Loop restarts every 8 seconds
    loopTimer = setTimeout(() => {
      setAnimationCycle((prev) => prev + 1);
    }, 8000);

    return () => {
      clearTimeout(hitTimer);
      clearTimeout(bubbleTimer);
      clearTimeout(loopTimer);
    };
  }, [animationCycle]);

  const whatsappUrl = "https://wa.me/919208430808?text=Hello%20Dr.%20Aditi,%20I%20would%20like%20to%20book%20a%20dental%20appointment.";

  return (
    <div className="archer-whatsapp-system" key={animationCycle}>
      {/* ======================================================== */}
      {/* 1. ARCHER ON THE FAR LEFT SIDE AT THE END                */}
      {/* ======================================================== */}
      <div className="floating-archer-left">
        <div className="archer-character-box">
          <svg 
            className="big-archer-svg" 
            viewBox="0 0 74 74" 
            width="72" 
            height="72" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Quiver on back with arrows */}
            <path d="M22 18 L16 38 L20 40 L26 20 Z" fill="#926B43" />
            <line x1="22" y1="18" x2="18" y2="10" stroke="#C0A070" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="25" y1="19" x2="23" y2="9" stroke="#C0A070" strokeWidth="2.5" strokeLinecap="round" />

            {/* Archer Head & Feather Crest */}
            <circle cx="28" cy="18" r="8" fill="#2D1A12" />
            <path d="M22 13 Q28 8 35 12 Q28 15 22 13 Z" fill="#C0A070" />

            {/* Torso & Athletic Archer Stance */}
            <path 
              d="M24 26 C24 26, 29 24, 34 26 C37 28, 40 36, 36 44 L28 42 L25 58 L19 57 L24 40 L16 46 L11 43 L18 32 Z" 
              fill="#2D1A12" 
            />
            {/* Front Leg */}
            <path d="M30 42 L42 58 L48 56 L36 40 Z" fill="#2D1A12" />
            
            {/* Recurve Gold Bow */}
            <path 
              d="M40 8 C56 22, 56 50, 40 64" 
              stroke="#C0A070" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Bow Grip */}
            <path d="M48 32 C50 34, 50 38, 48 40" stroke="#2D1A12" strokeWidth="5.5" strokeLinecap="round" />

            {/* Drawn Bowstring */}
            <path 
              d="M40 8 L31 36 L40 64" 
              stroke="#EFE8DC" 
              strokeWidth="1.8" 
              strokeDasharray="3 1" 
            />

            {/* Arms Drawing Bow to Cheek */}
            <path 
              d="M24 30 L35 34 L46 36" 
              stroke="#2D1A12" 
              strokeWidth="4.2" 
              strokeLinecap="round" 
            />
          </svg>

          {/* Big Flying Golden Arrow shooting across screen */}
          <div className={`big-flying-arrow ${arrowHit ? 'arrow-hidden-impact' : 'arrow-flying-across'}`}>
            <svg viewBox="0 0 80 20" width="76" height="20" fill="none">
              <defs>
                <linearGradient id="goldArrowTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C0A070" stopOpacity="0" />
                  <stop offset="60%" stopColor="#C0A070" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#F0D5AC" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Luminous Streak Tail */}
              <line x1="2" y1="10" x2="55" y2="10" stroke="url(#goldArrowTrail)" strokeWidth="4.5" strokeLinecap="round" />
              {/* Main Arrow Shaft */}
              <line x1="15" y1="10" x2="65" y2="10" stroke="#C0A070" strokeWidth="3" strokeLinecap="round" />
              {/* Big Golden Arrowhead */}
              <polygon points="62,3 78,10 62,17" fill="#C0A070" stroke="#FFFFFF" strokeWidth="1" />
              {/* Fletching */}
              <line x1="16" y1="5" x2="22" y2="10" stroke="#2D1A12" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="16" y1="15" x2="22" y2="10" stroke="#2D1A12" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="5" x2="28" y2="10" stroke="#2D1A12" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="15" x2="28" y2="10" stroke="#2D1A12" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. WHATSAPP & PUMPING APPOINTMENT BUBBLE ON RIGHT SIDE   */}
      {/* ======================================================== */}
      <div className="floating-whatsapp-right">
        {/* "Book Appointment" Arrow-shaped Bubble with Brown background & White text */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`appointment-arrow-bubble ${showBubble ? 'bubble-active pump-always' : 'bubble-dormant'}`}
          title="Click to Book Appointment via WhatsApp"
        >
          <span className="bubble-icon-spark">
            <Sparkles size={15} color="#C0A070" />
          </span>
          <span className="bubble-text-content">Book Appointment</span>
          
          {/* Arrow-like structure pointing right directly at WhatsApp icon */}
          <span className="bubble-pointer-arrow"></span>
        </a>

        {/* WhatsApp Target Button */}
        <div className={`whatsapp-button-target ${arrowHit ? 'target-struck-bounce' : ''}`}>
          {/* Target Impact Waves and Spark Burst */}
          {arrowHit && <div className="target-impact-shockwave"></div>}
          {arrowHit && <div className="target-impact-sparkles">✦</div>}

          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-main-circle" 
            aria-label="Direct WhatsApp Consultation with Dr. Aditi"
          >
            {/* WhatsApp Logo */}
            <svg 
              viewBox="0 0 24 24" 
              width="34" 
              height="34" 
              fill="#FFFFFF"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
