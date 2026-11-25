"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "M4 4h16v12H5.2L4 17.2V4zM8 9h8M8 12h5" },
  { href: "/admin/projects", label: "Projects", icon: "M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4" },
  { href: "/admin/services", label: "Services", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z" },
  { href: "/admin/users", label: "Admin users", icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8" },
];

function isActive(pathname, href) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

// usePathname() is request data on dynamic routes, so each nav renders a plain fallback
// inside <Suspense> and streams in the version with the active link highlighted.
export function SidebarNav() {
  return (
    <Suspense fallback={<SidebarLinks pathname="" />}>
      <ActiveSidebarLinks />
    </Suspense>
  );
}

export function MobileNav() {
  return (
    <Suspense fallback={<MobileLinks pathname="" />}>
      <ActiveMobileLinks />
    </Suspense>
  );
}

function ActiveSidebarLinks() {
  return <SidebarLinks pathname={usePathname()} />;
}

function ActiveMobileLinks() {
  return <MobileLinks pathname={usePathname()} />;
}

function SidebarLinks({ pathname }) {
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {adminNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active ? "bg-white/10 text-white" : "text-cream/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <path d={item.icon} />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileLinks({ pathname }) {
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-4 pb-3">
      {adminNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium ${
            isActive(pathname, item.href) ? "bg-ink text-cream" : "bg-sand/70 text-ink-soft"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
