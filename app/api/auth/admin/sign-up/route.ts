import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json();
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
        isEmailVerified: true,
        isActive: true,
      },
    });
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );
    const userResponse = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
    const response = NextResponse.json(
      { message: "Sign up successful", user: userResponse, token },
      { status: 201 }
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
