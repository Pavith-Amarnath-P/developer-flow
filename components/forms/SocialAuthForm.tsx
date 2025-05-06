"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";

import { Button } from "../ui/button";

export default function SocialAuthForm() {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5 flex items-center gap-2 cursor-pointer";
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: true,
      });
      toast.success("Sign in successful!", {
        description: "You are now logged in.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed. Please try again.", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign in.",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="github"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          width={20}
          height={20}
          alt="google"
          className="invert-0 mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
}
