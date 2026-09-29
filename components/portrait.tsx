"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const GRID = 10;
const CELLS = Array.from({ length: GRID * GRID }, (_, i) => i);
const STEP = 0.36;

// Adapted from React Bits "Pixel Transition" (reactbits.dev): a random pixel wipe between two layers.
// Here it runs from an explicit button instead of hover, uses the ink colour, and is instant under reduced motion.
export function Portrait() {
  const gridRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [showKnight, setShowKnight] = useState(false);

  const toggle = async () => {
    const pixels = gridRef.current?.children;
    const next = !showKnight;
    if (!pixels || busy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowKnight(next);
      return;
    }
    busy.current = true;
    // Loaded on first use so GSAP stays out of the homepage's initial bundle.
    const { gsap } = await import("gsap");
    const each = STEP / pixels.length;
    gsap.set(pixels, { display: "none" });
    gsap.to(pixels, { display: "block", duration: 0, stagger: { each, from: "random" } });
    gsap.delayedCall(STEP, () => setShowKnight(next));
    gsap.to(pixels, { display: "none", duration: 0, delay: STEP, stagger: { each, from: "random" }, onComplete: () => { busy.current = false; } });
  };

  return (
    <figure className="portrait">
      <div className="portrait-frame">
        <Image alt="Portrait of Aditya Singh" className="portrait-photo" height={800} priority sizes="(max-width: 700px) 88px, 216px" src="/images/addy-portrait.webp" width={640} />
        {showKnight && (
          <div className="portrait-knight">
            <Image alt="Addy’s metallic knight avatar" className="dark:hidden" fill sizes="300px" src="/images/profile-light.webp" />
            <Image alt="" className="hidden dark:block" fill sizes="300px" src="/images/profile-dark.webp" />
          </div>
        )}
        <div aria-hidden="true" className="pixel-grid" ref={gridRef}>
          {CELLS.map((i) => (
            <span key={i} style={{ left: `${(i % GRID) * 10}%`, top: `${Math.floor(i / GRID) * 10}%`, width: "calc(10% + 1px)", height: "calc(10% + 1px)" }} />
          ))}
        </div>
      </div>
      {/* A small easter egg: the knight is the avatar Addy used before this photograph. */}
      <button aria-label="Show my knight avatar" aria-pressed={showKnight} className="portrait-toggle" onClick={toggle} title={showKnight ? "Back to the photograph" : "Swap to the knight"} type="button">
        <svg aria-hidden="true" height="12" viewBox="0 0 12 12" width="12"><path d="M0 0h6v6H0zM6 6h6v6H6z" fill="currentColor" /></svg>
      </button>
    </figure>
  );
}
