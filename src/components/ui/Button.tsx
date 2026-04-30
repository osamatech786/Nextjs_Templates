"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  icon?: ReactNode;
}

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  icon 
}: ButtonProps) {
  const baseStyles = "btn-base";
  
  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} btn-${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}

      <style jsx>{`
        .btn-base {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          background: var(--accent-secondary);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        .btn-secondary {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .btn-outline {
          background: transparent;
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .btn-outline:hover {
          background: var(--glass-bg);
          border-color: var(--accent-primary);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--glass-bg);
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </motion.button>
  );
}
