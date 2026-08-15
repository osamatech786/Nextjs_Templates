"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Calendar } from "lucide-react";

const templates = [
  // Signature Experience
  { id: "demo1", name: "The Scroll-less Experience", href: "/demo1", category: "Featured Masterpiece" },

  // Realistic Production Apps
  { id: "saas", name: "SaaS Pricing Matrix", href: "/demos/design6-saas-pricing", category: "B2B SaaS" },
  { id: "fintech", name: "Corporate Expense Dashboard", href: "/demos/design7-fintech-dashboard", category: "Expense Management" },
  { id: "hr", name: "Enterprise HR Platform", href: "/demos/design1-glassmorphism-dashboard", category: "Internal Tools" },
  { id: "ecommerce", name: "Minimal Luxury E-commerce", href: "/demos/design5-minimal-luxury-ecommerce", category: "Retail & E-commerce" },

  // Interactive Components & Experiments
  { id: "ai", name: "Neon Cyberpunk Landing", href: "/demos/design3-neon-cyberpunk-landing", category: "Landing Pages" },
  { id: "design1-3d", name: "Immersive 3D Hero", href: "/demos/design1-immersive-3d-portfolio", category: "3D Experiment" },
  { id: "design2-carousel", name: "3D Magnetic Carousel", href: "/demos/design2-3d-carousel", category: "Interaction" },
  { id: "design2-dashboard2", name: "Glassmorphism v2", href: "/demos/design2-glassmorphism-dashboard", category: "UI Component" },
  { id: "design3-dataviz", name: "SVG Data Visualization", href: "/demos/design3-svg-dataviz", category: "Data Display" },
  { id: "design4-audio", name: "Neumorphic Audio Player", href: "/demos/design4-neu-audio-player", category: "UI Component" },
  { id: "design4-fluid", name: "Organic Fluid Animation", href: "/demos/design4-organic-fluid-animation", category: "Interaction" },
  { id: "design5-particle", name: "Particle Hero", href: "/demos/design5-particle-hero", category: "Interaction" }
];

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringIframe, setIsHoveringIframe] = useState(false);
  const [displayUrl, setDisplayUrl] = useState("localhost:3000");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Grab the actual host for the mock URL bar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      const basePath = window.location.pathname === '/' ? '' : window.location.pathname.replace(/\/$/, '');
      setDisplayUrl(host + basePath);
    }
  }, []);

  // Mouse tracking for custom cursor and ambient glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="portal-container" id="main-content">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      {/* Ambient Mouse Glow */}
      <div
        className="ambient-glow"
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />

      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHoveringIframe ? 4 : 1,
          backgroundColor: isHoveringIframe ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
          mixBlendMode: isHoveringIframe ? "normal" : "difference"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {isHoveringIframe && <span className="cursor-text">VIEW</span>}
      </motion.div>

      <section className="portal-split">

        {/* Left Side: Massive Typography List */}
        <div className="portal-left" ref={scrollRef}>
          <header className="portal-header">
            <div className="brand-title-row">
              <h1 className="brand-name">
                MUHAMMAD OSAMA AHMED
                <span className="sr-only"> - Premium Next.js & AI Agentic Web Developer</span>
              </h1>
              <div className="social-3d-buttons">
                <a href="https://linkedin.com/in/osamatech786" target="_blank" rel="noopener noreferrer" className="btn-3d" aria-label="LinkedIn Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:osamatech786@example.com" className="btn-3d" aria-label="Email Me">
                  <Mail size={20} />
                </a>
                <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="btn-3d" aria-label="Book a meeting on Calendly">
                  <Calendar size={20} />
                </a>
              </div>
            </div>
            <p className="brand-subtitle" style={{ lineHeight: '1.6', maxWidth: '80%' }}>
              Osama is a Premium Next.js Web Developer specializing in glassmorphism interfaces and high-performance React applications.
            </p>
            <div className="key-metrics" style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
              <span><strong style={{ color: '#fff' }}>5+</strong> Years Experience</span>
              <span><strong style={{ color: '#fff' }}>9+</strong> Enterprise Projects</span>
              <span><strong style={{ color: '#fff' }}>100/100</strong> Core Web Vitals</span>
            </div>
          </header>

          <nav className="project-list">
            {templates.map((template, index) => {
              const isActive = activeTemplate.id === template.id;
              return (
                <div
                  key={template.id}
                  className={`project-item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setActiveTemplate(template)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${template.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTemplate(template); } }}
                >
                  <span className="project-number">{(index + 1).toString().padStart(2, '0')}</span>
                  <div className="project-content">
                    <Link href={template.href} className="project-link">
                      <h2 className="project-title">{template.name}</h2>
                    </Link>
                    <div className="project-category-wrapper">
                      <span className="project-category">{template.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="faq-section" style={{ marginTop: '3rem', marginBottom: '1rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-outfit), sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Frequently Asked Questions</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '0.5rem' }}>What services does Osama provide?</h3>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.6' }}>
                Osama provides Next.js frontend development, AI agent integrations, and premium UI/UX design featuring glassmorphism and modern web animations.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '0.5rem' }}>How can I hire Osama?</h3>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.6' }}>
                You can hire Osama by booking a direct consultation via Calendly, reaching out through LinkedIn, or sending an email to discuss project requirements.
              </p>
            </div>
          </div>

          <footer className="portal-footer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Let's build something amazing</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

              <a href="https://calendly.com/osamatech786-jdqf/20min" target="_blank" rel="noopener noreferrer" className="hire-btn">
                Book a Call <ArrowUpRight className="icon" />
              </a>
              <a href="mailto:osamatech786@gmail.com" className="hire-btn">
                Email Me <ArrowUpRight className="icon" />
              </a>
              <a href="https://linkedin.com/in/osamatech786" target="_blank" rel="noopener noreferrer" className="hire-btn">
                LinkedIn <ArrowUpRight className="icon" />
              </a>
            </div>
          </footer>

          {/* AI Portfolio Promo Banner */}
          <div className="ai-promo-banner">
            <div className="ai-promo-bg-glow"></div>
            <div className="ai-promo-content">
              <h3>I design agentic systems for enterprises and businesses.</h3>
              <a href="https://osamatech786.github.io/" target="_blank" rel="noopener noreferrer" className="ai-promo-btn">
                <span>View AI Portfolio</span> <ArrowRight className="icon ai-btn-arrow" size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: The Live Preview Iframe */}
        <div className="portal-right">
          <div
            className="iframe-glass-container"
            onMouseEnter={() => setIsHoveringIframe(true)}
            onMouseLeave={() => setIsHoveringIframe(false)}
            onClick={() => window.location.href = `${process.env.NODE_ENV === 'production' ? '/Nextjs_Templates' : ''}${activeTemplate.href}`}
          >
            <div className="iframe-header">
              <div className="window-controls">
                <span className="control close" role="button" tabIndex={0} aria-label="Close"></span>
                <span className="control min" role="button" tabIndex={0} aria-label="Minimize"></span>
                <span className="control max" role="button" tabIndex={0} aria-label="Maximize"></span>
              </div>
              <div className="url-bar">{displayUrl}{activeTemplate.href}</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTemplate.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="iframe-wrapper"
              >
                {/* Pointer events none so it doesn't trap scroll or cursor until they actually click to visit */}
                <iframe
                  src={`${process.env.NODE_ENV === 'production' ? '/Nextjs_Templates' : ''}${activeTemplate.href}`}
                  title={activeTemplate.name}
                  className="live-iframe"
                  tabIndex={-1}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </section>

      <style jsx global>{`
        /* Reset and Base Portal Styles */
        body {
          margin: 0;
          padding: 0;
          overflow: hidden; /* Lock body scrolling! */
          background-color: #050505;
          color: #ffffff;
          cursor: none; /* Hide default cursor */
        }

        .portal-container {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          background: radial-gradient(circle at 50% 50%, #111 0%, #000 100%);
        }

        /* Ambient Glow Tracking Mouse */
        .ambient-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.5s;
        }

        /* Custom Cursor */
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cursor-text {
          color: #000;
          font-size: 3px;
          font-weight: 800;
          letter-spacing: 0.5px;
          transform: scale(0.8);
        }

        /* Split Layout */
        .portal-split {
          display: flex;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        /* LEFT PANEL: TYPOGRAPHY */
        .portal-left {
          flex: 0 0 45%;
          height: 100%;
          overflow-y: auto;
          padding: 4rem 4rem 10rem 4rem;
          scrollbar-width: none; /* Firefox */
          display: flex;
          flex-direction: column;
        }
        .portal-left::-webkit-scrollbar {
          display: none;
        }

        .portal-header {
          margin-bottom: 6rem;
        }
        .brand-title-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .social-3d-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-3d {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          border: 1px solid #333;
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          box-shadow: 
            4px 4px 10px rgba(0, 0, 0, 0.8),
            -2px -2px 10px rgba(255, 255, 255, 0.05),
            inset 1px 1px 2px rgba(255,255,255,0.1);
          transform: perspective(400px) rotateX(15deg) rotateY(-15deg) translateY(0);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          /* pointer-events to auto if cursor is none, wait actually we want clicks! */
        }
        .btn-3d:hover {
          transform: perspective(400px) rotateX(0deg) rotateY(0deg) translateY(-5px);
          background: linear-gradient(145deg, #6366f1, #4f46e5);
          border-color: #6366f1;
          box-shadow: 
            0px 10px 20px rgba(99, 102, 241, 0.4),
            inset 1px 1px 2px rgba(255,255,255,0.3);
          color: #fff;
        }
        .brand-name {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          margin: 0;
        }
        .brand-subtitle {
          color: #888;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .project-item {
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: flex-start;
          transition: all 0.4s ease;
          opacity: 0.4;
        }
        .project-item:hover, .project-item.active {
          opacity: 1;
          padding-left: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        .project-number {
          font-family: monospace;
          font-size: 1rem;
          color: #666;
          margin-right: 2rem;
          margin-top: 1rem;
        }

        .project-content {
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .project-item.active .project-title {
          background: linear-gradient(135deg, #fff, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(1.05);
          transform-origin: left center;
        }

        .project-category-wrapper {
          height: 0;
          overflow: hidden;
          transition: height 0.4s ease;
          margin-top: 0;
        }
        .project-item.active .project-category-wrapper {
          height: 24px;
          margin-top: 0.5rem;
        }

        .project-category {
          font-size: 0.8rem;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(-10px);
          display: block;
          transition: all 0.4s ease;
        }
        .project-item.active .project-category {
          opacity: 1;
          transform: translateY(0);
        }

        /* AI Promo Banner */
        .ai-promo-banner {
          position: relative;
          margin-top: 4rem;
          padding: 2rem;
          background: linear-gradient(145deg, rgba(20,20,20,0.8), rgba(5,5,5,0.9));
          border: 1px solid rgba(198, 240, 45, 0.2);
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .ai-promo-banner:hover {
          transform: translateY(-5px);
          border-color: rgba(198, 240, 45, 0.5);
        }
        .ai-promo-bg-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(198, 240, 45, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        .ai-promo-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .ai-promo-content h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: #e2e8f0;
          line-height: 1.4;
          margin: 0;
          flex: 1;
        }
        .ai-promo-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          font-weight: 800;
          color: #000;
          background: #C6F02D;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          flex-shrink: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -10px rgba(198, 240, 45, 0.7);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          cursor: pointer;
        }
        .ai-promo-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: shimmer 3s infinite linear;
          pointer-events: none;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }
        .ai-promo-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px -10px rgba(198, 240, 45, 0.9);
          background: #d4f54e;
        }
        .ai-btn-arrow {
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .ai-promo-btn:hover .ai-btn-arrow {
          transform: translateX(6px);
        }

        .portal-footer {
          margin-top: auto;
          padding-top: 4rem;
        }
        .hire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s;
        }
        .hire-btn:hover {
          color: #6366f1;
          gap: 1rem;
        }
        .icon {
          width: 1.2rem;
          height: 1.2rem;
        }

        /* RIGHT PANEL: LIVE IFRAME */
        .portal-right {
          flex: 0 0 55%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          perspective: 2000px; /* For 3D tilt effect */
        }

        .iframe-glass-container {
          width: 100%;
          height: 85%;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          transform: rotateY(-5deg) rotateX(2deg); /* Subtle 3D isometric tilt */
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s ease;
          cursor: none; /* Let custom cursor take over */
        }
        .iframe-glass-container:hover {
          transform: rotateY(0deg) rotateX(0deg) scale(1.02);
          box-shadow: 0 50px 120px -20px rgba(99, 102, 241, 0.3), inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .iframe-header {
          height: 40px;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .window-controls {
          display: flex;
          gap: 8px;
        }
        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .close { background: #ff5f56; }
        .min { background: #ffbd2e; }
        .max { background: #27c93f; }
        
        .url-bar {
          margin-left: 2rem;
          font-family: monospace;
          font-size: 0.8rem;
          color: #666;
          background: rgba(255,255,255,0.05);
          padding: 4px 12px;
          border-radius: 4px;
        }

        .iframe-wrapper {
          flex: 1;
          width: 100%;
          height: 100%;
          background: #000;
        }
        
        .live-iframe {
          width: 100%;
          height: 100%;
          border: none;
          pointer-events: none; /* Crucial: stops iframe from eating hover events */
        }

        /* Mobile Adjustments */
        @media (max-width: 1024px) {
          body {
            overflow: auto; /* Restore scroll for mobile */
            cursor: auto;
          }
          .custom-cursor, .ambient-glow {
            display: none;
          }
          .portal-split {
            flex-direction: column;
          }
          .portal-left {
            flex: none;
            width: 100%;
            height: auto;
            padding: 2rem;
          }
          .project-title {
            font-size: 2rem;
          }
          .portal-right {
            display: none; /* Hide live preview on mobile, they can just click the links */
          }
        }

        /* Reduced motion: hide custom cursor and glow */
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor, .cursor-glow { display: none; }
        }

        /* Skip to content link */
        .skip-to-content {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .skip-to-content:focus {
          position: fixed;
          top: 0;
          left: 0;
          width: auto;
          height: auto;
          padding: 0.75rem 1.5rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
          background: #6366f1;
          color: #fff;
          z-index: 10000;
          text-decoration: none;
          font-weight: 600;
          border-radius: 0 0 8px 0;
        }
      `}</style>
    </main>
  );
}
