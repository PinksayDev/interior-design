import Image from "next/image";
import Link from "next/link";
import { images, processSteps } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import { ArrowRight, Quote, Star, WhatsApp } from "./Icons";

export function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 to-ink/20" />
      <div className="container-x py-24 sm:py-32">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] font-medium sm:text-6xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-cream/80">{text}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading mt-3">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{text}</p>}
    </div>
  );
}

export function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating} className="h-4 w-4" />
      ))}
    </div>
  );
}

export function TestimonialCard({ t }) {
  const initials = t.name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <Quote className="h-8 w-8 text-accent/30" />
      <Stars rating={t.rating} />
      <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-sand pt-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-sand text-sm font-semibold text-accent-dark">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-stone">{t.project}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ProcessTimeline({ steps = processSteps }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl bg-sand sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="bg-cream p-8 sm:p-10">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone">{step.duration}</span>
          </div>
          <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({
  title = "Ready to transform your space?",
  text = "Book a free consultation with our designers. We'll visit your site, understand your needs and share ideas, with no obligation.",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <Image src={images.cta} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
      <div className="container-x py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl font-serif text-4xl font-medium sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-cream/80">{text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            Book free consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn border border-cream/40 hover:bg-cream hover:text-ink">
            <WhatsApp className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
