// app/components/sections/ProjectSectionWrapper.tsx
// Server Component — fetch Notion di sini

import { getProjects } from "@/app/lib/notion";
import { ProjectSection } from "./ProjectSection";

export default async function ProjectSectionWrapper() {
    const projects = await getProjects();
    return <ProjectSection projects={projects} />;
    }