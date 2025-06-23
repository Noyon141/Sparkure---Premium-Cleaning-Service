import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Get a specific cleaning
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const cleaningId = request.url.split("/").pop();

    if (!cleaningId) {
      return new Response(
        JSON.stringify({ error: "Cleaning ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const cleaning = await prisma.cleaning.findUnique({
      where: { id: cleaningId },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        employee: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        reviews: {
          include: {
            customer: {
              select: {
                fullName: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            method: true,
            createdAt: true,
          },
        },
      },
    });

    if (!cleaning) {
      return new Response(JSON.stringify({ error: "Cleaning not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check permissions
    if (user.role === "USER" && cleaning.customerId !== user.id) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (user.role === "EMPLOYEE" && cleaning.employeeId !== user.id) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ cleaning }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get cleaning error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Update a cleaning
export const PATCH = requireAuth(async (request: NextRequest, user) => {
  try {
    const cleaningId = request.url.split("/").pop();
    const body = await request.json();

    if (!cleaningId) {
      return new Response(
        JSON.stringify({ error: "Cleaning ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the cleaning first to check permissions
    const existingCleaning = await prisma.cleaning.findUnique({
      where: { id: cleaningId },
    });

    if (!existingCleaning) {
      return new Response(JSON.stringify({ error: "Cleaning not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check permissions
    if (user.role === "USER" && existingCleaning.customerId !== user.id) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (user.role === "EMPLOYEE" && existingCleaning.employeeId !== user.id) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (body.status) updateData.status = body.status;
    if (body.employeeId) updateData.employeeId = body.employeeId;
    if (body.date) updateData.date = new Date(body.date);
    if (body.address) updateData.address = body.address;
    if (body.note !== undefined) updateData.note = body.note;
    if (body.price !== undefined)
      updateData.price = body.price ? parseFloat(body.price) : null;
    if (body.duration !== undefined)
      updateData.duration = body.duration ? parseInt(body.duration) : null;
    if (body.priority) updateData.priority = body.priority;

    const updatedCleaning = await prisma.cleaning.update({
      where: { id: cleaningId },
      data: updateData,
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        employee: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return new Response(JSON.stringify({ cleaning: updatedCleaning }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update cleaning error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Delete a cleaning
export const DELETE = requireAuth(async (request: NextRequest, user) => {
  try {
    const cleaningId = request.url.split("/").pop();

    if (!cleaningId) {
      return new Response(
        JSON.stringify({ error: "Cleaning ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the cleaning first to check permissions
    const existingCleaning = await prisma.cleaning.findUnique({
      where: { id: cleaningId },
    });

    if (!existingCleaning) {
      return new Response(JSON.stringify({ error: "Cleaning not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Only customers can delete their own cleanings, and only if they're scheduled
    if (
      user.role !== "USER" ||
      existingCleaning.customerId !== user.id ||
      existingCleaning.status !== "SCHEDULED"
    ) {
      return new Response(
        JSON.stringify({ error: "Cannot delete this cleaning" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await prisma.cleaning.delete({
      where: { id: cleaningId },
    });

    return new Response(
      JSON.stringify({ message: "Cleaning deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Delete cleaning error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
