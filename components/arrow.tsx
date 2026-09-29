/** One arrow for the whole site: "right" for internal links, "up-right" for external, "left" for back. */
export function Arrow({ dir = "right" }: { dir?: "right" | "up-right" | "left" }) {
  return (
    <svg aria-hidden="true" className={`arrow arrow-${dir}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 16 16">
      {dir === "up-right" ? <path d="M5 11 11 5M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}
