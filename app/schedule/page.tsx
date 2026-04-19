import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { readSchedule } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

export default async function SchedulePage() {
  const { weekdays, sidebarTitle, sidebarBody } = await readSchedule();

  return (
    <div className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <section className="relative overflow-hidden">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Summer 2026"
                title="Camp week at a glance"
                subtitle="Five mornings on the Leigh grass field. Staff can fine-tune this grid in the admin area if anything shifts — families always get the latest by email after sign-up."
              />

              <div className="mt-12 space-y-4">
                {weekdays.map((row) => (
                  <div
                    key={`${row.day}-${row.blocks.map((b) => b.time).join()}`}
                    className="k4k-card overflow-hidden rounded-2xl px-5 py-5 sm:px-7 sm:py-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10">
                      <p className="w-36 shrink-0 font-display text-2xl tracking-tight text-k4k-pine">
                        {row.day}
                      </p>
                      <ul className="min-w-0 flex-1 space-y-4">
                        {row.blocks.map((b) => (
                          <li
                            key={`${row.day}-${b.time}-${b.label}`}
                            className="flex flex-col gap-1 border-l-2 border-k4k-mint/80 pl-4 sm:flex-row sm:items-baseline sm:gap-6"
                          >
                            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-k4k-leaf">
                              {b.time}
                            </span>
                            <span className="text-sm font-semibold leading-relaxed text-k4k-black/72">
                              {b.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl border border-k4k-pine/15 shadow-[var(--shadow-k4k-soft)]">
                <Image
                  src="https://images.unsplash.com/photo-1459865264687-595fad652e4a?w=720&q=80"
                  alt="Soccer field aerial view"
                  width={720}
                  height={520}
                  className="h-56 w-full object-cover sm:h-64"
                />
                <div className="border-t border-k4k-pine/10 bg-k4k-cream p-6">
                  <p className="text-sm font-extrabold text-k4k-forest">
                    {sidebarTitle}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-k4k-black/65">
                    {sidebarBody}
                  </p>
                  <Link
                    href="/contact"
                    className="k4k-focus mt-5 inline-flex text-sm font-extrabold text-k4k-leaf underline decoration-k4k-mint decoration-2 underline-offset-4"
                  >
                    Questions? Contact us
                  </Link>
                </div>
              </div>

              <div className="k4k-card-dark rounded-3xl p-6 text-k4k-mist/85">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-k4k-spring/90">
                  Before you arrive
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed">
                  Bring water, sunscreen, shin guards, and cleats or turf shoes.
                  Daily drop-ins are $40 — check in at the tent so we know who is
                  on the field. Full-week fee is $150 per child.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
