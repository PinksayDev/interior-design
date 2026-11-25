import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { Card, Flash, ListSkeleton, PageHeader, StatusBadge, formatDate } from "@/components/admin/ui";

export const metadata = { title: "Enquiries" };

export default function EnquiriesPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Enquiries" description="Messages sent through the website's contact form." />
      <Suspense fallback={<ListSkeleton rows={8} />}>
        <EnquiryList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function EnquiryList({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = INQUIRY_STATUSES.some((s) => s.value === params.status) ? params.status : null;
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { message: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [enquiries, counts] = await Promise.all([
    prisma.contactInquiry.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.contactInquiry.groupBy({ by: ["status"], _count: true }),
  ]);
  const countFor = (v) => counts.find((c) => c.status === v)?._count ?? 0;
  const total = counts.reduce((n, c) => n + c._count, 0);

  const tabHref = (value) => {
    const sp = new URLSearchParams();
    if (value) sp.set("status", value);
    if (q) sp.set("q", q);
    const s = sp.toString();
    return `/admin/enquiries${s ? `?${s}` : ""}`;
  };

  return (
    <>
      {params.deleted && <Flash>Enquiry deleted.</Flash>}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[{ value: null, label: "All", n: total }, ...INQUIRY_STATUSES.map((s) => ({ ...s, n: countFor(s.value) }))].map((t) => (
            <Link
              key={t.label}
              href={tabHref(t.value)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium ${
                status === t.value ? "bg-ink text-cream" : "bg-white text-ink-soft ring-1 ring-sand hover:ring-ink"
              }`}
            >
              {t.label} <span className="opacity-60">{t.n}</span>
            </Link>
          ))}
        </div>
        <form className="flex gap-2" role="search">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q} placeholder="Search name, email, phone…" aria-label="Search enquiries" className="field w-full py-2 lg:w-64" />
          <button className="btn-primary px-5 py-2">Search</button>
        </form>
      </div>

      {enquiries.length === 0 ? (
        <Card className="px-6 py-16 text-center text-sm text-stone">
          {q || status ? "No enquiries match this filter." : "No enquiries yet. They'll appear here when someone fills in the contact form."}
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-sand">
            {enquiries.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="grid gap-2 px-5 py-4 hover:bg-cream/60 md:grid-cols-[1.2fr_1fr_1.6fr_auto_auto] md:items-center md:gap-6">
                  <span className="min-w-0">
                    <span className={`block truncate ${e.status === "new" ? "font-semibold" : "font-medium"}`}>{e.name}</span>
                    <span className="block truncate text-xs text-stone">{e.email}</span>
                  </span>
                  <span className="text-sm text-ink-soft">{e.phone}</span>
                  <span className="truncate text-sm text-stone">{e.service || "General"} · {e.message}</span>
                  <span className="text-xs whitespace-nowrap text-stone">{formatDate(e.createdAt)}</span>
                  <StatusBadge status={e.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
