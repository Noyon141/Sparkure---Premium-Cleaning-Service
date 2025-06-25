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
import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/hooks/use-auth";
import { signUpSchema } from "@/lib/validations/auth";
import { SignInFormValues, SignUpFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      // Sign up the user
      await authService.signUp(data);

      toast.success("Account created successfully!");
      // Auto sign-in after successful sign-up
      const signInData: SignInFormValues = {
        email: data.email,
        password: data.password,
      };
      const signInResponse = await authService.signIn(signInData);
      setUser(signInResponse.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Create an account
        </h1>
        <p className="text-lg text-neutral-200/80">
          Enter your details to get started
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                    {...field}
                  />
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
                    placeholder="Enter your email"
                    type="email"
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
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
                    placeholder="Enter your password"
                    type="password"
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
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
                    placeholder="Confirm your password"
                    type="password"
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatedButton
            type="submit"
            className="w-full h-12 text-base font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </AnimatedButton>
        </form>
      </Form>
      <div className="text-center text-base text-neutral-200/80">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
