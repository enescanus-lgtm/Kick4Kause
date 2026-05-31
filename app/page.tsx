import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const mosaic = [
  {
    src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    alt: "Soccer ball on field",
    className: "md:col-span-2 md:row-span-2 ring-k4k-sun",
  },
  {
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    alt: "Players training",
    className: "ring-k4k-sky",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    alt: "Team celebration",
    className: "ring-k4k-pop",
  },
  {
    src: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=900&q=80",
    alt: "Stadium crowd",
    className: "md:col-span-2 ring-k4k-lime",
  },
];

const valueCards = [
  {
    title: "Every kick is for a cause",
    body: "Kick4Kause is a summer soccer camp that spreads passion for the game while supporting Xavier Jesuit School — every registration helps the wider community.",
    accent: "border-t-k4k-sun",
    sticker: "🌟",
  },
  {
    title: "Coaches who care",
    body: "High school and club players lead age-appropriate coaching, teamwork, and scrimmages in a supportive, high-energy environment.",
    accent: "border-t-k4k-sky-deep",
    sticker: "📣",
  },
  {
    title: "Built for young players",
    body: "Ideal for kids in elementary school through rising 6th graders — first-timers and returning players are all welcome.",
    accent: "border-t-k4k-pop",
    sticker: "⚽",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden k4k-hero-bg">
        <div className="k4k-bubbles pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-extrabold text-k4k-sun ring-2 ring-k4k-sun/35">
                <span aria-hidden>👋</span> Hi, families!
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-[3.35rem]">
                A soccer camp where every kick is for a{" "}
                <span className="text-k4k-sun drop-shadow-md">cause</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-white/90">
                Kick4Kause is a summer soccer camp dedicated to spreading passion
                and love for the game to younger children, while making a positive
                impact on communities in need. Proceeds go to Xavier Jesuit
                School.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="k4k-focus k4k-btn-bounce inline-flex items-center justify-center rounded-full bg-k4k-sun px-8 py-4 text-sm font-extrabold text-k4k-forest shadow-[0_6px_0_rgba(20,83,45,0.35)] hover:brightness-105"
                >
                  Register a player 🎉
                </Link>
                <Link
                  href="/schedule"
                  className="k4k-focus k4k-btn-bounce inline-flex items-center justify-center rounded-full border-[3px] border-white/70 bg-white/10 px-8 py-4 text-sm font-extrabold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Camp dates ⏰
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-k4k-sun/35 blur-2xl"
                aria-hidden
              />
              <div
                className="absolute -bottom-6 -right-2 h-36 w-36 rounded-full bg-k4k-sky/30 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[2rem] border-[4px] border-k4k-sun bg-k4k-sun/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] ring-4 ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1504450758480-271c5ebe7f40?w=960&q=85"
                  alt="Youth soccer on grass"
                  width={960}
                  height={720}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-k4k-forest/40 via-transparent to-k4k-sky/10" />
                <div className="absolute bottom-0 left-0 right-0 border-t-[3px] border-k4k-sun/60 bg-k4k-forest/75 p-5 backdrop-blur-md">
                  <p className="text-base font-extrabold text-white">
                    August 4–8 · 9:00 AM–12:00 PM
                  </p>
                  <p className="mt-1 text-sm font-semibold text-k4k-spring">
                    $150 per child · Drop-ins $40/day · Venmo @Spark912, PayPal, or
                    Zelle (spark912@gmail.com)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Why we exist"
              title="Skills, teamwork, and heart"
              subtitle="Whether your child is just getting started or building on what they already know, we mix fundamentals, small-sided play, and plenty of encouragement."
            />
            <div className="k4k-card relative overflow-hidden p-8 sm:p-10">
              <div
                className="pointer-events-none absolute -right-12 -top-12 text-8xl opacity-[0.12]"
                aria-hidden
              >
                🥅
              </div>
              <p className="relative text-base font-semibold leading-relaxed text-k4k-black/78">
                Kick4Kause is designed for players in elementary school, and
                those entering 6th grade are welcome too. You will get
                age-appropriate coaching in a supportive, energetic environment
                where every kid belongs.
              </p>
              <p className="relative mt-5 text-base font-semibold leading-relaxed text-k4k-black/78">
                After you sign up, we will email more details on payments,
                schedules, and what to bring. Questions? Reach us at{" "}
                <a
                  href="mailto:kick4kause@gmail.com"
                  className="font-extrabold text-k4k-leaf underline decoration-k4k-mint decoration-2 underline-offset-2"
                >
                  kick4kause@gmail.com
                </a>
                .
              </p>
              <Link
                href="/coaches"
                className="k4k-focus k4k-btn-bounce relative mt-8 inline-flex rounded-full bg-k4k-spring px-5 py-2.5 text-sm font-extrabold text-k4k-forest ring-2 ring-k4k-grass/30 hover:brightness-105"
              >
                Meet the coaching crew →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y-[3px] border-dashed border-k4k-grass/25 bg-k4k-spring/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Photo reel"
            title="Camp energy in every frame"
            subtitle="Stock moments from the beautiful game for now — we would love to swap in your own camp photos after the first week on the field."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:gap-5">
            {mosaic.map((item, i) => (
              <div
                key={item.alt}
                className={`group relative overflow-hidden rounded-[1.35rem] ring-4 ${item.className}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="h-full min-h-[200px] w-full object-cover transition duration-700 group-hover:scale-[1.05] group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-k4k-forest/50 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className={`k4k-card group relative overflow-hidden border-t-[6px] ${card.accent} p-8 transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-k4k-lift)]`}
              >
                <span
                  className="mb-3 inline-flex rounded-full bg-k4k-mist px-3 py-1 text-lg"
                  aria-hidden
                >
                  {card.sticker}
                </span>
                <h3 className="font-display text-2xl text-k4k-forest">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-k4k-black/68">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-k4k-pine via-k4k-grass to-k4k-pine py-14 sm:py-16">
        <div className="k4k-bubbles pointer-events-none absolute inset-0 opacity-40" />
        <Container className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to lace up? 👟
            </h2>
            <p className="mt-2 max-w-xl font-semibold text-white/90">
              We hope you join us — because every kick is for a cause. Save a
              spot and we will follow up with payment and camp details.
            </p>
          </div>
          <Link
            href="/register"
            className="k4k-focus k4k-btn-bounce inline-flex shrink-0 rounded-full bg-k4k-sun px-8 py-4 text-sm font-extrabold text-k4k-forest shadow-[0_6px_0_rgba(20,83,45,0.4)] hover:brightness-105"
          >
            Start registration ✨
          </Link>
        </Container>
      </section>
    </>
  );
}
