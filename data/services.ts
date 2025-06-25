import { ServiceOption } from "@/types";

export const services: ServiceOption[] = [
  {
    id: "office-cleaning",
    category: "OFFICE",
    name: "Office Cleaning",
    description:
      "Professional cleaning services for offices and commercial spaces",
    image: "/images/services/office.jpg",
    basePrice: 150,
    features: [
      "Deep cleaning of all workspaces",
      "Sanitization of high-touch surfaces",
      "Floor cleaning and maintenance",
      "Kitchen and break room cleaning",
      "Restroom sanitization",
      "Window cleaning",
      "Trash removal and recycling",
    ],
  },
  {
    id: "home-cleaning",
    category: "HOME",
    name: "Home Cleaning",
    description: "Comprehensive cleaning solutions for your home",
    image: "/images/services/home.jpg",
    basePrice: 120,
    features: [
      "Room-by-room deep cleaning",
      "Kitchen and bathroom sanitization",
      "Dusting and vacuuming",
      "Floor mopping and maintenance",
      "Window sill and baseboard cleaning",
      "Bed making and linen changing",
      "Appliance exterior cleaning",
    ],
  },
  {
    id: "moving-painting",
    category: "MOVING_AND_PAINTING",
    name: "Moving & Painting",
    description: "Moving assistance and professional painting services",
    image: "/images/services/moving.jpeg",
    basePrice: 200,
    features: [
      "Move-in/move-out cleaning",
      "Professional painting services",
      "Wall repair and preparation",
      "Packing and unpacking assistance",
      "Furniture assembly/disassembly",
      "Interior and exterior painting",
      "Post-renovation cleanup",
    ],
  },
];
