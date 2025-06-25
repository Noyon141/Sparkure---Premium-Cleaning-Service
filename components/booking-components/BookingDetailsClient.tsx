"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { Textarea } from "@/components/ui/textarea";
import {
  BookingDetailsFormValues,
  bookingDetailsSchema,
} from "@/lib/validations/booking-validation";
import { ServiceCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BookingDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  // Wait for hydration
  useEffect(() => {
    setReady(true);
  }, []);

  // Always get the latest service param from the URL
  const serviceType = useMemo(() => {
    if (!ready) return undefined;
    const param = searchParams.get("service");
    if (!param) return undefined;
    const upper = param.toUpperCase();
    if (["OFFICE", "HOME", "MOVING_AND_PAINTING"].includes(upper)) {
      return upper as ServiceCategory;
    }
    return undefined;
  }, [searchParams, ready]);

  const form = useForm<BookingDetailsFormValues>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: {
      serviceCategory: serviceType || "HOME",
      date: "",
      time: "",
      address: "",
      notes: "",
      frequency: "ONE_TIME",
      squareFootage: 0,
      rooms: 0,
      bathrooms: 0,
    },
  });

  useEffect(() => {
    if (!ready) return;
    if (!serviceType) {
      // If serviceType is missing or invalid, redirect to /booking
      router.replace("/booking");
    } else {
      form.setValue("serviceCategory", serviceType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceType, router, ready]);

  const onSubmit = async (data: BookingDetailsFormValues) => {
    try {
      // TODO: Submit booking data to API
      console.log("Booking data:", data);
      toast.success("Booking details saved! Redirecting to confirmation...");
      router.push("/booking/confirmation");
    } catch (error) {
      console.log(
        error,
        "Failed to save booking details. (booking/details/page.tsx)"
      );
      toast.error("Failed to save booking details");
    }
  };

  // Wait for hydration and search param
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  // Show a loading spinner if serviceType is not ready
  if (!serviceType) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <PageTransitionWrapper key={pathname + searchParams.toString()}>
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-primary">
              Service Details
            </h2>
            <p className="text-neutral-200/80">
              Please provide the details for your booking
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the service address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="squareFootage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Footage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min={500}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Frequency</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                        {...field}
                      >
                        <option value="ONE_TIME">One Time</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="BI_WEEKLY">Bi-Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions or requirements..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <AnimatedButton
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Back
                </AnimatedButton>
                <AnimatedButton type="submit">Continue</AnimatedButton>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </PageTransitionWrapper>
  );
}
