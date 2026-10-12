# 📘 TASKITY: COMPLETE SYSTEM SPECIFICATION & ARCHITECTURAL COMPENDIUM

> **A Comprehensive, Exhaustive Technical Breakdown of Every Single Technology, Protocol, Tool, Library, Design Pattern, Annotation, and Method Utilized in the Taskity Project.**

---

## 📑 Table of Contents
1. [Core Architectural Philosophy](#1-core-architectural-philosophy)
2. [Build Tools & Dependency Managers](#2-build-tools--dependency-managers)
   - [Apache Maven & Maven Wrapper (`mvnw`)](#21-apache-maven--maven-wrapper-mvnw)
   - [Node Package Manager (`npm`) & Node.js Engine](#22-node-package-manager-npm--nodejs-engine)
3. [The Backend Ecosystem: Java & Spring Boot](#3-the-backend-ecosystem-java--spring-boot)
   - [Java Development Kit (JDK 8 / 17 Standards)](#31-java-development-kit-jdk-8--17-standards)
   - [Spring Boot Framework 2.7.18](#32-spring-boot-framework-2718)
   - [Spring Web (`spring-boot-starter-web`)](#33-spring-web-spring-boot-starter-web)
   - [RESTful Architectural Style & HTTP Contract](#34-restful-architectural-style--http-contract)
   - [Spring Data JPA & Hibernate 5.6](#35-spring-data-jpa--hibernate-56)
   - [Database: H2 In-Memory Relational Engine](#36-database-h2-in-memory-relational-engine)
   - [Temporal Data Handling: `java.time.LocalDateTime` & Jackson](#37-temporal-data-handling-javatimelocaldatetime--jackson)
   - [Centralized Exception Handling & HTTP Status Codes](#38-centralized-exception-handling--http-status-codes)
   - [Complete Spring Annotation Index](#39-complete-spring-annotation-index)
4. [The Frontend Ecosystem: React 18 & JavaScript Architecture](#4-the-frontend-ecosystem-react-18--javascript-architecture)
   - [React 18 Engine & Virtual DOM](#41-react-18-engine--virtual-dom)
   - [React Router DOM v6 (Client-Side Multi-Page Architecture)](#42-react-router-dom-v6-client-side-multi-page-architecture)
   - [State Lifting & React Context API (`TaskContext`)](#43-state-lifting--react-context-api-taskcontext)
   - [HTTP Client: Axios & Async Interceptors](#44-http-client-axios--async-interceptors)
   - [Motion Engine: Framer Motion (`framer-motion`)](#45-motion-engine-framer-motion-framer-motion)
   - [Smooth Momentum Scrolling: Studio Freight Lenis](#46-smooth-momentum-scrolling-studio-freight-lenis)
   - [Dopamine Confetti Particle Engine: `canvas-confetti`](#47-dopamine-confetti-particle-engine-canvas-confetti)
   - [Notification Dispatcher: `react-hot-toast`](#48-notification-dispatcher-react-hot-toast)
   - [Iconography System: `lucide-react`](#49-iconography-system-lucide-react)
   - [Design System & Theming: Pure CSS Variables & Dark/Light Mode](#410-design-system--theming-pure-css-variables--darklight-mode)
   - [Browser Storage Layer: HTML5 Web Storage API (`localStorage`)](#411-browser-storage-layer-html5-web-storage-api-localstorage)
5. [Feature-Specific Functional Mechanics](#5-feature-specific-functional-mechanics)
   - [The Time-Attack Sprint Engine](#51-the-time-attack-sprint-engine)
   - [The Real-Time Urgency Ticking Protocol](#52-the-real-time-urgency-ticking-protocol)
   - [The Gamified Focus EXP & Penalty Stakes](#53-the-gamified-focus-exp--penalty-stakes)
   - [The LeetCode-Style 28-Week Consistency Heatmap](#54-the-leetcode-style-28-week-consistency-heatmap)
   - [The Anti-Exploit Security System](#55-the-anti-exploit-security-system)
6. [Complete REST API Contract & Request/Response Samples](#6-complete-rest-api-contract--requestresponse-samples)
7. [Relational Database Schema (DDL)](#7-relational-database-schema-ddl)
8. [File-by-File Comprehensive Code Index](#8-file-by-file-comprehensive-code-index)

---

## 1. Core Architectural Philosophy

Taskity is constructed using an **asynchronously decoupled, multi-tier enterprise architecture**:
- **Separation of Concerns:** The backend acts strictly as a **headless RESTful microservice API** responsible for business validation, data persistence, and priority queue ordering. The frontend operates as an **event-driven Single Page Application (SPA)** with client-side multi-page routing.
- **Stateless Communication:** No server-side sessions or JSP view rendering are used. Communication happens exclusively over **HTTP/1.1** transporting serialized **JSON** payloads.
- **Fail-Safe Client Architecture:** If the backend is temporarily offline, the frontend's visual state gracefully degrades, warning the user through a real-time status pill without crashing the UI.

---

## 2. Build Tools & Dependency Managers

### 2.1 Apache Maven & Maven Wrapper (`mvnw`)
Maven is the declarative build automation and dependency comprehension tool for the Java ecosystem.

#### Exactly What Maven Does in This Project:
1. **Dependency Resolution:** Parses `backend/pom.xml` to download, verify, and classpath-mount all required JAR libraries (Spring Boot, Hibernate, Jackson, H2, Tomcat).
2. **Transitive Dependency Management:** Resolves transitive libraries (e.g., adding `spring-boot-starter-web` automatically pulls in `spring-webmvc`, `jackson-databind`, `tomcat-embed-core`, and `logback`).
3. **Compilation Pipeline:** Executes the `maven-compiler-plugin` (configured in `pom.xml` with the Eclipse compiler integration) to compile Java source code from `src/main/java` into Java bytecode (`.class` files) under `target/classes`.
4. **Packaging:** Runs `spring-boot-maven-plugin` to assemble an executable "fat JAR" containing both the compiled application classes and an embedded Apache Tomcat web server.
5. **The Maven Wrapper (`mvnw.cmd` / `mvnw`):**
   - Eliminates the requirement for developers to manually install Apache Maven on their operating systems.
   - Automatically downloads the exact declared Maven runtime binary (`3.8.x`) into the user's `.m2` directory, guaranteeing 100% build reproducibility across Windows, Linux, and macOS.

---

### 2.2 Node Package Manager (`npm`) & Node.js Engine
Node.js acts as the JavaScript runtime engine; `npm` manages frontend third-party libraries.

#### Exactly What npm Does in This Project:
1. **Dependency Tree Management:** Reads `frontend/package.json` and creates `package-lock.json` to lock cryptographic hashes and dependency versions.
2. **Build Bundling via Webpack:** Orchestrated through `react-scripts`, compiling JSX, ES6+ JavaScript, TypeScript definitions, and modular CSS into minified static assets (`build/static/js/main.[hash].js` and `build/static/css/main.[hash].css`).
3. **Hot Module Replacement (HMR):** Runs the development server on `localhost:3000` via Webpack Dev Server, watching file modifications and injecting live updates into the browser without full page refreshes.
4. **Legacy Peer Dependency Resolution (`--legacy-peer-deps`):** Resolves peer dependency version mismatches between `react-scripts 5.0.1` (which specifies legacy peer ranges) and modern libraries (`typescript 4.9`, `framer-motion 11`, `zustand 5`).

---

## 3. The Backend Ecosystem: Java & Spring Boot

### 3.1 Java Development Kit (JDK 8 / 17 Standards)
Java is the foundational, strongly-typed object-oriented language executing on the Java Virtual Machine (JVM).

#### Key Java Capabilities Utilized:
- **Java 8 Stream API:** High-performance functional data pipelines utilized in `TaskServiceImpl.java` to perform dynamic in-memory priority sorting using lambda expressions:
  ```java
  tasks.stream()
       .sorted(Comparator.comparingInt((Task t) -> getPriorityWeight(t.getPriority())).reversed())
       .collect(Collectors.toList());
  ```
- **Java Enumerations (`Enum`):** Implemented in `Priority.java` (`LOW`, `MEDIUM`, `HIGH`) to prevent invalid priority states and provide type-safe constants.
- **Java Generics:** Leveraged across Spring Data JPA (`JpaRepository<Task, Long>`) and `ResponseEntity<List<Task>>` to enforce compile-time type safety.
- **Modern Date/Time API (`java.time.LocalDateTime`):** Precision timestamps without historical `java.util.Date` mutability or time-zone corruption bugs.

---

### 3.2 Spring Boot Framework 2.7.18
Spring Boot is the industry-standard enterprise Java microframework.

#### Exactly What Spring Boot Does in This Project:
1. **Auto-Configuration (`@SpringBootApplication`):** Scans the project classpath and automatically instantiates required beans (DataSources, EntityManagers, DispatcherServlets, MessageConverters) without manual XML or Java configuration.
2. **Embedded Tomcat Web Server:** Bundles an embedded Apache Tomcat web server running on port `8080`, removing the need for external application servers like WildFly or GlassFish.
3. **Inversion of Control (IoC) & Dependency Injection (DI):** Instantiates classes and injects dependencies via constructors (e.g., injecting `TaskRepository` into `TaskServiceImpl`, and injecting `TaskService` into `TaskController`) using `@Autowired`.
4. **Declarative Transaction Management (`@Transactional`):** Automatically wraps service methods in database transactions—committing upon success or rolling back if unhandled runtime exceptions arise.

---

### 3.3 Spring Web (`spring-boot-starter-web`)
Handles HTTP request routing and protocol normalization.

#### Exactly What Spring Web Does in This Project:
1. **`DispatcherServlet`:** The front-controller interceptor receiving every incoming HTTP request on `port 8080` and dispatching it to matching controller handler methods.
2. **Content Negotiation & Message Conversion (`HttpMessageConverter`):** Automatically uses Jackson to deserialize incoming JSON HTTP request bodies into Java entity objects, and serialize outgoing Java objects back into JSON responses.
3. **CORS Negotiation (`@CrossOrigin(origins = "*")`):** Handles Cross-Origin Resource Sharing pre-flight HTTP `OPTIONS` requests, allowing the browser client running on `http://localhost:3000` to execute HTTP calls to `http://localhost:8080` without browser security blocking.

---

### 3.4 RESTful Architectural Style & HTTP Contract
Taskity strictly adheres to REST (Representational State Transfer) principles:
- **Statelessness:** The backend stores zero client session state; every request contains all parameters needed for resolution.
- **Uniform Resource Identifiers (URIs):** Resources are identified as nouns (`/api/tasks`, `/api/tasks/{id}`).
- **Appropriate HTTP Method Mapping:**
  - `GET` — Safe, idempotent retrieval of tasks.
  - `POST` — Creation of new task entities (`201 Created`).
  - `PUT` — Full replacement/update of existing task entity state (`200 OK`).
  - `PATCH` — Partial modification (specifically `/api/tasks/{id}/toggle` to invert completion status).
  - `DELETE` — Permanent removal of entity (`204 No Content`).

---

### 3.5 Spring Data JPA & Hibernate 5.6
- **JPA (Java Persistence API):** The standard Java specification for Object-Relational Mapping (ORM).
- **Hibernate:** The underlying JPA provider that generates and executes SQL queries.

#### Exactly What Spring Data JPA & Hibernate Do in This Project:
1. **Automated ORM Mapping:** Inspects `@Entity` annotations on `Task.java` and maps class fields (`id`, `title`, `description`, `dueDate`, `completed`, `priority`) to database columns.
2. **Dynamic DDL Schema Generation (`spring.jpa.hibernate.ddl-auto=update`):** At application startup, Hibernate inspects the database and automatically creates or updates the `TASKS` table schema without requiring manual SQL creation scripts.
3. **Repository Abstraction (`TaskRepository` extending `JpaRepository`):** Provides out-of-the-box implementations of `save()`, `findAll()`, `findById()`, `delete()`, and `saveAndFlush()`.
4. **Derived Query Generation:** Hibernate automatically parses method names like `findByCompleted(Boolean completed)` and `findByTitleContainingIgnoreCase(String keyword)` and generates parameterized SQL queries:
   ```sql
   SELECT * FROM tasks WHERE LOWER(title) LIKE LOWER(?)
   ```
5. **Entity Lifecycle Callbacks:**
   - `@PrePersist`: Automatically sets `createdAt = LocalDateTime.now()` and `updatedAt = LocalDateTime.now()` prior to initial DB insert.
   - `@PreUpdate`: Automatically updates `updatedAt = LocalDateTime.now()` before database row updates.

---

### 3.6 Database: H2 In-Memory Relational Engine
H2 is an ultra-fast, embedded SQL database written entirely in Java.

#### Exactly What H2 Does in This Project:
1. **Zero-Configuration In-Memory Storage (`jdbc:h2:mem:taskdb`):** Requires no external server installation (unlike MySQL or PostgreSQL). It boots instantly inside the JVM memory space when Spring Boot starts.
2. **Persistence Parameters (`DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE`):** Keeps the database alive across connections as long as the JVM process runs.
3. **H2 Web Console:** Serves an interactive database admin panel at `http://localhost:8080/h2-console` allowing direct SQL inspection of the `TASKS` table.

---

### 3.7 Temporal Data Handling: `java.time.LocalDateTime` & Jackson
- **Jackson:** The high-performance JSON processor for Java.
- **`jsr310` Module (`jackson-datatype-jsr310`):** Handles Java 8 Date/Time types.

#### Exactly What This Does in This Project:
Without explicit configuration, Jackson serializes `LocalDateTime` into numerical arrays (e.g. `[2026, 10, 10, 18, 30]`), which causes JavaScript `Date` parsers to fail.  
Taskity decorates the entity fields:
```java
@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
@Column(name = "due_date")
private LocalDateTime dueDate;
```
This forces bidirectional ISO-8601 string formatting (`"2026-10-10T18:30:00"`), ensuring precision synchronization between React and Spring Boot.

---

### 3.8 Centralized Exception Handling & HTTP Status Codes
Implemented in `ResourceNotFoundException.java` and `TaskServiceImpl.java`:
- When a client requests a task ID that does not exist (`/api/tasks/9999`), the service throws a `ResourceNotFoundException`.
- Decorated with `@ResponseStatus(value = HttpStatus.NOT_FOUND)`, Spring automatically translates this into an RFC-compliant `404 Not Found` HTTP response with a clean JSON body, preventing raw Java stack traces from leaking to the client.

---

### 3.9 Complete Spring Annotation Index
| Annotation | Location | Exact Architectural Purpose |
|:---|:---|:---|
| `@SpringBootApplication` | `TaskManagementApplication.java` | Combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. |
| `@RestController` | `TaskController.java` | Marks class as a web handler where every method returns response bodies directly (combines `@Controller` and `@ResponseBody`). |
| `@RequestMapping("/api/tasks")` | `TaskController.java` | Defines the base URL path for all task endpoints. |
| `@CrossOrigin(origins = "*")` | `TaskController.java` | Enables CORS headers (`Access-Control-Allow-Origin: *`). |
| `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping` | `TaskController.java` | Maps specific HTTP verbs to handler methods. |
| `@PathVariable` | `TaskController.java` | Extracts URI path variables (e.g., `{id}`). |
| `@RequestParam` | `TaskController.java` | Extracts query parameters (e.g., `?completed=true`, `?search=keyword`). |
| `@RequestBody` | `TaskController.java` | Binds incoming JSON HTTP body to Java objects. |
| `@Service` | `TaskServiceImpl.java` | Registers class as a business logic bean in Spring's IoC container. |
| `@Transactional` | `TaskServiceImpl.java` | Enforces atomic database transactions. Methods marked `(readOnly = true)` optimize JDBC read queries. |
| `@Repository` | `TaskRepository.java` | Marks interface as a Spring Data repository mechanism. |
| `@Entity` | `Task.java` | Declares class as a persistent relational database entity. |
| `@Table(name = "tasks")` | `Task.java` | Specifies target database table name. |
| `@Id` | `Task.java` | Marks the primary key field. |
| `@GeneratedValue(strategy = GenerationType.IDENTITY)` | `Task.java` | Configures auto-incrementing primary key ID generation. |
| `@Column` | `Task.java` | Customizes column properties (`nullable`, `length`, `updatable`). |
| `@Enumerated(EnumType.STRING)` | `Task.java` | Persists enum values as textual strings (`"HIGH"`) rather than ordinal integers (`2`). |
| `@JsonFormat` | `Task.java` | Enforces ISO-8601 string formatting on date fields. |
| `@PrePersist` / `@PreUpdate` | `Task.java` | Triggers timestamp lifecycle callbacks. |
| `@Autowired` | Multiple | Injects dependencies via Spring's constructor injection. |

---

## 4. The Frontend Ecosystem: React 18 & JavaScript Architecture

### 4.1 React 18 Engine & Virtual DOM
React is a declarative, component-based user interface library.

#### Exactly What React Does in This Project:
1. **Component-Based Hierarchy:** The interface is modularized into reusable components (`TaskForm`, `TaskItem`, `TaskList`, `ActivityHeatmap`, `Navbar`).
2. **Virtual DOM Reconciliation:** When tasks change or countdown timers tick every second, React calculates minimal DOM diffs in memory and updates only the altered text nodes, maintaining 60 FPS performance.
3. **Hooks Utilized:**
   - `useState`: Manages local component state (search filters, form values, edit modes).
   - `useEffect`: Manages side-effects (ticking intervals, API sync, theme attributes).
   - `useCallback`: Memoizes API fetchers to avoid unnecessary re-creation.
   - `useMemo`: Memoizes complex calculations in `ActivityHeatmap.jsx` (28-week matrix generation).
   - `useContext`: Consumes lifted global application state.

---

### 4.2 React Router DOM v6 (Client-Side Multi-Page Architecture)
The client-side routing engine powering the multi-page experience.

#### Exactly What React Router Does in This Project:
1. **`BrowserRouter`:** Intercepts browser URL changes and history manipulation (`window.history.pushState`).
2. **Client-Side Page Swapping:** Swaps view components (`DashboardPage`, `TasksPage`, `CreateTaskPage`, `AnalyticsPage`) on the fly without causing the browser to hard-reload.
3. **`useNavigate` Hook:** Executes programmatic navigation in `CreateTaskPage.jsx`, bouncing the user to `/tasks` immediately after a task is created.
4. **`NavLink` & `Link`:** Semantic links that apply active class styling (`.active`) and maintain active badge indicators without tearing down global state.

---

### 4.3 State Lifting & React Context API (`TaskContext`)
The global state management system.

#### Exactly What TaskContext Does in This Project:
- **Eliminates Route Data Loss:** By lifting state out of isolated pages and into `TaskProvider`, task data, streaks, and EXP balances remain cached in memory when switching routes.
- **Single Source of Truth:** Any action triggered anywhere (e.g., completing a task in `TasksPage` or adding a task in `CreateTaskPage`) updates the same global store and immediately reflects on the `DashboardPage` and `AnalyticsPage`.

---

### 4.4 HTTP Client: Axios & Async Interceptors
Axios is a promise-based HTTP client for the browser.

#### Exactly What Axios Does in This Project (`taskService.js`):
1. **Promise-Based Asynchronous Calls:** Communicates with Spring Boot endpoints (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
2. **Automated JSON Parsing:** Automatically serializes JavaScript objects into JSON request bodies and parses JSON responses into native JavaScript arrays and objects.
3. **Query Parameter Serialization:** Serializes filter objects (`{ completed: true, search: 'bug' }`) into encoded URL query strings (`?completed=true&search=bug`).

---

### 4.5 Motion Engine: Framer Motion (`framer-motion`)
The physics-based animation library for React.

#### Exactly What Framer Motion Does in This Project:
1. **`<AnimatePresence mode="wait">`:** Intercepts route unmounting, holding departing pages on screen while fading them out, and sliding new pages in smoothly (`opacity: 0, y: 14` $\rightarrow$ `opacity: 1, y: 0`).
2. **Card Spring Physics (`motion.div`):** Task cards animate into view with spring damping (`stiffness: 400, damping: 20`) and react to user hover (`scale: 1.015`).
3. **Layout Animations (`layout` prop):** When tasks are filtered or deleted, neighboring cards smoothly glide into their new layout positions instead of jumping abruptly.

---

### 4.6 Smooth Momentum Scrolling: Studio Freight Lenis
A smooth-scroll momentum library (`@studio-freight/lenis`).

#### Exactly What Lenis Does in This Project (`LenisProvider.jsx`):
- Normalizes scroll wheel and touch interactions into fluid, inertia-based momentum physics with cubic ease-out transitions (`duration: 1.2, easing: cubic-bezier`).
- Binds to `requestAnimationFrame` for stutter-free scrolling across long task lists.
- Provides programmatic top-scrolling via `window.lenis.scrollTo(0)`.

---

### 4.7 Dopamine Confetti Particle Engine: `canvas-confetti`
A particle physics celebration library.

#### Exactly What It Does in This Project:
When a user completes a sprint task on or before its target deadline, `triggerConfetti()` launches a particle burst originating from the viewport center (`origin: { y: 0.65 }`), spraying colorful confetti (`#10b981`, `#34d399`, `#f59e0b`, `#38bdf8`) with air resistance and gravity simulation.

---

### 4.8 Notification Dispatcher: `react-hot-toast`
A responsive toast notification engine.

#### Exactly What It Does in This Project:
- Dispatches styled, unobtrusive alert popups in the bottom-right corner.
- Custom styled with dark borders and icons for specific gamification events:
  - Sprint Victory alerts with earned XP calculations.
  - Overdue Penalty alerts notifying users of EXP deductions and streak resets.
  - Backend connection status notices.

---

### 4.9 Iconography System: `lucide-react`
A modern, tree-shakeable SVG icon set.

#### Specific Icons Utilized:
`Flame`, `Zap`, `Award`, `Clock`, `Layers`, `CheckCircle`, `CheckCircle2`, `Circle`, `AlertTriangle`, `Calendar`, `TrendingUp`, `RefreshCw`, `Sun`, `Moon`, `PlusCircle`, `CheckSquare`, `BarChart3`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `Search`, `Trash2`, `Edit3`, `Check`, `X`.

---

### 4.10 Design System & Theming: Pure CSS Variables & Dark/Light Mode
The visual architecture in `index.css`.

#### What It Does:
- **CSS Custom Properties (`--bg-canvas`, `--bg-card`, `--text-main`, `--priority-high`, etc.):** Defines an adaptable design token system.
- **Dark Mode Switching:** `document.documentElement.setAttribute('data-theme', theme)` dynamically inverts all tokens across the entire application in a single operation.
- **Keyframe Animations:**
  - `@keyframes flameFlicker`: Pulsing glow on streak flames.
  - `@keyframes urgentPulse`: Warning pulse on approaching deadlines.
  - `@keyframes urgentCritical`: High-frequency crimson pulse on sprint mode (< 10m).
  - `@keyframes spin`: Continuous rotation on REST API sync buttons.

---

### 4.11 Browser Storage Layer: HTML5 Web Storage API (`localStorage`)
Client-side key-value persistence surviving browser reloads.

#### Keys Maintained:
1. `taskmaster_theme`: Persists dark or light theme preference (`'dark'` or `'light'`).
2. `taskmaster_streak`: Persists on-time sprint streak counter.
3. `taskmaster_focus_xp`: Persists cumulative Focus XP score.
4. `taskmaster_activity_history`: Persists the LeetCode heatmap JSON map (`{ "2026-10-10": 4 }`).

---

## 5. Feature-Specific Functional Mechanics

### 5.1 The Time-Attack Sprint Engine
- **Preset Options:** `⚡ 15m Sprint`, `🎯 30m Deep`, `🚀 1h Power`, `🌅 Today EOD`, and `🗓️ Custom`.
- **Timestamp Arithmetic:** Computes exact expiration timestamps using local ISO date-time math (`toLocalISOString()`) and submits them to Spring Boot.

### 5.2 The Real-Time Urgency Ticking Protocol
Inside `TaskItem.jsx`, a `setInterval` runs every 1,000ms calculating $\Delta t = \text{dueDate} - \text{now}$:
- **Calm State ($\Delta t > 30\text{m}$):** Blue status badge.
- **Warning State ($10\text{m} \le \Delta t \le 30\text{m}$):** Amber pulse badge.
- **Critical Sprint State ($0 < \Delta t < 10\text{m}$):** Glowing crimson pulse with live second countdown.
- **Overdue State ($\Delta t \le 0$):** Flashing alert displaying exact overdue minutes and penalty risk.

### 5.3 The Gamified Focus EXP & Penalty Stakes
- **On-Time Finish:** `+50 XP base` + priority bonus (`HIGH: +25`, `MEDIUM: +15`, `LOW: +5`). Streak increments by 1. Confetti fires.
- **Overdue Finish:** `-30 to -50 XP` deducted. Streak resets to 0. Overdue toast warning triggers.
- **Abandonment Penalty:** Deleting an unfinished overdue task deducts `25 XP` and resets streak to 0.
- **Leveling Curve:** Every `200 XP` unlocks the next Focus Level.

### 5.4 The LeetCode-Style 28-Week Consistency Heatmap
Inside `ActivityHeatmap.jsx`, a matrix of 196 cells (28 weeks $\times$ 7 days) is generated:
- Calculates all-time completions, active days, current daily streak, and record streak.
- Cell intensity mapping:
  - Level 0: 0 tasks
  - Level 1: 1 task
  - Level 2: 2 tasks
  - Level 3: 3–4 tasks
  - Level 4: 5+ tasks
- Highlighted outline on today's square.
- Interactive hover tooltips showing date and completions.

### 5.5 The Anti-Exploit Security System
1. **Floor Safeguard:** `Math.max(0, focusXP - penalty)` prevents negative balance overflows.
2. **Reverse-Toggle Anti-Farming:** Unchecking a task back to pending immediately rolls back awarded XP and decrements today's heatmap tally.
3. **Abandonment Guard:** Prevents cheating by penalizing users who delete overdue tasks instead of completing them.

---

## 6. Complete REST API Contract & Request/Response Samples

### 1. `GET /api/tasks`
- **Description:** Retrieve all tasks, sorted by priority (`HIGH > MEDIUM > LOW`).
- **Response (`200 OK`):**
```json
[
  {
    "id": 1,
    "title": "Benchmark Spring Boot REST endpoints",
    "description": "Evaluate response times under concurrent loads",
    "completed": false,
    "priority": "HIGH",
    "dueDate": "2026-10-10T19:00:00",
    "createdAt": "2026-10-10T17:09:22",
    "updatedAt": "2026-10-10T17:09:22"
  }
]
```

### 2. `POST /api/tasks`
- **Description:** Create a new task entity.
- **Request Body:**
```json
{
  "title": "Complete Database Sharding Paper",
  "description": "Read section 4 and write analytical summary",
  "priority": "MEDIUM",
  "completed": false,
  "dueDate": "2026-10-10T20:30:00"
}
```
- **Response (`201 Created`):** Returns the saved task with generated `id`, `createdAt`, and `updatedAt`.

### 3. `PUT /api/tasks/{id}`
- **Description:** Update title, description, priority, or deadline.
- **Response (`200 OK`):** Returns updated task entity.

### 4. `PATCH /api/tasks/{id}/toggle`
- **Description:** Atomically inverts completion state (`completed = !completed`).
- **Response (`200 OK`):** Returns updated task entity with new status.

### 5. `DELETE /api/tasks/{id}`
- **Description:** Permanently deletes task entity.
- **Response (`204 No Content`)**

---

## 7. Relational Database Schema (DDL)

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

## 8. File-by-File Comprehensive Code Index

### Backend Files (`backend/src/main/java/com/taskapp/`)
| File | Exact Responsibility |
|:---|:---|
| `TaskManagementApplication.java` | Spring Boot main entry point executing `SpringApplication.run()`. |
| `controller/TaskController.java` | Handles REST requests (`/api/tasks`), manages query parameters, and delegates to service layer. |
| `model/Task.java` | JPA relational entity modeling tasks with `@PrePersist`, `@PreUpdate`, and `@JsonFormat`. |
| `model/Priority.java` | Enumeration containing `LOW`, `MEDIUM`, and `HIGH`. |
| `model/Subtask.java` | Entity modeling optional nested subtask items. |
| `repository/TaskRepository.java` | Spring Data JPA interface generating derived queries (`findByCompleted`, `findByTitleContainingIgnoreCase`). |
| `repository/SubtaskRepository.java` | Spring Data JPA interface for subtasks. |
| `service/TaskService.java` | Interface contract declaring business operations. |
| `service/TaskServiceImpl.java` | Concrete implementation managing `@Transactional` transactions and Java 8 Stream priority sorting. |
| `exception/ResourceNotFoundException.java` | Custom runtime exception mapped to HTTP `404 Not Found`. |
| `resources/application.properties` | Port configuration (`8080`), in-memory H2 URL, H2 console settings, and Hibernate DDL update settings. |

### Frontend Files (`frontend/src/`)
| File | Exact Responsibility |
|:---|:---|
| `index.js` | Mounts root `<App />` within React 18 `createRoot` and wraps with `<BrowserRouter>`. |
| `App.jsx` | Top-level shell providing `<TaskProvider>`, `<LenisProvider>`, `<Toaster>`, fixed particle canvas, and animated `<Routes>`. |
| `context/TaskContext.jsx` | Global state store managing lifted tasks, XP leveling, streak counters, confetti dispatches, and API CRUD operations. |
| `components/Navbar.jsx` | Global header containing `<NavLink>` routing, live pending badges, streak indicators, and theme switches. |
| `components/TaskForm.jsx` | Task creation form featuring one-click sprint presets, datetime picker, and dynamic preview badge. |
| `components/TaskItem.jsx` | Individual task card with 1-second countdown timer, priority tags, inline editing, and penalty alerts. |
| `components/TaskList.jsx` | Container managing search query filtering, `All`/`Pending`/`Completed` tabs, and empty/loading states. |
| `components/ActivityHeatmap.jsx` | 28-week LeetCode consistency calendar with hover tooltips and habit streak statistics. |
| `components/ParticleBackground.tsx` | Fixed interactive physics background particle engine. |
| `components/providers/LenisProvider.tsx` | Smooth inertia momentum scroll provider. |
| `pages/DashboardPage.jsx` | Overview route (`/`) featuring quick stats, sprint callouts, consistency heatmap, and recent task list. |
| `pages/TasksPage.jsx` | Full task view route (`/tasks`) with counter pills and search filters. |
| `pages/CreateTaskPage.jsx` | Dedicated creation route (`/create`) with programmatic `useNavigate` redirect on submit. |
| `pages/AnalyticsPage.jsx` | Dedicated performance route (`/analytics`) featuring streak metrics, level progress, and full heatmap. |
| `services/taskService.js` | Axios HTTP client managing RESTful API calls to Spring Boot. |
| `index.css` | Comprehensive design system tokens, dark/light theme definitions, layout rules, and keyframe animations. |
