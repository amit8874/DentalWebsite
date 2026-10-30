import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Calendar, Info, Activity,
  ArrowRight, ShieldCheck, HeartPulse, CheckCircle2 
} from 'lucide-react';

export default function SmileHub() {
  // ==========================================
  // SMILE STUDIO STATE
  // ==========================================
  const [activeTab, setActiveTab] = useState('slider');

  // Slider State & Refs
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const sliderContainerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleSliderMouseMove = (e) => {
    if (!isSliderDragging) return;
    handleSliderMove(e.clientX);
  };

  const handleSliderTouchMove = (e) => {
    if (!isSliderDragging) return;
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliderDragging(false);
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

  const handleSelectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const calculateResults = () => {
    let finalScore = 100;
    
    // Deduct penalties
    const sensOpt = quizSteps[1].options.find(o => o.value === answers.sensitivity);
    if (sensOpt) finalScore -= sensOpt.penalty;

    const jawOpt = quizSteps[2].options.find(o => o.value === answers.jaw);
    if (jawOpt) finalScore -= jawOpt.penalty;

    const examOpt = quizSteps[3].options.find(o => o.value === answers.examination);
    if (examOpt) finalScore -= examOpt.penalty;

    setScore(Math.max(20, finalScore));

    // Determine tailored recommendation
    if (answers.jaw === 'locking' || answers.jaw === 'clenching') {
      setRecommendation({
        title: 'TMJ & Maxillofacial Occlusion Therapy',
        desc: 'Specialized evaluation of joint mechanics, night splints, and bite equilibration to relieve chronic joint strain and protect enamel from bruxism wear.',
        serviceCode: 'tmd-splints',
        icon: <Activity className="rec-icon" size={24} />
      });
    } else if (answers.goal === 'implants') {
      setRecommendation({
        title: 'Precision Dental Implantology',
        desc: 'Permanent, lifelike tooth replacement with 3D guided precision to restore natural chewing power and prevent adjacent bone deterioration.',
        serviceCode: 'dental-implants',
        icon: <ShieldCheck className="rec-icon" size={24} />
      });
    } else if (answers.goal === 'cosmetic') {
      setRecommendation({
        title: 'Digital Smile Aesthetics & Veneers',
        desc: 'Customized shade brightening, composite artistry, or porcelain veneers crafted according to your personal facial proportions.',
        serviceCode: 'aesthetic-makeover',
        icon: <Sparkles className="rec-icon" size={24} />
      });
    } else {
      setRecommendation({
        title: 'Comprehensive Preventive Oral Wellness',
        desc: 'Ultrasonic micro-scaling, digital radiographic evaluation, and remineralization therapy to sustain healthy enamel and healthy gums.',
        serviceCode: 'full-mouth-rehab',
        icon: <HeartPulse className="rec-icon" size={24} />
      });
    }

    setQuizFinished(true);
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
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
    setScore(100);
    setRecommendation(null);
  };

  const handlePrefillBooking = () => {
    if (!recommendation) return;
    
    const goalLabel = quizSteps[0].options.find(o => o.value === answers.goal)?.label || 'General Care';
    const sensLabel = quizSteps[1].options.find(o => o.value === answers.sensitivity)?.label || 'None';
    const jawLabel = quizSteps[2].options.find(o => o.value === answers.jaw)?.label || 'None';
    const examLabel = quizSteps[3].options.find(o => o.value === answers.examination)?.label || 'Unknown';

    const notesText = `Patient Self-Assessment Summary:
- Primary Goal: ${goalLabel}
- Sensitivity: ${sensLabel}
- Jaw clicking/tightness: ${jawLabel}
- Last exam: ${examLabel}
- Calculated Score: ${score}/100`;

    const event = new CustomEvent('prefillBooking', {
      detail: {
        service: recommendation.serviceCode,
        notes: notesText
      }
    });
    window.dispatchEvent(event);

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

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="smile-hub" className="smile-studio-standalone-section section-padding">
      <div className="container">
        
        {/* Studio Header */}
        <div className="studio-col-header text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Interactive Smile Studio</span>
          <h2 className="studio-main-title">Explore Your Smile Potential</h2>
          <p className="studio-main-desc" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Try our makeover simulator or take a quick 1-minute clinical self-assessment for customized guidance.
          </p>
        </div>

        {/* Center Container */}
        <div className="studio-standalone-wrapper">
          
          {/* Navigation Tabs */}
          <div className="tabs-container studio-tabs" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => setActiveTab('slider')}
              className={`tab-btn ${activeTab === 'slider' ? 'active' : ''}`}
              type="button"
            >
              Smile Makeover Slider
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              type="button"
            >
              Oral Health Assessment
            </button>
          </div>

          <div className="smile-hub-card studio-card-box">
            <div className="glow-spotlight-top"></div>
            <div className="glow-spotlight-bottom"></div>

            {activeTab === 'slider' && (
              <div className="slider-container">
                <div 
                  ref={sliderContainerRef}
                  className="slider-wrapper"
                  onMouseMove={handleSliderMouseMove}
                  onTouchMove={handleSliderTouchMove}
                  onMouseDown={() => setIsSliderDragging(true)}
                  onTouchStart={() => setIsSliderDragging(true)}
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
                      style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
                    />
                    <span className="slider-label before">Before Treatment</span>
                  </div>

                  <span className="slider-label after">After Makeover</span>

                  {/* Interactive Divider Handle */}
                  <div 
                    className="slider-divider" 
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="slider-handle">
                      <div className="handle-arrows">
                        <span>‹</span>
                        <span>›</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="slider-footer-row">
                  <span className="slider-instructions">
                    ‹ Drag slider to preview aesthetic makeover results ›
                  </span>
                  <button 
                    onClick={() => setSliderPos(50)}
                    className="btn-reset-slider"
                    type="button"
                    title="Reset slider to center"
                  >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-container">
                {!quizFinished ? (
                  <>
                    <div className="quiz-progress-wrapper">
                      <div className="quiz-progress-info">
                        <span>Question {currentStep + 1} of {quizSteps.length}</span>
                        <span>{Math.round(((currentStep + 1) / quizSteps.length) * 100)}% Complete</span>
                      </div>
                      <div className="quiz-progress-bar-bg">
                        <div 
                          className="quiz-progress-bar-fill"
                          style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="quiz-step-content">
                      <h4 className="quiz-question">{quizSteps[currentStep].question}</h4>
                      
                      <div className="quiz-options-list">
                        {quizSteps[currentStep].options.map((opt) => (
                          <button
                            key={opt.value + opt.label}
                            type="button"
                            className={`quiz-option-card ${answers[quizSteps[currentStep].key] === opt.value ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(quizSteps[currentStep].key, opt.value)}
                          >
                            <div className="quiz-option-indicator"></div>
                            <span className="quiz-option-text">{opt.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="quiz-navigation">
                        <button
                          type="button"
                          onClick={handlePrev}
                          disabled={currentStep === 0}
                          className={`btn btn-outline ${currentStep === 0 ? 'disabled' : ''}`}
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
                        >
                          Back
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!answers[quizSteps[currentStep].key]}
                          className="btn btn-primary"
                          style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
                        >
                          <span>{currentStep === quizSteps.length - 1 ? 'Analyze Health' : 'Continue'}</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="results-card">
                    <div className="results-header-flex">
                      <div className="score-circle-container">
                        <svg className="score-circle-svg" width="128" height="128">
                          <circle
                            className="score-circle-bg"
                            strokeWidth="8"
                            stroke="var(--border-color)"
                            fill="transparent"
                            r={radius}
                            cx="64"
                            cy="64"
                          />
                          <circle
                            className="score-circle-bar"
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="var(--accent-teal)"
                            fill="transparent"
                            r={radius}
                            cx="64"
                            cy="64"
                          />
                        </svg>
                        <div className="score-circle-content">
                          <span className="score-val">{score}</span>
                          <span className="score-max">/100</span>
                        </div>
                      </div>

                      <div className="score-feedback">
                        <span className="feedback-tag">Assessment Complete</span>
                        <h4 className="feedback-title">
                          {score >= 85 ? 'Excellent Dental Baseline' : score >= 65 ? 'Moderate Maintenance Needed' : 'Clinical Attention Recommended'}
                        </h4>
                        <p className="feedback-desc">
                          Based on your goals and symptoms, our clinical algorithm identified the ideal tailored protocol.
                        </p>
                      </div>
                    </div>

                    <div className="recommendation-box">
                      <div className="rec-icon-badge">
                        {recommendation?.icon}
                      </div>
                      <div className="rec-content">
                        <span className="rec-label">Recommended Dental Path</span>
                        <h4 className="rec-title">{recommendation?.title}</h4>
                        <p className="rec-desc">{recommendation?.desc}</p>
                      </div>
                    </div>

                    <div className="results-actions">
                      <button
                        type="button"
                        onClick={handleResetQuiz}
                        className="btn btn-outline"
                        style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}
                      >
                        Retake Quiz
                      </button>
                      <button
                        type="button"
                        onClick={handlePrefillBooking}
                        className="btn btn-primary"
                        style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                      >
                        <Calendar size={16} />
                        <span>Book Assessment</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
