"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { User } from "@/types";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockUsers: User[] = [
      {
        id: "1",
        fullName: "John Doe",
        email: "john@example.com",
        role: "USER",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        fullName: "Jane Smith",
        email: "jane@example.com",
        role: "EMPLOYEE",
        isActive: true,
        createdAt: "2024-01-02T00:00:00Z",
      },
      {
        id: "3",
        fullName: "Admin User",
        email: "admin@sparkure.com",
        role: "ADMIN",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      },
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "EMPLOYEE":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-green-500/10 text-green-500 border-green-500/20";
    }
  };

  return (
    <RouteGuard requireAuth requireRole="ADMIN">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">User Management</h1>
            <AnimatedButton className="bg-primary hover:bg-primary/90">
              Add New User
            </AnimatedButton>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-6">
              {users.map((userItem) => (
                <Card key={userItem.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {userItem.fullName}
                        </h3>
                        <p className="text-neutral-200/80">{userItem.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(
                          userItem.role
                        )}`}
                      >
                        {userItem.role}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          userItem.isActive
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {userItem.isActive ? "Active" : "Inactive"}
                      </span>
                      <div className="flex space-x-2">
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          className="border-primary/20 hover:border-primary/40"
                        >
                          Edit
                        </AnimatedButton>
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          className="border-red-500/20 hover:border-red-500/40 text-red-500"
                        >
                          Delete
                        </AnimatedButton>
                      </div>
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
