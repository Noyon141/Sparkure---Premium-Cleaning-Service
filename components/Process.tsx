"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock, Sparkles, Truck } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Book Your Service",
      description:
        "Schedule your cleaning service through our easy-to-use booking system. Choose your preferred date and time.",
    },
    {
      icon: Truck,
      title: "We Arrive",
      description:
        "Our professional cleaning team arrives at your location with all necessary equipment and supplies.",
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description:
        "We perform a thorough cleaning following our detailed checklist to ensure every corner is spotless.",
    },
    {
      icon: Clock,
      title: "Quality Check",
      description:
        "Our team performs a final inspection to ensure everything meets our high standards of cleanliness.",
    },
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl xl:text-6xl font-bold leading-tight">
              Our Cleaning Process
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-neutral-200/80">
              Experience our professional cleaning service with our simple,
              efficient process
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-neutral-200/80">
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <AnimatedButton size="lg" className="font-bold">
            Book Your Cleaning Now
          </AnimatedButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Process;
