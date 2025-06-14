"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building2, Home, Truck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Office Cleaning",
    description:
      "Professional cleaning services for your workspace. We handle everything from daily maintenance to deep cleaning of office spaces, meeting rooms, and common areas.",
    icon: Building2,
    image: "/images/services/office.jpg",
  },
  {
    title: "Home Cleaning",
    description:
      "Comprehensive cleaning for your entire home, both interior and exterior. From deep cleaning of rooms to maintaining outdoor spaces, we ensure your home stays spotless.",
    icon: Home,
    image: "/images/services/home.jpg",
  },
  {
    title: "Moving & Painting",
    description:
      "Complete cleaning service for moving out/in, including optional painting services. We'll help you leave your old space spotless and prepare your new space for a fresh start.",
    icon: Truck,
    image: "/images/services/moving.jpeg",
  },
];

const Services = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Our Services
        </h2>
        <p className="text-lg text-neutral-200/80 max-w-2xl mx-auto">
          Professional cleaning solutions tailored to your specific needs,
          whether it&apos;s your office, home, or moving transition.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full group hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 p-2 bg-primary/90 rounded-full">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="w-full font-bold"
                >
                  Book Now
                </AnimatedButton>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
