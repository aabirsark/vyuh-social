"use client";
import { useState, useRef, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Welcome } from "./components/Welcome";
import { Message } from "./components/Message";
import { Suggestions } from "./components/Suggestions";
import { ChatInput } from "./components/ChatInput";
import { DottedBackground } from "./components/DottedBackground";
import { runLangflow } from "./services/langflowService";
import { TrashIcon } from "@heroicons/react/24/outline";
import { NameDialog } from "./components/NameDialog";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<(Message & { isNew?: boolean })[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      setMessages((prev) => [...prev, { role: "user", content: input }]);

      const aiResponse = await runLangflow(input);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse, isNew: true },
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, isNew: false } : msg
          )
        );
      }, aiResponse.length * 20 + 100);

      setInput("");
    } catch (error) {
      console.error("Error getting response:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting to the server. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
    setUserName(null);
    localStorage.removeItem("userName");
  };

  return (
    <div
      className={`flex flex-col h-screen bg-black text-gray-100 ${poppins.className} relative`}
    >
      {!userName && <NameDialog onSubmit={handleNameSubmit} />}

      <DottedBackground />

      {messages.length > 0 && (
        <div className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/50 border-b border-zinc-800/50 z-10">
          <div className="max-w-[1000px] mx-auto px-4 py-4 relative">
            <div className="flex items-center justify-between">
              <div className="w-24" />
              <h1 className="text-xl font-serif tracking-wide text-white">
                VYŪHA
              </h1>
              <button
                onClick={handleClearChat}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-800/50 transition-colors"
                title="Clear chat"
              >
                <span className="text-sm text-gray-400">Clear chat</span>
                <TrashIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 pb-32 relative max-w-[1000px] mx-auto w-full scroll-smooth no-scrollbar">
        {messages.length === 0 ? (
          <Welcome />
        ) : (
          <div className="space-y-6 px-4 md:px-8 mt-16">
            {messages.map((message, index) => (
              <Message
                key={index}
                {...message}
                isNew={message.isNew}
                userName={
                  message.role === "user" ? userName || undefined : undefined
                }
              />
            ))}
            {error && (
              <div className="text-center text-red-400 text-sm mt-2">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-2 z-10">
        {messages.length === 0 && (
          <div className="max-w-[1000px] mx-auto px-4">
            <Suggestions onSuggestionClick={handleSuggestionClick} />
          </div>
        )}
        <div className="max-w-[1000px] mx-auto px-4 pb-6">
          <ChatInput
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
