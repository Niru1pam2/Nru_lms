import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Attempting to send ${type} OTP to ${email}: ${otp}`);

        try {
          const { data, error } = await resend.emails.send({
            from: "NruLMS <onboarding@resend.dev>", // Make sure this domain is verified in Resend
            to: [email],
            subject: "NruLMS - Verify your email",
            html: `
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="color: #333;">Verify Your Email</h2>
                <p>Your verification code is:</p>
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                  ${otp}
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
              </div>
            `,
          });

          if (error) {
            console.error("Resend email error:", error);
            throw new Error(`Failed to send email: ${error.message}`);
          }

          console.log("Email sent successfully:", data);
          // Don't return anything - function should return Promise<void>
        } catch (error) {
          console.error("Error sending OTP email:", error);
          throw error; // This will cause Better Auth to handle the error appropriately
        }
      },
      // Optional: customize OTP settings
      otpLength: 6,
      expiresIn: 600, // 10 minutes in seconds
    }),
    admin(),
  ],
});
