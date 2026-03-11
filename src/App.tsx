import { useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import HeroSection from "./components/HeroSection";
import TimelinePath from "./components/TimelinePath";
import type { WaypointPosition } from "./components/TimelinePath";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [waypoints, setWaypoints] = useState<WaypointPosition[]>([]);
  const [segHeight, setSegHeight] = useState(700);

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleWaypointsReady = useCallback((wps: WaypointPosition[]) => {
    setWaypoints(wps);
  }, []);

  useEffect(() => {
    const update = () => {
      setSegHeight(window.innerWidth < 640 ? 500 : 700);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalHeight = projects.length * segHeight;
  const cardWidth = 420;

  const pathContainerWidth = Math.min(window.innerWidth - 40, 1100);
  const pathOffset = (window.innerWidth - pathContainerWidth) / 2;

  return (
    <main className="relative">
      <HeroSection />

      <section
        className="relative w-full overflow-hidden"
        style={{ height: totalHeight + 200, isolation: "isolate" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <TimelinePath
            waypointCount={projects.length}
            onActiveChange={handleActiveChange}
            onWaypointsReady={handleWaypointsReady}
          />
        </div>

        {waypoints.length > 0 &&
          projects.map((project, i) => {
            const wp = waypoints[i];
            if (!wp) return null;

            const wpScreenX = wp.x + pathOffset;
            const cardLeft = Math.max(
              20,
              Math.min(wpScreenX - cardWidth / 2, window.innerWidth - cardWidth - 20)
            );

            return (
              <div
                key={project.id}
                className="absolute z-20"
                style={{
                  top: wp.y,
                  left: cardLeft,
                  width: cardWidth,
                  transform: "translateY(-50%)",
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={activeIndex === i}
                  index={i}
                />
              </div>
            );
          })}
      </section>

      <footer className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Built with React · GSAP · Tailwind CSS
        </p>
      </footer>
    </main>
  );
}