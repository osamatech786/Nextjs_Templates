"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design23dcarouselTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
    const carousel = document.getElementById('carousel') as HTMLElement;
    if (!carousel) return;
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;
    const cardCount = cards.length;
    const angleStep = 360 / cardCount;

    // Position cards in 3D space
    cards.forEach((card, i) => {
      const angle = i * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
    });

    // Interaction state
    let isDragging = false;
    let startX = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let autoSpinSpeed = 0.2;
    let dragVelocity = 0;
    let lastMouseX = 0;

    // Mouse events
    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      lastMouseX = e.clientX;
      carousel.style.cursor = 'grabbing';
      carousel.style.animation = 'none'; // stop CSS animation
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      dragVelocity = deltaX * 0.5;
      targetAngle += dragVelocity;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

    // Touch events
    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      lastMouseX = e.touches[0].clientX;
      carousel.style.animation = 'none';
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      lastMouseX = e.touches[0].clientX;
      dragVelocity = deltaX * 0.5;
      targetAngle += dragVelocity;
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Unified animation loop for rotation and tilt
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    document.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      targetRotationY = (mouseX / centerX) * 20;
      targetRotationX = -(mouseY / centerY) * 15;
    });

    function animate() {
      // Handle base rotation
      if (!isDragging) {
        // Momentum decay
        dragVelocity *= 0.95;
        targetAngle += dragVelocity;
        
        // Auto spin if not hovering (CSS hover pauses, but here we handle it in JS)
        if (Math.abs(dragVelocity) < 0.1) {
          targetAngle += autoSpinSpeed;
        }
      }

      currentAngle += (targetAngle - currentAngle) * 0.1;

      // Handle tilt
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      carousel.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentAngle}deg)`;
      requestAnimationFrame(animate);
    }

    animate();

    // Click ripple effect
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>3D Card Carousel</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      background: #0a0a0f;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Noise texture overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
      z-index: 1;
    }

    /* Vignette */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%);
      pointer-events: none;
      z-index: 2;
    }

    .scene {
      perspective: 1200px;
      perspective-origin: center center;
    }

    .carousel-container {
      position: relative;
      width: 300px;
      height: 420px;
      transform-style: preserve-3d;
    }

    .carousel {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: spin 30s linear infinite;
      cursor: pointer;
    }

    .carousel:hover {
      animation-play-state: paused;
    }

    @keyframes spin {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }

    .card {
      position: absolute;
      width: 280px;
      height: 380px;
      left: 50%;
      top: 50%;
      margin-left: -140px;
      margin-top: -190px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
      will-change: transform;
    }

    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .card:hover {
      box-shadow: 0 0 40px rgba(0, 240, 255, 0.4), 0 0 80px rgba(255, 0, 170, 0.2);
    }

    /* Geometric art inside cards */
    .geo-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .card:nth-child(1) .geo-layer {
      background:
        radial-gradient(circle at 30% 70%, #00f0ff 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, #ff00aa 0%, transparent 35%),
        linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%);
    }

    .card:nth-child(1) .geo-layer::before {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      border: 3px solid rgba(0, 240, 255, 0.6);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .card:nth-child(1) .geo-layer::after {
      content: '';
      position: absolute;
      width: 120px;
      height: 120px;
      background: linear-gradient(45deg, #00f0ff, #ff00aa);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      filter: blur(2px);
      opacity: 0.8;
    }

    .card:nth-child(2) .geo-layer {
      background:
        radial-gradient(circle at 70% 30%, #39ff14 0%, transparent 40%),
        radial-gradient(circle at 20% 80%, #00f0ff 0%, transparent 35%),
        linear-gradient(225deg, #0a1a0a 0%, #1a2e1a 100%);
    }

    .card:nth-child(2) .geo-layer::before {
      content: '';
      position: absolute;
      inset: 30px;
      border: 2px solid rgba(57, 255, 20, 0.5);
      clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
    }

    .card:nth-child(2) .geo-layer::after {
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 4px solid transparent;
      border-top-color: #39ff14;
      border-right-color: #00f0ff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .card:nth-child(3) .geo-layer {
      background:
        radial-gradient(circle at 50% 50%, #ff00aa 0%, transparent 50%),
        radial-gradient(circle at 20% 20%, #f59e0b 0%, transparent 30%),
        linear-gradient(180deg, #1a0a1a 0%, #2e0a2e 100%);
    }

    .card:nth-child(3) .geo-layer::before {
      content: '';
      position: absolute;
      width: 180px;
      height: 180px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: conic-gradient(from 0deg, #ff00aa, #f59e0b, #ff00aa);
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .card:nth-child(3) .geo-layer::after {
      content: '';
      position: absolute;
      inset: 40px;
      background: #0a0a0f;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .card:nth-child(4) .geo-layer {
      background:
        radial-gradient(circle at 60% 40%, #a855f7 0%, transparent 45%),
        radial-gradient(circle at 30% 70%, #06b6d4 0%, transparent 40%),
        linear-gradient(45deg, #0f0a1a 0%, #1a0a2e 100%);
    }

    .card:nth-child(4) .geo-layer::before {
      content: '';
      position: absolute;
      inset: 0;
      clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
      background: linear-gradient(180deg, rgba(168, 85, 247, 0.4), transparent);
    }

    .card:nth-child(4) .geo-layer::after {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      border: 3px solid #06b6d4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .card:nth-child(5) .geo-layer {
      background:
        radial-gradient(circle at 40% 60%, #10b981 0%, transparent 40%),
        radial-gradient(circle at 80% 30%, #a855f7 0%, transparent 35%),
        linear-gradient(315deg, #0a1a0f 0%, #1a2e1a 100%);
    }

    .card:nth-child(5) .geo-layer::before {
      content: '';
      position: absolute;
      width: 160px;
      height: 160px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid rgba(16, 185, 129, 0.5);
      border-radius: 50%;
    }

    .card:nth-child(5) .geo-layer::after {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: repeating-linear-gradient(45deg, #10b981, #10b981 10px, transparent 10px, transparent 20px);
    }

    .card:nth-child(6) .geo-layer {
      background:
        radial-gradient(circle at 25% 75%, #f59e0b 0%, transparent 40%),
        radial-gradient(circle at 75% 25%, #ec4899 0%, transparent 35%),
        linear-gradient(90deg, #1a1a0a 0%, #2e2e1a 100%);
    }

    .card:nth-child(6) .geo-layer::before {
      content: '';
      position: absolute;
      inset: 20px;
      border: 3px solid transparent;
      border-image: linear-gradient(135deg, #f59e0b, #ec4899) 1;
    }

    .card:nth-child(6) .geo-layer::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      background: #f59e0b;
      top: 30%;
      left: 30%;
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }

    .card:nth-child(7) .geo-layer {
      background:
        radial-gradient(circle at 50% 20%, #6366f1 0%, transparent 45%),
        radial-gradient(circle at 80% 80%, #ec4899 0%, transparent 40%),
        linear-gradient(270deg, #0a0a1a 0%, #1a1a2e 100%);
    }

    .card:nth-child(7) .geo-layer::before {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.3), 0 0 0 16px rgba(236, 72, 153, 0.2);
    }

    .card:nth-child(7) .geo-layer::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #6366f1, #ec4899);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .card:nth-child(8) .geo-layer {
      background:
        radial-gradient(circle at 70% 70%, #14b8a6 0%, transparent 40%),
        radial-gradient(circle at 20% 30%, #f97316 0%, transparent 35%),
        linear-gradient(135deg, #0a1a1a 0%, #1a2e2e 100%);
    }

    .card:nth-child(8) .geo-layer::before {
      content: '';
      position: absolute;
      inset: 30px;
      background: repeating-conic-gradient(from 0deg, #14b8a6, #f97316, #14b8a6);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .card:nth-child(8) .geo-layer::after {
      content: '';
      position: absolute;
      inset: 50px;
      background: #0a1a1a;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    /* Card glow effect */
    .card-glow {
      position: absolute;
      inset: -2px;
      border-radius: 26px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .card:hover .card-glow {
      opacity: 1;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }

    /* Reflection */
    .reflection {
      position: absolute;
      bottom: -280px;
      left: 50%;
      transform: translateX(-50%) scaleY(-1);
      width: 280px;
      height: 260px;
      opacity: 0.15;
      mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
      -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
      pointer-events: none;
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    /* Mobile touch hint */
    .touch-hint {
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      z-index: 10;
    }

    @media (max-width: 768px) {
      .card {
        width: 220px;
        height: 300px;
        margin-left: -110px;
        margin-top: -150px;
      }

      .carousel-container {
        width: 240px;
        height: 320px;
      }
    }
  ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
  <div class="scene">
    <div class="carousel-container">
      <div class="carousel" id="carousel">
        <div class="card" data-index="0">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #00f0ff, #ff00aa);"></div>
        </div>
        <div class="card" data-index="1">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #39ff14, #00f0ff);"></div>
        </div>
        <div class="card" data-index="2">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #ff00aa, #f59e0b);"></div>
        </div>
        <div class="card" data-index="3">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #a855f7, #06b6d4);"></div>
        </div>
        <div class="card" data-index="4">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #10b981, #a855f7);"></div>
        </div>
        <div class="card" data-index="5">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #f59e0b, #ec4899);"></div>
        </div>
        <div class="card" data-index="6">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #6366f1, #ec4899);"></div>
        </div>
        <div class="card" data-index="7">
          <div class="geo-layer"></div>
          <div class="card-glow" style="background: linear-gradient(135deg, #14b8a6, #f97316);"></div>
        </div>
      </div>
      <div class="reflection" id="reflection"></div>
    </div>
  </div>

  <p class="touch-hint">Hover to pause • Drag to rotate</p>

  
` }} />
    </>
  );
}
