"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Close, Menu, Phone } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-cream"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
          <Image
            src="/assets/images/logo/logo-3.png"
            alt={site.name}
            width={175}
            height={148}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-accent ${
                isActive(item.href) ? "text-accent" : "text-ink-soft"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold hover:text-accent">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/admin/login" className="rounded-full border border-sand px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-accent hover:text-accent">
            Admin
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 lg:hidden"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-sand bg-cream lg:hidden" aria-label="Mobile">
          <ul className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-3 font-serif text-2xl ${isActive(item.href) ? "text-accent" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a href={site.phoneHref} className="btn-primary w-full">
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
            </li>
            <li className="pt-2">
              <Link href="/admin/login" className="btn w-full border border-sand text-ink-soft">
                Admin panel
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
