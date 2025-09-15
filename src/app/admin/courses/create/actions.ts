"use server";

import prisma from "@/lib/prisma";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";

export async function CreateCourse(values: CourseSchemaType) {
  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      throw new Error("Invalid Form Data");
    }

    const data = await prisma.course.create({
      data: {
        ...validation.data,
        userId: "asdadasd",
      },
    });

    return data;
  } catch (error) {}
}
