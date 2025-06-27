"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { useBooking } from "@/lib/hooks/use-booking";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { clearBooking } = useBooking();

  useEffect(() => {
    if (
      !pathname.startsWith("/booking/details") &&
      !pathname.startsWith("/booking/confirmation")
    ) {
      clearBooking();
    }
  }, [pathname, clearBooking]);

  return (
    <RouteGuard>
      <PageTransitionWrapper>
        <div className="min-h-screen py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-primary text-center mb-8">
              Book a Service
            </h1>
            {children}
          </div>
        </div>
      </PageTransitionWrapper>
    </RouteGuard>
  );
}
