"use client";
import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { RenderEmptyState, RenderErrorState } from "./RenderState";

interface Uploader {
  value: string;
  onChange: (value: string) => void;
}

export default function Uploader({ value, onChange }: Uploader) {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const { url } = await res.json();
        if (!url) {
          setError(true);
          return;
        }

        setPreview(url);
        setMimeType(file.type); // store file type (image/* or video/*)
        onChange(url);
      } catch {
        toast.error("Upload failed");
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [onChange]
  );

  const handleDelete = async () => {
    if (!value) return;
    setDeleting(true);

    try {
      await fetch(`/api/delete?url=${encodeURIComponent(value)}`, {
        method: "DELETE",
      });

      setPreview(null);
      setMimeType(null);
      onChange("");
      toast.success("File deleted");
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //5mb file size, vercel blob allows only 5mb
    onDropRejected: (rej) => {
      if (rej.find((r) => r.errors[0].code === "too-many-files")) {
        toast.error("Too many files selected, max is 1");
      }
      if (rej.find((r) => r.errors[0].code === "file-too-large")) {
        toast.error("File size exceeds max allowed");
      }
    },
  });

  useEffect(() => {
    if (value) {
      setPreview(value);
      const ext = value.split(".").pop()?.toLowerCase();
      if (["mp4", "mov", "webm"].includes(ext ?? "")) {
        setMimeType("video/mp4");
      } else {
        setMimeType("image/*");
      }
    } else {
      setPreview(null);
      setMimeType(null);
    }
  }, [value]);

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 w-full h-64 overflow-hidden rounded-lg flex items-center justify-center border-dashed",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <input {...getInputProps()} />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="animate-spin w-10 h-10 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
      ) : preview ? (
        <div className="w-full h-full relative">
          {mimeType?.startsWith("video/") ? (
            <video
              src={preview}
              controls
              className="w-full h-full object-contain object-center"
            />
          ) : (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain object-center"
            />
          )}

          <Button
            type="button"
            size="icon"
            variant="default"
            className="absolute top-2 right-2 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
        </div>
      ) : error ? (
        <RenderErrorState />
      ) : (
        <CardContent className="flex flex-col items-center p-4 justify-center h-full text-base font-bold">
          <RenderEmptyState isDragActive={isDragActive} />
          {isDragActive ? (
            <p>
              <span className="text-primary">Drop</span> the files here ...
            </p>
          ) : (
            <p>
              Drag and <span className="text-primary">drop</span> files here, or
              click to select
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
