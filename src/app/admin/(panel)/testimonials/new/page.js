import Link from "next/link";
import { PageHeader } from "@/components/admin/ui";
import { TestimonialForm } from "@/components/admin/ContentForms";

export const metadata = { title: "Add testimonial" };

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/testimonials" className="text-sm text-stone hover:text-accent">← Testimonials</Link>
      <PageHeader title="Add testimonial" />
      <TestimonialForm />
    </div>
  );
}
