"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/coaches", label: "Coaches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
  { href: "/register", label: "Register" },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.15rem] border-[3px] border-k4k-sun bg-gradient-to-br from-k4k-lime to-k4k-mint shadow-[0_6px_0_rgba(10,20,12,0.12),0_10px_28px_-6px_rgba(34,197,94,0.45)]"
        aria-hidden
      >
        <span className="font-display text-2xl leading-none text-k4k-forest">
          K4
        </span>
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-k4k-sun text-xs"
          aria-hidden
        >
          ⚽
        </span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-xl text-white md:text-2xl">
          Kick4Kause
        </span>
        <span className="text-xs font-bold text-k4k-sun">
          Summer camp · every kick for a cause
        </span>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-k4k-sun/40 bg-gradient-to-r from-k4k-forest via-k4k-pine to-k4k-forest shadow-[0_8px_24px_-8px_rgba(22,101,52,0.45)]">
      <div className="k4k-bubbles pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="k4k-focus z-10 flex items-center gap-2 rounded-2xl outline-offset-4"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
        </Link>

        <nav
          className="hidden items-center gap-1.5 md:flex"
          aria-label="Main navigation"
        >
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`k4k-focus rounded-full px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-k4k-sun text-k4k-forest shadow-[0_3px_0_rgba(20,83,45,0.35)]"
                    : "text-white hover:bg-white/15 hover:ring-2 hover:ring-k4k-sky/50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/register"
          className="k4k-focus k4k-btn-bounce hidden rounded-full bg-k4k-sky px-5 py-2.5 text-sm font-extrabold text-k4k-forest shadow-[0_5px_0_#0ea5e9] transition hover:brightness-105 md:inline-flex"
        >
          Sign up! ✨
        </Link>

        <button
          type="button"
          className="k4k-focus inline-flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-white/25 bg-white/10 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`relative border-t-[3px] border-k4k-sun/30 bg-k4k-pine md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          className="flex flex-col gap-2 px-4 py-4"
          aria-label="Mobile navigation"
        >
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`k4k-focus rounded-2xl px-4 py-3.5 text-base font-bold ${
                  active
                    ? "bg-k4k-sun text-k4k-forest"
                    : "bg-white/10 text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/register"
            className="k4k-focus mt-1 rounded-2xl bg-k4k-sky py-3.5 text-center text-base font-extrabold text-k4k-forest"
            onClick={() => setOpen(false)}
          >
            Sign up! ✨
          </Link>
        </nav>
      </div>
    </header>
  );
}
