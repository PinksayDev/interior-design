// Central place for business details — update these with your real information.
export const site = {
  name: "Areaplanz Design",
  tagline: "Spaces designed around the way you live",
  description:
    "Areaplanz Design is a full-service interior design studio creating thoughtful residential, commercial and modular kitchen interiors.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  // WhatsApp number in international format, digits only (no +, spaces or dashes)
  whatsapp: "919876543210",
  email: "hello@aurainteriors.in",
  address: "2nd Floor, Lotus Plaza, Baner Road, Pune 411045",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    pinterest: "https://pinterest.com/",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Our Process" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(message = "Hi! I'd like to discuss an interior design project.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function unsplash(id, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
