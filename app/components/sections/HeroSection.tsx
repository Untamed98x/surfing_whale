// app/components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import RotatingText from "@/app/components/RotatingText/RotatingText";

const SPLINE_URL = "https://prod.spline.design/KnELqG36W-4ava1q/scene.splinecode";

function SplineCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let app: any;
        const loadSpline = async () => {
        const { Application } = await import("@splinetool/runtime");
        if (!canvasRef.current) return;
        app = new Application(canvasRef.current);
        await app.load(SPLINE_URL);
        };
        loadSpline();
        return () => {
        if (app) app.dispose?.();
        };
    }, []);

    return (
        <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
        />
    );
    }

    export function HeroSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen items-center">
        {/* Spline 3D via @splinetool/runtime langsung */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden">
            <SplineCanvas />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 px-4 py-8">
            <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl text-[#F8F8FF] font-bold">Hello, I am a,</h1>
            <RotatingText
                texts={[
                "A Data Gardener",
                "Visual Catcher",
                "Logic Weaver",
                "Python Coder!",
                ]}
                mainClassName="px-3 py-1 bg-[#ff6a00] text-[#F8F8FF] justify-center rounded-lg text-2xl font-bold inline-flex overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-[#F8F8FF]">
            Muhammad Fauzy
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed">
            With a background in Accounting and a passion for photography, I see
            data not just as numbers, but as stories waiting to grow. From banking
            to data gardening — analytical, yet artistic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
                href="https://wa.me/6285156964766?text=Hello%2C%20aku%20dari%20portfolio%20Fauzy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg bg-[#ff6a00] text-white font-bold hover:bg-[#ff8c00] transition-all duration-300 text-center"
            >
                Contact Me! 👋
            </a>
            <a
                href="https://www.linkedin.com/in/muhammad-fauzy-741943203"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300 text-center"
            >
                LinkedIn →
            </a>
            </div>
        </div>
        </section>
    );
    }