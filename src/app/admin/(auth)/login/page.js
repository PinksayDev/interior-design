import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/db";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Sign in" };

export default function LoginPage({ searchParams }) {
  return (
    <div className="grid flex-1 place-items-center px-5 py-16">
      <Suspense fallback={null}>
        <LoginContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function LoginContent({ searchParams }) {
  if (await getAdmin()) redirect("/admin");
  const [params, adminCount] = await Promise.all([searchParams, prisma.adminUser.count()]);

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
        <h1 className="font-serif text-3xl">Admin sign in</h1>
        <p className="mt-1 text-sm text-stone">Manage enquiries and website content.</p>
        {params.registered && (
          <p role="status" className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Admin account created. Sign in with your email and password.
          </p>
        )}
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-stone hover:text-accent">← Back to website</Link>
        {adminCount === 0 && (
          <>
            <span className="mx-2 text-stone">·</span>
            <Link href="/admin/register" className="text-accent hover:underline">Create first admin</Link>
          </>
        )}
      </p>
    </div>
  );
}
