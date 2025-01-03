import React from "react";

interface NameDialogProps {
  onSubmit: (name: string) => void;
}

export const NameDialog = ({ onSubmit }: NameDialogProps) => {
  const [name, setName] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 w-[90%] max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">Welcome to</p>
          <h2 className="text-2xl font-serif font-bold text-white mb-2">
            VYŪHA
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <label htmlFor="name" className="block text-sm text-gray-400 mb-4">
              Please enter your name to continue
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 rounded-full px-6 bg-black/50 border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 text-center"
              placeholder="Your name"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
