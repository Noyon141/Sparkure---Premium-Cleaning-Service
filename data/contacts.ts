import { ContactData } from "@/types";

export const contactData: ContactData = {
  company: {
    name: "Sparkure",
    tagline: "Premium Cleaning Services",
  },
  contact: {
    email: "contact@sparkure.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Sparkle Street",
      city: "Clean City",
      state: "CS",
      zip: "12345",
      country: "United States",
    },
  },
  social: {
    facebook: "https://facebook.com/sparkure",
    twitter: "https://twitter.com/sparkure",
    instagram: "https://instagram.com/sparkure",
    linkedin: "https://linkedin.com/company/sparkure",
  },
  businessHours: {
    weekdays: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  serviceAreas: [
    {
      name: "Downtown",
    },
    {
      name: "Westside",
    },
    {
      name: "Eastside",
    },
    {
      name: "North District",
    },
    {
      name: "South District",
    },
    {
      name: "Business Park",
    },
    {
      name: "Residential Areas",
    },
    {
      name: "Commercial Zones",
    },
  ],
};
