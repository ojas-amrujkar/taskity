import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, FileText, Type, Flag, Clock, Zap, Flame, Calendar } from 'lucide-react';

const TaskForm = ({ onAddTask, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [targetPreset, setTargetPreset] = useState('none'); // 'none' | '15m' | '30m' | '60m' | 'eod' | 'custom'
  const [customDateTime, setCustomDateTime] = useState('');
  const [errors, setErrors] = useState({});

  // Helper: Format date to local ISO string (YYYY-MM-DDTHH:mm:ss)
  const toLocalISOString = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // Compute calculated target due date
  const computeDueDate = (preset, customVal) => {
    const now = new Date();
    if (preset === '15m') {
      return new Date(now.getTime() + 15 * 60 * 1000);
    } else if (preset === '30m') {
      return new Date(now.getTime() + 30 * 60 * 1000);
    } else if (preset === '60m') {
      return new Date(now.getTime() + 60 * 60 * 1000);
    } else if (preset === 'eod') {
      const eod = new Date(now);
      // If before 6 PM, set to 6:00 PM today, otherwise 11:59 PM
      if (now.getHours() < 18) {
        eod.setHours(18, 0, 0, 0);
      } else {
        eod.setHours(23, 59, 0, 0);
      }
      return eod;
    } else if (preset === 'custom' && customVal) {
      const parsed = new Date(customVal);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  };

  const calculatedTargetDate = computeDueDate(targetPreset, customDateTime);

  const formatTargetPreview = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let dueDatePayload = null;
    if (calculatedTargetDate) {
      dueDatePayload = toLocalISOString(calculatedTargetDate);
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority: priority,
      dueDate: dueDatePayload
    });

    setTitle('');
    setDescription('');
    setPriority('LOW');
    setTargetPreset('none');
    setCustomDateTime('');
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="refined-form-panel"
    >
      <div className="panel-header">
        <div className="panel-icon">
          <PlusCircle size={20} />
        </div>
        <div>
          <h3>Create Task</h3>
          <p className="panel-sub">Add to your task workspace</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-field">
          <label htmlFor="task-title">
            <Type size={14} /> Task Title <span className="req-star">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className="refined-input"
            placeholder="e.g., Benchmark Spring Boot REST endpoints"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
            }}
            disabled={isSubmitting}
          />
          {errors.title && <span className="field-error-text">{errors.title}</span>}
        </div>

        {/* Description Input */}
        <div className="form-field">
          <label htmlFor="task-description">
            <FileText size={14} /> Description
          </label>
          <textarea
            id="task-description"
            className="refined-textarea"
            placeholder="Key deliverables, milestones, or notes..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Target Completion Sprint Time (Motivation Engine) */}
        <div className="form-field">
          <div className="field-label-row">
            <label>
              <Clock size={14} /> Target Completion Time
            </label>
            <span className="motivation-label-hint">
              <Zap size={11} /> +50 Focus XP on time
            </span>
          </div>
          
          <div className="sprint-presets-grid">
            <button
              type="button"
              className={`sprint-pill ${targetPreset === 'none' ? 'active' : ''}`}
              onClick={() => setTargetPreset('none')}
            >
              No Limit
            </button>
            <button
              type="button"
              className={`sprint-pill ${targetPreset === '15m' ? 'active sprint-speed' : ''}`}
              onClick={() => setTargetPreset('15m')}
            >
              <Zap size={12} /> 15m Sprint
            </button>
            <button
              type="button"
              className={`sprint-pill ${targetPreset === '30m' ? 'active sprint-focus' : ''}`}
              onClick={() => setTargetPreset('30m')}
            >
              <Flame size={12} /> 30m Deep
            </button>
            <button
              type="button"
              className={`sprint-pill ${targetPreset === '60m' ? 'active sprint-power' : ''}`}
              onClick={() => setTargetPreset('60m')}
            >
              1h Power
            </button>
            <button
              type="button"
              className={`sprint-pill ${targetPreset === 'eod' ? 'active' : ''}`}
              onClick={() => setTargetPreset('eod')}
            >
              Today EOD
            </button>
            <button
              type="button"
              className={`sprint-pill ${targetPreset === 'custom' ? 'active' : ''}`}
              onClick={() => setTargetPreset('custom')}
            >
              <Calendar size={12} /> Custom
            </button>
          </div>

          <AnimatePresence>
            {targetPreset === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="custom-datetime-container"
              >
                <input
                  type="datetime-local"
                  className="refined-input custom-datetime-input"
                  value={customDateTime}
                  onChange={(e) => setCustomDateTime(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {calculatedTargetDate && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="target-preview-badge"
            >
              <Flame size={13} className="flame-flicker" />
              <span>
                Target: <strong>{formatTargetPreview(calculatedTargetDate)}</strong> • Complete on time for streak &amp; XP bonus!
              </span>
            </motion.div>
          )}
        </div>

        {/* Priority Selector */}
        <div className="form-field">
          <label>
            <Flag size={14} /> Priority Level
          </label>
          <div className="priority-toggle-group">
            <button
              type="button"
              className={`priority-pill priority-low ${priority === 'LOW' ? 'active' : ''}`}
              onClick={() => setPriority('LOW')}
            >
              Low
            </button>
            <button
              type="button"
              className={`priority-pill priority-medium ${priority === 'MEDIUM' ? 'active' : ''}`}
              onClick={() => setPriority('MEDIUM')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`priority-pill priority-high ${priority === 'HIGH' ? 'active' : ''}`}
              onClick={() => setPriority('HIGH')}
            >
              High
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-refined btn-teal btn-block"
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? (
            <span>Saving Task...</span>
          ) : (
            <>
              <PlusCircle size={16} /> Create Task
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default TaskForm;
