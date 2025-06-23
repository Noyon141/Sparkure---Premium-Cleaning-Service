"use client";

import { useAuth } from "@/lib/hooks/use-auth";

export default function AdminDashboardContent() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Admin Dashboard
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
              User Management
            </h3>
            <p className="text-neutral-200/80">
              Manage customers, employees, and admin accounts
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Service Management
            </h3>
            <p className="text-neutral-200/80">
              Monitor and manage all cleaning services
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Analytics
            </h3>
            <p className="text-neutral-200/80">
              View business metrics and performance data
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Payments
            </h3>
            <p className="text-neutral-200/80">
              Track payments and manage billing
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">Reports</h3>
            <p className="text-neutral-200/80">
              Generate and view business reports
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Settings
            </h3>
            <p className="text-neutral-200/80">
              Configure system settings and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
