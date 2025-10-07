"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, PlayIcon } from "lucide-react";
import LessonItem from "./LessonItem";
import { usePathname } from "next/navigation";
import { useCourseProgress } from "@/hooks/use-course-progress";

interface CourseSidebarProps {
  course: CourseSidebarDataType["course"];
}

export default function CourseSidebar({ course }: CourseSidebarProps) {
  const pathName = usePathname();
  const currentLessonId = pathName.split("/").pop();
  const { completedLessons, progressPercentage, totalLessons } =
    useCourseProgress({ courseData: course });

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <PlayIcon className="size-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base leading-tight truncate">
              {course.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>

          <Progress value={55} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {progressPercentage}% completed
          </p>
        </div>
      </div>

      <div className="py-4 pr-4 space-y-3">
        {course.chapters.map((chapter, idx) => (
          <Collapsible key={chapter.id} defaultOpen={idx === 0}>
            <CollapsibleTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full p-3 h-auto flex items-center gap-2"
              >
                <div className="shrink-0">
                  <ChevronDown className="size-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold truncate text-muted-foreground">
                    {chapter.position}: {chapter.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium truncate">
                    {chapter.lessons.length} lessons
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3 ml-3">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  lesson={lesson}
                  key={lesson.id}
                  slug={course.slug}
                  isActive={currentLessonId === lesson.id}
                  completed={
                    lesson.lessonProgress.find(
                      (progress) => progress.lessonId === lesson.id
                    )?.completed || false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
