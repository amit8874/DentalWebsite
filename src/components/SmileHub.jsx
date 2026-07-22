import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Calendar, Info, Activity,
  ArrowRight, ShieldCheck, HeartPulse
} from 'lucide-react';

export default function SmileHub() {
  const [activeTab, setActiveTab] = useState('slider');

  // Slider State & Refs
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Quiz State
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: '',
    sensitivity: '',
    jaw: '',
    examination: ''
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(100);
  const [recommendation, setRecommendation] = useState(null);

  const quizSteps = [
    {
      key: 'goal',
      question: 'What is your primary goal or concern for your teeth?',
      options: [
        { label: 'Fix discoloration & brighten my teeth', value: 'cosmetic', text: 'Aesthetic whitening/veneers' },
        { label: 'Close gaps or repair chipped/worn teeth', value: 'cosmetic', text: 'Tooth restructuring' },
        { label: 'Replace one or more missing teeth', value: 'implants', text: 'Tooth replacement' },
        { label: 'Address jaw joint pain, clicking, or clenching', value: 'tmd', text: 'TMJ / TMD Care' },
        { label: 'Routine cleanup, checkup or general toothache', value: 'general', text: 'General maintenance' }
      ]
    },
    {
      key: 'sensitivity',
      question: 'How often do you experience tooth sensitivity to hot or cold food/drinks?',
      options: [
        { label: 'Never - my teeth feel perfectly strong', value: 'never', penalty: 0 },
        { label: 'Occasionally - mild sensitivity now and then', value: 'occasional', penalty: 5 },
        { label: 'Frequently - it is uncomfortable when eating/drinking', value: 'frequent', penalty: 15 },
        { label: 'Constantly - severe pain that lingers', value: 'constant', penalty: 25 }
      ]
    },
    {
      key: 'jaw',
      question: 'Have you noticed any clicking, clenching, or stiffness in your jaw joint?',
      options: [
        { label: 'No, my jaw feels completely comfortable', value: 'none', penalty: 0 },
        { label: 'Yes, occasional popping/clicking when opening wide', value: 'clicking', penalty: 5 },
        { label: 'Yes, frequent clenching or stiffness (especially in morning)', value: 'clenching', penalty: 15 },
        { label: 'Yes, painful clicking or jaw locking episodes', value: 'locking', penalty: 25 }
      ]
    },
    {
      key: 'examination',
      question: 'When was your last comprehensive dental examination?',
      options: [
        { label: 'Within the last 6 months', value: '6months', penalty: 0 },
        { label: '6 to 12 months ago', value: 'year', penalty: 5 },
        { label: '1 to 2 years ago', value: '2years', penalty: 15 },
        { label: 'More than 2 years ago / Only when I feel severe pain', value: 'never', penalty: 25 }
      ]
    }
  ];

  const handleSelectOption = (key, val) => {
    setAnswers({
      ...answers,
      [key]: val
    });
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    // 1. Calculate Score
    let calculatedScore = 100;
    
    // Sensitivity penalty
    const sensOpt = quizSteps[1].options.find(o => o.value === answers.sensitivity);
    if (sensOpt) calculatedScore -= sensOpt.penalty;

    // Jaw joint penalty
    const jawOpt = quizSteps[2].options.find(o => o.value === answers.jaw);
    if (jawOpt) calculatedScore -= jawOpt.penalty;

    // Last exam penalty
    const examOpt = quizSteps[3].options.find(o => o.value === answers.examination);
    if (examOpt) calculatedScore -= examOpt.penalty;

    calculatedScore = Math.max(30, calculatedScore);
    setScore(calculatedScore);

    // 2. Determine Recommendation based on primary goal category
    const mainGoal = answers.goal; // cosmetic, implants, tmd, general
    let treatment = {
      title: '',
      desc: '',
      icon: <Sparkles size={24} />,
      serviceCode: 'general'
    };

    if (mainGoal === 'cosmetic') {
      treatment = {
        title: 'Smile Designing & Custom Veneers',
        desc: 'Based on your aesthetic goals, Dr. Aditi recommends a digital smile analysis to assess ultra-thin E-max porcelain veneers or cosmetic composite bonding. This restores alignment and brilliance conservatively.',
        icon: <Sparkles size={24} />,
        serviceCode: 'cosmetic'
      };
    } else if (mainGoal === 'implants') {
      treatment = {
        title: 'Dental Implants & Crown Restoration',
        desc: 'For tooth replacement, titanium biocompatible implants offer permanent chewing stability and natural bone preservation. Dr. Aditi specializes in prosthetically-driven implant placement.',
        icon: <Activity size={24} />,
        serviceCode: 'implants'
      };
    } else if (mainGoal === 'tmd') {
      treatment = {
        title: 'TMD / TMJ Splint Therapy & Muscle Care',
        desc: 'Your jaw joint symptoms suggest clenching or alignment strain. Dr. Aditi provides customized night splints, joint exercises, and bite alignment to protect your teeth and stop facial pain.',
        icon: <ShieldCheck size={24} />,
        serviceCode: 'tmd'
      };
    } else {
      treatment = {
        title: 'Comprehensive Consultation & Scaling',
        desc: 'A clinical examination and ultrasonic scaling will resolve standard sensitivity issues, polish stains, and diagnose any hidden micro-decay before it advances. Conservative preventive care.',
        icon: <HeartPulse size={24} />,
        serviceCode: 'general'
      };
    }

    setRecommendation(treatment);
    setQuizFinished(true);
  };

  const handleResetQuiz = () => {
    setAnswers({
      goal: '',
      sensitivity: '',
      jaw: '',
      examination: ''
    });
    setCurrentStep(0);
    setQuizFinished(false);
  };

  const handlePreFillAndBook = () => {
    if (!recommendation) return;
    
    // Create prefill data string
    const goalLabel = quizSteps[0].options.find(o => o.value === answers.goal)?.label || '';
    const sensLabel = quizSteps[1].options.find(o => o.value === answers.sensitivity)?.label || '';
    const jawLabel = quizSteps[2].options.find(o => o.value === answers.jaw)?.label || '';
    const examLabel = quizSteps[3].options.find(o => o.value === answers.examination)?.label || '';

    const notesText = `Oral Health Assessment Pre-fill:
- Primary Goal: ${goalLabel}
- Sensitivity: ${sensLabel}
- Jaw clicking/tightness: ${jawLabel}
- Last exam: ${examLabel}
- Calculated Score: ${score}/100`;

    // Dispatch custom event to communicate with BookingForm.jsx
    const event = new CustomEvent('prefillBooking', {
      detail: {
        service: recommendation.serviceCode,
        notes: notesText
      }
    });
    window.dispatchEvent(event);

    // Smooth scroll to booking
    const bookingSection = document.querySelector('#booking');
    if (bookingSection) {
      const headerOffset = 80;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Dashoffset calculation for svg circle
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="smile-hub" className="smile-hub-section section-padding">
      <div className="container">
        
        <div className="section-header animate-fade-in">
          <span className="section-tag">Interactive smile studio</span>
          <h2 className="section-title">Explore Your Smile Potential</h2>
          <p className="section-desc">
            Try our interactive transformation simulator or take a quick 1-minute clinical self-assessment 
            to receive customized treatment guidance directly from Dr. Aditi.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-container animate-fade-in delay-1">
          <button
            onClick={() => setActiveTab('slider')}
            className={`tab-btn ${activeTab === 'slider' ? 'active' : ''}`}
          >
            Smile Makeover Slider
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          >
            Oral Health & Joint Assessment
          </button>
        </div>

        <div className="smile-hub-card animate-fade-in delay-2">
          {/* Decorative Spotlight Glows */}
          <div className="glow-spotlight-top"></div>
          <div className="glow-spotlight-bottom"></div>

          {activeTab === 'slider' && (
            <div className="slider-container">
              <div 
                ref={containerRef}
                className="slider-wrapper"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                {/* Background Image: After */}
                <img 
                  src="/assets/smile_after.png" 
                  alt="Smile Transformation After" 
                  className="slider-img"
                />
                
                {/* Foreground Image: Before */}
                <div 
                  className="slider-overlay-container" 
                  style={{ width: `${sliderPos}%` }}
                >
                  <img 
                    src="/assets/smile_before.png" 
                    alt="Smile Transformation Before" 
                    className="slider-img"
                    style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  />
                  <span className="slider-label before">Before Treatment</span>
                </div>

                <span className="slider-label after">After Veneers</span>

                {/* Divider Line */}
                <div 
                  className="slider-divider" 
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="slider-handle">
                    <Activity size={18} />
                  </div>
                </div>
              </div>

              <div className="slider-instructions">
                <Info size={16} className="text-highlight" />
                <span>Drag the slider handle left and right to visualize cosmetic restoration</span>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="quiz-container">
              {!quizFinished ? (
                <>
                  {/* Progress Indicator */}
                  <div className="quiz-progress-wrapper">
                    <div className="quiz-progress-info">
                      <span>Step {currentStep + 1} of {quizSteps.length}</span>
                      <span>{Math.round(((currentStep) / quizSteps.length) * 100)}% Complete</span>
                    </div>
                    <div className="quiz-progress-bar-bg">
                      <div 
                        className="quiz-progress-bar-fill"
                        style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="quiz-step-content" key={currentStep}>
                    <h3 className="quiz-question">{quizSteps[currentStep].question}</h3>
                    
                    <div className="quiz-options-list">
                      {quizSteps[currentStep].options.map((opt, idx) => {
                        const isSelected = answers[quizSteps[currentStep].key] === opt.value;
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleSelectOption(quizSteps[currentStep].key, opt.value)}
                            className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                          >
                            <div className="quiz-option-indicator"></div>
                            <span className="quiz-option-text">{opt.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="quiz-navigation">
                    <button 
                      onClick={handlePrev}
                      className="btn btn-outline-gold"
                      disabled={currentStep === 0}
                      style={{ opacity: currentStep === 0 ? 0.4 : 1, cursor: currentStep === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      <RotateCcw size={16} />
                      <span>Back</span>
                    </button>

                    <button 
                      onClick={handleNext}
                      className="btn btn-secondary"
                      disabled={!answers[quizSteps[currentStep].key]}
                      style={{ 
                        opacity: !answers[quizSteps[currentStep].key] ? 0.5 : 1, 
                        cursor: !answers[quizSteps[currentStep].key] ? 'not-allowed' : 'pointer' 
                      }}
                    >
                      <span>{currentStep === quizSteps.length - 1 ? 'Calculate Score' : 'Next Step'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                /* Results Display */
                <div className="results-card">
                  <div className="results-header-flex">
                    <div className="score-circle-container">
                      <svg className="score-circle-svg">
                        <circle className="score-circle-bg" cx="65" cy="65" r={radius} />
                        <circle 
                          className="score-circle-progress" 
                          cx="65" 
                          cy="65" 
                          r={radius} 
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                        />
                      </svg>
                      <div className="score-text-overlay">
                        <span className="score-number">{score}</span>
                        <span className="score-label">Score</span>
                      </div>
                    </div>

                    <div className="results-intro-text">
                      <span className="results-score-status">
                        {score >= 85 ? 'Excellent' : score >= 65 ? 'Moderate Need' : 'Consultation Recommended'}
                      </span>
                      <h3 className="results-score-title">Your Smile Health Summary</h3>
                      <p>
                        Our assessment is complete. Below is your clinical recommendation based on Dr. Aditi's 
                        standards of conservative, patient-centered dentistry.
                      </p>
                    </div>
                  </div>

                  <div className="results-body">
                    <div className="advice-box">
                      <h4 className="advice-box-title">
                        <Info size={18} />
                        <span>Conservative Care Perspective</span>
                      </h4>
                      <p className="advice-box-desc">
                        "At our Lucknow clinic, we strictly reject unnecessary treatments. If your teeth are healthy, 
                        we advocate keeping them natural. We will only recommend procedures that preserve structure and 
                        improve your health or confidence."
                      </p>
                    </div>

                    {recommendation && (
                      <div className="recommended-treatment-panel animate-fade-in">
                        <div className="treatment-panel-icon">
                          {recommendation.icon}
                        </div>
                        <div className="treatment-panel-content">
                          <span className="treatment-panel-label">Recommended Treatment Pathway</span>
                          <h4 className="treatment-panel-name">{recommendation.title}</h4>
                          <p className="treatment-panel-desc">{recommendation.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="results-actions">
                    <button onClick={handleResetQuiz} className="btn btn-outline-gold">
                      <RotateCcw size={16} />
                      <span>Retake Quiz</span>
                    </button>
                    <button onClick={handlePreFillAndBook} className="btn btn-secondary">
                      <Calendar size={16} />
                      <span>Prefill & Request Slot</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Treatment Transparency / Timeline Explorer */}
        <div className="transparency-section" style={{ marginTop: '5rem', backgroundColor: 'transparent', borderTop: '1px dashed var(--border-color)', paddingTop: '4rem' }}>
          <div className="section-header animate-fade-in" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">Clinical transparency</span>
            <h2 className="section-title">Transparent Timelines, Honest Care</h2>
            <p className="section-desc">
              We demystify your dentist visits. Learn exactly how long treatments take, 
              what to expect, and our KGMU clinical philosophy.
            </p>
          </div>
          
          <div className="transparency-grid">
            {/* Pathway 1 */}
            <div className="transparency-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="transparency-header">
                <div className="treatment-panel-icon" style={{ backgroundColor: 'var(--accent-teal-light)', color: 'var(--accent-teal)' }}>
                  <Activity size={24} />
                </div>
                <h3 className="transparency-title">Single-Visit Root Canals</h3>
              </div>
              <div className="transparency-meta">
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Timeline:</span>
                  <span className="transparency-meta-val">1 Visit (45-60 mins)</span>
                </div>
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Comfort:</span>
                  <span className="transparency-meta-val">Painless / Local anesthesia</span>
                </div>
              </div>
              <ul className="transparency-body-list">
                <li className="transparency-body-item">Ultrasonic cleaning & sealing in one session</li>
                <li className="transparency-body-item">Saves infected natural tooth structure</li>
                <li className="transparency-body-item">No dragged-out visits or unnecessary dressings</li>
              </ul>
            </div>

            {/* Pathway 2 */}
            <div className="transparency-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="transparency-header">
                <div className="treatment-panel-icon" style={{ backgroundColor: 'var(--accent-teal-light)', color: 'var(--accent-teal)' }}>
                  <Sparkles size={24} />
                </div>
                <h3 className="transparency-title">Cosmetic Veneers & Crowns</h3>
              </div>
              <div className="transparency-meta">
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Timeline:</span>
                  <span className="transparency-meta-val">2 Visits (3-5 days gap)</span>
                </div>
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Comfort:</span>
                  <span className="transparency-meta-val">Highly comfortable</span>
                </div>
              </div>
              <ul className="transparency-body-list">
                <li className="transparency-body-item">Digital smile preview before finalizing</li>
                <li className="transparency-body-item">Ultra-thin porcelain preserving enamel</li>
                <li className="transparency-body-item">Perfect shade-matching with surrounding teeth</li>
              </ul>
            </div>

            {/* Pathway 3 */}
            <div className="transparency-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="transparency-header">
                <div className="treatment-panel-icon" style={{ backgroundColor: 'var(--accent-teal-light)', color: 'var(--accent-teal)' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 className="transparency-title">Dental Implants & TMJ Care</h3>
              </div>
              <div className="transparency-meta">
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Timeline:</span>
                  <span className="transparency-meta-val">2-3 Visits over 3 months</span>
                </div>
                <div className="transparency-meta-item">
                  <span className="transparency-meta-label">Comfort:</span>
                  <span className="transparency-meta-val">Painless surgery / Mild soreness</span>
                </div>
              </div>
              <ul className="transparency-body-list">
                <li className="transparency-body-item">Bio-compatible pure titanium fixtures</li>
                <li className="transparency-body-item">Custom 3D guided surgical placement</li>
                <li className="transparency-body-item">TMJ joint stabilization using custom splints</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
