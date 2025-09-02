import { Button } from "@/components/ui/button";
import { ArrowLeft, BookAIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import logo from "@/assets/icons8-education-100 (1).png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
      <Button asChild variant={"link"} className="absolute top-4 left-4">
        <Link href={"/"}>
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </Button>
      <div className="w-full max-w-sm flex flex-col space-y-4">
        <Link
          href={"/"}
          className="flex self-center items-center gap-2 font-medium"
        >
          <Image src={logo} alt="logo" width={32} height={32} />
          NruLMS
        </Link>
        {children}

        <div className="text-center text-balance text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="text-primary hover:underline">Terms of service</span>{" "}
          and{" "}
          <span className="text-primary hover:underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
