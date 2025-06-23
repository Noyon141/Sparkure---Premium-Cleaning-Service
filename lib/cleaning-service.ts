import { Cleaning, Payment, Review } from "@/types";

class CleaningService {
  private baseUrl = "/api/cleanings";

  async getCleanings(
    options: {
      status?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{
    cleanings: Cleaning[];
    totalCount: number;
    hasMore: boolean;
  }> {
    const params = new URLSearchParams();
    if (options.status) params.append("status", options.status);
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.offset) params.append("offset", options.offset.toString());

    const response = await fetch(`${this.baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cleanings");
    }
    return response.json();
  }

  async getCleaning(cleaningId: string): Promise<{ cleaning: Cleaning }> {
    const response = await fetch(`${this.baseUrl}/${cleaningId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cleaning");
    }
    return response.json();
  }

  async createCleaning(data: {
    serviceType: Cleaning["serviceType"];
    date: string;
    address: string;
    note?: string;
    price?: number;
    duration?: number;
    priority?: Cleaning["priority"];
  }): Promise<{ cleaning: Cleaning }> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create cleaning");
    }

    return response.json();
  }

  async updateCleaning(
    cleaningId: string,
    data: Partial<{
      status: Cleaning["status"];
      employeeId: string;
      date: string;
      address: string;
      note: string;
      price: number;
      duration: number;
      priority: Cleaning["priority"];
    }>
  ): Promise<{ cleaning: Cleaning }> {
    const response = await fetch(`${this.baseUrl}/${cleaningId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update cleaning");
    }

    return response.json();
  }

  async deleteCleaning(cleaningId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${cleaningId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete cleaning");
    }
  }

  async assignEmployee(
    cleaningId: string,
    employeeId: string
  ): Promise<{ cleaning: Cleaning }> {
    return this.updateCleaning(cleaningId, {
      employeeId,
      status: "ASSIGNED",
    });
  }

  async startCleaning(cleaningId: string): Promise<{ cleaning: Cleaning }> {
    return this.updateCleaning(cleaningId, {
      status: "IN_PROGRESS",
    });
  }

  async completeCleaning(cleaningId: string): Promise<{ cleaning: Cleaning }> {
    return this.updateCleaning(cleaningId, {
      status: "COMPLETED",
    });
  }

  async cancelCleaning(cleaningId: string): Promise<{ cleaning: Cleaning }> {
    return this.updateCleaning(cleaningId, {
      status: "CANCELLED",
    });
  }
}

export const cleaningService = new CleaningService();
export type { Cleaning, Payment, Review };
