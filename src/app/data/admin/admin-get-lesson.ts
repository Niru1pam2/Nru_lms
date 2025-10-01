import "server-only";

import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetLesson(id: string) {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      videoKey: true,
      description: true,
      thumbnailKey: true,
      position: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminGetLessonType = Awaited<ReturnType<typeof adminGetLesson>>;
