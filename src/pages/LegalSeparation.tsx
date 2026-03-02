import { useState, useRef } from "react";
import {
  Phone,
  ChevronDown,
  HelpCircle,
  Heart,
  Shield,
  DollarSign,
  Users,
  Home,
  FileText,
  Scale,
  Clock,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const separationItems = [
  {
    title: "Alimony",
    icon: DollarSign,
    description:
      "The court can issue orders regarding spousal support payments, ensuring the lower-earning spouse maintains financial stability while the marriage remains legally intact. Ohio courts consider factors such as the duration of the marriage, each spouse's income and earning ability, and the standard of living established during the marriage. Unlike divorce, a legal separation preserves the marital relationship, which can affect how support is calculated and modified over time. An experienced attorney can help you understand what level of support is reasonable and advocate for an arrangement that protects your financial future.",
  },
  {
    title: "Child Custody",
    icon: Users,
    description:
      "Parental rights and responsibilities are allocated, including where the children will live, visitation schedules, and decision-making authority for education, healthcare, and other important matters. Ohio courts apply the 'best interest of the child' standard under Section 3109.04 of the Ohio Revised Code, weighing factors such as each parent's relationship with the child, the child's adjustment to home and school, and the mental and physical health of all parties involved. Because custody orders in a legal separation carry the same legal weight as those in a divorce, it is critical to have skilled legal representation from the outset. Your attorney will help you build a strong case for the custody arrangement that best serves your children's needs.",
  },
  {
    title: "Child and Spousal Support",
    icon: Heart,
    description:
      "The court determines appropriate financial support obligations for both the children and the lower-earning spouse based on income, needs, and other statutory factors. Ohio uses specific child support guidelines that take into account combined parental income, the number of children, healthcare costs, and childcare expenses. Spousal support is evaluated separately, considering the length of the marriage, each party's earning capacity, and contributions to the household. An attorney can help ensure that support calculations are accurate and that any special circumstances — such as a spouse's disability or a child's special needs — are properly presented to the court.",
  },
  {
    title: "Property Division",
    icon: Home,
    description:
      "Marital property is divided between the spouses, including real estate, vehicles, bank accounts, and personal property, following Ohio's equitable distribution principles. Equitable does not necessarily mean equal — the court considers factors such as the duration of the marriage, each spouse's assets and liabilities, and the desirability of awarding the family home to the custodial parent. Separate property, such as assets owned before the marriage or received as gifts or inheritances, is generally excluded from division. An attorney can help you identify, value, and protect your interest in marital and separate property throughout the process.",
  },
  {
    title: "Debts and Assets",
    icon: FileText,
    description:
      "All marital debts and assets are identified, valued, and allocated between the parties. This includes mortgages, credit card debt, retirement accounts, investments, and business interests. Ohio law requires full financial disclosure from both spouses, and failure to disclose assets can result in sanctions from the court. Complex assets such as pensions, stock options, and closely held businesses may require professional valuation. Your attorney will work to ensure that the division of debts and assets is fair and that you are not left responsible for obligations that should be shared.",
  },
];

const reasons = [
  {
    label: "Insurance Benefits",
    icon: Shield,
    description:
      "Health insurance, life insurance, and other benefits that depend on marital status can continue under a legal separation. Many employer-sponsored health plans allow a spouse to remain covered as long as the marriage is intact. Losing coverage through divorce can be costly, particularly if one spouse has a pre-existing condition or limited access to employer-provided insurance. Legal separation allows you to maintain these critical benefits while still establishing court-ordered protections.",
  },
  {
    label: "Retirement Benefits",
    icon: Briefcase,
    description:
      "Certain retirement and pension benefits require a minimum number of years of marriage. Legal separation preserves the marriage while allowing couples to live apart. For example, Social Security spousal benefits require at least ten years of marriage, and some military and federal pension plans have similar thresholds. By choosing legal separation instead of divorce, you may be able to preserve eligibility for these benefits while still obtaining court-ordered support and property division.",
  },
  {
    label: "Religious or Personal Beliefs",
    icon: Heart,
    description:
      "Some couples have religious or personal convictions that prevent them from pursuing divorce but still need the protection of a court order. Legal separation respects those beliefs while providing enforceable arrangements for custody, support, and property. The court treats separation orders with the same seriousness as divorce decrees, meaning violations can result in contempt of court. This option allows you to honor your values without sacrificing the legal protections you and your family need.",
  },
  {
    label: "Time to Reconcile",
    icon: Clock,
    description:
      "Legal separation provides structure and legal protections while giving the couple time and space to determine if reconciliation is possible. Unlike an informal arrangement, a legal separation creates enforceable court orders that protect both parties during the trial period. If reconciliation succeeds, the separation can be dismissed. If not, either spouse can petition to convert the legal separation into a divorce at any time, without starting the process from scratch.",
  },
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
    explanation:
      "A legal separation is a court order where the married couple remains married but lives separate and apart. It does not legally end the marriage.",
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
    explanation:
      "The court can issue orders regarding marital property division, allocation of parental rights and responsibilities, and spousal and child support during a legal separation.",
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
    explanation:
      "In Ohio, a legal separation can be converted to a divorce if either party decides they want to formally end the marriage.",
  },
];

const faqItems = [
  {
    question: "What is the difference between legal separation and divorce?",
    answer:
      "A legal separation allows you to live apart and divide property, custody, and support without ending the marriage. You remain legally married, which may be important for health insurance, religious beliefs, or tax purposes. Either spouse can later convert the separation into a divorce.",
  },
  {
    question: "Why choose legal separation over divorce?",
    answer:
      "Some couples choose legal separation for religious reasons, to maintain health insurance benefits, for tax advantages, or because they hope to reconcile. Legal separation provides the same court-ordered protections as divorce regarding property, custody, and support.",
  },
  {
    question: "How long does a legal separation last?",
    answer:
      "A legal separation can last indefinitely. There is no requirement to convert it into a divorce. However, either spouse can petition the court to convert the legal separation into a divorce at any time.",
  },
  {
    question: "Can I date during a legal separation?",
    answer:
      "While you are technically still married during a legal separation, Ohio is a no-fault state for dissolution purposes. However, dating during separation could potentially affect spousal support decisions or custody proceedings if the court finds it impacts the children.",
  },
  {
    question: "Do I need to live in Ohio to file for legal separation?",
    answer:
      "Yes. To file for legal separation in Ohio, at least one spouse must have been a resident of the state for at least six months. The case is typically filed in the county where either spouse resides.",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

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
      className="card-bordered transition-all duration-300 cursor-pointer hover:shadow-md hover:border-accent"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
              open ? "bg-accent text-white" : ""
            )}
            style={
              !open ? { backgroundColor: "hsl(var(--secondary))" } : undefined
            }
          >
            <Icon
              className={cn("w-5 h-5", open ? "text-white" : "text-primary")}
            />
          </div>
          <h4 className="heading-subsection text-lg">{title}</h4>
        </div>
        <ChevronDown
          className="w-5 h-5 text-muted-foreground transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-body text-base">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

const LegalSeparation = () => {
  const { openConsultation } = useConsultation();
  const itemsAnim = useScrollAnimation();
  const reasonsAnim = useScrollAnimation();
  const comparisonAnim = useScrollAnimation();
  const quoteAnim = useScrollAnimation(0.2, "scale");
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaContentAnim = useScrollAnimation(0.2);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* 1. Hero */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Columbus, OH Legal Separation Attorneys
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Legal Separation Attorney in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              A legal separation allows married couples to live apart while
              remaining legally married. Our attorneys help you understand your
              options and protect your rights throughout the process.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. What Is Legal Separation */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">
              What Is Legal Separation?
            </h2>
            <div className="space-y-4 text-body">
              <p>
                A legal separation is a court order where the married couple
                remains married but lives separate and apart. While the court
                order does not legally end the marriage, it does allow the court
                to issue orders regarding marital property division, the
                allocation of parental rights and responsibilities, and spousal
                and child support.
              </p>
              <p>
                There are many different reasons why a couple may choose legal
                separation rather than ending their marriage through dissolution
                or divorce. Some of these reasons include assurance that life
                insurance, health insurance, and retirement benefits continue as
                intended.
              </p>
              <p>
                The decision to separate is deeply personal, but understanding
                the legal implications can help you make an informed decision.
                An attorney at Borshchak Law Group in Columbus, OH can assist
                you in understanding the legal implications and walk you through
                the process, step by step.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Edge-to-Edge Image */}
        {/* ---------------------------------------------------------------- */}
        <img
          src="https://images.unsplash.com/photo-1500534314263-a834e29a41e7?w=1600&q=80"
          alt="Lone tree symbolizing a new path forward"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* ---------------------------------------------------------------- */}
        {/* 4. Why Choose Legal Separation */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div
            ref={reasonsAnim.ref}
            className={`container max-w-4xl ${reasonsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Why Choose Legal Separation?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((item) => (
                <div key={item.label} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "hsl(var(--secondary))",
                      }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534314263-a834e29a41e7?w=1600&q=80')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }}
          />
          <div
            ref={quoteAnim.ref}
            className={`relative z-10 text-center px-6 max-w-3xl ${quoteAnim.isVisible ? "scroll-visible-scale" : "scroll-hidden-scale"}`}
          >
            <p
              className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              "Legal separation provides the structure and protections of a
              court order while preserving your marriage."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Ohio Family Law
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. What the Process Entails (Expandable Cards) */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={itemsAnim.ref}
            className={`container max-w-4xl ${itemsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              What Does the Legal Separation Process Entail?
            </h2>
            <p className="text-body mb-8">
              Once you have made the decision to move forward, you will file a
              complaint for legal separation with the proper court. A separation
              agreement is an essential step and should be done with the advice
              of an experienced attorney. The court can issue orders on the
              following:
            </p>
            <div
              className={`grid gap-4 ${itemsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {separationItems.map((item) => (
                <ExpandableCard
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                >
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Side-by-Side Image + Text */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">
                  Experienced and Dedicated Family Law Lawyers
                </h3>
                <p className="text-body">
                  We have the experience to help counsel you with thoughtful
                  guidance through the legal separation process. Our attorneys
                  understand the emotional complexity of this decision and
                  provide compassionate, knowledgeable representation every step
                  of the way.
                </p>
                <p className="text-body">
                  Whether you are considering legal separation for insurance
                  benefits, personal beliefs, or as a step toward potential
                  reconciliation, we are here to help you navigate the process
                  with confidence.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80"
                alt="Journal and coffee representing thoughtful legal planning"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Comparison Table */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={comparisonAnim.ref}
            className={`container max-w-4xl ${comparisonAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Legal Separation vs. Divorce
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      className="text-left p-4 font-semibold text-lg border-b-2"
                      style={{ borderColor: "hsl(var(--green-accent))" }}
                    >
                      Aspect
                    </th>
                    <th
                      className="text-left p-4 font-semibold text-lg border-b-2"
                      style={{ borderColor: "hsl(var(--green-accent))" }}
                    >
                      Legal Separation
                    </th>
                    <th
                      className="text-left p-4 font-semibold text-lg border-b-2"
                      style={{ borderColor: "hsl(var(--green-accent))" }}
                    >
                      Divorce
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={row.aspect}
                      className={idx % 2 === 0 ? "" : "bg-secondary/30"}
                    >
                      <td className="p-4 font-medium text-base">
                        {row.aspect}
                      </td>
                      <td className="p-4 text-body text-base">
                        {row.separation}
                      </td>
                      <td className="p-4 text-body text-base">
                        {row.divorce}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 9. Quiz */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">
                  Test Your Knowledge
                </h2>
              </div>
              <p className="text-body">
                Understanding Ohio legal separation law gives you confidence.
                See where you stand with this quick 3-question check.
              </p>
              <p className="text-body text-sm italic mt-1">
                For informational purposes only. This is not legal advice.
              </p>
            </div>
            <div className="card-elevated">
              <AnimatedQuiz questions={quizQuestions} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 10. FAQ */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div
            ref={faqAnim.ref}
            className={`container max-w-2xl ${faqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">
                  Common Questions About Legal Separation in Ohio
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often.
              </p>
            </div>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 11. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Not Ready for Divorce? You Still Have Options.
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              Legal separation gives you the protection you need while keeping
              your options open. Call for a free consultation.
            </p>
            <a
              href="tel:+16146624043"
              className="btn-cta text-xl px-12 py-5"
            >
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

export default LegalSeparation;
