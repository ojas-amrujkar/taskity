import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoverStore } from '../../store/useCoverStore';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { navTextColor } = useCoverStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Systems', href: '#about' },
    { label: 'Symposiums', href: '#events' },
    { label: 'Publications', href: '#blogs' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(href);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = navTextColor === 'white';

  return (
    <>
      <header className={`minimal-nav ${isDark ? 'is-dark' : 'is-light'}`}>
        <div className="nav-inner">
          {/* Minimalist Brand Mark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="cursor-target brand-mark"
          >
            <span className="accent-square" />
            <span>ANTIGRAVITY</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="cursor-target"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={(e) => handleNavClick(e, '#register')}
              className="cursor-target btn-minimal"
            >
              Get Access
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-target md-hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'none',
              display: 'none',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="cursor-target flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={22} />
                </a>
              ))}
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Next Event: Avant-Garde Cyber Symposium '26
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
