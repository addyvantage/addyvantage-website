"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BookTextIcon } from "@/components/icons/book-text-icon";
import { EmailIcon } from "@/components/icons/email-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { HomeIcon } from "@/components/icons/home-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { SunIcon } from "@/components/icons/sun-icon";
import TwitterXIcon from "@/components/icons/twitter-x-icon";
import { WorkIcon } from "@/components/icons/work-icon";

const links = [
  { label: "Home", href: "/home", Icon: HomeIcon },
  { label: "Work", href: "/work", Icon: WorkIcon },
  { label: "Writing", href: "/blog", Icon: BookTextIcon },
  { label: "GitHub", href: "https://github.com/addyvantage", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/addyvantage/", Icon: LinkedinIcon },
  { label: "X", href: "https://x.com/addyvantage", Icon: TwitterXIcon },
  { label: "Email", href: "mailto:adityasingh0929@gmail.com", Icon: EmailIcon },
];

export function AppleStyleDock() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <nav aria-label="Primary navigation" className="site-dock">
      <div className="site-dock-inner">
        {links.map(({ label, href, Icon }) => {
          const external = href.startsWith("http");
          const content = <><Icon aria-hidden="true" size={20} /><span className="dock-tooltip" aria-hidden="true">{label}</span></>;
          return external || href.startsWith("mailto:") ? (
            <a aria-label={label} className="dock-action" href={href} key={label} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined} title={label}>{content}</a>
          ) : (
            <Link aria-label={label} className="dock-action" href={href} key={label} title={label}>{content}</Link>
          );
        })}
        <span aria-hidden="true" className="dock-divider" />
        <button aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark} className="dock-action" onClick={() => setTheme(dark ? "light" : "dark")} title={dark ? "Light mode" : "Dark mode"} type="button">
          {dark ? <SunIcon aria-hidden="true" size={20} /> : <MoonIcon aria-hidden="true" size={20} />}
          <span className="dock-tooltip" aria-hidden="true">{dark ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </nav>
  );
}
