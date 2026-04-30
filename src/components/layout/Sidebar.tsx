"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FileCode, Home } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "Template", path: "/template", icon: <FileCode size={20} /> },
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">
        <div className="logo-icon">A</div>
        <h2 className="gradient-text">Aspire</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${pathname === item.path ? "active" : ""}`}
          >
            {pathname === item.path && (
              <motion.div
                layoutId="active-pill"
                className="active-pill"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="item-icon">{item.icon}</span>
            <span className="item-name">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.25rem;
          border-right: 1px solid var(--glass-border);
          z-index: 100;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
          padding-left: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .sidebar-logo h2 {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition-smooth);
          z-index: 1;
        }

        .nav-item:hover {
          color: var(--text-primary);
        }

        .nav-item.active {
          color: white;
        }

        .active-pill {
          position: absolute;
          inset: 0;
          background: var(--accent-primary);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          z-index: -1;
        }

        .item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: var(--transition-smooth);
        }

        .active .item-icon {
          opacity: 1;
        }
      `}</style>
    </aside>
  );
}
