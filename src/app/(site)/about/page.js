import Image from "next/image";
import { CtaBand, PageHero, SectionHeading } from "@/components/Sections";
import { images, stats, team, values } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: `Meet the designers behind ${site.name}, a full-service interior design studio in Pune.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A studio built on craft, care and conversation"
        text="We believe great interiors come from really listening and then sweating every detail."
        image={images.about}
      />

      {/* Story */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title="From a small studio to 450+ happy homes" />
            <div className="mt-6 space-y-5 leading-relaxed text-ink-soft">
              <p>
                {site.name} was founded in 2014 by Ananya Kulkarni with one simple idea: designing a home should
                be exciting, not exhausting. What started as a two-person studio is now a team of 30+ designers,
                project managers and skilled craftsmen.
              </p>
              <p>
                Our in-house factory and execution team let us control quality at every step, from the first
                sketch to the last cushion. That is how we keep our promises on timelines, budgets and finish.
              </p>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
            <Image src={images.studio} alt="Our design studio" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <dl className="container-x mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-sand lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-cream p-8 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-5xl text-accent">{s.value}</dd>
              <dd className="mt-2 text-xs uppercase tracking-widest text-stone">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Values */}
      <section className="bg-ink py-24 text-cream sm:py-32">
        <div className="container-x">
          <p className="eyebrow">Why choose us</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-medium sm:text-5xl">What makes working with us different</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-cream/20 pt-6">
                <span className="text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Our designers" title="Meet the people behind the designs" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full bg-sand">
                  <Image src={m.image} alt={m.name} fill sizes="320px" className="object-cover" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{m.role}</p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's create something beautiful together" />
    </>
  );
}
