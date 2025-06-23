import { AuthUser } from "@/types";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function getAuthUser(
  request: NextRequest
): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export function requireAuth(
  handler: (request: NextRequest, user: AuthUser) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(request, user);
  };
}

export function requireRole(role: "USER" | "EMPLOYEE" | "ADMIN") {
  return function (
    handler: (request: NextRequest, user: AuthUser) => Promise<Response>
  ) {
    return requireAuth(async (request, user) => {
      if (user.role !== role && user.role !== "ADMIN") {
        return new Response(
          JSON.stringify({ error: "Insufficient permissions" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return handler(request, user);
    });
  };
}
