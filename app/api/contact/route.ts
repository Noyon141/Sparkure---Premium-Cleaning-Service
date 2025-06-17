import { requireAuth } from "@/lib/auth";
import { contactSchema } from "@/lib/validations/contact";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Save to database
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });

    // TODO: Send email notification here
    // Example: await sendContactNotification(contactSubmission);

    return new Response(
      JSON.stringify({
        message: "Contact form submitted successfully",
        data: contactSubmission,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

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
