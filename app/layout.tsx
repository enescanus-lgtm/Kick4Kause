import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { PageShell } from "@/components/layout/page-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kick4Kause | Summer soccer camp",
    template: "%s | Kick4Kause",
  },
  description:
    "Kick4Kause summer soccer camp at Leigh High School — skills, teamwork, and community for young players. Proceeds benefit Xavier Jesuit School.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-sans min-h-full font-medium">
        <PageShell>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageShell>
      </body>
    </html>
  );
}
