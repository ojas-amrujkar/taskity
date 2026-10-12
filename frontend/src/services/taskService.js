import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const taskService = {
  // Fetch all tasks with optional filters
  getAllTasks: async (completed, search) => {
    const params = {};
    if (completed !== undefined && completed !== null) {
      params.completed = completed;
    }
    if (search && search.trim() !== '') {
      params.search = search.trim();
    }

    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  },

  // Fetch single task by ID
  getTaskById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new task (supports nested subtasks)
  createTask: async (taskData) => {
    const response = await axios.post(API_BASE_URL, taskData);
    return response.data;
  },

  // Update existing task details & subtasks
  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, taskData);
    return response.data;
  },

  // Toggle main task completion status
  toggleTaskCompletion: async (id) => {
    const response = await axios.patch(`${API_BASE_URL}/${id}/toggle`);
    return response.data;
  },

  // Toggle individual subtask completion status via PUT request
  toggleSubtaskCompletion: async (taskId, subtaskId) => {
    const response = await axios.put(`${API_BASE_URL}/${taskId}/subtasks/${subtaskId}`);
    return response.data;
  },

  // Delete task by ID
  deleteTask: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};

export default taskService;
