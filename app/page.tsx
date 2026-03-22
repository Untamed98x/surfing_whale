// app/page.tsx — Server Component, NO "use client"

import { HeroSection } from "./components/sections/HeroSection";
import ProjectSectionWrapper from "./components/sections/ProjectSectionWrapper";
import { CVSection } from "./components/sections/CVSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-[#F8F8FF] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#121212,_#080808)]" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-[#ff6a00] tracking-widest font-mono">
            @SurfingWhale 🐋
          </span>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#project" className="hover:text-white transition-colors">Projects</a>
            <a href="#CV" className="hover:text-white transition-colors">CV</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20">
        <HeroSection />
        <CVSection />
        <ProjectSectionWrapper />
      </div>
    </main>
  );
}