"use client";

import { useActionState } from "react";
import { registerFirstAdmin } from "@/app/admin/actions/auth";
import { SubmitButton } from "./FormBits";

export default function RegistrationForm() {
  const [state, action] = useActionState(registerFirstAdmin, null);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label>
        <input id="name" name="name" defaultValue={state?.name} required minLength={2} autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" defaultValue={state?.email} required autoComplete="username" className="field" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="field" />
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">Confirm password</label>
        <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="field" />
      </div>
      {state?.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{state.message}</p>
      )}
      <SubmitButton pendingText="Creating account…" className="btn-primary w-full">Create admin account</SubmitButton>
    </form>
  );
}
