"use client";

import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, CreditCard, Wallet, Activity, Search, Bell, Settings, User } from 'lucide-react';

export default function CorporateExpenseDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const transactions = [
    { id: 1, name: "Apple Store", category: "Electronics", amount: -1299.00, date: "Today, 14:30", status: "Completed" },
    { id: 2, name: "Salary Deposit", category: "Income", amount: 4500.00, date: "Yesterday", status: "Completed" },
    { id: 3, name: "Uber Rides", category: "Transport", amount: -24.50, date: "Aug 10", status: "Pending" },
    { id: 4, name: "Starbucks", category: "Food & Beverage", amount: -5.40, date: "Aug 09", status: "Completed" },
    { id: 5, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Aug 08", status: "Completed" },
  ];

  return (
    <>
      <Head>
        <title>NovaSpend - Corporate Expense Dashboard</title>
      </Head>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="brand">
            <div className="logo-icon" /> NovaSpend
          </div>
          
          <nav className="side-nav">
            <div className="nav-group">Main Menu</div>
            <a href="#" className="nav-item active"><Activity size={18} /> Overview</a>
            <a href="#" className="nav-item"><Wallet size={18} /> Wallets</a>
            <a href="#" className="nav-item"><CreditCard size={18} /> Cards</a>
            <a href="#" className="nav-item"><ArrowUpRight size={18} /> Transfers</a>
          </nav>
          
          <div className="sidebar-bottom">
            <a href="#" className="nav-item"><Settings size={18} /> Settings</a>
            <a href="#" className="nav-item"><User size={18} /> Profile</a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          
          {/* Top Header */}
          <header className="topbar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search transactions, cards, or contacts..." />
            </div>
            <div className="topbar-actions">
              <button className="icon-btn relative">
                <Bell size={20} />
                <span className="badge-dot" />
              </button>
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=Alex+Carter&background=2563eb&color=fff" alt="User" />
              </div>
            </div>
          </header>

          <div className="dashboard-content">
            
            <div className="welcome-section">
              <h1>Good morning, Alex.</h1>
              <p>Here's what's happening with your corporate expenses today.</p>
            </div>

            {/* Metric Cards */}
            <div className="metrics-grid">
              <motion.div className="metric-card balance-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="card-top">
                  <h3>Total Balance</h3>
                  <div className="trend positive"><ArrowUpRight size={14} /> +2.4%</div>
                </div>
                <div className="metric-value">$24,562.00</div>
                
                {/* SVG Sparkline */}
                <div className="sparkline">
                  <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path d="M0,40 C20,30 40,50 60,20 C80,-10 100,40 120,30 C140,20 160,10 200,0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <path d="M0,40 C20,30 40,50 60,20 C80,-10 100,40 120,30 C140,20 160,10 200,0 L200,50 L0,50 Z" fill="url(#gradient)" stroke="none" />
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              <motion.div className="metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="card-top">
                  <h3>Monthly Spending</h3>
                  <div className="trend negative"><ArrowDownRight size={14} /> -1.2%</div>
                </div>
                <div className="metric-value">$3,240.50</div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '65%' }} />
                </div>
                <p className="card-hint">65% of your $5,000 limit</p>
              </motion.div>

              <motion.div className="metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="card-top">
                  <h3>Active Cards</h3>
                </div>
                <div className="cards-preview">
                  <div className="mini-card mastercard">
                    <div className="card-dots">•••• 4289</div>
                    <div className="card-brand">Mastercard</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Transactions Table */}
            <motion.div className="data-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="section-header">
                <h2>Recent Transactions</h2>
                <button className="view-all-btn">View All</button>
              </div>
              
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id}>
                        <td>
                          <div className="tx-name">{tx.name}</div>
                        </td>
                        <td><span className="category-pill">{tx.category}</span></td>
                        <td className="tx-date">{tx.date}</td>
                        <td>
                          <span className={`status-pill ${tx.status.toLowerCase()}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className={`text-right tx-amount ${tx.amount > 0 ? 'positive' : ''}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </main>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #09090b; /* Zinc 950 */
            color: #f4f4f5; /* Zinc 50 */
          }

          .dashboard-container {
            display: flex;
            height: 100vh;
            overflow: hidden;
          }

          /* Sidebar */
          .sidebar {
            width: 260px;
            background-color: #18181b; /* Zinc 900 */
            border-right: 1px solid #27272a;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 3rem;
          }
          .logo-icon {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 8px;
          }

          .side-nav {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .nav-group {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #71717a;
            margin-bottom: 0.5rem;
            padding-left: 0.75rem;
          }
          .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0.75rem;
            border-radius: 8px;
            color: #a1a1aa;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
          }
          .nav-item:hover {
            background-color: #27272a;
            color: #f4f4f5;
          }
          .nav-item.active {
            background-color: #2563eb;
            color: #fff;
          }

          .sidebar-bottom {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          /* Main Content */
          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          /* Topbar */
          .topbar {
            height: 72px;
            border-bottom: 1px solid #27272a;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            background-color: rgba(9, 9, 11, 0.8);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .search-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            background-color: #18181b;
            border: 1px solid #27272a;
            padding: 0.5rem 1rem;
            border-radius: 100px;
            width: 320px;
          }
          .search-icon {
            color: #71717a;
          }
          .search-bar input {
            background: transparent;
            border: none;
            outline: none;
            color: #f4f4f5;
            width: 100%;
            font-size: 0.9rem;
          }
          .topbar-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .icon-btn {
            background: transparent;
            border: none;
            color: #a1a1aa;
            cursor: pointer;
            position: relative;
          }
          .badge-dot {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 8px;
            height: 8px;
            background-color: #ef4444;
            border-radius: 50%;
            border: 2px solid #09090b;
          }
          .user-avatar img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #27272a;
          }

          /* Dashboard Content */
          .dashboard-content {
            padding: 2.5rem;
          }
          .welcome-section h1 {
            font-size: 1.75rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
          }
          .welcome-section p {
            color: #a1a1aa;
            font-size: 0.95rem;
            margin: 0 0 2.5rem;
          }

          /* Metrics */
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 2.5rem;
          }
          .metric-card {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
          }
          .balance-card {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            border: none;
            color: white;
          }
          .card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          .metric-card h3 {
            font-size: 0.9rem;
            font-weight: 500;
            color: #a1a1aa;
            margin: 0;
          }
          .balance-card h3 {
            color: rgba(255,255,255,0.8);
          }
          .trend {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 100px;
          }
          .trend.positive {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }
          .balance-card .trend.positive {
            background-color: rgba(255,255,255,0.2);
            color: white;
          }
          .trend.negative {
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
          }
          .metric-value {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
          }

          .sparkline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
          }

          .progress-bar-container {
            width: 100%;
            height: 6px;
            background-color: #27272a;
            border-radius: 100px;
            margin-bottom: 0.5rem;
          }
          .progress-bar {
            height: 100%;
            background-color: #3b82f6;
            border-radius: 100px;
          }
          .card-hint {
            font-size: 0.8rem;
            color: #71717a;
            margin: 0;
          }

          .cards-preview {
            display: flex;
            gap: -10px;
          }
          .mini-card {
            width: 100%;
            height: 70px;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .card-dots {
            font-family: monospace;
            font-size: 0.8rem;
            color: #94a3b8;
          }
          .card-brand {
            font-size: 0.8rem;
            font-weight: 600;
            align-self: flex-end;
          }

          /* Data Table */
          .data-section {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 16px;
            padding: 1.5rem;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .section-header h2 {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0;
          }
          .view-all-btn {
            background: transparent;
            border: none;
            color: #3b82f6;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
          }

          .table-container {
            width: 100%;
            overflow-x: auto;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          .data-table th {
            padding: 1rem 0;
            font-size: 0.8rem;
            font-weight: 500;
            color: #71717a;
            border-bottom: 1px solid #27272a;
          }
          .data-table td {
            padding: 1rem 0;
            border-bottom: 1px solid #27272a;
            vertical-align: middle;
          }
          .data-table tr:last-child td {
            border-bottom: none;
          }
          
          .tx-name {
            font-weight: 500;
            font-size: 0.95rem;
          }
          .category-pill {
            background-color: #27272a;
            color: #a1a1aa;
            padding: 4px 10px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          .tx-date {
            color: #a1a1aa;
            font-size: 0.85rem;
          }
          
          .status-pill {
            padding: 4px 10px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
          }
          .status-pill.completed {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }
          .status-pill.pending {
            background-color: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
          }
          
          .text-right {
            text-align: right;
          }
          .tx-amount {
            font-weight: 600;
            font-size: 0.95rem;
            font-family: monospace;
          }
          .tx-amount.positive {
            color: #10b981;
          }
        `}</style>
      </div>
    </>
  );
}
