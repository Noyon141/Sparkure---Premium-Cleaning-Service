"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { RouteGuardProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RouteGuard({
  children,
  requireAuth = false,
  requireRole,
  isAuthPage = false,
}: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthPage && isAuthenticated) {
      const redirectPath =
        user?.role === "ADMIN"
          ? "/admin"
          : user?.role === "EMPLOYEE"
          ? "/employee"
          : "/dashboard";
      router.push(redirectPath);
      return;
    }

    if (requireAuth) {
      if (!isAuthenticated) {
        router.push("/sign-in");
        return;
      }

      if (requireRole && user?.role !== requireRole) {
        router.push("/dashboard");
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    router,
    user,
    requireRole,
    isAuthPage,
  ]);

  if (isLoading) {
    return null;
  }

  if (
    (requireAuth && !isAuthenticated) ||
    (requireAuth && requireRole && user?.role !== requireRole) ||
    (isAuthPage && isAuthenticated)
  ) {
    return null;
  }

  return <>{children}</>;
}
