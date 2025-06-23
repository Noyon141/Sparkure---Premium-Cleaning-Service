"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { useAuth } from "@/lib/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <RouteGuard requireAuth requireRole="USER">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>

          <div className="bg-card p-8 rounded-lg shadow-sm">
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Bookings
              </h3>
              <p className="text-neutral-200/80">
                Manage your cleaning appointments
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                History
              </h3>
              <p className="text-neutral-200/80">View your past services</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Settings
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
