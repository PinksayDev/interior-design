"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { INQUIRY_STATUSES } from "@/lib/constants";

export async function updateEnquiry(id, formData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("notes") ?? "").trim().slice(0, 4000);
  if (!INQUIRY_STATUSES.some((s) => s.value === status)) {
    redirect(`/admin/enquiries/${id}?error=status`);
  }
  await prisma.contactInquiry.update({ where: { id }, data: { status, notes: notes || null } });
  redirect(`/admin/enquiries/${id}?saved=1`);
}

export async function deleteEnquiry(id) {
  await requireAdmin();
  await prisma.contactInquiry.delete({ where: { id } });
  redirect("/admin/enquiries?deleted=1");
}
