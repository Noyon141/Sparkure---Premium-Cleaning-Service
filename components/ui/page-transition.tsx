"use client";

import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    rotateX: 10,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      scale: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
      rotateX: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    rotateX: -10,
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      scale: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
      rotateX: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  );
}
