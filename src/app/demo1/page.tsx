'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './shutter.css';

const sections = [
  {
    id: 1,
    title: 'Modern Aesthetics',
    description: 'Experience a new dimension of web design with vibrant gradients and glassmorphism. Our templates are crafted to leave a lasting impression.',
    accent: 'section-1',
    color: 'var(--accent-1)',
  },
  {
    id: 2,
    title: 'Fluid Motion',
    description: 'Smooth, physics-based animations that respond to every interaction. We believe that movement is the soul of a premium digital experience.',
    accent: 'section-2',
    color: 'var(--accent-2)',
  },
  {
    id: 3,
    title: 'Limitless Potential',
    description: 'Built with the latest technologies to ensure performance, scalability, and an unmatched user experience across all devices.',
    accent: 'section-3',
    color: 'var(--accent-3)',
  },
];

export default function Demo1Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  const navigateTo = useCallback((direction: 1 | -1) => {
    if (isScrollingRef.current) return;
    
    setCurrentSection((prev) => {
      const next = prev + direction;
      if (next >= 0 && next < sections.length) {
        isScrollingRef.current = true;
        // Lock scrolling for 1.2s to allow the full premium animation to complete
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1200);
        return next;
      }
      return prev;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); // Stop native scrolling entirely
    
    // Threshold to ignore tiny trackpad jitters
    if (Math.abs(e.deltaY) < 30) return; 
    
    navigateTo(e.deltaY > 0 ? 1 : -1);
  }, [navigateTo]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault(); // Stop native mobile scroll bounce
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;

    // Threshold for swipe detection
    if (Math.abs(distance) < 40) return;

    navigateTo(distance > 0 ? 1 : -1);
  }, [navigateTo]);

  useEffect(() => {
    // Non-passive event listeners are required to preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="template-root">
      <div className="shutter-fixed-overlay">
        {sections.map((section, index) => {
          const isPast = currentSection > index;
          const isActive = currentSection === index;
          
          return (
            <motion.div
              key={section.id}
              className={`section-wrapper ${section.accent}`}
              style={{
                zIndex: sections.length - index,
              }}
              initial={false}
              animate={{
                y: isPast ? '-100.5%' : '0%',
                backgroundPositionY: isPast ? '20%' : '0%',
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] // Luxurious ease-out curve
              }}
            >
              <div className="section-content">
                <motion.div 
                  className="glass-card"
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    y: isActive ? 0 : 40,
                    scale: isActive ? 1 : 0.95,
                    filter: isActive ? 'blur(0px)' : 'blur(10px)'
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: isActive ? 0.3 : 0, // Delay content reveal until shutter is mostly up
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <span 
                    style={{ 
                      color: section.color, 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.2em',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                      display: 'block'
                    }}
                  >
                    Chapter 0{section.id}
                  </span>
                  
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                  
                  <button className="btn-premium">
                    Explore More
                  </button>
                </motion.div>
              </div>
              
              {/* Scroll Indicator - Only show if not on the last section */}
              {index < sections.length - 1 && (
                <motion.div 
                  className="scroll-indicator"
                  animate={{ opacity: isActive ? 0.8 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>SCROLL</span>
                  <div className="mouse">
                    <div className="wheel"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

