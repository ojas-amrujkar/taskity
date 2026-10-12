import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Calendar,
  Clock,
  Flame,
  Zap,
  AlertTriangle
} from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'LOW');
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? task.dueDate.substring(0, 16) : ''
  );

  // Live timer tick for active countdowns
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!task.dueDate || task.completed) return;
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [task.dueDate, task.completed]);

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'LOW');
    setEditDueDate(task.dueDate ? task.dueDate.substring(0, 16) : '');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;

    onUpdateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      completed: task.completed,
      priority: editPriority,
      dueDate: editDueDate ? `${editDueDate}:00` : null
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'LOW');
    setEditDueDate(task.dueDate ? task.dueDate.substring(0, 16) : '');
    setIsEditing(false);
  };

  // Date formatter helper
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate real-time urgency and on-time status
  const getUrgency = () => {
    if (!task.dueDate) return null;
    const dueTime = new Date(task.dueDate).getTime();
    if (isNaN(dueTime)) return null;

    const diffMs = dueTime - now;

    const penalty = task.priority === 'HIGH' ? 50 : task.priority === 'MEDIUM' ? 40 : 30;

    if (diffMs <= 0) {
      const overdueMins = Math.max(1, Math.abs(Math.round(diffMs / 60000)));
      return {
        type: 'overdue',
        label: `Overdue (${overdueMins}m) • -${penalty} XP penalty`,
        isOnTime: false,
        penalty
      };
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (diffMs < 10 * 60 * 1000) {
      // Under 10 minutes: critical sprint
      const secStr = String(seconds).padStart(2, '0');
      const minStr = String(minutes).padStart(2, '0');
      return {
        type: 'critical',
        label: `Sprint: ${minStr}:${secStr}`,
        isOnTime: true,
        penalty
      };
    } else if (diffMs < 30 * 60 * 1000) {
      // Under 30 minutes: warning
      return {
        type: 'warning',
        label: `${minutes}m left • Focus`,
        isOnTime: true,
        penalty
      };
    } else {
      // Normal
      const label = hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`;
      return {
        type: 'normal',
        label,
        isOnTime: true,
        penalty
      };
    }
  };

  const urgency = getUrgency();

  const handleToggle = () => {
    onToggleComplete(task.id, {
      wasCompleted: task.completed,
      hasDueDate: !!task.dueDate,
      isOnTime: urgency ? urgency.isOnTime : false,
      priority: task.priority,
      penalty: urgency ? urgency.penalty : 30
    });
  };

  const priorityKey = task.priority || 'LOW';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.15 } }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`refined-glass-card ${task.completed ? 'is-completed' : ''} ${
        urgency && !task.completed ? `urgency-border-${urgency.type}` : ''
      }`}
    >
      {isEditing ? (
        <div className="inline-edit-container">
          <input
            type="text"
            className="refined-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task Title"
            autoFocus
          />
          <textarea
            className="refined-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task Description"
            rows="2"
          />

          <div className="form-field" style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Priority Level</label>
            <div className="priority-toggle-group">
              <button
                type="button"
                className={`priority-pill priority-low ${editPriority === 'LOW' ? 'active' : ''}`}
                onClick={() => setEditPriority('LOW')}
              >
                Low
              </button>
              <button
                type="button"
                className={`priority-pill priority-medium ${editPriority === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => setEditPriority('MEDIUM')}
              >
                Medium
              </button>
              <button
                type="button"
                className={`priority-pill priority-high ${editPriority === 'HIGH' ? 'active' : ''}`}
                onClick={() => setEditPriority('HIGH')}
              >
                High
              </button>
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Deadline</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="datetime-local"
                className="refined-input"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                style={{ flex: 1 }}
              />
              {editDueDate && (
                <button
                  type="button"
                  className="btn-refined btn-subtle"
                  onClick={() => setEditDueDate('')}
                  title="Remove Target Deadline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="inline-edit-actions">
            <button
              onClick={handleSaveEdit}
              className="btn-refined btn-teal"
              disabled={!editTitle.trim()}
              style={{ padding: '7px 14px', fontSize: '0.8rem' }}
            >
              <Check size={14} /> Save Changes
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-refined btn-subtle"
              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="card-main-content">
          <button
            onClick={handleToggle}
            className="refined-toggle-btn"
            title={task.completed ? 'Mark as Pending' : 'Mark as Complete'}
          >
            {task.completed ? (
              <CheckCircle2 size={24} className="toggle-icon-done" />
            ) : (
              <Circle size={24} className="toggle-icon-pending" />
            )}
          </button>

          <div className="card-body-details">
            <div className="card-title-row">
              <h4 className={`item-title ${task.completed ? 'strikethrough' : ''}`}>
                {task.title}
              </h4>
              <div className="title-badges-group">
                {/* Priority Badge */}
                <span className={`priority-badge priority-badge-${priorityKey.toLowerCase()}`}>
                  <span className="priority-dot"></span>
                  {priorityKey}
                </span>

                {/* Target Countdown / Urgency Badge */}
                {task.dueDate && !task.completed && urgency && (
                  <span className={`countdown-badge countdown-${urgency.type}`} title={`Target: ${formatDate(task.dueDate)}`}>
                    {urgency.type === 'critical' && <Flame size={12} className="flame-flicker" />}
                    {urgency.type === 'warning' && <Zap size={12} />}
                    {urgency.type === 'normal' && <Clock size={12} />}
                    {urgency.type === 'overdue' && <AlertTriangle size={12} />}
                    <span>{urgency.label}</span>
                  </span>
                )}

                {/* Completed on-time badge */}
                {task.completed && task.dueDate && (
                  <span className="countdown-badge countdown-completed" title={`Target: ${formatDate(task.dueDate)}`}>
                    <Check size={11} /> Target Met
                  </span>
                )}

                {/* Status Badge */}
                <span
                  className={`refined-status-badge ${
                    task.completed ? 'badge-completed' : 'badge-pending'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            {task.description && (
              <p className={`item-desc ${task.completed ? 'text-muted' : ''}`}>
                {task.description}
              </p>
            )}

            <div className="item-meta-footer">
              {task.createdAt && (
                <div className="item-meta-date">
                  <Calendar size={12} /> {formatDate(task.createdAt)}
                </div>
              )}
              {task.dueDate && (
                <div className="item-meta-due">
                  <Clock size={12} /> Target: {formatDate(task.dueDate)}
                </div>
              )}
            </div>
          </div>

          <div className="card-action-group">
            <button
              onClick={handleStartEdit}
              className="action-icon-btn edit-action"
              title="Edit Task"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="action-icon-btn delete-action"
              title="Delete Task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;
