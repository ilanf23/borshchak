import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, AlertTriangle, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, XCircle, ShieldAlert, HeartOff, UserX, Brain, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const annulmentGrounds = [
  {
    title: "Bigamy",
    icon: AlertTriangle,
    description: "Either spouse was already legally married to another person at the time of the marriage. A person cannot be legally married twice, making the subsequent marriage void.",
  },
  {
    title: "Forced Consent",
    icon: ShieldAlert,
    description: "One party entered the marriage unwillingly or through threats. Legal marriage must be based on free consent — if coercion is proven, the marriage qualifies for annulment.",
  },
  {
    title: "Fraud",
    icon: UserX,
    description: "One party entered the marriage based on lies told by the other — such as claiming a false identity or a fabricated pregnancy. The fraud must go to the essence of the marriage.",
  },
  {
    title: "Underage Marriage",
    icon: Ban,
    description: "Either spouse was under the legal marriage age as established by Section 3101.01 of Ohio law. If the underage party did not continue the marriage after reaching legal age, the case has grounds for annulment.",
  },
  {
    title: "Mental Incapacity",
    icon: Brain,
    description: "Either spouse was mentally incompetent due to drugs, alcohol, or other conditions and could not make informed consent — and did not continue the marriage after mental capacity was restored.",
  },
  {
    title: "Lack of Consummation",
    icon: HeartOff,
    description: "Either spouse was physically incapable of consummating the marriage. This must be a permanent condition that existed at the time of the marriage.",
  },
];

const differences = [
  {
    aspect: "Cost",
    divorce: "Generally more expensive due to complexity of asset division, custody, and support proceedings.",
    annulment: "Typically less expensive — the marriage is treated as if it never existed.",
  },
  {
    aspect: "Spousal Support",
    divorce: "The court may award alimony and divide assets equitably between spouses.",
    annulment: "No spousal support — because the marriage is declared void from the start.",
  },
  {
    aspect: "Filing Timeline",
    divorce: "Can be filed at any point during the marriage.",
    annulment: "Must be filed within two years of the marriage date under Ohio Bar guidelines.",
  },
  {
    aspect: "Property Division",
    divorce: "Marital property is divided equitably by the court.",
    annulment: "No marital property to divide — assets return to their original owners.",
  },
];

const quizQuestions = [
  {
    question: "What does an annulment do legally?",
    options: [
      "Ends a valid marriage",
      "Declares the marriage never legally existed",
      "Separates spouses temporarily",
      "Converts a marriage into a civil union",
    ],
    correctIndex: 1,
    explanation: "An annulment cancels a marriage from a legal perspective — meaning the marriage was never valid or technically never existed.",
  },
  {
    question: "How long do you have to file for an annulment in Ohio?",
    options: ["6 months", "1 year", "2 years", "No time limit"],
    correctIndex: 2,
    explanation: "Under Ohio Bar guidelines, you must file a petition for annulment within two years from the date the marriage took place.",
  },
  {
    question: "Which of the following is NOT a ground for annulment in Ohio?",
    options: [
      "Bigamy",
      "Fraud",
      "Irreconcilable differences",
      "Mental incapacity",
    ],
    correctIndex: 2,
    explanation: "Irreconcilable differences are grounds for divorce or dissolution, not annulment. Annulment requires that the marriage was never valid to begin with.",
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

const AnnulmentQuiz = () => {
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
            ? "You're well-informed about Ohio annulment law."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Annulment law can be complex. Let our team guide you."}
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

const Annulment = () => {
  const { openConsultation } = useConsultation();
  const groundsAnim = useScrollAnimation();
  const diffAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
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
              Columbus, OH Annulment Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Annulment Lawyer in Columbus, Ohio
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              An annulment declares a marriage legally void — as if it never existed. If your marriage was entered under fraud, coercion, or other qualifying conditions, our attorneys can help you pursue an annulment in Ohio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Is an Annulment */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is an Annulment?</h2>
            <div className="space-y-4 text-body">
              <p>
                An annulment is a legally accepted procedure that cancels a marriage. From a legal perspective, an annulled marriage was never valid or never technically existed. Unlike divorce, which ends a valid marriage, annulment treats the marriage as if it never happened.
              </p>
              <p>
                In Franklin County and the rest of Ohio, the annulment process cannot proceed if your reasons for termination don't fall under the legally recognized grounds for nullification. Understanding whether your situation qualifies is the critical first step.
              </p>
            </div>

            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Filing Cost in Ohio</h4>
                  <p className="text-body text-base">
                    Court filing fees vary by county. In Columbus and Franklin County, filing fees for an annulment case are approximately <strong>$175</strong>. In Cleveland, filing fees are around <strong>$150</strong>. Attorney fees are additional and depend on case complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style 4: Full-Bleed Edge-to-Edge */}
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
          alt="Legal documents and pen on a desk"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Grounds for Annulment */}
        <section className="section-padding">
          <div
            ref={groundsAnim.ref}
            className={`container max-w-4xl ${groundsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Grounds for Annulment in Ohio</h2>
            <p className="text-body mb-8">
              Before filing for an annulment, it's important to verify that your marriage qualifies. In Ohio, a voidable marriage can be annulled on the following grounds. Tap each to learn more.
            </p>
            <div className="grid gap-4">
              {annulmentGrounds.map((ground) => (
                <ExpandableCard key={ground.title} title={ground.title} icon={ground.icon}>
                  {ground.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              If you meet one of the conditions above, you can seek an annulment in Ohio by working closely with an experienced annulment attorney.
            </p>
          </div>
        </section>

        {/* Style 3: Side-by-Side (Text Left, Image Right) */}
        <section className="section-padding-sm bg-card">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">Protecting Your Rights From the Start</h3>
                <p className="text-body">
                  Annulment cases involve unique legal complexities. Whether you're dealing with fraud, coercion, or other qualifying grounds, having experienced legal counsel ensures your case is presented effectively and your rights are protected throughout the process.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney and client shaking hands in agreement"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Divorce vs Annulment Comparison */}
        <section className="section-padding bg-navy">
          <div
            ref={diffAnim.ref}
            className={`container max-w-4xl ${diffAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Divorce vs. Annulment: Key Differences
            </h2>
            <div className="grid gap-6">
              {differences.map((diff) => (
                <div key={diff.aspect} className="grid md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2" style={{ color: "hsl(var(--green-accent))" }}>
                      {diff.aspect}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Divorce</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.divorce}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Annulment</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.annulment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote Overlay */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "It's a verified war strategy to never go to a battlefield alone."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>— Let our attorneys stand with you</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Get an Annulment Attorney Today</h2>
            <div className="space-y-4 text-body">
              <p>
                Court hearings can be daunting, especially when emotions are involved. At Borshchak Law Group, we provide you with a strong attorney-client relationship to ensure your grounds for marriage annulment are solid and give you the best possible outcome.
              </p>
              <p>
                Our expert annulment attorneys will walk you through the court proceedings and present a compelling case for annulment. You must file within <strong>two years</strong> of the marriage date — don't wait to explore your options.
              </p>
            </div>
            <div className="mt-8">
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Green Accent Block */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div
                className="absolute top-4 -left-4 w-full h-full rounded-lg hidden md:block"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <img
                src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=1200&q=80"
                alt="Couple holding hands with hope for the future"
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
              <p className="text-body">How much do you know about annulment in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <AnnulmentQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Annulment;
