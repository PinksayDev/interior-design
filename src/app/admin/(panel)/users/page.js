import { Suspense } from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteAdmin } from "@/app/admin/actions/auth";
import { Badge, Card, Flash, ListSkeleton, PageHeader, formatDate } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/FormBits";
import { AddAdminForm, ChangePasswordForm } from "@/components/admin/AccountForms";

export const metadata = { title: "Admin users" };

export default function UsersPage({ searchParams }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin users" description="People who can sign in to this admin panel." />
      <Suspense fallback={<ListSkeleton rows={3} />}>
        <Users searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Users({ searchParams }) {
  const me = await requireAdmin();
  const [sp, users] = await Promise.all([
    searchParams,
    prisma.adminUser.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, email: true, lastLoginAt: true, createdAt: true },
    }),
  ]);

  return (
    <>
      {sp.saved && <Flash>Admin added. They can now sign in with the password you set.</Flash>}
      {sp.deleted && <Flash>Admin removed.</Flash>}
      {sp.error === "self" && <Flash tone="error">You can&apos;t remove your own account.</Flash>}

      <Card className="overflow-hidden">
        <ul className="divide-y divide-sand">
          {users.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand font-semibold text-accent-dark">
                {u.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-medium">
                  {u.name} {u.id === me.id && <Badge className="bg-blue-50 text-blue-700 ring-blue-600/20">You</Badge>}
                </span>
                <span className="block truncate text-sm text-stone">{u.email}</span>
              </span>
              <span className="text-xs text-stone">
                {u.lastLoginAt ? `Last sign-in ${formatDate(u.lastLoginAt, true)}` : "Never signed in"}
              </span>
              {u.id !== me.id && (
                <DeleteButton
                  action={deleteAdmin.bind(null, u.id)}
                  label="Remove"
                  className="px-4 py-2"
                  confirmText={`Remove ${u.name}'s admin access?`}
                />
              )}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-serif text-2xl">Add an admin</h2>
          <p className="mt-1 text-sm text-stone">Share the password with them privately. They can change it after signing in.</p>
          <AddAdminForm />
        </Card>
        <Card className="p-6">
          <h2 className="font-serif text-2xl">Change your password</h2>
          <ChangePasswordForm />
        </Card>
      </div>
    </>
  );
}
