import React from "react";

interface SuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const Suggestions = ({ onSuggestionClick }: SuggestionsProps) => {
  const suggestions = [
    {
      text: "Analyze my social media performance of december",
      emoji: "📊",
    },
    {
      text: "Which topic should i post today ?",
      emoji: "🎯",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3 pb-4 w-full max-w-2xl">
        {suggestions.map(({ text, emoji }, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(text)}
            className="px-4 py-2.5 rounded-lg border border-zinc-800 bg-black/50 text-sm text-gray-400 hover:bg-zinc-900/30 transition-colors flex items-center gap-2 break-words max-w-full md:max-w-[calc(50%-0.75rem)]"
          >
            <span className="text-lg shrink-0">{emoji}</span>
            <span className="break-words">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
