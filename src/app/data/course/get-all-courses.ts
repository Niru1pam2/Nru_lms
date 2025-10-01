import "server-only";

import prisma from "@/lib/prisma";

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      title: true,
      price: true,
      fileKey: true,
      slug: true,
      id: true,
      level: true,
      duration: true,
      category: true,
      smallDescription: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type GetAllCoursesType = Awaited<ReturnType<typeof getAllCourses>>[0];
