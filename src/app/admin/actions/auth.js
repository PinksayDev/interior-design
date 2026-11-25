"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { authenticate, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/password";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function login(_prev, formData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password.", email };
  }

  const user = await authenticate(email, password);
  if (!user) {
    await sleep(600); // slow down password guessing
    return { error: "Incorrect email or password.", email };
  }

  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function changePassword(_prev, formData) {
  const admin = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const user = await prisma.adminUser.findUnique({ where: { id: admin.id } });
  if (!(await verifyPassword(current, user.passwordHash))) {
    return { ok: false, message: "Your current password is incorrect." };
  }
  if (next.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  }
  if (next !== confirm) {
    return { ok: false, message: "The new passwords don't match." };
  }

  await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(next) } });
  return { ok: true, message: "Password updated." };
}

export async function createAdmin(_prev, formData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { ok: false, message: "Enter a name." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Enter a valid email address." };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  }
  if (await prisma.adminUser.findUnique({ where: { email } })) {
    return { ok: false, message: "An admin with this email already exists." };
  }

  await prisma.adminUser.create({ data: { name, email, passwordHash: await hashPassword(password) } });
  redirect("/admin/users?saved=1");
}

export async function registerFirstAdmin(_prev, formData) {
  if (await prisma.adminUser.count() > 0) {
    return { ok: false, message: "Registration is closed. Sign in with an existing admin account." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (name.length < 2) return { ok: false, message: "Enter your name.", name, email };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Enter a valid email address.", name, email };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`, name, email };
  }
  if (password !== confirm) {
    return { ok: false, message: "The passwords don't match.", name, email };
  }
  if (await prisma.adminUser.findUnique({ where: { email } })) {
    return { ok: false, message: "An admin with this email already exists.", name, email };
  }

  await prisma.adminUser.create({
    data: { name, email, passwordHash: await hashPassword(password) },
  });
  redirect("/admin/login?registered=1");
}

export async function deleteAdmin(id) {
  const admin = await requireAdmin();
  if (id === admin.id) redirect("/admin/users?error=self");
  await prisma.adminUser.delete({ where: { id } });
  redirect("/admin/users?deleted=1");
}
