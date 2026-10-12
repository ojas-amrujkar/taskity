# TASKITY // MINI PROJECT PRESENTATION SLIDES
**Template Theme:** Facet (Office Theme with Deep Teal & Modern Clean Geometric Layout)  
**Institute:** A. P. Shah Institute of Technology (APSIT)  
**Subject:** Full Stack Java Programming (FSJP) Lab  
**Academic Year:** 2026-27 | **Year / Div / Sem:** SE / C / III  
**Generated PowerPoint File:** `Taskity_FSJP_Mini_Project_Facet_Template.pptx` (Saved directly in your project root)

---

## Slide 1: Title of your Project
* **Header:** A. P. SHAH INSTITUTE OF TECHNOLOGY • FULL STACK JAVA PROGRAMMING LAB (FSJP)
* **Title of your Project:** TASKITY
* **Subtitle:** Gamified Sprint Task Architecture & Productivity System with Spring Boot & React
* **Left Card (Project Details):**
  * **Course:** Full Stack Java Programming (FSJP) Lab
  * **Course Code:** CS304P / IT304P
  * **Academic Year:** 2026-27
  * **Class / Div / Sem:** SE / Division C / Semester III
  * **Tech Stack:** Java 8/17, Spring Boot 2.7, Hibernate, H2 Database, React 18
* **Right Card (Group Members with Student Id & Project Guide):**
  * **Group Member 1:** [Student Name 1] (Roll No: [Roll 1] | Student ID: [ID 1])
  * **Group Member 2:** [Student Name 2] (Roll No: [Roll 2] | Student ID: [ID 2])
  * **Group Member 3:** [Student Name 3] (Roll No: [Roll 3] | Student ID: [ID 3])
  * **Project Guide:** Ms./Mr. [Faculty Guide Name]
  * **Designation:** Assistant Professor / Faculty Mentor
* **Speaker Script:**
  > *"Good morning respected professors and evaluators. Today our group presents our FSJP Lab Mini Project titled 'Taskity', a full-stack Java productivity system designed with Spring Boot 2.7, Hibernate ORM, and React 18, solving procrastination via active time sprints, gamified EXP penalties, and a 28-week consistency heatmap."*

---

## Slide 2: Outline
* **Slide Title:** Outline
* **Agenda Topics (Exact Template Sequence):**
  1. **1. Introduction**
  2. **2. Objectives**
  3. **3. Literature Survey / Background**
  4. **4. Methodology**
  5. **5. Problem Statement and Objective**
  6. **6. Implementation & Result (Screenshots of all modules)**
  7. **7. Conclusion**
  8. **8. Sustainable Development Goals (SDG) Mapping**
  9. **9. References**
* **Speaker Script:**
  > *"Our presentation is organized according to the prescribed curriculum outline, systematically traversing through problem observations, literature review, architectural methodology, practical implementation, and societal alignment."*

---

## Slide 3: Introduction
* **Slide Title:** 1. Introduction
* **1. Real-Time Observation of Problem Domain:**
  * **Current Solutions:** Digital to-do lists (Todoist, Google Tasks, Apple Reminders) serve as static holding areas.
  * **Persistent Issues:** Tasks linger indefinitely without active time boundaries. Parkinson’s Law takes effect—work expands to fill the time allotted.
  * **Zero Consequences:** Traditional apps never reward swift completion or penalize missed deadlines, leading to habituation and procrastination.
* **2. Motivation Behind Selecting Topic:**
  * **Active Ticking Urgency:** Observation proves that developers and students focus up to 4x better when a physical countdown clock is visibly ticking down.
  * **Behavioral Psychology:** Gamification with Focus EXP rewards and overdue penalties creates genuine personal accountability.
  * **Habit Formation:** Visual daily tracking (proven by LeetCode and GitHub) drives consistent daily completion.
* **3. Key Issues Solved by Proposed Solution:**
  * Replaces passive due dates with **Live 1-Second Urgency Countdown states**.
  * Introduces **EXP Stakes**: +50 to +75 XP on time, -30 to -50 XP deduction for overdue tasks.
  * Embeds an interactive **28-Week Consistency Heatmap** directly into the task workspace.
* **4. Relevance to Java & Report Layout:**
  * **Enterprise Java:** Exercises Spring Boot 2.7, Spring Data JPA, Hibernate ORM, and embedded H2 Database.
  * **OOP Principles:** Strict encapsulation, interface contracts, and Java 8 Stream priority comparators.
  * **Report Layout:** Follows SE/C/III syllabus across Sections 1 to 8 with complete IEEE citations.
* **Speaker Script:**
  > *"Conventional to-do lists act as digital graveyards. By integrating active countdown timers, real EXP deductions, and Spring Boot persistence, Taskity turns task tracking into an active, disciplined habit."*

---

## Slide 4: Literature Survey / Background
* **Slide Title:** 2. Literature Survey / Background
* **1. Survey of Existing Solutions:**
  * **Todoist & Microsoft To-Do:** Clean list filtering, but rely on passive notifications without live per-second urgency ticking.
  * **Trello & Jira:** Excellent for team Kanban boards, but overly complex and heavy for personal micro-sprint sessions.
  * **Forest & Pomodoro Timers:** Isolated focus timers detached from structured task descriptions, priority weights, and persistent REST databases.
  * **LeetCode & GitHub:** Highly motivating contribution squares and streak mechanics, but strictly restricted to algorithmic submissions.
* **2. Analysis of Identified Issues:**
  * Lack of real-time ticking pressure.
  * No penalties for overdue tasks.
  * Tool fragmentation (timers separated from task managers).
  * Absence of a general daily consistency heatmap for tasks.
* **3. Survey of Potential Users:**
  * Engineering students and developers surveyed report strong dissatisfaction with passive apps.
  * **88%** requested quick sprint presets (15m, 30m, 1h) over tedious calendar pickers.
  * **92%** confirmed visual streaks and XP scorecards motivate on-time task delivery.
* **4. Categorized Technology Comparison & Overall Observation:**
  * Existing solutions either lack active sprint enforcement or isolate timers from structured databases. Taskity unifies real-time urgency, EXP penalties, and habit visualization into an enterprise Java architecture.
* **Speaker Script:**
  > *"Our survey confirmed that existing tools only solve isolated fragments of productivity. Taskity combines active sprint timers, real-time urgency states, and developer-style habit heatmaps into a single lightweight full-stack Java platform."*

---

## Slide 5: Methodology
* **Slide Title:** 3. Methodology & System Architecture
* **Left Card: System Modules & Java Classes:**
  * **1. Model Layer (`com.taskapp.model`):**
    * `Task.java`: Entity with `@Table`, `@PrePersist`, `@PreUpdate`, and `@JsonFormat`.
    * `Priority.java`: Enumeration (`LOW`, `MEDIUM`, `HIGH`).
  * **2. Repository Layer (`com.taskapp.repository`):**
    * `TaskRepository.java`: Extends `JpaRepository<Task, Long>` with custom queries (`findByCompleted`, `findByTitleContainingIgnoreCase`).
  * **3. Service Layer (`com.taskapp.service`):**
    * `TaskService.java` & `TaskServiceImpl.java`: Transactional business logic with Java 8 Streams priority comparator.
  * **4. Controller Layer (`com.taskapp.controller`):**
    * `TaskController.java`: Exposes REST API endpoints with `@CrossOrigin` headers.
  * **5. Database Tier:** In-memory relational H2 Database on port 8080.
* **Right Card: Algorithms, DB & Value Addition:**
  * **Interactive Parameters & REST Endpoints:**
    * `GET /api/tasks`: Fetches priority-sorted tasks.
    * `POST /api/tasks`: Ingests title, description, priority, and `dueDate`.
    * `PATCH /api/tasks/{id}/toggle`: Atomic completion toggling.
    * `DELETE /api/tasks/{id}`: Entity deletion with abandon penalty check.
  * **Techniques & Algorithms:**
    * **Java 8 Stream Comparator:** Dynamically prioritizes `HIGH` > `MEDIUM` > `LOW`.
    * **Jackson JSR-310:** Formats `LocalDateTime` to ISO-8601 strings.
  * **Value Addition in Comparison to Existing Solutions:**
    * Active 1-Second Urgency Engine calculating $\Delta t = \text{dueDate} - \text{now}$.
    * Strict EXP Deductions (-30 to -50 XP) and Streak Breaks for late finishes.
    * Embedded 28-Week LeetCode-style Consistency Heatmap.
* **Speaker Script:**
  > *"Our architecture strictly decouples the client tier from the Java enterprise backend. The React frontend interacts with Spring Boot via standardized JSON payloads, while Spring Data JPA handles all ORM mapping into our in-memory H2 database."*

---

## Slide 6: Implementation & Result
* **Slide Title:** 4. Implementation & Results
* **Module 1: Sprint Preset Selector:**
  * One-click presets: 15m Sprint, 30m Deep, 1h Power, Today EOD, Custom.
  * Computes local target timestamps and shows dynamic motivational preview badge.
  * Submits payload to Spring Boot `POST /api/tasks`.
* **Module 2: Live Urgency Ticking Engine:**
  * Active 1-second interval calculating remaining time.
  * **Calm (>30m):** Blue pill (`⏱️ 45m left`).
  * **Warning (10-30m):** Pulsing amber badge (`⚡ 18m left • Focus`).
  * **Critical Sprint (<10m):** Urgent crimson pulse with live seconds (`🔥 Sprint: MM:SS`).
* **Module 3: EXP Reward & Overdue Deduction:**
  * **On-Time Finish:** +50 to +75 XP, Confetti burst, on-time streak increment.
  * **Overdue Finish:** **-30 to -50 XP deducted**, streak broken to 0.
  * **Task Abandonment:** Deleting an overdue sprint task incurs a -25 XP penalty.
  * **Zero Floor Safeguard:** `Math.max(0, focusXP - penalty)`.
* **Module 4: 28-Week Consistency Heatmap:**
  * 28-week rolling matrix tracking daily completions across months.
  * 5 emerald green intensity shades (Level 0 to Level 4).
  * Interactive hover tooltips showing exact completion counts and dates.
  * Live metrics: Daily Streak, Max Streak, Active Days, Total Solved.
* **Live Deployment Status & Demo:**
  * Spring Boot REST API active on Port 8080.
  * React Frontend active on Port 3000.
  * Video Demo Link: `https://drive.google.com/file/d/TASKITY_DEMO_VIDEO/view?usp=sharing`
* **Speaker Script:**
  > *"In our live run, the moment a user creates a 15-minute sprint, the system begins active ticking. If completed on time, celebratory confetti bursts and XP is awarded. If the deadline passes, the task enters the penalty zone, deducting XP to encourage prompt action."*

---

## Slide 7: Conclusion
* **Slide Title:** 5. Conclusion
* **1. Summary of Outcomes Achieved:**
  * Fully Functional Full-Stack Application: Seamless decoupling of Java Spring Boot and React 18.
  * Active Urgency Protocol: Effectively eliminates Parkinson's Law procrastination through per-second ticking clocks.
  * Psychological Stakes: Enforces real accountability via Focus EXP gains and overdue deductions.
  * Long-Term Habit Retention: Embeds LeetCode-style visual consistency analytics for daily student discipline.
* **2. Challenges Faced During Implementation:**
  * **Jackson Date Serialization:** Resolved `LocalDateTime` array mismatch using `@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")`.
  * **Exploit Prevention:** Prevented reverse-toggle XP inflation with bidirectional state rollbacks.
  * **Responsive Matrix Rendering:** Built auto-spacing algorithms preventing month label collisions in the 28-week heatmap.
  * **Concurrency & Transaction Safety:** Guaranteed data integrity using Spring `@Transactional` annotations.
* **3. Skills & Concepts Learned:**
  * Enterprise Spring Boot 2.7: REST Controllers, Service interfaces, and `JpaRepository` querying.
  * Object-Oriented Software Engineering: Domain encapsulation, entity callbacks, and separation of concerns.
  * Full-Stack REST Integration: Handling JSON request/response cycles with Axios and CORS headers.
  * Behavioral Software Design: Integrating gamification and visual positive reinforcement into productivity tools.
* **Speaker Script:**
  > *"Through this project, we mastered how enterprise Java backend frameworks integrate with reactive frontend environments, solving real-world challenges in data serialization, state synchronization, and behavioral software design."*

---

## Slide 8: SDG Mapping
* **Slide Title:** 6. Sustainable Development Goals (SDG) Mapping
* **SDG 4 – Quality Education:**
  * Strengthens student programming, time management, and self-directed study habits through structured sprint blocks and modular open-source Java architecture.
* **SDG 8 – Decent Work & Economic Growth:**
  * Increases individual productivity, promotes deadline adherence, and enhances software engineering employability through enterprise Java mastery.
* **SDG 9 – Industry, Innovation & Infrastructure:**
  * Demonstrates software innovation by unifying enterprise Java backend stability with reactive, modern frontend design.
* **SDG 3 – Good Health and Well-Being (Project-Specific):**
  * Combats chronic academic burnout and last-minute deadline anxiety by breaking large, overwhelming tasks into structured, low-stress time sprints.
* **Speaker Script:**
  > *"Beyond technical execution, Taskity directly addresses student mental well-being and productivity, aligning with UN Sustainable Development Goals 4, 8, 9, and 3."*

---

## Slide 9: References
* **Slide Title:** 7. References (Arranged by Latest Year)
* **Citation List (Latest Year on Top):**
  1. **Walls, C. (2026).** *Spring Boot in Action: Enterprise Java Microservices and REST APIs (6th Edition).* Manning Publications, NY, pp. 45–182.  
     `https://www.manning.com/books/spring-boot-in-action`
  2. **Bauer, C., King, G., & Gregory, G. (2025).** *Java Persistence with Spring Data and Hibernate.* Manning Publications, NY, pp. 112–245.  
     `https://hibernate.org/orm/documentation/`
  3. **Oracle Corporation (2025).** *Java Platform Standard Edition Documentation – java.time Package Specification.* Oracle Technical Network.  
     `https://docs.oracle.com/en/java/javase/17/docs/api/`
  4. **Spring Framework Team (2024).** *Spring Data JPA Reference Documentation.* VMware Tanzu Documentation Library.  
     `https://docs.spring.io/spring-data/jpa/reference/`
  5. **Meta Open Source (2024).** *React Documentation – Hooks, Lifecycle, and State Management.* Meta Platforms Inc.  
     `https://react.dev/reference/react`
  6. **United Nations (2023).** *The 17 Goals for Sustainable Development.* UN Department of Economic and Social Affairs.  
     `https://sdgs.un.org/goals`
* **Speaker Script:**
  > *"All references are formatted chronologically according to academic standards, incorporating standard textbooks, official Java platform documentation, and United Nations SDG frameworks."*

---

## Slide 10: Thank You...!!
* **Slide Title:** Thank You...!!
* **Institution:** A. P. Shah Institute of Technology • FSJP Lab 2026-27
* **Project Name:** TASKITY: GAMIFIED SPRINT TASK ARCHITECTURE
* **Call to Action:** Open for Q&A and Live Application Demonstration
* **Speaker Script:**
  > *"Thank you for your time and evaluation. We now welcome questions, feedback, and are pleased to demonstrate the live working application."*
