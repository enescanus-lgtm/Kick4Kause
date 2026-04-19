export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold tracking-wide ${
            dark
              ? "bg-white/15 text-k4k-sun"
              : "bg-k4k-spring text-k4k-forest shadow-sm ring-2 ring-k4k-grass/20"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-4 font-display text-4xl leading-tight tracking-tight sm:text-[2.75rem] ${
          dark ? "text-white drop-shadow-sm" : "text-k4k-forest"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-white/85" : "text-k4k-ink/75"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
