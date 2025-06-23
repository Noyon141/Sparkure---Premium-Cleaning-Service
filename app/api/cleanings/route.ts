import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Get cleanings
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const whereClause: Record<string, unknown> = {
      ...(user.role === "USER" && { customerId: user.id }),
      ...(user.role === "EMPLOYEE" && { employeeId: user.id }),
      ...(status && { status }),
    };

    // Filter by user role
    // if (user.role === "USER") {
    //   whereClause.customerId = user.id;
    // } else if (user.role === "EMPLOYEE") {
    //   whereClause.employeeId = user.id;
    // }
    // Admins can see all cleanings

    // if (status) {
    //   whereClause.status = status;
    // }

    const cleanings = await prisma.cleaning.findMany({
      where: whereClause,
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
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.cleaning.count({
      where: whereClause,
    });

    return new Response(
      JSON.stringify({
        cleanings,
        totalCount,
        hasMore: offset + limit < totalCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get cleanings error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Create a new cleaning
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const {
      serviceType,
      date,
      address,
      note,
      price,
      duration,
      priority = "NORMAL",
    } = body;

    if (!serviceType || !date || !address) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Only customers can create cleanings
    if (user.role !== "USER") {
      return new Response(
        JSON.stringify({ error: "Only customers can create cleanings" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const cleaning = await prisma.cleaning.create({
      data: {
        customerId: user.id,
        serviceType,
        date: new Date(date),
        address,
        note,
        price: price ? parseFloat(price) : null,
        duration: duration ? parseInt(duration) : null,
        priority,
        status: "SCHEDULED",
      },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return new Response(JSON.stringify({ cleaning }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Create cleaning error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
