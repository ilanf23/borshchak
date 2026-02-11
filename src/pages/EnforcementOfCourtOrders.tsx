import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, DollarSign, Clock, Users, Gavel, ShieldAlert, FileWarning, Scale, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contemptReasons = [
  {
    title: "Not Paying Child or Spousal Support",
    icon: DollarSign,
    description: "When a party fails to make court-ordered support payments, the receiving party can file for contempt to compel payment. The court may order wage garnishment or other enforcement measures to ensure compliance.",
  },
  {
    title: "Not Following an Ordered Visitation Schedule",
    icon: Clock,
    description: "Refusing to follow the court-ordered parenting time schedule, including denying visitation or failing to return children on time, is a common basis for enforcement action.",
  },
  {
    title: "Not Relinquishing Marital Property",
    icon: ShieldAlert,
    description: "When a party refuses to transfer property as ordered in the divorce decree, such as a home, vehicle, or financial accounts, enforcement proceedings can compel compliance.",
  },
  {
    title: "Not Following Judge Rulings on Divorce or Custody",
    icon: Gavel,
    description: "Disregarding any aspect of a judge's ruling on divorce or child custody matters can result in enforcement action. This includes orders about decision-making, relocation, or other specific provisions.",
  },
];

const consequences = [
  { label: "Sanctions or Attorney Fees", icon: DollarSign, description: "The violating party may be ordered to pay financial sanctions and cover the other party's attorney fees for bringing the enforcement action." },
  { label: "Wage Garnishment", icon: FileWarning, description: "For support-related violations, the court can order that payments be deducted directly from the violator's wages." },
  { label: "Jail Time", icon: AlertTriangle, description: "In serious cases of willful noncompliance, the court may sentence the offending party to jail as a means of enforcing the order." },
];

const provingContempt = [
  { step: "Knowledge of the Order", description: "The party knew about the court order and its requirements." },
  { step: "Willful Violation", description: "The party willingly violated the order, not through accident or inability." },
  { step: "No Valid Excuse", description: "The party does not have a valid excuse or justification for the violation." },
];

const quizQuestions = [
  {
    question: "What should you do if someone is not complying with a court order?",
    options: [
      "Wait and hope they eventually comply",
      "File for contempt of court and request enforcement",
      "Confront them directly",
      "Nothing can be done",
    ],
    correctIndex: 1,
    explanation: "When a party fails to follow a court order, you may file for contempt of court and request that the court take steps to enforce the order.",
  },
  {
    question: "What three things must be proven to establish contempt in Ohio?",
    options: [
      "Intent, motive, and opportunity",
      "Knowledge of the order, willful violation, and no valid excuse",
      "Financial ability, written notice, and witness testimony",
      "Prior offenses, severity, and duration",
    ],
    correctIndex: 1,
    explanation: "Proving contempt in Ohio requires showing that the party knew about the order, that they willingly violated the order, and that they do not have a valid excuse for the violation.",
  },
  {
    question: "What consequences can result from being found in contempt?",
    options: [
      "Only a verbal warning",
      "Sanctions, attorney fees, wage garnishment, or jail",
      "Automatic divorce",
      "Community service only",
    ],
    correctIndex: 1,
    explanation: "If found in contempt, a party could be ordered to pay sanctions or attorney fees, have wages garnished, or in some cases be sentenced to jail.",
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

const EnforcementQuiz = () => {
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
          {score === 3 ? "Excellent understanding of enforcement proceedings." : score >= 2 ? "Good knowledge! A consultation can help with the specifics." : "Enforcement law is complex. Let our team guide you."}
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

const EnforcementOfCourtOrders = () => {
  const { openConsultation } = useConsultation();
  const reasonsAnim = useScrollAnimation();
  const consequencesAnim = useScrollAnimation();
  const provingAnim = useScrollAnimation();
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
              Columbus, OH Enforcement Attorneys
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Enforcement of Court Orders Attorney in Columbus
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              When a party fails to follow a court order, you may file for contempt of court and request that the court take steps to enforce the order. Our attorneys are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">When Court Orders Are Not Followed</h2>
            <div className="space-y-4 text-body">
              <p>
                What do you do if a party is failing to comply with a court order in Ohio? When a party fails to follow a court order, you may file for contempt of court and request that the court take steps to enforce the order.
              </p>
              <p>
                Before filing a contempt, it is essential that there is proof to back up your claim. Our Columbus-based family law attorneys at Borshchak Law Group can help you gather the necessary evidence and take all the proper steps to get a favorable result.
              </p>
            </div>
          </div>
        </section>

        {/* Style 4: Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
          alt="Courtroom representing enforcement proceedings"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Reasons for Filing */}
        <section className="section-padding">
          <div
            ref={reasonsAnim.ref}
            className={`container max-w-4xl ${reasonsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Common Reasons for Filing Contempt</h2>
            <p className="text-body mb-8">
              A few reasons for filing for contempt include the following. Tap each to learn more.
            </p>
            <div className="grid gap-4">
              {contemptReasons.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
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
              "Proving a contempt in Ohio requires showing that the party knew about the order, willingly violated it, and does not have a valid excuse."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Ohio Family Law</p>
          </div>
        </section>

        {/* What Happens After Filing */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Happens After You File?</h2>
            <div className="space-y-4 text-body">
              <p>
                If a contempt is filed, a hearing will be held where the court will hear testimony, review evidence submitted, and then make a ruling on whether or not the offending party violated the court order.
              </p>
            </div>
          </div>
        </section>

        {/* Proving Contempt */}
        <section className="section-padding">
          <div
            ref={provingAnim.ref}
            className={`container max-w-4xl ${provingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Three Elements to Prove Contempt</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {provingContempt.map((item, idx) => (
                <div key={item.step} className="card-elevated text-center">
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                    <span className="text-2xl font-bold text-primary">{idx + 1}</span>
                  </div>
                  <h3 className="heading-subsection text-xl mb-3">{item.step}</h3>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 3: Side-by-Side */}
        <section className="section-padding-sm bg-card">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">Taking the Proper Steps</h3>
                <p className="text-body">
                  Call us today to ensure that you are taking all of the proper necessary steps to get a favorable result in the enforcement of your court order. Our Columbus-based family law attorneys at Borshchak Law Group are ready and able to assist you.
                </p>
                <p className="text-body">
                  Having experienced legal counsel ensures your case is presented with the right evidence and legal arguments to maximize your chances of a successful enforcement.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney guiding client through enforcement process"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Consequences */}
        <section className="section-padding">
          <div
            ref={consequencesAnim.ref}
            className={`container max-w-4xl ${consequencesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Potential Consequences of Contempt</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {consequences.map((item) => (
                <div key={item.label} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-lg">{item.label}</h3>
                  </div>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Accent Block */}
        <section className="section-padding bg-card">
          <div className="container max-w-5xl">
            <div className="relative">
              <div className="absolute top-6 right-0 w-1/3 h-4/5 rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--navy))" }} />
              <div className="relative md:mr-12">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                  alt="Legal professional reviewing enforcement case"
                  className="w-full md:w-4/5 h-72 md:h-96 object-cover rounded-lg relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="section-padding">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-base font-medium text-primary">Test Your Knowledge</span>
              </div>
              <h2 className="heading-section">Enforcement Quiz</h2>
            </div>
            <div className="card-elevated">
              <EnforcementQuiz />
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
              Enforce Your Court Orders
            </h2>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
              Do not let noncompliance go unchecked. Contact our experienced attorneys today for a free consultation and take the proper steps to enforce your court order.
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

export default EnforcementOfCourtOrders;
