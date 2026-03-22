// app/components/sections/CVSection.tsx

const CV_LINK =
    "https://drive.google.com/file/d/123vUTdVxQ9LwOFwezuILq5FezI2nUvFR/view";

    export function CVSection() {
    return (
        <section id="CV" className="py-24 flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#ff6a00] to-[#ffd500] bg-clip-text text-transparent">
            Want to Know More?
            </span>
        </h2>
        <p className="text-white/50 text-center max-w-md">
            Check out my full CV to see my complete experience, skills, and
            achievements.
        </p>
        <a
            href={CV_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-xl border-2 border-[#ff6a00] text-[#ff6a00] font-bold text-lg hover:bg-[#ff6a00] hover:text-white transition-all duration-300"
        >
            See My CV →
        </a>
        </section>
    );
    }