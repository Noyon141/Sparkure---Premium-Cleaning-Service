import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Get user's notifications
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        ...(unreadOnly && { isRead: false }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.notification.count({
      where: {
        userId: user.id,
        ...(unreadOnly && { isRead: false }),
      },
    });

    return new Response(
      JSON.stringify({
        notifications,
        totalCount,
        hasMore: offset + limit < totalCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get notifications error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Mark notifications as read
export const PATCH = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { notificationIds, markAllAsRead = false } = body;

    if (markAllAsRead) {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: {
          userId: user.id,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      await prisma.notification.updateMany({
        where: {
          id: {
            in: notificationIds,
          },
          userId: user.id,
        },
        data: {
          isRead: true,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Notifications marked as read" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Mark notifications read error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
