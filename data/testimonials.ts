import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
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
