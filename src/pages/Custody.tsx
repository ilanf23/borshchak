import { useState } from "react";
import { Phone, CheckCircle2, Users, Shield, Home, Heart, Gavel, Scale, ChevronDown, ChevronUp, ArrowRight, BookOpen, HelpCircle, Trophy, AlertTriangle, Baby, Brain, MessageCircle, Eye, HandHeart, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const custodyTypes = [
  {
    title: "Physical Custody",
    icon: Home,
    description: "Physical custody determines where the child lives on a day-to-day basis. The parent with physical custody provides the child's primary residence and handles daily care, including meals, transportation, and routine activities.",
  },
  {
    title: "Legal Custody",
    icon: Scale,
    description: "Legal custody refers to the right to make major decisions about the child's life — including education, healthcare, religious upbringing, and extracurricular activities. A parent with legal custody has authority over these important choices.",
  },
  {
    title: "Sole Physical Custody",
    icon: Shield,
    description: "When one parent is granted sole physical custody, the child lives primarily with that parent. The non-custodial parent typically receives visitation or parenting time, but the child's main home is with the custodial parent.",
  },
  {
    title: "Joint Physical Custody",
    icon: Users,
    description: "Joint physical custody means the child splits time living with both parents. The schedule doesn't have to be exactly 50/50 — it's designed around the child's best interests and each parent's availability and living situation.",
  },
  {
    title: "Sole Legal Custody",
    icon: Gavel,
    description: "With sole legal custody, one parent has exclusive authority to make all major decisions for the child. This is typically granted when one parent is unfit, absent, or when parents are unable to cooperate on decision-making.",
  },
  {
    title: "Joint Legal Custody",
    icon: HandHeart,
    description: "Joint legal custody means both parents share the right and responsibility to make important decisions about the child's welfare. Both parents must communicate and agree on matters like schooling, medical treatment, and religious instruction.",
  },
  {
    title: "Grandparent Visitation Rights",
    icon: Heart,
    description: "In Ohio, grandparents can petition the court for visitation rights under certain circumstances — such as when the child's parents are divorced, separated, or when one parent is deceased. The court must find that visitation serves the child's best interest.",
  },
];

const courtFactors = [
  { icon: AlertTriangle, title: "Domestic Violence or Abuse", description: "Any history of domestic violence, child abuse, or neglect by either parent is a critical factor in custody decisions." },
  { icon: Brain, title: "Substance Abuse History", description: "Alcohol or drug abuse by either parent that could endanger the child's physical or emotional safety." },
  { icon: Eye, title: "Psychiatric Concerns", description: "Mental health issues affecting a parent's ability to provide safe, stable care for the child." },
  { icon: Baby, title: "Age-Appropriate Decisions", description: "Each parent's ability to make decisions that are appropriate for the child's developmental stage and needs." },
  { icon: MessageCircle, title: "Communication with the Child", description: "The quality of each parent's relationship and communication with the child, including emotional bonds." },
  { icon: Home, title: "Safe Living Conditions", description: "Whether each parent can provide a safe, adequate, and stable living environment for the child." },
  { icon: Users, title: "Child's Own Preferences", description: "For older children, the court may consider the child's own wishes regarding which parent they prefer to live with." },
];

const quizQuestions = [
  {
    question: "In Ohio, if parents are unmarried, who typically gets initial custody?",
    options: ["The father", "The mother", "Both parents equally", "The state decides"],
    correctIndex: 1,
    explanation: "Under Ohio law, if parents are unmarried and no court order exists, the mother is presumed to have sole custody of the child.",
  },
  {
    question: "What standard do Ohio courts use to decide custody?",
    options: ["Which parent earns more", "Best interests of the child", "Who filed for custody first", "Equal time for both parents"],
    correctIndex: 1,
    explanation: "Ohio courts use the 'best interests of the child' standard, weighing factors like safety, parental fitness, and the child's relationships.",
  },
  {
    question: "Can grandparents petition for visitation rights in Ohio?",
    options: ["No, never", "Only if both parents agree", "Yes, if it serves the child's best interest", "Only if a parent is deceased"],
    correctIndex: 2,
    explanation: "Yes, Ohio law allows grandparents to petition for visitation rights, but they must demonstrate that visitation serves the child's best interest.",
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

const CustodyQuiz = () => {
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
            ? "You're well-informed about Ohio custody law."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Custody law can be complex. Let our team guide you."}
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

const Custody = () => {
  const { openConsultation } = useConsultation();
  const methodsAnim = useScrollAnimation();
  const typesAnim = useScrollAnimation();
  const factorsAnim = useScrollAnimation();
  const modAnim = useScrollAnimation();
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
              Columbus, OH Child Custody Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Child Custody in Columbus, OH? Here's How We Protect Your Family
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Custody decisions shape your family for years to come. Whether you're navigating an initial determination or modifying an existing order, understanding Ohio custody law is essential to protecting your relationship with your children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* Custody Allocation Methods */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={methodsAnim.ref}
            className={`container max-w-4xl ${methodsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">How Custody Is Allocated in Ohio</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">Sole Custody</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  One parent holds primary rights and responsibilities for the child. The non-custodial parent may still receive parenting time or visitation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    One parent makes major decisions
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Child primarily resides with custodial parent
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Common when co-parenting isn't feasible
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Users className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">Shared Parenting</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Both parents divide rights and responsibilities through a shared parenting plan approved by the court. This doesn't always mean equal time — it's about shared decision-making.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Both parents share decision-making
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Requires a detailed parenting plan
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Encourages cooperation between parents
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Law: Unmarried Parents</h4>
                  <p className="text-body text-base">
                    Under Ohio law, if parents are <strong>unmarried</strong> and no court order has been issued, the mother is presumed to have sole custody of the child. The father must establish paternity and file for custody or visitation rights through the court.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Custody */}
        <section className="section-padding">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Types of Custody in Ohio</h2>
            <p className="text-body mb-8">
              Ohio recognizes several types of custody arrangements. Tap each type below to learn how it works and when it applies.
            </p>
            <div className="grid gap-4">
              {custodyTypes.map((type) => (
                <ExpandableCard key={type.title} title={type.title} icon={type.icon}>
                  {type.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* How Courts Decide */}
        <section className="section-padding bg-navy">
          <div
            ref={factorsAnim.ref}
            className={`container max-w-4xl ${factorsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              How Ohio Courts Decide Custody
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courtFactors.map((factor) => (
                <div key={factor.title} className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <factor.icon className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                      {factor.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custody Modification */}
        <section className="section-padding bg-card">
          <div
            ref={modAnim.ref}
            className={`container max-w-4xl ${modAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Modifying a Custody Order</h2>
            <div className="space-y-6 text-body">
              <p>
                Life changes — and sometimes custody orders need to change too. Ohio courts allow modifications when circumstances have significantly changed since the original order was issued.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">1. Change in Circumstances</h4>
                  <p className="text-body-sm text-base">Relocation, financial change, remarriage, or safety concerns that affect the child.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">2. File a Motion</h4>
                  <p className="text-body-sm text-base">Submit a formal modification request to the court with supporting documentation.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">3. Court Review</h4>
                  <p className="text-body-sm text-base">The judge evaluates whether the proposed change serves the child's best interest.</p>
                </div>
              </div>
              <p>
                An experienced custody attorney can help you build a strong case for modification and present compelling evidence to the court.
              </p>
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
              <p className="text-body">How much do you know about child custody in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <CustodyQuiz />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-navy">
          <div className="container max-w-2xl text-center">
            <h2
              className="heading-section mb-4"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Protect Your Relationship With Your Children
            </h2>
            <p className="text-xl leading-relaxed mb-8" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
              At Borshchak Law Group, we fight for custody arrangements that protect your parental rights while prioritizing your children's wellbeing. Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us: 380-324-0878
              </a>
              <button onClick={openConsultation} className="btn-secondary" style={{ borderColor: "hsl(var(--primary-foreground))", color: "hsl(var(--primary-foreground))" }}>
                Request a Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Custody;
