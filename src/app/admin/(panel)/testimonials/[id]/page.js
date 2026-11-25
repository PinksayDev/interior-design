import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteTestimonial } from "@/app/admin/actions/content";
import { ListSkeleton, PageHeader } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/FormBits";
import { TestimonialForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Edit testimonial" };

export default function EditTestimonialPage({ params }) {
  return (
    <div className="space-y-6">
      <Link href="/admin/testimonials" className="text-sm text-stone hover:text-accent">← Testimonials</Link>
      <Suspense fallback={<ListSkeleton rows={4} />}>
        <Editor params={params} />
      </Suspense>
    </div>
  );
}

async function Editor({ params }) {
  await requireAdmin();
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();
  return (
    <>
      <PageHeader
        title={testimonial.name}
        action={<DeleteButton action={deleteTestimonial.bind(null, testimonial.id)} label="Delete testimonial" confirmText={`Delete "${testimonial.name}"? This can't be undone.`} />}
      />
      <TestimonialForm testimonial={testimonial} />
    </>
  );
}
