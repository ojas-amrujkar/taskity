import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="minimal-footer">
      <div className="container-max">
        <div className="footer-inner">
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <span style={{ width: '7px', height: '7px', backgroundColor: 'var(--accent-red)', borderRadius: '1px' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.08em', fontSize: '1.1rem' }}>
                ANTIGRAVITY
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              A minimalist, high-precision interactive frontend framework prioritizing fluid physics, quiet luxury, and zero latency.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                INDEX
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <li><a href="#hero" className="cursor-target" style={{ opacity: 0.8 }}>Overview</a></li>
                <li><a href="#about" className="cursor-target" style={{ opacity: 0.8 }}>Systems</a></li>
                <li><a href="#events" className="cursor-target" style={{ opacity: 0.8 }}>Symposiums</a></li>
                <li><a href="#blogs" className="cursor-target" style={{ opacity: 0.8 }}>Publications</a></li>
              </ul>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                NETWORK
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="cursor-target" style={{ opacity: 0.8 }}>GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="cursor-target" style={{ opacity: 0.8 }}>Twitter</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="cursor-target" style={{ opacity: 0.8 }}>LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <span>© 2026 ANTIGRAVITY ARCHITECTURE. ALL RIGHTS RESERVED.</span>
          <button
            onClick={scrollToTop}
            className="cursor-target btn-minimal"
            style={{ padding: '0.4rem 1rem', fontSize: '0.72rem' }}
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
