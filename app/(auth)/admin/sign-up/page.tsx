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
import { AdminSignUpFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const adminSignUpSchema = z
  .object({
    token: z.string().min(1, "Invitation token is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AdminSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [invitationData, setInvitationData] = useState<{
    email: string;
    fullName: string;
  } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<AdminSignUpFormValues>({
    resolver: zodResolver(adminSignUpSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (token) {
      form.setValue("token", token);
      // TODO: Validate token and get invitation data
      // For now, we'll use placeholder data
      setInvitationData({
        email: "admin@sparkure.com",
        fullName: "Admin User",
      });
    }
  }, [token, form]);

  const onSubmit = async (data: AdminSignUpFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/admin/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create admin account");
      }

      toast.success("Admin account created successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Admin sign-up error:", error);
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
                  Admin Account Setup
                </h1>
                <p className="text-neutral-200/80">
                  Complete your admin account registration
                </p>
              </div>

              {invitationData && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    <strong>Invitation for:</strong> {invitationData.fullName} (
                    {invitationData.email})
                  </p>
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invitation Token</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your invitation token"
                            {...field}
                            disabled={!!token}
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

                  <AnimatedButton
                    type="submit"
                    className="w-full cursor-pointer"
                    variant="secondary"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Admin Account"}
                  </AnimatedButton>
                </form>
              </Form>
            </Card>
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </RouteGuard>
  );
}
