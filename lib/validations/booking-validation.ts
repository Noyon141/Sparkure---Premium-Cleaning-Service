import { z } from "zod";

export const bookingDetailsSchema = z.object({
  serviceCategory: z.enum(["OFFICE", "HOME", "MOVING_AND_PAINTING"]),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  address: z.string().min(1, "Address is required"),
  notes: z.string().optional(),
  frequency: z.enum(["ONE_TIME", "WEEKLY", "BI_WEEKLY", "MONTHLY"]),
  squareFootage: z.coerce.number().positive("Square footage must be positive"),
  rooms: z.coerce.number().positive("Number of rooms must be positive"),
  bathrooms: z.coerce.number().positive("Number of bathrooms must be positive"),
});

export type BookingDetailsFormValues = z.infer<typeof bookingDetailsSchema>;
