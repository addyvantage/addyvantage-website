"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Arrow } from "@/components/arrow";

import type { WorkTimelineItem } from "@/components/work/work-data";

type WorkTimelineCardProps = {
  item: WorkTimelineItem;
  index: number;
  isActive: boolean;
  isTransitioning: boolean;
  panelRef: (node: HTMLDivElement | null) => void;
};

function WorkTimelineCard({
  item,
  index,
  isActive,
  isTransitioning,
  panelRef,
}: WorkTimelineCardProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const glowX = useMotionValue(-120);
  const glowY = useMotionValue(-120);
  const glowOpacity = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 1600, damping: 16, mass: 0.03 });
  const glowYSpring = useSpring(glowY, { stiffness: 1600, damping: 16, mass: 0.03 });
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 900, damping: 20, mass: 0.06 });
  const isRight = index % 2 === 0;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateMode = () => {
      setCanHover(mediaQuery.matches);
    };

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!isActive || isTransitioning) {
      setIsExpanded(false);
      glowOpacity.set(0);
    }
  }, [glowOpacity, isActive, isTransitioning]);

  useEffect(() => {
    if (canHover || !isExpanded || !isActive) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [canHover, isExpanded, isActive]);

  const shellClasses = useMemo(
    () =>
      `w-full max-w-[560px] pl-20 sm:pl-24 md:pl-0 ${
        isExpanded ? "md:max-w-[580px] lg:max-w-[620px]" : ""
      } ${
        isRight
          ? "mx-auto md:ml-[calc(50%+52px)] md:mr-0"
          : "mx-auto md:mr-[calc(50%+52px)] md:ml-0"
      }`,
    [isExpanded, isRight]
  );
  const actionLinks = [
    item.githubUrl ? { href: item.githubUrl, label: "Source" } : null,
    item.liveUrl ? { href: item.liveUrl, label: item.liveLabel ?? "Live prototype" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);
  const canInteract = isActive && !isTransitioning;

  return (
    <div
      ref={panelRef}
      aria-hidden={!isActive}
      className="pointer-events-none absolute inset-0 flex items-center will-change-transform"
    >
      <div className="w-full px-6 pb-32 pt-24 sm:px-8 md:px-10 md:pb-40 lg:px-14">
        <div className={shellClasses}>
          <motion.article
            ref={shellRef}
            animate={{
              boxShadow: isExpanded
                ? "0 28px 80px rgba(15,23,42,0.14)"
                : "0 20px 60px rgba(15,23,42,0.10)",
              scale: isExpanded ? 1.01 : 1,
            }}
            className={`pointer-events-auto relative overflow-hidden rounded-[28px] border bg-white/94 px-6 py-7 backdrop-blur-md dark:bg-black/88 sm:px-7 sm:py-8 md:px-8 ${
              isExpanded
                ? "border-slate-900/24 dark:border-white/24"
                : "border-slate-900/18 dark:border-white/18"
            }`}
            initial={false}
            onFocus={() => {
              // Keyboard path: focusing anything in the card reveals its details and links.
              if (canInteract) setIsExpanded(true);
            }}
            onBlur={(event) => {
              if (!shellRef.current?.contains(event.relatedTarget as Node | null)) setIsExpanded(false);
            }}
            onClick={() => {
              if (!isActive || isTransitioning || canHover) return;
              setIsExpanded((current) => !current);
            }}
            onPointerLeave={() => {
              if (!canHover || !isActive || isTransitioning) return;
              setIsExpanded(false);
              glowOpacity.set(0);
            }}
            onPointerMove={(event) => {
              if (!canHover || !isActive || isTransitioning) return;
              const bounds = shellRef.current?.getBoundingClientRect();
              if (bounds) {
                glowX.set(event.clientX - bounds.left - 120);
                glowY.set(event.clientY - bounds.top - 120);
                glowOpacity.set(1);
              }
              setIsExpanded(true);
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-[-18px] -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.04)_28%,rgba(15,23,42,0)_68%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_30%,rgba(255,255,255,0)_70%)]" />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_30%,rgba(255,255,255,0)_72%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_34%,rgba(255,255,255,0)_72%)]"
              initial={false}
              style={{
                opacity: canHover && isActive ? glowOpacitySpring : 0,
                x: glowXSpring,
                y: glowYSpring,
              }}
            />
            <div className="relative space-y-4 md:space-y-5">
              <div className="space-y-3 md:space-y-2.5">
                <p className="font-mono text-[0.75rem] uppercase leading-snug tracking-[0.06em] text-neutral-600 dark:text-neutral-400">
                  {item.tagline}
                </p>
                <h2 className="text-[2rem] leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-white md:text-[2.5rem]">
                  {item.heading}
                </h2>
                <p
                  className={`text-[1rem] leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-[1.0625rem] ${
                    isExpanded ? "max-w-[56ch] md:max-w-[62ch]" : "max-w-[42ch]"
                  }`}
                >
                  {item.description}
                </p>
                <button
                  aria-controls={`${item.id}-details`}
                  aria-expanded={isExpanded}
                  className="inline-flex min-h-[32px] items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.06em] text-neutral-500 transition-colors hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!canInteract) return;
                    setIsExpanded((current) => (canHover ? true : !current));
                  }}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span aria-hidden="true" className={`text-[0.95rem] leading-none transition-transform duration-200 ${isExpanded ? "rotate-45" : ""}`}>+</span>
                  {isExpanded && !canHover ? "Less" : "Details"}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1, marginTop: 0 }}
                    className="overflow-hidden"
                    id={`${item.id}-details`}
                    exit={{ height: 0, opacity: 0, marginTop: -4 }}
                    initial={{ height: 0, opacity: 0, marginTop: -4 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-slate-900/10 pt-4 dark:border-white/10 md:pt-5">
                      <div className="space-y-5">
                        {item.details ? (
                          <p className="max-w-[62ch] text-[0.975rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {item.details}
                          </p>
                        ) : null}
                        {item.facts ? (
                          <dl className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5">
                            {item.facts.map((fact) => (
                              <div key={fact.label} className="contents">
                                <dt className="pt-[0.2rem] font-mono text-[0.72rem] uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-500">{fact.label}</dt>
                                <dd className="text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300">{fact.text}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                        <div className="flex max-w-full flex-wrap gap-1.5 overflow-hidden">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex max-w-full items-center rounded-full border border-slate-900/10 bg-slate-900/4 px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
                            >
                              <span className="max-w-full whitespace-normal break-words leading-tight">
                                {skill}
                              </span>
                            </span>
                          ))}
                        </div>
                        {item.caseStudyUrl || actionLinks.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {item.caseStudyUrl ? (
                              <Link className={cardLinkClass} href={item.caseStudyUrl}>
                                Case study <Arrow />
                              </Link>
                            ) : null}
                            {actionLinks.map((link) => (
                              <a
                                key={link.label}
                                className={cardLinkClass}
                                href={link.href}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {link.label} <Arrow dir="up-right" />
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}

const cardLinkClass =
  "inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-slate-900/12 px-3.5 text-[0.875rem] font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-900 hover:text-white dark:border-white/12 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-black";

export { WorkTimelineCard };
