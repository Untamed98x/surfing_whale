// app/components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import RotatingText from "@/app/components/RotatingText/RotatingText";

const SPLINE_URL = "https://prod.spline.design/KnELqG36W-4ava1q/scene.splinecode";

function SplineCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let app: any;
        const load = async () => {
        const { Application } = await import("@splinetool/runtime");
        if (!canvasRef.current) return;
        app = new Application(canvasRef.current);
        await app.load(SPLINE_URL);
        };
        load();
        return () => { if (app) app.dispose?.(); };
    }, []);
    return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />;
    }

    function AnimatedName() {
    const name1 = "MUHAMMAD";
    const name2 = "FAUZY_";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="leading-[0.85] tracking-tight overflow-hidden">
        <div className="flex flex-wrap overflow-hidden">
            {name1.split("").map((char, i) => (
            <span
                key={i}
                // text-4xl mobile, text-6xl tablet, text-8xl desktop
                className="text-[clamp(2.5rem,10vw,5rem)] font-black text-[#F8F8FF] transition-all duration-500"
                style={{
                transform: visible ? "translateY(0)" : "translateY(100%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 40}ms`,
                display: "inline-block",
                }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
            ))}
        </div>
        <div className="flex flex-wrap overflow-hidden">
            {name2.split("").map((char, i) => (
            <span
                key={i}
                className="text-[clamp(2.5rem,10vw,5rem)] font-black text-[#ff6a00] transition-all duration-500"
                style={{
                transform: visible ? "translateY(0)" : "translateY(100%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${(name1.length + i) * 40 + 100}ms`,
                display: "inline-block",
                }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
            ))}
        </div>
        </div>
    );
    }

    export function HeroSection() {
    return (
        <section className="w-full overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-48px)] items-center">

            {/* Spline 3D — lebih kecil di mobile */}
            <div className="w-full h-[280px] md:h-[480px] rounded-sm overflow-hidden border border-white/[0.04] order-1 md:order-none">
            <SplineCanvas />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4 md:gap-5 pl-0 md:pl-8 order-2 md:order-none pb-8 md:pb-0">

            {/* Label */}
            <div className="inline-flex">
                <span className="font-mono text-[10px] md:text-xs text-[#ff6a00] tracking-[0.3em] uppercase border border-[#ff6a00]/30 px-3 py-1 rounded-sm bg-[#ff6a00]/5">
                [ DATA_GARDENER ]
                </span>
            </div>

            {/* Animated name */}
            <AnimatedName />

            {/* Rotating badge */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-white/30 tracking-widest">I AM A</span>
                <RotatingText
                texts={["DATA_GARDENER", "VISUAL_CATCHER", "LOGIC_WEAVER", "PYTHON_CODER"]}
                mainClassName="px-2 py-1 bg-[#ff6a00]/10 border border-[#ff6a00]/30 text-[#ff6a00] justify-center rounded-sm text-xs font-mono font-bold inline-flex overflow-hidden tracking-widest"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                />
            </div>

            {/* Bio */}
            <p className="text-sm text-white/50 leading-relaxed max-w-sm border-l-2 border-[#ff6a00]/30 pl-4">
                With a background in Accounting and a passion for photography,
                I see data not just as numbers, but as stories waiting to grow.
                Analytical, yet artistic.
            </p>

            {/* Mini stats */}
            <div className="flex gap-6 md:gap-8 py-3 border-y border-white/[0.06]">
                {[
                { val: "8+", label: "Projects" },
                { val: "3+", label: "Years_Exp" },
                { val: "∞", label: "Curiosity" },
                ].map((s) => (
                <div key={s.label}>
                    <div className="font-mono text-xl md:text-2xl font-black text-[#ff6a00]">{s.val}</div>
                    <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-0.5">{s.label}</div>
                </div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 mt-1 flex-wrap">
                <a
                href="https://wa.me/6285156964766?text=Hello%2C%20aku%20dari%20portfolio%20Fauzy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-sm bg-[#ff6a00] text-black font-mono font-bold text-xs tracking-widest hover:bg-[#ffd500] transition-all duration-300 uppercase"
                >
                Initiate_Contact →
                </a>
                <a
                href="https://www.linkedin.com/in/muhammad-fauzy-741943203"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-sm border border-white/10 text-white/60 font-mono font-bold text-xs tracking-widest hover:border-white/30 hover:text-white transition-all duration-300 uppercase"
                >
                View_Archive
                </a>
            </div>
            </div>
        </div>
        </section>
    );
}