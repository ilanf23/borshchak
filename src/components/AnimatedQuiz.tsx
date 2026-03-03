import { useState } from "react";
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PartyPopper,
  XCircle,
  BookOpen,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultation } from "@/contexts/ConsultationContext";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const optionLabels = ["A", "B", "C", "D"];

const confettiPieces = Array.from({ length: 14 }, (_, i) => ({
  angle: (i / 14) * Math.PI * 2,
  distance: 55 + (i % 3) * 30,
  delay: i * 0.025,
  color: [
    "#4CAF50", "#FFD700", "#2196F3", "#FF6B6B", "#9C27B0",
    "#FF9800", "#00BCD4", "#E91E63", "#8BC34A", "#FFC107",
    "#3F51B5", "#FF5722", "#4CAF50", "#FFD700",
  ][i],
}));

const CorrectBurst = () => (
  <div className="absolute inset-0 pointer-events-none overflow-visible">
    {confettiPieces.map((piece, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full left-1/2 top-1/2"
        style={{ width: 6 + (i % 3) * 2, height: 6 + (i % 3) * 2, backgroundColor: piece.color }}
        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
        animate={{
          scale: [0, 1.2, 0.6],
          x: Math.cos(piece.angle) * piece.distance,
          y: Math.sin(piece.angle) * piece.distance,
          opacity: [1, 1, 0],
        }}
        transition={{ duration: 0.7, delay: piece.delay, ease: "easeOut" }}
      />
    ))}
  </div>
);

export default function AnimatedQuiz({ questions }: { questions: QuizQuestion[] }) {
  const { openConsultation } = useConsultation();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);

  const q = questions[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const isPerfect = score === questions.length;
    return (
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative inline-block">
          <motion.div
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
            style={{
              backgroundColor: isPerfect
                ? "hsla(45, 100%, 51%, 0.15)"
                : "hsla(152, 45%, 38%, 0.1)",
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            {isPerfect ? (
              <PartyPopper className="w-12 h-12" style={{ color: "#FFD700" }} />
            ) : (
              <Trophy
                className="w-12 h-12"
                style={{ color: "hsl(var(--green-accent))" }}
              />
            )}
          </motion.div>
          {isPerfect && <CorrectBurst />}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="heading-section text-3xl mb-2">
            {isPerfect ? "Perfect Score!" : `You scored ${score}/${questions.length}!`}
          </h3>
          <div className="flex justify-center gap-2 mb-4">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
              >
                {i < score ? (
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "hsl(var(--green-accent))" }}
                  />
                ) : (
                  <XCircle className="w-8 h-8 text-muted-foreground/40" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-body text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isPerfect
            ? "Impressive! You really know your stuff."
            : score >= 2
              ? "Good knowledge! A consultation can fill in the rest."
              : "The law can be complex. Let our team guide you through it."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a href="tel:+16146624043" className="btn-cta inline-flex">
            <Phone className="w-5 h-5 mr-2" />
            Call Us Now: 614-662-4043
          </a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: progress + live score */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-medium text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              className="text-base font-semibold"
              style={{ color: "hsl(var(--green-accent))" }}
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score}/{questions.length}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="w-full h-2 rounded-full" style={{ backgroundColor: "hsl(var(--border))" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "hsl(var(--green-accent))" }}
          initial={false}
          animate={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Question with slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="heading-subsection text-2xl mb-6">{q.question}</h3>

          {/* Options with letter labels */}
          <div className="grid gap-3">
            {q.options.map((opt, idx) => {
              const isThisCorrect = idx === q.correctIndex;
              const isThisSelected = idx === selected;
              const isWrongSelection = answered && isThisSelected && !isThisCorrect;
              const showCorrect = answered && isThisCorrect;

              let borderColor = "hsl(var(--border))";
              let bgColor = "transparent";
              let labelBg = "hsl(var(--secondary))";
              let labelColor = "hsl(var(--foreground))";

              if (showCorrect) {
                borderColor = "hsl(var(--green-accent))";
                bgColor = "hsla(152, 45%, 38%, 0.08)";
                labelBg = "hsl(var(--green-accent))";
                labelColor = "white";
              } else if (isWrongSelection) {
                borderColor = "hsl(var(--destructive))";
                bgColor = "hsla(0, 72%, 51%, 0.05)";
                labelBg = "hsl(var(--destructive))";
                labelColor = "white";
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "relative text-left flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-colors duration-200 text-body text-lg",
                    !answered && "hover:border-primary/50 hover:shadow-sm"
                  )}
                  style={{ borderColor, backgroundColor: bgColor }}
                  animate={
                    isWrongSelection
                      ? { x: [0, -8, 8, -8, 8, 0] }
                      : showCorrect
                        ? { scale: [1, 1.02, 1] }
                        : {}
                  }
                  transition={
                    isWrongSelection
                      ? { duration: 0.4, ease: "easeInOut" }
                      : { duration: 0.3, delay: 0.1 }
                  }
                  whileHover={!answered ? { scale: 1.01 } : undefined}
                  whileTap={!answered ? { scale: 0.98 } : undefined}
                  disabled={answered}
                >
                  {/* Letter label */}
                  <span
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-base transition-colors duration-200"
                    style={{ backgroundColor: labelBg, color: labelColor }}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="flex-1">{opt}</span>

                  {/* Result icon */}
                  {showCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
                    >
                      <CheckCircle2
                        className="w-6 h-6 shrink-0"
                        style={{ color: "hsl(var(--green-accent))" }}
                      />
                    </motion.div>
                  )}
                  {isWrongSelection && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <XCircle className="w-6 h-6 shrink-0 text-destructive" />
                    </motion.div>
                  )}

                  {/* Confetti burst on correct answer */}
                  {showCorrect && isThisSelected && <CorrectBurst />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback + streak */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: isCorrect
                  ? "hsla(152, 45%, 38%, 0.08)"
                  : "hsl(var(--secondary))",
                borderLeft: isCorrect
                  ? "4px solid hsl(var(--green-accent))"
                  : "4px solid hsl(var(--destructive))",
              }}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                ) : (
                  <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-semibold text-base mb-1">
                    {isCorrect
                      ? streak >= 2
                        ? `Correct! ${streak} in a row!`
                        : "Correct!"
                      : "Not quite. Here's why:"}
                  </p>
                  <p className="text-body text-base">{q.explanation}</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleNext}
              className="btn-cta mt-4 w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentQ < questions.length - 1
                ? "Next Question"
                : "See Results"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
