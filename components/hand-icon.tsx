"use client";

import { motion } from "motion/react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface HandIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function HandIcon({ className, size = 28, ...props }: HandIconProps) {
  return (
    <div className={cn("inline-flex", className)} {...props}>
      <motion.div
        animate={{ rotate: [0, -15, 10, -5, 0] }}
        style={{ originX: "50%", originY: "90%" }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.6,
        }}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 11V5.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
          <path d="M14 10V3.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
          <path d="M10 10.5v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8.5" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      </motion.div>
    </div>
  );
}

export { HandIcon };
