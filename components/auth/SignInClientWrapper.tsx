"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { SignInForm } from "@/components/auth/sign-in-form";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function SignInClientWrapper() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const returnTo = searchParams.get("returnTo");

  useEffect(() => {
    if (reason === "booking" && returnTo) {
      // Determine the page name from the returnTo path
      let pageName = "Booking";
      if (returnTo.includes("details")) pageName = "Booking Details";
      else if (returnTo.includes("confirmation"))
        pageName = "Booking Confirmation";
      else if (returnTo.includes("booking")) pageName = "Booking";
      toast.info(`Please sign in to go to ${pageName}`);
    }
  }, [reason, returnTo]);

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
              <SignInForm returnTo={returnTo || undefined} />
            </Card>
          </AnimatedWrapper>
        </div>
      </AnimatedWrapper>
    </RouteGuard>
  );
}
