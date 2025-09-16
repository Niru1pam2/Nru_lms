import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShieldXIcon } from "lucide-react";
import Link from "next/link";

export default function NotAdminRoute() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full ">
        <Card className="w-full">
          <CardHeader className="text-center space-y-1">
            <div className="bg-destructive/50 rounded-full p-4 mx-auto">
              <ShieldXIcon className="size-16 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Restricted</CardTitle>
            <CardDescription className="text-muted-foreground">
              You are not an admin! You cannot create any courses...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center w-full">
            <Link href={"/"} className={cn(buttonVariants(), "w-full")}>
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
