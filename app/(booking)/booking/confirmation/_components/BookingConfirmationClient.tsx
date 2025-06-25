"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BookingConfirmationClient() {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      // TODO: Submit final confirmation to API
      toast.success("Booking confirmed! Redirecting to dashboard...");
      router.push("/dashboard/bookings");
    } catch (error) {
      console.log(error, "Failed to confirm booking");
      toast.error("Failed to confirm booking");
    }
  };

  return (
    <PageTransitionWrapper>
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Booking Summary
            </h2>
            <p className="text-neutral-200/80">
              Please review your booking details before confirming
            </p>
          </div>

          {/* TODO: Display booking summary from context/state */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-primary">Service</h3>
                <p className="text-neutral-200/80">Home Cleaning</p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Date & Time</h3>
                <p className="text-neutral-200/80">
                  March 15, 2024 at 10:00 AM
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Address</h3>
                <p className="text-neutral-200/80">
                  123 Example St, City, State
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Frequency</h3>
                <p className="text-neutral-200/80">One Time</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium text-primary mb-2">
                Property Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-neutral-200/60">Square Footage</p>
                  <p className="text-neutral-200/80">2000 sq ft</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-200/60">Rooms</p>
                  <p className="text-neutral-200/80">4</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-200/60">Bathrooms</p>
                  <p className="text-neutral-200/80">2</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium text-primary mb-2">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-200/80">Base Price</span>
                  <span className="text-neutral-200/80">$120.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-200/80">Extra Services</span>
                  <span className="text-neutral-200/80">$30.00</span>
                </div>
                <div className="flex justify-between font-medium text-primary pt-2 border-t">
                  <span>Total</span>
                  <span>$150.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <AnimatedButton
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Back
            </AnimatedButton>
            <AnimatedButton onClick={handleConfirm}>
              Confirm Booking
            </AnimatedButton>
          </div>
        </div>
      </Card>
    </PageTransitionWrapper>
  );
}
