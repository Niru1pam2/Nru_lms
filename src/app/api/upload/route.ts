import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { put } from "@vercel/blob";
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

export async function POST(req: Request) {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id ?? "anonymous",
    });

    if (decision.isDenied()) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const { url } = await put(file.name, file, {
      access: "public",
      allowOverwrite: true,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
