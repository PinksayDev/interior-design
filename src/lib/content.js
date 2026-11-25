import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import prisma from "./db";

// Cache tags. Admin Server Actions call updateTag(...) with these after every change,
// so the public website shows edits immediately.
export const TAGS = {
  projects: "projects",
  testimonials: "testimonials",
  services: "services",
};

const order = [{ sortOrder: "asc" }, { createdAt: "desc" }];

export async function getProjects() {
  "use cache";
  cacheTag(TAGS.projects);
  cacheLife("max");
  return prisma.project.findMany({ where: { published: true }, orderBy: order });
}

export async function getProject(id) {
  "use cache";
  cacheTag(TAGS.projects);
  cacheLife("max");
  return prisma.project.findFirst({ where: { id, published: true } });
}

export async function getFeaturedProjects(limit = 3) {
  "use cache";
  cacheTag(TAGS.projects);
  cacheLife("max");
  const featured = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: order,
    take: limit,
  });
  if (featured.length >= limit) return featured;
  // Top up with the latest projects if not enough are marked as featured
  const extra = await prisma.project.findMany({
    where: { published: true, id: { notIn: featured.map((p) => p.id) } },
    orderBy: order,
    take: limit - featured.length,
  });
  return [...featured, ...extra];
}

export async function getTestimonials() {
  "use cache";
  cacheTag(TAGS.testimonials);
  cacheLife("max");
  return prisma.testimonial.findMany({ where: { published: true }, orderBy: order });
}

export async function getServices() {
  "use cache";
  cacheTag(TAGS.services);
  cacheLife("max");
  return prisma.service.findMany({ where: { published: true }, orderBy: order });
}
