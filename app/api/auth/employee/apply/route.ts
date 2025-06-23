import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const employeeApplicationSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  experience: z.string().min(1, "Experience is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  availability: z.string().min(1, "Availability is required"),
});

export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = employeeApplicationSchema.parse(body);

    // Check if user is already an employee
    if (user.role === "EMPLOYEE") {
      return new Response(
        JSON.stringify({ error: "You are already an employee" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already has a pending application
    const existingApplication = await prisma.employeeApplication.findFirst({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    });

    if (existingApplication) {
      return new Response(
        JSON.stringify({ error: "You already have a pending application" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create employee application
    const application = await prisma.employeeApplication.create({
      data: {
        userId: user.id,
        phone: validatedData.phone,
        address: validatedData.address,
        experience: validatedData.experience,
        skills: validatedData.skills,
        availability: validatedData.availability,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        message: "Employee application submitted successfully",
        application,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Employee application error:", error);

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

// Get user's employee application
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const application = await prisma.employeeApplication.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify({ application }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get employee application error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
