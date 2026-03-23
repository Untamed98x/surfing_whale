"use client";
// app/components/sections/SkillsSection.tsx

import { useEffect, useRef, useState } from "react";

const SKILLS = [
    { category: "Data Analysis", items: [
        { name: "Python", level: 90, color: "#ff6a00" },
        { name: "SQL", level: 88, color: "#ff6a00" },
        { name: "Pandas / NumPy", level: 85, color: "#ff6a00" },
        { name: "Scikit-learn", level: 75, color: "#ffd500" },
    ]},
    { category: "Visualization", items: [
        { name: "Tableau", level: 85, color: "#ff6a00" },
        { name: "Matplotlib / Seaborn", level: 80, color: "#ff6a00" },
        { name: "Power BI", level: 70, color: "#ffd500" },
    ]},
    { category: "Engineering", items: [
        { name: "Next.js / React", level: 72, color: "#ff6a00" },
        { name: "PostgreSQL", level: 78, color: "#ff6a00" },
        { name: "Git / GitHub", level: 82, color: "#ffd500" },
    ]},
    ];

    function SkillBar({ name, level, color, animate }: {
    name: string; level: number; color: string; animate: boolean;
    }) {
    return (
        <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-xs text-white/70 tracking-widest uppercase">{name}</span>
            <span className="font-mono text-xs text-white/30">{level}%</span>
        </div>
        <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
                width: animate ? `${level}%` : "0%",
                background: `linear-gradient(90deg, ${color}, #ffd500)`,
                boxShadow: animate ? `0 0 8px ${color}66` : "none",
            }}
            />
        </div>
        </div>
    );
    }

    export function SkillsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
        { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative w-full py-24 bg-[#080808]">
        {/* noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />

        <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="mb-14">
            <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.3em] uppercase">
                [ TECH_STACK ]
            </span>
            <h2 className="font-black text-4xl md:text-5xl text-white mt-1 tracking-tight">
                SKILLS_INDEX
            </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {SKILLS.map((group) => (
                <div key={group.category}
                className="border border-white/[0.06] p-6 rounded-sm bg-white/[0.02]">
                <p className="font-mono text-[10px] text-[#ff6a00]/60 tracking-[0.25em] uppercase mb-6">
                    // {group.category}
                </p>
                {group.items.map((skill) => (
                    <SkillBar key={skill.name} {...skill} animate={animate} />
                ))}
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }