// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design5particleheroTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
    class Particle {
      constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 2 + Math.random() * 2;
        this.opacity = 0.3 + Math.random() * 0.7;
        this.canvas = canvas;
        this.targetX = x;
        this.targetY = y;
        this.gathered = false;
      }

      update(mouseX, mouseY, particles) {
        // Mouse repulsion
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          this.vx += (dx / dist) * force * 0.5;
          this.vy += (dy / dist) * force * 0.5;
        }

        // Brownian motion
        this.vx += (Math.random() - 0.5) * 0.2;
        this.vy += (Math.random() - 0.5) * 0.2;

        // Velocity damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Move toward target if gathered
        if (this.gathered) {
          this.x += (this.targetX - this.x) * 0.05;
          this.y += (this.targetY - this.y) * 0.05;
        } else {
          this.x += this.vx;
          this.y += this.vy;
        }

        // Wrap around edges
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    class ParticleSystem {
      constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.targetMouseX = -1000;
        this.targetMouseY = -1000;
        this.phase = 'scatter';
        this.phaseTime = 0;
        this.textPixels = [];

        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
      }

      resize() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      }

      init() {
        const particleCount = Math.min(500, Math.floor((this.width * this.height) / 3000));
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * this.width;
          const y = Math.random() * this.height;
          this.particles.push(new Particle(x, y, this.canvas));
        }

        this.generateTextPixels();
      }

      generateTextPixels() {
        const textCanvas = document.createElement('canvas');
        const textCtx = textCanvas.getContext('2d');
        textCanvas.width = this.width;
        textCanvas.height = this.height;

        textCtx.fillStyle = '#000';
        textCtx.font = `bold ${Math.min(120, this.width * 0.15)}px Outfit`;
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.fillText('PARTICLE', this.width / 2, this.height / 2 - 40);
        textCtx.fillText('UNIVERSE', this.width / 2, this.height / 2 + 60);

        const imageData = textCtx.getImageData(0, 0, this.width, this.height).data;
        this.textPixels = [];

        for (let y = 0; y < this.height; y += 8) {
          for (let x = 0; x < this.width; x += 8) {
            const i = (y * this.width + x) * 4;
            if (imageData[i] < 128) {
              this.textPixels.push({
                x: x + (Math.random() - 0.5) * 8,
                y: y + (Math.random() - 0.5) * 8
              });
            }
          }
        }
      }

      bindEvents() {
        window.addEventListener('resize', () => {
          this.resize();
          this.init();
        });

        window.addEventListener('mousemove', (e) => {
          this.targetMouseX = e.clientX;
          this.targetMouseY = e.clientY;
        });

        window.addEventListener('touchmove', (e) => {
          this.targetMouseX = e.touches[0].clientX;
          this.targetMouseY = e.touches[0].clientY;
        });
      }

      updatePhase(deltaTime) {
        this.phaseTime += deltaTime;

        switch (this.phase) {
          case 'scatter':
            if (this.phaseTime > 2000) {
              this.phase = 'gather';
              this.phaseTime = 0;
              this.particles.forEach((p, i) => {
                const target = this.textPixels[i % this.textPixels.length];
                p.targetX = target.x;
                p.targetY = target.y;
                p.gathered = true;
              });
            }
            break;
          case 'gather':
            if (this.phaseTime > 3000) {
              this.phase = 'hold';
              this.phaseTime = 0;
            }
            break;
          case 'hold':
            if (this.phaseTime > 1000) {
              this.phase = 'scatter';
              this.phaseTime = 0;
              this.particles.forEach(p => {
                p.gathered = false;
              });
            }
            break;
        }
      }

      drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const p1 = this.particles[i];
            const p2 = this.particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const opacity = (1 - dist / 120) * 0.2;
              this.ctx.beginPath();
              this.ctx.moveTo(p1.x, p1.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
              this.ctx.lineWidth = 1;
              this.ctx.stroke();
            }
          }
        }
      }

      animate(lastTime = 0) {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth mouse following
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        // Update phase
        this.updatePhase(deltaTime);

        // Draw connections
        this.drawConnections();

        // Update and draw particles
        this.particles.forEach(p => {
          p.update(this.mouseX, this.mouseY, this.particles);
          p.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate(currentTime));
      }
    }

    // Initialize
    new ParticleSystem();
  
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Particle Hero</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
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
      font-family: 'Outfit', system-ui, sans-serif;
      background: #0a0a1a;
      min-height: 100vh;
      overflow: hidden;
    }

    .hero-container {
      position: relative;
      width: 100vw;
      height: 100vh;
    }

    #particleCanvas {
      position: absolute;
      inset: 0;
    }

    .gradient-overlay {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, rgba(0, 245, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .text-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 10;
    }

    .hero-title {
      font-size: clamp(48px, 8vw, 96px);
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.04em;
      text-align: center;
      line-height: 1.1;
      text-shadow: 0 0 60px rgba(0, 245, 255, 0.5);
      opacity: 0;
      transform: translateY(30px);
      animation: fadeUp 1s ease-out 0.5s forwards;
    }

    .hero-title span {
      display: block;
      background: linear-gradient(135deg, #00f5ff, #a855f7, #ff00aa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: clamp(16px, 2vw, 24px);
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 20px;
      text-align: center;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeUp 1s ease-out 0.8s forwards;
    }

    .cta-button {
      margin-top: 40px;
      padding: 16px 40px;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      color: #0a0a1a;
      background: linear-gradient(135deg, #00f5ff, #00c8d4);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      pointer-events: auto;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeUp 1s ease-out 1.1s forwards;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 10px 40px rgba(0, 245, 255, 0.3);
    }

    .cta-button:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 20px 60px rgba(0, 245, 255, 0.4);
    }

    .cta-button:active {
      transform: scale(0.98);
    }

    @keyframes fadeUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: fadeUp 1s ease-out 1.5s forwards;
    }

    .scroll-indicator span {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }

    .scroll-line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(0, 245, 255, 0.8), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
      50% { opacity: 1; transform: scaleY(1); }
    }

    @media (max-width: 768px) {
      .hero-title {
        padding: 0 20px;
      }
    }
  ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
  <div class="hero-container">
    <canvas id="particleCanvas"></canvas>
    <div class="gradient-overlay"></div>
    <div class="text-overlay">
      <h1 class="hero-title">
        <span>Particle</span>
        <span>Universe</span>
      </h1>
      <p class="hero-subtitle">Interactive canvas particle system</p>
      <button class="cta-button">Explore Now</button>
    </div>
    <div class="scroll-indicator">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </div>

  
` }} />
    </>
  );
}
