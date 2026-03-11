import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ProjectWaypoint } from "../data";

interface Props {
    project: ProjectWaypoint;
    isActive: boolean;
    index: number;
}

export default function ProjectCard({ project, isActive }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const total = project.slides.length;
    const isAnimating = useRef(false);

    useGSAP(
        () => {
            gsap.to(cardRef.current, {
                opacity: isActive ? 1 : 0.2,
                scale: isActive ? 1 : 0.96,
                duration: 0.6,
                ease: "power2.out",
            });
        },
        { dependencies: [isActive], scope: cardRef }
    );

    const goTo = useCallback(
        (next: number) => {
            if (isAnimating.current || next === current) return;
            isAnimating.current = true;

            const slides = slidesRef.current;
            if (!slides) return;

            const children = slides.children;
            const dir = next > current ? 1 : -1;

            const outSlide = children[current] as HTMLElement;
            const inSlide = children[next] as HTMLElement;

            gsap.set(inSlide, { xPercent: dir * 100, opacity: 0, display: "block" });

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false;
                    setCurrent(next);
                },
            });

            tl.to(outSlide, {
                xPercent: -dir * 100,
                opacity: 0,
                duration: 0.45,
                ease: "power2.inOut",
            }).to(
                inSlide,
                {
                    xPercent: 0,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power2.inOut",
                },
                "<"
            );
        },
        [current]
    );

    const prev = () => goTo((current - 1 + total) % total);
    const next = () => goTo((current + 1) % total);

    return (
        <div
            ref={cardRef}
            className="glass-card relative w-full p-6 sm:p-8"
            style={{
                opacity: 0.2,
                background: isActive ? "var(--bg-secondary)" : undefined,
                willChange: "transform, opacity, background-color",
                boxShadow: isActive
                    ? `0 0 30px ${project.accentColor}40, 0 0 80px ${project.accentColor}15`
                    : "none",
                borderColor: isActive ? `${project.accentColor}50` : undefined,
                transition: "box-shadow 0.6s ease, border-color 0.6s ease",
            }}
        >
            <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{project.icon}</span>
                <div>
                    <h3
                        className="text-xl font-semibold"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {project.subtitle}
                    </p>
                </div>
            </div>

            <div className="mb-4 flex items-center gap-2">
                {project.slides.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                            width: i === current ? "2rem" : "0.375rem",
                            background:
                                i === current ? project.accentColor : "var(--text-muted)",
                            opacity: i === current ? 1 : 0.4,
                        }}
                        aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    />
                ))}
            </div>

            <div className="relative overflow-hidden" style={{ minHeight: "220px" }}>
                <div ref={slidesRef}>
                    {project.slides.map((s, i) => (
                        <div
                            key={i}
                            className="top-0 left-0 w-full"
                            style={{
                                position: i === 0 ? "relative" : "absolute",
                                display: i === 0 ? "block" : "none",
                                opacity: i === 0 ? 1 : 0,
                                willChange: "transform, opacity",
                            }}
                        >
                            <h4
                                className="mb-2 text-base font-medium tracking-wide uppercase"
                                style={{ color: project.accentColor }}
                            >
                                {s.title}
                            </h4>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {s.content}
                            </p>
                            {s.codeSnippet && (
                                <pre
                                    className="mt-3 overflow-x-auto rounded-lg p-3 text-xs leading-snug"
                                    style={{
                                        background: "rgba(0,0,0,0.5)",
                                        color: "var(--accent)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <code>{s.codeSnippet}</code>
                                </pre>
                            )}
                            {s.tags && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {s.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            style={{
                                                background: "var(--accent-soft)",
                                                color: project.accentColor,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
                <button
                    onClick={prev}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                    style={{
                        background: "var(--accent-soft)",
                        color: project.accentColor,
                    }}
                    aria-label="Previous slide"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <span
                    className="text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                >
                    {current + 1} / {total}
                </span>

                <button
                    onClick={next}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                    style={{
                        background: "var(--accent-soft)",
                        color: project.accentColor,
                    }}
                    aria-label="Next slide"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 6 15 12 9 18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
