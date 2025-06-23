import { Notification } from "@/types";

class NotificationService {
  private baseUrl = "/api/notifications";

  async getNotifications(
    options: {
      unreadOnly?: boolean;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{
    notifications: Notification[];
    totalCount: number;
    hasMore: boolean;
  }> {
    const params = new URLSearchParams();
    if (options.unreadOnly) params.append("unread", "true");
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.offset) params.append("offset", options.offset.toString());

    const response = await fetch(`${this.baseUrl}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch notifications");
    }

    return response.json();
  }

  async markAsRead(notificationIds?: string[]): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationIds,
        markAllAsRead: !notificationIds,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to mark notifications as read");
    }
  }

  async getUnreadCount(): Promise<number> {
    const response = await this.getNotifications({ unreadOnly: true });
    return response.totalCount;
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${notificationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete notification");
    }
  }
}

export const notificationService = new NotificationService();
