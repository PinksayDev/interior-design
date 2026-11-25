import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import prisma from "@/lib/db";
import RegistrationForm from "@/components/admin/RegistrationForm";

export const metadata = { title: "Create admin account" };

export default function RegisterPage() {
  return (
    <div className="grid flex-1 place-items-center px-5 py-16">
      <Suspense fallback={null}>
        <RegistrationPageContent />
      </Suspense>
    </div>
  );
}

async function RegistrationPageContent() {
  if (await prisma.adminUser.count() > 0) redirect("/admin/login");

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="flex justify-center" aria-label="Areaplanz Design home">
        <Image
          src="/assets/images/logo/logo-3.png"
          alt="Areaplanz Design"
          width={175}
          height={148}
          className="h-20 w-auto object-contain"
        />
      </Link>
      <div className="mt-8 rounded-3xl border border-sand bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl">Create the first admin</h1>
        <p className="mt-1 text-sm text-stone">This page is available until the first admin account is created.</p>
        <RegistrationForm />
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/admin/login" className="text-stone hover:text-accent">Already have an account? Sign in</Link>
      </p>
    </div>
  );
}
