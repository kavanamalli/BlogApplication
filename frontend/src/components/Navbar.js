import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    setScrolled(window.scrollY > 60);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Transparent only on home hero, solid everywhere else
  const solid = !isHome || scrolled;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --navy:       #0B1D3A;
          --navy-mid:   #122B56;
          --gold:       #C9912A;
          --gold-light: #F0C96B;
          --gold-pale:  #FBF3E0;
          --teal:       #0E7C7B;
          --teal-pale:  #E6F5F5;
          --ink-muted:  #7B839A;
          --border:     #E2E5EE;
          --white:      #FFFFFF;
        }

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 36px;
          justify-content: space-between;
          font-family: 'Inter', sans-serif;
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        /* ── transparent (home hero overlap) ── */
        .navbar.nav-clear {
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: none;
        }

        /* ── solid (scrolled / all other pages) ── */
        .navbar.nav-solid {
          background: var(--navy);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 32px rgba(11,29,58,0.22);
        }

        /* ── LOGO ── */
        .nav-logo {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .logo-prefix {
          color: var(--gold-light);
          font-style: italic;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.1rem;
        }

        .logo-main {
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.01em;
        }

        /* ── NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-links a {
          font-size: 0.855rem;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: rgba(255,255,255,0.62);
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.01em;
        }

        .nav-links a:hover {
          color: #fff;
          background: rgba(255,255,255,0.07);
        }

        .nav-links a.nav-active {
          color: var(--white-light);
          background: #fff;
        }

        /* ── CTA button ── */
        .nav-links a.nav-cta {
          background: var(--white !important;
          color: var(--navy) !important;
          font-weight: 700;
          padding: 9px 22px;
          border-radius: 8px;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s !important;
          box-shadow: 0 2px 12px #fff;
        }

        .nav-links a.nav-cta:hover {
          background: var(--white-light) !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px #fff !important;
        }

        /* ── GOLD UNDERLINE on active non-CTA links ── */
        .nav-links a.nav-active:not(.nav-cta) {
          position: relative;
        }

        .nav-links a.nav-active:not(.nav-cta)::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 16px; right: 16px;
          height: 2px;
          border-radius: 1px;
          background: var(--white);
          opacity: 0.7;
        }
      `}</style>

      <nav className={`navbar ${solid ? "nav-solid" : "nav-clear"}`}>

        <Link to="/" className="nav-logo">
          <span className="logo-prefix">Think</span>
          <span className="logo-main">&nbsp;Space</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "nav-active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className={location.pathname === "/search" ? "nav-active" : ""}>
              AI Search
            </Link>
          </li>
          <li>
            <Link to="/create" className={`nav-cta${location.pathname === "/create" ? " nav-active" : ""}`}>
              Create
            </Link>
          </li>
        </ul>

      </nav>
    </>
  );
}

export default Navbar;