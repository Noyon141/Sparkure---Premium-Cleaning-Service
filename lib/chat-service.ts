import { ChatMessage, ChatRoom, ChatRoomMember } from "@/types";

class ChatService {
  private baseUrl = "/api/chat";

  async getChatRooms(): Promise<{ chatRooms: ChatRoom[] }> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch chat rooms");
    }
    return response.json();
  }

  async getChatMessages(
    chatRoomId: string
  ): Promise<{ messages: ChatMessage[] }> {
    const response = await fetch(`${this.baseUrl}?chatRoomId=${chatRoomId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch chat messages");
    }
    return response.json();
  }

  async sendMessage(
    chatRoomId: string,
    content: string,
    messageType: "TEXT" | "IMAGE" | "FILE" = "TEXT"
  ): Promise<{ message: ChatMessage }> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatRoomId,
        content,
        messageType,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  }

  async createDirectChatRoom(
    otherUserId: string
  ): Promise<{ chatRoom: ChatRoom }> {
    const response = await fetch(`${this.baseUrl}/direct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otherUserId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create direct chat room");
    }

    return response.json();
  }

  async markMessagesAsRead(chatRoomId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatRoomId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to mark messages as read");
    }
  }
}

export const chatService = new ChatService();
export type { ChatMessage, ChatRoom, ChatRoomMember };
