import React from 'react';

// Common stroke styling matching screenshot: dark brown/charcoal line art (#3D261A or #2D1A12)
const commonProps = {
  width: '52',
  height: '52',
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: '#3A281E',
  strokeWidth: '2.4',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

// 1. Teeth Braces Icon (3 teeth with horizontal archwire and brackets)
export const TeethBracesIcon = () => (
  <svg {...commonProps}>
    {/* Left tooth */}
    <path d="M12 20c0-6 4-8 8-8s8 2 8 8v16c0 5-3 8-8 8s-8-3-8-8V20z" />
    {/* Middle tooth */}
    <path d="M24 18c0-6 4-8 8-8s8 2 8 8v18c0 5-3 8-8 8s-8-3-8-8V18z" />
    {/* Right tooth */}
    <path d="M36 20c0-6 4-8 8-8s8 2 8 8v16c0 5-3 8-8 8s-8-3-8-8V20z" />
    {/* Horizontal archwire */}
    <line x1="8" y1="28" x2="56" y2="28" strokeWidth="2" stroke="#5A4032" />
    {/* Brackets on teeth */}
    <rect x="17" y="24" width="6" height="8" rx="1.5" fill="#FFFFFF" stroke="#3A281E" strokeWidth="2" />
    <rect x="29" y="24" width="6" height="8" rx="1.5" fill="#FFFFFF" stroke="#3A281E" strokeWidth="2" />
    <rect x="41" y="24" width="6" height="8" rx="1.5" fill="#FFFFFF" stroke="#3A281E" strokeWidth="2" />
  </svg>
);

// 2. Mouth Ulcers Icon (Lips and tongue with ulcer dots)
export const MouthUlcersIcon = () => (
  <svg {...commonProps}>
    {/* Upper lip */}
    <path d="M14 26c6-6 12-4 18-2 6-2 12-4 18 2" />
    {/* Lower mouth contour */}
    <path d="M14 26c4 10 12 16 18 16s14-6 18-16" />
    {/* Inner Tongue sticking down */}
    <path d="M22 30c0 10 4 18 10 18s10-8 10-18" fill="#FDFBF9" />
    <line x1="32" y1="32" x2="32" y2="44" strokeWidth="1.8" />
    {/* Ulcer Dots */}
    <circle cx="27" cy="40" r="1.5" fill="#3A281E" stroke="none" />
    <circle cx="37" cy="38" r="1.5" fill="#3A281E" stroke="none" />
    <circle cx="30" cy="44" r="1.2" fill="#3A281E" stroke="none" />
    <circle cx="34" cy="42" r="1.2" fill="#3A281E" stroke="none" />
  </svg>
);

// 3. Dental Implant Icon (Tooth crown on top of surgical implant screw)
export const DentalImplantIcon = () => (
  <svg {...commonProps}>
    {/* Crown on top */}
    <path d="M20 22c0-8 5-10 12-10s12 2 12 10c0 4-3 6-5 6H25c-2 0-5-2-5-6z" fill="#FFFFFF" />
    {/* Implant Collar */}
    <rect x="26" y="28" width="12" height="4" rx="1" fill="#FFFFFF" />
    {/* Screw Body */}
    <path d="M27 32h10l-1 18a4 4 0 0 1-8 0l-1-18z" fill="#FFFFFF" />
    {/* Screw Threads */}
    <line x1="26" y1="36" x2="38" y2="36" strokeWidth="2" />
    <line x1="27" y1="40" x2="37" y2="40" strokeWidth="2" />
    <line x1="28" y1="44" x2="36" y2="44" strokeWidth="2" />
    <line x1="29" y1="48" x2="35" y2="48" strokeWidth="2" />
  </svg>
);

// 4. Aligners Icon (Two teeth with dimension bracket measuring alignment)
export const AlignersIcon = () => (
  <svg {...commonProps}>
    {/* Left Tooth */}
    <path d="M15 28c0-5 3-7 7-7s7 2 7 7v10c0 4-3 6-7 6s-7-2-7-6V28z" fill="#FFFFFF" />
    {/* Right Tooth */}
    <path d="M35 28c0-5 3-7 7-7s7 2 7 7v10c0 4-3 6-7 6s-7-2-7-6V28z" fill="#FFFFFF" />
    {/* Aligning Dimension Bracket Bar */}
    <line x1="20" y1="14" x2="44" y2="14" strokeWidth="2.2" />
    {/* Vertical end caps */}
    <line x1="20" y1="10" x2="20" y2="18" strokeWidth="2.2" />
    <line x1="44" y1="10" x2="44" y2="18" strokeWidth="2.2" />
    {/* Lower dental tray base */}
    <path d="M12 44c8 3 14 3 20 3s12 0 20-3" strokeWidth="2.4" />
  </svg>
);

// 5. Kids Dentistry Icon (Smiling child face with hair and tooth)
export const KidsDentistryIcon = () => (
  <svg {...commonProps}>
    {/* Face Circle */}
    <circle cx="32" cy="33" r="19" fill="#FFFFFF" />
    {/* Kid Hair Swoop */}
    <path d="M17 26c4-9 14-11 22-9 6 2 10 7 12 11-4-5-12-8-19-6-5 1-11 4-15 4z" fill="#3A281E" />
    {/* Big Happy Smile */}
    <path d="M22 36c2 8 8 11 10 11s8-3 10-11H22z" fill="#3A281E" />
    {/* Visible Central Baby Tooth */}
    <rect x="30" y="36" width="4" height="4" rx="1" fill="#FFFFFF" stroke="none" />
  </svg>
);

// 6. Laser Dentistry Icon (Tooth treated with precision laser wand)
export const LaserDentistryIcon = () => (
  <svg {...commonProps}>
    {/* Molar Tooth */}
    <path d="M18 36c0-6 4-8 10-8 2 0 4 1 6 1s4-1 6-1c6 0 10 2 10 8v8c0 5-4 7-9 7-3 0-5-2-7-2s-4 2-7 2c-5 0-9-2-9-7v-8z" fill="#FFFFFF" />
    {/* Laser Handpiece Wand */}
    <path d="M48 10l-6 6" strokeWidth="3" />
    <path d="M46 16l3 3" strokeWidth="2" />
    {/* Laser Emitting Tip */}
    <line x1="42" y1="16" x2="38" y2="20" strokeWidth="2" />
    {/* Focused Laser Beam Rays */}
    <line x1="37" y1="22" x2="34" y2="28" strokeWidth="2.5" stroke="#C84B1A" />
    {/* Laser spark pulse */}
    <circle cx="34" cy="29" r="1.5" fill="#C84B1A" stroke="none" />
  </svg>
);

// 7. Root Canal Treatment Icon (Tooth with endodontic file entering pulp)
export const RootCanalIcon = () => (
  <svg {...commonProps}>
    {/* Tooth Outer Contour with Two Roots */}
    <path d="M20 28c0-6 4-8 8-8 2 0 4 1 6 1s4-1 6-1c4 0 8 2 8 8v6c0 6-2 16-5 18-2 1-4-4-5-8-1-4-2-4-3 0-1 4-3 9-5 8-3-2-5-12-5-18v-6z" fill="#FFFFFF" />
    {/* Endodontic File Handle */}
    <rect x="23" y="10" width="6" height="7" rx="1.5" fill="#3A281E" />
    {/* Endodontic Rotary Shaft Entering Canal */}
    <line x1="26" y1="17" x2="26" y2="40" strokeWidth="2.2" stroke="#3A281E" />
    <line x1="25" y1="28" x2="27" y2="28" strokeWidth="1.5" />
    <line x1="25" y1="32" x2="27" y2="32" strokeWidth="1.5" />
    <line x1="25" y1="36" x2="27" y2="36" strokeWidth="1.5" />
  </svg>
);

// 8. Dental Crowns Icon (Molar with crown cap being fitted over top)
export const DentalCrownsIcon = () => (
  <svg {...commonProps}>
    {/* Floating / Fitted Crown Cap on top */}
    <path d="M19 23c0-6 4-7 9-7 2 0 3.5 1 5 1s3-1 5-1c5 0 9 1 9 7 0 2-2 4-5 4H24c-3 0-5-2-5-4z" fill="#E8F4FA" stroke="#3A281E" strokeWidth="2.4" />
    {/* Lower Natural Tooth Roots */}
    <path d="M22 30h22v6c0 6-2 14-5 16-2 1-4-3-5-7-1-4-2-4-3 0-1 4-3 8-5 7-3-2-5-10-5-16v-6z" fill="#FFFFFF" />
  </svg>
);

// 9. Dental Fillings Icon (Tooth with restorative inlay entering prepared cavity)
export const DentalFillingsIcon = () => (
  <svg {...commonProps}>
    {/* Molar Tooth Body with Prepared Cavity Notch */}
    <path d="M20 28c0-5 3-7 6-7h14c3 0 6 2 6 7v8c0 6-2 14-5 16-2 1-4-3-5-7-1-4-2-4-3 0-1 4-3 8-5 7-3-2-5-10-5-16v-8z" fill="#FFFFFF" />
    {/* Fitting Inlay Filling Block */}
    <path d="M23 18c0-2 4-4 10-4s10 2 10 4v4c0 3-4 5-10 5s-10-2-10-5v-4z" fill="#DCEEF7" stroke="#3A281E" strokeWidth="2.2" />
  </svg>
);

// 10. Wisdom Teeth Extraction Icon (Two molar teeth side-by-side)
export const WisdomTeethIcon = () => (
  <svg {...commonProps}>
    {/* Left Molar */}
    <path d="M14 26c0-5 3-6 6-6s4 1 6 1c2 0 3-1 5-1 3 0 5 1 5 6v7c0 5-1 12-3 13-2 1-3-3-4-6-1-3-1-3-2 0-1 3-2 7-4 6-2-1-3-8-3-13v-7z" fill="#FFFFFF" strokeWidth="2.2" />
    {/* Right Molar */}
    <path d="M30 26c0-5 3-6 6-6s4 1 6 1c2 0 3-1 5-1 3 0 5 1 5 6v7c0 5-1 12-3 13-2 1-3-3-4-6-1-3-1-3-2 0-1 3-2 7-4 6-2-1-3-8-3-13v-7z" fill="#FFFFFF" strokeWidth="2.2" />
  </svg>
);

// 11. Dentures Icon (Complete denture with teeth and cleansing sparkle rays)
export const DenturesIcon = () => (
  <svg {...commonProps}>
    {/* Denture Base (Acrylic Gum arch) */}
    <path d="M16 38c0-4 6-7 17-7s17 3 17 7c0 5-6 10-17 10s-17-5-17-10z" fill="#FBF3EC" />
    {/* Upper Teeth in Denture */}
    <path d="M19 36c0-6 4-10 14-10s14 4 14 10" strokeWidth="2.4" />
    {/* Individual Teeth Separation Segments */}
    <line x1="26" y1="28" x2="26" y2="35" strokeWidth="1.8" />
    <line x1="33" y1="26" x2="33" y2="35" strokeWidth="1.8" />
    <line x1="40" y1="28" x2="40" y2="35" strokeWidth="1.8" />
    {/* Clean Sparkle Rays */}
    <line x1="33" y1="13" x2="33" y2="18" strokeWidth="2.2" stroke="#D18636" />
    <line x1="22" y1="18" x2="25" y2="21" strokeWidth="2.2" stroke="#D18636" />
    <line x1="44" y1="18" x2="41" y2="21" strokeWidth="2.2" stroke="#D18636" />
  </svg>
);

// 12. Advanced Gum Treatment Icon (Tooth rooted securely in contoured healthy gums)
export const AdvancedGumIcon = () => (
  <svg {...commonProps}>
    {/* Tooth Crown & Roots */}
    <path d="M22 24c0-6 4-8 10-8s10 2 10 8c0 4-2 7-3 10-2 6-4 14-7 14s-5-8-7-14c-1-3-3-6-3-10z" fill="#FFFFFF" />
    {/* Surrounding Healthy Gingival Gum Line Contour */}
    <path d="M14 36c4-3 8-2 11 0 4 3 10 3 14 0 3-2 7-3 11 0" strokeWidth="2.8" stroke="#3A281E" />
    {/* Soft Gingival Base */}
    <path d="M15 38c5 5 12 7 17 7s12-2 17-7" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);
