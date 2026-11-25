import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand, PageHero } from "@/components/Sections";
import { getProjects } from "@/lib/content";
import { unsplash } from "@/lib/site";

export const metadata = {
  title: "Projects",
  description: "Explore our portfolio of residential, commercial and modular kitchen interior design projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Spaces we've brought to life"
        text="Every project is unique, shaped by the people who live and work in it. Browse a selection of our recent work."
        image={unsplash("1600607687939-ce8a6c25118c", 2000)}
      />
      <section className="container-x py-20 sm:py-24">
        <ProjectGallery projects={projects} />
      </section>
      <CtaBand title="Imagine your space here" />
    </>
  );
}
