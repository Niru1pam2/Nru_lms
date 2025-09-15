"use client";

import Link from "next/link";
import logo from "@/assets/icons8-education-100 (1).png";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropDown } from "./UserDropDown";

const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center space-x-2 mr-4">
          <Image src={logo} alt="logo" className="size-9" />
          <span className="font-bold">NruLMS</span>
        </Link>

        <nav className="items-center space-x-2 hidden md:flex md:items-center md:justify-between">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center justify-center gap-2">
          <ModeToggle />

          {isPending ? null : session ? (
            <UserDropDown
              email={session.user.email}
              image={
                session?.user.image ??
                `https://avatar.vercel.sh/${session?.user.email}`
              }
              name={
                session?.user.name && session.user.name.length > 0
                  ? session.user.name
                  : session?.user.email.split("@")[0]
              }
            />
          ) : (
            <>
              <Link
                href={"/login"}
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Login
              </Link>

              <Link href={"/login"} className={buttonVariants({})}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
