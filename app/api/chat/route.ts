import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Get user's chat rooms
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const chatRoomId = searchParams.get("chatRoomId");

    if (chatRoomId) {
      // Get messages for a specific chat room
      const messages = await prisma.chatMessage.findMany({
        where: {
          chatRoomId,
          chatRoom: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
        include: {
          chatRoom: {
            include: {
              members: {
                include: {
                  user: {
                    select: {
                      id: true,
                      fullName: true,
                      email: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return new Response(JSON.stringify({ messages }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Get user's chat rooms
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  avatar: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          lastMessageAt: "desc",
        },
      });

      return new Response(JSON.stringify({ chatRooms }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Send a message
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { chatRoomId, content, messageType = "TEXT" } = body;

    if (!chatRoomId || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify user is a member of the chat room
    const membership = await prisma.chatRoomMember.findUnique({
      where: {
        userId_chatRoomId: {
          userId: user.id,
          chatRoomId,
        },
      },
    });

    if (!membership) {
      return new Response(
        JSON.stringify({ error: "Not a member of this chat room" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create the message
    const message = await prisma.chatMessage.create({
      data: {
        chatRoomId,
        senderId: user.id,
        content,
        messageType,
      },
      include: {
        chatRoom: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    email: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify({ message }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Send message error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
