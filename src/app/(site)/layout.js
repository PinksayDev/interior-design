import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

export default function SiteLayout({ children }) {
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="container-x flex h-20 items-center">
        <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
          <Image
            src="/assets/images/logo/logo-3.png"
            alt={site.name}
            width={175}
            height={148}
            className="h-16 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
