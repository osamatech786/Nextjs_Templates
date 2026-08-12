// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design2glassmorphismdashboardTemplate() {
  useEffect(() => {
    // Render the calendar for the current month so "today" stays correct
    const grid = document.getElementById('calendar-grid');
    if (grid) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = now.toLocaleString('en-US', { month: 'long' });

      const titleEl = document.querySelector('.calendar-header h3');
      if (titleEl) titleEl.textContent = `${monthName} ${year}`;

      // Sample event dates for the current month
      const eventDays = new Set([16, 18, 24]);

      let html = '';
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
        html += `<div class="calendar-day-name">${d}</div>`;
      });
      for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day"></div>';
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const classes = ['calendar-day'];
        if (d === today) classes.push('today');
        if (eventDays.has(d)) classes.push('has-event');
        html += `<div class="${classes.join(' ')}">${d}</div>`;
      }
      grid.innerHTML = html;
    }

    // Wire sidebar nav clicks (toggles .active class)
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', function (this: HTMLElement) {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Load Chart.js from CDN, then paint both charts onto the existing canvases
    const initCharts = () => {
      // @ts-ignore - Chart.js attaches to window at runtime
      const Chart = window.Chart;
      if (!Chart) return;

      const lineCanvas = document.getElementById('lineChart') as HTMLCanvasElement | null;
      const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement | null;
      if (!lineCanvas || !doughnutCanvas) return;

      const lineCtx = lineCanvas.getContext('2d');
      if (lineCtx) {
        const lineGradient = lineCtx.createLinearGradient(0, 0, 0, 300);
        lineGradient.addColorStop(0, 'rgba(0, 212, 255, 0.5)');
        lineGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Revenue',
              data: [30000, 35000, 32000, 45000, 42000, 55000, 48000, 60000, 58000, 72000, 68000, 85000],
              borderColor: '#00d4ff',
              backgroundColor: lineGradient,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#00d4ff',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#00d4ff',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
              },
            },
            scales: {
              x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.6)' } },
              y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.6)' } },
            },
          },
        });
      }

      const doughnutCtx = doughnutCanvas.getContext('2d');
      if (doughnutCtx) {
        new Chart(doughnutCtx, {
          type: 'doughnut',
          data: {
            labels: ['Electronics', 'Fashion', 'Home & Garden'],
            datasets: [{
              data: [45, 30, 25],
              backgroundColor: ['#00d4ff', '#ff006e', '#8338ec'],
              borderWidth: 0,
              hoverOffset: 10,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                padding: 12,
              },
            },
          },
        });
      }
    };

    // Add hover effect to nav items
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(this: Element) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // @ts-ignore
    if (window.Chart) {
      initCharts();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = initCharts;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Glassmorphism Dashboard</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            min-height: 100vh;
            color: white;
        }

        .dashboard {
            display: grid;
            grid-template-columns: 280px 1fr;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2rem;
            display: flex;
            flex-direction: column;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo i {
            background: linear-gradient(135deg, #00d4ff, #ff006e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .nav-menu {
            list-style: none;
            flex: 1;
        }

        .nav-item {
            margin-bottom: 0.5rem;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.25rem;
            border-radius: 16px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .nav-link:hover,
        .nav-link.active {
            background: rgba(255, 255, 255, 0.15);
            color: white;
            transform: translateX(8px);
        }

        .nav-link i {
            width: 24px;
            text-align: center;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            margin-top: auto;
        }

        .user-avatar {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, #00d4ff, #8338ec);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .user-info h4 {
            font-size: 0.9rem;
            font-weight: 600;
        }

        .user-info span {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
        }

        /* Main Content */
        .main-content {
            padding: 2rem 3rem;
            overflow-y: auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .header-left h1 {
            font-size: 2rem;
            font-weight: 700;
        }

        .header-left p {
            color: rgba(255, 255, 255, 0.7);
            margin-top: 0.25rem;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .search-box {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 0.75rem 1.25rem;
            min-width: 300px;
        }

        .search-box input {
            background: none;
            border: none;
            color: white;
            outline: none;
            width: 100%;
        }

        .search-box input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .notification-bell {
            position: relative;
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .notification-bell:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        .notification-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
            background: #ff006e;
            border-radius: 50%;
            font-size: 0.7rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Stats Cards */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1.75rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
        }

        .stat-icon.revenue { background: linear-gradient(135deg, #00d4ff, #00a8cc); }
        .stat-icon.users { background: linear-gradient(135deg, #ff006e, #ff5c8d); }
        .stat-icon.orders { background: linear-gradient(135deg, #8338ec, #a855f7); }
        .stat-icon.growth { background: linear-gradient(135deg, #10b981, #34d399); }

        .stat-trend {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
            border-radius: 8px;
        }

        .stat-trend.up {
            background: rgba(16, 185, 129, 0.2);
            color: #34d399;
        }

        .stat-trend.down {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .stat-label {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.6);
        }

        /* Charts Section */
        .charts-section {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .chart-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1.75rem;
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .chart-header h3 {
            font-size: 1.125rem;
            font-weight: 600;
        }

        .chart-header select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 0.5rem 1rem;
            color: white;
            cursor: pointer;
        }

        .chart-container {
            position: relative;
            height: 300px;
        }

        /* Doughnut Chart */
        .doughnut-card {
            display: flex;
            flex-direction: column;
        }

        .doughnut-legend {
            margin-top: 1.5rem;
        }

        .legend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legend-item:last-child {
            border-bottom: none;
        }

        .legend-left {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 4px;
        }

        .legend-value {
            font-weight: 600;
        }

        /* Bottom Section */
        .bottom-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .activity-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1.75rem;
        }

        .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .activity-header h3 {
            font-size: 1.125rem;
            font-weight: 600;
        }

        .view-all {
            font-size: 0.875rem;
            color: #00d4ff;
            cursor: pointer;
        }

        .activity-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .activity-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .activity-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .activity-avatar {
            width: 44px;
            height: 44px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .activity-content {
            flex: 1;
        }

        .activity-content h4 {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }

        .activity-content p {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
        }

        .activity-time {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
        }

        /* Calendar */
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .calendar-header h3 {
            font-size: 1.125rem;
            font-weight: 600;
        }

        .calendar-nav {
            display: flex;
            gap: 0.5rem;
        }

        .calendar-nav button {
            width: 44px;
            height: 44px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .calendar-nav button:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .calendar-nav button:focus-visible {
            outline: 2px solid #00d4ff;
            outline-offset: 2px;
        }

        /* Skip-to-content link */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #00d4ff;
            color: #0a0a0f;
            padding: 0.75rem 1.25rem;
            border-radius: 0 0 8px 0;
            font-weight: 600;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.2s ease;
        }

        .skip-link:focus {
            top: 0;
        }

        /* Focus states for interactive elements */
        .nav-link:focus-visible,
        .notification-bell:focus-visible,
        .view-all:focus-visible,
        .search-box:focus-within {
            outline: 2px solid #00d4ff;
            outline-offset: 2px;
        }

        /* Reduced motion: neutralize transforms and animations */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }

            .nav-link:hover,
            .nav-link.active,
            .stat-card:hover,
            .notification-bell:hover {
                transform: none !important;
            }
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0.5rem;
        }

        .calendar-day-name {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            padding: 0.5rem;
        }

        .calendar-day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .calendar-day:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .calendar-day.today {
            background: linear-gradient(135deg, #00d4ff, #8338ec);
            font-weight: 600;
        }

        .calendar-day.has-event::after {
            content: '';
            position: absolute;
            bottom: 4px;
            width: 6px;
            height: 6px;
            background: #ff006e;
            border-radius: 50%;
        }

        .calendar-events {
            margin-top: 1.5rem;
        }

        .calendar-event {
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .event-time {
            font-size: 0.8rem;
            font-weight: 600;
            color: #00d4ff;
        }

        .event-title {
            font-size: 0.875rem;
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .charts-section,
            .bottom-section {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }

            .sidebar {
                display: none;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div class="dashboard">
        <aside class="sidebar" aria-label="Primary navigation">
            <div class="logo">
                <i class="fas fa-cube" aria-hidden="true"></i>
                <span>Nexus</span>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a class="nav-link active" role="button" tabindex="0" aria-current="page" aria-label="Dashboard">
                        <i class="fas fa-home" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Analytics">
                        <i class="fas fa-chart-line" aria-hidden="true"></i>
                        <span>Analytics</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Orders">
                        <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                        <span>Orders</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Customers">
                        <i class="fas fa-users" aria-hidden="true"></i>
                        <span>Customers</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Products">
                        <i class="fas fa-box" aria-hidden="true"></i>
                        <span>Products</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Calendar">
                        <i class="fas fa-calendar" aria-hidden="true"></i>
                        <span>Calendar</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" role="button" tabindex="0" aria-label="Settings">
                        <i class="fas fa-cog" aria-hidden="true"></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
            <div class="user-profile">
                <div class="user-avatar" aria-hidden="true">JD</div>
                <div class="user-info">
                    <h4>John Doe</h4>
                    <span>Admin</span>
                </div>
            </div>
        </aside>

        <main class="main-content" id="main-content" tabindex="-1">
            <header class="header">
                <div class="header-left">
                    <h1>Welcome back, John</h1>
                    <p>Here's what's happening with your business today</p>
                </div>
                <div class="header-right">
                    <div class="search-box">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input type="text" placeholder="Search anything..." aria-label="Search">
                    </div>
                    <button type="button" class="notification-bell" aria-label="Notifications, 3 unread">
                        <i class="fas fa-bell" aria-hidden="true"></i>
                        <span class="notification-badge" aria-hidden="true">3</span>
                    </button>
                </div>
            </header>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon revenue">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 12.5%</span>
                    </div>
                    <div class="stat-value">\$124,563</div>
                    <div class="stat-label">Total Revenue</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon users">
                            <i class="fas fa-users"></i>
                        </div>
                        <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 8.2%</span>
                    </div>
                    <div class="stat-value">45,231</div>
                    <div class="stat-label">Active Users</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon orders">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <span class="stat-trend down"><i class="fas fa-arrow-down"></i> 3.1%</span>
                    </div>
                    <div class="stat-value">3,847</div>
                    <div class="stat-label">Total Orders</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon growth">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 15.3%</span>
                    </div>
                    <div class="stat-value">24.8%</div>
                    <div class="stat-label">Growth Rate</div>
                </div>
            </div>

            <div class="charts-section">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Revenue Overview</h3>
                        <select>
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div class="chart-container">
                        <canvas id="lineChart" role="img" aria-label="Monthly revenue trend line chart for January through December"></canvas>
                    </div>
                </div>
                <div class="chart-card doughnut-card">
                    <div class="chart-header">
                        <h3>Sales Distribution</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="doughnutChart" role="img" aria-label="Sales distribution: Electronics 45 percent, Fashion 30 percent, Home and Garden 25 percent"></canvas>
                    </div>
                    <div class="doughnut-legend">
                        <div class="legend-item">
                            <div class="legend-left">
                                <div class="legend-color" style="background: #00d4ff;"></div>
                                <span>Electronics</span>
                            </div>
                            <span class="legend-value">45%</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-left">
                                <div class="legend-color" style="background: #ff006e;"></div>
                                <span>Fashion</span>
                            </div>
                            <span class="legend-value">30%</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-left">
                                <div class="legend-color" style="background: #8338ec;"></div>
                                <span>Home & Garden</span>
                            </div>
                            <span class="legend-value">25%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-section">
                <div class="activity-card">
                    <div class="activity-header">
                        <h3>Recent Activity</h3>
                        <span class="view-all" role="button" tabindex="0" aria-label="View all recent activity">View All</span>
                    </div>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-avatar" style="background: linear-gradient(135deg, #00d4ff, #00a8cc);">SM</div>
                            <div class="activity-content">
                                <h4>Sarah Miller placed an order</h4>
                                <p>Order #45821 - \$1,299.00</p>
                            </div>
                            <span class="activity-time">2m ago</span>
                        </div>
                        <div class="activity-item">
                            <div class="activity-avatar" style="background: linear-gradient(135deg, #ff006e, #ff5c8d);">JW</div>
                            <div class="activity-content">
                                <h4>James Wilson registered</h4>
                                <p>New customer account created</p>
                            </div>
                            <span class="activity-time">15m ago</span>
                        </div>
                        <div class="activity-item">
                            <div class="activity-avatar" style="background: linear-gradient(135deg, #8338ec, #a855f7);">EJ</div>
                            <div class="activity-content">
                                <h4>Emma Johnson left a review</h4>
                                <p>5 stars on Product #892</p>
                            </div>
                            <span class="activity-time">1h ago</span>
                        </div>
                        <div class="activity-item">
                            <div class="activity-avatar" style="background: linear-gradient(135deg, #10b981, #34d399);">MK</div>
                            <div class="activity-content">
                                <h4>Michael Kim sent a message</h4>
                                <p>Question about shipping</p>
                            </div>
                            <span class="activity-time">3h ago</span>
                        </div>
                    </div>
                </div>

                <div class="activity-card">
                    <div class="calendar-header">
                        <h3>Calendar</h3>
                        <div class="calendar-nav">
                            <button type="button" aria-label="Previous month"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
                            <button type="button" aria-label="Next month"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div id="calendar-grid" class="calendar-grid">
                        <div class="calendar-day-name">Sun</div>
                        <div class="calendar-day-name">Mon</div>
                        <div class="calendar-day-name">Tue</div>
                        <div class="calendar-day-name">Wed</div>
                        <div class="calendar-day-name">Thu</div>
                        <div class="calendar-day-name">Fri</div>
                        <div class="calendar-day-name">Sat</div>
                        <div class="calendar-day"></div>
                        <div class="calendar-day">1</div>
                        <div class="calendar-day">2</div>
                        <div class="calendar-day">3</div>
                        <div class="calendar-day">4</div>
                        <div class="calendar-day">5</div>
                        <div class="calendar-day">6</div>
                        <div class="calendar-day">7</div>
                        <div class="calendar-day">8</div>
                        <div class="calendar-day">9</div>
                        <div class="calendar-day">10</div>
                        <div class="calendar-day">11</div>
                        <div class="calendar-day">12</div>
                        <div class="calendar-day today">13</div>
                        <div class="calendar-day">14</div>
                        <div class="calendar-day">15</div>
                        <div class="calendar-day has-event">16</div>
                        <div class="calendar-day">17</div>
                        <div class="calendar-day has-event">18</div>
                        <div class="calendar-day">19</div>
                        <div class="calendar-day">20</div>
                        <div class="calendar-day">21</div>
                        <div class="calendar-day">22</div>
                        <div class="calendar-day">23</div>
                        <div class="calendar-day has-event">24</div>
                        <div class="calendar-day">25</div>
                        <div class="calendar-day">26</div>
                        <div class="calendar-day">27</div>
                        <div class="calendar-day">28</div>
                        <div class="calendar-day">29</div>
                        <div class="calendar-day">30</div>
                        <div class="calendar-day">31</div>
                    </div>
                    <div class="calendar-events">
                        <div class="calendar-event">
                            <span class="event-time">10:00 AM</span>
                            <span class="event-title">Team Meeting</span>
                        </div>
                        <div class="calendar-event">
                            <span class="event-time">2:30 PM</span>
                            <span class="event-title">Product Launch</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
` }} />
    </>
  );
}
