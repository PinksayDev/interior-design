"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

export function Field({ label, name, error, hint, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-stone">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props that mark an input invalid and link it to its error message. */
export function invalidProps(errors, name) {
  return errors?.[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};
}

export function SubmitButton({ children = "Save", pendingText = "Saving…", className = "btn-primary" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`}>
      {pending ? pendingText : children}
    </button>
  );
}

/** A form that asks for confirmation before running a delete Server Action. */
export function DeleteButton({ action, label = "Delete", confirmText = "Delete this item? This can't be undone.", className = "" }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <SubmitButton
        pendingText="Deleting…"
        className={`btn border border-red-200 bg-white text-red-700 hover:bg-red-50 ${className}`}
      >
        {label}
      </SubmitButton>
    </form>
  );
}

export function Checkbox({ name, label, defaultChecked, hint }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand bg-white p-4">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 h-4 w-4 accent-accent" />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-xs text-stone">{hint}</span>}
      </span>
    </label>
  );
}

/** Image URL input with a live preview. */
export function ImageUrlField({ name = "image", defaultValue = "", error }) {
  const [url, setUrl] = useState(defaultValue);
  const looksValid = /^https:\/\/\S+$/.test(url) || /^\/(?!\/)\S+$/.test(url);
  return (
    <Field
      label="Image URL or local path *"
      name={name}
      error={error}
      hint="Use an https:// image URL or a local path such as /assets/images/room.jpg."
    >
      <input
        id={name}
        name={name}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value.trim())}
        placeholder="https://images.unsplash.com/photo-…"
        className="field"
        required
        {...invalidProps(error ? { [name]: error } : null, name)}
      />
      <div className="relative mt-3 aspect-[16/9] w-full overflow-hidden rounded-xl border border-dashed border-sand bg-cream">
        {looksValid ? (
          // eslint-disable-next-line @next/next/no-img-element -- live preview of any pasted URL
          <img src={url} alt="Preview" className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs text-stone">Image preview</span>
        )}
      </div>
    </Field>
  );
}
