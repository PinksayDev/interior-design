import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Sections";
import { ArrowRight, Check } from "@/components/Icons";
import { images } from "@/lib/data";
import { getServices } from "@/lib/content";
import { isOptimizable } from "@/lib/constants";

export const metadata = {
  title: "Services",
  description: "Residential interiors, commercial interiors, modular kitchens, wardrobes, custom furniture and turnkey renovation.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything your space needs, under one roof"
        text="Design, manufacturing and execution, all handled by one dedicated team."
        image={images.cta}
      />

      <nav className="sticky top-20 z-40 border-b border-sand bg-cream/95 backdrop-blur" aria-label="Services">
        <ul className="container-x flex gap-6 overflow-x-auto py-4 text-sm font-medium whitespace-nowrap">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="text-ink-soft hover:text-accent">{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x space-y-24 py-24 sm:space-y-32 sm:py-32">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-40 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${i % 2 ? "lg:order-2" : ""}`}>
              <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 50vw, 100vw" unoptimized={!isOptimizable(s.image)} className="object-cover" />
            </div>
            <div>
              <span className="font-serif text-6xl text-accent/40">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="heading mt-2">{s.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{s.summary}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-10">
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
