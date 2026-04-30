"use client";

export default function Navbar() {
  return (
    <header className="navbar glass">
      <div className="navbar-content">
        {/* Navbar is intentionally empty */}
      </div>

      <style jsx>{`
        .navbar {
          height: 70px;
          position: fixed;
          top: 0;
          left: 260px;
          right: 0;
          display: flex;
          align-items: center;
          padding: 0 2.5rem;
          border-bottom: 1px solid var(--glass-border);
          z-index: 90;
        }

        .navbar-content {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
