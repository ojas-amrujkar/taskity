import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { Flame, AlertTriangle } from 'lucide-react';
import taskService from '../services/taskService';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Gamification & Motivation State (Persisted in localStorage)
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('taskmaster_streak') || '0', 10);
  });
  const [focusXP, setFocusXP] = useState(() => {
    return parseInt(localStorage.getItem('taskmaster_focus_xp') || '0', 10);
  });

  // Helper: Format Date as YYYY-MM-DD
  const formatLocalDateKey = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };

  // LeetCode-style Daily Activity History (Persisted in localStorage)
  const [activityHistory, setActivityHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('taskmaster_activity_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse activity history:', e);
    }
    const today = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    
    const seed = {};
    for (let i = 18; i >= 1; i--) {
      const past = new Date(today);
      past.setDate(today.getDate() - i);
      if (i % 4 !== 0) {
        seed[toKey(past)] = ((i * 3) % 4) + 1;
      }
    }
    seed[toKey(today)] = 2;
    return seed;
  });

  // Calculate Level based on XP (every 200 XP = 1 Level)
  const currentLevel = Math.floor(focusXP / 200) + 1;
  const currentLevelProgress = focusXP % 200;
  const nextLevelThreshold = 200;

  // Trigger confetti burst
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#38bdf8', '#818cf8']
    });
  }, []);

  // Fetch tasks from Spring Boot Backend REST API
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
      setBackendStatus('connected');
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setBackendStatus('offline');
      toast.error('Could not connect to Spring Boot server at http://localhost:8080', {
        id: 'backend-offline',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handler: Add Task (Returns created task so caller can programmatically navigate)
  const handleAddTask = async (newTaskData) => {
    setIsSubmitting(true);
    try {
      const createdTask = await taskService.createTask(newTaskData);
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
      
      const hasDeadline = !!newTaskData.dueDate;
      toast.success(
        hasDeadline 
          ? `Sprint Task Created! Complete on time to claim +50 Focus XP!` 
          : `Task "${createdTask.title}" created with ${createdTask.priority || 'LOW'} priority!`, 
        {
          icon: hasDeadline ? '⚡' : '✦',
        }
      );
      return createdTask;
    } catch (err) {
      toast.error('Failed to create task. Check Spring Boot backend.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler: Toggle Complete with motivation engine & XP deduction
  const handleToggleComplete = async (id, meta = {}) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(id);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t))
      );

      const todayKey = formatLocalDateKey(new Date());

      // If task was just marked as COMPLETED
      if (updatedTask.completed) {
        setActivityHistory((prev) => {
          const next = { ...prev, [todayKey]: (prev[todayKey] || 0) + 1 };
          localStorage.setItem('taskmaster_activity_history', JSON.stringify(next));
          return next;
        });

        if (meta.hasDueDate) {
          if (meta.isOnTime) {
            const priorityBonus = meta.priority === 'HIGH' ? 25 : meta.priority === 'MEDIUM' ? 15 : 5;
            const earnedXP = 50 + priorityBonus;
            
            const nextStreak = streak + 1;
            const nextXP = focusXP + earnedXP;

            setStreak(nextStreak);
            setFocusXP(nextXP);
            localStorage.setItem('taskmaster_streak', nextStreak.toString());
            localStorage.setItem('taskmaster_focus_xp', nextXP.toString());

            triggerConfetti();

            toast(
              (t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={16} /> SPRINT VICTORY! +{earnedXP} XP
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>
                    Finished on time! 🔥 Streak: {nextStreak} in a row
                  </div>
                </div>
              ),
              { duration: 4000 }
            );
          } else {
            const penalty = meta.penalty || 30;
            const nextXP = Math.max(0, focusXP - penalty);
            const nextStreak = 0;

            setStreak(nextStreak);
            setFocusXP(nextXP);
            localStorage.setItem('taskmaster_streak', '0');
            localStorage.setItem('taskmaster_focus_xp', nextXP.toString());

            toast(
              (t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontWeight: '700', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> OVERDUE PENALTY! -{penalty} XP
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>
                    Task was not finished within the given time! Streak broken.
                  </div>
                </div>
              ),
              { duration: 4500 }
            );
          }
        } else {
          const earnedXP = 20;
          const nextXP = focusXP + earnedXP;
          setFocusXP(nextXP);
          localStorage.setItem('taskmaster_focus_xp', nextXP.toString());

          toast.success(`Task completed! +${earnedXP} Focus XP earned.`, {
            icon: '✨'
          });
        }
      } else {
        // Toggled back to PENDING: rollback
        setActivityHistory((prev) => {
          const current = prev[todayKey] || 0;
          const next = { ...prev, [todayKey]: Math.max(0, current - 1) };
          localStorage.setItem('taskmaster_activity_history', JSON.stringify(next));
          return next;
        });

        setFocusXP((prev) => {
          const rolledBack = Math.max(0, prev - 20);
          localStorage.setItem('taskmaster_focus_xp', rolledBack.toString());
          return rolledBack;
        });

        toast(`Task marked as pending.`, { icon: '🔄' });
      }
      return updatedTask;
    } catch (err) {
      toast.error('Failed to update task status.');
      throw err;
    }
  };

  // Handler: Update Task details
  const handleUpdateTask = async (id, taskDetails) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskDetails);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t))
      );
      toast.success('Task updated successfully.');
      return updatedTask;
    } catch (err) {
      toast.error('Failed to update task.');
      throw err;
    }
  };

  // Handler: Delete Task immediately with Overdue Abandon Penalty check
  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find((t) => t.id === id);
      const isUnfinishedOverdue =
        taskToDelete &&
        !taskToDelete.completed &&
        taskToDelete.dueDate &&
        new Date(taskToDelete.dueDate).getTime() < Date.now();

      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));

      if (isUnfinishedOverdue) {
        const abandonPenalty = 25;
        const nextXP = Math.max(0, focusXP - abandonPenalty);
        setFocusXP(nextXP);
        setStreak(0);
        localStorage.setItem('taskmaster_focus_xp', nextXP.toString());
        localStorage.setItem('taskmaster_streak', '0');

        toast.error(`Abandoned Overdue Task: -${abandonPenalty} XP penalty applied. Streak reset.`, {
          icon: '⚠️'
        });
      } else {
        toast('Task removed', { icon: '🗑️' });
      }
    } catch (err) {
      toast.error('Failed to delete task.');
      throw err;
    }
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const activeSprintsCount = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate).getTime() > Date.now()
  ).length;

  const value = {
    tasks,
    isLoading,
    isSubmitting,
    backendStatus,
    streak,
    focusXP,
    currentLevel,
    currentLevelProgress,
    nextLevelThreshold,
    activityHistory,
    totalTasks,
    completedTasks,
    pendingTasks,
    progressPercent,
    activeSprintsCount,
    fetchTasks,
    handleAddTask,
    handleToggleComplete,
    handleUpdateTask,
    handleDeleteTask,
    triggerConfetti
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
