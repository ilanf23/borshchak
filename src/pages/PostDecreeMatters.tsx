import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, Users, Clock, ShieldCheck, Gavel, RefreshCw, DollarSign, Heart, Home, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const postDecreeTypes = [
  {
    title: "Child Custody Modifications",
    icon: Users,
    description: "Circumstances change after divorce. If you or your former spouse has relocated, remarried, or experienced a shift in work schedule, the original custody arrangement may no longer serve your child's best interests. Ohio courts allow modifications when there is a substantial change in circumstances.",
  },
  {
    title: "Child Support Modifications",
    icon: DollarSign,
    description: "If either parent's income has changed significantly (job loss, promotion, disability), child support obligations can be adjusted. Ohio law permits modification when the recalculated amount differs by at least 10% from the current order.",
  },
  {
    title: "Spousal Support (Alimony) Modifications",
    icon: Heart,
    description: "A sudden loss of assets, change in employment, or remarriage of the receiving spouse can warrant a modification to spousal support. The original decree must allow for future modification for the court to consider changes.",
  },
  {
    title: "Property Division Disputes",
    icon: Home,
    description: "If your former spouse failed to transfer property as ordered, hid assets during the original proceedings, or is not complying with the division terms, you can seek enforcement or correction through the court.",
  },
  {
    title: "Contempt of Court",
    icon: Gavel,
    description: "When a former spouse willfully violates a court order, such as refusing visitation, withholding support payments, or ignoring property transfer deadlines, the court can hold them in contempt. Penalties may include fines, jail time, or attorney fee awards.",
  },
  {
    title: "Relocation Issues",
    icon: RefreshCw,
    description: "If a custodial parent wishes to move out of state or a significant distance, they must obtain court approval. The court evaluates how the move affects the child's relationship with the non-custodial parent and whether the move is in the child's best interest.",
  },
];

const modificationVsEnforcement = [
  {
    aspect: "Purpose",
    modification: "Changes the terms of the original court order to reflect new circumstances.",
    enforcement: "Compels compliance with the existing court order as written.",
  },
  {
    aspect: "When to File",
    modification: "When a substantial change in circumstances has occurred (job loss, relocation, remarriage).",
    enforcement: "When your former spouse is violating or ignoring the existing court order.",
  },
  {
    aspect: "Court Standard",
    modification: "Must prove a 'change in circumstances' that justifies altering the order.",
    enforcement: "Must prove the other party is willfully not complying with the order.",
  },
  {
    aspect: "Possible Outcomes",
    modification: "Revised custody schedule, adjusted support amounts, or updated property terms.",
    enforcement: "Contempt findings, fines, wage garnishment, jail time, or attorney fee awards.",
  },
];

const quizQuestions = [
  {
    question: "When can you file for a post-decree modification in Ohio?",
    options: [
      "Any time you want a change",
      "Only within 1 year of the divorce",
      "When there is a substantial change in circumstances",
      "Only if both parties agree",
    ],
    correctIndex: 2,
    explanation: "Ohio courts require a substantial change in circumstances to modify a divorce decree. Simply wanting a different outcome is not sufficient grounds.",
  },
  {
    question: "What is the difference between modification and enforcement?",
    options: [
      "They are the same thing",
      "Modification changes the order; enforcement compels compliance",
      "Enforcement changes the order; modification compels compliance",
      "Neither involves going back to court",
    ],
    correctIndex: 1,
    explanation: "Modification seeks to change the terms of the original order, while enforcement asks the court to compel the other party to follow the existing order.",
  },
  {
    question: "What can happen if your ex-spouse violates a court order?",
    options: [
      "Nothing, court orders are suggestions",
      "They may face contempt charges, fines, or jail time",
      "The order is automatically voided",
      "You must renegotiate privately",
    ],
    correctIndex: 1,
    explanation: "Willful violation of a court order can result in contempt of court charges, which may carry penalties including fines, jail time, and payment of the other party's attorney fees.",
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

const PostDecreeQuiz = () => {
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
            ? "You have a strong understanding of post-decree matters."
            : score >= 2
            ? "Good foundation! A consultation can clarify the specifics of your case."
            : "Post-decree law is complex. Let our attorneys guide you through your options."}
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

const PostDecreeMatters = () => {
  const { openConsultation } = useConsultation();
  const typesAnim = useScrollAnimation();
  const compAnim = useScrollAnimation();
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
              Columbus, OH Post-Decree Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Post-Decree Matters Lawyer in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              If your former spouse has violated your divorce decree, or your circumstances have changed, you need an experienced attorney for post-decree enforcement or modification. Don't let your ex-spouse take advantage of you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Are Post-Decree Matters */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Are Post-Decree Matters?</h2>
            <div className="space-y-4 text-body">
              <p>
                Post-decree matters arise when issues develop after a divorce or dissolution has been finalized. Life doesn't stop when a judge signs a decree: jobs change, people relocate, children grow, and sometimes one party simply stops following the court's orders.
              </p>
              <p>
                Ohio law provides mechanisms to address these changes through either <strong>modifications</strong> (changing the terms of the original order) or <strong>enforcement actions</strong> (compelling compliance with existing orders). Borshchak Law Group handles both types of post-decree matters in Columbus.
              </p>
            </div>

            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Don't Wait to Act</h4>
                  <p className="text-body text-base">
                    If your former spouse is violating the terms of your divorce decree, time matters. The longer violations go unaddressed, the harder they can be to remedy. Contact an attorney as soon as you recognize a problem.
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
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
                alt="Legal scales and books representing post-decree justice"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Your Divorce Decree Is Legally Binding</h3>
                <p className="text-body">
                  A divorce decree is a court order. When your former spouse fails to comply with custody schedules, support payments, or property transfers, you have legal options. Our attorneys help you hold them accountable and protect your rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Post-Decree Matters */}
        <section className="section-padding">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Common Post-Decree Issues</h2>
            <p className="text-body mb-8">
              Post-decree matters can involve any aspect of your original divorce agreement. Tap each category to learn more about how we can help.
            </p>
            <div className="grid gap-4">
              {postDecreeTypes.map((type) => (
                <ExpandableCard key={type.title} title={type.title} icon={type.icon}>
                  {type.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "Your divorce was already stressful enough. Don't let your ex-spouse take advantage of a hard-won agreement."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>We help you enforce what's rightfully yours</p>
          </div>
        </section>

        {/* Modification vs Enforcement Comparison */}
        <section className="section-padding bg-navy">
          <div
            ref={compAnim.ref}
            className={`container max-w-4xl ${compAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Modification vs. Enforcement
            </h2>
            <div className="grid gap-6">
              {modificationVsEnforcement.map((item) => (
                <div key={item.aspect} className="grid md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2" style={{ color: "hsl(var(--green-accent))" }}>
                      {item.aspect}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Modification</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {item.modification}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Enforcement</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {item.enforcement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Protect What You Worked Hard to Achieve</h2>
            <div className="space-y-4 text-body">
              <p>
                You worked hard to reach a reasonable agreement during your divorce. Whether your former spouse is ignoring custody schedules, falling behind on support, or refusing to transfer property, our attorneys will fight to enforce your rights.
              </p>
              <p>
                If your own circumstances have changed and you need to modify the original terms, we can help you build a strong case for the court. Either way, acting quickly is essential to protecting your interests and your children's well-being.
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

        {/* Style 5: Offset Image with Navy Accent Block */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div
                className="absolute top-4 left-4 w-full h-full rounded-lg hidden md:block bg-navy"
              />
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney reviewing post-decree documents with client"
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
              <p className="text-body">How much do you know about post-decree matters in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <PostDecreeQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PostDecreeMatters;
