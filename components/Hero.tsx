"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { Clock, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  //Handle the booking
  const booking = () => {
    router.push("/booking");
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full min-h-[calc(100vh-4rem)]">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/3 space-y-6 px-4 md:px-0 flex flex-col items-center md:items-start "
      >
        <h1 className="text-4xl  xl:text-6xl font-bold text-primary leading-tight">
          Where Clean Meets Cure
        </h1>

        <p className="text-lg md:text-xl text-neutral-200/80">
          Premium on-demand cleaning services that deliver deep sanitization,
          sparkle, and comfort to your space.
        </p>

        <div className="flex items-center justify-center sm:justify-start gap-4 pt-4">
          <AnimatedButton
            size="lg"
            className="w-full sm:w-auto font-bold"
            onClick={booking}
          >
            Book Now
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Learn More
          </AnimatedButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center sm:justify-start gap-8 pt-8 select-none"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary flex items-center gap-2">
              500+
              <ThumbsUp className="w-4 h-4" />
            </span>
            <span className="text-sm text-neutral/60">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary flex items-center gap-2">
              4.9
              <Star className="w-4 h-4" />
            </span>
            <span className="text-sm text-neutral/60">Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary flex items-center gap-2">
              24/7
              <Clock className="w-4 h-4" />
            </span>
            <span className="text-sm text-neutral/60">Support</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Content - Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-2/3 relative h-[300px] md:h-[600px]"
      >
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <Image
            src="/images/hero-image.jpeg"
            alt="Sparkure Cleaning Service Hero Image"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
