export const PROJECT_CATEGORIES = ["Residential", "Commercial", "Kitchen"];

export const INQUIRY_STATUSES = [
  { value: "new", label: "New", className: "bg-blue-50 text-blue-700 ring-blue-600/20" },
  { value: "contacted", label: "Contacted", className: "bg-amber-50 text-amber-800 ring-amber-600/20" },
  { value: "quoted", label: "Quote sent", className: "bg-purple-50 text-purple-700 ring-purple-600/20" },
  { value: "won", label: "Won", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
  { value: "lost", label: "Closed", className: "bg-stone-100 text-stone-600 ring-stone-500/20" },
];

export function statusMeta(value) {
  return INQUIRY_STATUSES.find((s) => s.value === value) ?? INQUIRY_STATUSES[0];
}

// Hosts that next/image is allowed to optimise (must match images.remotePatterns in next.config.mjs).
const OPTIMIZED_HOSTS = ["images.unsplash.com", "res.cloudinary.com"];

/** Other https images still display, just without Next's resizing. */
export function isOptimizable(src) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZED_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}
