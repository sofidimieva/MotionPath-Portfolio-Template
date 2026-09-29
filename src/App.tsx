import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import HeroSection from "./components/HeroSection";
import TimelinePath from "./components/TimelinePath";
import type { WaypointPosition } from "./components/TimelinePath";
import ProjectCard from "./components/ProjectCard";
import { experiences, projects } from "./data";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type TabType = "experience" | "projects";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("experience");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [waypoints, setWaypoints] = useState<WaypointPosition[]>([]);
  const [segHeight, setSegHeight] = useState(700);
  const [winWidth, setWinWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const timelineSectionRef = useRef<HTMLElement>(null);

  const currentItems = activeTab === "experience" ? experiences : projects;

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleWaypointsReady = useCallback((wps: WaypointPosition[]) => {
    setWaypoints(wps);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setWinWidth(w);
      setSegHeight(w < 640 ? 520 : 700);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setActiveIndex(-1);
    setWaypoints([]);
    
    // Smoothly scroll to the start of the timeline path
    if (timelineSectionRef.current) {
      timelineSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  const totalHeight = currentItems.length * segHeight;
  const cardWidth = Math.min(winWidth - 32, 420);

  const pathContainerWidth = Math.min(winWidth - 40, 1100);
  const pathOffset = (winWidth - pathContainerWidth) / 2;

  return (
    <main className="relative">
      <HeroSection />

      {/* Tab Switcher for Experience & Projects */}
      <div className="relative z-30 flex items-center justify-center gap-3 pt-4 pb-8">
        <button
          onClick={() => handleTabChange("experience")}
          className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "experience"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          Experience
        </button>

        <button
          onClick={() => handleTabChange("projects")}
          className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "projects"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
          }`}
        >
          Projects
        </button>
      </div>

      {/* Motion Path Section */}
      <section
        ref={timelineSectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: totalHeight + 200, isolation: "isolate" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <TimelinePath
            key={activeTab}
            waypointCount={currentItems.length}
            onActiveChange={handleActiveChange}
            onWaypointsReady={handleWaypointsReady}
          />
        </div>

        {waypoints.length > 0 &&
          currentItems.map((item, i) => {
            const wp = waypoints[i];
            if (!wp) return null;

            const wpScreenX = wp.x + pathOffset;
            const cardLeft = Math.max(
              16,
              Math.min(wpScreenX - cardWidth / 2, winWidth - cardWidth - 16)
            );

            return (
              <div
                key={item.id}
                className="absolute z-20"
                style={{
                  top: wp.y,
                  left: cardLeft,
                  width: cardWidth,
                  transform: "translateY(-50%)",
                }}
              >
                <ProjectCard
                  project={item}
                  isActive={activeIndex === i}
                  index={i}
                />
              </div>
            );
          })}
      </section>

      <footer className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Sofia Dimieva · Built with React · GSAP · Tailwind CSS
        </p>
      </footer>
    </main>
  );
}