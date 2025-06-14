"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement sign up logic
    setIsLoading(false);
  };

  return (
    <AnimatedWrapper>
      <div className="min-h-screen flex items-center justify-center bg-primary/10 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl z-10 px-4"
        >
          <Card className="p-8 md:p-12 bg-background/50 backdrop-blur-sm border-primary/10">
            <div className="space-y-8">
              <div className="space-y-3 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                  Create an account
                </h1>
                <p className="text-lg text-neutral-200/80">
                  Enter your details to get started
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="w-full h-12 bg-background/50 border-primary/10 text-base"
                  />
                </div>
                <AnimatedButton
                  type="submit"
                  className="w-full h-12 text-base font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </AnimatedButton>
              </form>
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
          </Card>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
}
