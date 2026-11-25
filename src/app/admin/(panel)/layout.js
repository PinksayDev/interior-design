import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav, SidebarNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions/auth";

async function CurrentAdmin({ dark = false }) {
  const admin = await requireAdmin();
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${dark ? "bg-accent text-white" : "bg-sand text-accent-dark"}`}>
        {admin.name.slice(0, 1).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${dark ? "text-white" : ""}`}>{admin.name}</p>
        <p className={`truncate text-xs ${dark ? "text-cream/50" : "text-stone"}`}>{admin.email}</p>
      </div>
    </div>
  );
}

function SignOut({ className }) {
  return (
    <form action={logout}>
      <button type="submit" className={className}>Sign out</button>
    </form>
  );
}

export default function PanelLayout({ children }) {
  return (
    <div className="flex flex-1">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col bg-ink p-5 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-3 px-3 text-cream">
          <Image
            src="/assets/images/logo/logo-3.png"
            alt="Areaplanz Design"
            width={175}
            height={148}
            className="h-16 w-auto object-contain"
          />
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-accent">Admin</span>
        </Link>
        <SidebarNav />
        <div className="mt-auto space-y-4 border-t border-white/10 pt-5">
          <Link href="/" target="_blank" className="block px-3 text-sm text-cream/65 hover:text-white">
            View website ↗
          </Link>
          <div className="px-3">
            <Suspense fallback={<div className="h-9" />}>
              <CurrentAdmin dark />
            </Suspense>
          </div>
          <SignOut className="w-full rounded-xl px-3 py-2 text-left text-sm text-cream/65 hover:bg-white/5 hover:text-white" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 border-b border-sand bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/assets/images/logo/logo-3.png"
                alt="Areaplanz Design"
                width={175}
                height={148}
                className="h-12 w-auto object-contain"
              />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-accent">Admin</span>
            </Link>
            <SignOut className="text-sm font-medium text-stone hover:text-accent" />
          </div>
          <MobileNav />
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 lg:py-12">{children}</main>
      </div>
    </div>
  );
}
