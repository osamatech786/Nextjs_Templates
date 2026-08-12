// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design3svgdatavizTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
    // Animate line chart
    setTimeout(() => {
      document.querySelectorAll('.chart-line-animated').forEach(el => {
        el.classList.add('animate');
      });
    }, 300);

    // Animate radial rings
    function animateRings() {
      const rings = document.querySelectorAll('.ring-progress');
      rings.forEach((ring, i) => {
        setTimeout(() => {
          const target = parseInt(ring.dataset.target);
          const circumference = 2 * Math.PI * 80;
          const offset = circumference - (target / 502) * circumference;
          ring.style.strokeDashoffset = offset;
        }, i * 200);
      });
    }

    // Animate ring values
    function animateRingValues() {
      document.querySelectorAll('.ring-value').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1500;
        const start = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(easeOut * target) + '%';
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      });
    }

    // Animate bars
    function animateBars() {
      const bars = document.querySelectorAll('.bar');
      bars.forEach((bar, i) => {
        setTimeout(() => {
          const height = bar.dataset.height;
          bar.style.height = (height / 100 * 180) + 'px';
          bar.classList.add('animate');
        }, i * 100);
      });
    }

    // Animate stat values
    function animateStats() {
      document.querySelectorAll('.stat-value').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(easeOut * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      });
    }

    // Tooltip for line chart
    const tooltip = document.getElementById('tooltip');
    const dataPoints = document.querySelectorAll('.data-point');

    dataPoints.forEach(point => {
      point.addEventListener('mouseenter', (e) => {
        const value = point.dataset.value;
        const label = point.dataset.label;
        tooltip.querySelector('.tooltip-value').textContent = value;
        tooltip.querySelector('.tooltip-label').textContent = label;

        const rect = point.getBoundingClientRect();
        const containerRect = point.closest('.line-chart-container').getBoundingClientRect();

        tooltip.style.left = (rect.left - containerRect.left) + 'px';
        tooltip.style.top = (rect.top - containerRect.top - 60) + 'px';
        tooltip.classList.add('visible');
      });

      point.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });

    // Initialize animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateRings();
          animateRingValues();
          animateBars();
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.dashboard'));
  
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>SVG Data Visualization</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
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
      font-family: 'JetBrains Mono', monospace;
      background: #0a0a0f;
      min-height: 100vh;
      padding: 40px;
      color: #fff;
    }

    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .card-rings {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    .card-line {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    .card-bar {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    .card-stats {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.5), transparent);
    }

    .card-title {
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 20px;
    }

    /* Radial Rings */
    .rings-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .ring-wrapper {
      position: relative;
      width: 180px;
      height: 180px;
    }

    .ring-wrapper svg {
      transform: rotate(-90deg);
    }

    .ring-bg {
      fill: none;
      stroke: rgba(255, 255, 255, 0.1);
      stroke-width: 8;
    }

    .ring-progress {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ring-1 .ring-progress {
      stroke: url(#gradient-cyan);
    }

    .ring-2 .ring-progress {
      stroke: url(#gradient-magenta);
    }

    .ring-3 .ring-progress {
      stroke: url(#gradient-lime);
    }

    .ring-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .ring-value {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #00f5ff, #ff00aa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ring-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 4px;
    }

    .ring-wrapper:nth-child(2) {
      transform: scale(0.85);
    }

    .ring-wrapper:nth-child(3) {
      transform: scale(0.7);
    }

    /* Line Chart */
    .line-chart-container {
      height: 280px;
      position: relative;
    }

    .line-chart-svg {
      width: 100%;
      height: 100%;
    }

    .chart-grid line {
      stroke: rgba(255, 255, 255, 0.05);
    }

    .chart-line {
      fill: none;
      stroke: url(#gradient-cyan-magenta);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .chart-area {
      fill: url(#area-gradient);
    }

    .data-point {
      fill: #0a0a0f;
      stroke: #00f5ff;
      stroke-width: 2;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .data-point:hover {
      r: 8;
      fill: #00f5ff;
      filter: drop-shadow(0 0 10px #00f5ff);
    }

    .chart-line-animated {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }

    .chart-line-animated.animate {
      animation: drawLine 2s ease-out forwards;
    }

    @keyframes drawLine {
      to {
        stroke-dashoffset: 0;
      }
    }

    .tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(0, 245, 255, 0.5);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.2s ease;
      z-index: 100;
    }

    .tooltip.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .tooltip-value {
      font-size: 18px;
      font-weight: 700;
      color: #00f5ff;
    }

    .tooltip-label {
      color: rgba(255, 255, 255, 0.6);
      margin-top: 2px;
    }

    /* Bar Chart */
    .bar-chart-container {
      height: 280px;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding: 20px 0;
    }

    .bar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .bar {
      width: 50px;
      border-radius: 8px 8px 0 0;
      transform-origin: bottom;
      transform: scaleY(0);
      transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      cursor: pointer;
    }

    .bar.animate {
      transform: scaleY(1);
    }

    .bar::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%);
      border-radius: inherit;
    }

    .bar:hover {
      filter: brightness(1.2);
    }

    .bar-1 { background: linear-gradient(180deg, #00f5ff, #0088aa); }
    .bar-2 { background: linear-gradient(180deg, #ff00aa, #aa0066); }
    .bar-3 { background: linear-gradient(180deg, #39ff14, #22aa0a); }
    .bar-4 { background: linear-gradient(180deg, #a855f7, #7b2dbf); }
    .bar-5 { background: linear-gradient(180deg, #f59e0b, #d97706); }
    .bar-6 { background: linear-gradient(180deg, #06b6d4, #0891b2); }

    .bar-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    .bar-value {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bar:hover .bar-value {
      opacity: 1;
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .stat-item {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-value.cyan { color: #00f5ff; }
    .stat-value.magenta { color: #ff00aa; }
    .stat-value.lime { color: #39ff14; }
    .stat-value.purple { color: #a855f7; }

    .stat-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .dashboard {
        grid-template-columns: 1fr;
      }
      .card-rings, .card-line, .card-bar, .card-stats {
        grid-column: 1 / -1;
        grid-row: auto;
      }
      .rings-container {
        flex-direction: row;
        justify-content: space-around;
      }
    }

    @media (max-width: 640px) {
      body {
        padding: 20px;
      }
      .dashboard {
        grid-template-columns: 1fr;
      }
      .card:first-child {
        grid-column: span 1;
      }
    }
  ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
  <div class="dashboard">
    <!-- Radial Rings -->
    <div class="card card-rings">
      <h3 class="card-title">Revenue Split</h3>
      <div class="rings-container">
        <div class="ring-wrapper ring-1">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <defs>
              <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00f5ff"/>
                <stop offset="100%" stop-color="#0088aa"/>
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="90" cy="90" r="80"/>
            <circle class="ring-progress" cx="90" cy="90" r="80"
                    stroke-dasharray="502" stroke-dashoffset="502" data-target="150"/>
          </svg>
          <div class="ring-center">
            <div class="ring-value" data-target="75">0</div>
            <div class="ring-label">Products</div>
          </div>
        </div>

        <div class="ring-wrapper ring-2">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <defs>
              <linearGradient id="gradient-magenta" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ff00aa"/>
                <stop offset="100%" stop-color="#aa0066"/>
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="90" cy="90" r="80"/>
            <circle class="ring-progress" cx="90" cy="90" r="80"
                    stroke-dasharray="502" stroke-dashoffset="502" data-target="351"/>
          </svg>
          <div class="ring-center">
            <div class="ring-value" data-target="42">0</div>
            <div class="ring-label">Services</div>
          </div>
        </div>

        <div class="ring-wrapper ring-3">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <defs>
              <linearGradient id="gradient-lime" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#39ff14"/>
                <stop offset="100%" stop-color="#22aa0a"/>
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="90" cy="90" r="80"/>
            <circle class="ring-progress" cx="90" cy="90" r="80"
                    stroke-dasharray="502" stroke-dashoffset="502" data-target="201"/>
          </svg>
          <div class="ring-center">
            <div class="ring-value" data-target="28">0</div>
            <div class="ring-label">Subscriptions</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Line Chart -->
    <div class="card card-line">
      <h3 class="card-title">Performance Trend</h3>
      <div class="line-chart-container">
        <svg class="line-chart-svg" viewBox="0 0 400 220">
          <defs>
            <linearGradient id="gradient-cyan-magenta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f5ff"/>
              <stop offset="50%" stop-color="#a855f7"/>
              <stop offset="100%" stop-color="#ff00aa"/>
            </linearGradient>
            <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="rgba(0, 245, 255, 0.3)"/>
              <stop offset="100%" stop-color="rgba(0, 245, 255, 0)"/>
            </linearGradient>
          </defs>

          <!-- Grid -->
          <g class="chart-grid">
            <line x1="40" y1="40" x2="380" y2="40"/>
            <line x1="40" y1="90" x2="380" y2="90"/>
            <line x1="40" y1="140" x2="380" y2="140"/>
            <line x1="40" y1="190" x2="380" y2="190"/>
          </g>

          <!-- Area -->
          <path class="chart-area chart-line-animated" d="M40,180 L80,140 L130,160 L180,100 L230,120 L280,70 L330,85 L380,40 L380,190 L40,190 Z"/>

          <!-- Line -->
          <path class="chart-line chart-line-animated" d="M40,180 L80,140 L130,160 L180,100 L230,120 L280,70 L330,85 L380,40"/>

          <!-- Data Points -->
          <g class="data-points">
            <circle class="data-point" cx="40" cy="180" r="5" data-value="2.4k" data-label="Jan"/>
            <circle class="data-point" cx="80" cy="140" r="5" data-value="3.8k" data-label="Feb"/>
            <circle class="data-point" cx="130" cy="160" r="5" data-value="3.1k" data-label="Mar"/>
            <circle class="data-point" cx="180" cy="100" r="5" data-value="5.2k" data-label="Apr"/>
            <circle class="data-point" cx="230" cy="120" r="5" data-value="4.5k" data-label="May"/>
            <circle class="data-point" cx="280" cy="70" r="5" data-value="6.8k" data-label="Jun"/>
            <circle class="data-point" cx="330" cy="85" r="5" data-value="6.1k" data-label="Jul"/>
            <circle class="data-point" cx="380" cy="40" r="5" data-value="8.9k" data-label="Aug"/>
          </g>
        </svg>

        <div class="tooltip" id="tooltip">
          <div class="tooltip-value">0</div>
          <div class="tooltip-label">Value</div>
        </div>
      </div>
    </div>

    <!-- Bar Chart -->
    <div class="card card-bar">
      <h3 class="card-title">Category Distribution</h3>
      <div class="bar-chart-container" id="barChart">
        <div class="bar-wrapper">
          <div class="bar bar-1" data-height="85" style="height: 180px;">
            <span class="bar-value">85%</span>
          </div>
          <span class="bar-label">Electronics</span>
        </div>
        <div class="bar-wrapper">
          <div class="bar bar-2" data-height="65" style="height: 180px;">
            <span class="bar-value">65%</span>
          </div>
          <span class="bar-label">Clothing</span>
        </div>
        <div class="bar-wrapper">
          <div class="bar bar-3" data-height="45" style="height: 180px;">
            <span class="bar-value">45%</span>
          </div>
          <span class="bar-label">Home</span>
        </div>
        <div class="bar-wrapper">
          <div class="bar bar-4" data-height="75" style="height: 180px;">
            <span class="bar-value">75%</span>
          </div>
          <span class="bar-label">Sports</span>
        </div>
        <div class="bar-wrapper">
          <div class="bar bar-5" data-height="55" style="height: 180px;">
            <span class="bar-value">55%</span>
          </div>
          <span class="bar-label">Books</span>
        </div>
        <div class="bar-wrapper">
          <div class="bar bar-6" data-height="90" style="height: 180px;">
            <span class="bar-value">90%</span>
          </div>
          <span class="bar-label">Tech</span>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="card card-stats">
      <h3 class="card-title">Quick Stats</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value cyan" data-target="24847">0</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-item">
          <div class="stat-value magenta" data-target="1842">0</div>
          <div class="stat-label">Orders Today</div>
        </div>
        <div class="stat-item">
          <div class="stat-value lime" data-target="94">0</div>
          <div class="stat-label">Satisfaction %</div>
        </div>
        <div class="stat-item">
          <div class="stat-value purple" data-target="12">0</div>
          <div class="stat-label">Active Regions</div>
        </div>
      </div>
    </div>
  </div>

  
` }} />
    </>
  );
}
