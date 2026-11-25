import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import prisma from "./db";
import { verifyPassword } from "./password";

const COOKIE = "admin_session";
const SESSION_DAYS = 7;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error("AUTH_SECRET is missing or too short. Add a long random value to your .env file.");
  }
  return s;
}

// Used when the email is unknown so a failed login takes the same time either way.
const DUMMY_HASH = "scrypt$c2FsdHNhbHRzYWx0c2FsdA$" + "A".repeat(86);

/* ---------- signed session token: base64url(payload).signature ---------- */

function sign(data) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

function encodeToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeToken(token) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = Buffer.from(sign(body));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof payload.uid !== "string" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ---------- session lifecycle ---------- */

export async function authenticate(email, password) {
  const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) return null;
  await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  return user;
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const store = await cookies();
  store.set(COOKIE, encodeToken({ uid: userId, exp: expires.getTime() }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

/**
 * Returns the signed-in admin ({ id, name, email }) or null.
 * Deduplicated per request with React's cache().
 */
export const getAdmin = cache(async () => {
  await connection();
  const token = (await cookies()).get(COOKIE)?.value;
  const payload = decodeToken(token);
  if (!payload) return null;
  return prisma.adminUser.findUnique({
    where: { id: payload.uid },
    select: { id: true, name: true, email: true },
  });
});

/** Call at the top of every admin page and Server Action. Redirects to login if not signed in. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
