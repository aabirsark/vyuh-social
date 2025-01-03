import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface UserAvatarProps {
  userName?: string;
}

export function UserAvatar({ userName }: UserAvatarProps) {
  return (
    <div className="flex flex-col items-center justify-center w-8 -mb-4">
      <div className="w-8 flex justify-center">
        <UserCircleIcon className="text-gray-400 w-6 h-6" />
      </div>
      <span className="text-[10px] text-gray-500 mt-1 text-center truncate w-16">
        {userName || "User"}
      </span>
    </div>
  );
}
