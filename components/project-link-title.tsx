"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";

import ArrowNarrowUpIcon from "@/components/icons/arrow-narrow-up-icon";
import type { AnimatedIconHandle } from "@/components/icons/types";

type ProjectLinkTitleProps = {
  href: string;
  title: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

function ProjectLinkTitle({
  href,
  title,
  className,
  ...props
}: ProjectLinkTitleProps) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <a
      {...props}
      className={`inline-flex items-center gap-1.5 text-black transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 ${className ?? ""}`}
      href={href}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      rel="noreferrer"
      target="_blank"
    >
      <h3 className="text-[1.6rem] font-semibold tracking-tight md:text-[1.58rem]">
        {title}
      </h3>
      <ArrowNarrowUpIcon
        ref={iconRef}
        className="-translate-x-[0.3rem] rotate-45 text-neutral-700 dark:text-neutral-200"
        size={24}
        strokeWidth={2.2}
      />
    </a>
  );
}

export { ProjectLinkTitle };
