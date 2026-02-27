import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, AlertTriangle, Gavel, DollarSign, Clock, Users, ShieldAlert, FileWarning, Ban, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const contemptExamples = [
  {
    title: "Failure to Pay Child or Spousal Support",
    icon: DollarSign,
    description: "When a parent or former spouse fails to make court-ordered support payments, the receiving party can file a motion for contempt. The court may order wage garnishment, impose fines, or even jail time to enforce compliance.",
  },
  {
    title: "Violating a Visitation Schedule",
    icon: Clock,
    description: "Refusing to follow the court-ordered parenting time schedule, whether by denying visitation or failing to return children on time, constitutes contempt. The court takes these violations seriously to protect the child's relationship with both parents.",
  },
  {
    title: "Refusing to Relinquish Marital Property",
    icon: ShieldAlert,
    description: "When a party refuses to transfer property as ordered in the divorce decree, such as a vehicle, real estate, or financial accounts, the other party can seek a contempt finding to enforce the order.",
  },
  {
    title: "Ignoring Custody or Divorce Rulings",
    icon: Gavel,
    description: "Disregarding any aspect of a judge's ruling on divorce or child custody matters can result in contempt proceedings. This includes failing to follow requirements about relocation, communication, or decision-making authority.",
  },
];

const consequences = [
  { label: "Fines", icon: DollarSign, description: "Monetary penalties imposed to compel compliance with the court order." },
  { label: "Imprisonment", icon: Ban, description: "Jail time may be ordered for willful and repeated violations of court orders." },
  { label: "Wage Garnishment", icon: FileWarning, description: "In child support cases, the court can order direct deductions from the violator's paycheck." },
  { label: "Corrective Orders", icon: Scale, description: "Additional court orders designed to remedy the contempt and prevent future violations." },
];

const quizQuestions = [
  {
    question: "What must be proven to find someone in contempt of court?",
    options: [
      "That they forgot about the court order",
      "That they willfully ignored a court order",
      "That they disagreed with the ruling",
      "That they missed one payment",
    ],
    correctIndex: 1,
    explanation: "To find a violation of a court order, the offended party must prove that the offender willfully ignored the court's order. Accidental or unintentional noncompliance may not qualify as contempt.",
  },
  {
    question: "Which of the following can result from a contempt finding?",
    options: [
      "Only a verbal warning",
      "Fines, imprisonment, or wage garnishment",
      "Automatic divorce",
      "Loss of citizenship",
    ],
    correctIndex: 1,
    explanation: "Consequences for contempt of court include fines, imprisonment, wage garnishment (especially in child support cases), and other corrective measures to enforce compliance.",
  },
  {
    question: "Can contempt proceedings be used to enforce a visitation schedule?",
    options: [
      "No, visitation is not enforceable",
      "Only if both parents agree",
      "Yes, violating a court-ordered schedule can lead to contempt",
      "Only in cases involving child support",
    ],
    correctIndex: 2,
    explanation: "Failing to follow a court-ordered visitation schedule is a common basis for contempt proceedings. The court enforces parenting time orders to protect the child's best interests.",
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

const ContemptQuiz = () => {
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
          {score === 3
            ? "Excellent understanding of contempt proceedings."
            : score >= 2
            ? "Good knowledge! A consultation can clarify the details."
            : "Contempt law can be complex. Let our team guide you."}
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

const ContemptProceedings = () => {
  const { openConsultation } = useConsultation();
  const examplesAnim = useScrollAnimation();
  const consequencesAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in" style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}>
              Columbus, OH Contempt Proceedings Attorneys
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Contempt Proceedings Attorney in Columbus
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              When the opposing party refuses to follow the court's decision, that may constitute contempt. Our attorneys help enforce court orders and protect your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is Contempt of Court?</h2>
            <div className="space-y-4 text-body">
              <p>
                Emotionally charged family law proceedings do not always wrap up neatly. The opposing party's refusal to follow the court's decision may be an act of court contempt. To find a violation of a court order, the offended party must prove that the offender willfully ignored a court order.
              </p>
              <p>
                Contempt proceedings provide a legal mechanism to enforce court orders when one party fails to comply. Whether the issue involves unpaid support, custody violations, or property disputes, the court has tools to compel compliance and hold violators accountable.
              </p>
            </div>
          </div>
        </section>

        {/* Style 4: Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
          alt="Courtroom setting representing contempt proceedings"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* What Qualifies as Contempt */}
        <section className="section-padding">
          <div
            ref={examplesAnim.ref}
            className={`container max-w-4xl ${examplesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">What Qualifies as Family Court Contempt?</h2>
            <p className="text-body mb-8">
              Court contempt can include many things. Tap each category to learn more about common violations.
            </p>
            <div className="grid gap-4">
              {contemptExamples.map((item) => (
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
              "The offended party must prove that the offender willfully ignored a court order to establish contempt."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Ohio Family Law</p>
          </div>
        </section>

        {/* Consequences */}
        <section className="section-padding bg-card">
          <div
            ref={consequencesAnim.ref}
            className={`container max-w-4xl ${consequencesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Consequences of Contempt</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {consequences.map((item) => (
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

        {/* Style 3: Side-by-Side */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney meeting with client about enforcement"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Protecting Your Court-Ordered Rights</h3>
                <p className="text-body">
                  When someone disregards a court order, you have the right to seek enforcement. Our experienced attorneys understand the urgency of these situations and work diligently to hold the violating party accountable, whether the issue involves support payments, custody arrangements, or property transfers.
                </p>
                <p className="text-body">
                  We guide you through every step of the contempt process, from filing the motion to presenting evidence in court, ensuring your rights and your family's well-being are protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Accent Block */}
        <section className="section-padding bg-card">
          <div className="container max-w-5xl">
            <div className="relative">
              <div className="absolute top-6 left-0 w-1/3 h-4/5 rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--navy))" }} />
              <div className="relative md:ml-12">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                  alt="Legal professional reviewing contempt case documents"
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
              <h2 className="heading-section">Contempt Proceedings Quiz</h2>
              <p className="text-body text-sm italic mt-1">For informational purposes only. This is not legal advice.</p>
            </div>
            <div className="card-elevated">
              <ContemptQuiz />
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
              If someone is violating a court order, you do not have to accept it. Contact our experienced contempt proceedings attorneys today for a free consultation.
            </p>
            <a href="tel:+16146624043" className="btn-cta inline-flex text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 614-662-4043
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContemptProceedings;
