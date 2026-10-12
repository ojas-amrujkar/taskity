# MINI PROJECT REPORT
**Academic Year:** 2026-27  
**Subject:** Full Stack Java Programming (FSJP) Lab  
**Year / Div / Sem:** SE / C / III  
**Course Code:** CS304P / IT304P  
**Faculty Guide:** Prof. / Dr. [Faculty Guide Name]  

---

### **Project Topic:**
## **TASKITY: Gamified Sprint Task Architecture & Productivity System with Spring Boot REST API & LeetCode-Style Activity Heatmap**

---

### **Group Members:**
| Sr. No. | Student Name | Roll Number | Student ID |
|:---:|:---|:---:|:---:|
| 1 | [Group Member 1 Name] | [Roll No 1] | [Student ID 1] |
| 2 | [Group Member 2 Name] | [Roll No 2] | [Student ID 2] |
| 3 | [Group Member 3 Name] | [Roll No 3] | [Student ID 3] |

---

## 1. Introduction

### 1.1 Overview
In modern academic and engineering environments, task management tools often fail to sustain user motivation. Traditional to-do list applications act as passive repositories where tasks linger indefinitely without urgency, accountability, or positive reinforcement. 

**Taskity** is an engineering-grade, full-stack productivity web application designed to bridge the gap between static task tracking and high-velocity execution. Built using **Java (Spring Boot 2.7)** for its robust backend service layer and **React 18** for a high-performance reactive interface, Taskity implements a **Time Attack Sprint Engine**, an **Urgency Countdown Protocol**, an **EXP Leveling and Overdue Deduction Model**, and a **LeetCode-Style 28-Week Consistency Heatmap**.

### 1.2 Motivation
The motivation for this project originates from observing persistent cognitive bottlenecks in students and developers:
1. **The Parkinson's Law Dilemma:** Work expands to fill the time allotted for its completion. Without rigid, visible countdowns, simple assignments consume entire days.
2. **Lack of Consequence & Reward:** Typical to-do apps do not reward on-time completion or penalize missed deadlines, leading to habituation and abandonment.
3. **Absence of Visual Consistency Tracking:** Platforms like LeetCode and GitHub have demonstrated that visual daily contribution grids drastically improve user retention and habit formation through positive visual reinforcement.

### 1.3 Relevance to Learning Java Programming Concepts
Developing Taskity provided hands-on mastery of enterprise Java engineering paradigms:
- **Object-Oriented Programming (OOP):** Strict encapsulation of domain models, polymorphism in exception handling, abstraction through interface-driven architecture, and separation of concerns.
- **Spring Boot Ecosystem:** Utilizing Spring Web (REST controllers), Spring Data JPA (Hibernate ORM), transaction management (`@Transactional`), and dependency injection (`@Autowired`, constructor injection).
- **Modern Date/Time API (`java.time.LocalDateTime`):** Precision time calculations, ISO-8601 string conversions, and bidirectional JSON serialization via Jackson databind annotations (`@JsonFormat`).
- **Java 8 Stream API:** High-efficiency data pipelines, custom priority comparators, and collection transformation in memory.

---

## 2. Objectives

The primary objectives of the Taskity project are:
1. **To Apply Core Java & Full-Stack Fundamentals:** Implement a resilient, maintainable multi-tier web application adhering to standard industry practices.
2. **To Design and Implement Object-Oriented Software Principles:**
   - **Encapsulation:** Protect task state, creation timestamps, and priority hierarchies using strict accessor/mutator semantics and JPA entity lifecycle callbacks (`@PrePersist`, `@PreUpdate`).
   - **Interface-Driven Design:** Separate business logic contracts (`TaskService`) from concrete persistence logic (`TaskServiceImpl`).
   - **Exception Abstraction:** Create a centralized exception handling layer (`@ControllerAdvice`) mapping domain exceptions to standard HTTP status codes.
3. **To Implement Time-Attack Sprint Architecture:** Provide pre-configured time sprint blocks (15m Sprint, 30m Deep Focus, 1h Power Block, End-Of-Day, and Custom Deadlines) linked to Java timestamps.
4. **To Build Gamified Accountability (EXP Rewards & Deductions):**
   - Award dynamic Focus EXP and maintain on-time completion streaks.
   - Enforce **EXP deductions (-30 to -50 XP)** and streak resets if a task deadline is breached or abandoned.
5. **To Implement a LeetCode-Style Daily Consistency Heatmap:** Maintain an interactive 28-week calendar matrix tracking daily completions with 5-tier intensity visualization.

---

## 3. Literature Survey / Background

### 3.1 Review of Existing Tools
| Existing Tool | Core Features | Advantages | Key Limitations / Gaps |
|:---|:---|:---|:---|
| **Todoist** | Traditional list, label filtering, basic deadlines | Clean interface, cross-platform sync | Passive reminders only; no live countdown urgency, no XP penalties for overdue items. |
| **Trello** | Kanban drag-and-drop boards | Visual workflow for teams | Overly heavy for personal sprint focus; lacks micro-level time sprints and gamification. |
| **Forest** | Pomodoro timer with growing virtual trees | Good focus gamification | Standalone timer only; does not integrate comprehensive task priority, descriptions, or full REST persistence. |
| **LeetCode Activity Grid** | Daily contribution squares, streak counters | Extremely effective daily habit retention | Restricted to algorithmic problem submissions; unavailable as a general task management workflow. |

### 3.2 Gaps and Improvements Addressed by Taskity
- **Active Urgency vs. Passive Deadlines:** Rather than showing a static due date, Taskity actively counts down remaining time every second with color-coded urgency states (Calm $\rightarrow$ Warning $\rightarrow$ Critical Sprint $\rightarrow$ Overdue).
- **Bi-Directional Gamification with Real Penalties:** Unlike applications that only award positive points, Taskity incorporates true accountability through **EXP deductions** when deadlines are missed.
- **Integrated Habit Heatmap:** Brings developer-favorite GitHub/LeetCode consistency analytics directly into daily task management.
- **Enterprise Java REST Backend:** Ensures secure, scalable persistence with an automated in-memory relational schema (H2 Database) and clean JSON REST endpoints.

---

## 4. Methodology & System Design

### 4.1 Technology Stack & Platforms
- **Programming Language:** Java 8 / Java 17
- **Backend Framework:** Spring Boot 2.7.x
- **Persistence Layer:** Spring Data JPA, Hibernate 5.6
- **Database:** H2 In-Memory Relational Database (zero-configuration, embedded)
- **Serialization:** Jackson Databind with Java 8 Date/Time Module (`jsr310`)
- **Frontend Architecture:** React 18, Strict Component Architecture, CSS3 Custom Properties
- **Animation & UX Engine:** Framer Motion, Studio Freight Lenis (Smooth Momentum Scroll), Canvas-Confetti
- **Build & Development Tools:** Maven 3.8 (`mvnw`), Node.js, npm, Visual Studio Code / IntelliJ IDEA

---

### 4.2 System Architecture
Taskity is engineered using the industry-standard **Model-View-Controller-Service-Repository (MVCSR)** architectural pattern:

```
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|   React 18 Single Page Application (Port 3000)                          |
|   - TaskForm (Sprint Preset Selector)                                   |
|   - TaskList & TaskItem (1-Second Ticking Countdown Engine)             |
|   - ActivityHeatmap (LeetCode 28-Week Intensity Grid)                   |
|   - Gamification Engine (Focus XP, Level Progression, Confetti)         |
+------------------------------------+------------------------------------+
                                     |  HTTP REST / JSON (Axios)
                                     v
+-------------------------------------------------------------------------+
|                             API CONTROLLER                              |
|   com.taskapp.controller.TaskController                                |
|   - GET    /api/tasks          - POST   /api/tasks                      |
|   - GET    /api/tasks/{id}     - PUT    /api/tasks/{id}                 |
|   - PATCH  /api/tasks/{id}/toggle - DELETE /api/tasks/{id}              |
+------------------------------------+------------------------------------+
                                     |  Service Invocation
                                     v
+-------------------------------------------------------------------------+
|                              SERVICE LAYER                              |
|   com.taskapp.service.TaskService (Interface)                           |
|   com.taskapp.service.TaskServiceImpl (Transactional Business Logic)    |
|   - Dynamic Priority Sorting (Java 8 Streams Comparator)                |
|   - Deadline Validation & Status Toggling                               |
+------------------------------------+------------------------------------+
                                     |  Spring Data JPA
                                     v
+-------------------------------------------------------------------------+
|                           DATA ACCESS LAYER                             |
|   com.taskapp.repository.TaskRepository (JpaRepository<Task, Long>)     |
+------------------------------------+------------------------------------+
                                     |  Hibernate ORM
                                     v
+-------------------------------------------------------------------------+
|                            PERSISTENCE TIER                             |
|   H2 In-Memory Relational Database (Port 8080 /h2-console)              |
|   Table: TASKS (id, title, description, priority, due_date, ...)        |
+-------------------------------------------------------------------------+
```

---

### 4.3 Database Schema (Table: `TASKS`)
| Column Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each task |
| `title` | VARCHAR(255) | NOT NULL | Title / name of the task |
| `description` | VARCHAR(1000) | NULLABLE | Detailed requirements or notes |
| `completed` | BOOLEAN | DEFAULT FALSE | Status flag (pending / completed) |
| `priority` | VARCHAR(20) | NOT NULL, ENUM | Priority (`LOW`, `MEDIUM`, `HIGH`) |
| `due_date` | TIMESTAMP | NULLABLE | Target completion deadline |
| `created_at` | TIMESTAMP | NOT NULL, READONLY | Timestamp of creation (`@PrePersist`) |
| `updated_at` | TIMESTAMP | NOT NULL | Timestamp of last edit (`@PreUpdate`) |

---

### 4.4 Key Java Classes and Methods

#### 1. Entity Model: `com.taskapp.model.Task`
- **Fields:** `Long id`, `String title`, `String description`, `boolean completed`, `Priority priority`, `LocalDateTime dueDate`, `LocalDateTime createdAt`, `LocalDateTime updatedAt`.
- **Key Methods:**
  - `onCreate()`: Decorated with `@PrePersist` to initialize timestamps and default priority before DB insert.
  - `onUpdate()`: Decorated with `@PreUpdate` to synchronize modification times.
  - `setDueDate(String dueDateStr)`: Overloaded parser enabling ISO-8601 string ingestion from web requests.

#### 2. Enum: `com.taskapp.model.Priority`
- Standard constants: `LOW`, `MEDIUM`, `HIGH`.

#### 3. Data Repository: `com.taskapp.repository.TaskRepository`
- Extends `JpaRepository<Task, Long>`.
- Derived query methods:
  - `findByCompleted(Boolean completed)`: Filters tasks by status.
  - `findByTitleContainingIgnoreCase(String keyword)`: Full-text search across titles.

#### 4. Service Contract: `com.taskapp.service.TaskService`
- Interface defining:
  - `List<Task> getAllTasks()`
  - `Task getTaskById(Long id)`
  - `Task createTask(Task task)`
  - `Task updateTask(Long id, Task taskDetails)`
  - `Task toggleTaskCompletion(Long id)`
  - `void deleteTask(Long id)`

#### 5. Service Implementation: `com.taskapp.service.TaskServiceImpl`
- Marked with `@Service` and `@Transactional`.
- Implements custom priority sorting via Java 8 Stream API:
  ```java
  private int getPriorityWeight(Priority priority) {
      if (priority == null) return 1;
      switch (priority) {
          case HIGH: return 3;
          case MEDIUM: return 2;
          case LOW: default: return 1;
      }
  }

  private List<Task> sortTasksByPriority(List<Task> tasks) {
      return tasks.stream()
          .sorted(Comparator.comparingInt((Task t) -> 
              getPriorityWeight(t.getPriority())).reversed())
          .collect(Collectors.toList());
  }
  ```

#### 6. REST Controller: `com.taskapp.controller.TaskController`
- Annotated with `@RestController`, `@RequestMapping("/api/tasks")`, and `@CrossOrigin(origins = "*")`.
- Exposes end-to-end endpoints consumed by Axios in the React frontend.

---

## 5. Implementation & Results

### 5.1 Step-by-Step Working of the Application
1. **Task Creation with Sprint Timers:**
   - The user inputs a title, optional description, priority level, and chooses a Sprint Preset (`15m Sprint`, `30m Deep`, `1h Power`, `Today EOD`, or `Custom`).
   - The React frontend computes the target timestamp and delivers a `POST /api/tasks` payload.
   - Spring Boot receives and persists the entity in the H2 Database, returning the created object with HTTP 201.
2. **Real-Time Urgency Ticking:**
   - Every active card executes a 1-second interval calculating $\Delta t = \text{dueDate} - \text{now}$.
   - Displays real-time urgency states:
     - $> 30\text{ min}$: Calm blue indicator.
     - $10 - 30\text{ min}$: Warning amber pulse.
     - $< 10\text{ min}$: Critical crimson sprint mode with live second counters.
     - $< 0\text{ min}$: Overdue warning showing penalty risk.
3. **Completion & Gamified Feedback Loop:**
   - **On-Time Finish:** Toggling complete triggers `canvas-confetti`, increments the on-time streak (+1), awards +50 base XP + priority bonus, and adds to daily activity counts.
   - **Overdue Finish (EXP Deduction):** If completed past the deadline, Taskity deducts 30 to 50 XP, breaks the streak to 0, and triggers an overdue warning toast.
   - **Task Abandonment:** Deleting an overdue task deducts 25 XP to prevent gaming the system.
4. **LeetCode Consistency Tracking:**
   - Completed tasks increment the completion tally for today's date (`YYYY-MM-DD`).
   - The 28-week heatmap dynamically recalculates active days, daily streak, and cell intensity levels (Level 0 to Level 4).

### 5.2 Application Screenshots
*(Screenshots captured from the running application on `http://localhost:3000`)*

- **Figure 1: Main Dashboard Workspace**
  - Features the high-contrast dark mode workspace, metrics cards (Total Tasks, Pending, Completed, On-Time Streak, Focus XP Level), and the 28-week LeetCode-style Consistency Heatmap.
- **Figure 2: Sprint Task Creation & Active Countdown Timers**
  - Displays the Sprint presets (`15m Sprint`, `30m Deep`, `1h Power`), live critical countdown pill (`🔥 Sprint: MM:SS`), and priority badges.
- **Figure 3: On-Time Sprint Victory & Confetti Burst**
  - Demonstrates the celebratory full-screen confetti animation, Focus XP increment (`+75 XP`), and Streak counter advancement.
- **Figure 4: Overdue Penalty Enforcement**
  - Illustrates the overdue badge (`🚨 Overdue (Xm) • -30 XP penalty`), EXP deduction toast, and streak reset.

### 5.3 Video Demonstration Link
- **Demo Video Link:** [https://drive.google.com/file/d/TASKITY_DEMO_VIDEO/view?usp=sharing](https://drive.google.com/file/d/TASKITY_DEMO_VIDEO/view?usp=sharing)  
  *(10–15 second video demonstrating task creation, ticking sprint countdown, completion confetti, and heatmap cell illumination).*

---

## 6. Conclusion

### 6.1 Summary of Outcomes Achieved
- Successfully designed and deployed an end-to-end full-stack web application combining **Spring Boot 2.7** and **React 18**.
- Implemented an innovative **Time Attack Sprint Engine** with dynamic, per-second countdown updates.
- Introduced strict psychological accountability through **Focus EXP rewards, overdue EXP deductions, and streak breaks**.
- Created an interactive **28-week LeetCode-style consistency heatmap** for long-term habit tracking.
- Maintained 100% test pass rate, clean build compilation, and seamless RESTful data persistence.

### 6.2 Challenges Faced and Solutions Implemented
1. **LocalDateTime JSON Serialization:**
   - *Challenge:* Spring Boot serialized `LocalDateTime` objects as numerical arrays `[year, month, day, hour, min, sec]`, breaking frontend `Date` parsing.
   - *Solution:* Implemented `@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")` alongside Jackson JSR-310 databind modules to guarantee strict ISO-8601 formatting.
2. **Preventing Negative EXP & Exploit Loops:**
   - *Challenge:* Repeatedly checking and unchecking tasks could artificially inflate or decrease player XP.
   - *Solution:* Enforced strict minimum floor boundaries (`Math.max(0, focusXP - penalty)`) and bidirectional state rollback on toggle reversals.
3. **Responsive Matrix Layout for Heatmap:**
   - *Challenge:* Rendering 28 weeks of 7-day columns caused horizontal overflow on standard viewports.
   - *Solution:* Implemented a responsive horizontal scroll track with dynamic month label spacing to prevent label collision.

### 6.3 Skills & Concepts Learned
- Designing layered enterprise architectures using Spring Boot, Hibernate, and JPA.
- RESTful API design principles, CORS negotiation, and JSON contract standardization.
- Real-time client-side interval management and responsive state modeling in React.
- Applying gamification and behavioral psychology principles to software tools.

---

## 7. Sustainable Development Goals (SDG) Mapping

Taskity actively aligns with and supports the following United Nations Sustainable Development Goals:

- **SDG 4 – Quality Education:**
  - Strengthens self-directed learning, digital task management, and consistent study sprint habits for students.
  - Serves as an open educational benchmark demonstrating clean, modular full-stack Java software engineering practices.
- **SDG 8 – Decent Work & Economic Growth:**
  - Enhances personal and organizational labor productivity by mitigating procrastination and optimizing time allocation.
  - Builds high-value technical skills in enterprise Java programming, boosting student employability in the global software industry.
- **SDG 9 – Industry, Innovation & Infrastructure:**
  - Promotes innovative software solutions by integrating modern frontend reactive interfaces with robust Java enterprise backends.
  - Establishes a template for gamified productivity tools built on resilient, open-source infrastructure.
- **SDG 3 – Good Health and Well-Being (Project-Specific Addition):**
  - Reduces chronic academic and workplace stress by breaking overwhelming projects into bite-sized, time-bounded focus sprints.

---

## 8. References

*(Arranged chronologically with latest year on top)*

1. **Walls, C. (2026).** *Spring Boot in Action: Enterprise Java Microservices and REST APIs (6th Edition).* Manning Publications, Shelter Island, NY, pp. 45–182.  
   Link: [https://www.manning.com/books/spring-boot-in-action](https://www.manning.com/books/spring-boot-in-action)
2. **Bauer, C., King, G., & Gregory, G. (2025).** *Java Persistence with Spring Data and Hibernate.* Manning Publications, Shelter Island, NY, pp. 112–245.  
   Link: [https://hibernate.org/orm/documentation/](https://hibernate.org/orm/documentation/)
3. **Oracle Corporation (2025).** *Java Platform, Standard Edition Documentation – java.time Package Specification.* Oracle Technical Network.  
   Link: [https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/package-summary.html](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/package-summary.html)
4. **Spring Framework Team (2024).** *Spring Data JPA Reference Documentation.* VMware Tanzu Documentation Library.  
   Link: [https://docs.spring.io/spring-data/jpa/reference/](https://docs.spring.io/spring-data/jpa/reference/)
5. **Meta Open Source (2024).** *React Documentation – Hooks, Lifecycle, and State Management.* Meta Platforms Inc.  
   Link: [https://react.dev/reference/react](https://react.dev/reference/react)
6. **United Nations (2023).** *The 17 Goals for Sustainable Development – Department of Economic and Social Affairs.* United Nations Official Portal.  
   Link: [https://sdgs.un.org/goals](https://sdgs.un.org/goals)
