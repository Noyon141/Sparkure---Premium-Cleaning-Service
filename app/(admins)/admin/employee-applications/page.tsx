"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { EmployeeApplication } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmployeeApplicationsPage() {
  const [applications, setApplications] = useState<EmployeeApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/auth/employee/review");
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const reviewApplication = async (
    applicationId: string,
    status: "APPROVED" | "REJECTED",
    notes?: string
  ) => {
    try {
      setReviewing(applicationId);
      const response = await fetch("/api/auth/employee/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to review application");
      }

      toast.success(`Application ${status.toLowerCase()} successfully`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Review error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to review application"
      );
    } finally {
      setReviewing(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/10 text-green-500";
      case "REJECTED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <RouteGuard requireAuth requireRole="ADMIN">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Employee Applications
          </h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {applications.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-neutral-200/80">No applications found</p>
                </Card>
              ) : (
                applications.map((application) => (
                  <Card key={application.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <h3 className="text-lg font-semibold text-primary">
                            {application.user.fullName}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Email:</span>{" "}
                              {application.user.email}
                            </p>
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Phone:</span>{" "}
                              {application.phone}
                            </p>
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Address:</span>{" "}
                              {application.address}
                            </p>
                          </div>
                          <div>
                            <p className="text-neutral-200/80">
                              <span className="font-medium">Applied:</span>{" "}
                              {formatDate(application.createdAt)}
                            </p>
                            {application.reviewedAt && (
                              <p className="text-neutral-200/80">
                                <span className="font-medium">Reviewed:</span>{" "}
                                {formatDate(application.reviewedAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-neutral mb-1">
                              Experience:
                            </p>
                            <p className="text-neutral-200/80 text-sm">
                              {application.experience}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium text-neutral mb-1">
                              Skills:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {application.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="font-medium text-neutral mb-1">
                              Availability:
                            </p>
                            <p className="text-neutral-200/80 text-sm">
                              {application.availability}
                            </p>
                          </div>

                          {application.notes && (
                            <div>
                              <p className="font-medium text-neutral mb-1">
                                Notes:
                              </p>
                              <p className="text-neutral-200/80 text-sm">
                                {application.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {application.status === "PENDING" && (
                        <div className="flex space-x-2 ml-4">
                          <AnimatedButton
                            onClick={() =>
                              reviewApplication(application.id, "APPROVED")
                            }
                            className="bg-green-500 hover:bg-green-600"
                            size="sm"
                            disabled={reviewing === application.id}
                          >
                            {reviewing === application.id
                              ? "Approving..."
                              : "Approve"}
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() =>
                              reviewApplication(application.id, "REJECTED")
                            }
                            className="bg-red-500 hover:bg-red-600"
                            size="sm"
                            disabled={reviewing === application.id}
                          >
                            {reviewing === application.id
                              ? "Rejecting..."
                              : "Reject"}
                          </AnimatedButton>
                        </div>
                      )}
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
