"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { TAGS } from "@/lib/content";
import { PROJECT_CATEGORIES } from "@/lib/constants";

/* ---------- helpers ---------- */

const text = (fd, name, max = 200) => String(fd.get(name) ?? "").trim().slice(0, max);
const bool = (fd, name) => fd.get(name) === "on";
const int = (fd, name, fallback = 0) => {
  const n = Number.parseInt(String(fd.get(name) ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
};
const isImageUrl = (v) => /^https:\/\/\S+$/.test(v) || /^\/(?!\/)\S+$/.test(v);
const slugify = (v) =>
  v.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

function invalid(errors, fd) {
  return { errors, values: Object.fromEntries([...fd.entries()].filter(([k]) => !k.startsWith("$"))) };
}

/* ---------- projects ---------- */

export async function saveProject(_prev, fd) {
  await requireAdmin();
  const id = text(fd, "id");
  const galleryImages = String(fd.get("galleryImages") ?? "").trim()
    .split(/\r?\n/)
    .map((image) => image.trim())
    .filter(Boolean);
  const data = {
    title: text(fd, "title", 120),
    location: text(fd, "location", 120),
    category: text(fd, "category", 40),
    size: text(fd, "size", 80),
    image: text(fd, "image", 1000),
    description: text(fd, "description", 4000),
    galleryImages,
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    sortOrder: int(fd, "sortOrder"),
  };

  const errors = {};
  if (data.title.length < 2) errors.title = "Enter a project title.";
  if (!data.location) errors.location = "Enter the location.";
  if (!PROJECT_CATEGORIES.includes(data.category)) errors.category = "Choose a category.";
  if (!isImageUrl(data.image)) errors.image = "Use an https:// URL or a local path such as /assets/images/room.jpg.";
  if (galleryImages.some((image) => !isImageUrl(image))) {
    errors.galleryImages = "Each image must be an https:// URL or a local path such as /assets/images/room.jpg.";
  }
  if (Object.keys(errors).length) return invalid(errors, fd);

  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });

  updateTag(TAGS.projects);
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(id) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  updateTag(TAGS.projects);
  redirect("/admin/projects?deleted=1");
}

/* ---------- testimonials ---------- */

export async function saveTestimonial(_prev, fd) {
  await requireAdmin();
  const id = text(fd, "id");
  const data = {
    name: text(fd, "name", 120),
    project: text(fd, "project", 120),
    rating: Math.min(5, Math.max(1, int(fd, "rating", 5))),
    quote: text(fd, "quote", 1500),
    published: bool(fd, "published"),
    sortOrder: int(fd, "sortOrder"),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Enter the client's name.";
  if (data.quote.length < 10) errors.quote = "The review should be at least 10 characters.";
  if (Object.keys(errors).length) return invalid(errors, fd);

  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });

  updateTag(TAGS.testimonials);
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonial(id) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  updateTag(TAGS.testimonials);
  redirect("/admin/testimonials?deleted=1");
}

/* ---------- services ---------- */

export async function saveService(_prev, fd) {
  await requireAdmin();
  const id = text(fd, "id");
  const title = text(fd, "title", 120);
  const data = {
    title,
    slug: slugify(text(fd, "slug", 80) || title),
    summary: text(fd, "summary", 600),
    points: text(fd, "points", 2000)
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 12),
    image: text(fd, "image", 1000),
    published: bool(fd, "published"),
    sortOrder: int(fd, "sortOrder"),
  };

  const errors = {};
  if (title.length < 2) errors.title = "Enter a service name.";
  if (!data.slug) errors.slug = "Enter a URL name using letters and numbers.";
  if (data.summary.length < 10) errors.summary = "Write a short description (at least 10 characters).";
  if (!isImageUrl(data.image)) errors.image = "Use an https:// URL or a local path such as /assets/images/room.jpg.";
  if (!errors.slug) {
    const clash = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (clash && clash.id !== id) errors.slug = "Another service already uses this URL name.";
  }
  if (Object.keys(errors).length) return invalid(errors, fd);

  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });

  updateTag(TAGS.services);
  redirect("/admin/services?saved=1");
}

export async function deleteService(id) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  updateTag(TAGS.services);
  redirect("/admin/services?deleted=1");
}
