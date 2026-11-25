import Link from "next/link";
import { PageHeader } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Add project" };

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="text-sm text-stone hover:text-accent">← Projects</Link>
      <PageHeader title="Add project" />
      <ProjectForm />
    </div>
  );
}
