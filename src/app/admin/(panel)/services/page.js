import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Badge, Card, EmptyState, Flash, ListSkeleton, PageHeader } from "@/components/admin/ui";
import { Thumb } from "@/components/admin/Thumb";

export const metadata = { title: "Services" };

export default function ServicesAdminPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Shown on the Services page, the home page, the footer and the contact form."
        action={<Link href="/admin/services/new" className="btn-primary">+ Add service</Link>}
      />
      <Suspense fallback={<ListSkeleton />}>
        <ServiceList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ServiceList({ searchParams }) {
  await requireAdmin();
  const [sp, services] = await Promise.all([
    searchParams,
    prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <>
      {sp.saved && <Flash>Service saved. The website has been updated.</Flash>}
      {sp.deleted && <Flash>Service deleted.</Flash>}
      {services.length === 0 ? (
        <EmptyState title="No services yet" text="Add the services your studio offers." href="/admin/services/new" cta="+ Add service" />
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-sand">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/admin/services/${s.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-cream/60">
                  <Thumb src={s.image} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{s.title}</span>
                    <span className="block truncate text-sm text-stone">{s.summary}</span>
                  </span>
                  {!s.published && <Badge>Hidden</Badge>}
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
