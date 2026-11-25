import Link from "next/link";
import { statusMeta } from "@/lib/constants";

export function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-medium">{title}</h1>
        {description && <p className="mt-1 text-sm text-stone">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-sand bg-white ${className}`}>{children}</div>;
}

export function Badge({ className = "bg-stone-100 text-stone-700 ring-stone-500/20", children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const meta = statusMeta(status);
  return <Badge className={meta.className}>{meta.label}</Badge>;
}

export function Flash({ tone = "success", children }) {
  const tones = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };
  return (
    <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>
      {children}
    </p>
  );
}

export function EmptyState({ title, text, href, cta }) {
  return (
    <Card className="flex flex-col items-center px-6 py-16 text-center">
      <p className="font-serif text-2xl">{title}</p>
      {text && <p className="mt-2 max-w-sm text-sm text-stone">{text}</p>}
      {href && (
        <Link href={href} className="btn-primary mt-6">
          {cta}
        </Link>
      )}
    </Card>
  );
}

export function ListSkeleton({ rows = 5 }) {
  return (
    <Card className="divide-y divide-sand" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <div className="h-12 w-12 animate-pulse rounded-lg bg-sand" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-sand" />
            <div className="h-3 w-1/5 animate-pulse rounded bg-sand/70" />
          </div>
        </div>
      ))}
    </Card>
  );
}

export function formatDate(date, withTime = false) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: "Asia/Kolkata",
  }).format(date);
}
