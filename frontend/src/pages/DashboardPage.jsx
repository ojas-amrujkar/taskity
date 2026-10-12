import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Clock, 
  CheckCircle, 
  Flame, 
  Award, 
  PlusCircle, 
  ArrowRight,
  Zap
} from 'lucide-react';
import TaskList from '../components/TaskList';
import ActivityHeatmap from '../components/ActivityHeatmap';
import { useTaskContext } from '../context/TaskContext';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const DashboardPage = () => {
  const {
    tasks,
    totalTasks,
    pendingTasks,
    completedTasks,
    progressPercent,
    activeSprintsCount,
    streak,
    focusXP,
    currentLevel,
    currentLevelProgress,
    nextLevelThreshold,
    activityHistory,
    isLoading,
    handleToggleComplete,
    handleDeleteTask,
    handleUpdateTask
  } = useTaskContext();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container-max workspace-topbar"
    >
      <div className="workspace-header-row">
        <div>
          <h1 className="workspace-title">Task Workspace</h1>
          <p className="workspace-sub">Minimalist Full-Stack Interface • Spring Boot 2.7 REST</p>
        </div>

        <div className="header-actions-group">
          {activeSprintsCount > 0 && (
            <div className="active-sprint-callout">
              <Zap size={14} className="flame-flicker" />
              <span><strong>{activeSprintsCount} Active Sprint{activeSprintsCount > 1 ? 's' : ''}</strong> ticking!</span>
            </div>
          )}

          <Link to="/create" className="btn-refined btn-teal cursor-target">
            <PlusCircle size={15} />
            <span>Create Task</span>
          </Link>
        </div>
      </div>

      {/* Quick Metrics & Motivation Grid */}
      <div className="stats-grid">
        <Link to="/tasks" style={{ textDecoration: 'none' }} className="stat-card cursor-target">
          <div className="stat-icon-wrapper">
            <Layers size={17} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </Link>

        <Link to="/tasks" style={{ textDecoration: 'none' }} className="stat-card cursor-target">
          <div className="stat-icon-wrapper">
            <Clock size={17} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{pendingTasks}</span>
            <span className="stat-label">Pending</span>
          </div>
        </Link>

        <Link to="/tasks" style={{ textDecoration: 'none' }} className="stat-card cursor-target">
          <div className="stat-icon-wrapper">
            <CheckCircle size={17} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </Link>

        {/* Motivation Stat: On-Time Streak */}
        <Link to="/analytics" style={{ textDecoration: 'none' }} className="stat-card motivation-stat-card cursor-target">
          <div className="stat-icon-wrapper flame-icon-wrapper">
            <Flame size={17} />
          </div>
          <div className="stat-info">
            <span className="stat-number streak-number">{streak}</span>
            <span className="stat-label">On-Time Streak</span>
          </div>
        </Link>

        {/* Motivation Stat: Focus XP & Level */}
        <Link to="/analytics" style={{ textDecoration: 'none' }} className="stat-card xp-stat-card cursor-target">
          <div className="stat-icon-wrapper xp-icon-wrapper">
            <Award size={17} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{focusXP} <span className="xp-unit">XP</span></span>
            <span className="stat-label">Level {currentLevel} • {currentLevelProgress}/{nextLevelThreshold}</span>
          </div>
        </Link>

        {/* Progress Card */}
        <div className="stat-card progress-card cursor-target">
          <div className="progress-top">
            <span className="stat-label">Completion</span>
            <span className="progress-pct-value">{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* LeetCode Consistency Heatmap */}
      <div className="dashboard-heatmap-section">
        <ActivityHeatmap activityHistory={activityHistory} />
      </div>

      {/* Recent Tasks Preview Section */}
      <div className="dashboard-recent-section">
        <div className="section-title-row">
          <div>
            <h3 className="section-title">Sprint Tasks</h3>
            <p className="section-sub">Active tasks prioritized by urgency</p>
          </div>
          <Link to="/tasks" className="btn-refined btn-subtle cursor-target">
            <span>View All ({totalTasks})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <TaskList
          tasks={tasks.slice(0, 6)}
          filter="all"
          setFilter={() => {}}
          searchQuery=""
          setSearchQuery={() => {}}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};
