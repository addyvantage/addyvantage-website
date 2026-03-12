const links = [
  {
    label: "github",
    href: "https://github.com/addyvantage",
  },
  {
    label: "x",
    href: "https://x.com/addyvantage",
  },
  {
    label: "linkedin",
    href: "https://linkedin.com",
  },
  {
    label: "email",
    href: "mailto:hello@addy.dev",
  },
];

function AroundInternetSection() {
  return (
    <section
      aria-label="Around the internet section"
      className="mx-auto mt-16 w-full max-w-4xl px-6 md:px-8 lg:px-10"
    >
      <div className="w-full pl-16 md:pl-28">
        <h2 className="text-lg font-semibold text-black dark:text-white md:text-[1.5rem]">
          around the internet
        </h2>
        <div className="mt-6 grid max-w-xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              className="group inline-flex w-fit items-center gap-2 text-[1.06rem] text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white md:text-[1.12rem]"
              href={link.href}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <span className="underline decoration-transparent underline-offset-[0.22em] transition-colors group-hover:decoration-current">
                {link.label}
              </span>
              <span
                aria-hidden="true"
                className="text-sm transition-transform duration-150 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { AroundInternetSection };
