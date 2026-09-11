"use client";

import React, { useRef } from "react";
import Link from "next/link";

const Tile = ({ className, href, children }: { className: string, href: string, children: React.ReactNode }) => {
  const tileRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const t = tileRef.current;
    if (!t) return;
    const MAX = 7;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * MAX * 2;
    const rx = -(y - 0.5) * MAX * 2;
    
    t.style.setProperty('--ry', ry + 'deg');
    t.style.setProperty('--rx', rx + 'deg');
    t.style.setProperty('--mx', (x * 100) + '%');
    t.style.setProperty('--my', (y * 100) + '%');
  };

  const handleMouseLeave = () => {
    const t = tileRef.current;
    if (!t) return;
    t.style.setProperty('--ry', '0deg');
    t.style.setProperty('--rx', '0deg');
  };

  return (
    <a 
      ref={tileRef}
      className={className} 
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

export default function MarketTilesDemo() {
  return (
    <div className="market-tiles-container">
      <style dangerouslySetInnerHTML={{__html: `
        .market-tiles-container {
          --bg: #0b0d12;
          --surface: #161a23;
          --line: rgba(255, 255, 255, 0.08);
          --line-strong: rgba(255, 255, 255, 0.18);
          --ink: #eef1f7;
          --ink-muted: #a5aebb;
          --ink-faint: #7a8497;
          --accent: #e9b949;
          --accent-grad: linear-gradient(135deg, #f5d27a 0%, #d4a13a 55%, #a4761a 100%);
          --radius: 22px;
          --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
          
          background:
            radial-gradient(1200px 600px at 70% -10%, rgba(233, 185, 73, 0.12), transparent 60%),
            radial-gradient(900px 500px at 10% 10%, rgba(124, 92, 255, 0.10), transparent 60%),
            var(--bg);
          color: var(--ink);
          font-family: "Inter", "SF Pro Display", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          padding: 80px 24px;
        }

        .market-tiles-container * { box-sizing: border-box; }

        .market-tiles-container .wrap { max-width: 1180px; margin: 0 auto; }

        .market-tiles-container .head { margin-bottom: 36px; }
        .market-tiles-container .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 12px; border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.03); border-radius: 999px;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink-muted);
        }
        .market-tiles-container .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
        .market-tiles-container .head h2 {
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.05; letter-spacing: -0.02em;
          margin: 16px 0 10px; font-weight: 700;
          background: linear-gradient(180deg, #fff 0%, #c9cfdb 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .market-tiles-container .head p { color: var(--ink-muted); max-width: 640px; font-size: 17px; line-height: 1.55; margin: 0; }

        .market-tiles-container .grid {
          display: grid; gap: 22px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          perspective: 1500px;
        }
        @media (max-width: 900px) { .market-tiles-container .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .market-tiles-container .grid { grid-template-columns: 1fr; } }

        .market-tiles-container .tile {
          position: relative;
          display: grid;
          grid-template-rows: auto 1fr auto;
          row-gap: 18px;
          min-height: 220px;
          padding: 24px;
          border-radius: var(--radius);
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 50%),
            var(--surface);
          border: 1px solid var(--line);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.05) inset,
            0 30px 60px -25px rgba(0, 0, 0, 0.7),
            0 12px 24px -16px rgba(0, 0, 0, 0.6);
          overflow: hidden; isolation: isolate;
          color: inherit; text-decoration: none;
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: box-shadow 0.45s var(--ease), border-color 0.45s var(--ease);
          will-change: transform;
        }
        .market-tiles-container .tile .glow {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(220px 220px at var(--mx, 50%) var(--my, 50%),
                      rgba(233, 185, 73, 0.22), transparent 60%);
          opacity: 0; transition: opacity 0.4s var(--ease); pointer-events: none;
          z-index: 0;
        }
        .market-tiles-container .tile::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: conic-gradient(from 140deg, var(--c1), var(--c2), var(--c3, var(--c1)), var(--c1));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.45s var(--ease); pointer-events: none;
        }
        .market-tiles-container .tile::after {
          content: ""; position: absolute; inset: 0; border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 18%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, transparent 35%);
          pointer-events: none;
        }
        .market-tiles-container .tile > * { position: relative; z-index: 1; }
        .market-tiles-container .tile:hover { border-color: var(--line-strong); box-shadow: 0 40px 80px -25px rgba(34, 211, 238, 0.20), 0 16px 30px -16px rgba(0, 0, 0, 0.7); }
        .market-tiles-container .tile:hover::before { opacity: 1; }
        .market-tiles-container .tile:hover .glow { opacity: 1; }
        .market-tiles-container .tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .market-tiles-container .flag-wrap {
          display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 4px;
        }
        .market-tiles-container .mark {
          font-size: 28px; font-weight: 800; letter-spacing: 0.06em;
          color: var(--accent);
          text-shadow: 0 0 18px rgba(233, 185, 73, 0.25);
          line-height: 1;
          font-family: "SF Pro Display", "Inter", system-ui, sans-serif;
        }
        .market-tiles-container .theme-light .mark { text-shadow: 0 0 18px rgba(184, 134, 32, 0.18); }
        .market-tiles-container .flag {
          width: 76px; height: 52px; border-radius: 6px; overflow: hidden;
          border: 1px solid var(--line-strong);
          box-shadow: 0 10px 22px -12px rgba(0, 0, 0, 0.7);
        }
        .market-tiles-container .flag img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }

        .market-tiles-container .body { display: flex; flex-direction: column; gap: 10px; }
        .market-tiles-container .country {
          font-size: 24px; font-weight: 700; letter-spacing: -0.015em; margin: 0;
        }
        .market-tiles-container .pitch {
          color: var(--ink-muted); font-size: 15px; line-height: 1.5; margin: 0;
          max-width: 36ch;
        }

        .market-tiles-container .cta {
          position: relative; display: inline-flex; align-items: center; gap: 8px;
          align-self: start;
          padding: 6px 0;
          font-weight: 600; font-size: 14px; letter-spacing: 0.01em;
          color: var(--accent);
          text-decoration: none;
          transition: color 0.3s var(--ease), letter-spacing 0.3s var(--ease);
          overflow: hidden;
        }
        .market-tiles-container .cta::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: 100%;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform: translateX(-100%); transition: transform 0.4s var(--ease);
        }
        .market-tiles-container .cta .arrow { transition: transform 0.35s var(--ease); display: inline-block; }
        .market-tiles-container .tile:hover .cta { color: #67e8f9; letter-spacing: 0.02em; }
        .market-tiles-container .tile:hover .cta::after { transform: translateX(0); }
        .market-tiles-container .tile:hover .cta .arrow { transform: translateX(4px); }

        .market-tiles-container .tile.uk { --c1: #c8102e; --c2: #1d4ed8; --c3: #ffffff; }
        .market-tiles-container .tile.ma { --c1: #c1272d; --c2: #006233; --c3: #c1272d; }
        .market-tiles-container .tile.ae { --c1: #00732f; --c2: #000000; --c3: #ffffff; }
        .market-tiles-container .tile.lk { --c1: #ffbe29; --c2: #8d153a; --c3: #005c2f; }
        .market-tiles-container .tile.ph { --c1: #0038a8; --c2: #ce1126; --c3: #fcd116; }

        .market-tiles-container .tile.rich {
          min-height: 360px;
          grid-template-rows: auto auto auto auto auto 1fr auto;
          row-gap: 14px;
        }
        .market-tiles-container .tile.rich .country { font-size: 22px; }
        .market-tiles-container .region {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-muted);
          padding: 6px 10px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.05); border: 1px solid var(--line);
          white-space: nowrap;
        }
        .market-tiles-container .region .pip {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: var(--c1); margin-right: 6px; vertical-align: middle;
          box-shadow: 0 0 8px var(--c1);
        }
        .market-tiles-container .stats {
          display: flex; gap: 18px;
          padding: 12px 0; border-top: 1px dashed var(--line-strong);
          border-bottom: 1px dashed var(--line-strong);
        }
        .market-tiles-container .stat { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .market-tiles-container .stat .k { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; color: var(--ink); }
        .market-tiles-container .stat .l { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-faint); }
        .market-tiles-container .tags { display: flex; flex-wrap: wrap; gap: 6px; min-height: 52px; align-content: start; }
        .market-tiles-container .tag {
          font-size: 11px; padding: 5px 9px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.05); border: 1px solid var(--line);
          color: var(--ink-muted);
        }
        .market-tiles-container .cta-btn {
          position: relative;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 14px 16px;
          border-radius: 14px;
          color: #1a1306;
          font-weight: 700; font-size: 14.5px; letter-spacing: 0.01em;
          background: var(--accent-grad);
          border: 1px solid rgba(255, 255, 255, 0.20);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.35) inset,
            0 -2px 0 rgba(0, 0, 0, 0.20) inset,
            0 10px 24px -10px rgba(212, 161, 58, 0.55);
          overflow: hidden;
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), filter 0.3s var(--ease);
        }
        .market-tiles-container .cta-btn::before {
          content: ""; position: absolute; top: 0; left: -120%; width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
          transform: skewX(-18deg);
          transition: left 0.7s var(--ease); pointer-events: none;
        }
        .market-tiles-container .cta-btn .arrow {
          display: grid; place-items: center;
          width: 30px; height: 30px; border-radius: 50%;
          background: #1a1306; color: var(--accent);
          font-weight: 900; font-size: 14px;
          transition: transform 0.35s var(--ease);
        }
        .market-tiles-container .tile:hover .cta-btn { box-shadow: 0 1px 0 rgba(255, 255, 255, 0.45) inset, 0 -2px 0 rgba(0, 0, 0, 0.20) inset, 0 16px 30px -10px rgba(212, 161, 58, 0.85); filter: saturate(1.15) brightness(1.05); }
        .market-tiles-container .tile:hover .cta-btn::before { left: 130%; }
        .market-tiles-container .tile:hover .cta-btn .arrow { transform: translateX(3px) scale(1.05); }

        .market-tiles-container .theme-light {
          --bg: #f1f3f9;
          --surface: #ffffff;
          --line: rgba(15, 23, 42, 0.08);
          --line-strong: rgba(15, 23, 42, 0.18);
          --ink: #0a0f1f;
          --ink-muted: #3b4458;
          --ink-faint: #5a6478;
          --accent: #0891b2;
          background:
            radial-gradient(900px 500px at 80% 0%, rgba(124, 92, 255, 0.10), transparent 60%),
            radial-gradient(700px 400px at 0% 10%, rgba(34, 211, 238, 0.10), transparent 60%),
            var(--bg);
          padding: 80px 24px;
          border-radius: 32px;
          margin-top: 40px;
        }
        .market-tiles-container .theme-light .head h2 {
          background: linear-gradient(180deg, #0a0f1f 0%, #2a3142 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .market-tiles-container .theme-light .tile {
          background: linear-gradient(160deg, rgba(255, 255, 255, 1) 0%, rgba(244, 246, 252, 1) 100%);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 24px 60px -28px rgba(15, 23, 42, 0.25),
            0 10px 22px -16px rgba(15, 23, 42, 0.14);
        }
        .market-tiles-container .theme-light .tile::after {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, transparent 22%),
            linear-gradient(0deg, rgba(15, 23, 42, 0.10) 0%, transparent 35%);
        }
        .market-tiles-container .theme-light .tile:hover {
          box-shadow: 0 40px 80px -25px rgba(8, 145, 178, 0.30), 0 16px 28px -14px rgba(15, 23, 42, 0.15);
        }
        .market-tiles-container .theme-light .eyebrow { background: #ffffff; border-color: var(--line-strong); }
        .market-tiles-container .theme-light .country { color: var(--ink); }
        .market-tiles-container .theme-light .pitch { color: var(--ink-muted); }
        .market-tiles-container .theme-light .region { background: rgba(15, 23, 42, 0.04); color: var(--ink-muted); }
        .market-tiles-container .theme-light .tag { background: rgba(15, 23, 42, 0.04); color: var(--ink-muted); border-color: var(--line); }
        .market-tiles-container .theme-light .stats { border-color: var(--line); }
        .market-tiles-container .theme-light .stat .l { color: var(--ink-faint); }
        .market-tiles-container .theme-light .cta-btn .arrow { background: #1a1306; color: #ffd87a; }
      `}} />

      <div className="wrap">
        {/* Nav to go back */}
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "var(--ink)", textDecoration: "none", fontSize: "14px", opacity: 0.8 }}>
            ← Back to Templates
          </Link>
        </div>

        <header className="head">
          <span className="eyebrow"><span className="dot"></span> Markets / 5 countries</span>
          <h2>Where we work</h2>
        </header>

        <section className="grid" aria-label="Markets">
          {/* UK */}
          <Tile className="tile uk" href="#uk">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">GB</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/gb.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="body">
              <h3 className="country">United Kingdom</h3>
              <p className="pitch">Work is contracted around you, not to you.</p>
            </div>
            <span className="cta">See sectors <span className="arrow">→</span></span>
          </Tile>

          {/* Morocco */}
          <Tile className="tile ma" href="#ma">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">MA</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ma.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="body">
              <h3 className="country">Morocco</h3>
              <p className="pitch">Growth outpaces the systems holding it up.</p>
            </div>
            <span className="cta">See sectors <span className="arrow">→</span></span>
          </Tile>

          {/* UAE */}
          <Tile className="tile ae" href="#ae">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">AE</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ae.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="body">
              <h3 className="country">United Arab Emirates</h3>
              <p className="pitch">Targets are set; the pipeline is not.</p>
            </div>
            <span className="cta">See sectors <span className="arrow">→</span></span>
          </Tile>

          {/* Sri Lanka */}
          <Tile className="tile lk" href="#lk">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">LK</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/lk.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="body">
              <h3 className="country">Sri Lanka</h3>
              <p className="pitch">Trained people leave within a year.</p>
            </div>
            <span className="cta">See sectors <span className="arrow">→</span></span>
          </Tile>

          {/* Philippines */}
          <Tile className="tile ph" href="#ph">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">PH</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ph.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="body">
              <h3 className="country">Philippines</h3>
              <p className="pitch">Demand moves faster than training.</p>
            </div>
            <span className="cta">See sectors <span className="arrow">→</span></span>
          </Tile>
        </section>

        {/* BRIGHT VARIANT */}
        <div className="theme-light">
          <header className="head">
            <span className="eyebrow"><span className="dot" style={{background:'#0ea5e9', boxShadow:'0 0 12px #0ea5e9'}}></span> Markets / Bright variant</span>
            <h2>Light theme version</h2>
          </header>

          <section className="grid" aria-label="Markets — bright">
            <Tile className="tile uk" href="#uk">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">GB</span>
                <div className="flag"><img src="https://flagcdn.com/w160/gb.png" alt="" loading="lazy" /></div>
              </div>
              <div className="body"><h3 className="country">United Kingdom</h3><p className="pitch">Work is contracted around you, not to you.</p></div>
              <span className="cta">See sectors <span className="arrow">→</span></span>
            </Tile>
            <Tile className="tile ma" href="#ma">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">MA</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ma.png" alt="" loading="lazy" /></div>
              </div>
              <div className="body"><h3 className="country">Morocco</h3><p className="pitch">Growth outpaces the systems holding it up.</p></div>
              <span className="cta">See sectors <span className="arrow">→</span></span>
            </Tile>
            <Tile className="tile ae" href="#ae">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">AE</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ae.png" alt="" loading="lazy" /></div>
              </div>
              <div className="body"><h3 className="country">United Arab Emirates</h3><p className="pitch">Targets are set; the pipeline is not.</p></div>
              <span className="cta">See sectors <span className="arrow">→</span></span>
            </Tile>
            <Tile className="tile lk" href="#lk">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">LK</span>
                <div className="flag"><img src="https://flagcdn.com/w160/lk.png" alt="" loading="lazy" /></div>
              </div>
              <div className="body"><h3 className="country">Sri Lanka</h3><p className="pitch">Trained people leave within a year.</p></div>
              <span className="cta">See sectors <span className="arrow">→</span></span>
            </Tile>
            <Tile className="tile ph" href="#ph">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">PH</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ph.png" alt="" loading="lazy" /></div>
              </div>
              <div className="body"><h3 className="country">Philippines</h3><p className="pitch">Demand moves faster than training.</p></div>
              <span className="cta">See sectors <span className="arrow">→</span></span>
            </Tile>
          </section>
        </div>

        {/* RICH VARIANT — dark */}
        <header className="head" style={{marginTop: '72px'}}>
          <span className="eyebrow"><span className="dot" style={{background:'var(--accent)',boxShadow:'0 0 12px var(--accent)'}}></span> Markets / Premium v2 · stats + tags</span>
          <h2>The richer card</h2>
        </header>

        <section className="grid" aria-label="Markets — rich">
          <Tile className="tile rich uk" href="#uk">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">GB</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/gb.png" alt="" loading="lazy" />
              </div>
              <span className="region"><span className="pip"></span>EMEA · Active</span>
            </div>
            <h3 className="country">United Kingdom</h3>
            <p className="pitch">Work is contracted around you, not to you.</p>
            <div className="stats"><div className="stat"><span className="k">28</span><span className="l">Programmes</span></div><div className="stat"><span className="k">6</span><span className="l">Sectors</span></div><div className="stat"><span className="k">94%</span><span className="l">Retention</span></div></div>
            <div className="tags"><span className="tag">Apprenticeships</span><span className="tag">AI Fluency</span><span className="tag">Green Skills</span></div>
            <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
          </Tile>
          <Tile className="tile rich ma" href="#ma">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">MA</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ma.png" alt="" loading="lazy" />
              </div>
              <span className="region"><span className="pip"></span>EMEA · Active</span>
            </div>
            <h3 className="country">Morocco</h3>
            <p className="pitch">Growth outpaces the systems holding it up.</p>
            <div className="stats"><div className="stat"><span className="k">14</span><span className="l">Programmes</span></div><div className="stat"><span className="k">4</span><span className="l">Sectors</span></div><div className="stat"><span className="k">88%</span><span className="l">Placement</span></div></div>
            <div className="tags"><span className="tag">Automotive</span><span className="tag">Aerospace</span><span className="tag">Tourism</span></div>
            <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
          </Tile>
          <Tile className="tile rich ae" href="#ae">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">AE</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ae.png" alt="" loading="lazy" />
              </div>
              <span className="region"><span className="pip"></span>GCC · Active</span>
            </div>
            <h3 className="country">United Arab Emirates</h3>
            <p className="pitch">Targets are set; the pipeline is not.</p>
            <div className="stats"><div className="stat"><span className="k">22</span><span className="l">Programmes</span></div><div className="stat"><span className="k">5</span><span className="l">Sectors</span></div><div className="stat"><span className="k">91%</span><span className="l">Retention</span></div></div>
            <div className="tags"><span className="tag">Energy</span><span className="tag">Fintech</span><span className="tag">Logistics</span></div>
            <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
          </Tile>
          <Tile className="tile rich lk" href="#lk">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">LK</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/lk.png" alt="" loading="lazy" />
              </div>
              <span className="region"><span className="pip"></span>APAC · Reskilling</span>
            </div>
            <h3 className="country">Sri Lanka</h3>
            <p className="pitch">Trained people leave within a year.</p>
            <div className="stats"><div className="stat"><span className="k">40K</span><span className="l">Reach</span></div><div className="stat"><span className="k">3</span><span className="l">Sectors</span></div><div className="stat"><span className="k">Treasury</span><span className="l">Funded</span></div></div>
            <div className="tags"><span className="tag">Manufacturing</span><span className="tag">Tourism</span><span className="tag">Languages</span></div>
            <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
          </Tile>
          <Tile className="tile rich ph" href="#ph">
            <span className="glow"></span>
            <div className="flag-wrap">
              <span className="mark">PH</span>
              <div className="flag" aria-hidden="true">
                <img src="https://flagcdn.com/w160/ph.png" alt="" loading="lazy" />
              </div>
              <span className="region"><span className="pip"></span>APAC · Active</span>
            </div>
            <h3 className="country">Philippines</h3>
            <p className="pitch">Demand moves faster than training.</p>
            <div className="stats"><div className="stat"><span className="k">19</span><span className="l">Programmes</span></div><div className="stat"><span className="k">5</span><span className="l">Sectors</span></div><div className="stat"><span className="k">82%</span><span className="l">Placement</span></div></div>
            <div className="tags"><span className="tag">BPO</span><span className="tag">Hospitality</span><span className="tag">Healthcare</span></div>
            <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
          </Tile>
        </section>

        {/* RICH VARIANT — bright */}
        <div className="theme-light">
          <header className="head">
            <span className="eyebrow"><span className="dot" style={{background:'var(--accent)',boxShadow:'0 0 12px var(--accent)'}}></span> Markets / Premium v2 · bright</span>
            <h2>Richer card, light theme</h2>
          </header>

          <section className="grid" aria-label="Markets — rich bright">
            <Tile className="tile rich uk" href="#uk">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">GB</span>
                <div className="flag"><img src="https://flagcdn.com/w160/gb.png" alt="" loading="lazy" /></div>
                <span className="region"><span className="pip"></span>EMEA · Active</span>
              </div>
              <h3 className="country">United Kingdom</h3>
              <p className="pitch">Work is contracted around you, not to you.</p>
              <div className="stats"><div className="stat"><span className="k">28</span><span className="l">Programmes</span></div><div className="stat"><span className="k">6</span><span className="l">Sectors</span></div><div className="stat"><span className="k">94%</span><span className="l">Retention</span></div></div>
              <div className="tags"><span className="tag">Apprenticeships</span><span className="tag">AI Fluency</span><span className="tag">Green Skills</span></div>
              <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
            </Tile>
            <Tile className="tile rich ma" href="#ma">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">MA</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ma.png" alt="" loading="lazy" /></div>
                <span className="region"><span className="pip"></span>EMEA · Active</span>
              </div>
              <h3 className="country">Morocco</h3>
              <p className="pitch">Growth outpaces the systems holding it up.</p>
              <div className="stats"><div className="stat"><span className="k">14</span><span className="l">Programmes</span></div><div className="stat"><span className="k">4</span><span className="l">Sectors</span></div><div className="stat"><span className="k">88%</span><span className="l">Placement</span></div></div>
              <div className="tags"><span className="tag">Automotive</span><span className="tag">Aerospace</span><span className="tag">Tourism</span></div>
              <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
            </Tile>
            <Tile className="tile rich ae" href="#ae">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">AE</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ae.png" alt="" loading="lazy" /></div>
                <span className="region"><span className="pip"></span>GCC · Active</span>
              </div>
              <h3 className="country">United Arab Emirates</h3>
              <p className="pitch">Targets are set; the pipeline is not.</p>
              <div className="stats"><div className="stat"><span className="k">22</span><span className="l">Programmes</span></div><div className="stat"><span className="k">5</span><span className="l">Sectors</span></div><div className="stat"><span className="k">91%</span><span className="l">Retention</span></div></div>
              <div className="tags"><span className="tag">Energy</span><span className="tag">Fintech</span><span className="tag">Logistics</span></div>
              <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
            </Tile>
            <Tile className="tile rich lk" href="#lk">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">LK</span>
                <div className="flag"><img src="https://flagcdn.com/w160/lk.png" alt="" loading="lazy" /></div>
                <span className="region"><span className="pip"></span>APAC · Reskilling</span>
              </div>
              <h3 className="country">Sri Lanka</h3>
              <p className="pitch">Trained people leave within a year.</p>
              <div className="stats"><div className="stat"><span className="k">40K</span><span className="l">Reach</span></div><div className="stat"><span className="k">3</span><span className="l">Sectors</span></div><div className="stat"><span className="k">Treasury</span><span className="l">Funded</span></div></div>
              <div className="tags"><span className="tag">Manufacturing</span><span className="tag">Tourism</span><span className="tag">Languages</span></div>
              <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
            </Tile>
            <Tile className="tile rich ph" href="#ph">
              <span className="glow"></span>
              <div className="flag-wrap">
                <span className="mark">PH</span>
                <div className="flag"><img src="https://flagcdn.com/w160/ph.png" alt="" loading="lazy" /></div>
                <span className="region"><span className="pip"></span>APAC · Active</span>
              </div>
              <h3 className="country">Philippines</h3>
              <p className="pitch">Demand moves faster than training.</p>
              <div className="stats"><div className="stat"><span className="k">19</span><span className="l">Programmes</span></div><div className="stat"><span className="k">5</span><span className="l">Sectors</span></div><div className="stat"><span className="k">82%</span><span className="l">Placement</span></div></div>
              <div className="tags"><span className="tag">BPO</span><span className="tag">Hospitality</span><span className="tag">Healthcare</span></div>
              <div className="cta-btn"><span className="label">See sectors</span><span className="arrow">→</span></div>
            </Tile>
          </section>
        </div>

      </div>
    </div>
  );
}
