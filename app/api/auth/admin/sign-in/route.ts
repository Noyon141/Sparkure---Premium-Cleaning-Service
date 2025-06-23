import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Invalid credentials or not an admin" },
        { status: 401 }
      );
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET! || "your-secret-key",
      { expiresIn: "1d" }
    );
    const userResponse = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
    const response = NextResponse.json(
      { message: "Sign in successful", user: userResponse, token },
      { status: 200 }
    );
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
