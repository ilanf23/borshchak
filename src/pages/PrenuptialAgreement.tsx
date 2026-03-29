import { useState } from "react";
import {
  Phone,
  CheckCircle2,
  FileText,
  Shield,
  Users,
  Heart,
  Scale,
  ChevronDown,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Briefcase,
  Ban,
  Eye,
  PenLine,
  HandHeart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const whatAPrenupCanDo = [
  {
    title: "Protect from Each Other's Debts",
    icon: Shield,
    description:
      "If your spouse has significant debts, such as student loans, failed investments, medical bills, or other emergencies, a prenuptial agreement can shield your personal assets from being seized to satisfy those obligations. Without a prenup, creditors may pursue marital assets regardless of who incurred the debt. Establishing clear boundaries in advance gives both parties financial peace of mind.",
  },
  {
    title: "Set Rules on Marital Assets",
    icon: Scale,
    description:
      "A prenup determines how income, investments, and assets acquired during the marriage are divided, even if only one party is directly involved in wealth creation. Ohio courts recognize both financial and domestic contributions, but a prenuptial agreement lets you define those terms on your own rather than leaving the decision to a judge. This clarity can prevent costly disputes down the road.",
  },
  {
    title: "Protect Family Property",
    icon: Heart,
    description:
      "If you are the beneficiary of an inheritance, heirlooms, a family business, or property passed down through generations, a prenup ensures those assets remain in your family in the event of a divorce. Without a clear agreement, commingling of assets during the marriage can blur the lines between separate and marital property. A well-drafted prenup removes that ambiguity and preserves what your family has built.",
  },
  {
    title: "Protect Children from Previous Relationships",
    icon: Users,
    description:
      "If either spouse has children from a prior relationship, a prenuptial agreement can protect those children's financial interests, including inheritance rights, trust assets, and ongoing support obligations. Remarriage can create complex family dynamics, and without a prenup, your children's future financial security could be affected by the terms of a divorce settlement. A prenup ensures their needs are addressed up front.",
  },
];

const invalidReasons = [
  {
    icon: AlertTriangle,
    title: "Coercion",
    description:
      "If either party was forced, threatened, or fraudulently induced into signing the agreement, Ohio courts will deem it invalid. Courts examine the circumstances surrounding the signing, including timing relative to the wedding and whether one party exerted undue pressure on the other.",
  },
  {
    icon: Eye,
    title: "Inaccuracy",
    description:
      "Misrepresentation of facts or incorrect information on the document, such as understating income or inflating debts, makes the prenup vulnerable to being voided. Both parties have a duty to present truthful information so the agreement reflects reality.",
  },
  {
    icon: Scale,
    title: "Changes in the Law",
    description:
      "Changes in Ohio statutes or relevant case law may render portions of the agreement obsolete or unenforceable. Periodic review with an attorney is recommended to ensure your prenup remains current with the legal landscape.",
  },
  {
    icon: Ban,
    title: "Failure to Disclose",
    description:
      "Full financial disclosure is a cornerstone of an enforceable prenuptial agreement. Failing to disclose all property, assets, income, or debts, whether intentionally or through oversight, can invalidate the entire agreement under Ohio law.",
  },
  {
    icon: HandHeart,
    title: "Unfairness",
    description:
      "If the agreement is found to be unconscionable, meaning grossly unfair to one party at the time of enforcement, the court may refuse to uphold it. Ohio courts look at whether the disadvantaged party understood the terms and had a meaningful opportunity to negotiate.",
  },
  {
    icon: Users,
    title: "Lack of Independent Counsel",
    description:
      "While Ohio does not strictly require independent counsel, if either party did not have the opportunity to consult with their own attorney, courts may weigh this heavily when evaluating the agreement's validity. Having separate lawyers demonstrates that both parties entered the agreement voluntarily and with full understanding.",
  },
  {
    icon: PenLine,
    title: "Failure to Execute",
    description:
      "The agreement must be in writing and signed by both parties before the marriage takes place. Notarization is strongly recommended as best practice, though not strictly required under Ohio law. An improperly executed agreement may be unenforceable.",
  },
];

const draftingPrinciples = [
  "Both parties should have independent legal representation",
  "The agreement must be equitable and fair to both parties",
  "Include all details important to both parties: finances, inheritances, debts, children's support",
  "All relevant Ohio laws must be considered during drafting",
];

const quizQuestions = [
  {
    question: "What is the primary purpose of a prenuptial agreement?",
    options: [
      "To prevent divorce",
      "To outline asset and debt division in case of divorce",
      "To determine who gets custody of children",
      "To set a wedding budget",
    ],
    correctIndex: 1,
    explanation:
      "A prenuptial agreement is a legally binding contract that outlines how assets and debts would be divided in the event of a divorce, and can set rules for marital property and children from previous relationships.",
  },
  {
    question:
      "Can a prenup be invalidated if one party was coerced into signing?",
    options: [
      "No, once signed it's permanent",
      "Only if a judge orders it",
      "Yes, coercion makes the agreement invalid",
      "Only after 10 years of marriage",
    ],
    correctIndex: 2,
    explanation:
      "If either party was forced or fraudulently induced into signing the prenuptial agreement, it will be considered invalid and unenforceable by Ohio courts.",
  },
  {
    question:
      "Do you need a lawyer to draft a prenuptial agreement in Ohio?",
    options: [
      "No, you can use an online template",
      "Only if you have significant assets",
      "Yes, both parties should have independent legal representation",
      "Only the wealthier spouse needs one",
    ],
    correctIndex: 2,
    explanation:
      "Both parties should have independent legal representation to ensure the agreement is fair, legally binding, and that both parties fully understand their rights and obligations.",
  },
];

const faqItems = [
  {
    question: "Are prenuptial agreements enforceable in Ohio?",
    answer:
      "Yes. Ohio recognizes prenuptial agreements under the Uniform Premarital Agreement Act (ORC 1335.05). To be enforceable, the agreement must be in writing, signed voluntarily by both parties, and each party must have made full financial disclosure. Unconscionable terms may be struck down by the court.",
  },
  {
    question: "When should we start discussing a prenup?",
    answer:
      "Ideally, prenuptial agreement discussions should begin several months before the wedding. Courts scrutinize agreements signed close to the wedding date, as there may be concerns about pressure or coercion. Starting early allows both parties to negotiate fairly and consult independent attorneys.",
  },
  {
    question: "Can a prenup address spousal support?",
    answer:
      "Yes. Prenuptial agreements in Ohio can include provisions regarding spousal support, including waiving it entirely. However, if the waiver would leave one spouse destitute or on public assistance, the court may override that provision.",
  },
  {
    question: "Do both parties need their own lawyer?",
    answer:
      "While not legally required, it is strongly recommended that each party has independent legal counsel when negotiating a prenuptial agreement. If one party does not have a lawyer, the agreement may be more vulnerable to challenges on the basis of lack of understanding or undue influence.",
  },
  {
    question: "Can a prenup be changed after marriage?",
    answer:
      "Yes. Prenuptial agreements can be amended or revoked after marriage through a written postnuptial agreement signed by both parties. Any modifications must follow the same requirements as the original agreement to be enforceable.",
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

const PrenuptialAgreement = () => {
  const purposeAnim = useScrollAnimation();
  const canDoAnim = useScrollAnimation();
  const invalidAnim = useScrollAnimation();
  const draftingAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

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
              style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
            >
              Columbus, OH Prenuptial Agreement Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Prenuptial Agreements in Columbus, OH: Protect What Matters Most
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              No one wants to think about divorce when planning a wedding. But a prenuptial agreement isn't about distrust. It's about clarity, fairness, and protecting your future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. What Is a Prenup */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={purposeAnim.ref}
            className={`container max-w-4xl ${purposeAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">What Is a Prenuptial Agreement?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">The Contract</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A prenuptial agreement is a legally binding contract between couples about to marry, governed by{" "}
                  <a href="https://codes.ohio.gov/ohio-revised-code/section-3103.06" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3103.06</a>.
                  It outlines how assets and debts would be divided in the event of a divorce, giving both parties clarity and control over their financial futures.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Sets rules for marital property division
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Customizable to your specific needs
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Must be fair and equitable to both parties
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Briefcase className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                  </div>
                  <h3 className="heading-subsection text-xl">The Lawyer's Role</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A prenuptial agreement lawyer drafts, reviews, and revises your prenup until both parties agree on its terms. Your attorney ensures the document is legally sound, enforceable under Ohio law, and that both parties' interests are fairly represented.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Advises on legal implications
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Ensures compliance with Ohio law
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--green-accent))" }} />
                    Protects both parties' interests
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Ohio Divorce Rate</h4>
                  <p className="text-body text-base">
                    According to Statista, Ohio's divorce rate is approximately <strong>2.5 per 1,000 people</strong> (based on recent available data). While no one plans for divorce, a prenuptial agreement provides clarity and protection for both parties and can significantly reduce conflict if a separation does occur.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-4">
                    Three Requirements for a Valid Prenuptial Agreement in Ohio
                  </h4>
                  <div className="space-y-4 text-body text-base">
                    <p>
                      <strong>1.</strong> Voluntary execution — The agreement
                      must be entered into freely and voluntarily by both
                      parties, without fraud, duress, coercion, or undue
                      influence of any kind.
                    </p>
                    <p>
                      <strong>2.</strong> Full financial disclosure — Both
                      parties must provide full and accurate disclosure of their
                      assets, liabilities, income, and financial obligations
                      before signing. Concealing or misrepresenting financial
                      information can invalidate the entire agreement.
                    </p>
                    <p>
                      <strong>3.</strong> Fairness and no encouragement of
                      divorce — The terms must be fair to both parties and must
                      not be so one-sided as to create extreme
                      unconscionability. Additionally, the agreement cannot
                      contain provisions that actively encourage or incentivize
                      divorce.
                    </p>
                  </div>
                  <p className="text-body-sm italic mt-4">
                    If any of these requirements are not met, an Ohio court may
                    refuse to enforce the agreement. Working with an experienced
                    family law attorney ensures your prenuptial agreement is
                    drafted to meet all legal standards and will hold up if
                    challenged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Full-Bleed Edge-to-Edge Image */}
        {/* ---------------------------------------------------------------- */}
        <section>
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
            alt="Couple holding hands during wedding preparation"
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. What a Prenup Can Do */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={canDoAnim.ref}
            className={`container max-w-4xl ${canDoAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">What a Prenup Can Do for You</h2>
            <p className="text-body mb-8">
              Prenuptial agreements serve many purposes depending on your situation. Tap each benefit below to learn more.
            </p>
            <div className="grid gap-4">
              {whatAPrenupCanDo.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. How a Prenup Becomes Invalid */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-navy">
          <div
            ref={invalidAnim.ref}
            className={`container max-w-4xl ${invalidAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              How a Prenuptial Agreement Can Become Invalid
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
              While prenuptial agreements are legally binding contracts, there are circumstances under which they may be invalidated by the court. Under{" "}
              <a href="https://codes.ohio.gov/ohio-revised-code/section-3103.061" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: "hsla(40, 30%, 98%, 0.9)" }}>Ohio Revised Code Section 3103.061</a>,
              specific validity requirements must be met. Understanding these pitfalls is essential to drafting an agreement that will hold up when it matters most.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {invalidReasons.map((reason) => (
                <div key={reason.title} className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <reason.icon className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    <h3 className="text-xl font-serif font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. Side-by-Side (Text Left, Image Right) */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <h3 className="heading-subsection">Built on Transparency</h3>
                <p className="text-body">
                  A valid prenuptial agreement requires full disclosure, fairness, and independent legal representation for both parties, as outlined in{" "}
                  <a href="https://codes.ohio.gov/ohio-revised-code/section-3103.061" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3103.061</a>.
                  Ohio courts closely examine whether each spouse had a genuine opportunity to review and negotiate the terms. Our attorneys ensure your agreement meets every standard Ohio courts require, so it stands up when it matters most.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
                alt="Couple reviewing financial documents together"
                className="w-full h-72 md:h-96 object-cover rounded-lg order-1 md:order-2"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Drafting a Prenup */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={draftingAnim.ref}
            className={`container max-w-4xl ${draftingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Drafting a Fair Prenuptial Agreement</h2>
            <div className="space-y-6 text-body">
              <p>
                A prenup should protect both parties. While you want to safeguard your interests, remember you're signing a contract with someone you love. The goal is to create a framework that feels fair to both sides and prevents future disputes. Here are the key principles:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {draftingPrinciples.map((principle, idx) => (
                  <div key={idx} className="card-bordered">
                    <div className="flex items-start gap-3">
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-serif font-medium"
                        style={{ backgroundColor: "hsl(var(--secondary))", color: "hsl(var(--trust-navy))" }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-body text-base">{principle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-elevated">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-body text-base">
                    <strong>Important:</strong> Both parties should have their own independent attorney review the agreement. An experienced prenuptial agreement lawyer ensures the document is legally sound, fair, and considers all relevant Ohio laws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "The best time to plan for the unexpected is before it happens."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Planning for your future together</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 9. Quiz */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">Test Your Knowledge</h2>
              </div>
              <p className="text-body">How much do you know about prenuptial agreements in Ohio? Take this quick 3-question quiz.</p>
              <p className="text-body text-sm italic mt-1">For informational purposes only. This is not legal advice.</p>
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
                  Common Questions About Prenuptial Agreements
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often from couples considering a prenup.
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
              src="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Start Your Marriage with Clarity
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              A prenuptial agreement isn't about distrust; it's about planning. Call us for a free consultation.
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

export default PrenuptialAgreement;
