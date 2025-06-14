"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PageTransition } from "./page-transition";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export function PageTransitionWrapper({
  children,
}: PageTransitionWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}
