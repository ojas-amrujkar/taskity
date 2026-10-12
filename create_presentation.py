import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_slide_layout = prs.slide_layouts[6]

    # Color Palette - Modern Dark Architecture
    BG_COLOR = RGBColor(15, 23, 42)        # Deep Slate #0F172A
    CARD_BG = RGBColor(30, 41, 59)         # Surface Slate #1E293B
    BORDER_COLOR = RGBColor(51, 65, 85)    # Slate Border #334155
    ACCENT_CYAN = RGBColor(56, 189, 248)   # Cyan #38BDF8
    ACCENT_GREEN = RGBColor(52, 211, 153)  # Emerald #34D399
    ACCENT_AMBER = RGBColor(251, 191, 36)  # Amber #FBBF24
    ACCENT_RED = RGBColor(248, 113, 113)   # Crimson #F87171
    TEXT_MAIN = RGBColor(248, 250, 252)    # White #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184)   # Slate Muted #94A3B8

    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="FSJP LAB MINI PROJECT // SE-C-III"):
        # Category / Breadcrumb
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.name = "Arial"
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_CYAN

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = "Arial"
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_MAIN

    def add_card(slide, left, top, width, height, title="", border_color=BORDER_COLOR):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)

        if title:
            title_box = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), Inches(0.5))
            tf = title_box.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = title
            p.font.name = "Arial"
            p.font.size = Pt(14)
            p.font.bold = True
            p.font.color.rgb = ACCENT_CYAN

        return card

    # ==========================================
    # SLIDE 1: TITLE SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s1)

    # Title Banner Box
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(11.7), Inches(2.2))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p_tag = tf1.paragraphs[0]
    p_tag.text = "ACADEMIC YEAR 2026-27 • FULL STACK JAVA PROGRAMMING (FSJP) LAB • SE / C / III"
    p_tag.font.name = "Arial"
    p_tag.font.size = Pt(11)
    p_tag.font.bold = True
    p_tag.font.color.rgb = ACCENT_CYAN

    p_main = tf1.add_paragraph()
    p_main.text = "TASKITY"
    p_main.font.name = "Arial"
    p_main.font.size = Pt(44)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_MAIN

    p_sub = tf1.add_paragraph()
    p_sub.text = "Gamified Sprint Task Architecture & Productivity System with Spring Boot & React"
    p_sub.font.name = "Arial"
    p_sub.font.size = Pt(18)
    p_sub.font.color.rgb = ACCENT_GREEN

    # Group Members Card
    add_card(s1, Inches(0.8), Inches(3.8), Inches(5.6), Inches(2.8), "Project Group Members")
    mem_box = s1.shapes.add_textbox(Inches(1.0), Inches(4.5), Inches(5.2), Inches(1.9))
    tf_m = mem_box.text_frame
    members = [
        ("Group Member 1:", "[Student Name 1] (Roll No: [Roll 1], ID: [ID 1])"),
        ("Group Member 2:", "[Student Name 2] (Roll No: [Roll 2], ID: [ID 2])"),
        ("Group Member 3:", "[Student Name 3] (Roll No: [Roll 3], ID: [ID 3])"),
    ]
    for i, (label, val) in enumerate(members):
        p = tf_m.paragraphs[0] if i == 0 else tf_m.add_paragraph()
        p.text = f"{label} {val}"
        p.font.name = "Arial"
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_MAIN

    # Guide & Institution Card
    add_card(s1, Inches(6.8), Inches(3.8), Inches(5.7), Inches(2.8), "Faculty Guide & Department")
    guide_box = s1.shapes.add_textbox(Inches(7.0), Inches(4.5), Inches(5.3), Inches(1.9))
    tf_g = guide_box.text_frame
    guides = [
        ("Project Guide:", "Prof. / Dr. [Faculty Guide Name]"),
        ("Course:", "Full Stack Java Programming Lab (FSJP)"),
        ("Course Code:", "CS304P / IT304P"),
        ("Academic Division:", "Second Year Engineering (SE) • Division C • Sem III")
    ]
    for i, (label, val) in enumerate(guides):
        p = tf_g.paragraphs[0] if i == 0 else tf_g.add_paragraph()
        p.text = f"{label} {val}"
        p.font.name = "Arial"
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_MAIN

    s1.notes_slide.notes_text_frame.text = (
        "Welcome professors and evaluators. Today we present Taskity, a modern full-stack Java productivity application "
        "engineered with Spring Boot 2.7, Hibernate ORM, and React 18, solving procrastination via active time sprints, "
        "EXP accountability, and a LeetCode-style activity heatmap."
    )

    # ==========================================
    # SLIDE 2: OUTLINE
    # ==========================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s2)
    add_header(s2, "Presentation Outline & Agenda")

    cards_agenda = [
        ("01. Introduction & Motivation", "Problem domain, cognitive hurdles, and relevance to modern Java."),
        ("02. Objectives", "Java OOP principles, Sprint Time Attack, and gamified accountability."),
        ("03. Literature Survey", "Existing tools analysis (Todoist, Trello, Forest, LeetCode) & gaps."),
        ("04. Methodology & Architecture", "Layered MVC architecture, Spring Boot, JPA, React 18, and H2 DB."),
        ("05. Implementation & Results", "Sprint engine, live countdowns, EXP penalties, and LeetCode heatmap."),
        ("06. Conclusion & Learnings", "Key engineering outcomes, technical hurdles solved, and skills."),
        ("07. SDG Mapping", "Direct alignment with UN Sustainable Development Goals (4, 8, 9, 3)."),
        ("08. References", "Academic books, official Java specifications, and technical standards.")
    ]

    for i, (head, desc) in enumerate(cards_agenda):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.6 + row * 1.3)
        add_card(s2, left, top, Inches(5.6), Inches(1.15))
        c_box = s2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.1), Inches(5.2), Inches(0.95))
        tf = c_box.text_frame
        p_h = tf.paragraphs[0]
        p_h.text = head
        p_h.font.name = "Arial"
        p_h.font.size = Pt(13)
        p_h.font.bold = True
        p_h.font.color.rgb = ACCENT_CYAN
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.name = "Arial"
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 3: INTRODUCTION & MOTIVATION
    # ==========================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s3)
    add_header(s3, "Introduction & Motivation")

    # Card 1: Problem Domain
    add_card(s3, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "The Problem Domain")
    b1 = s3.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(5.2), Inches(4.4))
    tf1 = b1.text_frame
    tf1.word_wrap = True
    points1 = [
        "Passive Task Decay: Traditional to-do apps act as digital graveyards where tasks accumulate without urgency.",
        "Parkinson's Law: Work expands to fill available time; without visible ticking clocks, tasks take 3x longer.",
        "Zero Consequence Dilemma: Traditional apps never penalize missed deadlines, leading to habituation and procrastination.",
        "Missing Visual Momentum: Students lack daily habit indicators like those proven on coding platforms (LeetCode/GitHub)."
    ]
    for i, pt in enumerate(points1):
        p = tf1.paragraphs[0] if i == 0 else tf1.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Arial"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(12)

    # Card 2: Motivation & Java Relevance
    add_card(s3, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2), "Motivation & Core Java Relevance")
    b2 = s3.shapes.add_textbox(Inches(7.0), Inches(2.2), Inches(5.3), Inches(4.4))
    tf2 = b2.text_frame
    tf2.word_wrap = True
    points2 = [
        "Gamified Urgency Loop: Transform task management from a chore into a high-stakes, time-bounded sprint game.",
        "Object-Oriented Mastery: Encapsulate entity states, build interface-driven services, and utilize JPA callbacks.",
        "Enterprise Spring Boot 2.7: Implement REST APIs, transactional semantics (@Transactional), and custom Stream comparators.",
        "Precision Timestamp Handling: Java 8 LocalDateTime with Jackson @JsonFormat ensuring ISO-8601 bidirectional serialization."
    ]
    for i, pt in enumerate(points2):
        p = tf2.paragraphs[0] if i == 0 else tf2.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Arial"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 4: LITERATURE SURVEY & GAP ANALYSIS
    # ==========================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s4)
    add_header(s4, "Literature Survey & Gap Analysis")

    # Survey Cards
    surveys = [
        ("Todoist & TickTick", "Passive dead reminders; no live per-second urgency timers; zero consequences for overdue tasks."),
        ("Trello / Jira Boards", "Heavy team-centric Kanban workflows; complex configuration; unsuitable for quick personal sprint blocks."),
        ("Forest / Pomodoro Apps", "Isolate focus timers from actionable task descriptions, priority weights, and persistent REST backend entities."),
        ("LeetCode Activity System", "Highly motivating daily squares and streak psychology, but restricted strictly to algorithmic problem submissions.")
    ]
    for i, (tool, lim) in enumerate(surveys):
        left = Inches(0.8 + (i % 2) * 5.9)
        top = Inches(1.6 + (i // 2) * 2.1)
        add_card(s4, left, top, Inches(5.6), Inches(1.9), tool)
        box = s4.shapes.add_textbox(left + Inches(0.2), top + Inches(0.65), Inches(5.2), Inches(1.1))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"Limitation: {lim}"
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED

    # Bottom Summary Banner: Proposed Value Addition
    add_card(s4, Inches(0.8), Inches(5.9), Inches(11.7), Inches(1.1), "Taskity Value Addition", ACCENT_GREEN)
    b_val = s4.shapes.add_textbox(Inches(1.0), Inches(6.3), Inches(11.3), Inches(0.6))
    tf_v = b_val.text_frame
    p_v = tf_v.paragraphs[0]
    p_v.text = "Combines Active Sprint Timers (15m, 30m, 1h) + Real EXP Deductions (-30 to -50 XP) + LeetCode 28-Week Heatmap into a unified Java Spring Boot architecture."
    p_v.font.name = "Arial"
    p_v.font.size = Pt(11.5)
    p_v.font.bold = True
    p_v.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 5: METHODOLOGY & SYSTEM ARCHITECTURE
    # ==========================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s5)
    add_header(s5, "Methodology & Layered Architecture")

    # Layer Cards
    layers = [
        ("Client Tier (React 18 SPA)", "Sprint Form, Ticking Urgency Engine, 28-Week Activity Heatmap, Gamified Confetti Loop.", ACCENT_CYAN),
        ("REST Controller Layer", "TaskController exposing endpoints: /api/tasks (GET, POST, PUT, DELETE, PATCH toggle).", ACCENT_GREEN),
        ("Service Business Layer", "TaskService & TaskServiceImpl with Java 8 Streams priority comparator and validation logic.", ACCENT_AMBER),
        ("Persistence & Database", "TaskRepository extending JpaRepository, Hibernate ORM, and embedded H2 Relational DB.", ACCENT_CYAN)
    ]
    for i, (lname, ldesc, col) in enumerate(layers):
        top = Inches(1.6 + i * 1.3)
        add_card(s5, Inches(0.8), top, Inches(6.0), Inches(1.15), lname, col)
        box = s5.shapes.add_textbox(Inches(1.0), top + Inches(0.55), Inches(5.6), Inches(0.55))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = ldesc
        p.font.name = "Arial"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED

    # Right Card: OOP & Enterprise Features
    add_card(s5, Inches(7.1), Inches(1.6), Inches(5.4), Inches(5.1), "Core Java Technical Implementations")
    r_box = s5.shapes.add_textbox(Inches(7.3), Inches(2.2), Inches(5.0), Inches(4.3))
    tf_r = r_box.text_frame
    tf_r.word_wrap = True
    tech_pts = [
        "Domain Model Encapsulation: Task entity with private attributes, getters/setters, and Priority enum.",
        "Entity Lifecycle Hooks: @PrePersist and @PreUpdate ensuring tamper-proof timestamp management.",
        "Java 8 Stream Sorting: Custom weight comparator prioritizing HIGH > MEDIUM > LOW tasks dynamically.",
        "Jackson Serialization: Configured @JsonFormat(pattern = 'yyyy-MM-ddTHH:mm:ss') for LocalDateTime.",
        "Centralized Error Handling: ResourceNotFoundException mapped to HTTP 404 responses."
    ]
    for i, pt in enumerate(tech_pts):
        p = tf_r.paragraphs[0] if i == 0 else tf_r.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(10)

    # ==========================================
    # SLIDE 6: IMPLEMENTATION & RESULTS
    # ==========================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s6)
    add_header(s6, "Implementation & Practical Results")

    res_cards = [
        ("1. Sprint Presets & Timers", "One-click 15m Sprint, 30m Deep, 1h Power, and EOD options with live countdown calculating Δt = dueDate - now.", ACCENT_CYAN),
        ("2. Real-Time Urgency Visuals", "Color-coded dynamic urgency: Calm (>30m), Warning (10-30m), Critical Sprint (<10m, live seconds), and Overdue.", ACCENT_AMBER),
        ("3. EXP Reward & Penalty Engine", "On-Time: +50 to +75 XP, Confetti burst, streak +1. Overdue: -30 to -50 XP deducted, streak reset to 0. Abandonment: -25 XP.", ACCENT_RED),
        ("4. 28-Week LeetCode Heatmap", "Tracks daily task completions across 28 weeks with 5 emerald intensity levels, daily streak, and active day statistics.", ACCENT_GREEN)
    ]
    for i, (title, text, col) in enumerate(res_cards):
        left = Inches(0.8 + (i % 2) * 5.9)
        top = Inches(1.6 + (i // 2) * 2.3)
        add_card(s6, left, top, Inches(5.6), Inches(2.1), title, col)
        box = s6.shapes.add_textbox(left + Inches(0.2), top + Inches(0.65), Inches(5.2), Inches(1.3))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MAIN

    # Bottom Demo Callout
    add_card(s6, Inches(0.8), Inches(6.3), Inches(11.7), Inches(0.7), "", ACCENT_CYAN)
    demo_box = s6.shapes.add_textbox(Inches(1.0), Inches(6.35), Inches(11.3), Inches(0.5))
    tf_demo = demo_box.text_frame
    p_d = tf_demo.paragraphs[0]
    p_d.text = "LIVE DEMO: Spring Boot REST API (Port 8080) + React Frontend (Port 3000) • 100% Build Success"
    p_d.font.name = "Arial"
    p_d.font.size = Pt(11.5)
    p_d.font.bold = True
    p_d.font.color.rgb = ACCENT_CYAN

    # ==========================================
    # SLIDE 7: CONCLUSION & LEARNING OUTCOMES
    # ==========================================
    s7 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s7)
    add_header(s7, "Conclusion & Technical Learnings")

    # Left: Outcomes & Challenges
    add_card(s7, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Key Outcomes & Challenges Solved")
    l_box = s7.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(5.2), Inches(4.4))
    tf_l = l_box.text_frame
    tf_l.word_wrap = True
    concl_pts = [
        "End-to-End Full Stack Deployment: Resilient decoupled architecture bridging Java Spring Boot and React 18.",
        "Jackson Date Serialization: Resolved LocalDateTime array mismatch using @JsonFormat and ISO-8601 strings.",
        "Zero-Exploit State Guard: Enforced floor boundaries (Math.max(0, focusXP - penalty)) preventing negative XP loops.",
        "Responsive Matrix Track: Built an auto-spacing 28-week matrix preventing month label overlap on various screen sizes."
    ]
    for i, pt in enumerate(concl_pts):
        p = tf_l.paragraphs[0] if i == 0 else tf_l.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(12)

    # Right: Concepts Learned
    add_card(s7, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2), "Core Competencies Mastered")
    r_cbox = s7.shapes.add_textbox(Inches(7.0), Inches(2.2), Inches(5.3), Inches(4.4))
    tf_rc = r_cbox.text_frame
    tf_rc.word_wrap = True
    skills = [
        "Spring Boot Enterprise Architecture: Controllers, Service contracts, and JpaRepository interfaces.",
        "Database Transaction Management: Atomic database operations using @Transactional annotations.",
        "Full-Stack State Synchronization: Synchronizing local storage caching with remote backend REST entities.",
        "Behavioral Software Engineering: Translating psychological urgency models into reactive UI animations."
    ]
    for i, pt in enumerate(skills):
        p = tf_rc.paragraphs[0] if i == 0 else tf_rc.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 8: SDG MAPPING
    # ==========================================
    s8 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s8)
    add_header(s8, "Sustainable Development Goals (SDG) Mapping")

    sdg_items = [
        ("SDG 4: Quality Education", "Strengthens student focus, discipline, and systematic habit formation through structured coding sprints and open educational Java architecture.", ACCENT_CYAN),
        ("SDG 8: Decent Work & Economic Growth", "Improves engineering labor productivity, reduces procrastination in project delivery, and builds enterprise-grade Java employability skills.", ACCENT_GREEN),
        ("SDG 9: Industry, Innovation & Infrastructure", "Demonstrates innovative full-stack software practices combining enterprise Java backend stability with reactive, modern frontend engines.", ACCENT_AMBER),
        ("SDG 3: Good Health and Well-Being", "Directly reduces cognitive overload, burnout, and acute deadline stress by transforming overwhelming goals into bite-sized time intervals.", ACCENT_RED)
    ]
    for i, (title, desc, col) in enumerate(sdg_items):
        top = Inches(1.6 + i * 1.3)
        add_card(s8, Inches(0.8), top, Inches(11.7), Inches(1.15), title, col)
        box = s8.shapes.add_textbox(Inches(1.0), top + Inches(0.55), Inches(11.3), Inches(0.55))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.name = "Arial"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 9: REFERENCES
    # ==========================================
    s9 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s9)
    add_header(s9, "References (Arranged by Latest Year)")

    refs = [
        ("Walls, C. (2026)", "Spring Boot in Action: Enterprise Java Microservices and REST APIs (6th Edition). Manning Publications, NY, pp. 45–182.", "https://www.manning.com/books/spring-boot-in-action"),
        ("Bauer, C., King, G., & Gregory, G. (2025)", "Java Persistence with Spring Data and Hibernate. Manning Publications, NY, pp. 112–245.", "https://hibernate.org/orm/documentation/"),
        ("Oracle Corporation (2025)", "Java Platform Standard Edition Documentation – java.time Package Specification. Oracle Technical Network.", "https://docs.oracle.com/en/java/javase/17/docs/api/"),
        ("Spring Framework Team (2024)", "Spring Data JPA Reference Documentation. VMware Tanzu Documentation Library.", "https://docs.spring.io/spring-data/jpa/reference/"),
        ("Meta Open Source (2024)", "React Documentation – Hooks, Lifecycle, and State Management. Meta Platforms Inc.", "https://react.dev/reference/react"),
        ("United Nations (2023)", "The 17 Goals for Sustainable Development. United Nations Department of Economic and Social Affairs.", "https://sdgs.un.org/goals")
    ]
    for i, (author, cite, link) in enumerate(refs):
        top = Inches(1.6 + i * 0.9)
        add_card(s9, Inches(0.8), top, Inches(11.7), Inches(0.8))
        box = s9.shapes.add_textbox(Inches(1.0), top + Inches(0.08), Inches(11.3), Inches(0.65))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{author} – {cite}  [{link}]"
        p.font.name = "Arial"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 10: THANK YOU
    # ==========================================
    s10 = prs.slides.add_slide(blank_slide_layout)
    apply_bg(s10)

    t_box = s10.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(11.7), Inches(3.0))
    tf10 = t_box.text_frame
    tf10.word_wrap = True

    p1 = tf10.paragraphs[0]
    p1.text = "THANK YOU!"
    p1.alignment = PP_ALIGN.CENTER
    p1.font.name = "Arial"
    p1.font.size = Pt(46)
    p1.font.bold = True
    p1.font.color.rgb = ACCENT_CYAN

    p2 = tf10.add_paragraph()
    p2.text = "TASKITY // GAMIFIED SPRINT TASK ARCHITECTURE"
    p2.alignment = PP_ALIGN.CENTER
    p2.font.name = "Arial"
    p2.font.size = Pt(16)
    p2.font.bold = True
    p2.font.color.rgb = ACCENT_GREEN

    p3 = tf10.add_paragraph()
    p3.text = "Questions, Feedback & Live Demonstration"
    p3.alignment = PP_ALIGN.CENTER
    p3.font.name = "Arial"
    p3.font.size = Pt(14)
    p3.font.color.rgb = TEXT_MUTED

    output_path = r"c:\Users\amruj\OneDrive\Desktop\Java Project\Taskity_FSJP_Mini_Project_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_deck()
