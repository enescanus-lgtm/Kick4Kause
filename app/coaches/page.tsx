import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Coaches",
};

const coaches = [
  {
    name: "Joshua Lee",
    role: "Leigh High School JV Soccer",
    bio: "Los Gatos United ECNL RL (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=640&q=80",
  },
  {
    name: "Ryan Lee",
    role: "Leigh High School JV Soccer",
    bio: "Los Gatos United ECNL RL (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=640&q=80",
  },
  {
    name: "Chloe Kang",
    role: "St. Francis High School Soccer",
    bio: "Almaden FC GA (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=640&q=80",
  },
  {
    name: "Aashi Ahuja",
    role: "Archbishop Mitty High School Soccer",
    bio: "Almaden FC GA (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=640&q=80",
  },
  {
    name: "Rebecca Guting",
    role: "Los Altos High School Soccer",
    bio: "Almaden FC GA (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=640&q=80",
  },
  {
    name: "Jack Bisbee",
    role: "Leigh High School Soccer",
    bio: "Los Gatos United ECNL-RL (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1504450758480-271c5ebe7f40?w=640&q=80",
  },
  {
    name: "Emerson Kosmynka",
    role: "Presentation High School Soccer",
    bio: "Almaden FC GA (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=640&q=80",
  },
  {
    name: "Kenzo de Jesus",
    role: "Leigh High School Soccer",
    bio: "Los Gatos United ECNL (2010)\nRising Junior",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=640&q=80",
  },
];

export default function CoachesPage() {
  return (
    <div className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <Container>
        <SectionHeading
          eyebrow="People"
          title="Meet our coaches"
          subtitle="High school and club players who love the game and are excited to coach elementary campers. Photos are camp-themed stock art — say hi on the field and you will meet everyone in person."
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c) => (
            <li key={c.name}>
              <article className="k4k-card group flex h-full flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`Soccer-themed image for ${c.name}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-k4k-black/55 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-2xl tracking-tight text-k4k-forest">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-k4k-pine">
                    {c.role}
                  </p>
                  <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-k4k-black/68">
                    {c.bio}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
