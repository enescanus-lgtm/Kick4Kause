"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="k4k-card mt-6 space-y-5 border-k4k-sun/40 p-6 sm:p-8"
    >
      <label className="block">
        <span className="text-sm font-extrabold text-k4k-forest">
          Password
        </span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="k4k-focus mt-2 w-full rounded-2xl border-2 border-k4k-grass/35 bg-white px-4 py-3.5 font-semibold text-k4k-forest outline-none focus:border-k4k-sun"
          placeholder="••••••••"
          required
        />
      </label>
      {error ? (
        <p
          className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="k4k-focus k4k-btn-bounce w-full rounded-full bg-k4k-pine py-3.5 text-sm font-extrabold text-white shadow-[0_4px_0_rgba(20,83,45,0.4)] hover:bg-k4k-forest disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
