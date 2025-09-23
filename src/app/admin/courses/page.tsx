"use server";

import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./_components/AdminCourseCard";
import EmptyState from "./_components/EmptyState";

export default async function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants({})}>
          Create Course
        </Link>
      </div>

      <div>
        <h1 className="text-muted-foreground">
          Here you will see all of the courses
        </h1>
      </div>

      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  );
}

async function RenderCourses() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No courses available"
          description="Create a new course to get started."
          buttonText="Create course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          <Suspense fallback={<Loader2Icon />}>
            {data.map((course, idx) => (
              <AdminCourseCard data={course} key={idx} />
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, idx) => (
        <AdminCourseCardSkeleton key={idx} />
      ))}
    </div>
  );
}
