import Image from "next/image";
import { Squares2X2Icon, TrashIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  onClearChat: () => void;
}

export const Sidebar = ({ onClearChat }: SidebarProps) => {
  const datasetUrl =
    "https://drive.google.com/file/d/1_2CJiHjcy3BGRYNjvn7tV-f5t5EpNhnT/view?usp=share_link";

  const handleDatasetClick = () => {
    window.open(datasetUrl, "_blank", "noopener,noreferrer");
  };

  const handleClearChat = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the chat history? This action cannot be undone."
      )
    ) {
      onClearChat();
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-black/50 backdrop-blur-md border-r border-zinc-800/50 p-6 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="space-y-4 flex-1">
          <div className="flex flex-col items-center">
            <Image
              src="/image/vyuh.png"
              alt="VYŪHA Logo"
              width={80}
              height={80}
              className="mb-2"
            />
            <h2 className="text-2xl font-serif font-bold text-white">VYŪHA</h2>
            <p className="text-xs text-gray-400 mt-1">
              A social media analytics agent !
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Evaluate your social media performance and obtain actionable
              insights to enhance your content strategy.
            </p>

            <button
              onClick={handleDatasetClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors border border-zinc-800/50  group"
            >
              <div className="flex items-center gap-3 w-full">
                <Squares2X2Icon className="w-5 h-5 text-gray-400 " />
                <span className="text-sm text-gray-300 font-medium">
                  Explore Dataset
                </span>
              </div>
            </button>

            <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
              <span className="font-medium text-gray-400">Note:</span> The
              dataset provided is for demonstration purposes only. It contains
              simulated data designed to showcase the application&apos;s
              functionality and does not represent actual social media
              analytics.
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300 mt-auto"
        >
          <TrashIcon className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
          <span className="text-sm text-gray-400 group-hover:text-red-500">
            Clear Chat
          </span>
        </button>
      </div>
    </div>
  );
};
