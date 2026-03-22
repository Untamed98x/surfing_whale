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
        <div className="relative z-20 flex flex-col items-center gap-6 px-6 text-center max-w-3xl mx-auto">

            {/* Label */}
            <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.4em] uppercase border border-[#ff6a00]/20 px-4 py-1.5 bg-[#ff6a00]/5">
            [ DATA_STORIES ]
            </span>

            {/* Headline */}
            <h2 className="font-black leading-[0.9] tracking-tight">
            <span className="block text-6xl md:text-8xl text-white">
                NUMBERS
            </span>
            <span className="block text-6xl md:text-8xl text-[#ff6a00]">
                TELL_STORIES
            </span>
            </h2>

            {/* Sub */}
            <p className="text-white/40 max-w-md text-sm md:text-base leading-relaxed font-mono">
            From raw numbers to meaningful insights — data analyst by day,
            creative thinker always. Here's what I've built.
            </p>

            {/* Stats */}
            <div className="flex gap-12 md:gap-20 py-6 border-y border-white/[0.06] w-full justify-center">
            {[
                { value: "8+", label: "PROJECTS" },
                { value: "3+", label: "YEARS_EXP" },
                { value: "99.9", label: "CURIOSITY_%" },
                { value: "0.02s", label: "RESPONSE" },
            ].map((stat) => (
                <div key={stat.label} className="text-center">
                <div className="font-black text-3xl md:text-4xl text-white">{stat.value}</div>
                <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
            ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 mt-2">
            <a
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-sm bg-[#ff6a00] text-black font-mono font-bold text-sm tracking-widest hover:bg-[#ffd500] transition-all duration-300 uppercase"
            >
                Explore_My_Work →
            </a>
            <a
                href="https://github.com/Untamed98x"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-sm border border-white/10 text-white/60 font-mono font-bold text-sm tracking-widest hover:border-white/30 hover:text-white transition-all duration-300 uppercase"
            >
                GitHub_Profile
            </a>
            </div>
        </div>
        </section>
    );
    }