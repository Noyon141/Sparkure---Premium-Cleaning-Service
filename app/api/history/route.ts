import { requireAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Get user's cleaning history (completed services)
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const serviceType = searchParams.get("serviceType");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Build where clause for completed cleanings by the user
    const whereClause: Record<string, unknown> = {
      customerId: user.id,
      status: "COMPLETED",
    };

    // Add service type filter if provided
    if (serviceType) {
      whereClause.serviceType = serviceType;
    }

    // Add date range filters if provided
    if (dateFrom || dateTo) {
      whereClause.date = {} as { gte?: Date; lte?: Date };
      if (dateFrom) {
        (whereClause.date as { gte?: Date }).gte = new Date(dateFrom);
      }
      if (dateTo) {
        (whereClause.date as { lte?: Date }).lte = new Date(dateTo);
      }
    }

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
            createdAt: true,
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

    // Calculate summary statistics
    const totalSpent = await prisma.cleaning.aggregate({
      where: whereClause,
      _sum: {
        price: true,
      },
    });

    const serviceTypeCounts = await prisma.cleaning.groupBy({
      by: ["serviceType"],
      where: whereClause,
      _count: {
        serviceType: true,
      },
    });

    return new Response(
      JSON.stringify({
        cleanings,
        totalCount,
        hasMore: offset + limit < totalCount,
        summary: {
          totalSpent: totalSpent._sum.price || 0,
          serviceTypeCounts: serviceTypeCounts.map((item) => ({
            serviceType: item.serviceType,
            count: item._count.serviceType,
          })),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get history error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
