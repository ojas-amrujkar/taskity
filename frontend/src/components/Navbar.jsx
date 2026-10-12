import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RefreshCw, Sun, Moon, Flame, Layers, PlusCircle, CheckSquare, BarChart3 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export const Navbar = ({ theme, toggleTheme }) => {
  const { streak, currentLevel, backendStatus, fetchTasks, isLoading, pendingTasks } = useTaskContext();

  return (
    <header className="minimal-header">
      <div className="container-max header-inner">
        {/* Brand Group */}
        <Link to="/" className="brand-group cursor-target" style={{ textDecoration: 'none' }}>
          <span className="accent-square" />
          <div className="brand-titles">
            <span className="brand-name">TASKITY</span>
            <span className="brand-sub">TASK ARCHITECTURE</span>
          </div>
        </Link>

        {/* Multi-Page Navigation Links */}
        <nav className="header-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link-pill ${isActive ? 'active' : ''}`}
          >
            <Layers size={14} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link-pill ${isActive ? 'active' : ''}`}
          >
            <CheckSquare size={14} />
            <span>Tasks</span>
            {pendingTasks > 0 && <span className="nav-badge-count">{pendingTasks}</span>}
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) => `nav-link-pill ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={14} />
            <span>Create</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => `nav-link-pill ${isActive ? 'active' : ''}`}
          >
            <BarChart3 size={14} />
            <span>Analytics</span>
          </NavLink>
        </nav>

        {/* Right Status & Controls */}
        <div className="header-status-group">
          {/* Streak & Motivation Pill */}
          <div className="header-motivation-pill cursor-target" title="Complete tasks on time to grow streak & level! Overdue tasks deduct XP.">
            <span className="pill-flame">
              <Flame size={14} className="flame-flicker" />
            </span>
            <span className="pill-text">
              <strong>{streak}</strong> Streak • Lvl <strong>{currentLevel}</strong>
            </span>
          </div>

          <div className={`status-badge status-${backendStatus}`}>
            <span className="status-indicator-dot" />
            <span>{backendStatus === 'connected' ? 'REST API Online' : 'Offline Mode'}</span>
          </div>

          <button
            onClick={fetchTasks}
            className="cursor-target btn-icon-sync"
            title="Sync with REST API"
          >
            <RefreshCw size={15} className={isLoading ? 'spin-icon' : ''} />
          </button>

          <button
            onClick={toggleTheme}
            className="cursor-target btn-icon-theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
};
