"use client";

import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
