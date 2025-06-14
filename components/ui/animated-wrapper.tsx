"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationConfig {
  initial: { opacity: number; y?: number };
  animate: { opacity: number; y?: number };
  exit: { opacity: number; y?: number };
  transition?: { staggerChildren?: number };
}

interface AnimatedWrapperProps {
  children: ReactNode;
  animation?: "fade" | "slide" | "stagger";
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({
  children,
  animation = "fade",
  className = "",
  delay = 0,
}: AnimatedWrapperProps) {
  const animations: Record<string, AnimationConfig> = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { delay },
    },
    slide: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { delay },
    },
    stagger: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        staggerChildren: 0.1,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      exit={animations[animation].exit}
      transition={animations[animation].transition}
    >
      {children}
    </motion.div>
  );
}
