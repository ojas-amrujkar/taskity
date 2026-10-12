import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, TrendingUp } from 'lucide-react';
import ActivityHeatmap from '../components/ActivityHeatmap';
import { useTaskContext } from '../context/TaskContext';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const AnalyticsPage = () => {
  const {
    activityHistory,
    streak,
    focusXP,
    currentLevel,
    currentLevelProgress,
    nextLevelThreshold,
    progressPercent
  } = useTaskContext();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container-max page-container"
    >
      <div className="workspace-header-row">
        <div>
          <h1 className="workspace-title">Performance Analytics</h1>
          <p className="workspace-sub">28-Week Consistency Heatmap • Focus XP Leveling • Streaks</p>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="analytics-summary-grid">
        <div className="stat-card motivation-stat-card cursor-target">
          <div className="stat-icon-wrapper flame-icon-wrapper">
            <Flame size={20} className="flame-flicker" />
          </div>
          <div className="stat-info">
            <span className="stat-number streak-number">{streak} <span className="xp-unit">days</span></span>
            <span className="stat-label">On-Time Sprint Streak</span>
          </div>
        </div>

        <div className="stat-card xp-stat-card cursor-target">
          <div className="stat-icon-wrapper xp-icon-wrapper">
            <Award size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{focusXP} <span className="xp-unit">XP</span></span>
            <span className="stat-label">Level {currentLevel} • {currentLevelProgress}/{nextLevelThreshold} to Lvl {currentLevel + 1}</span>
          </div>
        </div>

        <div className="stat-card cursor-target">
          <div className="stat-icon-wrapper">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{progressPercent}%</span>
            <span className="stat-label">All-Time Completion Rate</span>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="analytics-heatmap-section">
        <ActivityHeatmap activityHistory={activityHistory} />
      </div>
    </motion.div>
  );
};
