import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Badge, Card, EmptyState, Flash, ListSkeleton, PageHeader } from "@/components/admin/ui";
import { Thumb } from "@/components/admin/Thumb";

export const metadata = { title: "Projects" };

export default function ProjectsAdminPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Your portfolio. Shown on the Projects page; featured ones also appear on the home page."
        action={<Link href="/admin/projects/new" className="btn-primary">+ Add project</Link>}
      />
      <Suspense fallback={<ListSkeleton />}>
        <ProjectList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ProjectList({ searchParams }) {
  await requireAdmin();
  const [sp, projects] = await Promise.all([
    searchParams,
    prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <>
      {sp.saved && <Flash>Project saved. The website has been updated.</Flash>}
      {sp.deleted && <Flash>Project deleted.</Flash>}
      {projects.length === 0 ? (
        <EmptyState title="No projects yet" text="Add your first project to show it in the portfolio." href="/admin/projects/new" cta="+ Add project" />
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-sand">
            {projects.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-cream/60">
                  <Thumb src={p.image} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{p.title}</span>
                    <span className="block truncate text-sm text-stone">{p.category} · {p.location}</span>
                  </span>
                  <span className="hidden gap-2 sm:flex">
                    {p.featured && <Badge className="bg-amber-50 text-amber-800 ring-amber-600/20">Featured</Badge>}
                    {!p.published && <Badge>Hidden</Badge>}
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
