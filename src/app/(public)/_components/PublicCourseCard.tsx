import { GetAllCoursesType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SchoolIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PublicCourseCardProps {
  data: GetAllCoursesType;
}

export default function PublicCourseCard({ data }: PublicCourseCardProps) {
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>
      <Image
        src={data.fileKey}
        alt={data.title}
        width={600}
        height={400}
        className="w-full rounded-t-xl object-cover h-full aspect-video"
      />
      <CardContent className="p-4">
        <Link
          href={`/courses/${data.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {data.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SchoolIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {data.category}
            </span>
          </div>
        </div>
        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="w-full aspect-video rounded-t-xl" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-md mt-4" />
      </CardContent>
    </Card>
  );
}
