import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

function isPostgresUrl(value) {
  try {
    return /^postgres(ql)?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
}

if (!isPostgresUrl(connectionString)) {
  throw new Error(
    "DATABASE_URL is missing or is not a valid postgresql:// connection string. " +
      "Set it in .env (copy it from your Neon dashboard), then restart the server."
  );
}

const globalForPrisma = globalThis;

// In development the client is reused across hot reloads. It is keyed by the
// connection string, so changing DATABASE_URL in .env creates a fresh client.
const cached = globalForPrisma.prisma;
const prisma =
  cached && globalForPrisma.prismaUrl === connectionString
    ? cached
    : new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaUrl = connectionString;
}

export default prisma;
