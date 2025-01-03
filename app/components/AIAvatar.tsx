import React from "react";

export function AIAvatar() {
  return (
    <div className="flex flex-col items-center justify-center w-8 -mb-4">
      <div className="flex items-center justify-center w-full">
        <div className="w-5 h-5 rotate-45 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <div className="text-blue-400 text-xs -rotate-45 flex items-center justify-center">
            💎
          </div>
        </div>
      </div>
      <span className="text-[10px] text-gray-500 mt-1 text-center">AI</span>
    </div>
  );
}
