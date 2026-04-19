import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t-[3px] border-k4k-grass/30 bg-gradient-to-b from-k4k-forest to-[#124a28] text-k4k-mist">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(253,224,71,0.18), transparent 40%), radial-gradient(circle at 90% 20%, rgba(125,211,252,0.15), transparent 35%)",
        }}
      />
      <div className="k4k-bubbles pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl tracking-tight text-white">
            Kick4Kause ⚽
          </p>
          <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-k4k-spring/90">
            Summer soccer at Leigh High School for elementary players (and
            rising 6th graders). Every kick is for a cause — proceeds support
            Xavier Jesuit School.
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-k4k-sun">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm font-bold">
            <li>
              <Link
                href="/coaches"
                className="k4k-focus rounded-lg text-white/90 hover:text-k4k-sun"
              >
                Coaches
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                className="k4k-focus rounded-lg text-white/90 hover:text-k4k-sun"
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="k4k-focus rounded-lg text-white/90 hover:text-k4k-sun"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-k4k-sun">
            Say hi
          </p>
          <ul className="mt-4 space-y-2 text-sm font-bold">
            <li>
              <Link
                href="/contact"
                className="k4k-focus rounded-lg text-white/90 hover:text-k4k-sky"
              >
                Social &amp; contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:kick4kause@gmail.com"
                className="k4k-focus rounded-lg text-white/90 hover:text-k4k-sky"
              >
                kick4kause@gmail.com
              </a>
            </li>
            <li className="font-semibold text-white/80">
              Leigh High School · San Jose, CA
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-6 text-center text-xs font-semibold text-white/45">
        © {new Date().getFullYear()} Kick4Kause · August day camp on the grass
        field · Questions? kick4kause@gmail.com
        <span className="mx-2 text-white/25" aria-hidden>
          ·
        </span>
        <Link
          href="/admin/login"
          className="k4k-focus rounded text-k4k-sky/80 hover:text-k4k-sun"
        >
          Staff login
        </Link>
      </div>
    </footer>
  );
}
