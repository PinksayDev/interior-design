import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { site } from "@/lib/site";
import { deleteEnquiry, updateEnquiry } from "@/app/admin/actions/enquiries";
import { Card, Flash, ListSkeleton, StatusBadge, formatDate } from "@/components/admin/ui";
import { DeleteButton, SubmitButton } from "@/components/admin/FormBits";

export const metadata = { title: "Enquiry" };

export default function EnquiryPage({ params, searchParams }) {
  return (
    <div className="space-y-6">
      <Link href="/admin/enquiries" className="text-sm text-stone hover:text-accent">← All enquiries</Link>
      <Suspense fallback={<ListSkeleton rows={4} />}>
        <EnquiryDetail params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/** wa.me needs digits with country code; assume India (+91) for 10-digit numbers. */
function whatsappNumber(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

async function EnquiryDetail({ params, searchParams }) {
  await requireAdmin();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const e = await prisma.contactInquiry.findUnique({ where: { id } });
  if (!e) notFound();

  const firstName = e.name.split(" ")[0];
  const waText = `Hi ${firstName}, thank you for contacting ${site.name} about your ${e.service || "project"}. `;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-4xl font-medium">{e.name}</h1>
        <StatusBadge status={e.status} />
      </div>
      <p className="-mt-4 text-sm text-stone">Received {formatDate(e.createdAt, true)}</p>

      {sp.saved && <Flash>Changes saved.</Flash>}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone">Message</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-wrap">{e.message}</p>
            <dl className="mt-6 grid gap-4 border-t border-sand pt-6 text-sm sm:grid-cols-2">
              <div><dt className="text-stone">Service</dt><dd className="mt-0.5 font-medium">{e.service || "Not specified"}</dd></div>
              <div><dt className="text-stone">Budget</dt><dd className="mt-0.5 font-medium">{e.budget || "Not specified"}</dd></div>
              <div><dt className="text-stone">Phone</dt><dd className="mt-0.5 font-medium">{e.phone}</dd></div>
              <div><dt className="text-stone">Email</dt><dd className="mt-0.5 font-medium break-all">{e.email}</dd></div>
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl">Status & notes</h2>
            <form action={updateEnquiry.bind(null, e.id)} className="mt-5 space-y-5">
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Status</legend>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_STATUSES.map((s) => (
                    <label key={s.value} className="cursor-pointer">
                      <input type="radio" name="status" value={s.value} defaultChecked={e.status === s.value} className="peer sr-only" />
                      <span className="block rounded-full px-3.5 py-1.5 text-sm ring-1 ring-sand peer-checked:bg-ink peer-checked:text-cream peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">Internal notes</label>
                <textarea id="notes" name="notes" rows={5} defaultValue={e.notes ?? ""} placeholder="e.g. Called on Monday, site visit booked for Saturday 11am…" className="field" />
                <p className="mt-1.5 text-xs text-stone">Only visible to admins.</p>
              </div>
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone">Reply</h2>
            <div className="mt-4 grid gap-2">
              <a href={`https://wa.me/${whatsappNumber(e.phone)}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1eb457]">
                WhatsApp {firstName}
              </a>
              <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="btn-outline">Call {e.phone}</a>
              <a href={`mailto:${e.email}?subject=${encodeURIComponent(`Your enquiry with ${site.name}`)}`} className="btn-outline">Send email</a>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone">Danger zone</h2>
            <p className="mt-2 text-sm text-stone">Permanently remove this enquiry.</p>
            <div className="mt-4">
              <DeleteButton action={deleteEnquiry.bind(null, e.id)} label="Delete enquiry" confirmText={`Delete the enquiry from ${e.name}? This can't be undone.`} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
