# ⚡ TASKITY // Task Architecture & Sprint Engine

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-2.7.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-8%20%7C%2017-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Hibernate-JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
  <img src="https://img.shields.io/badge/H2-In--Memory%20DB-003B57?style=for-the-badge&logo=h2&logoColor=white" alt="H2 Database" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

> **Taskity** is an engineering-grade, full-stack productivity web application designed to eliminate procrastination through active time sprints, real-time urgency protocols, gamified EXP penalties, and a LeetCode-style daily consistency heatmap. Built with a decoupled **Spring Boot REST API** and a reactive **React 18** interface.

---

## 📑 Table of Contents
- [🌟 Key Product Features](#-key-product-features)
  - [1. Time-Attack Sprint Engine](#1-time-attack-sprint-engine)
  - [2. Live Urgency Ticking Engine](#2-live-urgency-ticking-engine)
  - [3. Gamified Focus EXP & Penalty Stakes](#3-gamified-focus-exp--penalty-stakes)
  - [4. LeetCode-Style 28-Week Consistency Heatmap](#4-leetcode-style-28-week-consistency-heatmap)
  - [5. Multi-Page Architecture & Route Transitions](#5-multi-page-architecture--route-transitions)
  - [6. Minimalist Editorial & Dark Mode UI](#6-minimalist-editorial--dark-mode-ui)
  - [7. High-Performance Task Management](#7-high-performance-task-management)
- [🏗️ System Architecture](#️-system-architecture)
- [🔌 REST API Endpoints](#-rest-api-endpoints)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [Prerequisites](#prerequisites)
  - [1. Start Backend (Spring Boot)](#1-start-backend-spring-boot)
  - [2. Start Frontend (React)](#2-start-frontend-react)
- [📂 Project Structure](#-project-structure)
- [🛡️ Anti-Exploit & Data Integrity Safeguards](#️-anti-exploit--data-integrity-safeguards)
- [🎓 Academic Project Details](#-academic-project-details)

---

## 🌟 Key Product Features

### 1. Time-Attack Sprint Engine
Traditional to-do apps act as passive holding grounds where tasks linger indefinitely. Taskity introduces structured, time-bounded sprint blocks directly upon task creation:
- **Instant Sprint Presets:**
  - `⚡ 15m Sprint` — Rapid burst execution for micro-deliverables.
  - `🎯 30m Deep` — Standard Pomodoro / deep work interval.
  - `🚀 1h Power` — Extended focus block for complex engineering tasks.
  - `🌅 Today EOD` — Automatically computes target deadline to 6:00 PM (or end-of-day).
  - `🗓️ Custom Deadline` — Precision datetime picker for specific milestones.
  - `No Limit` — For open-ended, non-timed items.
- **Dynamic Motivation Preview:** Displays immediate target timestamp and potential EXP payout before task creation (`Target: 5:45 PM • Complete on time for streak & XP bonus!`).

---

### 2. Live Urgency Ticking Engine
Every task card with an active deadline executes a 1-second interval calculating $\Delta t = \text{dueDate} - \text{now}$, smoothly cycling through 4 psychological urgency states:

| Urgency State | Time Window | Visual Indicator | Psychological Purpose |
|:---|:---|:---|:---|
| **Calm** | $> 30\text{ min}$ left | Minimal blue pill (`⏱️ 45m left`) | Steady, unhurried progression |
| **Focus Warning** | $10\text{ to }30\text{ min}$ left | Pulsing amber badge (`⚡ 18m left • Focus`) | Encourages steady cadence |
| **Critical Sprint** | $< 10\text{ min}$ left | Glowing crimson pulse with live seconds (`🔥 Sprint: MM:SS`) | Triggers sprint adrenaline |
| **Overdue Penalty Zone** | $< 0\text{ min}$ (expired) | Flashing warning badge (`🚨 Overdue (Xm) • -30 XP penalty`) | Nudges immediate wrap-up |

---

### 3. Gamified Focus EXP & Penalty Stakes
Unlike apps that only reward positive actions, Taskity introduces **real stakes** to foster authentic accountability:

#### 🏆 On-Time Rewards:
- **Base Reward:** `+50 Focus XP` for finishing any sprint on time.
- **Priority Multiplier Bonus:**
  - `HIGH Priority`: `+25 XP bonus` (`+75 XP total`)
  - `MEDIUM Priority`: `+15 XP bonus` (`+65 XP total`)
  - `LOW Priority`: `+5 XP bonus` (`+55 XP total`)
  - Standard untimed task: `+20 XP`
- **🎉 Confetti Explosion:** Powered by `canvas-confetti` with high-satisfaction particle bursts.
- **🔥 On-Time Streak:** Increments consecutive on-time completions (`🔥 4 Streak`).
- **Leveling Engine:** Every `200 XP` unlocks a new Focus Level (`Level 1`, `Level 2`, `Level 3`...).

#### ⚠️ EXP Deduction Penalties:
- **Overdue Task Completion:** If a task is marked complete after the deadline has expired:
  - `HIGH Priority Overdue`: **-50 Focus XP** deducted
  - `MEDIUM Priority Overdue`: **-40 Focus XP** deducted
  - `LOW Priority Overdue`: **-30 Focus XP** deducted
  - **Streak Reset:** On-time streak immediately resets to `0`.
- **Abandonment Penalty:** Deleting an unfinished overdue task to evade the timer incurs an automatic **-25 XP penalty** and streak break.
- **Zero Floor Protection:** Total Focus XP is bounded at `0` (`Math.max(0, focusXP - penalty)`), preventing negative balance glitches.

---

### 4. LeetCode-Style 28-Week Consistency Heatmap
Embedded directly within the workspace top bar, providing long-term visual reinforcement inspired by developer contribution grids:
- **28-Week Matrix Grid:** Rolling ~6.5-month calendar arranged in weekly columns with weekday row indicators (`Mon`, `Wed`, `Fri`) and auto-spaced month headers.
- **5-Tier Emerald Green Intensity Palette:**
  - `Level 0 (0 tasks)`: Clean hollow cell.
  - `Level 1 (1 task)`: Soft emerald green.
  - `Level 2 (2 tasks)`: Forest green.
  - `Level 3 (3–4 tasks)`: Vivid green.
  - `Level 4 (5+ tasks)`: Glowing neon emerald (`#39d353`).
- **Interactive Tooltip:** Hovering over any cell reveals exact counts and dates (e.g., `3 tasks completed on Sun, Oct 4, 2026`).
- **Active Today Ring:** Today's date cell is framed with an active accent ring.
- **Live Habit Metrics:**
  - 🔥 **Daily Streak:** Consecutive days with at least 1 completed task.
  - 🏆 **Max Streak:** All-time record daily streak.
  - 📅 **Active Days:** Total days with recorded activity.
  - 🎯 **Total Solved:** Cumulative completed tasks.

---

### 5. Multi-Page Architecture & Route Transitions
Rather than locking the user into a single crowded viewport, Taskity is split into clean, modular routes using **React Router v6**:
- **Isolated Views:**
  - **`/` (Dashboard Overview):** Workspace metrics, active countdown sprint callouts, 28-week consistency heatmap, and recent task previews.
  - **`/tasks` (Task List):** Dedicated task management view with search, filter tabs (`All`, `Pending`, `Completed`), and live urgency countdown cards.
  - **`/create` (Task Creation):** Focused creation form with one-click sprint presets (`15m Sprint`, `30m Deep`, `1h Power`, `Today EOD`, and `Custom`).
  - **`/analytics` (Performance Analytics):** Dedicated habit performance hub with streak tracking, Focus Level progression, completion rates, and full heatmap.
- **Global State Lifting (`React Context API`):** All task records, Focus XP, streaks, and activity data live in a top-level `<TaskProvider>`, ensuring **zero data loss** and zero unnecessary server re-fetches when navigating between pages.
- **Programmatic Form Redirection (`useNavigate`):** Submitting a task on `/create` automatically resolves the backend creation and seamlessly bounces the user straight to `/tasks`.
- **Fluid Route Transitions (`Framer Motion`):** `<AnimatePresence mode="wait">` holds the outgoing route just long enough to fade out while sliding the incoming page in, keeping the persistent header and background particles mounted without flickering.

---

### 6. Minimalist Editorial & Dark Mode UI
- **Brutalist / Quiet Luxury Aesthetic:** Monospaced accent typography, high-contrast borders, and clean status indicators.
- **Theme Switching:** Dark mode default with instant toggle to light mode, persisted across sessions in `localStorage`.
- **Physics Background Particles:** Interactive canvas particle engine (`@tsparticles/react`) with fixed background layering.
- **Smooth Momentum Scrolling:** Full-application Lenis scroll provider (`@studio-freight/lenis`) for momentum easing.

---

### 7. High-Performance Task Management
- **Dynamic Priority Sorting:** Powered by Java 8 Stream comparators in Spring Boot (`HIGH > MEDIUM > LOW`).
- **In-Place Inline Editing:** Edit task title, description, priority, and deadline directly on the card without modal overlays.
- **Instant Search & Tab Filtering:** Real-time search across titles and descriptions combined with `All`, `Pending`, and `Completed` tabs.
- **One-Click Toggling:** Quick status toggle with instant optimistic UI update.

---

## 🏗️ System Architecture

Taskity follows the enterprise **Model-View-Controller-Service-Repository (MVCSR)** architectural pattern:

```
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|   React 18 Single Page Application (Port 3000)                          |
|   - TaskForm: Sprint preset calculation & deadline dispatch             |
|   - TaskItem: Real-time 1-second interval countdown engine              |
|   - ActivityHeatmap: 28-week consistency matrix & hover tooltips        |
|   - Gamification Engine: Focus XP calculation, streak, confetti         |
+------------------------------------+------------------------------------+
                                     |  HTTP REST / JSON (Axios)
                                     v
+-------------------------------------------------------------------------+
|                             API CONTROLLER                              |
|   com.taskapp.controller.TaskController                                |
|   - Exposes RESTful endpoints with CORS cross-origin configuration      |
+------------------------------------+------------------------------------+
                                     |  Service Contract
                                     v
+-------------------------------------------------------------------------+
|                              SERVICE LAYER                              |
|   com.taskapp.service.TaskService (Interface Contract)                  |
|   com.taskapp.service.TaskServiceImpl (@Transactional Logic)           |
|   - Java 8 Stream Priority Weight Sorting                               |
|   - Deadline persistence & atomic completion toggling                   |
+------------------------------------+------------------------------------+
                                     |  Spring Data JPA
                                     v
+-------------------------------------------------------------------------+
|                           DATA ACCESS LAYER                             |
|   com.taskapp.repository.TaskRepository (JpaRepository<Task, Long>)     |
+------------------------------------+------------------------------------+
                                     |  Hibernate ORM 5.6
                                     v
+-------------------------------------------------------------------------+
|                            PERSISTENCE TIER                             |
|   H2 In-Memory Relational Database (Port 8080 /h2-console)              |
|   Table: TASKS (id, title, description, priority, due_date, ...)        |
+-------------------------------------------------------------------------+
```

---

## 🔌 REST API Endpoints

Base URL: `http://localhost:8080/api/tasks`

| Method | Endpoint | Description | Request Body | Response Code |
|:---|:---|:---|:---|:---:|
| `GET` | `/api/tasks` | Fetch all tasks (sorted by priority `HIGH > MED > LOW`) | None | `200 OK` |
| `GET` | `/api/tasks?completed=true` | Filter tasks by completion status | None | `200 OK` |
| `GET` | `/api/tasks?search=keyword` | Search tasks by title / keyword | None | `200 OK` |
| `GET` | `/api/tasks/{id}` | Retrieve single task details by ID | None | `200 OK` |
| `POST` | `/api/tasks` | Create a new task with priority & sprint deadline | JSON Task Object | `201 Created` |
| `PUT` | `/api/tasks/{id}` | Update existing task details, priority, or deadline | JSON Task Object | `200 OK` |
| `PATCH` | `/api/tasks/{id}/toggle` | Atomically toggle task completion status | None | `200 OK` |
| `DELETE` | `/api/tasks/{id}` | Permanently delete a task by ID | None | `204 No Content` |

#### Sample Task Creation Payload (`POST /api/tasks`):
```json
{
  "title": "Conduct API Performance Benchmark",
  "description": "Evaluate response times under 500 concurrent connections",
  "priority": "HIGH",
  "completed": false,
  "dueDate": "2026-10-04T18:30:00"
}
```

---

## 🗄️ Database Schema

### Table: `TASKS`
```sql
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    priority VARCHAR(20) NOT NULL,
    due_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Java Development Kit (JDK):** Version 8 or 17+ installed and on `PATH`
- **Node.js & npm:** Version 16.x or higher installed
- **Git**

---

### 1. Start Backend (Spring Boot)
1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Build and launch the Spring Boot application using Maven Wrapper:
   * **Windows:**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   * **Linux / macOS:**
     ```bash
     ./mvnw spring-boot:run
     ```
3. The server starts on **Port 8080**.
   - REST API Base: `http://localhost:8080/api/tasks`
   - Embedded H2 Database Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:taskdb`
     - Username: `sa`
     - Password: *(leave blank)*

---

### 2. Start Frontend (React)
1. In a separate terminal, navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (using `--legacy-peer-deps`):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser at **`http://localhost:3000`**.

---

## 📂 Project Structure

```
Java Project/
├── backend/                                  # Spring Boot REST API
│   ├── src/main/java/com/taskapp/
│   │   ├── controller/
│   │   │   └── TaskController.java           # REST API endpoints & CORS
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java   # Centralized error mapping
│   │   │   └── ResourceNotFoundException.java
│   │   ├── model/
│   │   │   ├── Priority.java                 # Enum: LOW, MEDIUM, HIGH
│   │   │   └── Task.java                     # JPA Entity with @JsonFormat
│   │   ├── repository/
│   │   │   └── TaskRepository.java           # Spring Data JPA interface
│   │   ├── service/
│   │   │   ├── TaskService.java              # Service interface
│   │   │   └── TaskServiceImpl.java          # Transactional business logic
│   │   └── TaskManagementApplication.java    # Spring Boot entry point
│   ├── src/main/resources/
│   │   └── application.properties            # H2 DB & JPA configuration
│   ├── pom.xml                               # Maven project dependencies
│   └── mvnw.cmd / mvnw                       # Maven wrappers
│
├── frontend/                                 # React 18 Multi-Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityHeatmap.jsx           # 28-week LeetCode activity matrix
│   │   │   ├── Navbar.jsx                    # NavLinks with pending badge counters
│   │   │   ├── ParticleBackground.jsx        # Physics canvas particles
│   │   │   ├── TaskForm.jsx                  # Sprint presets & creation form
│   │   │   ├── TaskItem.jsx                  # 1-sec countdown & urgency cards
│   │   │   ├── TaskList.jsx                  # Search, filter tabs & list layout
│   │   │   └── providers/
│   │   │       └── LenisProvider.jsx         # Smooth momentum scroll provider
│   │   ├── context/
│   │   │   └── TaskContext.jsx               # Global lifted state & CRUD actions
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx             # Overview metrics & recent sprint tasks
│   │   │   ├── TasksPage.jsx                 # Dedicated task list & search
│   │   │   ├── CreateTaskPage.jsx            # Task creation with useNavigate bounce
│   │   │   └── AnalyticsPage.jsx             # Performance hub & consistency heatmap
│   │   ├── services/
│   │   │   └── taskService.js                # Axios REST API client
│   │   ├── App.jsx                           # Route switcher & AnimatePresence
│   │   ├── index.css                         # Design system & dark/light theme
│   │   └── index.js                          # BrowserRouter & React DOM mount point
│   └── package.json                          # Dependencies & scripts
│
├── MINI_PROJECT_REPORT.md                    # Official Academic Project Report
├── MINI_PROJECT_REPORT.html                  # Print/PDF Academic Project Report
├── Taskity_FSJP_Mini_Project_Facet_Template.pptx  # College Presentation Slides (PPTX)
├── PROJECT_PRESENTATION_SLIDES.md            # Slide transcript & speaker notes
└── README.md                                 # Complete product documentation
```

---

## 🛡️ Anti-Exploit & Data Integrity Safeguards

1. **Zero-Floor EXP Protection:** Focus XP balance is strictly protected from dropping below zero (`Math.max(0, focusXP - penalty)`), preventing negative balance overflows.
2. **Reverse-Toggle Anti-Farming:** Unchecking a completed task back to pending immediately decrements today's heatmap tally and rolls back awarded XP, preventing duplicate farming.
3. **Abandonment Guard:** Deleting an unfinished overdue task to bypass countdown failure triggers an automatic `-25 XP` abandon penalty and streak break.
4. **Jackson Date Standardization:** Annotated with `@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")` to eliminate ISO-8601 parsing mismatches between Spring Boot and JavaScript.

---

## 🎓 Academic Project Details
- **Subject:** Full Stack Java Programming (FSJP) Lab
- **Class / Div / Sem:** SE / C / III (Academic Year 2026-27)
- **Institution:** A. P. Shah Institute of Technology (APSIT)
- **Associated Deliverables:**
  - 📄 **Project Report:** [`MINI_PROJECT_REPORT.md`](MINI_PROJECT_REPORT.md) & [`MINI_PROJECT_REPORT.html`](MINI_PROJECT_REPORT.html)
  - 📊 **Presentation Slides:** [`Taskity_FSJP_Mini_Project_Facet_Template.pptx`](Taskity_FSJP_Mini_Project_Facet_Template.pptx) & [`PROJECT_PRESENTATION_SLIDES.md`](PROJECT_PRESENTATION_SLIDES.md)

---

## 📄 License
This project is licensed under the **MIT License** — feel free to use, modify, and distribute for educational and commercial purposes.
