"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    name: "Home Deep Cleaning",
    description:
      "Thorough cleaning for every corner of your home, using eco-friendly products.",
    image: "/images/services/home.jpg",
  },
  {
    name: "Office Cleaning",
    description:
      "Keep your workspace spotless and productive with our flexible office cleaning plans.",
    image: "/images/services/office.jpg",
  },
  {
    name: "Move-In/Move-Out Cleaning",
    description:
      "Perfect for tenants and landlords. We make moving stress-free and sparkling clean.",
    image: "/images/services/moving.jpeg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesPage() {
  return (
    <PageTransitionWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Premium Services
          </h1>
          <p className="text-lg md:text-xl text-neutral/80 max-w-2xl mx-auto">
            Experience the difference with our comprehensive cleaning solutions,
            designed to transform your space into a pristine sanctuary.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex flex-col flex-grow p-6 lg:p-8">
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  {service.name}
                </h2>
                <p className="text-neutral/70 mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <AnimatedButton
                    size="lg"
                    variant="outline"
                    className="w-full font-bold"
                  >
                    Book Now
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransitionWrapper>
  );
}
