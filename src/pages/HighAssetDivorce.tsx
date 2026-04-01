import { useState } from "react";
import {
  Phone,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Building2,
  DollarSign,
  Users,
  Briefcase,
  Scale,
  TrendingUp,
  FileText,
  Home,
  Lock,
  Search,
  Brain,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCTA from "@/components/AnimatedCTA";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const keyIssues = [
  {
    title: "Business Interests",
    icon: Building2,
    description:
      "Businesses started or grown during the marriage may be marital property. Valuation requires expert, defensible methodology.",
  },
  {
    title: "Real Estate Holdings",
    icon: Home,
    description:
      "Multiple properties, investment real estate, and commercial holdings all require individual appraisal and careful allocation.",
  },
  {
    title: "Retirement Accounts & QDROs",
    icon: DollarSign,
    description:
      "Dividing 401(k)s, pensions, and IRAs requires a Qualified Domestic Relations Order (QDRO) and careful attention to tax consequences.",
  },
  {
    title: "Stock Options & Deferred Compensation",
    icon: TrendingUp,
    description:
      "Unvested stock options and deferred compensation packages require special treatment and valuation.",
  },
  {
    title: "Trusts & Inherited Assets",
    icon: Lock,
    description:
      "Assets held in trust or received as inheritance may be separate property — but commingling can create marital interests.",
  },
  {
    title: "Hidden Assets",
    icon: Search,
    description:
      "Forensic accountants can analyze financial records to uncover hidden income, unreported revenue, or inflated expenses.",
  },
];

const quizQuestions = [
  {
    question:
      "Is a business started before marriage automatically separate property in Ohio?",
    options: [
      "Yes, always",
      "No, never",
      "Generally yes, but active appreciation may be marital",
      "Only if incorporated",
    ],
    correctIndex: 2,
    explanation:
      "A business owned before marriage is generally separate property, but if it appreciated in value during the marriage due to either spouse's efforts, that appreciation may be considered marital property.",
  },
  {
    question: "What is a QDRO?",
    options: [
      "A type of divorce decree",
      "A court order dividing retirement accounts",
      "A business valuation method",
      "A prenuptial agreement clause",
    ],
    correctIndex: 1,
    explanation:
      "A Qualified Domestic Relations Order (QDRO) is a court order that divides retirement accounts like 401(k)s and pensions between divorcing spouses without triggering early withdrawal penalties.",
  },
  {
    question:
      "Who bears the burden of proving separate property in Ohio?",
    options: [
      "The court decides automatically",
      "The spouse claiming it is separate property",
      "The higher-earning spouse",
      "Neither spouse — it's split equally",
    ],
    correctIndex: 1,
    explanation:
      "Under Ohio law, all property acquired during the marriage is presumed marital. The spouse claiming an asset is separate property must trace it and prove it clearly.",
  },
];

const faqItems = [
  {
    question: "What qualifies as a high-asset divorce?",
    answer:
      "A high-asset divorce involves complex financial circumstances — not simply a large amount of money. Examples include closely held businesses, multiple real estate holdings, stock options, deferred compensation, trusts, and significant retirement assets.",
  },
  {
    question: "How are businesses valued in an Ohio divorce?",
    answer:
      "Ohio courts use several valuation methods including the income approach, market approach, and asset-based approach. The chosen method depends on the type and size of the business. Expert testimony from forensic accountants or business valuators is typically required.",
  },
  {
    question: "Can my spouse hide assets in a high-asset divorce?",
    answer:
      "Asset concealment is more common in high-asset cases. Forensic accountants can analyze tax returns, bank records, and financial statements to uncover hidden income or assets. Our firm works with experienced forensic examiners when concealment is suspected.",
  },
  {
    question: "Do I need a different attorney for a high-asset divorce?",
    answer:
      "Not a different attorney — but you need one with the right team and experience. High-asset cases require attorneys who understand complex financial instruments and who work closely with forensic accountants, business valuators, and other experts.",
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

const HighAssetDivorce = () => {
  const { openConsultation } = useConsultation();
  const introAnim = useScrollAnimation();
  const networkAnim = useScrollAnimation();
  const issuesAnim = useScrollAnimation();
  const tracingAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* 1. Hero */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, hsla(215,50%,10%,0.92) 0%, hsla(215,42%,16%,0.88) 100%)",
            }}
          />
          <div className="container relative z-10 py-20 md:py-28 lg:py-36">
            <div className="max-w-3xl">
              <p
                className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-slide-up"
                style={{ color: "hsl(var(--green-accent))" }}
              >
                Columbus, OH High Asset Divorce Lawyers
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-white mb-6 opacity-0 animate-slide-up">
                Protecting What You've Built: High-Asset Divorce in Ohio
              </h1>
              <p
                className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
                style={{ animationDelay: "400ms", color: "hsla(40, 30%, 98%, 0.85)" }}
              >
                When significant assets, business interests, or complex finances
                are involved, the stakes demand a higher level of preparation,
                strategy, and expertise.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "550ms" }}
              >
                <a href="tel:+16143346851" className="btn-cta">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us: 614-334-6851
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. What Makes a High-Asset Divorce Different */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={introAnim.ref}
            className={`container max-w-4xl ${introAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">
              What Makes a High-Asset Divorce Different
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                A high-asset divorce is not simply a divorce between wealthy
                people. It is a divorce in which the financial situation is
                genuinely complicated — involving closely held business interests,
                stock options, deferred compensation, real estate holdings,
                retirement accounts, trusts, or complex tax consequences. These
                cases require more than legal expertise alone. They require a
                team.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Our Expert Network */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-navy">
          <div
            ref={networkAnim.ref}
            className={`container max-w-5xl ${networkAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section text-center mb-4"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Our Expert Network
            </h2>
            <p
              className="text-center text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              High-asset cases demand more than legal expertise. We work with a
              trusted network of professionals to build your case.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "Forensic Accountants",
                  desc: "Uncovering hidden assets and analyzing complex financial records.",
                },
                {
                  icon: Building2,
                  title: "Business Valuators",
                  desc: "Providing court-ready valuations of businesses and professional practices.",
                },
                {
                  icon: DollarSign,
                  title: "CPAs & Tax Experts",
                  desc: "Evaluating tax consequences of asset division and settlement structures.",
                },
                {
                  icon: Home,
                  title: "Real Estate Appraisers",
                  desc: "Accurately valuing all real property interests.",
                },
                {
                  icon: Briefcase,
                  title: "Forensic Examiners & Former FBI Agents",
                  desc: "Investigating financial fraud and asset concealment.",
                },
                {
                  icon: Brain,
                  title: "Psychologists & Psychiatrists",
                  desc: "Expert insight where personal conduct intersects with financial matters.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    <h3
                      className="text-lg font-serif font-medium"
                      style={{ color: "hsl(var(--primary-foreground))" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Key Issues in High-Asset Divorce */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={issuesAnim.ref}
            className={`container max-w-4xl ${issuesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Key Issues in High-Asset Divorce
            </h2>
            <p className="text-body mb-8">
              Every high-asset case is different, but certain issues arise
              repeatedly. Understanding them early helps you make better
              decisions throughout the process.
            </p>
            <div
              className={`grid gap-4 ${issuesAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {keyIssues.map((issue) => (
                <ExpandableCard
                  key={issue.title}
                  title={issue.title}
                  icon={issue.icon}
                >
                  {issue.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Tracing Separate Property */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={tracingAnim.ref}
            className={`container max-w-4xl ${tracingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">
              Tracing Separate Property
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                Ohio law presumes all property acquired during the marriage is
                marital property. The burden is on the party claiming separate
                property to trace it clearly. This requires detailed financial
                records and often expert testimony. Under{" "}
                <a
                  href="https://codes.ohio.gov/ohio-revised-code/section-3105.171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Ohio Revised Code Section 3105.171
                </a>
                , separate property includes assets owned before marriage,
                inheritances, and gifts — but only if they have not been
                commingled with marital assets.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. Quiz */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary/30">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-8">
              <HelpCircle
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "hsl(var(--green-accent))" }}
              />
              <h2 className="heading-section">
                Test Your Knowledge
              </h2>
            </div>
            <AnimatedQuiz questions={quizQuestions} />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. FAQ */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div
            ref={faqAnim.ref}
            className={`container max-w-3xl ${faqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Frequently Asked Questions
            </h2>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsla(215,50%,10%,0.9) 0%, hsla(215,42%,16%,0.85) 100%)",
              }}
            />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Complex Finances Require an Experienced Team
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If your divorce involves significant assets, business interests, or
              complex finances, don't navigate it alone. Contact Borshchak Law
              Group for a confidential consultation.
            </p>
            <a
              href="tel:+16143346851"
              className="btn-cta text-xl px-12 py-5"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us: 614-334-6851
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HighAssetDivorce;
