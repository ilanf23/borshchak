import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCTAProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCTA = ({ children, delay = 0, className = "" }: AnimatedCTAProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        initial={{ boxShadow: "0 0 0 0 hsla(153, 30%, 25%, 0)" }}
        animate={{
          boxShadow: [
            "0 0 0 0 hsla(153, 30%, 25%, 0)",
            "0 0 0 8px hsla(153, 30%, 25%, 0.15)",
            "0 0 0 0 hsla(153, 30%, 25%, 0)",
          ],
        }}
        transition={{
          duration: 2,
          delay: delay + 0.6,
          repeat: 2,
          ease: "easeInOut",
        }}
        style={{ borderRadius: "9999px", width: "fit-content" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCTA;
