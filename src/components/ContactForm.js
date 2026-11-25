"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/(site)/contact/actions";
import { Check } from "./Icons";

const budgets = ["Under ₹5 Lakh", "₹5 – 10 Lakh", "₹10 – 20 Lakh", "₹20 – 40 Lakh", "₹40 Lakh+"];

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ serviceOptions = [] }) {
  const [state, formAction, pending] = useActionState(submitInquiry, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white p-10 text-center sm:p-14" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-3xl">Message received</h3>
        <p className="mt-3 max-w-sm text-ink-soft">{state.message}</p>
      </div>
    );
  }

  const v = state?.values ?? {};
  const e = state?.errors ?? {};
  const invalid = (name) => (e[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <form action={formAction} className="relative overflow-hidden rounded-3xl bg-white p-7 sm:p-10" noValidate>
      <h3 className="font-serif text-3xl">Book a free consultation</h3>
      <p className="mt-2 text-sm text-ink-soft">Share a few details and we&apos;ll get back to you within 24 hours.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" name="name" error={e.name}>
          <input id="name" name="name" autoComplete="name" defaultValue={v.name} className="field" required {...invalid("name")} />
        </Field>
        <Field label="Phone *" name="phone" error={e.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className="field" placeholder="+91" required {...invalid("phone")} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email *" name="email" error={e.email}>
            <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className="field" required {...invalid("email")} />
          </Field>
        </div>
        <Field label="Service" name="service">
          <select id="service" name="service" defaultValue={v.service ?? ""} className="field">
            <option value="">Select a service</option>
            {serviceOptions.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget" name="budget">
          <select id="budget" name="budget" defaultValue={v.budget ?? ""} className="field">
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Tell us about your project *" name="message" error={e.message}>
            <textarea id="message" name="message" rows={5} defaultValue={v.message} className="field resize-y" placeholder="e.g. 3 BHK apartment in Baner, possession in March, looking for full home interiors…" required {...invalid("message")} />
          </Field>
        </div>
        {/* Honeypot, hidden from people */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state?.message && !state.ok && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary mt-8 w-full disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
