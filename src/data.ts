/* ──────────────────────────────────────────────────
   data.ts  –  Template-driven project data
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
    subtitle: string;
    icon: string;
    accentColor: string;
    slides: ProjectSlide[];
}

/* ── Projects ──────────────────────────────────────── */
// ADD YOUR PROJECTS HERE
export const projects: ProjectWaypoint[] = [
    {
        id: "project-1",
        title: "Your First Project",
        subtitle: "Category · Tech 1 · Tech 2",
        icon: "🚀", // You can use emojis or text
        accentColor: "#06b6d4", // The glow color (e.g., cyan)
        slides: [
            {
                title: "Slide 1 Overview",
                content: "This is a short description of the first slide for this project.",
                tags: ["Tag1", "Tag2"],
            },
            {
                title: "Slide 2 Details",
                content: "You can add more slides to create a carousel of information.",
                // Optional Code Snippet:
                codeSnippet: `const example = "Hello World";\nconsole.log(example);`,
            },
        ],
    },
    {
        id: "project-2",
        title: "Your Second Project",
        subtitle: "Web · React · Tailwind",
        icon: "💻",
        accentColor: "#8b5cf6", // Purple glow
        slides: [
            {
                title: "Overview",
                content: "This is the second project on the timeline.",
                tags: ["React", "TypeScript", "Tailwind"],
            },
        ],
    },
    {
        id: "project-3",
        title: "Your Third Project",
        subtitle: "Category · Tech 1 · Tech 2",
        icon: "🚀", // You can use emojis or text
        accentColor: "#06b6d4", // The glow color (e.g., cyan)
        slides: [
            {
                title: "Slide 1 Overview",
                content: "This is a short description of the first slide for this project.",
                tags: ["Tag1", "Tag2"],
            },
            {
                title: "Slide 2 Details",
                content: "You can add more slides to create a carousel of information.",
                // Optional Code Snippet:
                codeSnippet: `const example = "Hello World";\nconsole.log(example);`,
            },
        ],
    },
    // Add more projects below by copying a block above!
];
