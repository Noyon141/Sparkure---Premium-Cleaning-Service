"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function RouteGuard({
  children,
  requireAuth = false,
  redirectTo = "/",
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If route requires authentication and user is not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push("/sign-in");
        return;
      }

      // If route is for unauthenticated users only and user is authenticated
      if (!requireAuth && isAuthenticated) {
        router.push(redirectTo);
        return;
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-neutral-200/80">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if redirecting
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
