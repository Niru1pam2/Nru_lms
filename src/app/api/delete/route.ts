import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "No url" }, { status: 400 });

  await del(url);

  return NextResponse.json({ success: true });
}
