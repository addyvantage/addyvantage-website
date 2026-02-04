export function Hero() {
  return (
    <section className="py-[var(--space-section)]">
      <h1 className="text-display font-semibold tracking-tight text-[var(--color-text)]">
        Aditya Singh
      </h1>
      <p className="mt-3 text-title text-[var(--color-text-muted)]">
        Building quiet software.
      </p>

      <nav className="mt-16 flex gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
        >
          Twitter
        </a>
        <a
          href="mailto:hello@example.com"
          className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
        >
          Email
        </a>
      </nav>
    </section>
  );
}
