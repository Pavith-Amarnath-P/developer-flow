import Image from "next/image";
import Link from "next/link";

import { logOut } from "@/actions/authentication";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

import MobileNavigation from "./MobileNavigation";
import ModeToggle from "./ModeToggle";

export default async function NavBar() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 dark:shadow-none sm:px-12 gap-5">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          alt="DevFlow Logo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-brand">Flow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <ModeToggle />
        {session && (
          <div className="flex items-center gap-5">
            <Image
              src={session.user?.image || ""}
              alt="Profile"
              width={24}
              height={24}
              className="rounded-full cursor-pointer"
            />
            <form action={logOut}>
              <Button type="submit" className="cursor-pointer">
                Logout
              </Button>
            </form>
          </div>
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
}
