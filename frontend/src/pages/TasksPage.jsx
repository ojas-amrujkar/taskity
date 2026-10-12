import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Clock, CheckCircle, Layers } from 'lucide-react';
import TaskList from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const TasksPage = () => {
  const {
    tasks,
    isLoading,
    handleToggleComplete,
    handleDeleteTask,
    handleUpdateTask,
    totalTasks,
    pendingTasks,
    completedTasks
  } = useTaskContext();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
          <h1 className="workspace-title">Task List</h1>
          <p className="workspace-sub">Active Tasks • Live Urgency Timers • CRUD Management</p>
        </div>

        <div className="tasks-action-header">
          <Link to="/create" className="btn-refined btn-teal cursor-target">
            <PlusCircle size={15} />
            <span>New Task</span>
          </Link>
        </div>
      </div>

      {/* Mini Summary Counters */}
      <div className="tasks-mini-counters">
        <div className="mini-counter-pill">
          <Layers size={13} />
          <span>Total: <strong>{totalTasks}</strong></span>
        </div>
        <div className="mini-counter-pill pill-pending">
          <Clock size={13} />
          <span>Pending: <strong>{pendingTasks}</strong></span>
        </div>
        <div className="mini-counter-pill pill-completed">
          <CheckCircle size={13} />
          <span>Completed: <strong>{completedTasks}</strong></span>
        </div>
      </div>

      <div className="tasks-fullwidth-container">
        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};
