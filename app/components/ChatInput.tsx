import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ChatInput = ({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  error,
}: ChatInputProps) => {
  return (
    <form className="p-2 pb-4" onSubmit={onSubmit}>
      <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder="Type a message..."
          className={`w-[85%] h-12 rounded-full border ${
            error ? "border-red-500" : "border-zinc-800"
          } px-6 backdrop-blur-xl bg-black/80 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
          ) : (
            <ArrowUpIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};
