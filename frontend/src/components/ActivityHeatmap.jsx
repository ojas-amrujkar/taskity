import React, { useState, useMemo } from 'react';
import { Calendar, Flame, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';

const ActivityHeatmap = ({ activityHistory = {} }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Helper to format Date to YYYY-MM-DD in local time
  const formatLocalDate = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };

  // Generate grid for past 28 weeks (approx 6.5 months) to fit dashboard beautifully
  const { weeks, monthLabels, stats } = useMemo(() => {
    const today = new Date();
    // Normalize to midnight
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Calculate start date: 27 weeks ago, aligned to Sunday
    const totalWeeks = 28;
    const dayOfWeek = end.getDay(); // 0 is Sunday
    const startDate = new Date(end);
    startDate.setDate(end.getDate() - (totalWeeks - 1) * 7 - dayOfWeek);

    const generatedWeeks = [];
    const months = [];
    let currentMonth = -1;

    let curDate = new Date(startDate);
    for (let w = 0; w < totalWeeks; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const dateKey = formatLocalDate(curDate);
        const count = activityHistory[dateKey] || 0;
        const isFuture = curDate > end;
        const isToday = dateKey === formatLocalDate(today);

        // Check for month label position (ensure at least 3 weeks separation to prevent label collision)
        if (d === 0 && curDate.getMonth() !== currentMonth && !isFuture) {
          if (months.length === 0 || w - months[months.length - 1].weekIndex >= 3) {
            currentMonth = curDate.getMonth();
            months.push({
              weekIndex: w,
              label: curDate.toLocaleString('default', { month: 'short' })
            });
          }
        }

        weekDays.push({
          date: new Date(curDate),
          dateKey,
          count,
          isFuture,
          isToday
        });

        curDate.setDate(curDate.getDate() + 1);
      }
      generatedWeeks.push(weekDays);
    }

    // Calculate streaks & stats
    const activeDates = Object.keys(activityHistory).filter((k) => activityHistory[k] > 0);
    const totalCompletions = Object.values(activityHistory).reduce((sum, val) => sum + val, 0);
    const activeDaysCount = activeDates.length;

    // Calculate current and max streak
    let currentDailyStreak = 0;
    let maxDailyStreak = 0;
    let tempStreak = 0;

    // Check rolling backwards from today
    let checkDate = new Date(today);
    while (true) {
      const key = formatLocalDate(checkDate);
      if (activityHistory[key] && activityHistory[key] > 0) {
        currentDailyStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has 0 completions, check if yesterday was active
        if (currentDailyStreak === 0 && key === formatLocalDate(today)) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yKey = formatLocalDate(checkDate);
          if (activityHistory[yKey] && activityHistory[yKey] > 0) {
            currentDailyStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }

    // Calculate max streak by sorting all active date strings
    const sortedDates = [...activeDates].sort();
    let prevDateTime = null;
    sortedDates.forEach((dStr) => {
      const dTime = new Date(dStr).getTime();
      if (prevDateTime !== null) {
        const diffDays = Math.round((dTime - prevDateTime) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      prevDateTime = dTime;
      if (tempStreak > maxDailyStreak) {
        maxDailyStreak = tempStreak;
      }
    });

    return {
      weeks: generatedWeeks,
      monthLabels: months,
      stats: {
        totalCompletions,
        activeDaysCount,
        currentDailyStreak,
        maxDailyStreak: Math.max(maxDailyStreak, currentDailyStreak)
      }
    };
  }, [activityHistory]);

  // Color intensity mapping (LeetCode emerald green palette)
  const getCellClass = (count, isFuture, isToday) => {
    if (isFuture) return 'cell-future';
    let base = 'heatmap-cell';
    if (isToday) base += ' cell-today';

    if (count === 0) return `${base} cell-level-0`;
    if (count === 1) return `${base} cell-level-1`;
    if (count === 2) return `${base} cell-level-2`;
    if (count <= 4) return `${base} cell-level-3`;
    return `${base} cell-level-4`;
  };

  const formatTooltipDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="activity-heatmap-card cursor-target">
      {/* Header with LeetCode Style Metrics */}
      <div className="heatmap-header">
        <div className="heatmap-title-group">
          <div className="heatmap-icon-wrapper">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="heatmap-title">Daily Activity &amp; Consistency</h3>
          </div>
        </div>

        <div className="heatmap-stats-strip">
          <div className="heatmap-stat-item" title="Consecutive days completing tasks">
            <span className="stat-pill-icon flame-icon">
              <Flame size={13} className="flame-flicker" />
            </span>
            <span className="stat-pill-label">Daily Streak:</span>
            <strong>{stats.currentDailyStreak} days</strong>
          </div>

          <div className="heatmap-stat-item" title="Longest daily streak recorded">
            <span className="stat-pill-icon trophy-icon">
              <Trophy size={13} />
            </span>
            <span className="stat-pill-label">Max Streak:</span>
            <strong>{stats.maxDailyStreak} days</strong>
          </div>

          <div className="heatmap-stat-item" title="Total days with active task completions">
            <span className="stat-pill-icon cal-icon">
              <Calendar size={13} />
            </span>
            <span className="stat-pill-label">Active Days:</span>
            <strong>{stats.activeDaysCount}</strong>
          </div>

          <div className="heatmap-stat-item" title="Total all-time completed tasks">
            <span className="stat-pill-icon check-icon">
              <CheckCircle2 size={13} />
            </span>
            <span className="stat-pill-label">Total Solved:</span>
            <strong>{stats.totalCompletions}</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Area */}
      <div className="heatmap-scroll-wrapper">
        <div className="heatmap-inner-grid">
          {/* Month Labels Row */}
          <div className="heatmap-months-row">
            <div className="weekday-header-spacer"></div>
            <div className="months-track">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="month-label"
                  style={{ left: `${m.weekIndex * 15}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Days Grid Body */}
          <div className="heatmap-body-row">
            {/* Weekday indicators */}
            <div className="heatmap-weekdays-col">
              <span className="weekday-label">Mon</span>
              <span className="weekday-label">Wed</span>
              <span className="weekday-label">Fri</span>
            </div>

            {/* Weeks columns */}
            <div className="heatmap-weeks-container">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="heatmap-week-col">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={getCellClass(day.count, day.isFuture, day.isToday)}
                      onMouseEnter={() => !day.isFuture && setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={
                        day.isFuture
                          ? ''
                          : `${day.count} task${day.count === 1 ? '' : 's'} completed on ${formatTooltipDate(day.date)}`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Live Hover Detail + Legend */}
      <div className="heatmap-footer">
        <div className="heatmap-hover-detail">
          {hoveredDay ? (
            <span>
              <strong>{hoveredDay.count} task{hoveredDay.count === 1 ? '' : 's'} completed</strong> on{' '}
              {formatTooltipDate(hoveredDay.date)}
            </span>
          ) : (
            <span className="text-muted">Hover over any day to see completion details</span>
          )}
        </div>

        <div className="heatmap-legend">
          <span className="legend-label">Less</span>
          <div className="heatmap-cell cell-level-0 legend-cell"></div>
          <div className="heatmap-cell cell-level-1 legend-cell"></div>
          <div className="heatmap-cell cell-level-2 legend-cell"></div>
          <div className="heatmap-cell cell-level-3 legend-cell"></div>
          <div className="heatmap-cell cell-level-4 legend-cell"></div>
          <span className="legend-label">More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
