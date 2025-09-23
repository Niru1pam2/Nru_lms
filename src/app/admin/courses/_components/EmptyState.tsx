import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function EmptyState({
  buttonText,
  description,
  title,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center p-4 border border-dashed animate-in fade-in-50 rounded-md flex-col space-y-4">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm tracking-tight">{description}</p>
      <Link href={href} className={buttonVariants({})}>
        <PlusCircle className="size-4 mr-2" />
        {buttonText}
      </Link>
    </div>
  );
}
