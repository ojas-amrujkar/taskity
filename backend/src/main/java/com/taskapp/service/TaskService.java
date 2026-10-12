package com.taskapp.service;

import com.taskapp.model.Task;
import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    List<Task> getTasksByStatus(Boolean completed);
    List<Task> searchTasks(String keyword);
    Task getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails);
    Task toggleTaskCompletion(Long id);
    void deleteTask(Long id);
}
