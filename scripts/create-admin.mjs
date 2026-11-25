// Creates an admin user, or resets the password if the email already exists.
// Usage: npm run admin:create -- you@example.com "Your Name"
// You'll be asked for the password (it is never passed on the command line).
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client.ts";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/lib/password.js";

const [emailArg, ...nameParts] = process.argv.slice(2);
const email = emailArg?.trim().toLowerCase();
const name = nameParts.join(" ").trim() || "Admin";

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: npm run admin:create -- you@example.com "Your Name"');
  process.exit(1);
}

const rl = createInterface({ input: stdin, output: stdout });
const password = (await rl.question(`Password for ${email} (min ${MIN_PASSWORD_LENGTH} characters): `)).trim();
rl.close();

if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) });
try {
  const passwordHash = await hashPassword(password);
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash },
  });
  console.log(existing ? `✓ Password updated for ${email}` : `✓ Admin created: ${email}. Sign in at /admin/login`);
} finally {
  await prisma.$disconnect();
}
