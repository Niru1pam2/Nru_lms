/* eslint-disable react/no-unescaped-entities */
"use client";
import { useCallback, useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState } from "./RenderState";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface Uploader {
  value: string;
  onChange: (value: string) => void;
}

function rejectedFiles(fileRejection: FileRejection[]) {
  if (fileRejection.length) {
    if (fileRejection.find((r) => r.errors[0].code === "too-many-files")) {
      toast.error("Too many files selected, max is 1");
    }
    if (fileRejection.find((r) => r.errors[0].code === "file-too-large")) {
      toast.error("File size exceeds max allowed");
    }
  }
}

export default function Uploader({ value, onChange }: Uploader) {
  const [preview, setPreview] = useState<string | null>(value ?? null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      //vercel blob storage
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { url } = await res.json();
      console.log(url);

      onChange(url);
    },
    [onChange]
  );

  const handleDelete = async () => {
    if (!value) return;

    await fetch(`/api/delete?url=${encodeURIComponent(value)}`, {
      method: "DELETE",
    });

    setPreview(null);
    onChange("");
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 w-full h-64 overflow-hidden rounded-lg",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="w-full h-full">
          <Image
            src={preview}
            alt="Thumbnail Preview"
            fill
            className="object-contain object-center"
          />
          <Button
            type="button"
            size="icon"
            variant="default"
            className="absolute top-2 right-2  shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ) : (
        <CardContent className="flex flex-col items-center p-4 justify-center h-full text-base font-bold">
          <RenderEmptyState isDragActive={isDragActive} />
          {isDragActive ? (
            <p>
              <span className="text-primary">Drop</span> the files here ...
            </p>
          ) : (
            <p>
              Drag 'n' <span className="text-primary">drop</span> some files
              here, or click to select files
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
