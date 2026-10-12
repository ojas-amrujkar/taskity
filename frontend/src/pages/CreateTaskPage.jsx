import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import { useTaskContext } from '../context/TaskContext';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { handleAddTask, isSubmitting } = useTaskContext();

  const handleCreated = async (taskData) => {
    try {
      await handleAddTask(taskData);
      // Programmatic navigation directly to the Tasks page
      navigate('/tasks');
    } catch (err) {
      // toast is already displayed inside context
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container-max page-container"
    >
      <div className="page-header-row">
        <button
          onClick={() => navigate(-1)}
          className="btn-back cursor-target"
          title="Go Back"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <div>
          <h1 className="workspace-title">Create New Task</h1>
          <p className="workspace-sub">Configure Sprint Timers &amp; Priority Architecture</p>
        </div>
      </div>

      <div className="create-task-wrapper">
        <TaskForm onAddTask={handleCreated} isSubmitting={isSubmitting} />
      </div>
    </motion.div>
  );
};
