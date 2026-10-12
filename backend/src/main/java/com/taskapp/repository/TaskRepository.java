package com.taskapp.repository;

import com.taskapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Custom query method to find tasks by completion status
    List<Task> findByCompleted(boolean completed);

    // Custom query method to search tasks by title (case-insensitive)
    List<Task> findByTitleContainingIgnoreCase(String keyword);
}
