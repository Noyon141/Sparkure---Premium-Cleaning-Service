"use client";

import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user } = await authService.getCurrentUser();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
