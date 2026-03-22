// app/components/sections/CVSection.tsx
"use client";

import { useEffect, useRef } from "react";

const WORLD_SPLINE_URL =
    "https://prod.spline.design/THsF9tP4tf5zDJud/scene.splinecode";

    const CV_LINK =
    "https://drive.google.com/file/d/123vUTdVxQ9LwOFwezuILq5FezI2nUvFR/view";

    function SplineBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let app: any;
        const loadSpline = async () => {
        const { Application } = await import("@splinetool/runtime");
        if (!canvasRef.current) return;
        app = new Application(canvasRef.current);
        await app.load(WORLD_SPLINE_URL);
        };
        loadSpline();
        return () => {
        if (app) app.dispose?.();
        };
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
        <section
        id="CV"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
        {/* World Spline background */}
        <SplineBackground />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center gap-8 px-4 text-center max-w-2xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full border border-[#ff6a00]/40 bg-[#ff6a00]/10 text-[#ff6a00] text-sm font-mono tracking-widest">
            MY WORK
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Turning Data Into
            <br />
            <span className="bg-gradient-to-r from-[#ff6a00] to-[#ffd500] bg-clip-text text-transparent">
                Something Beautiful
            </span>
            </h2>

            <p className="text-white/60 max-w-lg text-base md:text-lg leading-relaxed">
            From raw numbers to meaningful insights — here's a collection of
            things I've built, explored, and obsessed over. Data analyst by day,
            creative thinker always.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-xl bg-[#ff6a00] text-white font-bold text-lg hover:bg-[#ff8c00] transition-all duration-300"
            >
                Explore My Work →
            </a>
            <a
                href="https://github.com/Untamed98x"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
                GitHub Profile
            </a>
            </div>

            {/* Stats biar keliatan credible */}
            <div className="flex gap-12 mt-8">
            <div className="text-center">
                <div className="text-3xl font-extrabold text-[#ff6a00]">8+</div>
                <div className="text-white/40 text-sm mt-1 font-mono">Projects</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-extrabold text-[#ff6a00]">3+</div>
                <div className="text-white/40 text-sm mt-1 font-mono">Years Exp</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-extrabold text-[#ff6a00]">∞</div>
                <div className="text-white/40 text-sm mt-1 font-mono">Curiosity</div>
            </div>
            </div>
        </div>
        </section>
    );
}