/* ──────────────────────────────────────────────────
   data.ts – Project and Experience data for Sofia Dimieva
   ────────────────────────────────────────────────── */

export interface ProjectSlide {
    title: string;
    content: string;
    codeSnippet?: string;
    tags?: string[];
}

export interface ProjectWaypoint {
    id: string;
    title: string;
    role?: string;
    place?: string;
    date: string;
    subtitle?: string;
    icon?: string;
    accentColor: string;
    link?: string;
    slides: ProjectSlide[];
}

export const experiences: ProjectWaypoint[] = [
    /* ── 1. EXPERIENCES ─────────────────────────────── */
    {
        id: "exp-optiver",
        title: "Optiver",
        role: "Career Kickstarter",
        place: "Amsterdam, Netherlands",
        date: "April 2026",
        accentColor: "#10b981",
        slides: [
            {
                title: "Overview",
                content:
                    "Developed a Python-based order book application in a team of 3, focused on low-latency data structures and cloud deployment.",
                tags: ["Python", "TCP Sockets", "Protobuf", "AWS", "Distributed Systems"],
            },
            {
                title: "Details",
                content:
                    "Built the networking architecture using TCP sockets and Protobuf for data interchange, and managed deployment and testing across AWS cloud instances.",
            },
        ],
    },
    {
        id: "exp-tu-delft-ta",
        title: "Delft University of Technology",
        role: "Teaching Assistant — Data Analytics",
        place: "Delft, Netherlands",
        date: "Nov 2025 – Present",
        accentColor: "#06b6d4",
        slides: [
            {
                title: "Overview",
                content:
                    "Teaching Assistant for the Data Analytics course at Delft University of Technology, supporting students in statistical methods and machine learning.",
                tags: ["Python", "Data Analytics", "EDA", "Regression", "Clustering", "Machine Learning"],
            },
            {
                title: "Details",
                content:
                    "Guided students through core concepts in data analytics, including exploratory data analysis, regression, classification, clustering, and dimensionality reduction. Evaluated student progress by checking and grading lab assignments and exam submissions.",
            },
        ],
    },
    {
        id: "exp-amazon",
        title: "Amazon",
        role: "Software Engineering Development Intern",
        place: "Madrid, Spain",
        date: "July 2025 – Oct 2025",
        accentColor: "#f59e0b",
        slides: [
            {
                title: "Overview",
                content:
                    "Migrated a legacy SQL service to a serverless AWS backend, provisioning high-availability cloud infrastructure with DynamoDB and automated data backfill.",
                tags: ["AWS Lambda", "DynamoDB", "VPC", "NLB / ALB", "Route 53", "CloudTrail", "Python"],
            },
            {
                title: "Details",
                content:
                    "Migrated a legacy SQL service to a serverless AWS backend, provisioning infrastructure with VPC, NLB/ALB, and Route 53. Implemented DynamoDB with custom CRUD APIs and developed a Python data backfill script. Integrated AWS Lambda with API Gateway for scalable request handling and configured CloudTrail for security auditing.",
            },
        ],
    },
    {
        id: "exp-man-group",
        title: "Man Group",
        role: "Software Engineer Intern",
        place: "Sofia, Bulgaria",
        date: "July 2024 – Sept 2024",
        accentColor: "#0284c7",
        slides: [
            {
                title: "Overview",
                content:
                    "Engineered high-performance web interfaces across a React/TypeScript, HTML/CSS, Java, and Kafka financial stack, focusing on UI latency reduction and accessibility.",
                tags: ["React", "TypeScript", "HTML/CSS", "Java", "Kafka", "SSE", "Web Accessibility"],
            },
            {
                title: "Details",
                content:
                    "Reduced web application latency and significantly enhanced the user interface across a React/TypeScript, HTML/CSS, Java, and Kafka stack. Identified and resolved critical front-end issues, testing existing functionality and ensuring accessible, user-friendly UI components. Implemented targeted SSE optimizations, achieving a 31% increase in tab-switching speed.",
            },
        ],
    },
    {
        id: "exp-union-ent",
        title: "Union Entertainment",
        role: "Web Application Developer",
        place: "Delft, Netherlands",
        date: "April 2024 – June 2024",
        accentColor: "#f43f5e",
        slides: [
            {
                title: "Overview",
                content:
                    "Developed new functionalities and responsive layout transformations for a media web application using React, TypeScript, HTML, and CSS.",
                tags: ["React", "TypeScript", "HTML/CSS", "Django", "OAuth 2.0", "YouTube API"],
            },
            {
                title: "Details",
                content:
                    "Developed new functionalities and responsive layout changes for a web application using a React, TypeScript, HTML, and CSS frontend. Focused heavily on UX/UI design to create an accessible, flawless visual experience across devices. Maintained technical documentation and integrated OAuth 2.0 and YouTube APIs alongside a Django backend.",
            },
        ],
    },
];

/* ── 2. PROJECTS ─────────────────────────────────── */
export const projects: ProjectWaypoint[] = [
    {
        id: "proj-erp",
        title: "Enterprise Resource Planning (ERP)",
        role: "Corporate Management Web Solution",
        place: "Corporate Web Solution",
        date: "June 2026 – Sept 2026",
        accentColor: "#8b5cf6",
        slides: [
            {
                title: "Overview",
                content:
                    "Developed a custom ERP web solution for corporate management using a React/TypeScript frontend and Python backend, featuring accessible data interfaces.",
                tags: ["React", "TypeScript", "Python", "AG Grid", "PostgreSQL", "HTML/CSS", "UX/UI Design"],
            },
            {
                title: "Details",
                content:
                    "Developed a custom ERP web solution for corporate management using a React/TypeScript frontend and Python backend. Built highly interactive and visually accessible data interfaces utilizing AG Grid, custom CSS, and HTML for robust data visualization. Managed system state and data storage seamlessly through a PostgreSQL database architecture, focusing on clean UX/UI and proactive front-end issue resolution.",
            },
        ],
    },
    {
        id: "proj-drone-control",
        title: "Embedded Systems Drone Control",
        role: "Flight Control & Real-Time Software",
        place: "Embedded Systems Lab",
        date: "Feb 2026 – May 2026",
        accentColor: "#06b6d4",
        slides: [
            {
                title: "Overview",
                content:
                    "Programmed flight control and communication software for a drone as part of the Embedded Systems Lab, managing strict timing constraints and hardware-level debugging.",
                tags: ["C / C++", "Embedded Systems", "Real-Time Systems", "Motor Control", "Sensor Processing", "Hardware Debugging"],
            },
            {
                title: "Details",
                content:
                    "Programmed flight control and communication software for a drone as part of the Embedded Systems Lab. Developed real-time tasks for sensor data processing, motor control loops, and PC-to-drone communication, managing strict timing constraints and hardware-level debugging.",
            },
        ],
    },
    {
        id: "proj-dumenitsa",
        title: "Dumenitsa",
        role: "Bulgarian Scrabble Platform",
        place: "Live Web Platform",
        date: "Jan 2026 – Present",
        accentColor: "#ec4899",
        link: "https://dumenitsa.com/",
        slides: [
            {
                title: "Overview",
                content:
                    "Developed and hosted a full-stack, real-time multiplayer web game utilizing React, HTML, and CSS for a responsive frontend and Node.js for the backend. Live at dumenitsa.com.",
                tags: ["React", "Node.js", "WebSockets", "PostgreSQL", "Custom Hooks", "HTML/CSS"],
            },
            {
                title: "Details",
                content:
                    "Developed and hosted a full-stack, real-time multiplayer web game utilizing React, HTML, and CSS for a responsive frontend and Node.js for the backend. Implemented custom React hooks for complex board logic, WebSocket-based synchronization for game state, and a robust word validation database using PostgreSQL.",
            },
        ],
    },
    {
        id: "proj-hiking-app",
        title: "Cross-Platform Hiking App",
        role: "Mobile Geospatial Platform",
        place: "iOS & Android",
        date: "Sep 2025 – Present",
        accentColor: "#14b8a6",
        slides: [
            {
                title: "Overview",
                content:
                    "In a team of 4 developed a cross-platform hiking app (React Native, iOS/Android) with a Spring Boot and PostGIS backend, delivering an offline-first architecture.",
                tags: ["React Native", "Spring Boot", "PostGIS", "iOS / Android", "Offline Maps", "GPS"],
            },
            {
                title: "Details",
                content:
                    "In a team of 4 developed a cross-platform hiking app (React Native, iOS/Android) with a Spring Boot and PostGIS backend. Implemented GPX parsing, spatial queries, and peak detection; built REST APIs for activities, routes, and challenges. Integrated offline maps and live GPS tracking, and contributed to privacy features and anti-cheat validation, delivering a scalable, offline-first architecture with interactive map visualizations.",
            },
        ],
    },
];
