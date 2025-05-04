import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ROUTES } from "@/constants/routes";

import NavLinks from "./NavLinks";

export default function MobileNavigation() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Menu"
            width={36}
            height={36}
            className="invert-colors sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="background-light900_dark200 p-6">
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <Link href={ROUTES.HOME} className="flex items-center gap-1">
            <Image
              src="/images/site-logo.svg"
              alt="DevFlow Logo"
              width={23}
              height={23}
            />
            <span className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-brand">Flow</span>
            </span>
          </Link>

          <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16">
                <NavLinks isMobileNav={true} />
              </section>
            </SheetClose>
            <div className="flex flex-col gap-3 mt-4">
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN} className="">
                  <button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none cursor-pointer">
                    <span className="primary-text-gradient">Log In</span>
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP} className="">
                  <button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
