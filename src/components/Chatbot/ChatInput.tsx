import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import type { ChatOption } from "./chatbotFlow";

interface ChatInputProps {
  options?: ChatOption[];
  onSelectOption: (option: ChatOption) => void;
  onSendMessage: (text: string) => void;
}

const ChatInput = ({ options, onSelectOption, onSendMessage }: ChatInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      {/* Quick-reply pills */}
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2 pt-3">
          {options.map((option, index) => (
            <motion.button
              key={option.label}
              onClick={() => onSelectOption(option)}
              className="px-3 py-2 text-xs font-medium rounded-full border border-border
                text-navy bg-white hover:bg-secondary hover:border-navy/20
                transition-colors cursor-pointer whitespace-normal text-left"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Text input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-4 pt-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-full border border-border
            bg-white text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30
            transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          className="flex items-center justify-center w-9 h-9 rounded-full
            bg-green text-white shrink-0
            hover:bg-green-hover transition-colors cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
