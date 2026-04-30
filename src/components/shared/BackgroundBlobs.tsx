"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="blobs-container">
      <motion.div
        className="blob blob-1"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="blob blob-2"
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="blob blob-3"
        animate={{
          x: [0, 60, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <style jsx>{`
        .blobs-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: -1;
          background: var(--bg-primary);
          pointer-events: none;
        }

        .blob {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
        }

        .blob-1 {
          background: var(--accent-primary);
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          background: var(--accent-secondary);
          bottom: -150px;
          left: -100px;
        }

        .blob-3 {
          background: var(--accent-tertiary);
          top: 40%;
          left: 20%;
          width: 400px;
          height: 400px;
        }
      `}</style>
    </div>
  );
}
