export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`k4k-page-play flex min-h-screen flex-col ${className}`.trim()}
    >
      {children}
    </div>
  );
}
