"use client";

import { motion, useAnimate } from "motion/react";
import { forwardRef, useImperativeHandle } from "react";

import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

const ArrowNarrowLeftIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".arrow-group",
        { x: [0, -4, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
    };

    const stop = () => {
      animate(".arrow-group", { x: 0 }, { duration: 0.2, ease: "easeOut" });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex items-center justify-center ${className}`}
        onHoverEnd={stop}
        onHoverStart={start}
      >
        <svg
          fill="none"
          height={size}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g className="arrow-group">
            <path d="M5 12h14" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4-4" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }
);

ArrowNarrowLeftIcon.displayName = "ArrowNarrowLeftIcon";

export default ArrowNarrowLeftIcon;
