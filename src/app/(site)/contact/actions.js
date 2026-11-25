"use server";

import prisma from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,15}$/;

function clean(value, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitInquiry(_prevState, formData) {
  // Honeypot field: real visitors never see or fill it, bots usually do.
  if (clean(formData.get("company"))) {
    return { ok: true, message: "Thank you! We'll be in touch shortly." };
  }

  const values = {
    name: clean(formData.get("name"), 100),
    email: clean(formData.get("email"), 150),
    phone: clean(formData.get("phone"), 20),
    service: clean(formData.get("service"), 80) || null,
    budget: clean(formData.get("budget"), 40) || null,
    message: clean(formData.get("message"), 2000),
  };

  const errors = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.message.length < 10) errors.message = "Tell us a little more about your project (at least 10 characters).";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values, message: "Please fix the highlighted fields." };
  }

  try {
    await prisma.contactInquiry.create({ data: values });
  } catch (err) {
    console.error("Failed to save contact inquiry:", err);
    return {
      ok: false,
      values,
      message: "Sorry, something went wrong on our side. Please try again, or reach us on WhatsApp or by phone.",
    };
  }

  return {
    ok: true,
    message: `Thank you, ${values.name.split(" ")[0]}! Our design team will call you within 24 hours.`,
  };
}
