/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ No signature found");
    return new Response("No signature found", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`🔥 Stripe webhook received: ${event.type}`);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const courseId = session.metadata?.courseId;
      const enrollmentId = session.metadata?.enrollmentId;
      const customerId = session.customer as string;

      console.log("📝 Session metadata:", {
        courseId,
        enrollmentId,
        customerId,
      });

      if (!courseId) {
        console.error("❌ Course ID not found in metadata");
        return new Response("Course ID not found", { status: 400 });
      }

      if (!customerId) {
        console.error("❌ Customer ID not found");
        return new Response("Customer ID not found", { status: 400 });
      }

      // Find user by Stripe customer ID
      const user = await prisma.user.findUnique({
        where: { stripeCustomerId: customerId },
      });

      if (!user) {
        console.error("❌ User not found for customer:", customerId);
        return new Response("User not found", { status: 400 });
      }

      console.log("✅ User found:", user.id);

      // If enrollmentId exists, update it. Otherwise, create new enrollment
      if (enrollmentId) {
        // Update existing enrollment
        const enrollment = await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: {
            userId: user.id,
            courseId,
            amount: session.amount_total || 0,
            status: "Active",
          },
        });
        console.log("✅ Enrollment updated:", enrollment.id);
      } else {
        // Create new enrollment
        const enrollment = await prisma.enrollment.create({
          data: {
            userId: user.id,
            courseId,
            amount: session.amount_total || 0,
            status: "Active",
          },
        });
        console.log("✅ Enrollment created:", enrollment.id);
      }

      console.log("🎉 Payment successful for user:", user.id);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("❌ Database error:", err.message);
    // Still return 200 to acknowledge receipt, but log the error
    return new Response(
      JSON.stringify({
        received: true,
        error: err.message,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
