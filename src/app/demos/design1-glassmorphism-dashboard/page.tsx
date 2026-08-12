"use client";

import Head from 'next/head';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, ChevronRight, Search, Bell, MoreVertical } from 'lucide-react';

export default function EnterpriseHrDashboard() {
  const employees = [
    { id: 1, name: "Sarah Jenkins", role: "Sr. Product Designer", department: "Design", status: "Active", email: "s.jenkins@acme.co" },
    { id: 2, name: "Michael Chang", role: "Engineering Manager", department: "Engineering", status: "On Leave", email: "m.chang@acme.co" },
    { id: 3, name: "Jessica Alba", role: "Marketing Director", department: "Marketing", status: "Active", email: "j.alba@acme.co" },
    { id: 4, name: "David Kim", role: "Frontend Developer", department: "Engineering", status: "Active", email: "d.kim@acme.co" },
  ];

  return (
    <>
      <Head>
        <title>HR Platform - Enterprise Glassmorphism</title>
      </Head>

      <a href="#main-content" className="skip-to-content">Skip to content</a>

      <div className="hr-dashboard">
        <div className="bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        <div className="app-container">
          {/* Sidebar */}
          <aside className="glass-panel sidebar">
            <div className="brand">AcmeHR</div>
            <nav className="side-menu">
              <button type="button" className="menu-item active" aria-label="Directory"><Users size={18} /> Directory</button>
              <button type="button" className="menu-item" aria-label="Recruitment"><Briefcase size={18} /> Recruitment</button>
              <button type="button" className="menu-item" aria-label="Time Off"><Calendar size={18} /> Time Off</button>
            </nav>
            <div className="storage-widget">
              <div className="widget-title">Company Storage</div>
              <div className="progress-bg"><div className="progress-fill" /></div>
              <div className="widget-desc">45GB of 100GB Used</div>
            </div>
          </aside>

          {/* Main Content */}
          <main id="main-content" className="main-content">
            {/* Header */}
            <header className="glass-panel header">
              <div className="search-box">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Search employees, roles, or departments..." aria-label="Search employees" />
              </div>
              <div className="header-actions">
                <button className="icon-btn" aria-label="Notifications"><Bell size={18} /></button>
                <div className="profile-btn">
                  <div className="avatar">HR</div>
                  <span>Admin Portal</span>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="content-grid">
              
              <div className="glass-panel main-table-section">
                <div className="section-header">
                  <h2>Employee Directory</h2>
                  <button className="primary-btn">Add Employee</button>
                </div>
                
                <table className="glass-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <div className="emp-name">{emp.name}</div>
                          <div className="emp-email">{emp.email}</div>
                        </td>
                        <td>{emp.role}</td>
                        <td><span className="dept-tag">{emp.department}</span></td>
                        <td>
                          <span className={`status-dot ${emp.status === 'Active' ? 'active' : 'leave'}`} />
                          {emp.status}
                        </td>
                        <td><button className="icon-btn" aria-label="More actions"><MoreVertical size={16} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="side-widgets">
                <div className="glass-panel widget">
                  <h3>Pending Approvals</h3>
                  <div className="approval-list">
                    <div className="approval-item">
                      <div className="app-info">
                        <strong>PTO Request</strong>
                        <span>Michael Chang (3 days)</span>
                      </div>
                      <button className="action-btn" aria-label="Review PTO Request for Michael Chang">Review</button>
                    </div>
                    <div className="approval-item">
                      <div className="app-info">
                        <strong>Expense Report</strong>
                        <span>David Kim ($120)</span>
                      </div>
                      <button className="action-btn" aria-label="Review Expense Report for David Kim">Review</button>
                    </div>
                  </div>
                </div>

                <div className="glass-panel widget">
                  <h3>Headcount Overview</h3>
                  <div className="stat-grid">
                    <div className="stat-box">
                      <div className="stat-val">142</div>
                      <div className="stat-label">Total</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-val">12</div>
                      <div className="stat-label">New</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          body {
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f1f5f9;
            color: #334155;
          }

          .hr-dashboard {
            width: 100vw;
            height: 100vh;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .skip-to-content {
            position: absolute;
            top: -100%;
            left: 1rem;
            background: #4f46e5;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            z-index: 9999;
            transition: top 0.2s;
          }
          .skip-to-content:focus {
            top: 1rem;
          }

          /* Abstract Background Shapes */
          .bg-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
          }
          .shape {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: -1;
            opacity: 0.6;
          }
          .shape-1 {
            top: -10%; left: -10%;
            width: 50vw; height: 50vw;
            background: #e0e7ff; /* Indigo 100 */
          }
          .shape-2 {
            bottom: -20%; right: -10%;
            width: 60vw; height: 60vw;
            background: #fae8ff; /* Fuchsia 100 */
          }
          .shape-3 {
            bottom: 20%; left: 20%;
            width: 40vw; height: 40vw;
            background: #dbeafe; /* Blue 100 */
          }

          /* App Container */
          .app-container {
            width: 95vw;
            height: 90vh;
            max-width: 1600px;
            z-index: 1;
            display: flex;
            gap: 1.5rem;
          }

          /* Glassmorphism Panel Base */
          .glass-panel {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 24px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
          }

          /* Sidebar */
          .sidebar {
            width: 280px;
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 3rem;
            padding-left: 1rem;
          }
          .side-menu {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 1rem;
            border-radius: 12px;
            color: #64748b;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            text-align: left;
            width: 100%;
          }
          .menu-item:hover {
            background: rgba(255, 255, 255, 0.5);
            color: #0f172a;
          }
          .menu-item.active {
            background: #ffffff;
            color: #4f46e5;
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          }
          .menu-item:focus-visible {
            outline: 2px solid #4f46e5;
            outline-offset: 2px;
          }

          .storage-widget {
            margin-top: auto;
            background: rgba(255, 255, 255, 0.3);
            padding: 1.5rem;
            border-radius: 16px;
          }
          .widget-title {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .progress-bg {
            height: 6px;
            background: rgba(255,255,255,0.5);
            border-radius: 10px;
            margin-bottom: 0.5rem;
          }
          .progress-fill {
            height: 100%;
            width: 45%;
            background: linear-gradient(90deg, #4f46e5, #8b5cf6);
            border-radius: 10px;
          }
          .widget-desc {
            font-size: 0.875rem;
            color: #64748b;
          }

          /* Main Content */
          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            overflow: hidden;
          }

          /* Header */
          .header {
            height: 80px;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .search-box {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.5);
            padding: 0.75rem 1.5rem;
            border-radius: 100px;
            width: 400px;
          }
          .search-box input {
            background: transparent;
            border: none;
            outline: none;
            width: 100%;
            font-size: 1rem;
            font-family: inherit;
          }
          .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .icon-btn {
            background: rgba(255, 255, 255, 0.5);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
          }
          .icon-btn:hover {
            background: #ffffff;
            color: #0f172a;
          }
          .icon-btn:focus-visible,
          .primary-btn:focus-visible {
            outline: 2px solid #4f46e5;
            outline-offset: 2px;
          }
          .profile-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.5);
            padding: 0.5rem 1rem 0.5rem 0.5rem;
            border-radius: 100px;
            cursor: pointer;
          }
          .avatar {
            background: #4f46e5;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 700;
          }
          .profile-btn span {
            font-size: 0.9rem;
            font-weight: 600;
          }

          /* Content Grid */
          .content-grid {
            flex: 1;
            display: flex;
            gap: 1.5rem;
            overflow: hidden;
          }
          
          .main-table-section {
            flex: 2;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
          }
          .section-header h2 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
          }
          .primary-btn {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
            transition: all 0.2s;
          }
          .primary-btn:hover {
            background: #4338ca;
            transform: translateY(-1px);
          }

          @media (prefers-reduced-motion: reduce) {
            .primary-btn:hover,
            .icon-btn:hover {
              transform: none;
            }
          }

          .glass-table {
            width: 100%;
            border-collapse: collapse;
          }
          .glass-table th {
            text-align: left;
            padding: 1rem;
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          .glass-table td {
            padding: 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            font-size: 0.9rem;
          }
          .emp-name {
            font-weight: 600;
            color: #0f172a;
          }
          .emp-email {
            font-size: 0.8rem;
            color: #64748b;
          }
          .dept-tag {
            background: rgba(255,255,255,0.5);
            padding: 4px 10px;
            border-radius: 100px;
            font-size: 0.8rem;
            font-weight: 500;
          }
          .status-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .status-dot.active { background: #10b981; }
          .status-dot.leave { background: #f59e0b; }

          .side-widgets {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .widget {
            padding: 2rem;
          }
          .widget h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 1.5rem;
          }
          .approval-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .approval-item {
            background: rgba(255,255,255,0.4);
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .app-info strong {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 2px;
          }
          .app-info span {
            font-size: 0.8rem;
            color: #64748b;
          }
          .action-btn {
            background: #ffffff;
            border: 1px solid rgba(0,0,0,0.05);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
          }

          .stat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .stat-box {
            background: rgba(255,255,255,0.4);
            padding: 1.5rem;
            border-radius: 16px;
            text-align: center;
          }
          .stat-val {
            font-size: 2rem;
            font-weight: 700;
            color: #4f46e5;
          }
          .stat-label {
            font-size: 0.85rem;
            font-weight: 500;
            color: #64748b;
          }

        `}</style>
      </div>
    </>
  );
}
