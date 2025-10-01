import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardContent className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-center p-4">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>
          <div className="flex items-center flex-col space-y-4">
            <h2 className="text-center font-semibold text-xl">
              Payment Cancelled
            </h2>
            <p className="text-muted-foreground text-balance text-center">
              No worries, you won&apos;t be charged. Please try again.
            </p>

            <Link className={buttonVariants({})} href={"/"}>
              <HomeIcon className="size-4" />
              To Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
