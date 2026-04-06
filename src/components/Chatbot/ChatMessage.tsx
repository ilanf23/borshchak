import { motion } from "framer-motion";
import { Scale, Phone, ExternalLink, Calendar } from "lucide-react";
import type { ChatNode } from "./chatbotFlow";
import { useConsultation } from "@/contexts/ConsultationContext";

interface ChatMessageProps {
  sender: "bot" | "user";
  text: string;
  action?: ChatNode["action"];
  isLatest?: boolean;
}

const ChatMessage = ({ sender, text, action, isLatest }: ChatMessageProps) => {
  const { openConsultation } = useConsultation();

  const handleAction = () => {
    if (!action) return;
    if (action.type === "consultation") {
      openConsultation();
    } else if (action.href) {
      if (action.type === "phone") {
        window.location.href = action.href;
      } else {
        window.open(action.href, "_blank", "noopener");
      }
    }
  };

  const ActionIcon = action
    ? action.type === "phone"
      ? Phone
      : action.type === "consultation"
        ? Calendar
        : ExternalLink
    : null;

  return (
    <motion.div
      className={`flex items-end gap-2 ${sender === "user" ? "justify-end" : "justify-start"}`}
      initial={isLatest ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Bot avatar */}
      {sender === "bot" && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-navy flex items-center justify-center">
          <Scale className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
          sender === "bot"
            ? "bg-secondary text-foreground rounded-lg rounded-tl-sm"
            : "bg-navy text-white rounded-lg rounded-tr-sm"
        }`}
      >
        <p>{text}</p>

        {action && (
          <button
            onClick={handleAction}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
              bg-green text-white hover:bg-green-hover transition-colors"
          >
            {ActionIcon && <ActionIcon className="w-3.5 h-3.5" />}
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
