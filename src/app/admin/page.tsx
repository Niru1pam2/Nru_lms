import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";
import EmptyState from "./courses/_components/EmptyState";

export default async function AdminIndexPage() {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />

      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">Recent Courses</h2>
          <Link
            href={"/admin/courses"}
            className={buttonVariants({ variant: "outline" })}
          >
            View All Courses
          </Link>
        </div>
        <Suspense fallback={<RenderRecentCoursesLayoutSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create new Course"
        description="You dont have any courses. Create some to see them here."
        title="You dont have courses yet"
        href="/admin/course/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

function RenderRecentCoursesLayoutSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, idx) => (
        <AdminCourseCardSkeleton key={idx} />
      ))}
    </div>
  );
}
