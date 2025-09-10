import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AutoDraft.css';

export default function AutoDraft() {
  const navigate = useNavigate();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    {
      title: "Smart Templates",
      desc: "AI-powered report generation",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      )
    },
    {
      title: "Lightning Fast",
      desc: "Generate reports in seconds",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      title: "Secure & Reliable",
      desc: "Enterprise-grade security",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  // Generate particles
  useEffect(() => {
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 15; i++) {
        particles.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 4,
          animationDuration: 4 + Math.random() * 2
        });
      }
      return particles;
    };

    const particles = createParticles();
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
      particlesContainer.innerHTML = '';
      particles.forEach(particle => {
        const div = document.createElement('div');
        div.className = 'particle';
        div.style.left = particle.left + '%';
        div.style.animationDelay = particle.animationDelay + 's';
        div.style.animationDuration = particle.animationDuration + 's';
        particlesContainer.appendChild(div);
      });
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleIndicatorClick = (index) => {
    setCurrentFeatureIndex(index);
  };

  return (
    <div className="landing-container">
      {/* Animated background */}
      <div className="bg-animations">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Floating particles */}
      <div className="particles" id="particles"></div>

      {/* Main content */}
      <div className="main-content">
        {/* Brand section */}
        <div className="brand-section">
          <div className="brand-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 className="brand-title">AutoDraft AI</h1>
          <div className="brand-underline"></div>
        </div>

        {/* Main card */}
        <div className="main-card">
          {/* Tagline section */}
          <div className="tagline-section">
            <h2 className="main-title">
              Automated Report Generation
              <span className="subtitle">for Academic Excellence</span>
            </h2>
            <p className="description">
              Transform your academic workflow with AI-powered report generation. 
              Create professional, standardized reports in minutes, not hours.
            </p>
          </div>

          {/* Feature showcase */}
          <div className="feature-showcase">
            <div className="feature-card">
              <div className="feature-icon">
                {features[currentFeatureIndex].icon}
              </div>
              <div className="feature-content">
                <h3>{features[currentFeatureIndex].title}</h3>
                <p>{features[currentFeatureIndex].desc}</p>
              </div>
            </div>
          </div>

          {/* Feature indicators */}
          <div className="feature-indicators">
            {features.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentFeatureIndex ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>

          {/* CTA section */}
          <div className="cta-section">
            <button className="cta-button" onClick={handleLogin}>
              <span>Get Started</span>
              <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
            <p className="cta-subtext">No credit card required • Free trial available</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}