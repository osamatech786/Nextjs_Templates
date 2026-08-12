"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design3neoncyberpunklandingTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Neon Cyberpunk Landing</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Rajdhani', sans-serif;
            background: #0d0d1a;
            color: white;
            overflow-x: hidden;
        }

        /* Scanlines Overlay */
        .scanlines {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.1) 0px,
                rgba(0, 0, 0, 0.1) 1px,
                transparent 1px,
                transparent 3px
            );
            animation: scanMove 8s linear infinite;
        }

        @keyframes scanMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 100vh; }
        }

        /* Navigation */
        .cyber-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 1.5rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            background: linear-gradient(180deg, rgba(13, 13, 26, 0.95) 0%, transparent 100%);
        }

        .logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff;
            letter-spacing: 3px;
        }

        .nav-links {
            display: flex;
            gap: 3rem;
            list-style: none;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            transition: all 0.3s ease;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #ff00ff;
            box-shadow: 0 0 10px #ff00ff;
            transition: width 0.3s ease;
        }

        .nav-links a:hover {
            color: #ff00ff;
            text-shadow: 0 0 10px #ff00ff;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-cta {
            padding: 0.75rem 2rem;
            background: transparent;
            border: 2px solid #00ffff;
            color: #00ffff;
            font-family: 'Orbitron', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .nav-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
        }

        .nav-cta:hover::before {
            left: 100%;
        }

        .nav-cta:hover {
            background: rgba(0, 255, 255, 0.1);
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2rem;
        }

        /* Grid Floor */
        .grid-floor {
            position: absolute;
            bottom: 0;
            left: -50%;
            width: 200%;
            height: 50vh;
            background: 
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 80px 80px;
            transform: perspective(500px) rotateX(60deg);
            transform-origin: center bottom;
            animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 80px; }
        }

        /* Floating Particles */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
            animation: float 15s infinite;
        }

        .particle:nth-child(odd) {
            background: #ff00ff;
            box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
        }

        .particle:nth-child(3n) {
            background: #ffff00;
            box-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }

        .hero-content {
            text-align: center;
            z-index: 10;
            max-width: 900px;
        }

        .hero h1 {
            font-family: 'Orbitron', sans-serif;
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 900;
            line-height: 1;
            margin-bottom: 1.5rem;
            color: white;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            animation: textGlow 2s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
            0% {
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
            100% {
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px #00ffff, 0 0 60px #ff00ff;
            }
        }

        .hero h1 span {
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 3rem;
            letter-spacing: 3px;
        }

        .hero-cta {
            display: inline-block;
            padding: 1.25rem 3rem;
            background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
            color: #0d0d1a;
            font-family: 'Orbitron', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(255, 0, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.5);
            }
        }

        .hero-cta:hover {
            transform: scale(1.05);
        }

        /* Glitch Effect */
        .glitch {
            position: relative;
        }

        .glitch:hover {
            animation: glitch 0.3s ease-in-out;
        }

        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(-5px, -5px); }
            60% { transform: translate(5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0); }
        }

        /* Features Section */
        .features {
            padding: 8rem 5%;
        }

        .section-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            color: white;
        }

        .section-title span {
            color: #ff00ff;
            text-shadow: 0 0 10px #ff00ff;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 0;
            padding: 2.5rem;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #00ffff, #ff00ff, #ffff00);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-card:hover {
            border-color: #ff00ff;
            box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
            transform: translateY(-10px);
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            position: relative;
        }

        .feature-icon::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid;
            transform: rotate(45deg);
        }

        .feature-card:nth-child(1) .feature-icon::after { border-color: #00ffff; }
        .feature-card:nth-child(2) .feature-icon::after { border-color: #ff00ff; }
        .feature-card:nth-child(3) .feature-icon::after { border-color: #ffff00; }
        .feature-card:nth-child(4) .feature-icon::after { border-color: #00ffff; }
        .feature-card:nth-child(5) .feature-icon::after { border-color: #ff00ff; }
        .feature-card:nth-child(6) .feature-icon::after { border-color: #ffff00; }

        .feature-card h3 {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: white;
        }

        .feature-card p {
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.8;
        }

        /* Pricing Section */
        .pricing {
            padding: 8rem 5%;
            background: linear-gradient(180deg, transparent 0%, rgba(255, 0, 255, 0.05) 50%, transparent 100%);
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .pricing-card {
            background: rgba(13, 13, 26, 0.9);
            border: 2px solid rgba(0, 255, 255, 0.3);
            border-radius: 0;
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
            transition: all 0.4s ease;
        }

        .pricing-card.featured {
            border-color: #ff00ff;
            transform: scale(1.05);
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.3);
        }

        .pricing-card:hover {
            border-color: #00ffff;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        }

        .pricing-card.featured:hover {
            border-color: #ff00ff;
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.5);
        }

        .pricing-card h3 {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .pricing-price {
            font-family: 'Orbitron', sans-serif;
            font-size: 4rem;
            font-weight: 700;
            color: #00ffff;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            margin-bottom: 2rem;
        }

        .pricing-price span {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.5);
        }

        .pricing-features {
            list-style: none;
            margin-bottom: 2rem;
        }

        .pricing-features li {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.7);
        }

        .pricing-cta {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: transparent;
            border: 2px solid #00ffff;
            color: #00ffff;
            font-family: 'Orbitron', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .pricing-cta:hover {
            background: #00ffff;
            color: #0d0d1a;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }

        .pricing-card.featured .pricing-cta {
            background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
            border: none;
            color: #0d0d1a;
        }

        .pricing-card.featured .pricing-cta:hover {
            transform: scale(1.05);
        }

        /* CTA Banner */
        .cta-banner {
            padding: 8rem 5%;
            text-align: center;
            position: relative;
        }

        .cta-banner::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(255, 0, 255, 0.2) 0%, transparent 70%);
            pointer-events: none;
        }

        .cta-banner h2 {
            font-family: 'Orbitron', sans-serif;
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            color: white;
        }

        .cta-banner p {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 3rem;
        }

        /* Footer */
        .footer {
            padding: 4rem 5%;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
        }

        .footer-links a {
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: #ff00ff;
        }

        .footer-copyright {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.875rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .features-grid,
            .pricing-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .pricing-card.featured {
                transform: scale(1);
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .features-grid,
            .pricing-grid {
                grid-template-columns: 1fr;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-title {
                font-size: 2rem;
            }
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
    <div class="scanlines"></div>
    
    <nav class="cyber-nav">
        <div class="logo">CYBER</div>
        <ul class="nav-links">
            <li><a href="#features" class="glitch">Features</a></li>
            <li><a href="#pricing" class="glitch">Pricing</a></li>
            <li><a href="#" class="glitch">About</a></li>
            <li><a href="#" class="glitch">Contact</a></li>
        </ul>
        <button class="nav-cta">Launch App</button>
    </nav>

    <section class="hero">
        <div class="grid-floor"></div>
        <div class="particles">
            <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
            <div class="particle" style="left: 20%; animation-delay: 2s;"></div>
            <div class="particle" style="left: 30%; animation-delay: 4s;"></div>
            <div class="particle" style="left: 40%; animation-delay: 1s;"></div>
            <div class="particle" style="left: 50%; animation-delay: 3s;"></div>
            <div class="particle" style="left: 60%; animation-delay: 5s;"></div>
            <div class="particle" style="left: 70%; animation-delay: 1.5s;"></div>
            <div class="particle" style="left: 80%; animation-delay: 2.5s;"></div>
            <div class="particle" style="left: 90%; animation-delay: 4.5s;"></div>
        </div>
        <div class="hero-content">
            <h1 class="glitch">FUTURE IS <span>NOW</span></h1>
            <p class="hero-subtitle">Enter the next generation of digital experiences</p>
            <a href="#" class="hero-cta">Get Started</a>
        </div>
    </section>

    <section class="features" id="features">
        <h2 class="section-title">Our <span>Features</span></h2>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Built for speed with cutting-edge optimization techniques that deliver content at unprecedented speeds.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>Enterprise-grade security with end-to-end encryption and advanced threat protection systems.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>Beautiful Design</h3>
                <p>Stunning interfaces crafted with precision and attention to every pixel detail.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🌐</div>
                <h3>Global Scale</h3>
                <p>Deploy across the globe with our distributed infrastructure ensuring reliability everywhere.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🤖</div>
                <h3>AI Powered</h3>
                <p>Leverage the power of artificial intelligence to automate and enhance your workflows.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Analytics</h3>
                <p>Real-time insights and comprehensive analytics to make data-driven decisions.</p>
            </div>
        </div>
    </section>

    <section class="pricing" id="pricing">
        <h2 class="section-title">Choose Your <span>Plan</span></h2>
        <div class="pricing-grid">
            <div class="pricing-card">
                <h3>Basic</h3>
                <div class="pricing-price">\$29<span>/mo</span></div>
                <ul class="pricing-features">
                    <li>5 Projects</li>
                    <li>100GB Storage</li>
                    <li>Basic Analytics</li>
                    <li>Email Support</li>
                </ul>
                <button class="pricing-cta">Select Plan</button>
            </div>
            <div class="pricing-card featured">
                <h3>Pro</h3>
                <div class="pricing-price">\$79<span>/mo</span></div>
                <ul class="pricing-features">
                    <li>Unlimited Projects</li>
                    <li>1TB Storage</li>
                    <li>Advanced Analytics</li>
                    <li>Priority Support</li>
                    <li>AI Features</li>
                </ul>
                <button class="pricing-cta">Select Plan</button>
            </div>
            <div class="pricing-card">
                <h3>Enterprise</h3>
                <div class="pricing-price">\$199<span>/mo</span></div>
                <ul class="pricing-features">
                    <li>Everything in Pro</li>
                    <li>Unlimited Storage</li>
                    <li>Custom Integrations</li>
                    <li>Dedicated Manager</li>
                    <li>SLA Guarantee</li>
                </ul>
                <button class="pricing-cta">Contact Us</button>
            </div>
        </div>
    </section>

    <section class="cta-banner">
        <h2>Ready to <span style="color: #ff00ff;">transform</span> your future?</h2>
        <p>Join thousands of innovators already building with us</p>
        <a href="#" class="hero-cta">Start Now</a>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">CYBER</div>
            <div class="footer-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Contact</a>
            </div>
            <p class="footer-copyright">2024 Cyber Tech. All rights reserved.</p>
        </div>
    </footer>
` }} />
    </>
  );
}
