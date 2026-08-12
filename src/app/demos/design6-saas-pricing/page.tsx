"use client";

import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

export default function SaasPricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for indie hackers and small teams just getting started.",
      priceMonthly: 29,
      priceAnnual: 24,
      features: ["Up to 3 projects", "Basic analytics", "24-hour support response time", "Community access", "1 team member"],
      notIncluded: ["Custom domains", "Priority support", "Advanced API access"],
      cta: "Start for free",
      popular: false,
    },
    {
      name: "Pro",
      description: "Everything you need to scale your growing SaaS business.",
      priceMonthly: 79,
      priceAnnual: 59,
      features: ["Unlimited projects", "Advanced analytics dashboard", "1-hour support response", "Custom domains", "Up to 10 team members", "Advanced API access"],
      notIncluded: [],
      cta: "Get started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Advanced security, custom workflows, and dedicated support.",
      priceMonthly: 199,
      priceAnnual: 149,
      features: ["Everything in Pro", "Unlimited team members", "SSO & SAML authentication", "Dedicated success manager", "99.99% uptime SLA", "Custom contract & invoicing"],
      notIncluded: [],
      cta: "Contact sales",
      popular: false,
    }
  ];

  return (
    <>
      <Head>
        <title>SaaS Pricing - Minimal & High-Converting</title>
      </Head>
      
      <div className="pricing-page">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-logo">Nexus<span>AI</span></div>
          <div className="nav-links">
            <a href="#">Features</a>
            <a href="#">Solutions</a>
            <a href="#">Resources</a>
            <a href="#" className="active">Pricing</a>
          </div>
          <div className="nav-auth">
            <a href="#" className="login-btn">Log in</a>
            <a href="#" className="signup-btn">Start free trial</a>
          </div>
        </nav>

        {/* Pricing Header */}
        <header className="pricing-header">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="badge">Simple, transparent pricing</div>
            <h1>Pricing that scales with you</h1>
            <p>No hidden fees. No surprise charges. Choose the plan that best fits your needs and start building today.</p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            className="billing-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={!isAnnual ? "active-text" : ""}>Monthly</span>
            <button 
              className={`toggle-btn ${isAnnual ? 'annual' : 'monthly'}`}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div className="toggle-thumb" />
            </button>
            <span className={isAnnual ? "active-text" : ""}>Annually</span>
            <div className="save-badge">Save 25%</div>
          </motion.div>
        </header>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={14} /> Most Popular
                </div>
              )}
              
              <div className="card-header">
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                  <span className="period">/mo</span>
                </div>
                {isAnnual && (
                  <div className="billing-note">Billed ${plan.priceAnnual * 12} annually</div>
                )}
                {!isAnnual && (
                  <div className="billing-note" style={{ opacity: 0 }}>Placeholder</div>
                )}
              </div>

              <button className={`cta-btn ${plan.popular ? 'primary' : 'secondary'}`}>
                {plan.cta}
              </button>

              <div className="features-list">
                <div className="features-title">What's included</div>
                {plan.features.map(feature => (
                  <div key={feature} className="feature-item">
                    <div className="icon-wrapper check"><Check size={16} /></div>
                    <span>{feature}</span>
                  </div>
                ))}
                
                {plan.notIncluded.map(feature => (
                  <div key={feature} className="feature-item not-included">
                    <div className="icon-wrapper cross"><X size={16} /></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <p>Trusted by over 10,000+ fast-growing teams worldwide.</p>
          <div className="logo-cloud">
            <div className="mock-logo">Acme Corp</div>
            <div className="mock-logo">Globex</div>
            <div className="mock-logo">Soylent</div>
            <div className="mock-logo">Initech</div>
          </div>
        </footer>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #050505;
            color: #ffffff;
            overflow-x: hidden;
          }

          .pricing-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: radial-gradient(circle at 50% -20%, #1a1a2e 0%, #050505 50%);
          }

          /* Navbar */
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 4rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
          .nav-logo {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.05em;
          }
          .nav-logo span {
            color: #6366f1;
          }
          .nav-links {
            display: flex;
            gap: 2rem;
          }
          .nav-links a {
            color: #888;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.2s;
          }
          .nav-links a:hover, .nav-links a.active {
            color: #fff;
          }
          .nav-auth {
            display: flex;
            gap: 1rem;
            align-items: center;
          }
          .login-btn {
            color: #fff;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
          }
          .signup-btn {
            background: #fff;
            color: #000;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.2s;
          }
          .signup-btn:hover {
            background: #e0e0e0;
          }

          /* Header */
          .pricing-header {
            text-align: center;
            padding: 6rem 2rem 4rem;
            max-width: 800px;
            margin: 0 auto;
          }
          .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(99, 102, 241, 0.1);
            color: #818cf8;
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }
          .pricing-header h1 {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin: 0 0 1.5rem;
          }
          .pricing-header p {
            font-size: 1.1rem;
            color: #888;
            line-height: 1.6;
            margin: 0 0 3rem;
          }

          /* Toggle */
          .billing-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: #666;
          }
          .active-text {
            color: #fff;
          }
          .toggle-btn {
            width: 50px;
            height: 28px;
            background: #222;
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,0.1);
            position: relative;
            cursor: pointer;
            padding: 0;
            transition: background 0.3s;
          }
          .toggle-btn.annual {
            background: #6366f1;
          }
          .toggle-thumb {
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 3px;
            left: 4px;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .toggle-btn.annual .toggle-thumb {
            transform: translateX(20px);
          }
          .save-badge {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-left: 0.5rem;
          }

          /* Pricing Grid */
          .pricing-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem 6rem;
          }
          
          .pricing-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 1.5rem;
            padding: 2.5rem;
            position: relative;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s, border-color 0.3s;
          }
          .pricing-card:hover {
            border-color: rgba(255,255,255,0.15);
          }
          
          .pricing-card.popular {
            background: rgba(99, 102, 241, 0.05);
            border-color: rgba(99, 102, 241, 0.3);
            transform: scale(1.03);
            box-shadow: 0 20px 40px -20px rgba(99, 102, 241, 0.15);
          }
          .pricing-card.popular:hover {
            border-color: rgba(99, 102, 241, 0.5);
            transform: scale(1.05);
          }
          
          .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #6366f1, #a855f7);
            color: #fff;
            padding: 0.25rem 1rem;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
          }

          .card-header h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
          }
          .card-header p {
            font-size: 0.9rem;
            color: #888;
            margin: 0 0 2rem;
            min-height: 40px;
          }
          
          .price {
            display: flex;
            align-items: baseline;
            margin-bottom: 0.5rem;
          }
          .currency {
            font-size: 1.5rem;
            font-weight: 600;
            color: #888;
            margin-right: 0.2rem;
          }
          .amount {
            font-size: 3.5rem;
            font-weight: 700;
            letter-spacing: -0.05em;
          }
          .period {
            font-size: 1rem;
            color: #888;
            margin-left: 0.2rem;
          }
          .billing-note {
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 2rem;
          }

          .cta-btn {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 2.5rem;
          }
          .cta-btn.primary {
            background: #fff;
            color: #000;
            border: none;
          }
          .cta-btn.primary:hover {
            background: #e0e0e0;
            box-shadow: 0 0 20px rgba(255,255,255,0.2);
          }
          .cta-btn.secondary {
            background: transparent;
            color: #fff;
            border: 1px solid rgba(255,255,255,0.2);
          }
          .cta-btn.secondary:hover {
            background: rgba(255,255,255,0.05);
          }

          .features-title {
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #fff;
            margin-bottom: 1.5rem;
          }
          
          .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #ccc;
          }
          .feature-item.not-included {
            color: #555;
          }
          
          .icon-wrapper {
            margin-top: 2px;
          }
          .icon-wrapper.check {
            color: #10b981;
          }
          .icon-wrapper.cross {
            color: #555;
          }

          /* Footer */
          .footer {
            border-top: 1px solid rgba(255,255,255,0.05);
            padding: 4rem 2rem;
            text-align: center;
          }
          .footer p {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 2rem;
          }
          .logo-cloud {
            display: flex;
            justify-content: center;
            gap: 4rem;
            opacity: 0.5;
          }
          .mock-logo {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: -0.05em;
            text-transform: uppercase;
          }

          @media (max-width: 1024px) {
            .pricing-grid {
              grid-template-columns: 1fr;
              max-width: 500px;
            }
            .pricing-card.popular {
              transform: none;
            }
            .pricing-card.popular:hover {
              transform: translateY(-5px);
            }
            .navbar {
              padding: 1.5rem 2rem;
            }
            .nav-links {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  );
}
