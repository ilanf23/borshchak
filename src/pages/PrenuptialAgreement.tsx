import { useState } from "react";
import { Phone, CheckCircle2, FileText, Shield, Users, Heart, Scale, ChevronDown, ChevronUp, ArrowRight, BookOpen, HelpCircle, Trophy, AlertTriangle, Briefcase, Ban, Eye, PenLine, HandHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const whatAPrenupCanDo = [
  {
    title: "Protect from Each Other's Debts",
    icon: Shield,
    description: "If your spouse has significant debts — from loans, failed investments, or emergencies — a prenup can protect your personal assets from being seized to repay those obligations.",
  },
  {
    title: "Set Rules on Marital Assets",
    icon: Scale,
    description: "A prenup determines how income and assets acquired during the marriage are divided — even if only one party is directly involved in wealth creation. Both contributions (financial and domestic) are considered.",
  },
  {
    title: "Protect Family Property",
    icon: Heart,
    description: "If you're a beneficiary of an inheritance, heirlooms, a family business, or property passed down to you, a prenup ensures these generational assets stay in the family in the event of a divorce.",
  },
  {
    title: "Protect Children from Previous Relationships",
    icon: Users,
    description: "If either spouse has children from a previous relationship, a prenuptial agreement can protect those children's future financial interests and ensure their support continues regardless of the marriage outcome.",
  },
];

const invalidReasons = [
  { icon: AlertTriangle, title: "Coercion", description: "If either party was forced or fraudulently induced into signing the agreement, it will be considered invalid." },
  { icon: Eye, title: "Inaccuracy", description: "Misrepresentation of facts or incorrect information on the document makes the prenup void." },
  { icon: Scale, title: "Changes in the Law", description: "Changes in the laws governing prenuptial agreements may render the document obsolete or unenforceable." },
  { icon: Ban, title: "Failure to Disclose", description: "Not disclosing all property, assets, or debts invalidates the agreement." },
  { icon: HandHeart, title: "Unfairness", description: "If the agreement is found to be unconscionable or grossly unfair to one party, it may not be enforced." },
  { icon: Users, title: "No Legal Representation", description: "If either party did not have independent legal representation during drafting, the agreement can be invalidated." },
  { icon: PenLine, title: "Failure to Execute", description: "The document must be signed by both parties and properly notarized to be legally binding." },
];

const draftingPrinciples = [
  "Both parties should have independent legal representation",
  "The agreement must be equitable and fair to both parties",
  "Include all details important to both parties — finances, inheritances, debts, children's support",
  "All relevant Ohio laws must be considered during drafting",
];

const quizQuestions = [
  {
    question: "What is the primary purpose of a prenuptial agreement?",
    options: [
      "To prevent divorce",
      "To outline asset and debt division in case of divorce",
      "To determine who gets custody of children",
      "To set a wedding budget",
    ],
    correctIndex: 1,
    explanation: "A prenuptial agreement is a legally binding contract that outlines how assets and debts would be divided in the event of a divorce, and can set rules for marital property and children from previous relationships.",
  },
  {
    question: "Can a prenup be invalidated if one party was coerced into signing?",
    options: [
      "No, once signed it's permanent",
      "Only if a judge orders it",
      "Yes, coercion makes the agreement invalid",
      "Only after 10 years of marriage",
    ],
    correctIndex: 2,
    explanation: "If either party was forced or fraudulently induced into signing the prenuptial agreement, it will be considered invalid and unenforceable by Ohio courts.",
  },
  {
    question: "Do you need a lawyer to draft a prenuptial agreement in Ohio?",
    options: [
      "No, you can use an online template",
      "Only if you have significant assets",
      "Yes, both parties should have independent legal representation",
      "Only the wealthier spouse needs one",
    ],
    correctIndex: 2,
    explanation: "Both parties should have independent legal representation to ensure the agreement is fair, legally binding, and that both parties fully understand their rights and obligations.",
  },
];

const ExpandableCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card-bordered hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-subsection text-lg">{title}</h4>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-body text-base">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PrenupQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = quizQuestions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center space-y-6">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
        >
          <Trophy className="w-10 h-10" style={{ color: "hsl(var(--green-accent))" }} />
        </div>
        <h3 className="heading-section text-3xl">
          You scored {score}/{quizQuestions.length}!
        </h3>
        <p className="text-body">
          {score === 3
            ? "You're well-informed about prenuptial agreements in Ohio."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Prenuptial law can be complex. Let our team guide you."}
        </p>
        <a href="tel:+13803240878" className="btn-cta inline-flex">
          <Phone className="w-5 h-5 mr-2" />
          Get Your Free Consultation
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-medium text-muted-foreground">
          Question {currentQ + 1} of {quizQuestions.length}
        </span>
        <div className="flex gap-1">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className="w-8 h-1.5 rounded-full"
              style={{
                backgroundColor:
                  i <= currentQ
                    ? "hsl(var(--green-accent))"
                    : "hsl(var(--border))",
              }}
            />
          ))}
        </div>
      </div>
      <h3 className="heading-subsection text-2xl">{q.question}</h3>
      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          let borderColor = "hsl(var(--border))";
          let bgColor = "transparent";
          if (answered && idx === q.correctIndex) {
            borderColor = "hsl(var(--green-accent))";
            bgColor = "hsla(152, 45%, 38%, 0.08)";
          } else if (answered && idx === selected && idx !== q.correctIndex) {
            borderColor = "hsl(var(--destructive))";
            bgColor = "hsla(0, 72%, 51%, 0.05)";
          } else if (idx === selected) {
            borderColor = "hsl(var(--primary))";
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 text-body text-lg"
              style={{ borderColor, backgroundColor: bgColor }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg"
          style={{ backgroundColor: "hsl(var(--secondary))" }}
        >
          <p className="text-body text-base">
            <strong>{selected === q.correctIndex ? "Correct!" : "Not quite."}</strong>{" "}
            {q.explanation}
          </p>
        </motion.div>
      )}
      {answered && (
        <button onClick={handleNext} className="btn-cta">
          {currentQ < quizQuestions.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      )}
    </div>
  );
};

const PrenuptialAgreement = () => {
  const purposeAnim = useScrollAnimation();
  const canDoAnim = useScrollAnimation();
  const invalidAnim = useScrollAnimation();
  const draftingAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
            >
              Columbus, OH Prenuptial Agreement Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Prenuptial Agreements in Columbus, OH — Protect What Matters Most
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              No one wants to think about divorce when planning a wedding. But a prenuptial agreement isn't about distrust — it's about clarity, fairness, and protecting your future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Is a Prenup */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={purposeAnim.ref}
            className={`container max-w-4xl ${purposeAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">What Is a Prenuptial Agreement?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">The Contract</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A prenuptial agreement is a legally binding contract between couples about to marry. It outlines how assets and debts would be divided in the event of a divorce.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Sets rules for marital property division
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Customizable to your specific needs
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Must be fair and equitable to both parties
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Briefcase className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">The Lawyer's Role</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A prenuptial agreement lawyer drafts, reviews, and revises your prenup until both parties agree on its terms — ensuring it's legally sound and fair.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Advises on legal implications
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Ensures compliance with Ohio law
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Protects both parties' interests
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Divorce Rate</h4>
                  <p className="text-body text-base">
                    According to Statista, Ohio's divorce rate is <strong>2.5 per 1,000 people</strong>. While no one plans for divorce, a prenuptial agreement provides clarity and protection for both parties — and can significantly reduce conflict if a separation does occur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What a Prenup Can Do */}
        <section className="section-padding">
          <div
            ref={canDoAnim.ref}
            className={`container max-w-4xl ${canDoAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">What a Prenup Can Do for You</h2>
            <p className="text-body mb-8">
              Prenuptial agreements serve many purposes depending on your situation. Tap each benefit below to learn more.
            </p>
            <div className="grid gap-4">
              {whatAPrenupCanDo.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* How a Prenup Becomes Invalid */}
        <section className="section-padding bg-navy">
          <div
            ref={invalidAnim.ref}
            className={`container max-w-4xl ${invalidAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              How a Prenuptial Agreement Can Become Invalid
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
              While prenuptial agreements are legally binding contracts, there are circumstances under which they may be invalidated by the court.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {invalidReasons.map((reason) => (
                <div key={reason.title} className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <reason.icon className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Drafting a Prenup */}
        <section className="section-padding bg-card">
          <div
            ref={draftingAnim.ref}
            className={`container max-w-4xl ${draftingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Drafting a Fair Prenuptial Agreement</h2>
            <div className="space-y-6 text-body">
              <p>
                A prenup should protect both parties. While you want to safeguard your interests, remember you're signing a contract with someone you love. Here are the key principles:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {draftingPrinciples.map((principle, idx) => (
                  <div key={idx} className="card-bordered">
                    <div className="flex items-start gap-3">
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-serif font-medium"
                        style={{ backgroundColor: "hsl(var(--secondary))", color: "hsl(var(--trust-navy))" }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-body text-base">{principle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-elevated">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-body text-base">
                    <strong>Important:</strong> Both parties should have their own independent attorney review the agreement. An experienced prenuptial agreement lawyer ensures the document is legally sound, fair, and considers all relevant Ohio laws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="section-padding" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">Test Your Knowledge</h2>
              </div>
              <p className="text-body">How much do you know about prenuptial agreements in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <PrenupQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrenuptialAgreement;
