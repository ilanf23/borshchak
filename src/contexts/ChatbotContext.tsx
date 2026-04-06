import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  hasNewMessage: boolean;
  clearNewMessage: () => void;
}

const defaultContext: ChatbotContextType = {
  isOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
  toggleChatbot: () => {},
  hasNewMessage: true,
  clearNewMessage: () => {},
};

const ChatbotContext = createContext<ChatbotContextType>(defaultContext);

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  const openChatbot = useCallback(() => {
    setIsOpen(true);
    setHasNewMessage(false);
  }, []);

  const closeChatbot = useCallback(() => setIsOpen(false), []);

  const toggleChatbot = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasNewMessage(false);
      return !prev;
    });
  }, []);

  const clearNewMessage = useCallback(() => setHasNewMessage(false), []);

  return (
    <ChatbotContext.Provider
      value={{ isOpen, openChatbot, closeChatbot, toggleChatbot, hasNewMessage, clearNewMessage }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
