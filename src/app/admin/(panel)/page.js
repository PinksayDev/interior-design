import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Card, ListSkeleton, PageHeader, StatusBadge, formatDate } from "@/components/admin/ui";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="An overview of enquiries and website content."
        action={<Link href="/admin/projects/new" className="btn-primary">+ Add project</Link>}
      />
      <Suspense fallback={<ListSkeleton rows={6} />}>
        <Overview />
      </Suspense>
    </div>
  );
}

async function Overview() {
  await requireAdmin();
  const [newCount, totalEnquiries, projects, services, testimonials, recent] = await Promise.all([
    prisma.contactInquiry.count({ where: { status: "new" } }),
    prisma.contactInquiry.count(),
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const stats = [
    { label: "New enquiries", value: newCount, href: "/admin/enquiries?status=new", highlight: newCount > 0 },
    { label: "Total enquiries", value: totalEnquiries, href: "/admin/enquiries" },
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${
              s.highlight ? "border-accent bg-accent text-white" : "border-sand bg-white"
            }`}
          >
            <p className="font-serif text-4xl">{s.value}</p>
            <p className={`mt-1 text-xs font-medium uppercase tracking-wider ${s.highlight ? "text-white/80" : "text-stone"}`}>
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="font-serif text-2xl">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-medium text-accent hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-stone">No enquiries yet. They&apos;ll appear here when someone fills in the contact form.</p>
        ) : (
          <ul className="divide-y divide-sand">
            {recent.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-cream/60">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{e.name}</span>
                    <span className="block truncate text-sm text-stone">{e.service || "General enquiry"} · {e.phone}</span>
                  </span>
                  <span className="text-xs text-stone">{formatDate(e.createdAt)}</span>
                  <StatusBadge status={e.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
