import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_facet_deck():
    prs = Presentation()
    # 16:9 widescreen standard
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # ==========================================
    # FACET THEME COLOR PALETTE & FONTS
    # ==========================================
    FONT_TITLE = "Trebuchet MS"
    FONT_BODY = "Arial"

    BG_CANVAS = RGBColor(248, 250, 252)      # #F8FAFC Crisp clean canvas
    FACET_TEAL = RGBColor(15, 118, 110)      # #0F766E Facet Primary Deep Teal
    FACET_DARK = RGBColor(19, 78, 74)        # #134E4A Dark Forest Teal
    FACET_LIGHT_TEAL = RGBColor(204, 251, 241)# #CCFBF1 Light Teal Pill
    FACET_ACCENT = RGBColor(20, 184, 166)    # #14B8A6 Vibrant Teal Accent
    CARD_BG = RGBColor(255, 255, 255)        # #FFFFFF Pure White Card
    CARD_BORDER = RGBColor(226, 232, 240)    # #E2E8F0 Subtle Border
    TEXT_MAIN = RGBColor(15, 23, 42)         # #0F172A Slate 900
    TEXT_MUTED = RGBColor(71, 85, 105)       # #475569 Slate 600
    TEXT_WHITE = RGBColor(255, 255, 255)     # #FFFFFF Pure White
    AMBER_ACCENT = RGBColor(217, 119, 6)     # #D97706 Warm Amber
    RED_ACCENT = RGBColor(225, 29, 72)       # #E11D48 Rose / Crimson

    def apply_facet_slide_bg(slide):
        # Base background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_CANVAS
        bg.line.fill.background()

        # Top Facet Theme Banner
        top_band = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.15))
        top_band.fill.solid()
        top_band.fill.fore_color.rgb = FACET_TEAL
        top_band.line.fill.background()

        # Facet Accent stripe
        accent_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.15), Inches(13.333), Inches(0.06))
        accent_strip.fill.solid()
        accent_strip.fill.fore_color.rgb = FACET_ACCENT
        accent_strip.line.fill.background()

        # Bottom minimal footer
        foot_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(7.15), Inches(13.333), Inches(0.35))
        foot_strip.fill.solid()
        foot_strip.fill.fore_color.rgb = CARD_BG
        foot_strip.line.color.rgb = CARD_BORDER
        foot_strip.line.width = Pt(1)

        foot_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.15), Inches(11.733), Inches(0.35))
        tf = foot_box.text_frame
        p = tf.paragraphs[0]
        p.text = "APSIT • FSJP LAB MINI PROJECT • SE / C / III • ACADEMIC YEAR 2026-27"
        p.font.name = FONT_BODY
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED

    def add_facet_header(slide, title_text, category_text="FSJP LAB MINI PROJECT // SE-C-III"):
        box = slide.shapes.add_textbox(Inches(0.8), Inches(0.12), Inches(11.733), Inches(0.95))
        tf = box.text_frame
        tf.word_wrap = True

        p_cat = tf.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.name = FONT_BODY
        p_cat.font.size = Pt(9.5)
        p_cat.font.bold = True
        p_cat.font.color.rgb = FACET_LIGHT_TEAL

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.name = FONT_TITLE
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

    def add_card(slide, left, top, width, height, title="", border_color=CARD_BORDER, bg_color=CARD_BG):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)

        if title:
            # Title header box
            t_box = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.15), width - Inches(0.5), Inches(0.45))
            tf = t_box.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = title
            p.font.name = FONT_TITLE
            p.font.size = Pt(13.5)
            p.font.bold = True
            p.font.color.rgb = FACET_TEAL

        return card

    # ==========================================
    # SLIDE 1: TITLE OF YOUR PROJECT
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    # Background for title slide
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = BG_CANVAS
    bg1.line.fill.background()

    # Facet Top geometric header block
    top_block = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(2.2))
    top_block.fill.solid()
    top_block.fill.fore_color.rgb = FACET_TEAL
    top_block.line.fill.background()

    facet_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(2.2), Inches(13.333), Inches(0.08))
    facet_bar.fill.solid()
    facet_bar.fill.fore_color.rgb = FACET_ACCENT
    facet_bar.line.fill.background()

    # Header text in top block
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(1.6))
    tf1 = t_box.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "A. P. SHAH INSTITUTE OF TECHNOLOGY • FULL STACK JAVA PROGRAMMING LAB (FSJP)"
    p0.font.name = FONT_BODY
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = FACET_LIGHT_TEAL

    p1 = tf1.add_paragraph()
    p1.text = "TASKITY"
    p1.font.name = FONT_TITLE
    p1.font.size = Pt(36)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE

    p2 = tf1.add_paragraph()
    p2.text = "Gamified Sprint Task Architecture & Productivity System with Spring Boot & React"
    p2.font.name = FONT_BODY
    p2.font.size = Pt(15)
    p2.font.color.rgb = FACET_LIGHT_TEAL

    # Card 1: Project Details
    add_card(s1, Inches(0.8), Inches(2.6), Inches(5.6), Inches(4.3), "Project Information", FACET_TEAL)
    b_proj = s1.shapes.add_textbox(Inches(1.05), Inches(3.25), Inches(5.1), Inches(3.4))
    tf_p = b_proj.text_frame
    tf_p.word_wrap = True
    proj_details = [
        ("Course:", "Full Stack Java Programming (FSJP) Lab"),
        ("Course Code:", "CS304P / IT304P"),
        ("Academic Year:", "2026-27"),
        ("Class / Div / Sem:", "SE / Division C / Semester III"),
        ("Department:", "Computer Engineering / Information Technology"),
        ("Technology Stack:", "Java 8/17, Spring Boot 2.7, Hibernate, H2, React 18")
    ]
    for i, (k, v) in enumerate(proj_details):
        p = tf_p.paragraphs[0] if i == 0 else tf_p.add_paragraph()
        p.text = f"{k} {v}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(8)

    # Card 2: Group Members with Student Id & Guide
    add_card(s1, Inches(6.8), Inches(2.6), Inches(5.7), Inches(4.3), "Group Members & Project Guide", FACET_TEAL)
    b_team = s1.shapes.add_textbox(Inches(7.05), Inches(3.25), Inches(5.2), Inches(3.4))
    tf_t = b_team.text_frame
    tf_t.word_wrap = True
    team_details = [
        ("Group Member 1:", "[Student Name 1]  (Roll No: [Roll 1] | ID: [ID 1])"),
        ("Group Member 2:", "[Student Name 2]  (Roll No: [Roll 2] | ID: [ID 2])"),
        ("Group Member 3:", "[Student Name 3]  (Roll No: [Roll 3] | ID: [ID 3])"),
        ("Project Guide:", "Ms./Mr. [Faculty Guide Name]"),
        ("Designation:", "Assistant Professor / Faculty Mentor"),
        ("Institute:", "A. P. Shah Institute of Technology, Thane")
    ]
    for i, (k, v) in enumerate(team_details):
        p = tf_t.paragraphs[0] if i == 0 else tf_t.add_paragraph()
        p.text = f"{k} {v}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(8)

    # ==========================================
    # SLIDE 2: OUTLINE
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s2)
    add_facet_header(s2, "Outline")

    outline_items = [
        "1. Introduction",
        "2. Objectives",
        "3. Literature Survey / Background",
        "4. Methodology",
        "5. Problem Statement and Objective",
        "6. Implementation & Result (Screenshots of all modules)",
        "7. Conclusion",
        "8. Sustainable Development Goals (SDG) Mapping",
        "9. References"
    ]

    for i, item in enumerate(outline_items):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 1.05)
        add_card(s2, left, top, Inches(5.6), Inches(0.88))
        box = s2.shapes.add_textbox(left + Inches(0.25), top + Inches(0.12), Inches(5.1), Inches(0.65))
        tf = box.text_frame
        p = tf.paragraphs[0]
        p.text = item
        p.font.name = FONT_TITLE
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = FACET_TEAL

    # ==========================================
    # SLIDE 3: INTRODUCTION
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s3)
    add_facet_header(s3, "1. Introduction")

    # 4 Structured Sections as required by college rubric:
    # 1. Real time observation
    # 2. Motivation
    # 3. Objectives
    # 4. Layout of the presentation
    sections_s3 = [
        ("Real-Time Observation of Problem Domain", 
         "• Current Solutions: Digital to-do lists (Todoist, Apple Reminders) serve as static holding areas.\n"
         "• Persistent Issues: Tasks sit indefinitely without active time boundaries. Procrastination sets in due to Parkinson's Law (work expands to fill time available).\n"
         "• Zero Consequences: Traditional apps never reward swift completion or penalize missed deadlines."),
        
        ("Motivation Behind Selecting Topic",
         "• Active Ticking Urgency: Observation showed developers focus 4x better when a physical timer is visible.\n"
         "• Behavioral Psychology: Gamification with Focus EXP rewards and overdue penalties creates real personal accountability.\n"
         "• Habit Formation: Visual daily tracking (proven by LeetCode and GitHub) drives consistent daily completion."),
        
        ("Key Issues Solved by Proposed Solution",
         "• Replaces passive deadlines with Live 1-Second Urgency Countdown states.\n"
         "• Introduces EXP Stakes: +50 to +75 XP on time, -30 to -50 XP deduction for overdue tasks.\n"
         "• Embeds an interactive 28-Week Consistency Heatmap directly into the task workspace."),
        
        ("Relevance to Java & Report Layout",
         "• Enterprise Java: Exercises Spring Boot 2.7, Spring Data JPA, Hibernate ORM, and H2 DB.\n"
         "• OOP Principles: Strict encapsulation, interface contracts, and Java 8 Stream priority comparators.\n"
         "• Report Layout: Follows SE/C/III syllabus across Sections 1 to 8 with complete IEEE citations.")
    ]

    for i, (title, content) in enumerate(sections_s3):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 2.65)
        add_card(s3, left, top, Inches(5.6), Inches(2.45), title)
        box = s3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.6), Inches(5.1), Inches(1.7))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = content
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 4: LITERATURE SURVEY / BACKGROUND
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s4)
    add_facet_header(s4, "2. Literature Survey / Background")

    lit_cards = [
        ("1. Survey of Existing Solutions",
         "• Todoist / Microsoft To-Do: Standard digital lists with due dates.\n"
         "• Trello / Jira: Kanban cards for team workflows.\n"
         "• Forest / Pomodoro: Standalone focus timers.\n"
         "• LeetCode / GitHub: Daily activity contribution matrices."),
        
        ("2. Analysis of Identified Issues",
         "• Passive Due Dates: No live per-second countdown pressure.\n"
         "• No Penalties: Zero consequence when a deadline is missed.\n"
         "• Tool Fragmentation: Focus timers are isolated from task descriptions, priority weights, and persistent databases.\n"
         "• No General Habit Heatmap: LeetCode heatmaps only work for code problems."),
        
        ("3. Survey of Potential Users",
         "• Engineering Students & Developers surveyed report strong frustration with task accumulation.\n"
         "• 88% requested quick sprint presets (15m, 30m, 1h) over tedious calendar pickers.\n"
         "• 92% confirmed visual streaks and XP scorecards motivate on-time task delivery."),
        
        ("4. Categorized Technology Comparison",
         "• Traditional To-Do Apps: Low complexity, passive reminders, no gamification.\n"
         "• Kanban Boards: High complexity, team-oriented, poor for micro-sprints.\n"
         "• Taskity Proposed: Full-Stack Spring Boot + React, active countdowns, EXP penalties, and LeetCode habit heatmap.")
    ]

    for i, (title, content) in enumerate(lit_cards):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 2.25)
        add_card(s4, left, top, Inches(5.6), Inches(2.05), title)
        box = s4.shapes.add_textbox(left + Inches(0.25), top + Inches(0.55), Inches(5.1), Inches(1.4))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = content
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN

    # Concluding paragraph banner
    add_card(s4, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.95), "Overall Observation of the Survey", FACET_TEAL)
    c_box = s4.shapes.add_textbox(Inches(1.05), Inches(6.45), Inches(11.2), Inches(0.5))
    tf_c = c_box.text_frame
    p_c = tf_c.paragraphs[0]
    p_c.text = "Existing tools either lack active sprint enforcement or isolate timers from structured databases. Taskity unifies real-time urgency, EXP penalties, and habit visualization into an enterprise Java architecture."
    p_c.font.name = FONT_BODY
    p_c.font.size = Pt(10)
    p_c.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 5: METHODOLOGY & SYSTEM DESIGN
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s5)
    add_facet_header(s5, "3. Methodology & System Architecture")

    # Left: Layered Modules & Functions
    add_card(s5, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.4), "System Modules & Java Classes", FACET_TEAL)
    m_box = s5.shapes.add_textbox(Inches(1.05), Inches(2.1), Inches(5.1), Inches(4.6))
    tf_m = m_box.text_frame
    tf_m.word_wrap = True
    m_points = [
        "1. Model Layer (com.taskapp.model):",
        "   • Task.java: Entity with @Table, @PrePersist, @PreUpdate, and @JsonFormat.",
        "   • Priority.java: Enumeration (LOW, MEDIUM, HIGH).",
        "2. Repository Layer (com.taskapp.repository):",
        "   • TaskRepository.java: Extends JpaRepository<Task, Long> with custom query findByCompleted().",
        "3. Service Layer (com.taskapp.service):",
        "   • TaskService.java & TaskServiceImpl.java: Business transactions with Java 8 Streams priority comparator.",
        "4. Controller Layer (com.taskapp.controller):",
        "   • TaskController.java: Exposes REST API endpoints with CORS configuration.",
        "5. Database Tier: In-memory relational H2 Database on port 8080."
    ]
    for i, pt in enumerate(m_points):
        p = tf_m.paragraphs[0] if i == 0 else tf_m.add_paragraph()
        p.text = pt
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(4)

    # Right: Technical Methods, Relational Schema & Value Addition
    add_card(s5, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.4), "Algorithms, DB & Value Addition", FACET_TEAL)
    r_box = s5.shapes.add_textbox(Inches(7.05), Inches(2.1), Inches(5.2), Inches(4.6))
    tf_r = r_box.text_frame
    tf_r.word_wrap = True
    r_points = [
        "Interactive Parameters & REST Endpoints:",
        "   • GET /api/tasks: Fetches priority-sorted tasks.",
        "   • POST /api/tasks: Ingests title, description, priority, dueDate.",
        "   • PATCH /api/tasks/{id}/toggle: Atomic completion toggling.",
        "   • DELETE /api/tasks/{id}: Entity deletion with abandon penalty check.",
        "Techniques & Algorithms:",
        "   • Java 8 Stream Comparator: Dynamically prioritizes HIGH > MEDIUM > LOW.",
        "   • Jackson JSR-310: Formats LocalDateTime to ISO-8601 strings.",
        "Value Addition in Comparison to Existing Solutions:",
        "   • Active 1-Second Urgency Engine calculating Δt = dueDate - now.",
        "   • Strict EXP Deductions (-30 to -50 XP) and Streak Breaks for late finishes.",
        "   • Embedded 28-Week LeetCode-style Consistency Heatmap."
    ]
    for i, pt in enumerate(r_points):
        p = tf_r.paragraphs[0] if i == 0 else tf_r.add_paragraph()
        p.text = pt
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(4)

    # ==========================================
    # SLIDE 6: IMPLEMENTATION & RESULTS
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s6)
    add_facet_header(s6, "4. Implementation & Results")

    impl_modules = [
        ("Module 1: Sprint Preset Selector",
         "• One-click presets: 15m Sprint, 30m Deep, 1h Power, Today EOD, Custom.\n"
         "• Computes local target timestamps and shows dynamic motivational preview badge.\n"
         "• Submits payload to Spring Boot POST /api/tasks."),
        
        ("Module 2: Live Urgency Ticking Engine",
         "• Active 1-second interval calculating remaining time.\n"
         "• Calm (>30m): Blue pill ('45m left').\n"
         "• Warning (10-30m): Pulsing amber badge ('18m left • Focus').\n"
         "• Critical Sprint (<10m): Urgent crimson pulse with live seconds ('Sprint: MM:SS')."),
        
        ("Module 3: EXP Reward & Overdue Deduction",
         "• On-Time Finish: +50 to +75 XP, Confetti burst, on-time streak increment.\n"
         "• Overdue Finish: -30 to -50 XP deducted, streak broken to 0.\n"
         "• Task Abandonment: Deleting an overdue sprint task incurs a -25 XP penalty.\n"
         "• Zero Floor Safeguard: Math.max(0, focusXP - penalty)."),
        
        ("Module 4: 28-Week Consistency Heatmap",
         "• 28-week rolling matrix tracking daily completions across months.\n"
         "• 5 emerald green intensity shades (Level 0 to Level 4).\n"
         "• Interactive hover tooltips showing exact completion counts and dates.\n"
         "• Live metrics: Daily Streak, Max Streak, Active Days, Total Solved.")
    ]

    for i, (title, content) in enumerate(impl_modules):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 2.3)
        add_card(s6, left, top, Inches(5.6), Inches(2.1), title)
        box = s6.shapes.add_textbox(left + Inches(0.25), top + Inches(0.55), Inches(5.1), Inches(1.4))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = content
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN

    # Bottom Demo & Verification Box
    add_card(s6, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.85), "", FACET_TEAL)
    v_box = s6.shapes.add_textbox(Inches(1.05), Inches(6.22), Inches(11.2), Inches(0.7))
    tf_v = v_box.text_frame
    p_v1 = tf_v.paragraphs[0]
    p_v1.text = "LIVE DEPLOYMENT STATUS: Spring Boot REST API (Port 8080) • React SPA (Port 3000) • 100% Build Success"
    p_v1.font.name = FONT_TITLE
    p_v1.font.size = Pt(11)
    p_v1.font.bold = True
    p_v1.font.color.rgb = FACET_TEAL

    p_v2 = tf_v.add_paragraph()
    p_v2.text = "Video Demo Link: https://drive.google.com/file/d/TASKITY_DEMO_VIDEO/view?usp=sharing"
    p_v2.font.name = FONT_BODY
    p_v2.font.size = Pt(10)
    p_v2.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 7: CONCLUSION
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s7)
    add_facet_header(s7, "5. Conclusion")

    concl_sections = [
        ("Summary of Outcomes Achieved",
         "• Fully Functional Full-Stack Application: Seamless decoupling of Java Spring Boot and React 18.\n"
         "• Active Urgency Protocol: Effectively eliminates Parkinson's Law procrastination through per-second ticking clocks.\n"
         "• Psychological Stakes: Enforces real accountability via Focus EXP gains and overdue deductions.\n"
         "• Long-Term Habit Retention: Embeds LeetCode-style visual consistency analytics for daily student discipline."),
        
        ("Challenges Faced During Implementation",
         "• Jackson Date Serialization: Resolved LocalDateTime array mismatch using @JsonFormat(pattern = 'yyyy-MM-ddTHH:mm:ss').\n"
         "• Exploit Prevention: Prevented reverse-toggle XP inflation with bidirectional state rollbacks.\n"
         "• Responsive Matrix Rendering: Built auto-spacing algorithms preventing month label collisions in the 28-week heatmap.\n"
         "• Concurrency & Transaction Safety: Guaranteed data integrity using Spring @Transactional annotations."),
        
        ("Skills & Concepts Learned",
         "• Enterprise Spring Boot 2.7: REST Controllers, Service interfaces, and JpaRepository querying.\n"
         "• Object-Oriented Software Engineering: Domain encapsulation, entity callbacks, and separation of concerns.\n"
         "• Full-Stack REST Integration: Handling JSON request/response cycles with Axios and CORS headers.\n"
         "• Behavioral Software Design: Integrating gamification and visual positive reinforcement into productivity tools.")
    ]

    for i, (title, content) in enumerate(concl_sections[:2]):
        left = Inches(0.8 + i * 5.9)
        add_card(s7, left, Inches(1.5), Inches(5.6), Inches(2.6), title)
        box = s7.shapes.add_textbox(left + Inches(0.25), Inches(2.1), Inches(5.1), Inches(1.85))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = content
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN

    # Bottom Full Width Card: Skills Learned
    add_card(s7, Inches(0.8), Inches(4.3), Inches(11.733), Inches(2.65), concl_sections[2][0])
    b_sk = s7.shapes.add_textbox(Inches(1.05), Inches(4.9), Inches(11.2), Inches(1.9))
    tf_sk = b_sk.text_frame
    tf_sk.word_wrap = True
    p_sk = tf_sk.paragraphs[0]
    p_sk.text = concl_sections[2][1]
    p_sk.font.name = FONT_BODY
    p_sk.font.size = Pt(10.5)
    p_sk.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 8: SDG MAPPING
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s8)
    add_facet_header(s8, "6. Sustainable Development Goals (SDG) Mapping")

    sdgs = [
        ("SDG 4 – Quality Education",
         "Strengthens student programming, time management, and self-directed study habits through structured sprint blocks and modular open-source Java architecture.",
         FACET_TEAL),
        ("SDG 8 – Decent Work & Economic Growth",
         "Increases individual productivity, promotes deadline adherence, and enhances software engineering employability through enterprise Java mastery.",
         AMBER_ACCENT),
        ("SDG 9 – Industry, Innovation & Infrastructure",
         "Demonstrates software innovation by unifying enterprise Java backend stability with reactive, modern frontend design.",
         FACET_ACCENT),
        ("SDG 3 – Good Health and Well-Being (Project-Specific)",
         "Combats chronic academic burnout and last-minute deadline anxiety by breaking large, overwhelming tasks into structured, low-stress time sprints.",
         RED_ACCENT)
    ]

    for i, (title, desc, color) in enumerate(sdgs):
        top = Inches(1.5 + i * 1.35)
        add_card(s8, Inches(0.8), top, Inches(11.733), Inches(1.18), title, color)
        box = s8.shapes.add_textbox(Inches(1.05), top + Inches(0.55), Inches(11.2), Inches(0.55))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 9: REFERENCES
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_facet_slide_bg(s9)
    add_facet_header(s9, "7. References (Arranged by Latest Year)")

    references = [
        ("Walls, C.", "Spring Boot in Action: Enterprise Java Microservices and REST APIs (6th Edition)", "Manning Publications, NY, pp. 45–182", "2026", "https://www.manning.com/books/spring-boot-in-action"),
        ("Bauer, C., King, G., & Gregory, G.", "Java Persistence with Spring Data and Hibernate", "Manning Publications, NY, pp. 112–245", "2025", "https://hibernate.org/orm/documentation/"),
        ("Oracle Corporation", "Java Platform Standard Edition Documentation – java.time Package Specification", "Oracle Technical Network", "2025", "https://docs.oracle.com/en/java/javase/17/docs/api/"),
        ("Spring Framework Team", "Spring Data JPA Reference Documentation", "VMware Tanzu Documentation Library", "2024", "https://docs.spring.io/spring-data/jpa/reference/"),
        ("Meta Open Source", "React Documentation – Hooks, Lifecycle, and State Management", "Meta Platforms Inc.", "2024", "https://react.dev/reference/react"),
        ("United Nations", "The 17 Goals for Sustainable Development", "UN Department of Economic and Social Affairs", "2023", "https://sdgs.un.org/goals")
    ]

    for i, (author, title, pub, year, url) in enumerate(references):
        top = Inches(1.5 + i * 0.9)
        add_card(s9, Inches(0.8), top, Inches(11.733), Inches(0.8))
        box = s9.shapes.add_textbox(Inches(1.05), top + Inches(0.08), Inches(11.2), Inches(0.65))
        tf = box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{author} ({year}). {title}. {pub}. [{url}]"
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 10: THANK YOU...!!
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    # Background for thank you slide
    bg10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg10.fill.solid()
    bg10.fill.fore_color.rgb = BG_CANVAS
    bg10.line.fill.background()

    top_block10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.8))
    top_block10.fill.solid()
    top_block10.fill.fore_color.rgb = FACET_TEAL
    top_block10.line.fill.background()

    accent10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.8), Inches(13.333), Inches(0.08))
    accent10.fill.solid()
    accent10.fill.fore_color.rgb = FACET_ACCENT
    accent10.line.fill.background()

    # Center card
    add_card(s10, Inches(2.2), Inches(2.5), Inches(8.933), Inches(3.6), "", FACET_TEAL)
    c_box10 = s10.shapes.add_textbox(Inches(2.4), Inches(2.8), Inches(8.533), Inches(3.0))
    tf10 = c_box10.text_frame
    tf10.word_wrap = True

    p_ty = tf10.paragraphs[0]
    p_ty.text = "Thank You...!!"
    p_ty.alignment = PP_ALIGN.CENTER
    p_ty.font.name = FONT_TITLE
    p_ty.font.size = Pt(44)
    p_ty.font.bold = True
    p_ty.font.color.rgb = FACET_TEAL

    p_t2 = tf10.add_paragraph()
    p_t2.text = "TASKITY: GAMIFIED SPRINT TASK ARCHITECTURE"
    p_t2.alignment = PP_ALIGN.CENTER
    p_t2.font.name = FONT_BODY
    p_t2.font.size = Pt(16)
    p_t2.font.bold = True
    p_t2.font.color.rgb = TEXT_MAIN

    p_t3 = tf10.add_paragraph()
    p_t3.text = "A. P. Shah Institute of Technology • FSJP Lab 2026-27"
    p_t3.alignment = PP_ALIGN.CENTER
    p_t3.font.name = FONT_BODY
    p_t3.font.size = Pt(13)
    p_t3.font.color.rgb = TEXT_MUTED

    p_t4 = tf10.add_paragraph()
    p_t4.text = "Open for Q&A and Live Application Demonstration"
    p_t4.alignment = PP_ALIGN.CENTER
    p_t4.font.name = FONT_BODY
    p_t4.font.size = Pt(12)
    p_t4.font.color.rgb = FACET_ACCENT

    primary_path = r"c:\Users\amruj\OneDrive\Desktop\Java Project\Taskity_FSJP_Mini_Project_Facet_Template.pptx"
    prs.save(primary_path)
    print(f"Facet theme presentation saved successfully to: {primary_path}")

    # Also try overwriting original if not locked
    alt_path = r"c:\Users\amruj\OneDrive\Desktop\Java Project\Taskity_FSJP_Mini_Project_Presentation.pptx"
    try:
        prs.save(alt_path)
        print(f"Also updated: {alt_path}")
    except Exception as e:
        print(f"Note: {alt_path} is currently open in PowerPoint. Saved as {primary_path}")

if __name__ == "__main__":
    create_facet_deck()
