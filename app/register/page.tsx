import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Join the squad"
              title="Player registration"
              subtitle="Sign up for Kick4Kause summer camp (August 4–8, 9:00 AM–12:00 PM at Leigh High School). We save responses locally for this demo site — you will still get follow-up details by email from the team."
            />
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-k4k-pine/12 shadow-[var(--shadow-k4k-soft)]">
              <Image
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80"
                alt="Kids playing soccer"
                width={900}
                height={560}
                className="h-56 w-full object-cover sm:h-72"
              />
              <div className="border-t border-k4k-pine/10 bg-k4k-cream/95 p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold text-k4k-forest">
                  What happens next?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-k4k-black/68">
                  The form asks for emergency contacts, your child&apos;s grade
                  and soccer background, and whether they are coming the full
                  week ($150) or for drop-in day(s) ($40/day). Pay via Venmo
                  (@Spark912), PayPal, or Zelle to spark912@gmail.com. More
                  payment and arrival info will be emailed after sign-ups.
                  Proceeds benefit Xavier Jesuit School.
                </p>
              </div>
            </div>
          </div>
          <RegisterForm />
        </div>
      </Container>
    </div>
  );
}
