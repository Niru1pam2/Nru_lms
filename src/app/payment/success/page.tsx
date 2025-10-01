/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSucessPage() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardContent className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-center p-4">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="flex items-center flex-col space-y-4">
            <h2 className="text-center font-semibold text-xl">
              Payment Successfull
            </h2>
            <p className="text-muted-foreground text-balance text-center">
              Congrats your payment was successfull. You should now have access
              to the course!
            </p>

            <Link
              className={buttonVariants({ className: " w-full" })}
              href={"/dashboard"}
            >
              <ArrowLeft className="size-4" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
