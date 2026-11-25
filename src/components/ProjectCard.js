import Image from "next/image";
import Link from "next/link";
import { isOptimizable } from "@/lib/constants";

export default function ProjectCard({ project, className = "", aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl bg-sand ${className}`}>
      <Link href={`/projects/${project.id}`} className="relative block h-full" aria-label={`View ${project.title} portfolio`}>
        <div className={`relative h-full w-full ${aspect}`}>
          <Image
            src={project.image}
            alt={`${project.title}, ${project.location}`}
            fill
            sizes={sizes}
            unoptimized={!isOptimizable(project.image)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
          <span className="inline-block rounded-full bg-cream/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest backdrop-blur">
            {project.category}
          </span>
          <h3 className="mt-3 font-serif text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-cream/75">
            {project.location} · {project.size}
          </p>
        </div>
      </Link>
    </article>
  );
}
