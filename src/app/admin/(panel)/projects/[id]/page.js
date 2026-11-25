import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteProject } from "@/app/admin/actions/content";
import { ListSkeleton, PageHeader } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/FormBits";
import { ProjectForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Edit project" };

export default function EditProjectPage({ params }) {
  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="text-sm text-stone hover:text-accent">← Projects</Link>
      <Suspense fallback={<ListSkeleton rows={4} />}>
        <Editor params={params} />
      </Suspense>
    </div>
  );
}

async function Editor({ params }) {
  await requireAdmin();
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <>
      <PageHeader
        title={project.title}
        action={<DeleteButton action={deleteProject.bind(null, project.id)} label="Delete project" confirmText={`Delete "${project.title}"? This can't be undone.`} />}
      />
      <ProjectForm project={project} />
    </>
  );
}
