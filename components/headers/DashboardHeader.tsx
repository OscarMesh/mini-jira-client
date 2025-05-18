"use client";

import { DropdownUser } from "../dashboard/DropdownUser";

export const DashboardHeader = () => {
  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-[#7F9CF5]">
      <div className="flex flex-col justify-center text-center sm:text-left">
        <span className="font-bold text-2xl text-white drop-shadow-sm">
          mini <span className="text-white/80">jira</span>
        </span>
        <span className="text-xs text-white/70 mt-1">
          The everything app for work.
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <DropdownUser />
      </div>
    </header>
  );
};
