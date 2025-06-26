"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ourServices } from "@/data/our-services";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();
  const handleBookNow = (serviceCategory: string) => {
    router.push(`/booking/details?service=${serviceCategory}`);
  };
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
        {ourServices.map((service, index) => (
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
                  onClick={() => handleBookNow(service.category.toLowerCase())}
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
