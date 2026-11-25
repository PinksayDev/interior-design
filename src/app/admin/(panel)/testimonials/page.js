import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Badge, Card, EmptyState, Flash, ListSkeleton, PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Testimonials" };

export default function TestimonialsAdminPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Client reviews shown on the home page and the Testimonials page."
        action={<Link href="/admin/testimonials/new" className="btn-primary">+ Add testimonial</Link>}
      />
      <Suspense fallback={<ListSkeleton />}>
        <TestimonialList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function TestimonialList({ searchParams }) {
  await requireAdmin();
  const [sp, testimonials] = await Promise.all([
    searchParams,
    prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <>
      {sp.saved && <Flash>Testimonial saved. The website has been updated.</Flash>}
      {sp.deleted && <Flash>Testimonial deleted.</Flash>}
      {testimonials.length === 0 ? (
        <EmptyState title="No testimonials yet" text="Add a client review to build trust with new visitors." href="/admin/testimonials/new" cta="+ Add testimonial" />
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-sand">
            {testimonials.map((t) => (
              <li key={t.id}>
                <Link href={`/admin/testimonials/${t.id}`} className="flex items-start gap-4 px-5 py-4 hover:bg-cream/60">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-sm text-accent" aria-label={`${t.rating} stars`}>{"★".repeat(t.rating)}</span>
                      {!t.published && <Badge>Hidden</Badge>}
                    </span>
                    <span className="block text-xs text-stone">{t.project}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-ink-soft">“{t.quote}”</span>
                  </span>
                  <span className="text-sm font-medium text-accent">Edit</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
