import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, Users, Clock, DollarSign, Heart, Home, Baby, CreditCard, FileCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const requirements = [
  {
    title: "Agree to All Terms Mutually",
    icon: Users,
    description: "Both parties must agree in advance on property distribution, debt division, child support, and spousal support. They should also agree to child-related issues such as visitation and custody. An experienced dissolution attorney can help you and your spouse discuss and resolve these matters before filing.",
  },
  {
    title: "Sign All Documents",
    icon: FileCheck,
    description: "Both parties must sign relevant documents including the separation agreement and dissolution petition. If you have children and plan to share parenting, the court will require a shared parenting plan dictating all parenting responsibilities and rights.",
  },
  {
    title: "Attend the Court Hearing",
    icon: Scale,
    description: "You and your partner must be physically present during the dissolution hearing. If the court cannot hear your case within 90 days due to absence, it must dismiss or convert the case to a divorce, leading to more time and expense.",
  },
  {
    title: "No Extramarital Offspring",
    icon: Baby,
    description: "All children born to the wife during the marriage should be the husband's descendants, and the wife should not be pregnant. Ohio presumes that offspring born during marriage belong to the husband. Dissolution proceedings don't allow the addition of third parties.",
  },
  {
    title: "Residency Requirement",
    icon: Home,
    description: "The husband or wife must have been residing in Ohio for six or more months before filing. This is required under Ohio Rev. Code § 3105.62 (2022).",
  },
];

const requiredDocuments = [
  "Petition for dissolution",
  "Separation agreement",
  "Affidavit of property",
  "Affidavit of expenses and income",
  "Parenting proceeding affidavit",
  "Shared parenting plan",
  "Health insurance affidavit",
  "Judgment entry",
];

const separationAgreementItems = [
  { label: "Alimony", icon: DollarSign },
  { label: "Child Support", icon: Heart },
  { label: "Property Division", icon: Home },
  { label: "Child Custody", icon: Users },
  { label: "Debt Allocation", icon: CreditCard },
];

const differences = [
  {
    aspect: "Agreement",
    dissolution: "Both parties must agree on all legal issues. Several states call this an 'uncontested divorce.'",
    divorce: "Involves prolonged proceedings and a trial before a final hearing. Often referred to as a 'contested divorce.'",
  },
  {
    aspect: "Speed & Ease",
    dissolution: "Does not force you into the many steps that come with divorce. Hearing must occur within 30 to 90 days of filing.",
    divorce: "You must go through all the legal steps. Finalizing the procedure takes significantly more time.",
  },
  {
    aspect: "Expenses",
    dissolution: "Allows a joint petition, meaning you can split filing charges ($150 to $400 depending on county).",
    divorce: "You bear the filing cost alone. The process is more complex, so you often require a lawyer.",
  },
];

const quizQuestions = [
  {
    question: "What is required for a dissolution of marriage in Ohio?",
    options: [
      "Only one spouse needs to agree",
      "Both spouses must agree on all terms",
      "A trial before a judge is mandatory",
      "You must be separated for one year first",
    ],
    correctIndex: 1,
    explanation: "Ohio dissolution requires both parties to mutually agree on all issues including property, support, and custody before filing a joint petition.",
  },
  {
    question: "How long after filing must the dissolution hearing occur?",
    options: [
      "Within 30 days",
      "Between 30 and 90 days",
      "Within 6 months",
      "There is no time limit",
    ],
    correctIndex: 1,
    explanation: "After filing the petition, at least 30 days must pass before the hearing, but the judge must hear your case within 90 days of filing.",
  },
  {
    question: "What happens if one spouse doesn't attend the dissolution hearing?",
    options: [
      "The hearing proceeds without them",
      "It is rescheduled automatically",
      "The case may be dismissed or converted to divorce",
      "The other spouse receives a default judgment",
    ],
    correctIndex: 2,
    explanation: "If the court cannot hear the case within 90 days due to a party's absence, it must dismiss or convert the case to a divorce, which costs more time and money.",
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

const DissolutionQuiz = () => {
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
            ? "Excellent! You understand Ohio dissolution law well."
            : score >= 2
            ? "Good knowledge! A consultation can clarify the details."
            : "Dissolution law has nuances. Let our team walk you through it."}
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

const Dissolution = () => {
  const { openConsultation } = useConsultation();
  const reqAnim = useScrollAnimation();
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
              Columbus, OH Dissolution Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Dissolution of Marriage Lawyer in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Ending a marriage doesn't have to be a stress-filled journey. If you and your spouse agree on all terms, dissolution offers a faster, more affordable alternative to divorce in Ohio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Is Dissolution */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is a Dissolution of Marriage in Ohio?</h2>
            <div className="space-y-4 text-body">
              <p>
                Marriage dissolution in Ohio is a no-fault proceeding where both husband and wife mutually agree to end their marriage legally. Both parties file a joint petition to terminate the marriage after signing a separation agreement.
              </p>
              <p>
                Unlike divorce, dissolution allows you to skip many costly steps. But you and your spouse must satisfy certain requirements, and you need to file all the required documents properly to avoid issues down the road.
              </p>
            </div>

            {/* Separation Agreement Items */}
            <div className="mt-8">
              <h3 className="heading-subsection text-xl mb-4">The Separation Agreement Covers:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {separationAgreementItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg text-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Style 3: Side-by-Side (Text Left, Image Right) */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">A Simpler Path Forward</h3>
                <p className="text-body">
                  When both spouses are on the same page, dissolution provides a streamlined legal process. Borshchak Law Group helps you navigate the paperwork, negotiate terms, and present your case to the court with confidence.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney and client shaking hands"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* How to File */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">How to File for Dissolution in Ohio</h2>
            <div className="space-y-4 text-body">
              <p>
                The first step is to obtain the standardized forms from the Ohio Judicial System. The Petition for Dissolution of Marriage and Waiver of Summons are the key documents. Confirm with the court clerk that you have all required forms.
              </p>
              <p>
                Both spouses are considered "plaintiffs" in Ohio dissolution law. You can file with the Court of Common Pleas in the county where you or your spouse have been living for the past 90 days. Filing fees range from <strong>$150 to $400</strong> depending on the county, and you and your spouse can split the charges.
              </p>
            </div>

            {/* Required Documents */}
            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary shrink-0 mt-1" />
                <h4 className="heading-subsection text-lg">Required Documents</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {requiredDocuments.map((doc) => (
                  <div key={doc} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                    <span className="text-body text-base">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">How Long Does Dissolution Take?</h2>
            <div className="space-y-4 text-body">
              <p>
                The timeline depends on how quickly you and your spouse reach a separation agreement. Once you've agreed and filed the petition, at least <strong>30 days</strong> must pass before the court hearing commences. The judge must hear your case within <strong>90 days</strong> of filing.
              </p>
              <p>
                At the hearing, the judge reviews the agreement and inquires about parenting, liabilities, and assets. If both parties are satisfied and in agreement, the judge grants the decision, and the separation agreement becomes a court order per Ohio Rev. Code §§ 3105.64, 3105.65.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="card-bordered text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">30 Days</p>
                <p className="text-sm text-muted-foreground mt-1">Minimum wait after filing</p>
              </div>
              <div className="card-bordered text-center">
                <Scale className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">90 Days</p>
                <p className="text-sm text-muted-foreground mt-1">Maximum time to hearing</p>
              </div>
              <div className="card-bordered text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">$150-$400</p>
                <p className="text-sm text-muted-foreground mt-1">Filing fee (split between spouses)</p>
              </div>
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
              "A smooth dissolution begins with the right guidance and mutual agreement."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Let our experienced attorneys simplify the process</p>
          </div>
        </section>

        {/* Requirements */}
        <section className="section-padding">
          <div
            ref={reqAnim.ref}
            className={`container max-w-4xl ${reqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Requirements for Dissolution in Ohio</h2>
            <p className="text-body mb-8">
              For dissolution to proceed, both parties must meet all of the following requirements. Tap each to learn more about what's involved.
            </p>
            <div className="grid gap-4">
              {requirements.map((req) => (
                <ExpandableCard key={req.title} title={req.title} icon={req.icon}>
                  {req.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Style 4: Full-Bleed Edge-to-Edge */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
          alt="Legal books and scales of justice"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Dissolution vs Divorce Comparison */}
        <section className="section-padding bg-navy">
          <div
            ref={diffAnim.ref}
            className={`container max-w-4xl ${diffAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Dissolution vs. Divorce in Ohio
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
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Dissolution</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.dissolution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Divorce</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.divorce}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Having a Lawyer */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Why You Need a Dissolution Attorney</h2>
            <div className="space-y-4 text-body">
              <p>
                You can file for dissolution in Ohio without an attorney's help. But going the DIY path can put you at a disadvantage, even if you've agreed with your spouse.
              </p>
              <p>
                An experienced lawyer ensures you have satisfied all the requirements and can pinpoint mistakes you might overlook during the filing process. They'll help you gather and complete all the required forms in one sitting, saving you the back-and-forth that courts demand.
              </p>
              <p>
                With our family law attorneys in Columbus, we walk with you from working out a separation agreement to ensuring you've met all the requirements and filed the petition. Contact us today for a no-cost consultation.
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

        {/* Style 6: Image with Caption Bar */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <img
              src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=1200&q=80"
              alt="Couple reviewing legal documents together"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
            />
            <p className="text-center text-sm text-muted-foreground italic mt-3">
              A dissolution of marriage allows both spouses to move forward together, with less conflict and lower costs.
            </p>
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
              <p className="text-body">How much do you know about dissolution in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <DissolutionQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dissolution;
