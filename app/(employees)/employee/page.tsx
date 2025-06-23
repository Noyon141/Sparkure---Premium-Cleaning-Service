"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { useAuth } from "@/lib/hooks/use-auth";

export default function EmployeeDashboardPage() {
  const { user } = useAuth();

  return (
    <RouteGuard requireAuth requireRole="EMPLOYEE">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Employee Dashboard
          </h1>

          <div className="bg-card p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Welcome back, {user?.fullName}!
            </h2>

            <div className="space-y-4">
              <div>
                <span className="font-medium text-neutral">Email:</span>
                <span className="ml-2 text-neutral-200/80">{user?.email}</span>
              </div>

              <div>
                <span className="font-medium text-neutral">Role:</span>
                <span className="ml-2 text-neutral-200/80">{user?.role}</span>
              </div>

              <div>
                <span className="font-medium text-neutral">Member since:</span>
                <span className="ml-2 text-neutral-200/80">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                My Assignments
              </h3>
              <p className="text-neutral-200/80">
                View and manage your cleaning assignments
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Schedule
              </h3>
              <p className="text-neutral-200/80">
                Check your upcoming cleaning schedule
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Performance
              </h3>
              <p className="text-neutral-200/80">
                View your performance metrics and ratings
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Messages
              </h3>
              <p className="text-neutral-200/80">
                Chat with customers and team members
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Reports
              </h3>
              <p className="text-neutral-200/80">
                Submit work reports and updates
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Profile
              </h3>
              <p className="text-neutral-200/80">
                Update your profile and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
