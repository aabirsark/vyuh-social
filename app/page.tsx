"use client";
import { useState, useRef, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Welcome } from "./components/Welcome";
import { Message } from "./components/Message";
import { Suggestions } from "./components/Suggestions";
import { ChatInput } from "./components/ChatInput";
import { DottedBackground } from "./components/DottedBackground";
import { runLangflow } from "./services/langflowService";
import { NameDialog } from "./components/NameDialog";
import { Sidebar } from "./components/Sidebar";

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
        <>
          <Sidebar onClearChat={handleClearChat} />
          <div className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/50 border-b border-zinc-800/50 z-10 md:left-64">
            <div className="max-w-[1200px] mx-auto px-4 py-4 relative">
              <div className="flex items-center justify-center">
                <h1 className="text-lg font-semibold tracking-tight text-white/90 uppercase">
                  Social Media Intelligence
                </h1>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`flex-1 overflow-y-auto p-4 relative mx-auto w-full scroll-smooth no-scrollbar ${
          messages.length > 0 ? "md:pl-64" : ""
        } max-w-[1200px]`}
      >
        {messages.length === 0 ? (
          <Welcome />
        ) : (
          <div className="space-y-6 px-1 md:px-2 mt-16 pb-32">
            {messages.map((message, index) => (
              <Message
                key={index}
                {...message}
                userName={
                  message.role === "user" ? userName || undefined : undefined
                }
                isLastMessage={index === messages.length - 1}
              />
            ))}
            {error && (
              <div className="text-center text-red-400 text-sm mt-2">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t pt-32 pb-6 z-10 ${
          messages.length > 0 ? "md:left-64" : ""
        }`}
      >
        {messages.length === 0 && (
          <div className="max-w-[1200px] mx-auto px-4">
            <Suggestions onSuggestionClick={handleSuggestionClick} />
          </div>
        )}
        <div className="max-w-[1200px] mx-auto px-4">
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
