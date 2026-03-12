"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WorkTimelineCard } from "@/components/work/WorkTimelineCard";
import { workTimelineData, type WorkTimelineItem } from "@/components/work/work-data";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function WorkTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const observerRef = useRef<ReturnType<typeof ScrollTrigger.observe> | null>(
    null
  );
  const goToIndexRef = useRef<(index: number) => void>(() => {});
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const observerEnabledRef = useRef(false);
  const sectionActiveRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    gsap.registerPlugin(ScrollTrigger, Observer);

    const panels = panelRefs.current.filter(
      (panel): panel is HTMLDivElement => panel !== null
    );

    if (!section || !stage || panels.length === 0) return;

    const panelCount = panels.length;
    const lastIndex = panelCount - 1;
    const clampIndex = (value: number) =>
      Math.max(0, Math.min(value, lastIndex));
    const boundaryOffset = 24;

    const ctx = gsap.context(() => {
      const enableObserver = () => {
        if (!observerRef.current || observerEnabledRef.current) return;
        observerRef.current.enable();
        observerEnabledRef.current = true;
      };

      const disableObserver = () => {
        if (!observerRef.current || !observerEnabledRef.current) return;
        observerRef.current.disable();
        observerEnabledRef.current = false;
      };

      const setRestingPanelState = (index: number) => {
        panels.forEach((panel, panelIndex) => {
          const isActive = panelIndex === index;
          const isBefore = panelIndex < index;

          gsap.set(panel, {
            autoAlpha: isActive ? 1 : 0,
            yPercent: isActive ? 0 : isBefore ? -14 : 16,
            scale: isActive ? 1 : 0.97,
            filter: isActive ? "blur(0px)" : "blur(10px)",
            zIndex: isActive ? 2 : 0,
            pointerEvents: isActive ? "auto" : "none",
            overwrite: "auto",
          });
        });
      };

      const commitActiveIndex = (index: number) => {
        const nextIndex = clampIndex(index);
        currentIndexRef.current = nextIndex;
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      };

      const getScrollForIndex = (index: number) => {
        const trigger = triggerRef.current;
        if (!trigger) return window.scrollY;
        if (lastIndex === 0) return trigger.start;

        const step = (trigger.end - trigger.start) / lastIndex;
        return trigger.start + step * clampIndex(index);
      };

      const snapScrollToIndex = (index: number) => {
        window.scrollTo({ top: getScrollForIndex(index), behavior: "auto" });
        ScrollTrigger.update();
      };

      const releaseToNativeScroll = (direction: 1 | -1) => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        transitionRef.current?.kill();
        transitionRef.current = null;
        disableObserver();
        animatingRef.current = true;
        setIsTransitioning(true);
        sectionActiveRef.current = false;

        requestAnimationFrame(() => {
          window.scrollTo({
            top:
              direction > 0
                ? trigger.end + boundaryOffset
                : Math.max(trigger.start - boundaryOffset, 0),
            behavior: "auto",
          });
          animatingRef.current = false;
          setIsTransitioning(false);
        });
      };

      const setImmediateIndex = (index: number, shouldSnap = true) => {
        const nextIndex = clampIndex(index);
        transitionRef.current?.kill();
        transitionRef.current = null;
        gsap.killTweensOf(panels);
        animatingRef.current = false;
        commitActiveIndex(nextIndex);
        setIsTransitioning(false);
        setRestingPanelState(nextIndex);
        if (shouldSnap) {
          snapScrollToIndex(nextIndex);
        }
      };

      const transitionToIndex = (index: number, direction: 1 | -1) => {
        if (animatingRef.current) return;

        if (index < 0 || index > lastIndex) {
          releaseToNativeScroll(direction);
          return;
        }

        const nextIndex = clampIndex(index);
        const previousIndex = currentIndexRef.current;

        if (nextIndex === previousIndex) {
          snapScrollToIndex(nextIndex);
          return;
        }

        const outgoingPanel = panels[previousIndex];
        const incomingPanel = panels[nextIndex];

        animatingRef.current = true;
        setIsTransitioning(true);
        disableObserver();
        transitionRef.current?.kill();
        transitionRef.current = null;

        gsap.killTweensOf(panels);
        panels.forEach((panel, panelIndex) => {
          if (panelIndex !== previousIndex && panelIndex !== nextIndex) {
            gsap.set(panel, {
              autoAlpha: 0,
              yPercent: panelIndex < nextIndex ? -14 : 16,
              scale: 0.97,
              filter: "blur(10px)",
              zIndex: 0,
              pointerEvents: "none",
              overwrite: "auto",
            });
          }
        });

        gsap.set(outgoingPanel, {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          filter: "blur(0px)",
          zIndex: 2,
          pointerEvents: "none",
          overwrite: "auto",
        });
        gsap.set(incomingPanel, {
          autoAlpha: 1,
          yPercent: direction > 0 ? 18 : -18,
          scale: 0.985,
          filter: "blur(12px)",
          zIndex: 3,
          pointerEvents: "none",
          overwrite: "auto",
        });

        commitActiveIndex(nextIndex);

        transitionRef.current = gsap
          .timeline({
            defaults: {
              duration: 0.72,
              ease: "power2.out",
              overwrite: "auto",
            },
            onComplete: () => {
              setRestingPanelState(nextIndex);
              snapScrollToIndex(nextIndex);
              transitionRef.current = null;
              animatingRef.current = false;
              setIsTransitioning(false);

              if (triggerRef.current?.isActive && sectionActiveRef.current) {
                enableObserver();
              }
            },
          })
          .to(
            outgoingPanel,
            {
              autoAlpha: 0,
              yPercent: direction > 0 ? -12 : 12,
              scale: 0.97,
              filter: "blur(10px)",
            },
            0
          )
          .to(
            incomingPanel,
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              filter: "blur(0px)",
            },
            0.12
          );
      };

      setRestingPanelState(0);
      commitActiveIndex(0);

      observerRef.current = ScrollTrigger.observe({
        target: window,
        type: "wheel,touch",
        preventDefault: true,
        allowClicks: true,
        tolerance: 24,
        onDown: () => {
          transitionToIndex(currentIndexRef.current + 1, 1);
        },
        onUp: () => {
          transitionToIndex(currentIndexRef.current - 1, -1);
        },
      });
      disableObserver();

      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        pin: stage,
        start: "top top",
        end: () => `+=${window.innerHeight * Math.max(lastIndex, 1)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          sectionActiveRef.current = true;
          setImmediateIndex(0, false);
          enableObserver();
        },
        onEnterBack: () => {
          sectionActiveRef.current = true;
          setImmediateIndex(lastIndex, false);
          enableObserver();
        },
        onLeave: () => {
          sectionActiveRef.current = false;
          disableObserver();
          animatingRef.current = false;
          setIsTransitioning(false);
        },
        onLeaveBack: () => {
          sectionActiveRef.current = false;
          disableObserver();
          animatingRef.current = false;
          setIsTransitioning(false);
        },
        onRefresh: () => {
          setRestingPanelState(currentIndexRef.current);
        },
      });

      goToIndexRef.current = (index: number) => {
        if (animatingRef.current) return;

        if (index === currentIndexRef.current) {
          setImmediateIndex(index);
          return;
        }

        transitionToIndex(
          index,
          index > currentIndexRef.current ? 1 : -1
        );
      };

      ScrollTrigger.refresh();
    }, section);

    return () => {
      transitionRef.current?.kill();
      transitionRef.current = null;
      goToIndexRef.current = () => {};
      observerEnabledRef.current = false;
      sectionActiveRef.current = false;
      observerRef.current?.kill();
      observerRef.current = null;
      triggerRef.current?.kill();
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isMobile]);

  if (isMobile) {
    return <MobileWorkTimeline />;
  }

  const lineStartPercent = 18;
  const lineEndPercent = 82;
  const lineHeightPercent = lineEndPercent - lineStartPercent;
  const desktopProgressRatio =
    workTimelineData.length === 1
      ? 1
      : activeIndex / (workTimelineData.length - 1);

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden bg-white dark:bg-neutral-950">
      <div
        ref={stageRef}
        className="relative flex h-screen items-center overflow-hidden bg-white dark:bg-neutral-950"
      >
        <div className="pointer-events-none absolute left-[60px] top-[18%] z-20 h-[64%] w-0 md:left-1/2">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-300/90 dark:bg-white/12" />
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-slate-900 shadow-[0_0_14px_rgba(15,23,42,0.10)] transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white dark:shadow-[0_0_18px_rgba(255,255,255,0.18)]"
            style={{ height: `${desktopProgressRatio * 100}%` }}
          />

          {workTimelineData.map((item, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const dotTop =
              workTimelineData.length === 1
                ? 50
                : (index / (workTimelineData.length - 1)) * 100;

            return (
              <div
                key={item.id}
                className="absolute left-1/2 top-0"
                style={{ top: `${dotTop}%`, transform: "translate(-50%, -50%)" }}
              >
                {isActive ? (
                  <button
                    key={`${item.id}-active`}
                    type="button"
                    onClick={() => goToIndexRef.current(index)}
                    className="pointer-events-auto relative whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 py-1.5 text-[1.16rem] text-slate-900 shadow-sm dark:border-white/20 dark:bg-neutral-950 dark:text-white dark:shadow-none"
                    aria-label={`Show ${item.heading}`}
                  >
                    {item.dateLabel}
                  </button>
                ) : (
                  <button
                    key={`${item.id}-inactive`}
                    type="button"
                    onClick={() => goToIndexRef.current(index)}
                    className={`pointer-events-auto relative block h-4 w-4 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isComplete
                        ? "border-slate-900 bg-slate-900 shadow-[0_0_16px_rgba(15,23,42,0.18)] dark:border-white dark:bg-white dark:shadow-[0_0_18px_rgba(255,255,255,0.24)]"
                        : "border-slate-300 bg-white dark:border-white/20 dark:bg-neutral-900"
                    }`}
                    aria-label={`Show ${item.heading}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0">
          {workTimelineData.map((item, index) => (
            <WorkTimelineCard
              key={item.id}
              index={index}
              isActive={activeIndex === index}
              isTransitioning={isTransitioning}
              item={item}
              panelRef={(node) => {
                panelRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileWorkTimeline() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressRatio, setProgressRatio] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);
    window.visualViewport?.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
      window.visualViewport?.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    setExpandedId(null);
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;
    const lastIndex = workTimelineData.length - 1;

    const updateProgress = () => {
      frame = 0;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const currentViewportHeight = window.innerHeight;
      const maxScrollableDistance = Math.max(
        wrapper.offsetHeight - currentViewportHeight,
        1
      );
      const currentScroll = Math.max(
        0,
        Math.min(maxScrollableDistance, -wrapper.getBoundingClientRect().top)
      );
      const nextProgress = lastIndex <= 0 ? 1 : currentScroll / maxScrollableDistance;
      const nextIndex =
        lastIndex <= 0 ? 0 : Math.min(lastIndex, Math.round(nextProgress * lastIndex));

      setProgressRatio((current) => (current === nextProgress ? current : nextProgress));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("orientationchange", requestUpdate);
    window.visualViewport?.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
      window.visualViewport?.removeEventListener("resize", requestUpdate);
    };
  }, [viewportHeight]);

  const activeItem = workTimelineData[activeIndex] ?? workTimelineData[0];
  const safeViewportHeight = viewportHeight > 0 ? viewportHeight : 0;
  const stepHeight = safeViewportHeight > 0 ? Math.round(safeViewportHeight * 0.92) : 0;
  const wrapperHeight =
    safeViewportHeight > 0
      ? safeViewportHeight + stepHeight * Math.max(workTimelineData.length - 1, 0)
      : null;
  const stageHeightStyle = safeViewportHeight > 0 ? `${safeViewportHeight}px` : "100svh";
  const stageContentHeight =
    safeViewportHeight > 0 ? Math.max(safeViewportHeight - 136, 320) : undefined;
  const expandedCardMaxHeight =
    safeViewportHeight > 0 ? Math.max(safeViewportHeight - 176, 280) : undefined;

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-visible bg-white dark:bg-neutral-950"
      style={
        wrapperHeight !== null
          ? { height: `${wrapperHeight}px` }
          : { height: `${Math.max(workTimelineData.length, 1) * 100}svh` }
      }
    >
      <div
        className="sticky top-0 bg-white dark:bg-neutral-950"
        style={{ height: stageHeightStyle }}
      >
        <div className="mx-auto flex h-full w-full max-w-xl items-center px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))] sm:px-5">
          <div className="grid w-full grid-cols-[minmax(0,1fr)_60px] items-center gap-x-4">
            <MobilePinnedWorkCard
              key={activeItem.id}
              isExpanded={expandedId === activeItem.id}
              item={activeItem}
              minCardHeight={stageContentHeight}
              maxExpandedHeight={expandedCardMaxHeight}
              onToggle={() => {
                setExpandedId((current) =>
                  current === activeItem.id ? null : activeItem.id
                );
              }}
            />
            <MobilePinnedTimeline
              activeIndex={activeIndex}
              timelineHeight={stageContentHeight}
              progressRatio={progressRatio}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobilePinnedTimeline({
  activeIndex,
  timelineHeight,
  progressRatio,
}: {
  activeIndex: number;
  timelineHeight?: number;
  progressRatio: number;
}) {
  return (
    <div
      className="relative"
      style={timelineHeight ? { height: `${timelineHeight}px` } : { height: "calc(100svh - 8.5rem)" }}
    >
      <div className="relative h-full">
        <div className="absolute right-[13px] top-10 h-[calc(100%-5rem)] w-px bg-slate-300/80 dark:bg-white/12" />
        <div
          className="absolute right-[13px] top-10 w-px origin-top bg-slate-900 shadow-[0_0_14px_rgba(15,23,42,0.12)] transition-[height] duration-300 ease-out dark:bg-white dark:shadow-[0_0_18px_rgba(255,255,255,0.22)]"
          style={{ height: `calc((100% - 5rem) * ${progressRatio})` }}
        />
        {workTimelineData.map((item, index) => {
          const dotTop =
            workTimelineData.length === 1
              ? "2.5rem"
              : `calc(2.5rem + ${(index / (workTimelineData.length - 1)).toFixed(4)} * (100% - 5rem))`;
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <div
              key={item.id}
              className="absolute right-0"
              style={{ top: dotTop }}
            >
              {isActive ? (
                <div className="absolute right-5 top-0 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[0.92rem] text-slate-900 shadow-sm dark:border-white/20 dark:bg-neutral-950 dark:text-white dark:shadow-none">
                  {item.dateLabel}
                </div>
              ) : null}
              <span
                className={`absolute right-[7px] top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
                  isActive || isComplete
                    ? "border-slate-900 bg-slate-900 shadow-[0_0_14px_rgba(15,23,42,0.16)] dark:border-white dark:bg-white dark:shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                    : "border-slate-300 bg-white dark:border-white/20 dark:bg-neutral-950"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobilePinnedWorkCard({
  item,
  isExpanded,
  minCardHeight,
  maxExpandedHeight,
  onToggle,
}: {
  item: WorkTimelineItem;
  isExpanded: boolean;
  minCardHeight?: number;
  maxExpandedHeight?: number;
  onToggle: () => void;
}) {
  const actionLinks = [
    item.liveUrl ? { href: item.liveUrl, label: "Live Site" } : null,
    item.githubUrl ? { href: item.githubUrl, label: "GitHub" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <div
      className="flex items-center"
      style={minCardHeight ? { minHeight: `${minCardHeight}px` } : { minHeight: "calc(100svh - 8.5rem)" }}
    >
      <article
        className={`w-full cursor-pointer overflow-hidden rounded-[26px] border border-slate-900/24 bg-white/96 px-5 py-6 text-left shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-md transition-all duration-300 dark:border-white/24 dark:bg-black/92 dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] sm:px-6 ${
          isExpanded ? "overflow-y-auto overscroll-contain" : ""
        }`}
        aria-expanded={isExpanded}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) return;
          onToggle();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          onToggle();
        }}
        role="button"
        style={isExpanded && maxExpandedHeight ? { maxHeight: `${maxExpandedHeight}px` } : undefined}
        tabIndex={0}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-[0.88rem] font-semibold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-200">
              {item.tagline}
            </p>
            <h2 className="text-[1.66rem] font-semibold leading-tight text-slate-900 dark:text-white">
              {item.heading}
            </h2>
            <p className="text-[0.98rem] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {item.description}
            </p>
          </div>

          {isExpanded ? (
            <div className="border-t border-slate-900/10 pt-4 dark:border-white/10">
              <div className="space-y-5">
                <p className="text-[0.96rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.details}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex max-w-full items-center rounded-full border border-slate-900/10 bg-slate-900/4 px-2 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
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
                        className="inline-flex items-center rounded-full border border-slate-900/12 px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-slate-700 transition-colors duration-200 hover:bg-slate-900 hover:text-white dark:border-white/12 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-black"
                        href={link.href}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
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
          ) : null}
        </div>
      </article>
    </div>
  );
}

export { WorkTimeline };
