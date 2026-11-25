import Link from "next/link";
import Image from "next/image";
import { nav, site, whatsappLink } from "@/lib/site";
import { getServices } from "@/lib/content";
import { Clock, Mail, MapPin, Phone, WhatsApp } from "./Icons";

export default async function Footer() {
  const services = await getServices();
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
            <Image
              src="/assets/images/logo/logo-3.png"
              alt={site.name}
              width={175}
              height={148}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex gap-4 text-sm">
            {Object.entries(site.social).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-accent">
                {name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-cream">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-cream">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-accent">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-cream">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{site.address}</li>
            <li><a href={site.phoneHref} className="flex gap-3 hover:text-accent"><Phone className="h-4 w-4 shrink-0 text-accent" />{site.phone}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-accent"><WhatsApp className="h-4 w-4 shrink-0 text-accent" />Chat on WhatsApp</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-3 hover:text-accent"><Mail className="h-4 w-4 shrink-0 text-accent" />{site.email}</a></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-accent" />{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Designed with care in Pune.</p>
            <Link href="/admin/login" className="hover:text-cream">Admin panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
