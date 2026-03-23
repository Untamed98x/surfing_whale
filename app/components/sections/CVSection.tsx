// app/components/sections/CVSection.tsx
"use client";

import { useEffect, useRef } from "react";

const WORLD_SPLINE_URL = "https://prod.spline.design/THsF9tP4tf5zDJud/scene.splinecode";
const CV_LINK = "https://drive.google.com/file/d/123vUTdVxQ9LwOFwezuILq5FezI2nUvFR/view";

function SplineBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let app: any;
        const load = async () => {
        const { Application } = await import("@splinetool/runtime");
        if (!canvasRef.current) return;
        app = new Application(canvasRef.current);
        await app.load(WORLD_SPLINE_URL);
        };
        load();
        return () => { if (app) app.dispose?.(); };
    }, []);
    return (
        <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
        />
    );
    }

    export function CVSection() {
    return (
        <section id="CV" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden mt-0">
        <SplineBackground />

        {/* Radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_transparent,_#080808_70%)] z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center gap-5 px-4 md:px-6 text-center max-w-3xl mx-auto w-full">

            {/* Label */}
            <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.4em] uppercase border border-[#ff6a00]/20 px-4 py-1.5 bg-[#ff6a00]/5">
            [ DATA_STORIES ]
            </span>

            {/* Headline — clamp biar ga overflow di mobile */}
            <h2 className="font-black leading-[0.9] tracking-tight w-full overflow-hidden">
            <span className="block text-[clamp(2.8rem,12vw,5rem)] text-white">
                NUMBERS
            </span>
            <span className="block text-[clamp(2.2rem,9vw,5rem)] text-[#ff6a00]">
                TELL_STORIES
            </span>
            </h2>

            {/* Sub */}
            <p className="text-white/40 max-w-md text-xs md:text-sm leading-relaxed font-mono">
            From raw numbers to meaningful insights — data analyst by day,
            creative thinker always. Here's what I've built.
            </p>

            {/* Stats — 2x2 grid di mobile, row di desktop */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-6 md:gap-16 py-6 border-y border-white/[0.06] w-full justify-center">
            {[
                { value: "8+", label: "PROJECTS" },
                { value: "3+", label: "YEARS_EXP" },
                { value: "99.9", label: "CURIOSITY_%" },
                { value: "0.02s", label: "RESPONSE" },
            ].map((stat) => (
                <div key={stat.label} className="text-center">
                <div className="font-black text-2xl md:text-4xl text-white">{stat.value}</div>
                <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
            ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-2 w-full flex-wrap justify-center">
            <a
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-sm bg-[#ff6a00] text-black font-mono font-bold text-xs tracking-widest hover:bg-[#ffd500] transition-all duration-300 uppercase"
            >
                Explore_My_Work →
            </a>
            <a
                href="https://github.com/Untamed98x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-sm border border-white/10 text-white/60 font-mono font-bold text-xs tracking-widest hover:border-white/30 hover:text-white transition-all duration-300 uppercase"
            >
                GitHub_Profile
            </a>
            </div>
        </div>
        </section>
    );
}