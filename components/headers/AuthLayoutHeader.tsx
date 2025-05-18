"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthLayoutHeader = () => {
  const pathname = usePathname();

  const isLogin = pathname === "/auth/login";

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-20">
      <div>
        <span className="font-bold text-2xl text-[#22223b]">
          mini <span className="text-[#0052CC]">jira</span>
        </span>
        <div className="text-xs text-[#6c757d]">
          The everything app for work.
        </div>
      </div>
      <div className="flex flex-col md:flex-row  md:items-center gap-2">
        <span className="text-sm text-[#22223b]">
          {isLogin
            ? "Don't have an account?"
            : "Already playing with Min-JIRA?"}
        </span>

        <Button
          variant="outline"
          className="bg-[#7F9CF5] hover:bg-[#5a7be7] text-white hover:text-white"
          asChild
        >
          <Link href={isLogin ? "/auth/signup" : "/auth/login"}>
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </Button>
      </div>
    </header>
  );
};
