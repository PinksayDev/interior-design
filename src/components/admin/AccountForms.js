"use client";

import { useActionState } from "react";
import { changePassword, createAdmin } from "@/app/admin/actions/auth";
import { SubmitButton } from "./FormBits";

function Message({ state }) {
  if (!state?.message) return null;
  return (
    <p role={state.ok ? "status" : "alert"} className={`rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
      {state.message}
    </p>
  );
}

export function AddAdminForm() {
  const [state, action] = useActionState(createAdmin, null);
  return (
    <form action={action} className="mt-5 space-y-4">
      <div>
        <label htmlFor="new-name" className="mb-1.5 block text-sm font-medium">Name</label>
        <input id="new-name" name="name" required className="field" />
      </div>
      <div>
        <label htmlFor="new-email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="new-email" name="email" type="email" required className="field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium">Temporary password</label>
        <input id="new-password" name="password" type="password" minLength={8} required className="field" autoComplete="new-password" />
      </div>
      <Message state={state} />
      <SubmitButton pendingText="Adding…">Add admin</SubmitButton>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action] = useActionState(changePassword, null);
  return (
    <form action={action} className="mt-5 space-y-4">
      <div>
        <label htmlFor="current" className="mb-1.5 block text-sm font-medium">Current password</label>
        <input id="current" name="current" type="password" required className="field" autoComplete="current-password" />
      </div>
      <div>
        <label htmlFor="next" className="mb-1.5 block text-sm font-medium">New password</label>
        <input id="next" name="next" type="password" minLength={8} required className="field" autoComplete="new-password" />
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">Confirm new password</label>
        <input id="confirm" name="confirm" type="password" minLength={8} required className="field" autoComplete="new-password" />
      </div>
      <Message state={state} />
      <SubmitButton pendingText="Updating…">Update password</SubmitButton>
    </form>
  );
}
