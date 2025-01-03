import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { TypewriterText } from "./TypewriterText";

interface MessageProps {
  content: string;
  role: "user" | "assistant";
  isNew?: boolean;
  userName?: string;
}

export const Message = ({
  content,
  role,
  isNew = false,
  userName,
}: MessageProps) => {
  const formatText = (text: string) => {
    // Split the text into parts based on all markdown patterns
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`|\n)/g);

    return parts.map((part, index) => {
      // Bold (**text**)
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic (*text* or _text_)
      if (
        (part.startsWith("*") && part.endsWith("*")) ||
        (part.startsWith("_") && part.endsWith("_"))
      ) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Code (`text`)
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="bg-black/30 rounded px-1.5 py-0.5 font-mono text-sm"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      // New line
      if (part === "\n") {
        return <br key={index} />;
      }
      // Regular text
      return part;
    });
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {role === "assistant" && (
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
      )}
      <div
        className={`max-w-[80%] rounded-[20px] p-3 text-sm ${
          role === "user"
            ? "bg-white text-black"
            : "bg-[#0a0a0a] text-gray-100 border border-zinc-900"
        }`}
      >
        {isNew ? <TypewriterText text={content} /> : formatText(content)}
      </div>
      {role === "user" && (
        <div className="flex flex-col items-center justify-center w-8 -mb-4">
          <div className="w-8 flex justify-center">
            <UserCircleIcon className="text-gray-400 w-6 h-6" />
          </div>
          <span className="text-[10px] text-gray-500 mt-1 text-center truncate w-16">
            {userName || "User"}
          </span>
        </div>
      )}
    </div>
  );
};
