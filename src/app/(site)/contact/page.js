import ContactForm from "@/components/ContactForm";
import { Clock, Mail, MapPin, Phone, WhatsApp } from "@/components/Icons";
import { PageHero } from "@/components/Sections";
import { getServices } from "@/lib/content";
import { site, unsplash, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Call, WhatsApp or send us a message to book a free design consultation.`,
};

export default async function ContactPage() {
  const services = await getServices();
  const channels = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: WhatsApp, label: "WhatsApp", value: "Chat with a designer", href: whatsappLink(), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your space"
        text="Book a free consultation, ask a question or just say hello. We usually reply within a few hours."
        image={unsplash("1600566753190-17f0baa2a6c3", 2000)}
      />

      <section className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <div className="grid gap-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-5 rounded-3xl bg-white p-6 transition hover:shadow-lg hover:shadow-ink/5"
              >
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${label === "WhatsApp" ? "bg-[#25D366] text-white" : "bg-accent/10 text-accent"}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-stone">{label}</span>
                  <span className="mt-1 block font-serif text-xl group-hover:text-accent">{value}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 space-y-4 rounded-3xl border border-sand p-6 text-sm">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-accent" />{site.address}</p>
            <p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-accent" />{site.hours}</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl">
            <iframe
              title="Studio location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
              className="h-64 w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <ContactForm serviceOptions={services.map((s) => s.title)} />
      </section>
    </>
  );
}
