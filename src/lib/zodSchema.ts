import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "It & Software",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must not exceed 100 characters" }),

  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long" })
    .max(2500, { error: "Description must not exceed 2500 characters" }),

  fileKey: z.string().min(1, { error: "File key is required" }),

  price: z
    .number()
    .min(1, { error: "Price must be at least 1" })
    .max(10000, { error: "Price cannot be more than 10,000 rupees" }),

  duration: z
    .number()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must not exceed 500 hours" }),

  level: z.enum(courseLevels, {
    error: "Level must be one of the predefined course levels",
  }),

  category: z.enum(courseCategories, {
    error: "Category is required",
  }),

  smallDescription: z
    .string()
    .min(3, { error: "Short description must be at least 3 characters long" })
    .max(200, { error: "Short description must not exceed 200 characters" }),

  slug: z.string().min(3, { error: "Slug must be at least 3 characters long" }),

  status: z.enum(courseStatus, {
    error: "Status must be one of the predefined course statuses",
  }),
});

export const chapterSchema = z.object({
  name: z.string().min(3, { error: "Name must be atleast 3 characters long" }),
  courseId: z.uuid({ error: "Invalid course Id" }),
});

export const lessonSchema = z.object({
  name: z.string().min(3, { error: "Name must be atleast 3 characters long" }),
  courseId: z.uuid({ error: "Invalid course Id" }),
  chapterId: z.uuid({ error: "Invalid chapter Id" }),
  description: z
    .string()
    .min(3, { error: "Description must be atleast 3 characters long" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
