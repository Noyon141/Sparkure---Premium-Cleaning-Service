import * as z from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
