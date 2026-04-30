"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export default function GlassCard({ 
  children, 
  className = "", 
  hoverEffect = true,
  delay = 0 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { 
        y: -5, 
        borderColor: "rgba(99, 102, 241, 0.4)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
      } : {}}
      className={`glass-card glass ${className}`}
    >
      {children}

      <style jsx>{`
        .glass-card {
          padding: 1.5rem;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }
      `}</style>
    </motion.div>
  );
}
