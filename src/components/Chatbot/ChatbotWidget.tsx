import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Scale } from "lucide-react";
import { useChatbot } from "@/contexts/ChatbotContext";
import { chatbotFlow, matchFreeText, type ChatOption } from "./chatbotFlow";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: (typeof chatbotFlow)[string]["action"];
}

const ChatbotWidget = () => {
  const { isOpen, toggleChatbot, hasNewMessage } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState("welcome");
  const [hasInitialized, setHasInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);

  const nextId = () => {
    msgCounter.current += 1;
    return `msg-${msgCounter.current}`;
  };

  // Seed welcome message the first time the chat opens
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      const node = chatbotFlow.welcome;
      setMessages([{ id: nextId(), sender: "bot", text: node.message, action: node.action }]);
      setHasInitialized(true);
    }
  }, [isOpen, hasInitialized]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const addBotReply = useCallback((nodeId: string) => {
    const node = chatbotFlow[nodeId];
    if (!node) return;
    setCurrentNodeId(nodeId);

    setTimeout(() => {
      const botMsg: Message = {
        id: nextId(),
        sender: "bot",
        text: node.message,
        action: node.action,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  }, []);

  const handleSelectOption = useCallback(
    (option: ChatOption) => {
      setMessages((prev) => [...prev, { id: nextId(), sender: "user", text: option.label }]);
      addBotReply(option.nextNodeId);
    },
    [addBotReply],
  );

  const handleFreeText = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { id: nextId(), sender: "user", text }]);
      const matchedNodeId = matchFreeText(text);
      addBotReply(matchedNodeId);
    },
    [addBotReply],
  );

  const currentNode = chatbotFlow[currentNodeId];

  return (
    <>
      {/* ── Floating button ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-fab"
            onClick={toggleChatbot}
            aria-label="Open chat"
            className="fixed bottom-5 right-5 z-[9999] flex items-center justify-center
              w-14 h-14 rounded-full bg-green text-white shadow-lg
              hover:scale-105 hover:shadow-xl transition-shadow cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <MessageCircle className="w-6 h-6" />


            {/* New-message badge */}
            {hasNewMessage && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            className="fixed z-[9999] flex flex-col bg-white overflow-hidden
              shadow-[0_8px_32px_rgba(0,0,0,0.15)]
              bottom-0 right-0 w-full h-[85vh] rounded-t-2xl
              md:bottom-5 md:right-5 md:w-[380px] md:h-[520px] md:rounded-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-navy text-white shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm font-semibold leading-tight truncate">
                  Borshchak Law Group
                </p>
                <p className="text-[11px] text-white/70 leading-tight">Family Law Assistant</p>
              </div>
              <button
                onClick={toggleChatbot}
                aria-label="Close chat"
                className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  action={msg.action}
                  isLatest={i === messages.length - 1}
                />
              ))}
            </div>

            {/* Quick-reply buttons */}
            <div className="shrink-0 border-t border-border bg-white">
              <ChatInput
                options={currentNode?.options}
                onSelectOption={handleSelectOption}
                onSendMessage={handleFreeText}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
