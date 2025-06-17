import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    // Get user data from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);

    if (error instanceof Error && error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (error instanceof Error && error.name === "TokenExpiredError") {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
