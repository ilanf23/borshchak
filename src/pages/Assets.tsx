import { useState, useRef } from "react";
import {
  Phone,
  CheckCircle2,
  DollarSign,
  Home,
  Briefcase,
  TrendingUp,
  Shield,
  FileText,
  Scale,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Building2,
  PiggyBank,
  Landmark,
  Eye,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import AnimatedCTA from "@/components/AnimatedCTA";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import lawyerworking8 from "@/assets/lawyerworking-8.jpg";
import assetsBgImage from "@/assets/service-bg-assets.jpg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const assetTypes = [
  {
    title: "Real Estate Holdings",
    icon: Home,
    description:
      "Marital real estate includes the family home, vacation properties, rental properties, and land. Ohio courts consider when the property was purchased, how it was titled, and whether separate funds were used for the down payment or mortgage. Accurately appraising each property is essential because real estate values fluctuate and equity calculations must account for liens, mortgages, and capital gains implications. Your attorney works with appraisers to ensure no property is overlooked or undervalued.",
  },
  {
    title: "Business Interests",
    icon: Briefcase,
    description:
      "Family businesses, professional practices, and ownership stakes in partnerships or LLCs are often the most complex assets to divide. Ohio law requires that the marital portion of business value be identified and equitably distributed. Valuation methods include the income approach, market approach, and asset-based approach, and the distinction between enterprise goodwill and personal goodwill is critical. A forensic accountant and experienced attorney are essential to protect your business interests.",
  },
  {
    title: "Retirement & Pension Accounts",
    icon: PiggyBank,
    description:
      "Retirement accounts including 401(k)s, IRAs, pensions, and deferred compensation plans are frequently among the largest marital assets. Dividing these accounts requires a Qualified Domestic Relations Order (QDRO) to avoid tax penalties and ensure proper distribution. The marital portion is typically the amount contributed or accrued during the marriage, though tracing may be needed for pre-marital contributions. Your attorney coordinates with QDRO specialists to protect your retirement security.",
  },
  {
    title: "Investment Portfolios",
    icon: TrendingUp,
    description:
      "Stocks, bonds, mutual funds, brokerage accounts, and cryptocurrency holdings must all be identified, valued, and divided. The valuation date matters because market fluctuations can significantly affect values between separation and final hearing. Tax implications of liquidating investments \u2014 including capital gains \u2014 must be factored into any equitable distribution. An experienced attorney ensures you receive assets of equivalent after-tax value, not just equal face value.",
  },
  {
    title: "Stock Options & RSUs",
    icon: Building2,
    description:
      "Unvested stock options and restricted stock units (RSUs) present unique challenges because their value is uncertain and they may be subject to vesting schedules. Ohio courts use various methods to determine the marital portion, including the time rule and the coverture fraction. Whether options are 'in the money' and when they can be exercised affects their current value. Your attorney works with financial experts to ensure these complex compensation instruments are properly accounted for.",
  },
  {
    title: "Hidden Assets",
    icon: Eye,
    description:
      "When one spouse suspects the other is concealing assets, forensic investigation becomes necessary. Common tactics include transferring assets to family members, creating fictitious debts, underreporting business income, or hiding cash. Ohio courts take asset concealment seriously and can impose sanctions, adverse inferences, and award attorney fees to the discovering party. Your attorney uses discovery tools, subpoenas, and forensic accountants to uncover the true marital estate.",
  },
];

const quizQuestions = [
  {
    question: "How does Ohio divide marital property?",
    options: [
      "Always 50/50",
      "Community property rules",
      "Equitable distribution (fair but not always equal)",
      "The higher earner keeps more",
    ],
    correctIndex: 2,
    explanation:
      "Ohio is an equitable distribution state, meaning the court divides marital property fairly based on various factors, but not necessarily equally.",
  },
  {
    question:
      "Which of these is typically considered separate (non-marital) property?",
    options: [
      "A house bought during the marriage",
      "An inheritance received by one spouse",
      "Joint savings account contributions",
      "Furniture purchased together",
    ],
    correctIndex: 1,
    explanation:
      "Inheritances received by one spouse are generally considered separate property in Ohio, as long as they were not commingled with marital assets.",
  },
  {
    question: "What is a QDRO?",
    options: [
      "A type of divorce filing",
      "An order to divide retirement accounts without tax penalty",
      "A business valuation method",
      "A custody evaluation report",
    ],
    correctIndex: 1,
    explanation:
      "A Qualified Domestic Relations Order (QDRO) is a legal order that allows retirement accounts to be divided between spouses without triggering early withdrawal penalties or taxes.",
  },
];

const faqItems = [
  {
    question: "What is the difference between marital and separate property?",
    answer:
      "Marital property includes assets acquired during the marriage, regardless of whose name is on the title. Separate property includes assets owned before marriage, inheritances, and gifts received by one spouse. However, separate property can become marital property if it is commingled with marital funds.",
  },
  {
    question: "How are complex assets like businesses valued?",
    answer:
      "Ohio courts rely on expert testimony from forensic accountants and business valuators. Common methods include the income approach (based on earning potential), market approach (comparable sales), and asset-based approach (net asset value). The method chosen depends on the type and size of the business.",
  },
  {
    question: "Can my spouse hide assets during divorce?",
    answer:
      "While some spouses attempt to hide assets, Ohio courts have strong discovery tools to uncover them. Your attorney can use interrogatories, subpoenas, depositions, and forensic accountants to trace hidden assets. Courts impose serious penalties for asset concealment.",
  },
  {
    question: "What happens to debt in an Ohio divorce?",
    answer:
      "Marital debt is divided equitably just like assets. The court considers who incurred the debt, whether it benefited the marriage, and each party's ability to pay. Debt incurred before marriage is generally the responsibility of the spouse who incurred it.",
  },
  {
    question: "Do I need a forensic accountant?",
    answer:
      "If your divorce involves complex assets like businesses, investment portfolios, stock options, or suspected hidden assets, a forensic accountant is highly recommended. They can trace assets, value businesses, and uncover financial irregularities that might otherwise go undetected.",
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

const Assets = () => {
  const { openConsultation } = useConsultation();
  const empathyAnim = useScrollAnimation();
  const imageLeftAnim = useScrollAnimation(0.15, "left");
  const imageRightAnim = useScrollAnimation(0.15, "right");
  const methodsAnim = useScrollAnimation();
  const groundsAnim = useScrollAnimation();
  const quoteAnim = useScrollAnimation(0.2, "scale");
  const mattersAnim = useScrollAnimation();
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
        <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
          <img
            src={assetsBgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, hsla(215,50%,10%,0.92) 0%, hsla(215,42%,16%,0.88) 100%)",
            }}
          />

          <div className="container max-w-4xl section-padding relative z-10">
            {/* Decorative dots */}
            <div
              className="flex items-center gap-1.5 mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "50ms" }}
            >
              <span
                className="block w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <span
                className="block w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <span
                className="block w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
            </div>

            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{
                color: "hsla(40, 30%, 98%, 0.85)",
                animationDelay: "100ms",
              }}
            >
              Property & Asset Division
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Protecting What You've Built
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              From family businesses to investment portfolios, real estate to
              retirement accounts, we work to ensure marital property is
              accurately valued and divided fairly. Your financial future depends
              on getting this right.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <AnimatedCTA delay={0.6}>
                <a href="tel:+16143346851" className="btn-cta">
                  <Phone className="w-5 h-5 mr-2" />
                  Free Consultation: 614-334-6851
                </a>
              </AnimatedCTA>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. Empathy / Reassurance */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={empathyAnim.ref}
            className={`container max-w-3xl text-center ${empathyAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">
              Your Financial Future Is Worth Fighting For
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                When significant assets are at stake in a divorce, the decisions
                made today will shape your financial security for decades.
                Under Ohio's equitable division framework established in{" "}
                <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.171" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3105.171</a>, business interests, retirement accounts, real estate, and
                investments all require careful analysis and expert valuation.
              </p>
              <p>
                We understand the anxiety that comes with the possibility of
                losing what you've worked a lifetime to build. Whether you're a
                business owner, executive, or professional, your assets deserve
                the same level of sophistication in the courtroom that went into
                building them.
              </p>
              <p>
                Our team works with forensic accountants, business valuators, and
                financial planners to ensure{" "}
                <strong>nothing is overlooked and nothing is undervalued.</strong>
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Complex
                </p>
                <p className="text-body-sm text-base">
                  Asset Experience
                </p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Professional
                </p>
                <p className="text-body-sm text-base">
                  Forensic & Valuation Network
                </p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  You
                </p>
                <p className="text-body-sm text-base">
                  Your Goals Drive Our Strategy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Side-by-Side Image + Text */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div
                ref={imageLeftAnim.ref}
                className={
                  imageLeftAnim.isVisible
                    ? "scroll-visible-left"
                    : "scroll-hidden-left"
                }
              >
                <img
                  src={lawyerworking8}
                  alt="Attorney reviewing financial documents at his desk"
                  className="w-full h-72 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div
                ref={imageRightAnim.ref}
                className={`space-y-4 ${imageRightAnim.isVisible ? "scroll-visible-right" : "scroll-hidden-right"}`}
              >
                <h3 className="heading-subsection">
                  High-Net-Worth Divorce Requires a Different Approach
                </h3>
                <p className="text-body">
                  When your marital estate includes complex financial
                  instruments, business ownership, or significant real estate
                  holdings, a standard approach to property division isn't
                  enough. You need an attorney who understands financial
                  statements, tax implications, and valuation methodologies
                  &mdash; and who partners with the right experts to protect your
                  interests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Equitable Distribution Explanation */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={methodsAnim.ref}
            className={`container max-w-4xl ${methodsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">
              Marital vs. Separate Property &mdash; Understanding the Difference
            </h2>
            <div
              className={`grid md:grid-cols-2 gap-6 mb-10 ${methodsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              <div className="card-bordered transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Marital Property
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Marital property includes virtually all assets and debts
                  acquired during the marriage, regardless of which spouse's name
                  is on the title, as defined in{" "}
                  <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.171" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code § 3105.171(A)(3)</a>. Ohio courts divide marital property equitably
                  &mdash; fairly, but not always equally.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Income earned during the marriage
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Retirement contributions during marriage
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Real estate purchased during marriage
                  </div>
                </div>
              </div>

              <div className="card-bordered transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "hsla(152, 45%, 38%, 0.1)",
                    }}
                  >
                    <Shield
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Separate Property
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Separate property, as defined in{" "}
                  <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.171" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code § 3105.171(A)(6)</a>, belongs solely to one spouse and is generally
                  not subject to division. However, commingling separate property
                  with marital assets can convert it into marital property
                  &mdash; a critical distinction your attorney must protect.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Assets owned before marriage
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Inheritances & personal gifts
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Personal injury compensation
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">
                    The Commingling Trap
                  </h4>
                  <p className="text-body text-base">
                    One of the most common mistakes in asset division is failing
                    to trace separate property. If an inheritance is deposited
                    into a joint account, or a pre-marital asset appreciates due
                    to marital effort, its character may change. Your attorney
                    must identify and document these distinctions{" "}
                    <strong>before</strong> negotiations begin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Expandable Asset Type Cards */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={groundsAnim.ref}
            className={`container max-w-4xl ${groundsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Types of Complex Assets We Handle
            </h2>
            <p className="text-body mb-8">
              Every high-net-worth divorce involves unique financial instruments.
              Tap any category below to learn how we approach valuation and
              division for that asset type.
            </p>
            <div
              className={`grid gap-4 ${groundsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {assetTypes.map((asset) => (
                <ExpandableCard
                  key={asset.title}
                  title={asset.title}
                  icon={asset.icon}
                >
                  {asset.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              This is not an exhaustive list. If your divorce involves any
              unusual or high-value assets, we have the experience and professional
              network to handle them.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80')",
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
              "The art is not in making money, but in keeping it."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
            >
              Proverb
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Dark Section - Key Considerations */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1600&q=80')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 18%, 0.88)" }}
          />
          <div
            ref={mattersAnim.ref}
            className={`container max-w-6xl relative z-10 ${mattersAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            {/* Decorative squares */}
            <div className="flex items-center justify-center gap-1.5 mb-8">
              <span
                className="block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <span
                className="block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <span
                className="block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
            </div>

            <h2
              className="text-center text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-wide uppercase mb-5"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Key Considerations in Asset Division
            </h2>
            <p
              className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
            >
              Protecting your assets requires attention to these critical areas.
              Understanding them now gives you a strategic advantage.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Accurate Valuation
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Every asset must be properly valued at the right point in time.
                  Undervaluation or using the wrong date can cost you hundreds of
                  thousands of dollars. We work with certified appraisers and
                  forensic accountants.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Tax Implications
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Not all assets are created equal after taxes. A $500,000
                  retirement account and $500,000 in cash have very different
                  real values. We ensure your settlement accounts for capital
                  gains, penalties, and future tax burdens.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Hidden Assets
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Asset concealment is more common than you think. We use
                  forensic discovery, subpoenas, and financial analysis to ensure
                  the full marital estate is on the table. Ohio courts impose
                  serious penalties for hiding assets.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                  <span
                    className="block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: "hsl(var(--green-accent))" }}
                  />
                </div>
                <h3
                  className="text-sm md:text-base font-bold tracking-widest uppercase mb-4 leading-snug"
                  style={{ color: "hsl(var(--primary-foreground))" }}
                >
                  Business Protection
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Your business shouldn't be forced into sale because of
                  inadequate representation. We understand enterprise vs.
                  personal goodwill, buy-sell provisions, and creative settlement
                  structures that keep your business intact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Quiz */}
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
                Understanding Ohio property division law helps you make informed
                decisions. See where you stand with this quick check.
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
        {/* 9. FAQ */}
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
                  Common Questions About Asset Division
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often about complex
                property division.
              </p>
            </div>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 10. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div
            ref={ctaContentAnim.ref}
            className={`container max-w-2xl text-center relative z-10 ${ctaContentAnim.className}`}
          >
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Complex Assets? Let's Talk Strategy.
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              The financial decisions made in your divorce will affect you for
              years to come. Call us for a free, confidential consultation.
              We'll review your situation, explain your options, and build a
              strategy to protect what you've earned.
            </p>
            <div ref={ctaRef} className="flex justify-center">
              {ctaInView ? (
                <AnimatedCTA delay={0.3}>
                  <a
                    href="tel:+16143346851"
                    className="btn-cta text-xl px-12 py-5"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now: 614-334-6851
                  </a>
                </AnimatedCTA>
              ) : (
                <div className="opacity-0">
                  <a
                    href="tel:+16143346851"
                    className="btn-cta text-xl px-12 py-5"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now: 614-334-6851
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Assets;
