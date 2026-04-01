import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = { question: string; answer: React.ReactNode };

export default function PracticeAreaFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="card-bordered transition-all duration-300 cursor-pointer hover:shadow-md hover:border-accent"
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          <div className="flex items-center justify-between">
            <h4 className="heading-subsection text-lg pr-4">
              {item.question}
            </h4>
            <ChevronDown
              className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300"
              style={{
                transform:
                  openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 text-body text-base">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
