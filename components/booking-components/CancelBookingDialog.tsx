"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cleaning } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface CancelBookingDialogProps {
  booking: Cleaning | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export default function CancelBookingDialog({
  booking,
  isOpen,
  onClose,
  onCancel,
}: CancelBookingDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      setIsLoading(true);

      const response = await fetch(`/api/cleanings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "CANCELLED",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to cancel booking");
      }

      toast.success("Booking cancelled successfully");
      onCancel();
      onClose();
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel booking"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {booking && (
          <div className="space-y-3 py-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-2">
                {booking.serviceType.replace("_", " ")}
              </h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(booking.date)}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {booking.address}
                </p>
                {booking.price && (
                  <p>
                    <span className="font-medium">Price:</span> ${booking.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <AnimatedButton
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Keep Booking
          </AnimatedButton>
          <AnimatedButton
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleCancelBooking}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Booking"}
          </AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
