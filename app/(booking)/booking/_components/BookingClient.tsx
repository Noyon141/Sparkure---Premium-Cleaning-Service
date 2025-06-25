"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Card } from "@/components/ui/card";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { ServiceOption } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookingClientProps {
  services: ServiceOption[];
}

export default function BookingClient({ services }: BookingClientProps) {
  const router = useRouter();

  const handleSelectService = (service: ServiceOption) => {
    router.push(`/booking/details?service=${service.category.toLowerCase()}`);
  };

  return (
    <PageTransitionWrapper>
      <div className="space-y-8 ">
        <div className="text-center">
          <p className="text-lg text-neutral-200/80 max-w-2xl mx-auto">
            Choose from our professional cleaning services tailored to your
            needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedWrapper key={index}>
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-neutral-200/80 mb-4 flex-1">
                    {service.description}
                  </p>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-neutral-200/60 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        From ${service.basePrice}
                      </span>
                      <AnimatedButton
                        onClick={() => handleSelectService(service)}
                        size="sm"
                      >
                        Book Now
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
