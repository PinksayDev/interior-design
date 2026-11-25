import Image from "next/image";
import Link from "next/link";
import { CtaBand, ProcessTimeline, SectionHeading, TestimonialCard } from "@/components/Sections";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, WhatsApp } from "@/components/Icons";
import { images, processSteps, stats } from "@/lib/data";
import { getFeaturedProjects, getServices, getTestimonials } from "@/lib/content";
import { isOptimizable } from "@/lib/constants";
import { site, whatsappLink } from "@/lib/site";

export default async function Home() {
  const [services, featured, testimonials] = await Promise.all([
    getServices(),
    getFeaturedProjects(3),
    getTestimonials(),
  ]);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-ink text-cream">
        <Image
          src={images.hero}
          alt="Warm, contemporary living room designed by Areaplanz Design"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
        <div className="container-x flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24">
          <p className="eyebrow text-accent">Interior Design Studio · Pune</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] font-medium sm:text-7xl">
            Beautiful interiors, <em className="text-accent">thoughtfully</em> crafted for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
            From cosy homes to inspiring workplaces and modular kitchens, we design and build spaces that feel
            like you, delivered on time and on budget.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-accent">
              Book free consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/projects" className="btn border border-cream/40 hover:bg-cream hover:text-ink">
              View our projects
            </Link>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-cream/20 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl text-cream">{s.value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-widest text-cream/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src={images.about} alt="Elegant living room with gallery wall" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-8 hidden rounded-3xl bg-accent p-8 text-white shadow-xl sm:block lg:-right-10">
              <p className="font-serif text-5xl">12+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/80">Years designing<br />beautiful homes</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Welcome to Areaplanz Design"
              title="We design spaces that tell your story"
              text={`${site.name} is a full-service design studio. We combine creative design with in-house craftsmanship, so you get one team, one timeline and one price.`}
            />
            <p className="mt-5 leading-relaxed text-ink-soft">
              Whether you&apos;re moving into a new apartment, renovating a family home or setting up an office, we
              handle everything: concept, 3D visualisation, execution and final styling.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                About our studio <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="What we do" title="Interior design services" />
            <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">
              All services <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="group overflow-hidden rounded-3xl bg-cream transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" unoptimized={!isOptimizable(s.image)} className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Portfolio" title="Recent projects" text="A glimpse of the homes and workplaces we've had the joy of designing." />
            <Link href="/projects" className="btn-outline self-start md:self-auto">
              View all projects
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featured.map((project, i) =>
              i === 0 ? (
                <ProjectCard key={project.id} project={project} className="md:col-span-2 md:row-span-2" aspect="aspect-[4/5] md:aspect-auto" sizes="(min-width: 768px) 66vw, 100vw" />
              ) : (
                <ProjectCard key={project.id} project={project} />
              )
            )}
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="How we work" title="A simple, stress-free process" text="Six clear steps from first conversation to the day you get your keys." />
          <div className="mt-14">
            <ProcessTimeline steps={processSteps} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/process" className="btn-primary">
              Explore our process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials preview */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Testimonials" title="Loved by our clients" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/testimonials" className="btn-outline">
              Read more reviews
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
