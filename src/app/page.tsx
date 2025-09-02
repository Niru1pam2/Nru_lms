"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfuly");
        },
      },
    });
  }

  return (
    <div className="p-24">
      <h1>
        {session ? (
          <div>
            <p>{session.user.name}</p> <Button onClick={signOut}>Logout</Button>
          </div>
        ) : (
          <Button>Login</Button>
        )}
      </h1>
      <ModeToggle />
    </div>
  );
}
