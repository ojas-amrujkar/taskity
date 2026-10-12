import React from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import TaskItem from './TaskItem';
import { Search, CheckCircle2, Clock, ListFilter, Inbox } from 'lucide-react';

const PRIORITY_WEIGHTS = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1
};

const TaskList = ({
  tasks,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  isLoading
}) => {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  // Filter tasks based on selected tab and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.completed
        : !task.completed;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Sort tasks: Pending HIGH priority first, then MEDIUM, then LOW
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // If completion status is different, keep uncompleted tasks first when in 'all' view
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    const weightA = PRIORITY_WEIGHTS[a.priority] || 1;
    const weightB = PRIORITY_WEIGHTS[b.priority] || 1;
    return weightB - weightA;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="refined-list-panel"
    >
      {/* Top Filter and Search Bar */}
      <div className="list-filter-bar">
        <div className="refined-tabs">
          <button
            className={`tab-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <ListFilter size={14} /> All ({totalCount})
          </button>
          <button
            className={`tab-pill ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <Clock size={14} /> Pending ({pendingCount})
          </button>
          <button
            className={`tab-pill ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <CheckCircle2 size={14} /> Completed ({completedCount})
          </button>
        </div>

        <div className="search-field-wrapper">
          <Search size={15} className="search-field-icon" />
          <input
            type="text"
            className="refined-search-input"
            placeholder="Search workspace tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task Grid Body */}
      <div className="task-list-body">
        {isLoading ? (
          <div className="loading-refined-state">
            <div className="refined-spinner"></div>
            <p>Connecting to Spring Boot REST API...</p>
          </div>
        ) : sortedTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-refined-state"
          >
            <div className="empty-state-icon">
              <Inbox size={42} />
            </div>
            <h4>Workspace Clear</h4>
            <p>
              {searchQuery
                ? `No tasks matching "${searchQuery}"`
                : filter === 'completed'
                ? 'No completed tasks yet. Mark tasks as complete to see them here!'
                : filter === 'pending'
                ? 'Great job! All tasks are completed.'
                : 'Your task workspace is empty. Create a task to start!'}
            </p>
          </motion.div>
        ) : (
          <LayoutGroup>
            <motion.div layout className="task-items-container">
              <AnimatePresence mode="popLayout">
                {sortedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
