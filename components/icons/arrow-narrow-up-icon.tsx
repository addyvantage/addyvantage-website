"use client";

import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

const ArrowNarrowUpIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".arrow-group",
        { y: [0, -4, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
    };

    const stop = () => {
      animate(".arrow-group", { y: 0 }, { duration: 0.2, ease: "easeOut" });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
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
            <path d="M12 5v14" />
            <path d="M17 10l-5-5" />
            <path d="M7 10l5-5" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }
);

ArrowNarrowUpIcon.displayName = "ArrowNarrowUpIcon";

export default ArrowNarrowUpIcon;
