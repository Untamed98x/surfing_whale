// app/components/sections/HeroSection.tsx
"use client";

import dynamic from "next/dynamic";
import RotatingText from "@/app/components/RotatingText/RotatingText";

const Lanyard = dynamic(() => import("@/app/components/Lanyard/Lanyard"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />
    ),
    });

    export function HeroSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen items-center">
        {/* Lanyard 3D */}
        <div className="flex justify-center">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 px-4 py-8">
            {/* Badge */}
            <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl text-[#F8F8FF] font-bold">
                Hello to my Portfolio Project for,!
            </h1>
            <RotatingText
                texts={[
                "A Data Gardener",
                "Visual Catcher",
                "Logic Weaver",
                "Python Coders!",
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

            {/* Name */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#F8F8FF]">
            My Name is Muhammad Fauzy
            </h2>

            {/* Bio */}
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
            With a background in Accounting and a passion for the arts—especially
            photography—I see data not just as numbers, but as stories waiting to
            grow. My journey from banking to becoming a data gardener has been
            shaped by a strong interest in analysis, visualization, and meaningful
            insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
                href="https://wa.me/6285156964766?text=Hello%2C%20aku%20dari%20potfolanalyst%20Fauzy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg border border-[#ff6a00] text-[#ff6a00] font-bold hover:bg-[#ff6a00] hover:text-white transition-all duration-300 text-center"
            >
                Contact Me!
            </a>
            <a
                href="https://www.linkedin.com/in/muhammad-fauzy-741943203"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300 text-center"
            >
                Connect on LinkedIn!
            </a>
            </div>
        </div>
        </section>
    );
    }