package com.taskapp.service;

import com.taskapp.exception.ResourceNotFoundException;
import com.taskapp.model.Priority;
import com.taskapp.model.Task;
import com.taskapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private int getPriorityWeight(Priority priority) {
        if (priority == null) return 1;
        switch (priority) {
            case HIGH: return 3;
            case MEDIUM: return 2;
            case LOW:
            default: return 1;
        }
    }

    private List<Task> sortTasksByPriority(List<Task> tasks) {
        return tasks.stream()
                .sorted(Comparator.comparingInt((Task t) -> getPriorityWeight(t.getPriority())).reversed())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return sortTasksByPriority(taskRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getTasksByStatus(Boolean completed) {
        return sortTasksByPriority(taskRepository.findByCompleted(completed));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> searchTasks(String keyword) {
        return sortTasksByPriority(taskRepository.findByTitleContainingIgnoreCase(keyword));
    }

    @Override
    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    @Override
    public Task createTask(Task task) {
        if (task.getPriority() == null) {
            task.setPriority(Priority.LOW);
        }
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public Task updateTask(Long id, Task taskDetails) {
        Task existingTask = getTaskById(id);
        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setCompleted(taskDetails.isCompleted());
        if (taskDetails.getPriority() != null) {
            existingTask.setPriority(taskDetails.getPriority());
        }
        existingTask.setDueDate(taskDetails.getDueDate());
        return taskRepository.saveAndFlush(existingTask);
    }

    @Override
    public Task toggleTaskCompletion(Long id) {
        Task task = getTaskById(id);
        task.setCompleted(!task.isCompleted());
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
}
