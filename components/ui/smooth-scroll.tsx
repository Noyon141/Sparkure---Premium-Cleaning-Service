"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal";
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

export function SmoothScroll({ children, options }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.2,
      infinite: false,
      ...options,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options]);

  return <>{children}</>;
}
