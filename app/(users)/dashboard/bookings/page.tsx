"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { Cleaning } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Cleaning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/cleanings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data.cleanings || []);
      } else {
        toast.error("Failed to load bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/10 text-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-500";
      case "ASSIGNED":
        return "bg-purple-500/10 text-purple-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <RouteGuard requireAuth requireRole="USER">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">My Bookings</h1>
            <Link href="/booking">
              <AnimatedButton className="bg-primary hover:bg-primary/90">
                Book New Service
              </AnimatedButton>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-neutral-200/80 mb-4">No bookings found</p>
                  <Link href="/booking">
                    <AnimatedButton>Book Your First Service</AnimatedButton>
                  </Link>
                </Card>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <h3 className="text-lg font-semibold text-primary">
                            {booking.serviceType.replace("_", " ")}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-neutral-200/80">
                            <span className="font-medium">Date:</span>{" "}
                            {formatDate(booking.date)}
                          </p>
                          <p className="text-neutral-200/80">
                            <span className="font-medium">Address:</span>{" "}
                            {booking.address}
                          </p>
                          {booking.price && (
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Price:</span> $
                              {booking.price}
                            </p>
                          )}
                          {booking.duration && (
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Duration:</span>{" "}
                              {formatDuration(booking.duration)}
                            </p>
                          )}
                          {booking.employee && (
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Assigned to:</span>{" "}
                              {booking.employee.fullName} (
                              {booking.employee.phone})
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === "SCHEDULED" && (
                          <AnimatedButton
                            variant="outline"
                            size="sm"
                            className="border-red-500/20 hover:border-red-500/40 text-red-500"
                          >
                            Cancel
                          </AnimatedButton>
                        )}
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          className="border-primary/20 hover:border-primary/40"
                        >
                          View Details
                        </AnimatedButton>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </RouteGuard>
  );
}
