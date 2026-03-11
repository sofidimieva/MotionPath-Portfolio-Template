# Portfolio Timeline Template

A high-performance, GSAP-powered scrolling timeline portfolio template built with React, Vite, TypeScript, and Tailwind CSS.

## How to Customize

Here are the key files you need to edit to customize:

1. **Add Your Projects (`src/data.ts`)**
   - This is the main data file. Edit the `projects` array to add your own projects, descriptions, tags, and theme colors. The timeline and cards will adapt automatically.

2. **Update Your Name (`src/components/HeroSection.tsx`)**
   - Open this file to change the large gradient name and the subtitle text at the top of the page.

3. **Change the Scrolling Icon (`src/components/TimelinePath.tsx`)**
   - Around line 230, look for the `<image>` or `<circle>` tag. You can change this to any image (like the current Watergirl sprite), an emoji, or a simple geometric shape to represent your scroll progress on the path.

4. **Update Site Metadata (`index.html` & `public/`)**
   - Open `index.html` to change the `<title>` of the website.
   - Replace the `public/favicon.png` file with your own logo or icon.

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`
