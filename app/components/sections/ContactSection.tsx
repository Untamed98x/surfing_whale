"use client";
// app/components/sections/ContactSection.tsx

import { useState } from "react";

const WA_NUMBER = "6281234567890"; // ganti dengan nomor lo
const EMAIL = "muhammadfauzy@email.com"; // ganti dengan email lo

export function ContactSection() {
    const [form, setForm] = useState({ name: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleWA = () => {
        const text = encodeURIComponent(
        `Halo, nama saya ${form.name}.\n\n${form.message}`
        );
        window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
        setSent(true);
    };

    const handleEmail = () => {
        const subject = encodeURIComponent(`Pesan dari ${form.name} — Portfolio`);
        const body = encodeURIComponent(form.message);
        window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
        setSent(true);
    };

    const isReady = form.name.trim().length > 0 && form.message.trim().length > 0;

    return (
        <section id="contact" className="relative w-full py-24 bg-[#080808]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />

        {/* radial glow */}
        <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, #ff6a0015 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10 max-w-2xl">
            {/* Header */}
            <div className="mb-12 text-center">
            <span className="font-mono text-[10px] text-[#ff6a00] tracking-[0.3em] uppercase">
                [ GET_IN_TOUCH ]
            </span>
            <h2 className="font-black text-4xl md:text-5xl text-white mt-1 tracking-tight">
                CONTACT_ME
            </h2>
            <p className="text-white/30 font-mono text-xs mt-3 tracking-wider">
                // open for collaboration, freelance, or just a chat
            </p>
            </div>

            {sent ? (
            <div className="text-center py-16 border border-[#ff6a00]/20 rounded-sm">
                <p className="font-mono text-[#ff6a00] text-sm tracking-widest">
                ✓ MESSAGE_SENT
                </p>
                <p className="text-white/30 font-mono text-xs mt-2">
                // akan gue balas secepatnya
                </p>
                <button
                onClick={() => { setSent(false); setForm({ name: "", message: "" }); }}
                className="mt-6 font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                → SEND_ANOTHER
                </button>
            </div>
            ) : (
            <div className="space-y-4">
                {/* Name */}
                <div>
                <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-2">
                    // name
                </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff6a00]/40 transition-colors"
                />
                </div>

                {/* Message */}
                <div>
                <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-2">
                    // message
                </label>
                <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff6a00]/40 transition-colors resize-none"
                />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                <button
                    onClick={handleWA}
                    disabled={!isReady}
                    className="flex-1 font-mono text-xs py-3 border border-[#ff6a00]/30 text-[#ff6a00] hover:bg-[#ff6a00]/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed rounded-sm tracking-widest"
                >
                    → WHATSAPP
                </button>
                <button
                    onClick={handleEmail}
                    disabled={!isReady}
                    className="flex-1 font-mono text-xs py-3 border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed rounded-sm tracking-widest"
                >
                    → EMAIL
                </button>
                </div>
            </div>
            )}
        </div>
        </section>
    );
}