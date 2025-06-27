"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useBooking } from "../../lib/hooks/use-booking";

export default function BookingConfirmationClient() {
  const router = useRouter();
  const { booking } = useBooking();

  useEffect(() => {
    if (!booking) {
      router.replace("/booking/details?service=home");
    }
  }, [booking, router]);

  if (!booking) return null;

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

          {/* Dynamic booking summary */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-primary">Service</h3>
                <p className="text-neutral-200/80">
                  {booking.serviceCategory.replace("_", " ")}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Date & Time</h3>
                <p className="text-neutral-200/80">
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
                  {booking.time ? ` at ${booking.time}` : ""}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Address</h3>
                <p className="text-neutral-200/80">{booking.address}</p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Frequency</h3>
                <p className="text-neutral-200/80">
                  {booking.frequency?.replace("_", " ")}
                </p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium text-primary mb-2">
                Property Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-neutral-200/60">Square Footage</p>
                  <p className="text-neutral-200/80">
                    {booking.squareFootage || "-"} sq ft
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-200/60">Rooms</p>
                  <p className="text-neutral-200/80">{booking.rooms || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-200/60">Bathrooms</p>
                  <p className="text-neutral-200/80">
                    {booking.bathrooms || "-"}
                  </p>
                </div>
              </div>
            </div>
            {booking.notes && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium text-primary mb-2">Notes</h3>
                <p className="text-neutral-200/80">{booking.notes}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <AnimatedButton
              type="button"
              variant="outline"
              onClick={() =>
                router.push(
                  `/booking/details?service=${booking.serviceCategory.toLowerCase()}`
                )
              }
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
