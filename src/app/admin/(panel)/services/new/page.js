import Link from "next/link";
import { PageHeader } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Add service" };

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/services" className="text-sm text-stone hover:text-accent">← Services</Link>
      <PageHeader title="Add service" />
      <ServiceForm />
    </div>
  );
}
