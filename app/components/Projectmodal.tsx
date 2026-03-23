"use client";
// app/components/ProjectModal.tsx

import { useEffect, useState } from "react";
import type { NotionBlock, NotionProject } from "@/app/lib/notion";

interface Props {
    project: NotionProject | null;
    onClose: () => void;
    }

    function BlockRenderer({ block }: { block: NotionBlock }) {
    switch (block.type) {
        case "heading_1":
        return <h1 className="font-black text-2xl text-white mt-6 mb-2 tracking-tight">{block.text}</h1>;
        case "heading_2":
        return <h2 className="font-black text-xl text-white mt-5 mb-2 tracking-tight">{block.text}</h2>;
        case "heading_3":
        return <h3 className="font-bold text-base text-[#ff6a00] mt-4 mb-1 font-mono tracking-widest uppercase">{block.text}</h3>;
        case "paragraph":
        return block.text
            ? <p className="text-white/60 text-sm leading-relaxed mb-3">{block.text}</p>
            : <div className="mb-3" />;
        case "bulleted_list_item":
        return (
            <div className="flex gap-2 mb-1.5">
            <span className="text-[#ff6a00] mt-1 flex-shrink-0">›</span>
            <p className="text-white/60 text-sm leading-relaxed">{block.text}</p>
            </div>
        );
        case "numbered_list_item":
        return (
            <div className="flex gap-2 mb-1.5">
            <span className="text-[#ff6a00]/60 text-xs font-mono mt-1 flex-shrink-0">–</span>
            <p className="text-white/60 text-sm leading-relaxed">{block.text}</p>
            </div>
        );
        case "code":
        return (
            <div className="my-3 rounded-sm overflow-hidden border border-white/[0.06]">
            <div className="bg-white/[0.03] px-3 py-1.5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">{block.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="font-mono text-xs text-[#ff6a00]/80 leading-relaxed whitespace-pre">
                {block.text}
                </code>
            </pre>
            </div>
        );
        case "quote":
        return (
            <blockquote className="border-l-2 border-[#ff6a00]/40 pl-4 my-3">
            <p className="text-white/40 text-sm italic leading-relaxed">{block.text}</p>
            </blockquote>
        );
        case "image":
        return (
            <div className="my-4">
            <img
                src={block.url}
                alt={block.caption ?? ""}
                className="w-full rounded-sm border border-white/[0.06] object-cover"
            />
            {block.caption && (
                <p className="text-white/30 text-xs font-mono text-center mt-2">{block.caption}</p>
            )}
            </div>
        );
        case "divider":
        return <hr className="border-white/[0.06] my-4" />;
        default:
        return null;
    }
    }

    export function ProjectModal({ project, onClose }: Props) {
    const [blocks, setBlocks] = useState<NotionBlock[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!project) return;
        setBlocks([]);
        setLoading(true);
        fetch(`/api/notion/${project.id}`)
        .then((r) => r.json())
        .then((data) => setBlocks(data.blocks ?? []))
        .catch(() => setBlocks([]))
        .finally(() => setLoading(false));
    }, [project]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        if (project) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    if (!project) return null;

    return (
        <>
        {/* Backdrop */}
        <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        />

        {/* Modal panel — slide in from right */}
        <div className="fixed top-0 right-0 z-50 h-full w-full max-w-xl bg-[#0d0d0d] border-l border-white/[0.06] overflow-y-auto flex flex-col">

            {/* Header */}
            <div className="sticky top-0 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/[0.06] px-6 py-4 flex items-start justify-between gap-4 z-10">
            <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-[#ff6a00]/60 tracking-widest uppercase mb-1">
                // project_detail
                </p>
                <h2 className="font-black text-lg text-white tracking-tight truncate">
                {project.title.replace(/ /g, "_").toUpperCase()}
                </h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-[#ff6a00]/20 text-[#ff6a00]/60 tracking-widest">
                    {tag}
                    </span>
                ))}
                </div>
            </div>
            <button
                onClick={onClose}
                className="font-mono text-xs text-white/30 hover:text-white transition-colors flex-shrink-0 mt-1"
            >
                ✕ CLOSE
            </button>
            </div>

            {/* Project image */}
            {project.image && !project.image.includes("placeholder") && (
            <div className="aspect-video w-full overflow-hidden">
                <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                />
            </div>
            )}

            {/* CTA */}
            <div className="px-6 py-4 border-b border-white/[0.06]">
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-mono text-xs py-3 bg-[#ff6a00]/10 border border-[#ff6a00]/30 text-[#ff6a00] hover:bg-[#ff6a00]/20 transition-all duration-300 tracking-widest rounded-sm"
            >
                → OPEN_PROJECT
            </a>
            </div>

            {/* Content */}
            <div className="px-6 py-6 flex-1">
            {loading ? (
                <div className="flex items-center gap-2 py-8">
                <div className="w-1 h-1 bg-[#ff6a00] rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-[#ff6a00] rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-1 h-1 bg-[#ff6a00] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="font-mono text-xs text-white/20 tracking-widest ml-2">LOADING_CONTENT...</span>
                </div>
            ) : blocks.length === 0 ? (
                <p className="font-mono text-xs text-white/20 tracking-widest py-8 text-center">
                // NO_CONTENT_AVAILABLE
                </p>
            ) : (
                <div>
                {blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                ))}
                </div>
            )}
            </div>
        </div>
        </>
    );
}