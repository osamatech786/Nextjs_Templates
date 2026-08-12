"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
    <div className="portal-container" id="main-content">
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

      <div className="portal-split">
        
        {/* Left Side: Massive Typography List */}
        <div className="portal-left" ref={scrollRef}>
          <div className="portal-header">
            <h1 className="brand-name">OSAMATECH786</h1>
            <p className="brand-subtitle">Curated Frontend Masterpieces</p>
          </div>
          
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
          
          <div className="portal-footer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

      </div>

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

        .portal-footer {
          margin-top: auto;
          padding-top: 6rem;
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
    </div>
  );
}
