import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, Heart, Shield, DollarSign, Users, Home, FileText, Scale, Clock, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const separationItems = [
  { title: "Alimony", icon: DollarSign, description: "The court can issue orders regarding spousal support payments, ensuring the lower-earning spouse maintains financial stability while the marriage remains legally intact." },
  { title: "Child Custody", icon: Users, description: "Parental rights and responsibilities are allocated, including where the children will live, visitation schedules, and decision-making authority for education, healthcare, and other important matters." },
  { title: "Child and Spousal Support", icon: Heart, description: "The court determines appropriate financial support obligations for both the children and the lower-earning spouse based on income, needs, and other statutory factors." },
  { title: "Property Division", icon: Home, description: "Marital property is divided between the spouses, including real estate, vehicles, bank accounts, and personal property, following Ohio's equitable distribution principles." },
  { title: "Debts and Assets", icon: FileText, description: "All marital debts and assets are identified, valued, and allocated between the parties. This includes mortgages, credit card debt, retirement accounts, and investments." },
];

const reasons = [
  { label: "Insurance Benefits", icon: Shield, description: "Health insurance, life insurance, and other benefits that depend on marital status can continue under a legal separation." },
  { label: "Retirement Benefits", icon: Briefcase, description: "Certain retirement and pension benefits require a minimum number of years of marriage. Legal separation preserves the marriage while allowing couples to live apart." },
  { label: "Religious or Personal Beliefs", icon: Heart, description: "Some couples have religious or personal convictions that prevent them from pursuing divorce but still need the protection of a court order." },
  { label: "Time to Reconcile", icon: Clock, description: "Legal separation provides structure and legal protections while giving the couple time and space to determine if reconciliation is possible." },
];

const comparisonRows = [
  { aspect: "Marital Status", separation: "Remain legally married", divorce: "Marriage is legally ended" },
  { aspect: "Insurance Benefits", separation: "May continue under spouse's plan", divorce: "Typically terminated" },
  { aspect: "Retirement Benefits", separation: "Marriage duration continues to accrue", divorce: "Divided at time of divorce" },
  { aspect: "Property Division", separation: "Court can divide property", divorce: "Court divides property" },
  { aspect: "Child Custody", separation: "Court issues custody orders", divorce: "Court issues custody orders" },
  { aspect: "Remarriage", separation: "Cannot remarry", divorce: "Free to remarry" },
  { aspect: "Conversion", separation: "Can convert to divorce later", divorce: "Final" },
];

const quizQuestions = [
  {
    question: "Does a legal separation end the marriage in Ohio?",
    options: [
      "Yes, it is the same as divorce",
      "No, the couple remains legally married",
      "Only after one year",
      "Only if both parties agree",
    ],
    correctIndex: 1,
    explanation: "A legal separation is a court order where the married couple remains married but lives separate and apart. It does not legally end the marriage.",
  },
  {
    question: "Which of the following can the court address in a legal separation?",
    options: [
      "Only property division",
      "Only child custody",
      "Property division, custody, and support",
      "None of the above",
    ],
    correctIndex: 2,
    explanation: "The court can issue orders regarding marital property division, allocation of parental rights and responsibilities, and spousal and child support during a legal separation.",
  },
  {
    question: "Can a legal separation be converted to a divorce?",
    options: [
      "No, you must start a new case",
      "Yes, either party can request conversion",
      "Only after 5 years",
      "Only with mutual consent",
    ],
    correctIndex: 1,
    explanation: "In Ohio, a legal separation can be converted to a divorce if either party decides they want to formally end the marriage.",
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
          <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-subsection text-lg">{title}</h4>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="mt-4 text-body text-base">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LegalSeparationQuiz = () => {
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
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
          <Trophy className="w-10 h-10" style={{ color: "hsl(var(--green-accent))" }} />
        </div>
        <h3 className="heading-section text-3xl">You scored {score}/{quizQuestions.length}!</h3>
        <p className="text-body">
          {score === 3 ? "Excellent understanding of legal separation." : score >= 2 ? "Good knowledge! A consultation can clarify the details." : "Legal separation has many nuances. Let our team guide you."}
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
        <span className="text-base font-medium text-muted-foreground">Question {currentQ + 1} of {quizQuestions.length}</span>
        <div className="flex gap-1">
          {quizQuestions.map((_, i) => (
            <div key={i} className="w-8 h-1.5 rounded-full" style={{ backgroundColor: i <= currentQ ? "hsl(var(--green-accent))" : "hsl(var(--border))" }} />
          ))}
        </div>
      </div>
      <h3 className="heading-subsection text-2xl">{q.question}</h3>
      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          let borderColor = "hsl(var(--border))";
          let bgColor = "transparent";
          if (answered && idx === q.correctIndex) { borderColor = "hsl(var(--green-accent))"; bgColor = "hsla(152, 45%, 38%, 0.08)"; }
          else if (answered && idx === selected && idx !== q.correctIndex) { borderColor = "hsl(var(--destructive))"; bgColor = "hsla(0, 72%, 51%, 0.05)"; }
          else if (idx === selected) { borderColor = "hsl(var(--primary))"; }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className="text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 text-body text-lg" style={{ borderColor, backgroundColor: bgColor }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg" style={{ backgroundColor: "hsl(var(--secondary))" }}>
          <p className="text-body text-base"><strong>{selected === q.correctIndex ? "Correct!" : "Not quite."}</strong> {q.explanation}</p>
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

const LegalSeparation = () => {
  const { openConsultation } = useConsultation();
  const itemsAnim = useScrollAnimation();
  const reasonsAnim = useScrollAnimation();
  const comparisonAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in" style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}>
              Columbus, OH Legal Separation Attorneys
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Legal Separation Attorney in Columbus
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              A legal separation allows married couples to live apart while remaining legally married. Our attorneys help you understand your options and protect your rights throughout the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Is Legal Separation */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is Legal Separation?</h2>
            <div className="space-y-4 text-body">
              <p>
                A legal separation is a court order where the married couple remains married but lives separate and apart. While the court order does not legally end the marriage, it does allow the court to issue orders regarding marital property division, the allocation of parental rights and responsibilities, and spousal and child support.
              </p>
              <p>
                There are many different reasons why a couple may choose legal separation rather than ending their marriage through dissolution or divorce. Some of these reasons include assurance that life insurance, health insurance, and retirement benefits continue as intended.
              </p>
              <p>
                The decision to separate is deeply personal, but understanding the legal implications can help you make an informed decision. An attorney at Borshchak Law Group in Columbus, OH can assist you in understanding the legal implications and walk you through the process, step by step.
              </p>
            </div>
          </div>
        </section>

        {/* Style 4: Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
          alt="Legal documents representing separation proceedings"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Why Choose Legal Separation */}
        <section className="section-padding">
          <div
            ref={reasonsAnim.ref}
            className={`container max-w-4xl ${reasonsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Why Choose Legal Separation?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((item) => (
                <div key={item.label} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">{item.label}</h3>
                  </div>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "Legal separation provides the structure and protections of a court order while preserving your marriage."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Ohio Family Law</p>
          </div>
        </section>

        {/* What the Process Entails */}
        <section className="section-padding bg-card">
          <div
            ref={itemsAnim.ref}
            className={`container max-w-4xl ${itemsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">What Does the Legal Separation Process Entail?</h2>
            <p className="text-body mb-8">
              Once you have made the decision to move forward, you will file a complaint for legal separation with the proper court. A separation agreement is an essential step and should be done with the advice of an experienced attorney. The court can issue orders on the following:
            </p>
            <div className="grid gap-4">
              {separationItems.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Style 3: Side-by-Side */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">Experienced and Dedicated Family Law Lawyers</h3>
                <p className="text-body">
                  We have the experience to help counsel you with thoughtful guidance through the legal separation process. Our attorneys understand the emotional complexity of this decision and provide compassionate, knowledgeable representation every step of the way.
                </p>
                <p className="text-body">
                  Whether you are considering legal separation for insurance benefits, personal beliefs, or as a step toward potential reconciliation, we are here to help you navigate the process with confidence.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney providing guidance on legal separation"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section-padding bg-card">
          <div
            ref={comparisonAnim.ref}
            className={`container max-w-4xl ${comparisonAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Legal Separation vs. Divorce</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-semibold text-lg border-b-2" style={{ borderColor: "hsl(var(--green-accent))" }}>Aspect</th>
                    <th className="text-left p-4 font-semibold text-lg border-b-2" style={{ borderColor: "hsl(var(--green-accent))" }}>Legal Separation</th>
                    <th className="text-left p-4 font-semibold text-lg border-b-2" style={{ borderColor: "hsl(var(--green-accent))" }}>Divorce</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={row.aspect} className={idx % 2 === 0 ? "" : "bg-secondary/30"}>
                      <td className="p-4 font-medium text-base">{row.aspect}</td>
                      <td className="p-4 text-body text-base">{row.separation}</td>
                      <td className="p-4 text-body text-base">{row.divorce}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Accent Block */}
        <section className="section-padding">
          <div className="container max-w-5xl">
            <div className="relative">
              <div className="absolute top-6 right-0 w-1/3 h-4/5 rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--navy))" }} />
              <div className="relative md:mr-12">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"
                  alt="Legal professional reviewing separation documents"
                  className="w-full md:w-4/5 h-72 md:h-96 object-cover rounded-lg relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="section-padding bg-card">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-base font-medium text-primary">Test Your Knowledge</span>
              </div>
              <h2 className="heading-section">Legal Separation Quiz</h2>
            </div>
            <div className="card-elevated">
              <LegalSeparationQuiz />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-3xl text-center ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6" style={{ color: "hsl(var(--primary-foreground))" }}>
              Understand Your Options
            </h2>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
              Whether you are considering legal separation or need guidance on your next steps, our experienced attorneys are ready to help. Contact us today for a free consultation.
            </p>
            <a href="tel:+13803240878" className="btn-cta inline-flex text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 380-324-0878
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalSeparation;
