"use client";
import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
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
        onChange(url);
      } catch (err) {
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
      onChange("");
      toast.success("File deleted");
    } catch (err) {
      toast.error("Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (rej) => {
      if (rej.find((r) => r.errors[0].code === "too-many-files")) {
        toast.error("Too many files selected, max is 1");
      }
      if (rej.find((r) => r.errors[0].code === "file-too-large")) {
        toast.error("File size exceeds max allowed");
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 w-full h-64 overflow-hidden rounded-lg flex items-center justify-center",
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
              Drag 'n' <span className="text-primary">drop</span> some files
              here, or click to select files
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
