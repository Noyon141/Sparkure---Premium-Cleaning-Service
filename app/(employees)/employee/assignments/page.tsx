"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { Assignment } from "@/types";
import { useEffect, useState } from "react";

export default function EmployeeAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAssignments: Assignment[] = [
      {
        id: "1",
        serviceType: "HOME_CLEANING",
        date: "2024-01-15T10:00:00Z",
        address: "123 Main St, City, State",
        status: "SCHEDULED",
        customerName: "John Doe",
        customerPhone: "+1 (555) 123-4567",
        priority: "NORMAL",
      },
      {
        id: "2",
        serviceType: "OFFICE_CLEANING",
        date: "2024-01-16T14:00:00Z",
        address: "456 Business Ave, City, State",
        status: "IN_PROGRESS",
        customerName: "Jane Smith",
        customerPhone: "+1 (555) 987-6543",
        priority: "HIGH",
      },
      {
        id: "3",
        serviceType: "DEEP_CLEANING",
        date: "2024-01-14T09:00:00Z",
        address: "789 Residential Blvd, City, State",
        status: "COMPLETED",
        customerName: "Bob Johnson",
        customerPhone: "+1 (555) 456-7890",
        priority: "LOW",
      },
    ];

    setTimeout(() => {
      setAssignments(mockAssignments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/10 text-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-500/10 text-red-500";
      case "HIGH":
        return "bg-orange-500/10 text-orange-500";
      case "LOW":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-blue-500/10 text-blue-500";
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
    <RouteGuard requireAuth requireRole="EMPLOYEE">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">
            My Assignments
          </h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-lg font-semibold text-primary">
                          {assignment.serviceType.replace("_", " ")}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                            assignment.status
                          )}`}
                        >
                          {assignment.status.replace("_", " ")}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeColor(
                            assignment.priority
                          )}`}
                        >
                          {assignment.priority}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-neutral-200/80">
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(assignment.date)}
                        </p>
                        <p className="text-neutral-200/80">
                          <span className="font-medium">Address:</span>{" "}
                          {assignment.address}
                        </p>
                        <p className="text-neutral-200/80">
                          <span className="font-medium">Customer:</span>{" "}
                          {assignment.customerName} ({assignment.customerPhone})
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {assignment.status === "SCHEDULED" && (
                        <AnimatedButton
                          className="bg-primary hover:bg-primary/90"
                          size="sm"
                        >
                          Start
                        </AnimatedButton>
                      )}
                      {assignment.status === "IN_PROGRESS" && (
                        <AnimatedButton
                          className="bg-green-500 hover:bg-green-600"
                          size="sm"
                        >
                          Complete
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
