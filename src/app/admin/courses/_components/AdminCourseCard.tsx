import { AdminCoursesType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  EyeIcon,
  MoreVertical,
  PencilIcon,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminCourseCardProps {
  data: AdminCoursesType;
}

export default function AdminCourseCard({ data }: AdminCourseCardProps) {
  return (
    <Card className="group py-0 gap-0 relative">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"secondary"}>
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <PencilIcon className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.slug}`}>
                <EyeIcon className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash2 className="size-4 mr-2 text-destructive" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src={data.fileKey}
        alt="Thumbnail image"
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video h-full object-cover"
      />
      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.duration}h</p>
          </div>

          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/courses/${data.id}/edit`}
          className={cn(buttonVariants(), "w-full mt-4")}
        >
          Edit Course <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className="group py-0 gap-0 relative">
      {/* Top image placeholder */}
      <Skeleton className="w-full aspect-video rounded-t-lg bg-gray-500" />

      <CardContent className="p-4 space-y-3">
        {/* Title placeholder */}
        <Skeleton className="h-5 w-3/4 rounded-md bg-gray-500" />

        {/* Small description placeholder */}
        <Skeleton className="h-4 w-full rounded-md bg-gray-500" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-gray-500" />

        {/* Metadata placeholders */}
        <div className="flex items-center gap-x-5 mt-4">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md bg-gray-500" />
            <Skeleton className="h-4 w-6 rounded-md bg-gray-500" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md bg-gray-500" />
            <Skeleton className="h-4 w-10 rounded-md bg-gray-500" />
          </div>
        </div>

        {/* Button placeholder */}
        <Skeleton className="h-10 w-full rounded-md mt-4 bg-gray-500" />
      </CardContent>
    </Card>
  );
}
