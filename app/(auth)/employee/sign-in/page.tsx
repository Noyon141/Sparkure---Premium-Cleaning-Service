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
import { EmployeeSignInFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const employeeSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function EmployeeSignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EmployeeSignInFormValues>({
    resolver: zodResolver(employeeSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: EmployeeSignInFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign in");
      }

      // Check if user is an employee
      if (result.user.role !== "EMPLOYEE") {
        toast.error("This account is not authorized for employee access");
        return;
      }

      toast.success("Welcome back! Redirecting to employee dashboard...");

      // Small delay to show the success message
      setTimeout(() => {
        router.push("/employee");
      }, 1500);
    } catch (error) {
      console.error("Employee sign-in error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RouteGuard isAuthPage>
      <AnimatedWrapper>
        <div className="min-h-screen flex items-center justify-center bg-primary/10 relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

          <AnimatedWrapper
            className="w-full max-w-xl z-10 px-4"
            animation="slide"
            delay={0.5}
          >
            <Card className="p-8 md:p-12 bg-background/50 backdrop-blur-sm border-primary/10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Employee Sign In
                </h1>
                <p className="text-neutral-200/80">
                  Access your employee dashboard and manage assignments
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="employee@sparkure.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <AnimatedButton
                    type="submit"
                    className="w-full cursor-pointer"
                    variant="secondary"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </AnimatedButton>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-neutral-200/80">
                  Don&apos;t have an employee account?{" "}
                  <Link
                    href="/employee/sign-up"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Apply to become an employee
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/sign-in"
                  className="text-neutral-200/60 hover:text-neutral-200/80 text-sm"
                >
                  ← Back to regular sign in
                </Link>
              </div>
            </Card>
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </RouteGuard>
  );
}
