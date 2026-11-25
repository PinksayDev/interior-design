"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveProject, saveService, saveTestimonial } from "@/app/admin/actions/content";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { Checkbox, Field, ImageUrlField, SubmitButton, invalidProps } from "./FormBits";

function FormFooter({ cancelHref, isEdit }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-sand pt-6">
      <SubmitButton>{isEdit ? "Save changes" : "Create"}</SubmitButton>
      <Link href={cancelHref} className="btn text-ink-soft hover:text-ink">Cancel</Link>
    </div>
  );
}

function ErrorSummary({ state }) {
  if (!state?.errors) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
      Please fix the highlighted fields.
    </p>
  );
}

/* Merge the item being edited with any values sent back after a failed save. */
function useValues(item, state, checkboxes = []) {
  if (!state?.values) return item ?? {};
  const v = { ...state.values };
  for (const name of checkboxes) v[name] = state.values[name] === "on";
  return v;
}

export function ProjectForm({ project }) {
  const [state, action] = useActionState(saveProject, null);
  const base = project
    ? { ...project, galleryImages: Array.isArray(project.galleryImages) ? project.galleryImages.join("\n") : "" }
    : { published: true };
  const v = useValues(base, state, ["featured", "published"]);
  const e = state?.errors ?? {};

  return (
    <form action={action} className="space-y-6" noValidate>
      {project && <input type="hidden" name="id" value={project.id} />}
      <ErrorSummary state={state} />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <Field label="Project title *" name="title" error={e.title}>
            <input id="title" name="title" defaultValue={v.title} className="field" placeholder="e.g. Emerald Living Room" {...invalidProps(e, "title")} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Location *" name="location" error={e.location}>
              <input id="location" name="location" defaultValue={v.location} className="field" placeholder="e.g. Baner, Pune" {...invalidProps(e, "location")} />
            </Field>
            <Field label="Category *" name="category" error={e.category}>
              <select id="category" name="category" defaultValue={v.category ?? ""} className="field" {...invalidProps(e, "category")}>
                <option value="" disabled>Choose…</option>
                {PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Size / type" name="size" hint="e.g. 3 BHK · 1,650 sq ft">
              <input id="size" name="size" defaultValue={v.size} className="field" />
            </Field>
            <Field label="Display order" name="sortOrder" hint="Lower numbers appear first">
              <input id="sortOrder" name="sortOrder" type="number" defaultValue={v.sortOrder ?? 0} className="field" />
            </Field>
          </div>
          <Field label="Project details" name="description" hint="Describe the design, materials, or work completed for this project.">
            <textarea id="description" name="description" rows={5} maxLength={4000} defaultValue={v.description} className="field" />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Checkbox name="published" label="Show on website" defaultChecked={v.published} hint="Untick to hide without deleting" />
            <Checkbox name="featured" label="Feature on home page" defaultChecked={v.featured} hint="Up to 3 featured projects are shown" />
          </div>
        </div>
        <div className="space-y-6">
          <ImageUrlField defaultValue={v.image ?? ""} error={e.image} />
          <Field
            label="More project images"
            name="galleryImages"
            error={e.galleryImages}
            hint="Add one https:// URL or /assets/images/filename.jpg path per line."
          >
            <textarea
              id="galleryImages"
              name="galleryImages"
              rows={8}
              defaultValue={v.galleryImages ?? ""}
              className="field"
              {...invalidProps(e, "galleryImages")}
            />
          </Field>
        </div>
      </div>
      <FormFooter cancelHref="/admin/projects" isEdit={!!project} />
    </form>
  );
}

export function TestimonialForm({ testimonial }) {
  const [state, action] = useActionState(saveTestimonial, null);
  const v = useValues(testimonial ?? { published: true, rating: 5 }, state, ["published"]);
  const e = state?.errors ?? {};

  return (
    <form action={action} className="max-w-2xl space-y-5" noValidate>
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}
      <ErrorSummary state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Client name *" name="name" error={e.name}>
          <input id="name" name="name" defaultValue={v.name} className="field" placeholder="e.g. Priya & Amit Sharma" {...invalidProps(e, "name")} />
        </Field>
        <Field label="Project" name="project" hint="e.g. 3 BHK Apartment, Baner">
          <input id="project" name="project" defaultValue={v.project} className="field" />
        </Field>
      </div>
      <Field label="Review *" name="quote" error={e.quote}>
        <textarea id="quote" name="quote" rows={5} defaultValue={v.quote} className="field" {...invalidProps(e, "quote")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Rating" name="rating">
          <select id="rating" name="rating" defaultValue={String(v.rating ?? 5)} className="field">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
          </select>
        </Field>
        <Field label="Display order" name="sortOrder" hint="Lower numbers appear first">
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={v.sortOrder ?? 0} className="field" />
        </Field>
      </div>
      <Checkbox name="published" label="Show on website" defaultChecked={v.published} />
      <FormFooter cancelHref="/admin/testimonials" isEdit={!!testimonial} />
    </form>
  );
}

export function ServiceForm({ service }) {
  const [state, action] = useActionState(saveService, null);
  const base = service ? { ...service, points: service.points.join("\n") } : { published: true };
  const v = useValues(base, state, ["published"]);
  const e = state?.errors ?? {};

  return (
    <form action={action} className="space-y-6" noValidate>
      {service && <input type="hidden" name="id" value={service.id} />}
      <ErrorSummary state={state} />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service name *" name="title" error={e.title}>
              <input id="title" name="title" defaultValue={v.title} className="field" placeholder="e.g. Modular Kitchens" {...invalidProps(e, "title")} />
            </Field>
            <Field label="URL name" name="slug" error={e.slug} hint="Used in links like /services#modular-kitchens. Leave blank to create one from the name.">
              <input id="slug" name="slug" defaultValue={v.slug} className="field" placeholder="modular-kitchens" {...invalidProps(e, "slug")} />
            </Field>
          </div>
          <Field label="Short description *" name="summary" error={e.summary}>
            <textarea id="summary" name="summary" rows={3} defaultValue={v.summary} className="field" {...invalidProps(e, "summary")} />
          </Field>
          <Field label="Key features" name="points" hint="One per line. Shown as a checklist.">
            <textarea id="points" name="points" rows={5} defaultValue={v.points} className="field" placeholder={"Space planning & 3D visualisation\nFalse ceilings & lighting"} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Display order" name="sortOrder" hint="Lower numbers appear first">
              <input id="sortOrder" name="sortOrder" type="number" defaultValue={v.sortOrder ?? 0} className="field" />
            </Field>
            <div className="self-end">
              <Checkbox name="published" label="Show on website" defaultChecked={v.published} />
            </div>
          </div>
        </div>
        <ImageUrlField defaultValue={v.image ?? ""} error={e.image} />
      </div>
      <FormFooter cancelHref="/admin/services" isEdit={!!service} />
    </form>
  );
}
