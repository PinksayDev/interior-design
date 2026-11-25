import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/content";
import { isOptimizable } from "@/lib/constants";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description || `${project.category} interior design project in ${project.location}.`,
  };
}

export default function ProjectDetailPage({ params }) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  const galleryImages = Array.isArray(project.galleryImages) ? project.galleryImages : [];

  return (
    <section className="container-x py-12 sm:py-16">
      <Link href="/projects" className="text-sm font-medium text-stone hover:text-accent">
        ← All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{project.category}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{project.title}</h1>
        <p className="mt-3 text-stone">{project.location}{project.size ? ` · ${project.size}` : ""}</p>
        {project.description && <p className="mt-6 whitespace-pre-line leading-7 text-ink-soft">{project.description}</p>}
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-sand">
        <Image
          src={project.image}
          alt={`${project.title} in ${project.location}`}
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          unoptimized={!isOptimizable(project.image)}
          className="object-cover"
        />
      </div>

      {galleryImages.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((src, index) => (
            <div key={`${src}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
              <Image
                src={src}
                alt={`${project.title}, project photo ${index + 2}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                unoptimized={!isOptimizable(src)}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 border-t border-sand pt-8">
        <p className="text-sm text-stone">Have a similar space in mind?</p>
        <Link href="/contact" className="mt-3 inline-flex btn-primary">Discuss your project</Link>
      </div>
    </section>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="container-x animate-pulse py-12 sm:py-16">
      <div className="h-5 w-28 rounded bg-sand" />
      <div className="mt-10 h-12 max-w-lg rounded bg-sand" />
      <div className="mt-4 h-5 w-64 rounded bg-sand" />
      <div className="mt-10 aspect-[16/9] rounded-3xl bg-sand" />
    </div>
  );
}
