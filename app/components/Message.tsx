import React, { useEffect, useRef } from "react";
import { AIAvatar } from "./AIAvatar";
import { UserAvatar } from "./UserAvatar";
import { MarkdownContent } from "./MarkdownContent";

interface MessageProps {
  content: string;
  role: "user" | "assistant";
  userName?: string;
  isLastMessage?: boolean;
}

export function Message({
  content,
  role,
  userName,
  isLastMessage,
}: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLastMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLastMessage]);

  return (
    <div
      ref={messageRef}
      className={`flex items-center gap-2 animate-slideUp ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {role === "assistant" && <AIAvatar />}
      <div
        className={`max-w-[80%] min-h-[3rem] rounded-[20px] p-3 text-sm leading-relaxed transition-all duration-200 ease-in-out ${
          role === "user"
            ? "bg-white text-black"
            : "bg-[#0a0a0a] text-gray-100 border border-zinc-900"
        }`}
      >
        <MarkdownContent content={content} />
      </div>
      {role === "user" && <UserAvatar userName={userName} />}
    </div>
  );
}
