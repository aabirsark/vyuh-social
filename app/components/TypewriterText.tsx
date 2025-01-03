import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

export const TypewriterText = ({ text, delay = 20 }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`|\n)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
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
      if (part === "\n") {
        return <br key={index} />;
      }
      return part;
    });
  };

  return <span>{formatText(displayedText)}</span>;
};
