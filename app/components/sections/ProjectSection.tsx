// app/components/sections/ProjectSection.tsx
"use client";

import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { NotionProject } from "@/app/lib/notion";
import { TIMELINE_DATA } from "@/app/data/timeline";

const ScrollVelocity = dynamic(
    () => import("@/app/components/ScrollVelocity/ScrollVelocity"),
    { ssr: false }
    );

    const CV_LINK =
    "https://drive.google.com/file/d/123vUTdVxQ9LwOFwezuILq5FezI2nUvFR/view";

    interface Props {
    projects: NotionProject[];
    }

    export function ProjectSection({ projects }: Props) {
    return (
        <section className="relative w-full mt-16">
        {/* Divider */}
        <ScrollVelocity
            texts={["My Projects", "Scroll Down", "Data Gardener"]}
            className="text-white bg-black py-2"
        />

        {/* Projects Carousel */}
        <div id="project" className="container mx-auto text-white mt-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#ff6a00] to-[#ffd500] bg-clip-text text-transparent">
                My Projects
            </span>
            </h2>

            {projects.length === 0 ? (
            <p className="text-white/40 text-center py-12">
                No projects yet — add some in Notion!
            </p>
            ) : (
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                className="max-w-2xl mx-auto"
            >
                {projects.map((project) => (
                <SwiperSlide key={project.id}>
                    <div className="flex flex-col items-center pb-12">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="rounded-xl shadow-lg w-full h-64 object-cover hover:opacity-90 transition-opacity"
                        />
                    </a>
                    <h3 className="text-xl font-bold mt-4">{project.title}</h3>
                    <div className="flex gap-2 mt-2 flex-wrap justify-center">
                        {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
            )}

            {/* See CV Button */}
            <div className="flex justify-center mt-8">
            <a
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg border border-[#ff6a00] text-[#ff6a00] font-bold hover:bg-[#ff6a00] hover:text-white transition-all duration-300"
            >
                See My Projects on Drive →
            </a>
            </div>
        </div>
        </section>
    );
}