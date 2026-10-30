import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeVideoModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [animationStep, setAnimationStep] = useState(0); 
  // 0: Initial, 1: "Hello", 2: "Welcome to", 3: "Aditi Dental Clinic", 4: Video reveal & play
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Staggered word animation sequence
  useEffect(() => {
    // Step 1: "Hello"
    const t1 = setTimeout(() => setAnimationStep(1), 350);
    // Step 2: "Welcome to"
    const t2 = setTimeout(() => setAnimationStep(2), 1000);
    // Step 3: "Aditi Dental Clinic"
    const t3 = setTimeout(() => setAnimationStep(3), 1700);
    // Step 4: Video Reveal & Autoplay
    const t4 = setTimeout(() => {
      setAnimationStep(4);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Fallback if autoplay is restricted
          console.log('Autoplay handled by user interaction');
        });
      }
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="welcome-popup-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Aditi Dental Clinic"
    >
      <div 
        className="welcome-popup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="welcome-popup-close-btn"
          onClick={handleClose}
          aria-label="Close welcome popup"
        >
          <X size={20} />
        </button>

        {/* Top Animated Greeting Header in Brown Text */}
        <div className="welcome-popup-header">
          <div className="welcome-text-sequence">
            {/* Word 1: Hello */}
            <span 
              className={`welcome-word welcome-word-hello ${animationStep >= 1 ? 'visible' : ''}`}
            >
              Hello,
            </span>

            {/* Word 2: Welcome to */}
            <span 
              className={`welcome-word welcome-word-welcometo ${animationStep >= 2 ? 'visible' : ''}`}
            >
              Welcome to
            </span>

            {/* Word 3: Aditi Dental Clinic */}
            <span 
              className={`welcome-word welcome-word-clinic ${animationStep >= 3 ? 'visible' : ''}`}
            >
              <Sparkles size={20} className="welcome-sparkle-icon" />
              Aditi Dental Clinic
            </span>
          </div>

          <p className={`welcome-tagline ${animationStep >= 3 ? 'visible' : ''}`}>
            Precision Smile Rehabilitation & Aesthetic Dentistry in Lucknow
          </p>
        </div>

        {/* Center Video Area with gap on all 4 sides */}
        <div className={`welcome-video-container ${animationStep >= 4 ? 'revealed' : ''}`}>
          <div className="welcome-video-wrapper">
            <video
              ref={videoRef}
              src="/assets/reels/Video-28285.mp4"
              className="welcome-video-element"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Controls Overlay */}
            <div className="welcome-video-overlay-controls">
              {/* Play/Pause Button */}
              <button
                type="button"
                className="welcome-video-ctrl-btn"
                onClick={togglePlay}
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              {/* Mute/Unmute Button with pulse hint */}
              <button
                type="button"
                className={`welcome-video-ctrl-btn sound-btn ${isMuted ? 'muted-pulse' : ''}`}
                onClick={toggleSound}
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={18} />
                    <span className="sound-text">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={18} />
                    <span className="sound-text">Sound On</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="welcome-popup-footer">
          <button
            type="button"
            className="welcome-enter-site-btn"
            onClick={handleClose}
          >
            <span>Enter Website</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
