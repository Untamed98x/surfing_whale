// app/components/sections/ProjectSection.tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { NotionProject } from "@/app/lib/notion";

const ScrollVelocity = dynamic(
    () => import("@/app/components/ScrollVelocity/ScrollVelocity"),
    { ssr: false }
    );

    // Three.js particle background — pure points, no GLB
    function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animId: number;
        let renderer: any, scene: any, camera: any, particles: any;

        const init = async () => {
        const THREE = await import("three");

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);

        // Scene + Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
        camera.position.z = 80;

        // Particles
        const count = 1200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            // Mix orange (#ff6a00) and white particles
            const isOrange = Math.random() > 0.7;
            if (isOrange) {
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.42;
            colors[i * 3 + 2] = 0.0;
            } else {
            const brightness = 0.1 + Math.random() * 0.2;
            colors[i * 3] = brightness;
            colors[i * 3 + 1] = brightness;
            colors[i * 3 + 2] = brightness;
            }
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.6,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });

        particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // Resize handler
        const onResize = () => {
            if (!canvas) return;
            camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        };
        window.addEventListener("resize", onResize);

        // Animate
        let t = 0;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            t += 0.0003;
            particles.rotation.y = t * 0.5;
            particles.rotation.x = t * 0.2;
            renderer.render(scene, camera);
        };
        animate();

        return () => window.removeEventListener("resize", onResize);
        };

        init();

        return () => {
        cancelAnimationFrame(animId);
        if (renderer) renderer.dispose();
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

    interface Props {
    projects: NotionProject[];
    }

    export function ProjectSection({ projects }: Props) {
    return (
        <section className="relative w-full mt-16">

        {/* ScrollVelocity atas — kept original */}
        <ScrollVelocity
            texts={["My Projects", "Scroll Down", "Data Gardener"]}
            className="text-white bg-black py-2"
        />

        {/* Project section dengan Three.js particle background */}
        <div className="relative mt-0 py-16">

            {/* Three.js particles */}
            <ParticleBackground />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#080808]/80 pointer-events-none" />

            {/* Content */}
            <div id="project" className="container mx-auto px-6 relative z-10">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 border-b border-white/[0.06] pb-4">
                <div>
                <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.3em] uppercase">
                    [ SELECTED_WORKS ]
                </span>
                <h2 className="font-black text-4xl md:text-5xl text-white mt-1 tracking-tight">
                    FEATURED_ARCHIVE
                </h2>
                </div>
                <span className="font-mono text-xs text-white/20 tracking-widest hidden md:block">
                {projects.length} PROJECTS
                </span>
            </div>

            {projects.length === 0 ? (
                <p className="text-white/20 text-center py-16 font-mono text-sm tracking-widest">
                // NO_PROJECTS_FOUND — ADD SOME IN NOTION
                </p>
            ) : (
                <>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                    nextEl: ".swiper-next",
                    prevEl: ".swiper-prev",
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={24}
                    slidesPerView={1}
                    className="!pb-12"
                >
                    {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        >
                        <div className="relative overflow-hidden rounded-sm border border-white/[0.06] aspect-video bg-[#0f0f0f]">
                            <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute inset-0 border border-[#ff6a00]/0 group-hover:border-[#ff6a00]/30 transition-all duration-300 rounded-sm" />
                        </div>

                        <div className="mt-3 px-1">
                            <h3 className="font-black text-lg text-white tracking-tight group-hover:text-[#ff6a00] transition-colors duration-300">
                            {project.title.replace(/ /g, "_").toUpperCase()}
                            </h3>
                            <div className="flex gap-2 mt-2 flex-wrap">
                            {project.tags.map((tag) => (
                                <span
                                key={tag}
                                className="font-mono text-[9px] px-2 py-0.5 border border-[#ff6a00]/20 text-[#ff6a00]/60 tracking-widest"
                                >
                                {tag}
                                </span>
                            ))}
                            </div>
                        </div>
                        </a>
                    </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom nav */}
                <div className="flex gap-3 justify-end mt-4">
                    <button className="swiper-prev font-mono text-xs border border-white/10 text-white/40 px-4 py-2 hover:border-[#ff6a00]/30 hover:text-[#ff6a00] transition-all duration-300">
                    ← PREV
                    </button>
                    <button className="swiper-next font-mono text-xs border border-white/10 text-white/40 px-4 py-2 hover:border-[#ff6a00]/30 hover:text-[#ff6a00] transition-all duration-300">
                    NEXT →
                    </button>
                </div>
                </>
            )}
            </div>
        </div>

        {/* ScrollVelocity bawah */}
        <ScrollVelocity
            texts={["My Journey", "About Me", "See My CV"]}
            className="text-white bg-black py-2"
        />
        </section>
    );
    }