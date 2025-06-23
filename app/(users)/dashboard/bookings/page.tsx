"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { Booking } from "@/types";
import { useEffect, useState } from "react";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockBookings: Booking[] = [
      {
        id: "1",
        serviceType: "HOME_CLEANING",
        date: "2024-01-15T10:00:00Z",
        address: "123 Main St, City, State",
        status: "SCHEDULED",
        price: 120,
        duration: 120,
      },
      {
        id: "2",
        serviceType: "DEEP_CLEANING",
        date: "2024-01-16T14:00:00Z",
        address: "123 Main St, City, State",
        status: "ASSIGNED",
        price: 200,
        duration: 180,
        employeeName: "Jane Smith",
        employeePhone: "+1 (555) 987-6543",
      },
      {
        id: "3",
        serviceType: "OFFICE_CLEANING",
        date: "2024-01-14T09:00:00Z",
        address: "456 Business Ave, City, State",
        status: "COMPLETED",
        price: 150,
        duration: 90,
        employeeName: "Bob Johnson",
        employeePhone: "+1 (555) 456-7890",
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

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
            <AnimatedButton className="bg-primary hover:bg-primary/90">
              Book New Service
            </AnimatedButton>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
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
                        {booking.employeeName && (
                          <p className="text-neutral-200/80">
                            <span className="font-medium">Assigned to:</span>{" "}
                            {booking.employeeName} ({booking.employeePhone})
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
              ))}
            </div>
          )}
        </div>
      </div>
    </RouteGuard>
  );
}
