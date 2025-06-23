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
import { EmployeeSignUpFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const employeeSignUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    experience: z.string().min(1, "Experience is required"),
    skills: z.string().min(1, "Skills are required"),
    availability: z.string().min(1, "Availability is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function EmployeeSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EmployeeSignUpFormValues>({
    resolver: zodResolver(employeeSignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      experience: "",
      skills: "",
      availability: "",
    },
  });

  const onSubmit = async (data: EmployeeSignUpFormValues) => {
    try {
      setIsLoading(true);

      // First, create the user account
      const signUpResponse = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      if (!signUpResponse.ok) {
        const error = await signUpResponse.json();
        throw new Error(error.error || "Failed to create account");
      }

      // Sign in the user
      const signInResponse = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!signInResponse.ok) {
        throw new Error("Failed to sign in after account creation");
      }

      // Submit employee application
      const applicationResponse = await fetch("/api/auth/employee/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.phone,
          address: data.address,
          experience: data.experience,
          skills: data.skills.split(",").map((skill) => skill.trim()),
          availability: data.availability,
        }),
      });

      if (!applicationResponse.ok) {
        const error = await applicationResponse.json();
        throw new Error(error.error || "Failed to submit employee application");
      }

      toast.success(
        "Employee application submitted successfully! We will review your application and contact you via email for the next steps.",
        {
          duration: 6000,
        }
      );

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Employee sign-up error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RouteGuard isAuthPage>
      <AnimatedWrapper>
        <div className="min-h-screen flex items-center justify-center bg-primary/10 relative overflow-hidden py-8">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

          <AnimatedWrapper
            className="w-full max-w-2xl z-10 px-4"
            animation="slide"
            delay={0.5}
          >
            <Card className="p-8 md:p-12 bg-background/50 backdrop-blur-sm border-primary/10">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <Input
                              placeholder="123 Main St, City, State"
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

                  <AnimatedButton
                    type="submit"
                    className="w-full cursor-pointer"
                    variant="secondary"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Submitting Application..."
                      : "Submit Application"}
                  </AnimatedButton>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-neutral-200/80">
                  Already have an employee account?{" "}
                  <Link
                    href="/employee/sign-in"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/sign-up"
                  className="text-neutral-200/60 hover:text-neutral-200/80 text-sm"
                >
                  ← Back to regular sign up
                </Link>
              </div>
            </Card>
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </RouteGuard>
  );
}
