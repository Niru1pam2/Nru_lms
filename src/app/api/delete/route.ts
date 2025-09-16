import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  try {
    // Apply Arcjet protection
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Rate limited or denied" },
        { status: 429 }
      );
    }

    // Extract file URL
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "No url provided" }, { status: 400 });
    }

    // Delete from Vercel Blob
    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("File deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
