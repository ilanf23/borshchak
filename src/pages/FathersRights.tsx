import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, Users, Home, DollarSign, Gavel, ChevronDown, ChevronUp, ArrowRight, BookOpen, HelpCircle, Shield, Clock, AlertTriangle, Heart, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import fathersRightsHero from "@/assets/fathers-rights-hero.jpg";

const legalHurdles = [
  {
    title: "Historical Judicial Bias Toward Mothers",
    icon: Scale,
    description:
      "Ohio law does not favor mothers over fathers. However, outdated perceptions can still influence outcomes. A skilled attorney ensures the court focuses on the statutory best-interest factors rather than assumptions about gender roles.",
  },
  {
    title: "Establishing Paternity as an Unmarried Father",
    icon: FileText,
    description:
      "Unmarried fathers have no automatic legal rights to their children in Ohio. You must first establish paternity, either through a voluntary acknowledgment of paternity or a court-ordered genetic test under ORC 3111, before you can seek custody or parenting time.",
  },
  {
    title: "Modifying an Existing Custody Order",
    icon: Gavel,
    description:
      "To modify custody in Ohio, you must demonstrate a substantial change in circumstances since the last order. Courts evaluate whether the modification serves the child's best interest, considering factors like each parent's living situation, the child's adjustment, and parental cooperation.",
  },
  {
    title: "Relocation Disputes",
    icon: Home,
    description:
      "When a custodial parent wants to move, it can disrupt established parenting time. Ohio courts require notice before relocation. Fathers can file a motion to prevent the move or adjust the parenting schedule to protect their relationship with the child.",
  },
  {
    title: "False Allegations During Custody Battles",
    icon: AlertTriangle,
    description:
      "False claims of abuse or neglect can severely impact a father's custody case. An experienced attorney can help gather evidence, request investigations, and present the truth to the court to protect your rights and your relationship with your children.",
  },
  {
    title: "Enforcing Parenting Time Orders",
    icon: Shield,
    description:
      "When a co-parent refuses to follow a court-ordered parenting schedule, Ohio law provides enforcement mechanisms including contempt of court motions. Documenting violations and acting quickly through the court system is critical to protecting your parenting time.",
  },
];

const faqItems = [
  {
    question: "Do fathers have equal custody rights in Ohio?",
    answer:
      "Yes. Ohio law does not give preference to either parent based on gender. Courts determine custody based on the best interest of the child under ORC 3109.04, evaluating factors such as each parent's relationship with the child, stability, and willingness to facilitate the other parent's relationship.",
  },
  {
    question: "How do I establish paternity in Ohio?",
    answer:
      "There are two primary ways: (1) signing a Voluntary Acknowledgment of Paternity at the hospital or through the local child support enforcement agency, or (2) filing a paternity action in court under ORC 3111, which may involve genetic testing. Once paternity is established, you can petition for custody and parenting time.",
  },
  {
    question: "Can an unmarried father get custody in Ohio?",
    answer:
      "Yes, but only after establishing legal paternity. Once paternity is confirmed, an unmarried father has the same right to seek custody as any other parent. The court will apply the same best-interest-of-the-child standard used in all custody cases.",
  },
  {
    question: "How is parenting time determined in Ohio?",
    answer:
      "Ohio courts determine parenting time based on ORC 3109.051, considering factors such as the child's age, each parent's schedule, the distance between homes, the child's school and community ties, and the parents' ability to cooperate. Many counties have standard parenting time guidelines as a starting point.",
  },
  {
    question: "What if the mother is denying my visitation rights?",
    answer:
      "If a co-parent is violating a court-ordered parenting schedule, you can file a motion for contempt of court. Document every denied visit with dates, times, and any communications. The court can enforce the order, modify the schedule, or hold the violating parent in contempt, which may include fines or changes to custody.",
  },
];

const quizQuestions = [
  {
    question: "Do Ohio courts automatically favor mothers in custody cases?",
    options: [
      "Yes, mothers always get custody",
      "No, Ohio law is gender-neutral",
      "Only if the child is under 5",
      "Only in divorce cases",
    ],
    correctIndex: 1,
    explanation:
      "Ohio law does not give preference to either parent based on gender. Courts determine custody based on the best interest of the child under ORC 3109.04.",
  },
  {
    question: "What must an unmarried father do before seeking custody in Ohio?",
    options: [
      "File for divorce",
      "Establish legal paternity",
      "Get a court-appointed attorney",
      "Wait until the child is school-aged",
    ],
    correctIndex: 1,
    explanation:
      "Unmarried fathers must first establish legal paternity, either through a Voluntary Acknowledgment of Paternity or a court-ordered genetic test under ORC 3111, before they can seek custody or parenting time.",
  },
  {
    question: "What standard do Ohio courts use to decide custody and parenting time?",
    options: [
      "Whoever earns more money",
      "The parent who filed first",
      "The best interest of the child",
      "Equal time for both parents automatically",
    ],
    correctIndex: 2,
    explanation:
      "Ohio courts use the 'best interest of the child' standard under ORC 3109.04, evaluating factors like the child's relationship with each parent, stability, and the parents' willingness to cooperate.",
  },
];

const FathersRightsQuiz = () => {
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
            ? "You're well-informed about father's rights in Ohio."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Father's rights law can be complex. Let our team guide you."}
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

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4">
      {faqItems.map((item, idx) => (
        <div
          key={idx}
          className="card-bordered hover:shadow-md transition-shadow duration-200 cursor-pointer"
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          <div className="flex items-center justify-between">
            <h4 className="heading-subsection text-lg pr-4">{item.question}</h4>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
          </div>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 text-body text-base">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const FathersRights = () => {
  const { openConsultation } = useConsultation();
  const rightsAnim = useScrollAnimation();
  const hurdlesAnim = useScrollAnimation();
  const issuesAnim = useScrollAnimation();
  const helpAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

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
              Columbus, OH Father's Rights Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Protecting Father's Rights in Columbus, Ohio
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Fathers deserve equal treatment in custody, child support, and parenting time decisions. Our attorneys fight to protect your rights and your relationship with your children under Ohio law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* Understanding Father's Rights in Ohio */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={rightsAnim.ref}
            className={`container max-w-4xl ${rightsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">Understanding Father's Rights in Ohio</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">Married Fathers</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  When a child is born during a marriage, the husband is presumed to be the legal father under Ohio law. This means parental rights are established automatically, including the right to custody and parenting time.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Paternity presumed through marriage
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Equal right to seek custody during divorce
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Court decides custody based on best interest of the child
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <FileText className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">Unmarried Fathers</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Unmarried fathers do not have automatic legal rights to their children in Ohio. You must first establish paternity, either through a Voluntary Acknowledgment of Paternity or a court-ordered genetic test, before seeking custody or parenting time.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Must establish paternity first
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Voluntary acknowledgment or court order
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Full custody rights once paternity is confirmed
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Paternity Law (ORC 3111)</h4>
                  <p className="text-body text-base">
                    Under Ohio Revised Code Section 3111, any man alleging to be the father of a child may bring an action to establish paternity. Once established, the father gains the legal standing to seek custody, parenting time, and decision-making authority, the same rights afforded to any parent under Ohio law.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Image+Text */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={fathersRightsHero}
                alt="Father spending quality time with his child"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Fighting for Equal Parenting Time</h3>
                <p className="text-body">
                  Ohio courts determine custody and parenting time based on the best interest of the child under ORC 3109.04. Factors include the child's relationship with each parent, each parent's living situation, the child's community ties, and the parents' willingness to cooperate. Fathers have every right to pursue equal or even majority parenting time when it serves the child's best interest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Issues — full-bleed with background image */}
        <section
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 18%, 0.88)" }} />
          <div
            ref={issuesAnim.ref}
            className={`container max-w-6xl relative z-10 ${issuesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            {/* Decorative squares */}
            <div className="flex items-center justify-center gap-1.5 mb-8">
              <span className="block w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
              <span className="block w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
              <span className="block w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
            </div>

            <h2
              className="text-center text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-wide uppercase mb-5"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Dedicated Advocates for Father's Rights
            </h2>
            <p
              className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Experienced Columbus Family Law Attorneys Protecting Fathers' Custody, Parenting Time, & Legal Rights
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {/* Column 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Custody & Shared Parenting
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
                  Ohio allows shared parenting plans where both parents retain decision-making authority. Courts evaluate cooperation, stability, and the child's wishes. Fathers can and do receive equal custody.
                </p>
              </div>

              {/* Column 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Parenting Time & Visitation
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
                  Under ORC 3109.051, non-residential parents are entitled to reasonable parenting time. Courts can award more time based on circumstances. Your rights go far beyond every-other-weekend.
                </p>
              </div>

              {/* Column 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Child Support Rights
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
                  Ohio calculates support based on both parents' incomes, number of children, and parenting time. Fathers have the right to request modifications when circumstances change, including income or schedule shifts.
                </p>
              </div>

              {/* Column 4 */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                  <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Paternity Establishment
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
                  Establishing paternity is the essential first step for unmarried fathers. Once confirmed through voluntary acknowledgment or court order, you gain the legal right to seek custody, parenting time, and decision-making authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Legal Hurdles Fathers Face */}
        <section className="section-padding">
          <div
            ref={hurdlesAnim.ref}
            className={`container max-w-4xl ${hurdlesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Common Legal Hurdles Fathers Face</h2>
            <p className="text-body mb-8">
              Fathers navigating the family court system often encounter unique challenges. Tap each issue below to learn more about how Ohio law addresses it.
            </p>
            <div className="grid gap-4">
              {legalHurdles.map((hurdle) => (
                <ExpandableCard key={hurdle.title} title={hurdle.title} icon={hurdle.icon}>
                  {hurdle.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              Every father's case is unique. Having experienced legal representation can make the difference between losing and protecting your parental rights.
            </p>
          </div>
        </section>

        {/* Full-Bleed Quote Section */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "The bond between a father and his child is one that the law must recognize, respect, and protect."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Borshchak Law Group</p>
          </div>
        </section>

        {/* How Borshchak Law Group Helps Fathers */}
        <section className="section-padding bg-card">
          <div
            ref={helpAnim.ref}
            className={`container max-w-4xl ${helpAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">How Borshchak Law Group Helps Fathers</h2>
            <div className="space-y-6 text-body">
              <p>
                Our attorneys understand the challenges fathers face in Ohio family court. Whether you need to establish paternity, fight for custody, or enforce a parenting time order, we provide strategic, aggressive representation focused on your goals.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">1. Case Evaluation</h4>
                  <p className="text-body-sm text-base">We assess your rights, paternity status, and goals to build a clear legal roadmap.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">2. Strategy & Negotiation</h4>
                  <p className="text-body-sm text-base">We build a strong case and negotiate with opposing counsel to reach favorable terms.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">3. Court Advocacy</h4>
                  <p className="text-body-sm text-base">When court proceedings are needed, we provide aggressive representation to protect your rights.</p>
                </div>
              </div>
              <p>
                At Borshchak Law Group, we believe every father deserves a fair chance in family court. Our Columbus, Ohio attorneys have the experience and dedication to fight for the outcome you and your children deserve.
              </p>
            </div>
          </div>
        </section>

        {/* Offset Image with Accent Block */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div
                className="absolute top-4 left-4 w-full h-full rounded-lg hidden md:block"
                style={{ backgroundColor: "hsl(var(--trust-navy))" }}
              />
              <img
                src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80"
                alt="Sunset over the ocean — a new beginning"
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
              <p className="text-body">How much do you know about father's rights in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <FathersRightsQuiz />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div
            ref={faqAnim.ref}
            className={`container max-w-2xl ${faqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">Frequently Asked Questions</h2>
              </div>
              <p className="text-body">Common questions about father's rights in Ohio.</p>
            </div>
            <FAQAccordion />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FathersRights;
