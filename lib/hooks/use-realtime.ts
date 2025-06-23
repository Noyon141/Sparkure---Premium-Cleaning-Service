"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface UseRealtimeOptions {
  onNotification?: (notification: Record<string, unknown>) => void;
  onChatMessage?: (message: Record<string, unknown>) => void;
  onCleaningUpdate?: (cleaning: Record<string, unknown>) => void;
  onServiceRequest?: (request: Record<string, unknown>) => void;
}

export function useRealtime(options: UseRealtimeOptions = {}) {
  const { user, isAuthenticated } = useAuth();
  const channelsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Capture ref value for cleanup
    const channels = channelsRef.current;

    // Mock Supabase client - replace with actual Supabase client
    const mockSupabase = {
      channel: (name: string) => ({
        on: (
          event: string,
          config: Record<string, unknown>,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _callback?: (payload: Record<string, unknown>) => void
        ) => {
          console.log(`Subscribed to ${event} on ${name}`, config);
          channelsRef.current.add(name);
          // Store callback for later use if needed
          return { subscribe: () => console.log(`Channel ${name} subscribed`) };
        },
        subscribe: () => console.log(`Channel ${name} subscribed`),
      }),
    };

    // Subscribe to notifications
    if (options.onNotification) {
      mockSupabase
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload: Record<string, unknown>) => {
            console.log("New notification:", payload.new);
            options.onNotification?.(payload.new as Record<string, unknown>);
            toast.info(
              (payload.new as Record<string, unknown>).title as string
            );
          }
        )
        .subscribe();
    }

    // Subscribe to chat messages
    if (options.onChatMessage) {
      mockSupabase
        .channel("chat_messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `sender_id=neq.${user.id}`,
          },
          (payload: Record<string, unknown>) => {
            console.log("New chat message:", payload.new);
            options.onChatMessage?.(payload.new as Record<string, unknown>);
          }
        )
        .subscribe();
    }

    // Subscribe to cleaning updates
    if (options.onCleaningUpdate) {
      const cleaningFilter =
        user.role === "USER"
          ? `customer_id=eq.${user.id}`
          : user.role === "EMPLOYEE"
          ? `employee_id=eq.${user.id}`
          : undefined;

      if (cleaningFilter) {
        mockSupabase
          .channel("cleanings")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "cleanings",
              filter: cleaningFilter,
            },
            (payload: Record<string, unknown>) => {
              console.log("Cleaning updated:", payload.new);
              options.onCleaningUpdate?.(
                payload.new as Record<string, unknown>
              );
              toast.info(
                `Cleaning status: ${
                  (payload.new as Record<string, unknown>).status
                }`
              );
            }
          )
          .subscribe();
      }
    }

    // Subscribe to service requests (for employees and admins)
    if (
      options.onServiceRequest &&
      (user.role === "EMPLOYEE" || user.role === "ADMIN")
    ) {
      mockSupabase
        .channel("service_requests")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "service_requests",
          },
          (payload: Record<string, unknown>) => {
            console.log("New service request:", payload.new);
            options.onServiceRequest?.(payload.new as Record<string, unknown>);
            toast.info("New service request received");
          }
        )
        .subscribe();
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up real-time subscriptions");
      channels.clear();
    };
  }, [isAuthenticated, user, options]);

  return {
    isConnected: channelsRef.current.size > 0,
    channels: Array.from(channelsRef.current),
  };
}
