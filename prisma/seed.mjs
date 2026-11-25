// Loads the starting website content into the database.
// Usage: npm run db:seed
// Only fills tables that are empty, so it never overwrites changes made in the admin panel.
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client.ts";
import { projects, services, testimonials } from "./seed-content.mjs";

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) });

async function seed(label, model, rows, map) {
  const count = await model.count();
  if (count > 0) {
    console.log(`• ${label}: ${count} already in database, skipped`);
    return;
  }
  await model.createMany({ data: rows.map(map) });
  console.log(`✓ ${label}: added ${rows.length}`);
}

try {
  await seed("Services", prisma.service, services, (s, i) => ({
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    points: s.points,
    image: s.image,
    sortOrder: i,
  }));
  await seed("Projects", prisma.project, projects, (p, i) => ({ ...p, featured: i === 0 || i === 2 || i === 4, sortOrder: i }));
  await seed("Testimonials", prisma.testimonial, testimonials, (t, i) => ({ ...t, sortOrder: i }));
} finally {
  await prisma.$disconnect();
}
