import React, { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchBlogs = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await API.post("/search/hybrid/", {
        query: query,
      });

      const keywordResults = res.data.keyword_results || [];
      const semanticResults = res.data.semantic_results || [];

      const finalResults =
        keywordResults.length > 0
          ? keywordResults
          : semanticResults;

      setResults(finalResults);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchBlogs();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --navy:       #0B1D3A;
          --navy-mid:   #122B56;
          --navy-soft:  #1E3A6E;
          --gold:       #C9912A;
          --gold-light: #F0C96B;
          --gold-pale:  #FBF3E0;
          --cream:      #FAF8F4;
          --white:      #FFFFFF;
          --ink:        #1A1A2E;
          --ink-soft:   #3D4463;
          --ink-muted:  #7B839A;
          --border:     #E2E5EE;
          --teal:       #0E7C7B;
          --teal-pale:  #E6F5F5;
        }

        .search-wrap {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: var(--cream);
          color: var(--ink);
        }

        /* ── HERO BAND ── */
        .search-hero {
          background: var(--navy);
          padding: 72px 24px 88px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .search-hero-glow {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 65% 70% at 50% -10%, rgba(201,145,42,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(14,124,123,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .search-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        .search-hero-rule {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
          opacity: 0.7;
        }

        .search-eyebrow {
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
          margin-bottom: 22px;
          position: relative;
        }

        .search-eyebrow span {
          width: 6px; height: 6px;
          background: var(--gold-light);
          border-radius: 50%;
          display: inline-block;
        }

        .search-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
          position: relative;
        }

        .search-hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-hero-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.48);
          font-weight: 300;
          margin: 0 auto 40px;
          max-width: 440px;
          position: relative;
          line-height: 1.65;
        }

        /* ── SEARCH BOX (floats over the hero bottom) ── */
        .search-bar-wrap {
          position: relative;
          max-width: 680px;
          margin: 0 auto;
          z-index: 2;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(11,29,58,0.18);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-bar:focus-within {
          border-color: var(--gold);
          box-shadow: 0 16px 48px rgba(11,29,58,0.18), 0 0 0 3px rgba(201,145,42,0.15);
        }

        .search-icon {
          padding: 0 16px 0 20px;
          font-size: 18px;
          color: var(--ink-muted);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          padding: 18px 12px 18px 0;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: var(--ink);
          background: transparent;
          border: none;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--ink-muted);
        }

        .search-btn {
          flex-shrink: 0;
          margin: 6px;
          background: var(--gold);
          color: var(--navy);
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 12px 26px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .search-btn:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201,145,42,0.3);
        }

        .search-btn:active {
          transform: scale(0.98);
        }

        /* ── BODY ── */
        .search-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 56px 24px 80px;
        }

        /* ── STATUS MESSAGES ── */
        .status-msg {
          text-align: center;
          padding: 50px 0;
        }

        .loading-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold-pale);
          border: 1px solid rgba(201,145,42,0.25);
          border-radius: 100px;
          padding: 10px 22px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.01em;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        .loading-dot {
          width: 7px; height: 7px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 1.2s ease-in-out infinite;
        }

        .no-result-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 56px 24px;
          color: var(--ink-muted);
          font-size: 0.95rem;
        }

        .no-result-icon {
          font-size: 2.2rem;
          opacity: 0.5;
        }

        /* ── RESULTS HEADER ── */
        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border);
        }

        .results-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .results-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--teal);
          background: var(--teal-pale);
          border-radius: 100px;
          padding: 4px 14px;
        }

        /* ── RESULT CARDS ── */
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .result-card {
          display: block;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px 30px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          position: relative;
          overflow: hidden;
        }

        .result-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal));
          opacity: 0;
          transition: opacity 0.25s;
        }

        .result-card:hover {
          box-shadow: 0 14px 44px rgba(11,29,58,0.10);
          transform: translateY(-3px);
          border-color: transparent;
        }

        .result-card:hover::before {
          opacity: 1;
        }

        .result-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.18rem;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.35;
          margin: 0 0 12px;
          transition: color 0.2s;
        }

        .result-card:hover .result-title {
          color: var(--teal);
        }

        .result-excerpt {
          font-size: 0.88rem;
          color: var(--ink-muted);
          line-height: 1.7;
          margin: 0;
        }

        .result-footer {
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

        .result-card:hover .card-arrow {
          background: var(--teal);
          color: #fff;
        }

        /* ── EMPTY STATE (pre-search) ── */
        .empty-state {
          text-align: center;
          padding: 64px 0 0;
        }

        .empty-tips {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .tip-pill {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--ink-soft);
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 16px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          text-decoration: none;
        }

        .tip-pill:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-pale);
        }

        .empty-label {
          font-size: 0.88rem;
          color: var(--ink-muted);
          margin-bottom: 6px;
          font-weight: 400;
        }
      `}</style>

      <div className="search-wrap">

        {/* ── HERO BAND ── */}
        <section className="search-hero">
          <div className="search-hero-glow" />
          <div className="search-hero-grid" />
          <div className="search-hero-rule" />

          <div className="search-eyebrow" style={{ position: "relative" }}>
            <span />
            AI Semantic Search
          </div>

          <h1 style={{ position: "relative" }}>
            Discover <em>Ideas</em><br />That Matter
          </h1>

          <p className="search-hero-sub">
            Discover ideas using semantic intelligence
          </p>

          {/* Search bar floats inside hero */}
          <div className="search-bar-wrap">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search for any idea, topic, or story…"
                className="search-input"
              />
              <button onClick={searchBlogs} className="search-btn">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="search-body">

          {/* Loading */}
          {loading && (
            <div className="status-msg">
              <div className="loading-pill">
                <div className="loading-dot" />
                AI is understanding your query…
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && searched && results.length === 0 && (
            <div className="no-result-box">
              <span className="no-result-icon">✦</span>
              <p style={{ margin: 0, fontWeight: 500, color: "var(--ink-soft)" }}>No results found</p>
              <p style={{ margin: 0 }}>Try a different idea or rephrase your query</p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <>
              <div className="results-header">
                <span className="results-label">Search Results</span>
                <span className="results-count">
                  {results.length} {results.length === 1 ? "article" : "articles"} found
                </span>
              </div>

              <div className="results-list">
                {results.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.id}`} className="result-card">
                    <h2 className="result-title">{blog.title}</h2>
                    <p className="result-excerpt">{blog.content.slice(0, 180)}…</p>
                    <div className="result-footer">
                      <span className="read-link">Read Article</span>
                      <div className="card-arrow">→</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Pre-search empty state */}
          {!searched && !loading && (
            <div className="empty-state">
              <p className="empty-label">Try searching for</p>
              <div className="empty-tips">
                {["AI & Machine Learning", "Natural Language Processing", "Startup Ideas", "Travelling", "Web Development"].map((t) => (
                  <span
                    key={t}
                    className="tip-pill"
                    onClick={() => { setQuery(t); }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Search;