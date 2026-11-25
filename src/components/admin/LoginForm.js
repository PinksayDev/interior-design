"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions/auth";
import { SubmitButton } from "./FormBits";

export default function LoginForm() {
  const [state, action] = useActionState(login, null);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" defaultValue={state?.email} required className="field" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {state?.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</p>
      )}
      <SubmitButton pendingText="Signing in…" className="btn-primary w-full">Sign in</SubmitButton>
    </form>
  );
}
