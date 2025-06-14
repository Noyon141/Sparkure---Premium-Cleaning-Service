import { motion } from "framer-motion";

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up animation
export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// Animated components
export const MotionDiv = motion.div;
export const MotionLink = motion.a;
export const MotionButton = motion.button;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
