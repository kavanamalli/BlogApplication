import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/blogs/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      setSuccess(true);
      setFormData({ title: "", content: "" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

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

        .cb-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: var(--cream);
          padding: 0 0 80px;
        }

        /* ── HERO BAND (matches Search page) ── */
        .cb-hero {
          background: var(--navy);
          padding: 96px 24px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 0;
        }

        .cb-hero-glow {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(ellipse 65% 70% at 50% -10%, rgba(201,145,42,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(14,124,123,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .cb-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        .cb-hero-rule {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
          opacity: 0.7;
        }

        .cb-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold-light);
          background: rgba(201,145,42,0.12);
          border: 1px solid rgba(201,145,42,0.3);
          border-radius: 100px; padding: 6px 18px;
          margin-bottom: 20px; position: relative;
        }

        .cb-eyebrow span {
          width: 6px; height: 6px;
          background: var(--gold-light); border-radius: 50%; display: inline-block;
        }

        .cb-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 800; color: #fff;
          line-height: 1.12; letter-spacing: -0.02em;
          margin: 0 0 12px; position: relative;
        }

        .cb-hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .cb-hero p {
          font-size: 1rem; color: rgba(255,255,255,0.48);
          font-weight: 300; margin: 0; position: relative; line-height: 1.65;
        }

        /* ── TOAST ── */
        .cb-toast {
          position: fixed;
          top: 76px; left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          background: var(--white);
          border: 1px solid rgba(14,124,123,0.25);
          border-left: 4px solid var(--teal);
          border-radius: 12px;
          padding: 13px 22px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 30px rgba(11,29,58,0.14);
          font-size: 0.9rem; font-weight: 600;
          color: var(--teal);
          white-space: nowrap;
          animation: slideDown 0.35s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .cb-toast-dot {
          width: 8px; height: 8px;
          background: var(--teal); border-radius: 50%;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        /* ── CARD WRAPPER ── */
        .cb-body {
          max-width: 56rem;
          margin: 0 auto;
          padding: 52px 24px 0;
        }

        .cb-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 40px;
          box-shadow: 0 8px 40px rgba(11,29,58,0.07);
          position: relative;
          overflow: hidden;
        }

        /* Gold top accent bar on card */
        .cb-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal));
        }

        /* ── LABEL ── */
        .cb-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }

        /* ── INPUTS ── */
        .cb-input,
        .cb-textarea {
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--ink);
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 14px 18px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .cb-input::placeholder,
        .cb-textarea::placeholder { color: var(--ink-muted); }

        .cb-input:focus,
        .cb-textarea:focus {
          border-color: var(--gold);
          background: var(--white);
          box-shadow: 0 0 0 3px rgba(201,145,42,0.13);
        }

        .cb-textarea { resize: none; line-height: 1.68; }

        .cb-field { margin-bottom: 28px; }

        /* ── DIVIDER ── */
        .cb-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0;
        }

        /* ── FOOTER ── */
        .cb-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
        }

        .cb-btn-clear {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          color: var(--ink-muted);
          background: none; border: none; cursor: pointer;
          padding: 9px 14px; border-radius: 8px;
          transition: color 0.2s, background 0.2s;
        }

        .cb-btn-clear:hover {
          color: var(--ink-soft);
          background: var(--cream);
        }

        .cb-btn-publish {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          color: var(--navy);
          background: var(--gold);
          border: none; cursor: pointer;
          padding: 13px 32px; border-radius: 10px;
          box-shadow: 0 4px 16px rgba(201,145,42,0.3);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.2s;
          display: flex; align-items: center; gap: 8px;
          letter-spacing: 0.01em;
        }

        .cb-btn-publish:hover:not(:disabled) {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,145,42,0.4);
        }

        .cb-btn-publish:disabled {
          opacity: 0.65; cursor: not-allowed; transform: none;
        }

        .cb-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(11,29,58,0.25);
          border-top-color: var(--navy);
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="cb-page">

        {/* TOAST */}
        {success && (
          <div className="cb-toast">
            <div className="cb-toast-dot" />
            Blog Created Successfully!
          </div>
        )}

        {/* HERO BAND */}
        <div className="cb-hero">
          <div className="cb-hero-glow" />
          <div className="cb-hero-grid" />
          <div className="cb-hero-rule" />

          <div className="cb-eyebrow">
            <span />
            New Story
          </div>

          <h1>Write a <em>New</em> Story</h1>
          <p>Share your knowledge with AI-powered blogging.</p>
        </div>

        {/* CARD */}
        <div className="cb-body">
          <div className="cb-card">
            <form onSubmit={handleSubmit}>

              <div className="cb-field">
                <label className="cb-label">Blog Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter a compelling title…"
                  className="cb-input"
                />
              </div>

              <div className="cb-field">
                <label className="cb-label">Blog Content</label>
                <textarea
                  name="content"
                  rows="10"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your story here…"
                  className="cb-textarea"
                />
              </div>

              <hr className="cb-divider" />

              <div className="cb-footer">
                <button
                  type="button"
                  className="cb-btn-clear"
                  onClick={() => setFormData({ title: "", content: "" })}
                >
                  Clear Draft
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="cb-btn-publish"
                >
                  {loading ? (
                    <><div className="cb-spinner" /> Publishing…</>
                  ) : (
                    "Publish Blog →"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </>
  );
}