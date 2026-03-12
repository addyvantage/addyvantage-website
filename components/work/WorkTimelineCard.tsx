"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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
    item.liveUrl ? { href: item.liveUrl, label: "Live Site" } : null,
    item.githubUrl ? { href: item.githubUrl, label: "GitHub" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

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
            aria-expanded={isActive && isExpanded}
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
                <p className="text-[0.98rem] font-semibold uppercase tracking-[0.28em] text-neutral-600 dark:text-neutral-200 md:text-[1.08rem]">
                  {item.tagline}
                </p>
                <h2 className="text-[1.85rem] font-semibold leading-tight text-slate-900 dark:text-white md:text-[2.3rem]">
                  {item.heading}
                </h2>
                <p
                  className={`text-[1rem] leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-[1.08rem] ${
                    isExpanded ? "max-w-[56ch] md:max-w-[62ch]" : "max-w-[42ch]"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1, marginTop: 0 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0, marginTop: -4 }}
                    initial={{ height: 0, opacity: 0, marginTop: -4 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-slate-900/10 pt-4 dark:border-white/10 md:pt-5">
                      <div className="space-y-5">
                        <p className="max-w-[72ch] text-[1.04rem] leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-[1.12rem]">
                          {item.details}
                        </p>
                        <div className="flex max-w-full flex-wrap gap-1.5 overflow-hidden">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex max-w-full items-center rounded-full border border-slate-900/10 bg-slate-900/4 px-2 py-1 text-[0.74rem] uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
                            >
                              <span className="max-w-full whitespace-normal break-words leading-tight">
                                {skill}
                              </span>
                            </span>
                          ))}
                        </div>
                        {actionLinks.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {actionLinks.map((link) => (
                              <a
                                key={link.label}
                                className="inline-flex items-center rounded-full border border-slate-900/12 px-3.5 py-2 text-[0.9rem] font-medium uppercase tracking-[0.22em] text-slate-700 transition-colors duration-200 hover:bg-slate-900 hover:text-white dark:border-white/12 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-black"
                                href={link.href}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {link.label}
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

export { WorkTimelineCard };
