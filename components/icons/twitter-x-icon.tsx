"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TwitterXIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TwitterXIconProps extends HTMLAttributes<HTMLDivElement> {
  loop?: boolean;
  size?: number;
}

const PATH_VARIANTS = (loop: boolean): Variants => ({
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
      repeat: loop ? Number.POSITIVE_INFINITY : 0,
      repeatDelay: loop ? 0.85 : 0,
    },
  },
});

const TwitterXIcon = forwardRef<TwitterXIconHandle, TwitterXIconProps>(
  ({ onMouseEnter, onMouseLeave, className, loop = false, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const variants = PATH_VARIANTS(loop);

    useEffect(() => {
      if (loop) {
        controls.start("animate");
        return;
      }

      controls.start("normal");
    }, [controls, loop]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (loop) {
          onMouseEnter?.(e);
          return;
        }

        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, loop, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (loop) {
          onMouseLeave?.(e);
          return;
        }

        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, loop, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.35"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            animate={controls}
            d="M4 4l11.733 16h4.267l-11.733 -16z"
            initial="normal"
            variants={variants}
          />
          <motion.path
            animate={controls}
            d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"
            initial="normal"
            variants={variants}
          />
        </svg>
      </div>
    );
  }
);

TwitterXIcon.displayName = "TwitterXIcon";
export default TwitterXIcon;
