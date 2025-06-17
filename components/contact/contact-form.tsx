"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactService } from "@/lib/contact-service";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormProps {
  initialData?: Partial<ContactFormValues>;
}

export function ContactForm({ initialData }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      message: initialData?.message || "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save form data to sessionStorage for persistence
      sessionStorage.setItem("contactFormData", JSON.stringify(data));
      toast.error("Please sign in to submit the contact form");
      router.push("/sign-in");
      return;
    }

    try {
      setIsLoading(true);

      await contactService.submitContactForm(data);

      // Clear form data from sessionStorage
      sessionStorage.removeItem("contactFormData");

      // Reset form
      form.reset();

      toast.success("Contact form submitted successfully!");
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load persisted form data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const persistedData = sessionStorage.getItem("contactFormData");
      if (persistedData) {
        try {
          const data = JSON.parse(persistedData);
          form.reset(data);
          sessionStorage.removeItem("contactFormData");
          toast.success("Your form data has been restored!");
        } catch (error) {
          console.error("Error parsing persisted form data:", error);
        }
      }
    }
  }, [isAuthenticated, form]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background p-8 rounded-2xl shadow-sm">
      <h2 className="text-3xl font-semibold text-primary mb-6">
        Send us a Message
      </h2>

      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-600 dark:text-yellow-400 text-sm">
            ⚠️ You need to be signed in to submit this form. Your data will be
            saved and restored after you sign in.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your cleaning needs..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatedButton
            type="submit"
            className="w-full cursor-pointer"
            variant="secondary"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Send Message"}
          </AnimatedButton>
        </form>
      </Form>
    </div>
  );
}
