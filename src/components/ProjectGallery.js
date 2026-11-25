"use client";

import { useState } from "react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

const projectCategories = ["All", ...PROJECT_CATEGORIES];

export default function ProjectGallery({ projects }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              active === cat ? "border-ink bg-ink text-cream" : "border-sand bg-white hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {visible.length === 0 && <p className="text-stone">No projects in this category yet.</p>}
      </div>
    </>
  );
}
