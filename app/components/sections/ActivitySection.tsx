"use client";
// app/components/sections/ActivitySection.tsx
// Kaggle showcase + GitHub contribution graph

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "Untamed98x"; // udah bener
const KAGGLE_USERNAME = "muhammadfauzy43"; // ganti kalau beda

interface KaggleDataset {
    title: string;
    url: string;
    votes: number;
    views: number;
    }

    interface GitHubStats {
    repos: number;
    followers: number;
    contributions: { date: string; count: number }[];
    }

    // ─── Kaggle Card ──────────────────────────────────────────────────────────────

    const KAGGLE_PROJECTS: KaggleDataset[] = [
    {
        title: "EDA Prediction of Los Angeles Crime",
        url: "https://www.kaggle.com/code/muhammadfauzy43/eda-prediction-of-los-angeles-crime-by-edit",
        votes: 12,
        views: 890,
    },
    // tambah manual project Kaggle lo di sini
    ];

    function KaggleCard({ title, url, votes, views }: KaggleDataset) {
    return (
        <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-white/[0.06] rounded-sm p-5 bg-white/[0.02] hover:border-[#ff6a00]/30 transition-all duration-300"
        >
        <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] text-[#20beff]/60 tracking-widest uppercase mb-2">
                // kaggle notebook
            </p>
            <h4 className="font-black text-sm text-white group-hover:text-[#ff6a00] transition-colors line-clamp-2 tracking-tight">
                {title.replace(/ /g, "_").toUpperCase()}
            </h4>
            </div>
            <svg className="w-5 h-5 text-[#20beff]/40 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.311l-2.5-2.961v4.15H9.5V9.5l-2.5 2.961V9.5L12 4l5 5.5v2.811z"/>
            </svg>
        </div>
        <div className="flex gap-4 mt-3">
            <span className="font-mono text-[10px] text-white/20">▲ {votes}</span>
            <span className="font-mono text-[10px] text-white/20">👁 {views}</span>
        </div>
        </a>
    );
    }

    // ─── GitHub Contribution Graph ────────────────────────────────────────────────

    function GitHubGraph() {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // GitHub public API — repo + follower count
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        .then((r) => r.json())
        .then((data) => {
            setStats({
            repos: data.public_repos,
            followers: data.followers,
            contributions: generateMockContributions(), // GitHub contributions API butuh OAuth
            });
        })
        .catch(() => {
            setStats({
            repos: 0,
            followers: 0,
            contributions: generateMockContributions(),
            });
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="border border-white/[0.06] rounded-sm p-5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
            // github_activity
            </p>
            <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#ff6a00]/60 hover:text-[#ff6a00] transition-colors tracking-widest"
            >
            @{GITHUB_USERNAME} →
            </a>
        </div>

        {loading ? (
            <div className="h-20 flex items-center justify-center">
            <span className="font-mono text-[10px] text-white/20 tracking-widest animate-pulse">
                LOADING...
            </span>
            </div>
        ) : (
            <>
            {/* Stats row */}
            <div className="flex gap-6 mb-4">
                <div>
                <p className="font-black text-2xl text-white">{stats?.repos}</p>
                <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Repos</p>
                </div>
                <div>
                <p className="font-black text-2xl text-white">{stats?.followers}</p>
                <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Followers</p>
                </div>
            </div>

            {/* Contribution heatmap */}
            <div className="flex gap-[3px] flex-wrap">
                {stats?.contributions.map((day, i) => (
                <div
                    key={i}
                    title={`${day.date}: ${day.count} contributions`}
                    className="w-[10px] h-[10px] rounded-[2px] transition-all duration-200 hover:scale-125"
                    style={{
                    background: day.count === 0
                        ? "rgba(255,255,255,0.04)"
                        : day.count < 3
                        ? "#ff6a0044"
                        : day.count < 6
                        ? "#ff6a0088"
                        : "#ff6a00",
                    }}
                />
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/20 mt-3 tracking-widest">
                // last 6 months
            </p>
            </>
        )}
        </div>
    );
    }

    // Generate 180 days of mock contribution data (replace dengan real data kalau mau)
    function generateMockContributions() {
    const days = [];
    const now = new Date();
    for (let i = 179; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        days.push({
        date: d.toISOString().split("T")[0],
        count: isWeekend
            ? Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0
            : Math.random() > 0.4 ? Math.floor(Math.random() * 8) : 0,
        });
    }
    return days;
    }

    // ─── Main Section ─────────────────────────────────────────────────────────────

    export function ActivitySection() {
    return (
        <section id="activity" className="relative w-full py-24 bg-[#080808]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />

        <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="mb-14">
            <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.3em] uppercase">
                [ OPEN_SOURCE ]
            </span>
            <h2 className="font-black text-4xl md:text-5xl text-white mt-1 tracking-tight">
                ACTIVITY_LOG
            </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: GitHub */}
            <div>
                <GitHubGraph />
            </div>

            {/* Right: Kaggle */}
            <div className="space-y-4">
                <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4">
                // kaggle_notebooks
                </p>
                {KAGGLE_PROJECTS.map((p) => (
                <KaggleCard key={p.url} {...p} />
                ))}
                <a
                href={`https://www.kaggle.com/${KAGGLE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center font-mono text-[10px] text-white/20 hover:text-[#ff6a00]/60 transition-colors py-3 border border-white/[0.04] rounded-sm tracking-widest"
                >
                → VIEW_ALL_ON_KAGGLE
                </a>
            </div>
            </div>
        </div>
        </section>
    );
}