import { requireRole } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Invite a new admin
export const POST = requireRole("ADMIN")(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { email, fullName } = body;

    if (!email || !fullName) {
      return new Response(
        JSON.stringify({ error: "Email and full name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if invitation already exists and is not expired
    const existingInvitation = await prisma.adminInvitation.findFirst({
      where: {
        email,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingInvitation) {
      return new Response(
        JSON.stringify({ error: "Invitation already sent to this email" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate invitation token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create invitation
    const invitation = await prisma.adminInvitation.create({
      data: {
        email,
        fullName,
        token,
        expiresAt,
        invitedById: user.id,
      },
    });

    // TODO: Send email with invitation link
    // For now, we'll return the token (in production, this should be sent via email)
    const invitationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/sign-up?token=${token}`;

    return new Response(
      JSON.stringify({
        message: "Admin invitation sent successfully",
        invitation: {
          id: invitation.id,
          email: invitation.email,
          fullName: invitation.fullName,
          expiresAt: invitation.expiresAt,
          invitationUrl, // Remove this in production
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Admin invitation error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Get pending invitations
export const GET = requireRole("ADMIN")(async () => {
  try {
    const invitations = await prisma.adminInvitation.findMany({
      where: {
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        invitedBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify({ invitations }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get invitations error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
