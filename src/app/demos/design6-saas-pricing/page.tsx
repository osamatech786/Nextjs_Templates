"use client";

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { animate } from 'framer-motion';

const RETENTION_MULT = { 30: 1, 90: 1.3, 180: 1.6, 365: 2 } as const;
type RetentionDays = keyof typeof RETENTION_MULT;

const fmt = (n: number) => n.toLocaleString('en-US');

export default function SaasPricingPage() {
  const [queriesK, setQueriesK] = useState(250);
  const [seats, setSeats] = useState(3);
  const [retention, setRetention] = useState<RetentionDays>(90);

  const price = useMemo(() => {
    const queryCost = Math.max(0, queriesK - 10) * 0.15;
    const seatCost = Math.max(0, seats - 1) * 20;
    const retentionMult = RETENTION_MULT[retention];
    return Math.round((queryCost + seatCost) * retentionMult);
  }, [queriesK, seats, retention]);

  const annualPrice = Math.round(price * 12 * 0.8);
  const [displayPrice, setDisplayPrice] = useState(price);

  useEffect(() => {
    const controls = animate(displayPrice, price, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayPrice(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  return (
    <>
      <Head>
        <title>NexusAI — Pricing</title>
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --bg: #0E0E0C;
          --fg: #F2EDE4;
          --accent: #FF5C2C;
          --muted: #6B6B66;
          --rule: rgba(242, 237, 228, 0.08);
          --rule-strong: rgba(242, 237, 228, 0.18);
        }

        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg); }
        body { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
        ::selection { background: var(--accent); color: var(--bg); }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }

        .page { min-height: 100vh; display: flex; flex-direction: column; }

        .skip {
          position: absolute; top: -40px; left: 16px; z-index: 100;
          background: var(--accent); color: var(--bg); padding: 8px 12px;
          font-weight: 600; border-radius: 4px;
        }
        .skip:focus { top: 16px; }

        /* Top bar */
        .topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px; border-bottom: 1px solid var(--rule);
        }
        .wordmark { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; }
        .wordmark .dot { color: var(--accent); }
        .topnav { display: flex; gap: 28px; font-size: 12px; color: var(--muted); }
        .topnav a.active { color: var(--fg); }
        .topnav a:hover { color: var(--fg); }
        .topcta { font-size: 12px; font-weight: 500; padding: 10px 18px; border: 1px solid var(--rule-strong); border-radius: 4px; transition: border-color 0.2s; }
        .topcta:hover { border-color: var(--fg); }

        /* Wrap */
        .wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; width: 100%; }

        /* Hero */
        .hero {
          padding: 120px 0 80px;
          display: grid; grid-template-columns: 1.15fr 1fr; gap: 80px; align-items: end;
        }
        .eyebrow {
          font-size: 11px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 28px;
          display: flex; align-items: center; gap: 10px;
        }
        .eyebrow::before { content: ''; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }
        .hero h1 {
          font-family: 'Fraunces', serif; font-size: clamp(48px, 6.4vw, 88px);
          font-weight: 500; line-height: 0.96; letter-spacing: -0.035em;
          margin: 0 0 32px;
        }
        .hero h1 em { font-style: italic; color: var(--accent); font-weight: 400; }
        .hero .lede {
          font-family: 'Fraunces', serif; font-weight: 400; font-size: 19px;
          line-height: 1.45; color: rgba(242, 237, 228, 0.72); max-width: 460px; margin: 0;
        }

        /* Calculator */
        .calc {
          border: 1px solid var(--rule); border-radius: 8px;
          background: rgba(242, 237, 228, 0.02); padding: 32px;
          display: flex; flex-direction: column; gap: 28px;
        }
        .calc-row { display: flex; flex-direction: column; gap: 14px; }
        .calc-row > label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); display: flex; justify-content: space-between; font-weight: 500; }
        .calc-row > label .val { color: var(--fg); font-variant-numeric: tabular-nums; }
        .calc-row input[type=range] {
          -webkit-appearance: none; appearance: none; width: 100%; height: 2px;
          background: var(--rule-strong); outline: none; margin: 0;
        }
        .calc-row input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 16px; height: 16px;
          background: var(--accent); border-radius: 50%; cursor: pointer; border: none;
          transition: transform 0.15s;
        }
        .calc-row input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .calc-row input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px; background: var(--accent); border-radius: 50%; cursor: pointer; border: none;
        }
        .seg { display: flex; border: 1px solid var(--rule-strong); border-radius: 4px; overflow: hidden; }
        .seg button { flex: 1; padding: 10px 0; font-size: 12px; color: var(--muted); border-right: 1px solid var(--rule-strong); transition: background 0.15s, color 0.15s; }
        .seg button:last-child { border-right: none; }
        .seg button:hover { color: var(--fg); }
        .seg button.on { background: var(--fg); color: var(--bg); font-weight: 600; }
        .seg button.on:hover { color: var(--bg); }

        /* Price display */
        .price-box { border-top: 1px solid var(--rule); padding-top: 28px; }
        .price-box .amount {
          font-family: 'Fraunces', serif; font-size: 88px; font-weight: 500; line-height: 1;
          letter-spacing: -0.04em; font-variant-numeric: tabular-nums; display: flex; align-items: baseline; gap: 6px;
        }
        .price-box .amount .sym { font-size: 36px; color: var(--muted); font-weight: 400; }
        .price-box .amount .unit { font-size: 17px; color: var(--muted); font-family: 'JetBrains Mono', monospace; font-weight: 400; }
        .price-box .detail { font-size: 12px; color: var(--muted); margin: 18px 0 0; line-height: 1.7; }
        .price-box .detail strong { color: var(--fg); font-weight: 500; }
        .live { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 24px; font-weight: 500; }
        .live .pulse { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.6); } }

        /* Section heading */
        .section { padding: 100px 0; border-top: 1px solid var(--rule); }
        .section-eyebrow { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin-bottom: 20px; font-weight: 500; }
        .section-title { font-family: 'Fraunces', serif; font-size: clamp(28px, 3.2vw, 38px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.12; margin: 0 0 56px; max-width: 620px; }

        /* Included grid */
        .incl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1px solid var(--rule); }
        .incl-item {
          padding: 28px 0; border-bottom: 1px solid var(--rule);
          display: grid; grid-template-columns: 110px 1fr; gap: 24px; align-items: baseline;
        }
        .incl-item:nth-child(odd) { padding-right: 40px; border-right: 1px solid var(--rule); }
        .incl-item:nth-child(even) { padding-left: 40px; }
        .incl-item .tag { font-size: 10px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.14em; font-weight: 500; }
        .incl-item .txt { font-family: 'Fraunces', serif; font-size: 19px; line-height: 1.35; font-weight: 500; }
        .incl-item .txt .note { display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); margin-top: 8px; font-weight: 400; line-height: 1.6; }

        /* Comparison table */
        .compare table { width: 100%; border-collapse: collapse; }
        .compare th, .compare td { text-align: left; padding: 18px 16px; border-bottom: 1px solid var(--rule); font-size: 13px; vertical-align: top; }
        .compare th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); font-weight: 500; border-bottom: 1px solid var(--rule-strong); padding-top: 0; }
        .compare th.us { color: var(--accent); }
        .compare td.us { color: var(--fg); font-weight: 500; }
        .compare td.dim { color: var(--muted); }
        .compare td.yes { color: var(--fg); }
        .compare th:first-child, .compare td:first-child { padding-left: 0; color: var(--fg); font-family: 'Fraunces', serif; font-size: 16px; font-weight: 500; }

        /* FAQ */
        .faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
        .faq-grid .section-title { margin-bottom: 0; }
        .faq-list { border-top: 1px solid var(--rule); }
        .faq-item { border-bottom: 1px solid var(--rule); }
        .faq-item summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px;
          font-family: 'Fraunces', serif; font-size: 21px; font-weight: 500; padding: 24px 0;
          letter-spacing: -0.01em;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary .sign { font-family: 'JetBrains Mono', monospace; font-size: 18px; color: var(--accent); transition: transform 0.3s ease; flex-shrink: 0; }
        .faq-item[open] summary .sign { transform: rotate(45deg); }
        .faq-item .answer { font-size: 13px; color: rgba(242, 237, 228, 0.72); margin: 0 0 24px; line-height: 1.7; max-width: 60ch; }

        /* CTA strip */
        .cta-strip {
          border-top: 1px solid var(--rule); padding: 80px 0;
          display: flex; justify-content: space-between; align-items: center; gap: 40px;
        }
        .cta-strip h3 { font-family: 'Fraunces', serif; font-size: clamp(28px, 3.6vw, 42px); font-weight: 500; letter-spacing: -0.025em; margin: 0; max-width: 620px; line-height: 1.08; }
        .cta-strip h3 em { font-style: italic; color: var(--accent); font-weight: 400; }
        .cta-strip .big {
          font-family: 'Fraunces', serif; font-size: 17px; font-weight: 500;
          padding: 18px 32px; background: var(--accent); color: var(--bg); border-radius: 4px;
          display: inline-flex; align-items: center; gap: 14px; flex-shrink: 0;
          transition: background 0.2s;
        }
        .cta-strip .big:hover { background: #FF7347; }
        .cta-strip .big .arr { transition: transform 0.25s ease; }
        .cta-strip .big:hover .arr { transform: translateX(4px); }

        /* Footer */
        footer { border-top: 1px solid var(--rule); padding: 64px 0 32px; }
        .foot-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 40px; margin-bottom: 56px; }
        .foot-brand .wordmark { font-size: 26px; margin-bottom: 16px; display: block; }
        .foot-brand p { font-size: 12px; color: var(--muted); max-width: 280px; line-height: 1.7; margin: 0; }
        .foot-col h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin: 0 0 18px; font-weight: 500; }
        .foot-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: rgba(242,237,228,0.7); }
        .foot-col a:hover { color: var(--fg); }
        .foot-bottom { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); padding-top: 24px; border-top: 1px solid var(--rule); }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Responsive */
        @media (max-width: 960px) {
          .topbar { padding: 16px 20px; }
          .topnav { display: none; }
          .wrap { padding: 0 20px; }
          .hero { grid-template-columns: 1fr; gap: 56px; padding: 72px 0 56px; }
          .incl-item { grid-template-columns: 1fr; gap: 8px; padding: 20px 0; }
          .incl-item:nth-child(odd) { padding-right: 0; border-right: none; }
          .incl-item:nth-child(even) { padding-left: 0; }
          .faq-grid { grid-template-columns: 1fr; gap: 32px; }
          .cta-strip { flex-direction: column; align-items: flex-start; }
          .foot-grid { grid-template-columns: 1fr 1fr; }
          .foot-bottom { flex-direction: column; gap: 8px; }
          .price-box .amount { font-size: 64px; }
        }
      `}</style>

      <a href="#main" className="skip">Skip to content</a>

      <main id="main">
        <div className="page">
          {/* Top bar */}
          <header className="topbar">
            <div className="wordmark">NexusAI<span className="dot">.</span></div>
            <nav className="topnav" aria-label="Primary">
              <a href="#">Product</a>
              <a href="#">Docs</a>
              <a href="#" className="active">Pricing</a>
              <a href="#">Customers</a>
            </nav>
            <a href="#" className="topcta">Start free →</a>
          </header>

          {/* Hero + Calculator */}
          <section className="wrap hero">
            <div>
              <div className="eyebrow">Pricing / no tiers, no surprises</div>
              <h1>One price.<br/><em>What you query.</em></h1>
              <p className="lede">NexusAI charges by the query your team runs, not by the seat you might fill. Move the dials — the number on the right is what you'd pay this month.</p>
            </div>

            <div className="calc" role="region" aria-label="Pricing calculator">
              <div className="calc-row">
                <label htmlFor="queries">
                  <span>Monthly queries</span>
                  <span className="val">{fmt(queriesK * 1000)}</span>
                </label>
                <input
                  id="queries" type="range" min="10" max="5000" step="10"
                  value={queriesK} onChange={(e) => setQueriesK(Number(e.target.value))}
                  aria-label="Monthly queries"
                />
              </div>

              <div className="calc-row">
                <label htmlFor="seats">
                  <span>Seats</span>
                  <span className="val">{seats}</span>
                </label>
                <input
                  id="seats" type="range" min="1" max="50" step="1"
                  value={seats} onChange={(e) => setSeats(Number(e.target.value))}
                  aria-label="Number of seats"
                />
              </div>

              <div className="calc-row">
                <label>
                  <span>Data retention</span>
                  <span className="val">{retention} days</span>
                </label>
                <div className="seg" role="radiogroup" aria-label="Data retention">
                  {[30, 90, 180, 365].map((d) => (
                    <button
                      key={d}
                      role="radio"
                      aria-checked={retention === d}
                      className={retention === d ? 'on' : ''}
                      onClick={() => setRetention(d as RetentionDays)}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>

              <div className="price-box">
                <div className="amount">
                  <span className="sym">$</span>
                  <span>{fmt(displayPrice)}</span>
                  <span className="unit">/ mo</span>
                </div>
                <p className="detail">
                  <strong>{fmt(queriesK * 1000)}</strong> queries · <strong>{seats}</strong> {seats === 1 ? 'seat' : 'seats'} · <strong>{retention}d</strong> retention.<br/>
                  Annual: <strong>${fmt(annualPrice)}</strong>/yr (save 20%). Pause or change anytime.
                </p>
                <div className="live"><span className="pulse" /> Live estimate · no card required</div>
              </div>
            </div>
          </section>

          {/* What's included */}
          <section className="wrap section">
            <div className="section-eyebrow">Included on every plan</div>
            <h2 className="section-title">Everything you need to query production data. Nothing held back for the next tier.</h2>

            <div className="incl-grid">
              <div className="incl-item">
                <div className="tag">Warehouse</div>
                <div className="txt">Natural-language SQL on every warehouse<span className="note">Snowflake, BigQuery, Postgres, Redshift, Databricks</span></div>
              </div>
              <div className="incl-item">
                <div className="tag">Provenance</div>
                <div className="txt">Source-cited answers<span className="note">Every response links back to the row and column it pulled from</span></div>
              </div>
              <div className="incl-item">
                <div className="tag">Audit</div>
                <div className="txt">Full audit log, exportable<span className="note">SOC 2 Type II · ISO 27001 · HIPAA available</span></div>
              </div>
              <div className="incl-item">
                <div className="tag">Access</div>
                <div className="txt">SSO, SCIM, role-based access<span className="note">Okta, Azure AD, Google Workspace, JumpCloud</span></div>
              </div>
              <div className="incl-item">
                <div className="tag">Workflow</div>
                <div className="txt">Versioned dashboards<span className="note">Git-backed. Branch, review, ship queries like code.</span></div>
              </div>
              <div className="incl-item">
                <div className="tag">Reliability</div>
                <div className="txt">99.95% uptime SLA<span className="note">Public status page · credits issued automatically</span></div>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="wrap section compare">
            <div className="section-eyebrow">How we compare</div>
            <h2 className="section-title">Why teams switch from legacy BI and DIY LLMs.</h2>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className="us">NexusAI</th>
                  <th>Legacy BI</th>
                  <th>DIY LLMs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pricing model</td>
                  <td className="us">Per query</td>
                  <td className="dim">Per seat</td>
                  <td className="dim">Per token</td>
                </tr>
                <tr>
                  <td>Time to first query</td>
                  <td className="us">3 minutes</td>
                  <td className="dim">2–6 weeks</td>
                  <td className="dim">1–4 weeks</td>
                </tr>
                <tr>
                  <td>Cited answers (row + column)</td>
                  <td className="us">Every response</td>
                  <td className="dim">—</td>
                  <td className="dim">Add-on</td>
                </tr>
                <tr>
                  <td>Row-level audit log</td>
                  <td className="us">Built in</td>
                  <td className="dim">Enterprise tier</td>
                  <td className="dim">Build it yourself</td>
                </tr>
                <tr>
                  <td>Hallucination guardrails</td>
                  <td className="us">Schema-locked</td>
                  <td className="dim">—</td>
                  <td className="dim">DIY</td>
                </tr>
                <tr>
                  <td>SOC 2 + SSO on day one</td>
                  <td className="us">All plans</td>
                  <td className="dim">Enterprise only</td>
                  <td className="dim">—</td>
                </tr>
                <tr>
                  <td>Data leaves your VPC</td>
                  <td className="us">Never</td>
                  <td className="dim">Varies</td>
                  <td className="dim">Often</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* FAQ */}
          <section className="wrap section">
            <div className="faq-grid">
              <div>
                <div className="section-eyebrow">FAQ</div>
                <h2 className="section-title">Things teams ask before signing.</h2>
              </div>
              <div className="faq-list">
                <details className="faq-item" open>
                  <summary>What counts as a query? <span className="sign">+</span></summary>
                  <p className="answer">A single natural-language question that returns results from your warehouse. Re-running the same question against the same schema within five minutes counts as one. Failed queries, schema inspections, and dashboard loads don't count.</p>
                </details>
                <details className="faq-item">
                  <summary>Can I switch retention later? <span className="sign">+</span></summary>
                  <p className="answer">Yes — change retention any time from settings. Going longer starts a fresh retention window on new data; old data is purged per your previous setting.</p>
                </details>
                <details className="faq-item">
                  <summary>Do you offer annual contracts? <span className="sign">+</span></summary>
                  <p className="answer">Annual billing saves 20% and is paid up-front or quarterly. Above 2M queries/month we also offer committed-use discounts with custom terms.</p>
                </details>
                <details className="faq-item">
                  <summary>What happens if I exceed my estimate? <span className="sign">+</span></summary>
                  <p className="answer">We never cut you off mid-month. You'll get a heads-up email at 80% and 100%, and overage is billed at the same per-query rate as your plan. You can set a hard cap if you'd prefer.</p>
                </details>
                <details className="faq-item">
                  <summary>Is there a free tier? <span className="sign">+</span></summary>
                  <p className="answer">10,000 queries per month, one seat, 30-day retention. No card required. The first 1,000 queries don't even need an account — try it from the docs.</p>
                </details>
              </div>
            </div>
          </section>

          {/* CTA strip */}
          <section className="wrap cta-strip">
            <h3>Skip the demo call. Query your warehouse in <em>three minutes.</em></h3>
            <a href="#" className="big">Start free <span className="arr">→</span></a>
          </section>

          {/* Footer */}
          <footer className="wrap">
            <div className="foot-grid">
              <div className="foot-brand">
                <span className="wordmark">NexusAI<span className="dot">.</span></span>
                <p>Natural-language queries on production data. Cited, audited, schema-locked. Built for data teams that ship.</p>
              </div>
              <div className="foot-col">
                <h4>Product</h4>
                <ul>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Integrations</a></li>
                  <li><a href="#">Changelog</a></li>
                  <li><a href="#">Status</a></li>
                </ul>
              </div>
              <div className="foot-col">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Docs</a></li>
                  <li><a href="#">API reference</a></li>
                  <li><a href="#">Security</a></li>
                  <li><a href="#">SOC 2 report</a></li>
                </ul>
              </div>
              <div className="foot-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Customers</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© 2026 NexusAI Labs, Inc.</span>
              <span>SOC 2 Type II · ISO 27001 · HIPAA available</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
