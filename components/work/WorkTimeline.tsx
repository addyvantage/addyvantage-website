"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WorkTimelineCard } from "@/components/work/WorkTimelineCard";
import { workTimelineData } from "@/components/work/work-data";

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

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const panels = panelRefs.current.filter(
      (panel): panel is HTMLDivElement => panel !== null
    );

    if (!section || !stage || panels.length === 0) return;

    gsap.registerPlugin(ScrollTrigger, Observer);

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
  }, []);

  const lineStartPercent = 18;
  const lineEndPercent = 82;
  const lineHeightPercent = lineEndPercent - lineStartPercent;
  const progressRatio =
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
            style={{ height: `${progressRatio * 100}%` }}
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

export { WorkTimeline };
