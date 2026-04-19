import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact & social",
};

export default function ContactPage() {
  return (
    <div className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <Container>
        <SectionHeading
          eyebrow="Stay connected"
          title="Reach the Kick4Kause team"
          subtitle="We are a volunteer-led summer camp. Email is the fastest way to reach us; more payment and schedule details go out after you sign up."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <a
              href="mailto:kick4kause@gmail.com"
              className="k4k-focus k4k-card group flex items-center gap-5 rounded-2xl p-5 transition hover:border-k4k-mint/40"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-k4k-forest text-2xl text-k4k-spring shadow-inner">
                ✉️
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-k4k-forest">
                  Camp questions
                </span>
                <span className="block truncate text-base font-extrabold text-k4k-pine">
                  kick4kause@gmail.com
                </span>
                <span className="mt-1 block text-sm text-k4k-black/60">
                  Registration, schedule, coaching, and anything about the week.
                </span>
              </span>
              <span className="ml-auto text-k4k-leaf opacity-0 transition group-hover:opacity-100">
                ↗
              </span>
            </a>

            <div className="k4k-card rounded-2xl p-5">
              <p className="text-sm font-semibold text-k4k-forest">Payments</p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-k4k-black/70">
                <a
                  href="https://venmo.com/Spark912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="k4k-focus font-extrabold text-k4k-leaf underline decoration-k4k-mint decoration-2 underline-offset-4"
                >
                  Venmo @Spark912
                </a>
                , PayPal, or Zelle to{" "}
                <a
                  href="mailto:spark912@gmail.com"
                  className="k4k-focus font-extrabold text-k4k-leaf underline decoration-k4k-mint decoration-2 underline-offset-4"
                >
                  spark912@gmail.com
                </a>
                . Full week is $150 per child; drop-ins are $40 per day.
              </p>
            </div>
            <div className="k4k-card rounded-2xl p-5">
              <p className="text-sm font-extrabold text-k4k-forest">
                Social feeds
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-k4k-black/65">
                We will link Instagram, Facebook, and other channels here once
                handles are finalized. For now, email is the source of truth.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-k4k-pine/12 shadow-k4k-soft">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=960&q=80"
                alt="Team huddle"
                width={960}
                height={540}
                className="h-52 w-full object-cover"
              />
              <div className="space-y-4 bg-k4k-cream p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-k4k-leaf">
                    Camp location
                  </p>
                  <p className="mt-1 text-lg font-bold text-k4k-forest">
                    Leigh High School
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-k4k-black/68">
                    Grass field · San Jose, CA
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-k4k-leaf">
                    Extra love
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-k4k-black/68">
                    Additional donations beyond the camp fee are always
                    appreciated and go straight to Xavier Jesuit School alongside
                    registration proceeds.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="k4k-focus k4k-btn-bounce inline-flex rounded-full bg-k4k-sun px-6 py-3 text-sm font-extrabold text-k4k-forest shadow-[0_4px_0_rgba(20,83,45,0.3)] hover:brightness-105"
                >
                  Register for camp ✨
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
