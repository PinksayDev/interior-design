import { CtaBand, PageHero, ProcessTimeline, SectionHeading } from "@/components/Sections";
import { Check } from "@/components/Icons";
import { unsplash } from "@/lib/site";

export const metadata = {
  title: "Our Process",
  description: "How our interior design process works, from first consultation to final handover.",
};

const included = [
  "Dedicated designer and project manager",
  "Photo-realistic 3D renders of every room",
  "Itemised quotation with no hidden costs",
  "Weekly progress updates on WhatsApp",
  "Multi-stage quality checks on site",
  "Up to 10-year warranty on modular work",
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A complete 2–3 BHK home usually takes 8–10 weeks from design sign-off to handover. Modular kitchens alone can be done in 3–4 weeks.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. We visit your site or meet you at our studio, discuss your requirements and share initial ideas at no cost and with no obligation.",
  },
  {
    q: "How are payments structured?",
    a: "Payments are linked to clear milestones: booking, design sign-off, material delivery and handover. You only pay as the work progresses.",
  },
  {
    q: "Can I make changes after seeing the 3D designs?",
    a: "Absolutely. We include revision rounds at the design stage so the final result is exactly what you want before anything is built.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="From first idea to final handover"
        text="A clear, proven process means fewer surprises, honest timelines and a space you'll love."
        image={unsplash("1554995207-c18c203602cb", 2000)}
      />

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow="Step by step" title="How we bring your space to life" />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </section>

      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="What's included" title="Every project comes with" />
            <ul className="mt-10 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <div className="mt-10 divide-y divide-stone/20 border-y border-stone/20">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
                    {f.q}
                    <span className="text-2xl text-accent transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Start with a free consultation" />
    </>
  );
}
