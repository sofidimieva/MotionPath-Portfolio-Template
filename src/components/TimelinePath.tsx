import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export interface WaypointPosition {
  x: number;
  y: number;
}

interface Props {
  waypointCount: number;
  onActiveChange: (index: number) => void;
  onWaypointsReady: (waypoints: WaypointPosition[]) => void;
}

function buildWindingPath(
  count: number,
  width: number,
  segmentHeight: number
) {
  const sideMargin = width * 0.16;
  const leftX = sideMargin;
  const rightX = width - sideMargin;
  const midX = width / 2;

  let d = `M ${midX} 50`;
  const waypoints: WaypointPosition[] = [];

  for (let i = 0; i < count; i++) {
    const goRight = i % 2 === 0;
    const yStart = i * segmentHeight;
    const yMid = yStart + segmentHeight * 0.5;
    const yEnd = yStart + segmentHeight;

    const targetX = goRight ? rightX : leftX;
    const cpOffset = segmentHeight * 0.35;

    d += ` C ${midX} ${yStart + cpOffset}, ${targetX} ${yMid - cpOffset}, ${targetX} ${yMid}`;
    d += ` C ${targetX} ${yMid + cpOffset}, ${midX} ${yEnd - cpOffset}, ${midX} ${yEnd}`;

    waypoints.push({ x: targetX, y: yMid });
  }

  const totalHeight = count * segmentHeight;
  return { d, waypoints, totalHeight };
}

export default function TimelinePath({
  waypointCount,
  onActiveChange,
  onWaypointsReady,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const indicatorRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const [dims, setDims] = useState({ width: 1100, segHeight: 700 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setDims({
        width: Math.min(w - 32, 1100),
        segHeight: w < 640 ? 540 : 700,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { d, waypoints, totalHeight } = buildWindingPath(
    waypointCount,
    dims.width,
    dims.segHeight
  );

  useEffect(() => {
    onWaypointsReady(waypoints);
  }, [dims.width, dims.segHeight, waypointCount, onWaypointsReady]);

  useGSAP(
    () => {
      if (!pathRef.current || !indicatorRef.current) return;

      gsap.to(indicatorRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const segmentSize = 1 / waypointCount;
            const activeIndex = Math.min(
              Math.floor(progress / segmentSize),
              waypointCount - 1
            );
            onActiveChange(Math.max(0, activeIndex));
          },
        },
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        });
      }

      gsap.to(glowRef.current, {
        opacity: 0.35,
        scale: 1.4,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        transformOrigin: "center center",
      });

      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [waypointCount, dims.width, dims.segHeight],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: dims.width, height: totalHeight }}
    >
      <svg
        ref={svgRef}
        width={dims.width}
        height={totalHeight}
        viewBox={`0 0 ${dims.width} ${totalHeight}`}
        fill="none"
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="glow-grad">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track line */}
        <path
          ref={pathRef}
          d={d}
          stroke="var(--border-subtle)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Waypoints */}
        {waypoints.map((wp, i) => (
          <g key={i}>
            <circle
              cx={wp.x}
              cy={wp.y}
              r="10"
              fill="var(--bg-secondary)"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle
              cx={wp.x}
              cy={wp.y}
              r="5"
              fill="var(--accent)"
              opacity="0.8"
            />
          </g>
        ))}

        {/* Glowing aura */}
        <circle
          ref={glowRef}
          r="34"
          fill="url(#glow-grad)"
          opacity="0.65"
          style={{ willChange: "transform, opacity" }}
        />

        {/* Scrolling Motion Icon / Avatar */}
        <g ref={indicatorRef} style={{ willChange: "transform" }}>
          <circle
            r="18"
            fill="var(--bg-secondary)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            style={{
              filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))",
            }}
          />
          <image
            href="/image.png"
            x="-13"
            y="-13"
            width="26"
            height="26"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
}
