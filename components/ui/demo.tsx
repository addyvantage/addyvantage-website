"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "@/components/icons/moon-icon";
import { SunIcon } from "@/components/icons/sun-icon";

const links = [
  { label: "Work", href: "/work", match: "/work" },
  { label: "Writing", href: "/blog", match: "/blog" },
  { label: "About", href: "/#about", match: "/some-fun-things-about-me" },
  { label: "Contact", href: "/#contact", match: null },
];

export function AppleStyleDock() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const [tucked, setTucked] = useState(false);

  // On reading pages the dock steps aside while scrolling down and returns on the way up or at the end.
  // /work keeps it fixed: its pinned slides own the scroll input and already leave room for the dock.
  useEffect(() => {
    setTucked(false);
    if (pathname === "/work") return;
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 80;
        if (Math.abs(y - last) > 6) setTucked(y > last && y > 240 && !atEnd);
        if (atEnd) setTucked(false);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <nav aria-label="Primary navigation" className="site-dock" data-tucked={tucked || undefined} onFocus={() => setTucked(false)}>
      <div className="site-dock-inner">
        {/* The knight is the avatar behind the tabs; here it quietly means "home". */}
        <Link aria-current={pathname === "/" ? "page" : undefined} aria-label="Home" className="dock-link dock-icon" href="/" title="Home">
          <Image alt="" className="dark:hidden" height={30} src="/images/profile-light.webp" width={30} />
          <Image alt="" className="hidden dark:block" height={30} src="/images/profile-dark.webp" width={30} />
        </Link>
        {links.map(({ label, href, match }) => (
          <Link aria-current={match && pathname.startsWith(match) ? "page" : undefined} className="dock-link" href={href} key={label}>
            {label}
          </Link>
        ))}
        <span aria-hidden="true" className="dock-divider" />
        <button aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="dock-link dock-icon" onClick={() => setTheme(dark ? "light" : "dark")} title={dark ? "Light theme" : "Dark theme"} type="button">
          {dark ? <SunIcon aria-hidden="true" size={18} /> : <MoonIcon aria-hidden="true" size={18} />}
        </button>
      </div>
    </nav>
  );
}
