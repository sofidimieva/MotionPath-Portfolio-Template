import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(headingRef.current, {
                yPercent: 60,
                opacity: 0,
                duration: 1.2,
            })
                .from(
                    subtitleRef.current,
                    { yPercent: 40, opacity: 0, duration: 0.9 },
                    "-=0.6"
                )
                .from(
                    taglineRef.current,
                    { yPercent: 30, opacity: 0, duration: 0.8 },
                    "-=0.4"
                )
                .from(
                    decorRef.current,
                    { scale: 0.8, opacity: 0, duration: 1 },
                    "-=0.8"
                );

            // Fade out on scroll
            gsap.to(containerRef.current, {
                opacity: 0,
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
            {/* Background glow orbs */}
            <div
                ref={decorRef}
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <div
                    className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Content */}
            <h1
                ref={headingRef}
                className="relative z-10 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
            >
                <span className="text-gradient">Put Your Name</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>Here</span>
            </h1>

            <p
                ref={subtitleRef}
                className="relative z-10 mt-6 max-w-xl text-lg font-light sm:text-xl"
                style={{ color: "var(--text-secondary)" }}
            >
                Put · Some Tags · Here
            </p>

            <p
                ref={taglineRef}
                className="relative z-10 mt-4 text-sm tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
            >
                Scroll to to see my porjects ↓
            </p>
        </section>
    );
}
