import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, Users, Home, DollarSign, Baby, Gavel, AlertTriangle, ChevronDown, ChevronUp, ArrowRight, BookOpen, HelpCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const faultGrounds = [
  {
    title: "Gross Neglect of Duty",
    icon: AlertTriangle,
    description: "When a spouse neglects the marital duties of 'respect, fidelity, and support.' The neglect has to be severe and dramatically affects the marriage.",
  },
  {
    title: "Extreme Cruelty",
    icon: AlertTriangle,
    description: "Mental or physical cruelty described as treatment 'that makes it unsafe or improper for the parties to reside together.' This involves emotional, physical, or financial abuse.",
  },
  {
    title: "Adultery",
    icon: AlertTriangle,
    description: "The court considers adultery a 'fault ground,' meaning one spouse's misconduct led to the divorce.",
  },
  {
    title: "Bigamy",
    icon: AlertTriangle,
    description: "When one spouse is married without legally ending their past marriage. This is also a crime in Ohio.",
  },
  {
    title: "Willful Desertion",
    icon: AlertTriangle,
    description: "Also known as abandonment. When one spouse leaves and stays apart for one year without consent, it is considered desertion.",
  },
  {
    title: "Fraudulent Contract",
    icon: AlertTriangle,
    description: "When your spouse gave misleading information, hid essential details including debts or assets, or if you were threatened or forced into the marriage.",
  },
  {
    title: "Habitual Drunkenness",
    icon: AlertTriangle,
    description: "Under Ohio law, occasional drunkenness is not enough. You must prove your spouse is an addict or habitual drunkard.",
  },
  {
    title: "Imprisonment",
    icon: AlertTriangle,
    description: "Imprisonment of a spouse in a state or federal correctional facility for over a year at the time of filing.",
  },
  {
    title: "Separate Living Without Cohabitation",
    icon: AlertTriangle,
    description: "If you and your spouse have lived separately without cohabitation without interruption for the past year.",
  },
];

const quizQuestions = [
  {
    question: "What is the minimum residency requirement to file for divorce in Ohio?",
    options: ["3 months", "6 months", "1 year", "2 years"],
    correctIndex: 1,
    explanation: "Either you or your spouse must have lived in Ohio for at least six months to file for divorce.",
  },
  {
    question: "What is the difference between a 'divorce' and a 'dissolution' in Ohio?",
    options: [
      "There is no difference",
      "A dissolution requires proving fault",
      "A dissolution requires both parties to agree on all issues",
      "A divorce is always faster",
    ],
    correctIndex: 2,
    explanation: "A dissolution (no-fault divorce) requires both parties to agree on all issues. A divorce involves one spouse filing a lawsuit and can be resolved through negotiations or court.",
  },
  {
    question: "How does Ohio divide marital property?",
    options: [
      "Always 50/50",
      "The higher earner gets more",
      "Equitably: fair but not always equal",
      "The court doesn't get involved",
    ],
    correctIndex: 2,
    explanation: "Ohio uses equitable distribution, meaning the court aims for a fair division considering each party's contributions, but it's not always an equal 50/50 split.",
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

const DivorceQuiz = () => {
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
            ? "You're well-informed about Ohio divorce law."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Divorce law can be complex. Let our team guide you."}
        </p>
        <a href="tel:+16146624043" className="btn-cta inline-flex">
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

const Divorce = () => {
  const { openConsultation } = useConsultation();
  const methodsAnim = useScrollAnimation();
  const groundsAnim = useScrollAnimation();
  const mattersAnim = useScrollAnimation();
  const trialAnim = useScrollAnimation();
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
              Columbus, OH Divorce Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Getting a Divorce in Columbus, OH? Here's How We Can Help
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Getting a divorce can be emotionally draining and legally complex. If you or your family are considering divorce, it's crucial to understand Ohio family law before embarking on this journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* Divorce vs Dissolution */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={methodsAnim.ref}
            className={`container max-w-4xl ${methodsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">Choosing the Right Legal Method</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">Ohio Divorce (Contested or Uncontested)</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Either spouse files a complaint to end the marriage. Ohio divorce may be filed on fault-based or no-fault grounds, including incompatibility. This is the more formal method and can be resolved through negotiations or court proceedings.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    One party files against the other
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Fault-based or no-fault (incompatibility) grounds available
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Court decides unresolved issues
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Scale className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">Dissolution (No-Fault)</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Both parties agree to end the marriage without adversarial court proceedings. A final hearing before a judge is still required, but it is brief, non-contested, and typically completed in one appearance. Generally less expensive and faster than divorce, but requires full agreement on all issues.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Both parties must agree
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    No fault needs to be proven
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Typically faster & less costly
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Residency Requirement</h4>
                  <p className="text-body text-base">
                    To file for either divorce or dissolution in Ohio, either you or your spouse must have lived in the state for at least <strong>six months</strong>. For a no-fault dissolution, you don't need to prove wrongdoing, only that the marriage can't be saved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style 2: Side-by-Side (Image Left, Text Right) */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
                alt="Family having a thoughtful discussion together"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Choosing the Right Path Forward</h3>
                <p className="text-body">
                  Whether you pursue a fault-based divorce or a no-fault dissolution, the decision shapes every aspect of the process, from timelines and costs to how assets are divided. Our attorneys help you evaluate your options so you can move forward with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Grounds for Fault Divorce */}
        <section className="section-padding">
          <div
            ref={groundsAnim.ref}
            className={`container max-w-4xl ${groundsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Legal Grounds for Divorce in Ohio</h2>
            <p className="text-body mb-8">
              For an at-fault divorce, you must have a legal reason under <strong>Section 3105.01 of the Ohio Revised Code</strong>. Tap each ground below to learn more.
            </p>
            <div className="grid gap-4">
              {faultGrounds.map((ground) => (
                <ExpandableCard key={ground.title} title={ground.title} icon={ground.icon}>
                  {ground.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              Every case is unique. Having experienced legal guidance is essential, especially since fault can have a significant impact on the outcome.
            </p>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote Overlay */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "Justice cannot be for one side alone, but must be for both."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Eleanor Roosevelt</p>
          </div>
        </section>

        {/* Common Divorce Matters */}
        <section className="section-padding bg-navy">
          <div
            ref={mattersAnim.ref}
            className={`container max-w-4xl ${mattersAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              What to Expect From Common Divorce Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Division of Property
                  </h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                  Ohio courts use equitable distribution: fair but not always equal. Marital property includes assets acquired during the marriage. The court may consider misconduct (such as wasting marital funds) when dividing property.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Alimony & Spousal Support
                  </h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                  Spousal support isn't automatic in Ohio. When parties can't agree, the court decides eligibility, amount, and duration, ensuring both parties can maintain a reasonable standard of living.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Parental Rights
                  </h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                  Ohio courts divide parental rights based on the child's best interest. Shared parenting doesn't always mean equal time. The court may privately interview the child about their preferences.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Baby className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Child Support
                  </h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                  Ohio uses child support guidelines based on the number of children, combined parental income, medical costs, and childcare expenses. The court can deviate from standard calculations when fairness requires it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divorce Trial */}
        <section className="section-padding bg-card">
          <div
            ref={trialAnim.ref}
            className={`container max-w-4xl ${trialAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">What to Expect During a Divorce Trial</h2>
            <div className="space-y-6 text-body">
              <p>
                When spouses can't agree on terms and can't settle through mediation, a family law judge decides the outcome. While most cases are resolved before trial, some proceed to court.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">1. Preparation</h4>
                  <p className="text-body-sm text-base">Your attorney reviews finances, assets, debts, and gathers evidence.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">2. Trial</h4>
                  <p className="text-body-sm text-base">Both sides present evidence, examine witnesses, and submit documents.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">3. Ruling</h4>
                  <p className="text-body-sm text-base">The judge rules on property, support, custody, and child support based on evidence and law.</p>
                </div>
              </div>
              <p>
                An experienced attorney can help save time and money by attempting to settle through mediation or negotiation before litigation.
              </p>
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Accent Block */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div
                className="absolute top-4 left-4 w-full h-full rounded-lg hidden md:block"
                style={{ backgroundColor: "hsl(var(--trust-navy))" }}
              />
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80"
                alt="Person looking toward a hopeful new beginning"
                className="relative z-10 w-full h-64 md:h-80 object-cover rounded-lg"
                loading="lazy"
              />
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
              <p className="text-body">How much do you know about divorce in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <DivorceQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Divorce;
