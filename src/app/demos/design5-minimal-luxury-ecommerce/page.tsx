// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design5minimalluxuryecommerceTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
        // Filter tags
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Testimonial slider
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });

        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Newsletter form
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            
            button.textContent = 'Subscribed!';
            button.style.background = '#d4af37';
            input.value = '';
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.style.background = '#1a1a1a';
            }, 3000);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.category-card, .product-card, .brand-content, .testimonial').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
    
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>LUXE - Minimal Luxury E-commerce</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #fafafa;
            color: #1a1a1a;
            line-height: 1.6;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(250, 250, 250, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .nav-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1.5rem 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-links {
            display: flex;
            gap: 3rem;
            list-style: none;
        }

        .nav-links a {
            color: #1a1a1a;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            position: relative;
            padding: 0.5rem 0;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 1px;
            background: #d4af37;
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .nav-search {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 50px;
            transition: all 0.3s ease;
        }

        .nav-search:focus-within {
            border-color: #d4af37;
        }

        .nav-search input {
            border: none;
            background: none;
            outline: none;
            font-size: 0.875rem;
            width: 150px;
        }

        .cart-icon {
            position: relative;
            cursor: pointer;
            padding: 0.5rem;
        }

        .cart-count {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: #d4af37;
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: popIn 0.3s ease;
        }

        @keyframes popIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-bg {
            position: absolute;
            top: 0;
            right: 0;
            width: 55%;
            height: 100%;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
        }

        .hero-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 8s ease;
        }

        .hero:hover .hero-bg img {
            transform: scale(1.05);
        }

        .hero-content {
            position: relative;
            z-index: 10;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 3rem;
            width: 100%;
        }

        .hero-text {
            max-width: 550px;
        }

        .hero-tag {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #d4af37;
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.8s ease 0.3s forwards;
        }

        @keyframes fadeUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3rem, 6vw, 5rem);
            font-weight: 400;
            line-height: 1.1;
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s ease 0.5s forwards;
        }

        .hero p {
            font-size: 1.125rem;
            color: #666;
            margin-bottom: 2.5rem;
            max-width: 450px;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s ease 0.7s forwards;
        }

        .hero-cta {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem 2.5rem;
            background: #1a1a1a;
            color: white;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 1px;
            transition: all 0.4s ease;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s ease 0.9s forwards;
        }

        .hero-cta:hover {
            background: #d4af37;
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
        }

        .hero-cta svg {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .hero-cta:hover svg {
            transform: translateX(5px);
        }

        /* Categories Section */
        .categories {
            padding: 8rem 3rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 3rem;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 400;
        }

        .section-link {
            color: #1a1a1a;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s ease;
        }

        .section-link:hover {
            color: #d4af37;
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
        }

        .category-card {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            cursor: pointer;
            background: #f0f0f0;
        }

        .category-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .category-card:hover img {
            transform: scale(1.08);
        }

        .category-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
            color: white;
        }

        .category-overlay h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 0.5rem;
        }

        .category-overlay span {
            font-size: 0.8rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        /* Products Section */
        .products {
            padding: 6rem 3rem;
            background: #f5f5f5;
        }

        .products-inner {
            max-width: 1400px;
            margin: 0 auto;
        }

        .products-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .products-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 400;
            margin-bottom: 1rem;
        }

        .products-header p {
            color: #666;
            max-width: 500px;
            margin: 0 auto;
        }

        .filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .filter-tag {
            padding: 0.75rem 1.5rem;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 50px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-tag:hover,
        .filter-tag.active {
            background: #1a1a1a;
            color: white;
            border-color: #1a1a1a;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }

        .product-card {
            background: white;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s ease;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .product-image {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            background: #f0f0f0;
        }

        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .product-card:hover .product-image img {
            transform: scale(1.05);
        }

        .product-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            padding: 0.5rem 1rem;
            background: #d4af37;
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .quick-view {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            background: rgba(26, 26, 26, 0.9);
            color: white;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 500;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }

        .product-card:hover .quick-view {
            transform: translateY(0);
        }

        .product-info {
            padding: 1.5rem;
        }

        .product-category {
            font-size: 0.75rem;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
        }

        .product-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.125rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .product-price {
            font-size: 1rem;
            font-weight: 600;
            color: #1a1a1a;
        }

        .product-price span {
            font-size: 0.875rem;
            color: #999;
            text-decoration: line-through;
            margin-left: 0.5rem;
        }

        /* Brand Story */
        .brand-story {
            padding: 8rem 3rem;
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .brand-image {
            position: relative;
        }

        .brand-image img {
            width: 100%;
            height: 600px;
            object-fit: cover;
        }

        .brand-image::after {
            content: '';
            position: absolute;
            top: 2rem;
            right: -2rem;
            width: 100%;
            height: 100%;
            border: 2px solid #d4af37;
            z-index: -1;
        }

        .brand-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 400;
            margin-bottom: 1.5rem;
            line-height: 1.3;
        }

        .brand-content p {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }

        .brand-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
            padding-top: 3rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .stat h3 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 400;
            color: #d4af37;
            margin-bottom: 0.5rem;
        }

        .stat p {
            font-size: 0.875rem;
            color: #666;
            margin: 0;
        }

        /* Testimonials */
        .testimonials {
            padding: 6rem 3rem;
            background: #1a1a1a;
            color: white;
        }

        .testimonials-inner {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        .testimonials h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 400;
            margin-bottom: 3rem;
        }

        .testimonial-slider {
            position: relative;
        }

        .testimonial {
            display: none;
        }

        .testimonial.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .testimonial-quote {
            font-size: 1.5rem;
            font-style: italic;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.9);
        }

        .testimonial-author {
            font-size: 1rem;
            font-weight: 500;
        }

        .testimonial-role {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 0.5rem;
        }

        .testimonial-dots {
            display: flex;
            justify-content: center;
            gap: 0.75rem;
            margin-top: 3rem;
        }

        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active,
        .dot:hover {
            background: #d4af37;
        }

        /* Newsletter */
        .newsletter {
            padding: 6rem 3rem;
            background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
        }

        .newsletter-inner {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        .newsletter h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 400;
            margin-bottom: 1rem;
        }

        .newsletter p {
            color: #666;
            margin-bottom: 2rem;
        }

        .newsletter-form {
            display: flex;
            gap: 1rem;
        }

        .newsletter-form input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            background: white;
            font-size: 0.875rem;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .newsletter-form input:focus {
            border-color: #d4af37;
        }

        .newsletter-form button {
            padding: 1rem 2rem;
            background: #1a1a1a;
            color: white;
            border: none;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .newsletter-form button:hover {
            background: #d4af37;
        }

        /* Footer */
        .footer {
            padding: 4rem 3rem 2rem;
            background: #1a1a1a;
            color: white;
        }

        .footer-inner {
            max-width: 1400px;
            margin: 0 auto;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 4rem;
            margin-bottom: 4rem;
        }

        .footer-brand h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 1rem;
            letter-spacing: 3px;
        }

        .footer-brand p {
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .footer-section h4 {
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .footer-section a {
            display: block;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            margin-bottom: 0.75rem;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: #d4af37;
        }

        .footer-bottom {
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-bottom p {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.875rem;
        }

        .footer-social {
            display: flex;
            gap: 1rem;
        }

        .footer-social a {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .footer-social a:hover {
            background: #d4af37;
            border-color: #d4af37;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .categories-grid,
            .products-grid,
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .brand-story {
                grid-template-columns: 1fr;
            }

            .brand-image::after {
                display: none;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .hero-bg {
                width: 100%;
                opacity: 0.3;
            }

            .categories-grid,
            .products-grid,
            .footer-grid {
                grid-template-columns: 1fr;
            }

            .newsletter-form {
                flex-direction: column;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
    <nav class="nav">
        <div class="nav-inner">
            <div class="logo" style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; letter-spacing: 3px;">LUXE</div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Collections</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Journal</a></li>
            </ul>
            <div class="nav-actions">
                <div class="nav-search">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <input type="text" placeholder="Search...">
                </div>
                <div class="cart-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span class="cart-count">3</span>
                </div>
            </div>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-bg">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200" alt="Fashion">
        </div>
        <div class="hero-content">
            <div class="hero-text">
                <span class="hero-tag">New Collection 2024</span>
                <h1>Elevate Your Everyday Style</h1>
                <p>Discover curated pieces that blend timeless elegance with contemporary design. Crafted for those who appreciate the finer things.</p>
                <a href="#" class="hero-cta">
                    Explore Collection
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <section class="categories">
        <div class="section-header">
            <h2 class="section-title">Shop by Category</h2>
            <a href="#" class="section-link">View All Categories</a>
        </div>
        <div class="categories-grid">
            <div class="category-card">
                <img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600" alt="Fashion">
                <div class="category-overlay">
                    <h3>Fashion</h3>
                    <span>Shop Now</span>
                </div>
            </div>
            <div class="category-card">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600" alt="Men">
                <div class="category-overlay">
                    <h3>Men</h3>
                    <span>Shop Now</span>
                </div>
            </div>
            <div class="category-card">
                <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600" alt="Accessories">
                <div class="category-overlay">
                    <h3>Accessories</h3>
                    <span>Shop Now</span>
                </div>
            </div>
            <div class="category-card">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" alt="Shoes">
                <div class="category-overlay">
                    <h3>Shoes</h3>
                    <span>Shop Now</span>
                </div>
            </div>
        </div>
    </section>

    <section class="products">
        <div class="products-inner">
            <div class="products-header">
                <h2>Featured Products</h2>
                <p>Handpicked selections from our latest collection, designed to complement your lifestyle.</p>
            </div>
            <div class="filters">
                <span class="filter-tag active">All</span>
                <span class="filter-tag">New Arrivals</span>
                <span class="filter-tag">Best Sellers</span>
                <span class="filter-tag">Sale</span>
            </div>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600" alt="Product">
                        <span class="product-badge">New</span>
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <p class="product-category">Outerwear</p>
                        <h3 class="product-name">Cashmere Blend Coat</h3>
                        <p class="product-price">\$895</p>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600" alt="Product">
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <p class="product-category">Knitwear</p>
                        <h3 class="product-name">Merino Wool Sweater</h3>
                        <p class="product-price">\$345</p>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" alt="Product">
                        <span class="product-badge">Bestseller</span>
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <p class="product-category">Accessories</p>
                        <h3 class="product-name">Leather Tote Bag</h3>
                        <p class="product-price">\$565</p>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" alt="Product">
                        <div class="quick-view">Quick View</div>
                    </div>
                    <div class="product-info">
                        <p class="product-category">Footwear</p>
                        <h3 class="product-name">Premium Leather Sneakers</h3>
                        <p class="product-price">\$425 <span>\$595</span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="brand-story">
        <div class="brand-image">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800" alt="Brand">
        </div>
        <div class="brand-content">
            <h2>Crafted with Passion, Worn with Confidence</h2>
            <p>Since 2010, we've been dedicated to creating timeless pieces that transcend trends. Every garment tells a story of craftsmanship, quality, and enduring style.</p>
            <p>Our commitment to sustainability means every piece is made with the future in mind, using responsibly sourced materials and ethical manufacturing practices.</p>
            <div class="brand-stats">
                <div class="stat">
                    <h3>14</h3>
                    <p>Years of Excellence</p>
                </div>
                <div class="stat">
                    <h3>50+</h3>
                    <p>Global Boutiques</p>
                </div>
                <div class="stat">
                    <h3>100%</h3>
                    <p>Sustainable</p>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="testimonials-inner">
            <h2>What Our Clients Say</h2>
            <div class="testimonial-slider">
                <div class="testimonial active">
                    <p class="testimonial-quote">"The quality and attention to detail is unmatched. Every piece I've purchased has become a treasured part of my wardrobe."</p>
                    <p class="testimonial-author">Victoria Chen</p>
                    <p class="testimonial-role">Fashion Editor</p>
                </div>
                <div class="testimonial">
                    <p class="testimonial-quote">"LUXE represents the perfect blend of elegance and modernity. Their pieces are investment pieces that stand the test of time."</p>
                    <p class="testimonial-author">Michael Torres</p>
                    <p class="testimonial-role">Creative Director</p>
                </div>
                <div class="testimonial">
                    <p class="testimonial-quote">"From the moment you walk in, to the packaging of your purchase, every detail reflects their commitment to excellence."</p>
                    <p class="testimonial-author">Emma Watson</p>
                    <p class="testimonial-role">Lifestyle Blogger</p>
                </div>
            </div>
            <div class="testimonial-dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    </section>

    <section class="newsletter">
        <div class="newsletter-inner">
            <h2>Join the LUXE Community</h2>
            <p>Subscribe to receive exclusive previews, styling tips, and early access to new collections.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email address">
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>LUXE</h3>
                    <p>Timeless elegance meets contemporary design. Crafted for those who appreciate the finer things in life.</p>
                </div>
                <div class="footer-section">
                    <h4>Shop</h4>
                    <a href="#">Women</a>
                    <a href="#">Men</a>
                    <a href="#">Accessories</a>
                    <a href="#">Sale</a>
                </div>
                <div class="footer-section">
                    <h4>About</h4>
                    <a href="#">Our Story</a>
                    <a href="#">Sustainability</a>
                    <a href="#">Careers</a>
                    <a href="#">Press</a>
                </div>
                <div class="footer-section">
                    <h4>Help</h4>
                    <a href="#">Contact Us</a>
                    <a href="#">Shipping</a>
                    <a href="#">Returns</a>
                    <a href="#">Size Guide</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>2024 LUXE. All rights reserved.</p>
                <div class="footer-social">
                    <a href="#">f</a>
                    <a href="#">in</a>
                    <a href="#">ig</a>
                </div>
            </div>
        </div>
    </footer>

    
` }} />
    </>
  );
}
