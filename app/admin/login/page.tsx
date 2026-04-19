import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { authConfigured, isAdminAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-k4k-cream px-4 py-12">
      <div className="w-full max-w-md">
        <p className="text-center font-display text-2xl text-k4k-forest">
          Kick4Kause
        </p>
        <h1 className="mt-2 text-center font-display text-3xl text-k4k-pine">
          Staff login
        </h1>
        <p className="mt-2 text-center text-sm font-semibold text-k4k-black/60">
          For coaches &amp; organizers only
        </p>

        {!authConfigured() ? (
          <div
            className="mt-6 rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 text-sm font-semibold text-amber-950"
            role="status"
          >
            <p className="font-extrabold">Setup needed</p>
            <p className="mt-2 leading-relaxed">
              Create{" "}
              <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-xs">
                .env.local
              </code>{" "}
              with{" "}
              <code className="font-mono text-xs">ADMIN_PASSWORD</code> (8+
              characters) and{" "}
              <code className="font-mono text-xs">AUTH_SECRET</code> (16+
              random characters). See{" "}
              <code className="font-mono text-xs">.env.example</code>. Restart{" "}
              <code className="font-mono text-xs">npm run dev</code> after
              saving.
            </p>
          </div>
        ) : null}

        <AdminLoginForm />
      </div>
    </div>
  );
}
