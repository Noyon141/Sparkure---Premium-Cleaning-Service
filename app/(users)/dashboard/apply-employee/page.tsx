"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
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
import { Textarea } from "@/components/ui/textarea";
import { EmployeeApplicationFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const employeeApplicationSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  experience: z.string().min(1, "Experience is required"),
  skills: z.string().min(1, "Skills are required"),
  availability: z.string().min(1, "Availability is required"),
});

export default function ApplyEmployeePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState<{
    id: string;
    status: string;
    notes?: string;
  } | null>(null);
  const router = useRouter();

  const form = useForm<EmployeeApplicationFormValues>({
    resolver: zodResolver(employeeApplicationSchema),
    defaultValues: {
      phone: "",
      address: "",
      experience: "",
      skills: "",
      availability: "",
    },
  });

  useEffect(() => {
    // Check for existing application
    const checkExistingApplication = async () => {
      try {
        const response = await fetch("/api/auth/employee/apply");
        if (response.ok) {
          const data = await response.json();
          if (data.application) {
            setExistingApplication(data.application);
          }
        }
      } catch (error) {
        console.error("Error checking existing application:", error);
      }
    };

    checkExistingApplication();
  }, []);

  const onSubmit = async (data: EmployeeApplicationFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/employee/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          skills: data.skills.split(",").map((skill) => skill.trim()),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      toast.success("Employee application submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Employee application error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (existingApplication) {
    return (
      <RouteGuard requireAuth requireRole="USER">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <AnimatedWrapper animation="slide">
              <Card className="p-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-primary mb-4">
                    Application Status
                  </h1>
                  <div className="mb-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        existingApplication.status === "APPROVED"
                          ? "bg-green-500/10 text-green-500"
                          : existingApplication.status === "REJECTED"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {existingApplication.status}
                    </span>
                  </div>
                  <p className="text-neutral-200/80 mb-4">
                    Your employee application has been{" "}
                    {existingApplication.status.toLowerCase()}
                    {existingApplication.notes && (
                      <>
                        . <br />
                        <strong>Notes:</strong> {existingApplication.notes}
                      </>
                    )}
                  </p>
                  <AnimatedButton
                    onClick={() => router.push("/dashboard")}
                    className="mt-4"
                  >
                    Back to Dashboard
                  </AnimatedButton>
                </div>
              </Card>
            </AnimatedWrapper>
          </div>
        </div>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard requireAuth requireRole="USER">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <AnimatedWrapper animation="slide">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Apply to Become an Employee
                </h1>
                <p className="text-neutral-200/80">
                  Join our team and help us provide excellent cleaning services
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your full address"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your cleaning experience"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Deep cleaning, Window cleaning, Carpet cleaning"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your availability (days, hours, etc.)"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-4">
                    <AnimatedButton
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      className="flex-1"
                    >
                      Cancel
                    </AnimatedButton>
                    <AnimatedButton
                      type="submit"
                      className="flex-1 cursor-pointer"
                      variant="secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Application"}
                    </AnimatedButton>
                  </div>
                </form>
              </Form>
            </Card>
          </AnimatedWrapper>
        </div>
      </div>
    </RouteGuard>
  );
}
