"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Office Manager",
    company: "Tech Solutions Inc.",
    image: "/testimonials/sarah.avif",
    rating: 5,
    review:
      "The office cleaning service is exceptional. They maintain our workspace impeccably, and their attention to detail is impressive. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Homeowner",
    image: "/testimonials/michael.avif",
    rating: 5,
    review:
      "Their home cleaning service transformed our house. Both interior and exterior cleaning was thorough and professional. The team was courteous and efficient.",
  },
  {
    name: "Emma Rodriguez",
    role: "Apartment Resident",
    image: "/testimonials/emma.avif",
    rating: 5,
    review:
      "Moving cleaning service was a lifesaver! They handled both cleaning and painting, making our transition smooth and stress-free. The quality of work was outstanding.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-neutral-200/80 max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what our
                satisfied customers have to say about our services.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.name} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>
                          {testimonial.role}
                          {testimonial.company && ` • ${testimonial.company}`}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-neutral-200/80 italic">
                        &ldquo;{testimonial.review}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-12">
              <p className="text-lg text-neutral-200/80">
                Join our growing list of satisfied customers. Experience the
                difference in professional cleaning services today.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
