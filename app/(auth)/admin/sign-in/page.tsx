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
import { useAuth } from "@/lib/hooks/use-auth";
import { AdminSignInFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const adminSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminSignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const form = useForm<AdminSignInFormValues>({
    resolver: zodResolver(adminSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminSignInFormValues) => {
    try {
      setIsLoading(true);

      // Use the admin-only sign-in endpoint
      const response = await fetch("/api/auth/admin/sign-in", {
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

      setUser(result.user); // Update global auth state
      toast.success("Welcome back! Redirecting to admin dashboard...");
      // RouteGuard will handle the redirect
    } catch (error) {
      console.error("Admin sign-in error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RouteGuard isAuthPage={true}>
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
                  Admin Sign In
                </h1>
                <p className="text-neutral-200/80">
                  Access your admin dashboard and manage the platform
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
                            placeholder="admin@sparkure.com"
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
                  Need admin access?{" "}
                  <Link
                    href="/admin/sign-up"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Contact the main admin
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
