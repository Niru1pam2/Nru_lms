import "server-only";
import { requireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      slug: true,
      smallDescription: true,
      title: true,
      category: true,
      status: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>;
