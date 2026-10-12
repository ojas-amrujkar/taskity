import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ArrowUp } from 'lucide-react';
import { LenisProvider } from './components/providers/LenisProvider';
import { ParticleBackground } from './components/ParticleBackground';
import { TaskProvider } from './context/TaskContext';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function AppContent() {
  const location = useLocation();

  // Dark Mode Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskmaster_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('taskmaster_theme', nextTheme);
      return nextTheme;
    });
  };

  const scrollToTop = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <LenisProvider>
      {/* Background Physics Particles (Fixed in background) */}
      <ParticleBackground />

      {/* Global Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111113',
            color: '#f5f5f7',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            padding: '12px 18px',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
          },
        }}
      />

      <div className="app-shell" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Global Multi-Page Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Animated Multi-Page View Container */}
        <main className="app-main-content" style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/create" element={<CreateTaskPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              {/* Fallback to Dashboard */}
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Minimalist Persistent Footer */}
        <footer className="minimal-footer">
          <div className="container-max footer-row">
            <div className="footer-left">
              <span className="accent-square" />
              <span>TASKITY // TASK ARCHITECTURE // 2026</span>
            </div>

            <button onClick={scrollToTop} className="cursor-target btn-minimal">
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
