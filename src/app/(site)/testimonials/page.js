import { CtaBand, PageHero, Stars, TestimonialCard } from "@/components/Sections";
import { getTestimonials } from "@/lib/content";
import { unsplash } from "@/lib/site";

export const metadata = {
  title: "Testimonials",
  description: "Read what our clients say about working with us on their homes, offices and kitchens.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const avg = testimonials.length ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length : 5;

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Kind words from our clients"
        text="Our best advertisement is a happy client. Here's what some of them have to say."
        image={unsplash("1631679706909-1844bbd07221", 2000)}
      />

      <section className="container-x py-24 sm:py-32">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="font-serif text-7xl text-accent">{avg.toFixed(1)}</p>
          <div className="mt-2 scale-125">
            <Stars rating={Math.round(avg)} />
          </div>
          <p className="mt-4 text-sm text-stone">Average rating from our clients</p>
        </div>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      <CtaBand title="Become our next happy client" />
    </>
  );
}
