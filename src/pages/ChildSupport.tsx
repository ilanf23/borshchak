import { useState } from "react";
import { Phone, CheckCircle2, DollarSign, FileText, Calculator, Clock, Gavel, Scale, ChevronDown, ChevronUp, ArrowRight, BookOpen, HelpCircle, Trophy, Users, Baby, Briefcase, HeartHandshake, Shield, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const whatALawyerDoes = [
  {
    title: "Helps You Understand the Process",
    icon: BookOpen,
    description: "If it's your first time navigating child support, a lawyer ensures you know every step — from paperwork to hearings. They explain your rights, the actions you can take, and what to expect at each stage so the process is smooth and efficient.",
  },
  {
    title: "Assists With Implementation",
    icon: Gavel,
    description: "Every state has specific terms for setting up and implementing child support orders. A lawyer ensures the order is implemented correctly and that failure by either party to uphold their obligations results in appropriate legal consequences.",
  },
  {
    title: "Negotiates Payments",
    icon: HeartHandshake,
    description: "When you can't reach an agreement with the other parent, a lawyer negotiates on your behalf — diplomatically and amicably. They can serve child support orders, argue appeals, and handle the emotional complexity so you don't have to.",
  },
  {
    title: "Safeguards Your Rights",
    icon: Shield,
    description: "Family law is complex. A child support lawyer works to protect your interests for a fair outcome. If your rights are being denied or suppressed, they present your grievances and ensure they are considered in the final decision.",
  },
];

const calculationFactors = [
  { icon: DollarSign, title: "Combined Parental Income", description: "The gross annual income of both parents, including wages, bonuses, commissions, and other earnings." },
  { icon: Users, title: "Custody Arrangement", description: "The parenting time schedule and which parent has primary physical custody of the children." },
  { icon: Calculator, title: "Tax & Deductions", description: "Income tax paid, existing child support or spousal support obligations from other relationships." },
  { icon: Baby, title: "Childcare Costs", description: "Daycare, after-school care, and other childcare expenses for working or school-attending parents." },
  { icon: Shield, title: "Health Insurance", description: "Medical, dental, and vision insurance costs for the children, including premiums and out-of-pocket expenses." },
  { icon: Briefcase, title: "Income Percentage", description: "The parent with the higher income typically pays a larger percentage of the total child support obligation." },
];

const filingDocuments = [
  "A divorce decree, separation agreement, or court order for child support",
  "A signed acknowledgment of paternity (where applicable)",
  "Birth certificates for all children involved",
  "Detailed financial documents — bank statements, tax returns, proof of income and assets",
];

const quizQuestions = [
  {
    question: "How is child support typically calculated in Ohio?",
    options: [
      "A flat rate per child",
      "Based on combined parental income and a guidelines worksheet",
      "The judge decides without guidelines",
      "Each parent pays exactly 50%",
    ],
    correctIndex: 1,
    explanation: "Ohio uses the Child Support Guidelines worksheet, which factors in both parents' combined income, childcare costs, health insurance, and the custody arrangement to calculate the obligation.",
  },
  {
    question: "How long does a child support order typically last in Ohio?",
    options: [
      "Until the child turns 16",
      "Until the child turns 18, graduates high school, or is emancipated — whichever comes last",
      "Until the child turns 21",
      "Only while the child is in elementary school",
    ],
    correctIndex: 1,
    explanation: "Child support in Ohio remains active until the child turns 18, graduates from high school, or is emancipated — based on whichever event happens last. It can be extended for children with special needs.",
  },
  {
    question: "How are child support payments collected in Ohio?",
    options: [
      "Directly between parents",
      "Through a private mediator",
      "Via wage withholding through CSEA",
      "Through the child's school",
    ],
    correctIndex: 2,
    explanation: "Under Ohio law, child support payments are withheld directly from the obligor's wages and processed through the County Child Support Enforcement Agency (CSEA), which then distributes the funds to the receiving parent.",
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

const ChildSupportQuiz = () => {
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
            ? "You're well-informed about Ohio child support law."
            : score >= 2
            ? "Good knowledge! A consultation can fill in the rest."
            : "Child support law can be complex. Let our team guide you."}
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

const ChildSupport = () => {
  const { openConsultation } = useConsultation();
  const whatAnim = useScrollAnimation();
  const lawyerAnim = useScrollAnimation();
  const calcAnim = useScrollAnimation();
  const filingAnim = useScrollAnimation();
  const durationAnim = useScrollAnimation();
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
              Columbus, OH Child Support Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Child Support in Columbus, OH? Here's What You Need to Know
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Every parent wants the best for their child, even amidst separation or divorce. Understanding Ohio's child support laws is essential to ensuring your child's needs are met and your rights are protected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What Is Child Support */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={whatAnim.ref}
            className={`container max-w-4xl ${whatAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">What Is Child Support?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">The Obligation</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Child support is a monetary obligation owed by the noncustodial parent to the custodial parent for the support of their children after divorce or separation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Covers biological, adoptive, or acknowledged parents
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Court determines the amount based on state guidelines
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Part of divorce or legal separation proceedings
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Baby className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">The Purpose</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  The goal is to ensure both parents continue to provide and contribute to their children's wellbeing — regardless of the relationship between them.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Technically, the money belongs to the child
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Custodial parent manages the funds
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Ensures continuity of care for the children
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Child Support Agencies</h4>
                  <p className="text-body text-base">
                    In Ohio, child support can be established through the <strong>County Child Support Enforcement Agency (CSEA)</strong>, the Domestic Relations Court, or the Juvenile Court. Each county in Ohio has all three available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What a Lawyer Does */}
        <section className="section-padding">
          <div
            ref={lawyerAnim.ref}
            className={`container max-w-4xl ${lawyerAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">What a Child Support Lawyer Does for You</h2>
            <p className="text-body mb-8">
              While you don't always need a lawyer for child support hearings, having one can be instrumental. Tap each role below to learn more.
            </p>
            <div className="grid gap-4">
              {whatALawyerDoes.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* How Child Support Is Calculated */}
        <section className="section-padding bg-navy">
          <div
            ref={calcAnim.ref}
            className={`container max-w-4xl ${calcAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              How Child Support Is Calculated in Ohio
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
              Ohio uses the Child Support Guidelines worksheet to determine the amount owed. The worksheet considers all circumstances, income sources, and financial expenses of both parents to arrive at a fair figure.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {calculationFactors.map((factor) => (
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

        {/* Filing Process */}
        <section className="section-padding bg-card">
          <div
            ref={filingAnim.ref}
            className={`container max-w-4xl ${filingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Filing for Child Support in Ohio</h2>
            <div className="space-y-6 text-body">
              <p>
                The first step is completing an application through the County Child Support Enforcement Agency (CSEA) requesting a review for child support. Here's the process:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">1. Submit Application</h4>
                  <p className="text-body-sm text-base">Complete the CSEA application with all required documents and financial records.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">2. Case Assignment</h4>
                  <p className="text-body-sm text-base">Your case is assigned to a caseworker who locates the other parent and initiates proceedings.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">3. Hearing or Testing</h4>
                  <p className="text-body-sm text-base">You'll be notified of either a support hearing or genetic testing appointment if paternity is unestablished.</p>
                </div>
              </div>

              <div className="card-elevated mt-6">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="heading-subsection text-lg mb-2">Documents You'll Need</h4>
                    <div className="space-y-2 mt-3">
                      {filingDocuments.map((doc, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-body text-base">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Duration */}
        <section className="section-padding">
          <div
            ref={durationAnim.ref}
            className={`container max-w-4xl ${durationAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">How Long Does Child Support Last?</h2>
            <div className="space-y-6 text-body">
              <p>
                Child support orders in Ohio remain active until one of the following conditions is met — whichever happens <strong>last</strong>:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">Turns 18</h4>
                  <p className="text-body-sm text-base">The child reaches the age of majority (18 years old).</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">Graduates High School</h4>
                  <p className="text-body-sm text-base">Even if the child is 18, support continues until high school graduation.</p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">Emancipation</h4>
                  <p className="text-body-sm text-base">The child is legally emancipated by the court before turning 18.</p>
                </div>
              </div>
              <div className="card-elevated">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-body text-base">
                    <strong>Special needs exception:</strong> Child support orders can be extended beyond the standard duration if a child has special needs that require ongoing financial support.
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
              <p className="text-body">How much do you know about child support in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <ChildSupportQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChildSupport;
