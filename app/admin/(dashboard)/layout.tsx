import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { logoutAdmin } from "../actions";

export default async function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-k4k-mist">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-k4k-sun/40 bg-k4k-forest px-4 py-3 text-white sm:px-6">
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-lg tracking-tight"
          aria-label="Admin"
        >
          <Link
            href="/admin"
            className="text-k4k-sun hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k4k-sun"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/schedule"
            className="hover:text-k4k-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k4k-sun"
          >
            Schedule
          </Link>
          <Link
            href="/"
            className="font-sans text-sm font-extrabold text-white/70 hover:text-white"
          >
            ← Public site
          </Link>
        </nav>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="k4k-focus rounded-full bg-k4k-sun px-4 py-2 text-sm font-extrabold text-k4k-forest shadow-[0_3px_0_rgba(20,83,45,0.35)] hover:brightness-105"
          >
            Log out
          </button>
        </form>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
