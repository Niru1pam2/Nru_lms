"use client";

import Uploader from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderIcon, PlusIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { CreateCourse } from "./actions";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CourseCreationPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      category: "Development",
      description: "",
      duration: 1,
      fileKey: "",
      level: "Beginner",
      price: 1,
      slug: "",
      smallDescription: "",
      status: "Archived",
    },
  });

  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(CreateCourse(values));

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);

        form.reset();
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>

        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-end">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="w-fit"
                  onClick={() => {
                    const titleValue = form.getValues("title");
                    const slug = slugify(titleValue);
                    form.setValue("slug", slug, { shouldValidate: true });
                  }}
                >
                  <SparkleIcon className="size-4" />
                  Generate Slug
                </Button>
              </div>

              <FormField
                control={form.control}
                name="smallDescription"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Small Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Small Description..."
                        {...field}
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fileKey"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseLevels.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Price..."
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseStatus.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    Creating...
                    <LoaderIcon className="animate-spin" />
                  </>
                ) : (
                  <>
                    <PlusIcon className="size-4" />
                    Create Course
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
