import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleBackground } from '../components/ParticleBackground';
import { Marquee } from '../components/Marquee';
import { useCoverStore } from '../store/useCoverStore';
import toast from 'react-hot-toast';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  const { setDarkCover } = useCoverStore();
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', role: 'Engineer' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-fade-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'hero' && entry.isIntersecting) {
            setDarkCover(false);
          } else if (entry.target.id === 'about' && entry.isIntersecting) {
            setDarkCover(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroSectionRef.current) observer.observe(heroSectionRef.current);
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);

    return () => observer.disconnect();
  }, [setDarkCover]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please enter name and email');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(`Access granted for ${formData.name}`, {
        duration: 3500,
        icon: '✦',
      });
      setFormData({ name: '', email: '', role: 'Engineer' });
      setIsSubmitting(false);
    }, 700);
  };

  const marqueeItems = [
    'MINIMAL ARCHITECTURE',
    'LENIS SMOOTH INERTIA',
    'GSAP SCROLL SEQUENCING',
    'MAGNETIC RETICLE TARGET',
    'NEXT.JS 15 + REACT 19',
    'ZERO LATENCY ENGINE',
  ];

  return (
    <div className="w-full">
      {/* ===================================================================
          HERO SECTION
          =================================================================== */}
      <section id="hero" ref={heroSectionRef} className="hero-minimal">
        <ParticleBackground />

        <div className="container-max" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-content">
            <div className="hero-pill cursor-target">
              <span className="dot" />
              <span>Version 2.0 • Minimalist Interactive Architecture</span>
            </div>

            <h1 className="hero-title">
              Purity in form.<br />
              Precision in motion.
            </h1>

            <p className="hero-subtitle">
              An architectural exploration in minimal interaction design. Engineered with fluid momentum, delicate target magnetic snapping, and tactile precision.
            </p>

            <div className="hero-actions">
              <a href="#events" className="cursor-target btn-minimal btn-minimal-primary">
                <span>Explore Events</span>
                <ArrowRight size={14} />
              </a>
              <a href="#about" className="cursor-target btn-minimal">
                <span>System Specs</span>
              </a>
            </div>
          </div>
        </div>

        <div className="container-max" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-meta">
            <span>60.0 FPS • FLUID LENIS</span>
            <span>NEXT.JS 15 APP ROUTER</span>
            <span>MINIMAL EDITORIAL</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={marqueeItems} />

      {/* ===================================================================
          ABOUT / SYSTEMS SECTION (Dark Cover Theme)
          =================================================================== */}
      <section id="about" ref={aboutSectionRef} className="section-pad dark-section">
        <div className="container-max">
          <div className="section-label">
            <span>{'//'}</span>
            <span>01 — Systems</span>
          </div>

          <h2 className="section-heading">
            Engineered with restraint.
          </h2>

          <p className="section-sub">
            Stripped of excess ornamentation. Every interaction is measured to provide tactile, responsive feedback with zero perceptible latency.
          </p>

          <div className="minimal-grid">
            <div className="minimal-card gsap-fade-card cursor-target">
              <div>
                <div className="card-num">01 / INERTIA</div>
                <h3 className="card-title">Lenis Momentum</h3>
                <p className="card-desc">
                  Fluid scroll inertia tuned for organic deceleration, synchronizing timeline animations seamlessly across the entire viewport.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-light-muted)' }}>MOMENTUM ENGINE</span>
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="minimal-card gsap-fade-card cursor-target">
              <div>
                <div className="card-num">02 / MAGNETIC</div>
                <h3 className="card-title">Reticle Target Snap</h3>
                <p className="card-desc">
                  Custom hardware-accelerated cursor calculating interactive bounding boxes to magnetically lock onto clickable surfaces.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-light-muted)' }}>PRECISION LOCK</span>
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="minimal-card gsap-fade-card cursor-target">
              <div>
                <div className="card-num">03 / REACTIVE</div>
                <h3 className="card-title">Adaptive Contrast</h3>
                <p className="card-desc">
                  Zustand state coordination that dynamically swaps typography contrast as content transitions across light and dark spatial planes.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-light-muted)' }}>STATE STORE</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          EVENTS SECTION
          =================================================================== */}
      <section id="events" className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-max">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div className="section-label">
                <span>{'//'}</span>
                <span>02 — Symposiums</span>
              </div>
              <h2 className="section-heading">Scheduled Agendas</h2>
            </div>
            <p className="section-sub" style={{ margin: 0 }}>
              Curated masterclasses and technical symposiums on next-generation interaction architecture.
            </p>
          </div>

          <div className="minimal-grid">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="minimal-card cursor-target"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--accent-red)' }}>
                    OCTOBER 24, 2026
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    GLOBAL KEYNOTE
                  </span>
                </div>
                <h3 className="card-title">Avant-Garde Cyber Symposium</h3>
                <p className="card-desc">
                  In-depth architectural keynote on Next.js 15 App Router routing groups, React 19 concurrent features, and tactile micro-interactions.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-muted)' }}>SAN FRANCISCO • HYBRID</span>
                <button
                  onClick={() => toast.success('Agenda bookmarked')}
                  className="cursor-target"
                  style={{ background: 'none', border: 'none', color: 'inherit', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Register</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="minimal-card cursor-target"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--accent-red)' }}>
                    NOVEMBER 12, 2026
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ONLINE STREAM
                  </span>
                </div>
                <h3 className="card-title">Minimalist Graphics & Motion Lab</h3>
                <p className="card-desc">
                  Designing subtle easing, high-precision typography, and zero-latency particle physics without framework bloat.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-muted)' }}>ONLINE AUDITORIUM</span>
                <button
                  onClick={() => toast.success('Agenda bookmarked')}
                  className="cursor-target"
                  style={{ background: 'none', border: 'none', color: 'inherit', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Register</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PUBLICATIONS / BLOGS SECTION
          =================================================================== */}
      <section id="blogs" className="section-pad">
        <div className="container-max">
          <div className="section-label">
            <span>{'//'}</span>
            <span>03 — Publications</span>
          </div>

          <h2 className="section-heading">Research & Notes</h2>

          <div className="minimal-grid">
            <div className="minimal-card cursor-target">
              <div>
                <div className="card-num">ESSAY / 01</div>
                <h3 className="card-title">Dynamic Contrast at 60FPS</h3>
                <p className="card-desc">
                  How intersection observers and reactive stores coordinate contrast shifts without triggering layout reflows.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-muted)' }}>5 MIN READ</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="minimal-card cursor-target">
              <div>
                <div className="card-num">ESSAY / 02</div>
                <h3 className="card-title">Lightweight Physics in Canvas</h3>
                <p className="card-desc">
                  Optimizing particle vector calculations and spatial grids directly in requestAnimationFrame loops.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-muted)' }}>7 MIN READ</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="minimal-card cursor-target">
              <div>
                <div className="card-num">ESSAY / 03</div>
                <h3 className="card-title">Tactile Cursor Snap Mechanics</h3>
                <p className="card-desc">
                  Spring damping ratios and magnetic bounding box calculations that make custom cursors feel physical.
                </p>
              </div>
              <div className="card-footer">
                <span style={{ color: 'var(--text-muted)' }}>4 MIN READ</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          REGISTRATION / ACCESS SECTION
          =================================================================== */}
      <section id="register" className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-max" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span>{'//'}</span>
            <span>04 — Access</span>
          </div>

          <h2 className="section-heading" style={{ margin: '0 auto 1rem' }}>
            Request Early Entry
          </h2>

          <p className="section-sub" style={{ margin: '0 auto' }}>
            Join our private network for architectural releases, symposium invites, and design tokens.
          </p>

          <form onSubmit={handleRegisterSubmit} className="minimal-form">
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input cursor-target"
              />
            </div>

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@antigravity.ui"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input cursor-target"
              />
            </div>

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Discipline</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-input cursor-target"
              >
                <option value="Engineer">Frontend Architect / Engineer</option>
                <option value="Designer">Interface / UX Designer</option>
                <option value="Creative">Creative Technologist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-target btn-minimal btn-minimal-primary"
              style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', marginTop: '1rem' }}
            >
              {isSubmitting ? 'Verifying...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
