"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConfetti } from "@/hooks/use-confetti";
import { BookIcon, CheckCircle, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../actions";

interface CourseContentProps {
  data: LessonContentType;
}

export default function CourseContent({ data }: CourseContentProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug)
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center flex-col">
          <BookIcon className="size-16 text-primary mx-auto" />
          <p className="text-muted-foreground">
            This lesson does not have a video yet.
          </p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          src={videoKey}
          className="w-full h-full object-cover"
          controls
          poster={thumbnailKey}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background h-full pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            className="w-full bg-green-500/10 text-green-500 hover:text-green-500"
            variant={"outline"}
          >
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={pending} className="w-full">
            {pending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="size-4 mr-2 text-green-500" />
                <p>Mark as Complete</p>
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
