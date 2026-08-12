// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design4organicfluidanimationTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
        // Interactive blob following mouse
        const blob = document.getElementById('interactiveBlob');
        let mouseX = 0, mouseY = 0;
        let blobX = 0, blobY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateBlob() {
            blobX += (mouseX - blobX) * 0.1;
            blobY += (mouseY - blobY) * 0.1;
            blob.style.left = (blobX - 150) + 'px';
            blob.style.top = (blobY - 150) + 'px';
            requestAnimationFrame(animateBlob);
        }

        animateBlob();

        // Smooth scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .testimonial-card, .gallery-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.hero-cta, .cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255,255,255,0.4);
                    border-radius: 50%;
                    pointer-events: none;
                    width: 100px;
                    height: 100px;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                `;
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .hero-cta,
                .cta-button {
                    animation: none !important;
                }
                .hero-cta,
                .cta-button,
                .feature-card,
                .testimonial-card,
                .gallery-item {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Parallax effect on scroll
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                document.querySelectorAll('.blob').forEach((blob, index) => {
                    const speed = 0.1 + (index * 0.05);
                    blob.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
    
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Organic Fluid Animation</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffecd2 100%);
            min-height: 100vh;
            overflow-x: hidden;
            color: #333;
        }

        /* Skip to content link */
        .skip-to-content {
            position: absolute;
            top: -40px;
            left: 0;
            background: #ff6b6b;
            color: white;
            padding: 8px 16px;
            z-index: 1000;
            text-decoration: none;
            border-radius: 0 0 4px 0;
            font-weight: 600;
        }
        .skip-to-content:focus {
            top: 0;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 30%, #a8edea 70%, #fed6e3 100%);
        }

        /* Blob Container */
        .blob-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }

        .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            opacity: 0.8;
            animation: float 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
            .blob,
            .interactive-blob {
                animation: none !important;
            }
            .wave-divider svg {
                animation: none !important;
            }
            .blob {
                transform: none !important;
            }
        }

        .blob-1 {
            width: 600px;
            height: 600px;
            background: linear-gradient(135deg, rgba(255, 181, 167, 0.8), rgba(205, 180, 219, 0.6));
            top: -200px;
            left: -200px;
            animation-delay: 0s;
        }

        .blob-2 {
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, rgba(168, 237, 234, 0.8), rgba(254, 214, 227, 0.6));
            top: 50%;
            right: -150px;
            animation-delay: 2s;
        }

        .blob-3 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, rgba(255, 181, 167, 0.6), rgba(160, 215, 255, 0.8));
            bottom: -100px;
            left: 30%;
            animation-delay: 4s;
        }

        .blob-4 {
            width: 350px;
            height: 350px;
            background: linear-gradient(135deg, rgba(205, 180, 219, 0.7), rgba(255, 181, 167, 0.5));
            top: 20%;
            left: 50%;
            animation-delay: 1s;
        }

        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            25% {
                transform: translate(30px, -30px) scale(1.05);
            }
            50% {
                transform: translate(-20px, 20px) scale(0.95);
            }
            75% {
                transform: translate(20px, 10px) scale(1.02);
            }
        }

        /* Interactive Blob */
        .interactive-blob {
            position: fixed;
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, rgba(160, 215, 255, 0.6), rgba(205, 180, 219, 0.6));
            border-radius: 50%;
            filter: blur(30px);
            pointer-events: none;
            z-index: 100;
            transition: transform 0.3s ease-out;
        }

        /* Hero Content */
        .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 2rem;
        }

        .hero h1 {
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 700;
            color: #333;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(30px);
            animation: slideUp 1s ease-out 0.3s forwards;
        }

        .hero h1 span {
            background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        @keyframes slideUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero p {
            font-size: 1.25rem;
            color: rgba(51, 51, 51, 0.7);
            max-width: 600px;
            margin: 0 auto 2rem;
            line-height: 1.8;
            opacity: 0;
            transform: translateY(30px);
            animation: slideUp 1s ease-out 0.6s forwards;
        }

        .hero-cta {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: linear-gradient(135deg, #ff6b6b, #ff9f9f);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(30px);
            animation: slideUp 1s ease-out 0.9s forwards;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }

        .hero-cta:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
        }

        /* Wave Divider */
        .wave-divider {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
        }

        .wave-divider svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 150px;
            animation: waveMove 10s ease-in-out infinite;
        }

        @keyframes waveMove {
            0%, 100% {
                transform: translateX(0) translateY(0);
            }
            50% {
                transform: translateX(-25px) translateY(10px);
            }
        }

        /* Features Section */
        .features {
            padding: 8rem 5%;
            background: white;
            position: relative;
        }

        .section-title {
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 4rem;
            color: #333;
        }

        .section-title span {
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature-card {
            position: relative;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, #ffecd2, #fcb69f);
            border-radius: 30px;
            text-align: center;
            transition: all 0.4s ease;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            transform: scale(0);
            transition: transform 0.5s ease;
        }

        .feature-card:hover::before {
            transform: scale(1);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 1.5rem;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }

        .feature-card p {
            color: rgba(51, 51, 51, 0.7);
            line-height: 1.7;
        }

        /* Testimonials Section */
        .testimonials {
            padding: 8rem 5%;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            position: relative;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .testimonial-card {
            background: white;
            padding: 2.5rem;
            border-radius: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .testimonial-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 1.5rem;
            object-fit: cover;
            border: 4px solid #ffecd2;
        }

        .testimonial-text {
            font-size: 1rem;
            color: rgba(51, 51, 51, 0.8);
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        .testimonial-name {
            font-size: 1.125rem;
            font-weight: 600;
            color: #333;
        }

        .testimonial-role {
            font-size: 0.875rem;
            color: rgba(51, 51, 51, 0.6);
        }

        /* Gallery Section */
        .gallery {
            padding: 8rem 5%;
            background: white;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .gallery-item {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            aspect-ratio: 1;
            cursor: pointer;
        }

        .gallery-item:nth-child(1),
        .gallery-item:nth-child(4) {
            border-radius: 50%;
        }

        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .gallery-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(254, 202, 87, 0.3));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
        }

        .gallery-item:hover::before {
            opacity: 1;
        }

        .gallery-item:hover img {
            transform: scale(1.1);
        }

        /* CTA Section */
        .cta {
            padding: 8rem 5%;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #a8edea 100%);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .cta h2 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #333;
        }

        .cta p {
            font-size: 1.25rem;
            color: rgba(51, 51, 51, 0.7);
            max-width: 600px;
            margin: 0 auto 2.5rem;
        }

        .cta-button {
            display: inline-block;
            padding: 1.25rem 3rem;
            background: linear-gradient(135deg, #ff6b6b, #ff9f9f);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.125rem;
            transition: all 0.3s ease;
            box-shadow: 0 15px 40px rgba(255, 107, 107, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 50px rgba(255, 107, 107, 0.4);
        }

        /* Footer Wave */
        .footer-wave {
            height: 150px;
            background: white;
            position: relative;
        }

        .footer-wave svg {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        /* Footer */
        .footer {
            background: linear-gradient(135deg, #333 0%, #1a1a1a 100%);
            color: white;
            padding: 4rem 5% 2rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3rem;
        }

        .footer-section h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }

        .footer-section a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            margin-bottom: 0.75rem;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: #ff6b6b;
        }

        .footer-bottom {
            max-width: 1200px;
            margin: 3rem auto 0;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .features-grid,
            .testimonials-grid,
            .gallery-grid,
            .footer-content {
                grid-template-columns: repeat(2, 1fr);
            }

            .gallery-item:nth-child(1),
            .gallery-item:nth-child(4) {
                border-radius: 20px;
            }
        }

        @media (max-width: 768px) {
            .features-grid,
            .testimonials-grid,
            .gallery-grid,
            .footer-content {
                grid-template-columns: 1fr;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-title,
            .cta h2 {
                font-size: 2rem;
            }
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <div class="interactive-blob" id="interactiveBlob"></div>

    <header>
    <section class="hero">
        <div class="blob-container">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <div class="blob blob-4"></div>
        </div>
        <div class="hero-content">
            <h1>Experience the <span>Organic</span> Revolution</h1>
            <p>Immerse yourself in fluid, natural design that flows like water and breathes like the wind.</p>
            <a href="#" class="hero-cta">Discover More</a>
        </div>
        <div class="wave-divider">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
            </svg>
        </div>
    </section>
    </header>

    <main id="main-content">
    <section class="features" aria-label="Features">
        <h2 class="section-title">Why Choose <span>Us</span></h2>
        <div class="features-grid">
            <article class="feature-card">
                <div class="feature-icon">🌊</div>
                <h3>Fluid Design</h3>
                <p>Smooth, organic animations that flow naturally like water, creating an immersive experience.</p>
            </article>
            <article class="feature-card">
                <div class="feature-icon">✨</div>
                <h3>Pure Beauty</h3>
                <p>Every element crafted with care, creating harmony between form and function.</p>
            </article>
            <article class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Lightning Fast</h3>
                <p>Optimized performance that keeps your experience smooth and seamless.</p>
            </article>
        </div>
    </section>

    <section class="testimonials" aria-label="Testimonials">
        <h2 class="section-title">What They <span>Say</span></h2>
        <div class="testimonials-grid">
            <article class="testimonial-card">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="Sarah, customer testimonial" class="testimonial-avatar">
                <blockquote class="testimonial-text">"Absolutely stunning design! The organic feel brings a whole new dimension to web experiences."</blockquote>
                <h4 class="testimonial-name">Sarah Johnson</h4>
                <p class="testimonial-role">Creative Director</p>
            </article>
            <article class="testimonial-card">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Michael, customer testimonial" class="testimonial-avatar">
                <blockquote class="testimonial-text">"The fluidity and attention to detail is remarkable. Truly a masterpiece of design."</blockquote>
                <h4 class="testimonial-name">Michael Chen</h4>
                <p class="testimonial-role">Product Designer</p>
            </article>
            <article class="testimonial-card">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" alt="Emma, customer testimonial" class="testimonial-avatar">
                <blockquote class="testimonial-text">"Every interaction feels natural and intuitive. The attention to organic design is unmatched."</blockquote>
                <h4 class="testimonial-name">Emma Williams</h4>
                <p class="testimonial-role">UX Researcher</p>
            </article>
        </div>
    </section>

    <section class="gallery" aria-label="Gallery">
        <h2 class="section-title">Our <span>Gallery</span></h2>
        <div class="gallery-grid">
            <figure class="gallery-item">
                <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop" alt="Abstract purple and pink gradient art">
            </figure>
            <figure class="gallery-item">
                <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop" alt="Colorful fluid paint art">
            </figure>
            <figure class="gallery-item">
                <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop" alt="Pink fluid abstract art">
            </figure>
            <figure class="gallery-item">
                <img src="https://images.unsplash.com/photo-1551163943-3f6a6d5f3d31?w=400&h=400&fit=crop" alt="Blue organic fluid pattern">
            </figure>
        </div>
    </section>

    <section class="cta" aria-label="Call to action">
        <h2>Ready to Experience Organic Design?</h2>
        <p>Join thousands of satisfied customers who have embraced the natural revolution.</p>
        <a href="#" class="cta-button">Get Started</a>
    </section>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Company</h4>
                <a href="#" aria-label="Visit our About page">About</a>
                <a href="#" aria-label="Visit our Careers page">Careers</a>
                <a href="#" aria-label="Visit our Press page">Press</a>
            </div>
            <div class="footer-section">
                <h4>Products</h4>
                <a href="#" aria-label="Visit our Features page">Features</a>
                <a href="#" aria-label="Visit our Pricing page">Pricing</a>
                <a href="#" aria-label="Visit our Solutions page">Solutions</a>
            </div>
            <div class="footer-section">
                <h4>Resources</h4>
                <a href="#" aria-label="Visit our Blog page">Blog</a>
                <a href="#" aria-label="Visit our Tutorials page">Tutorials</a>
                <a href="#" aria-label="Visit our Help Center page">Help Center</a>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <a href="#" aria-label="Visit our Twitter page">Twitter</a>
                <a href="#" aria-label="Visit our LinkedIn page">LinkedIn</a>
                <a href="#" aria-label="Visit our Instagram page">Instagram</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>2024 Organic Design Co. All rights reserved.</p>
        </div>
    </footer>

    
` }} />
    </>
  );
}
