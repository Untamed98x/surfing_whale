// app/data/timeline.ts

export interface TimelineEntry {
    year: string;
    role: string;
    company: string;
    description: string[];
    images: string[];
    }

    export const TIMELINE_DATA: TimelineEntry[] = [
    {
        year: "2025",
        role: "Telemarketing — Data Analyst",
        company: "DBS By Digibank",
        description: [
        "Transition from Excel-based work into Python coding.",
        "Learned how data works, customer retention, and campaign programs.",
        "Focused on automation and data-driven marketing.",
        ],
        images: [
        "https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        ],
    },
    {
        year: "Early 2021",
        role: "Claim Settlement — Bank Operations",
        company: "Permata Bank (OS)",
        description: [
        "Learned how banks operate day-to-day.",
        "Built Excel macros to automate QR Merchant Settlement letters.",
        "First exposure to data automation and process improvement.",
        ],
        images: [
        "https://images.unsplash.com/photo-1658203897339-0b8c64a42fba?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop",
        ],
    },
    {
        year: "Graduate",
        role: "Bachelor of Accountancy",
        company: "Gunadarma University · Depok",
        description: [
        "Graduated 2016–2020, major in Accounting.",
        "\"Education is the most powerful weapon which you can use to change the world.\" – Nelson Mandela",
        ],
        images: ["/images/Universitas.png"],
    },
    ];