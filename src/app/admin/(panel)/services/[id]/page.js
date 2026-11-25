import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteService } from "@/app/admin/actions/content";
import { ListSkeleton, PageHeader } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/FormBits";
import { ServiceForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Edit service" };

export default function EditServicePage({ params }) {
  return (
    <div className="space-y-6">
      <Link href="/admin/services" className="text-sm text-stone hover:text-accent">← Services</Link>
      <Suspense fallback={<ListSkeleton rows={4} />}>
        <Editor params={params} />
      </Suspense>
    </div>
  );
}

async function Editor({ params }) {
  await requireAdmin();
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return (
    <>
      <PageHeader
        title={service.title}
        action={<DeleteButton action={deleteService.bind(null, service.id)} label="Delete service" confirmText={`Delete "${service.title}"? This can't be undone.`} />}
      />
      <ServiceForm service={service} />
    </>
  );
}
