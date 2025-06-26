import { ServiceOption } from "@/types";
import { Building2, Home, LucideIcon, Truck } from "lucide-react";

export type OurService = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  category: ServiceOption["category"];
};

export const ourServices: OurService[] = [
  {
    title: "Office Cleaning",
    category: "OFFICE",
    description:
      "Professional cleaning services for your workspace. We handle everything from daily maintenance to deep cleaning of office spaces, meeting rooms, and common areas.",
    icon: Building2,
    image: "/images/services/office.jpg",
  },
  {
    title: "Home Cleaning",
    category: "HOME",
    description:
      "Comprehensive cleaning for your entire home, both interior and exterior. From deep cleaning of rooms to maintaining outdoor spaces, we ensure your home stays spotless.",
    icon: Home,
    image: "/images/services/home.jpg",
  },
  {
    title: "Moving & Painting",
    category: "MOVING_AND_PAINTING",
    description:
      "Complete cleaning service for moving out/in, including optional painting services. We'll help you leave your old space spotless and prepare your new space for a fresh start.",
    icon: Truck,
    image: "/images/services/moving.jpeg",
  },
];
