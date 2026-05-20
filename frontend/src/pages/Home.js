import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(fetchBlogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs/");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const features = [
    {
      icon: "⚡",
      title: "Smart Search",
      desc: "Context-aware search that understands what you're really looking for.",
    },
    {
      icon: "🤖",
      title: "AI Discovery",
      desc: "Personalized content recommendations powered by machine learning.",
    },
    {
      icon: "🚀",
      title: "Creator First",
      desc: "Built for modern creators, developers, and forward-thinkers.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --navy:        #0B1D3A;
          --navy-mid:    #122B56;
          --navy-soft:   #1E3A6E;
          --gold:        #C9912A;
          --gold-light:  #F0C96B;
          --gold-pale:   #FBF3E0;
          --cream:       #FAF8F4;
          --white:       #FFFFFF;
          --ink:         #1A1A2E;
          --ink-soft:    #3D4463;
          --ink-muted:   #7B839A;
          --border:      #E2E5EE;
          --card-h:      320px;
          --teal:        #0E7C7B;
          --teal-pale:   #E6F5F5;
        }

        .home-wrap {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          color: var(--ink);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 86vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          background: var(--navy);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 70% 55% at 50% -5%, rgba(201,145,42,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 88% 85%, rgba(14,124,123,0.18) 0%, transparent 60%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* Diagonal gold rule accent */
        .hero-rule {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
          opacity: 0.7;
        }

        .hero-content {
          position: relative;
          max-width: 760px;
          padding: 0 24px;
          animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          background: rgba(201,145,42,0.12);
          border: 1px solid rgba(201,145,42,0.3);
          border-radius: 100px;
          padding: 6px 18px;
          margin-bottom: 28px;
        }

        .hero-eyebrow span {
          width: 6px; height: 6px;
          background: var(--gold-light);
          border-radius: 50%;
          display: inline-block;
        }

        .hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }

        .hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 40px;
          font-weight: 300;
        }

        .hero-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--gold);
          color: var(--navy);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 14px 30px;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(201,145,42,0.35);
        }

        .btn-ghost {
          color: rgba(255,255,255,0.7);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.18);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }

        /* ── STATS BAR ── */
        .stats-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 22px 24px;
        }
        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 56px;
          flex-wrap: wrap;
        }
        .stat-item {
          text-align: center;
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--navy);
        }
        .stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--ink-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* ── SECTION ── */
        .section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 88px 24px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .section-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          background: var(--gold-pale);
          border: 1px solid rgba(201,145,42,0.25);
          border-radius: 100px;
          padding: 4px 14px;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: var(--navy);
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          line-height: 1.2;
        }

        .section-sub {
          color: var(--ink-muted);
          font-size: 0.93rem;
          font-weight: 400;
        }

        /* ── BLOG GRID ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          height: var(--card-h);
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          position: relative;
          overflow: hidden;
        }

        .blog-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal));
          opacity: 0;
          transition: opacity 0.25s;
        }

        .blog-card:hover {
          box-shadow: 0 14px 44px rgba(11,29,58,0.10);
          transform: translateY(-4px);
          border-color: transparent;
        }

        .blog-card:hover::before {
          opacity: 1;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.35;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-excerpt {
          font-size: 0.875rem;
          color: var(--ink-muted);
          line-height: 1.68;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          margin-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--border);
        }

        .read-link {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--teal);
          letter-spacing: 0.03em;
        }

        .card-arrow {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--teal-pale);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--teal);
          transition: background 0.2s, color 0.2s;
        }
        .blog-card:hover .card-arrow {
          background: var(--teal);
          color: #fff;
        }

        /* ── FEATURES ── */
        .features-band {
          background: var(--navy);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0;
        }

        .feature-item {
          padding: 52px 40px;
          border-right: 1px solid rgba(255,255,255,0.07);
          transition: background 0.2s;
          position: relative;
        }
        .feature-item:last-child { border-right: none; }

        /* Gold top bar on hover */
        .feature-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          opacity: 0;
          transition: opacity 0.25s;
        }
        .feature-item:hover::before { opacity: 1; }
        .feature-item:hover { background: rgba(255,255,255,0.035); }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 18px;
          display: block;
        }

        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
        }

        .feature-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
        }

        /* ── CTA ── */
        .cta-section {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%);
          padding: 100px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Decorative gold orb */
        .cta-orb {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,145,42,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* Fine grid overlay */
        .cta-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
          position: relative;
        }

        .cta-sub {
          color: rgba(255,255,255,0.42);
          font-size: 0.95rem;
          margin-bottom: 40px;
          position: relative;
        }

        .btn-cta {
          position: relative;
          background: var(--gold);
          color: var(--navy);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 16px 38px;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          display: inline-block;
          letter-spacing: 0.01em;
        }
        .btn-cta:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(201,145,42,0.4);
        }

        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
          .feature-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .stats-inner { gap: 28px; }
        }
      `}</style>

      <div className="home-wrap">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-grid" />
          <div className="hero-rule" />
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span />
              AI-Powered Blogging Platform
            </div>
            <h1>
              Where <em>Ideas</em><br />Meet Intelligence
            </h1>
            <p className="hero-sub">
              Discover, create, and share compelling stories powered by
              next-generation AI. Built for thinkers and modern creators.
            </p>
            <div className="hero-btns">
              <Link to="/search" className="btn-primary">Explore Blogs</Link>
              <Link to="/create" className="btn-ghost">Start Writing →</Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-bar">
          <div className="stats-inner">
            {[
              { num: blogs.length || "—", label: "Published Blogs" },
              { num: "AI", label: "Powered Search" },
              { num: "∞", label: "Ideas to Explore" },
            ].map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOG CARDS ── */}
        <div className="section">
          <div className="section-header">
            <span className="section-tag">Community Stories</span>
            <h2 className="section-title">Featured Articles</h2>
            <p className="section-sub">Latest ideas shared by the community</p>
          </div>

          <div className="blog-grid">
            {blogs
              .sort((a, b) => b.id - a.id)
              .slice(0, 6)
              .map((blog, i) => (
                <Link key={blog.id} to={`/blog/${blog.id}`} className="blog-card">
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-excerpt">{blog.content}</p>
                  <div className="card-footer">
                    <span className="read-link">Read Article</span>
                    <div className="card-arrow">→</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="features-band">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="features-grid">
              {features.map((f, i) => (
                <div className="feature-item" key={i}>
                  <span className="feature-icon">{f.icon}</span>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-orb" />
          <div className="cta-grid" />
          <h2>Build Your Voice With AI</h2>
          <p className="cta-sub">
            Join creators building the future of knowledge sharing.
          </p>
          <Link to="/create" className="btn-cta">Start Writing Today</Link>
        </section>

      </div>
    </>
  );
}

export default Home;