import { createContext, useContext, useState, ReactNode } from "react";
import ConsultationModal from "@/components/ConsultationModal";

interface ConsultationContextType {
  openConsultation: () => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within a ConsultationProvider");
  }
  return context;
};

export const ConsultationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openConsultation = () => setIsOpen(true);
  const closeConsultation = () => setIsOpen(false);

  return (
    <ConsultationContext.Provider value={{ openConsultation, closeConsultation }}>
      {children}
      <ConsultationModal open={isOpen} onOpenChange={setIsOpen} />
    </ConsultationContext.Provider>
  );
};
