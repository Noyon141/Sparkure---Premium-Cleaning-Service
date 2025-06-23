import { requireRole } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const reviewApplicationSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  status: z.enum(["APPROVED", "REJECTED"]),
  notes: z.string().optional(),
});

export const POST = requireRole("ADMIN")(async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = reviewApplicationSchema.parse(body);

    // Find the application
    const application = await prisma.employeeApplication.findUnique({
      where: { id: validatedData.applicationId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!application) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (application.status !== "PENDING") {
      return new Response(
        JSON.stringify({ error: "Application has already been reviewed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update application status
    const updatedApplication = await prisma.employeeApplication.update({
      where: { id: validatedData.applicationId },
      data: {
        status: validatedData.status,
        reviewedBy: user.id,
        reviewedAt: new Date(),
        notes: validatedData.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // If approved, update user role to EMPLOYEE
    if (validatedData.status === "APPROVED") {
      await prisma.user.update({
        where: { id: application.userId },
        data: {
          role: "EMPLOYEE",
          phone: application.phone,
          address: application.address,
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: `Application ${validatedData.status.toLowerCase()} successfully`,
        application: updatedApplication,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Review application error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Get all employee applications
export const GET = requireRole("ADMIN")(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const whereClause: Record<string, unknown> = {};
    if (status) {
      whereClause.status = status;
    }

    const applications = await prisma.employeeApplication.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.employeeApplication.count({
      where: whereClause,
    });

    return new Response(
      JSON.stringify({
        applications,
        totalCount,
        hasMore: offset + limit < totalCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get applications error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
