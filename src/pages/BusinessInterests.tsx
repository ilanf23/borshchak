import { useState } from "react";
import {
  Phone,
  ChevronDown,
  HelpCircle,
  Building2,
  DollarSign,
  Users,
  Briefcase,
  Scale,
  TrendingUp,
  FileText,
  Handshake,
  Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const valuationScenarios = [
  {
    title: "Co-Own and Continue Operations",
    icon: Handshake,
    description:
      "Both spouses want to maintain ownership of the business and continue operating it together after the divorce. A proper valuation ensures both parties understand the full worth of the enterprise and can structure a fair co-ownership agreement. This approach requires clear communication, well-defined roles, and a legally binding operating agreement to prevent future disputes. Our attorneys help draft these agreements so both parties can move forward with confidence.",
  },
  {
    title: "Buyout Your Spouse's Share",
    icon: DollarSign,
    description:
      "One spouse wants to retain full ownership by purchasing the other's interest. A business valuation determines the fair market value so the buyout price is equitable and legally defensible. The buying spouse may use marital assets, a structured payment plan, or offset the value against other property such as the family home or retirement accounts. We work with forensic accountants to ensure the valuation reflects the true worth of the business.",
  },
  {
    title: "Sell the Business and Split Profits",
    icon: TrendingUp,
    description:
      "Both parties agree to sell the business and divide the proceeds. An accurate valuation helps set the right asking price and ensures both spouses receive their fair share from the sale. Timing the sale correctly and preparing the business for market can significantly impact the final price. Our team coordinates with business brokers and financial experts to maximize the return for both parties.",
  },
];

const businessTypes = [
  { label: "Corporation", icon: Building2 },
  { label: "LLC", icon: FileText },
  { label: "Partnership", icon: Users },
  { label: "Limited Partnership", icon: Handshake },
  { label: "Sole Proprietorship", icon: Briefcase },
];

const valuationFactors = [
  {
    title: "Revenue and Profitability",
    icon: TrendingUp,
    description:
      "Current and historical revenue, profit margins, and cash flow are examined to determine the earning capacity and financial health of the business. Forensic accountants analyze tax returns, financial statements, and bank records to build a comprehensive picture. Trends in revenue growth or decline over the past several years can significantly influence the final valuation figure.",
  },
  {
    title: "Assets and Liabilities",
    icon: Scale,
    description:
      "All tangible and intangible assets, including equipment, inventory, intellectual property, and outstanding debts, are factored into the valuation. Real estate holdings, vehicles, and accounts receivable add to the asset column, while loans, leases, and pending lawsuits reduce the net value. A thorough inventory prevents either party from being shortchanged during the division process.",
  },
  {
    title: "Market Conditions",
    icon: Calculator,
    description:
      "Industry trends, competitive landscape, and market position all influence the fair market value of the business during divorce proceedings. Comparable sales of similar businesses in the same industry provide benchmarks for valuation experts. Economic conditions, regulatory changes, and emerging market opportunities are also weighed to determine a realistic and defensible value.",
  },
  {
    title: "Goodwill and Brand Value",
    icon: Building2,
    description:
      "The reputation, customer relationships, and brand recognition built over time contribute to the overall value beyond just physical assets. Ohio courts distinguish between enterprise goodwill, which belongs to the business, and personal goodwill, which is tied to the individual owner. This distinction is critical because only enterprise goodwill is typically divisible as marital property in an Ohio divorce.",
  },
];

const quizQuestions = [
  {
    question: "When is a business valuation needed in a divorce?",
    options: [
      "Only when the business was started during the marriage",
      "When spouses need to divide, buy out, or sell business assets",
      "Only for businesses worth over $1 million",
      "Business valuations are never needed in divorce",
    ],
    correctIndex: 1,
    explanation:
      "A business valuation is needed whenever business assets must be divided, bought out, or sold as part of the divorce. This applies regardless of when the business was started or its total value.",
  },
  {
    question:
      "If you owned a business before marriage, must it be divided in divorce?",
    options: [
      "Yes, all businesses are automatically divided",
      "No, pre-marital business ownership is generally separate property",
      "Only if the business increased in value",
      "Only if both spouses worked in the business",
    ],
    correctIndex: 1,
    explanation:
      "If you or your spouse owned the business before the marriage, it is generally considered separate property and does not have to be divided. However, any increase in value during the marriage may be subject to division.",
  },
  {
    question:
      "Which business structures can be affected by divorce proceedings?",
    options: [
      "Only corporations",
      "Only sole proprietorships",
      "Corporations, LLCs, partnerships, limited partnerships, and sole proprietorships",
      "Only publicly traded companies",
    ],
    correctIndex: 2,
    explanation:
      "All business structures can be affected by divorce, including corporations, LLCs, partnerships, limited partnerships, and sole proprietorships. Each type has unique considerations for valuation and division.",
  },
];

const faqItems = [
  {
    question: "How is a business valued in an Ohio divorce?",
    answer:
      "Ohio courts use several methods to value a business including the income approach, market approach, and asset-based approach. The court typically relies on expert testimony from forensic accountants or business valuators. The chosen method depends on the type of business, its size, and available financial data.",
  },
  {
    question: "Is my business considered marital property?",
    answer:
      "If the business was started or acquired during the marriage, it is generally considered marital property subject to division. If it was started before the marriage, the premarital value may be separate property, but any increase in value during the marriage could be marital property.",
  },
  {
    question: "Can I keep my business in the divorce?",
    answer:
      "Yes, in many cases one spouse can retain the business by buying out the other spouse's interest. This may involve offsetting the value with other marital assets like the house or retirement accounts. A well-structured buyout protects both the business and your financial interests.",
  },
  {
    question:
      "What is the difference between enterprise goodwill and personal goodwill?",
    answer:
      "Enterprise goodwill belongs to the business itself, including its brand, reputation, and customer base, and is divisible in divorce. Personal goodwill is tied to the individual owner's skills and relationships and is generally not divisible. This distinction can significantly affect the valuation.",
  },
  {
    question: "What if my spouse is hiding business income?",
    answer:
      "Forensic accountants can analyze financial records to uncover hidden income, unreported revenue, or inflated expenses. Common red flags include lifestyle inconsistencies, cash-heavy businesses, and sudden decreases in reported income around the time of divorce filing.",
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

const BusinessInterests = () => {
  const { openConsultation } = useConsultation();
  const scenariosAnim = useScrollAnimation();
  const factorsAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Columbus, OH Business Interests Attorneys
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Business Interests Lawyer in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Divorces are difficult enough without worrying about how to handle
              a family-owned business. We help you navigate business-related
              decisions during a divorce by working to protect your interests.
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

        {/* Intro */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">
              Protecting Your Business in Divorce
            </h2>
            <div className="space-y-4 text-body">
              <p>
                Contact Borshchak Law Group to help you make important decisions
                about your divorce business assets in Columbus, Ohio. We work to
                accurately assess the business' value so you can make informed
                decisions moving forward.
              </p>
              <p>
                Whether you have a corporation, LLC, partnership, limited
                partnership, or sole proprietorship, our experienced attorneys
                can guide you through the business valuation process and help
                protect your interests.
              </p>
            </div>
          </div>
        </section>

        {/* Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          alt="Business financial documents and calculations"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Business Types */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-8">
              Business Structures We Handle
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {businessTypes.map((type) => (
                <div key={type.label} className="card-elevated text-center py-6">
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <type.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-base font-medium">{type.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }}
          />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h3
              className="text-2xl md:text-3xl font-serif font-semibold leading-relaxed mb-4"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Protecting What You've Built
            </h3>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
            >
              Your business may be your most valuable asset. We work diligently
              to help protect your interests throughout the divorce process.
            </p>
          </div>
        </section>

        {/* When to Arrange Valuation */}
        <section className="section-padding bg-secondary">
          <div
            ref={scenariosAnim.ref}
            className={`container max-w-4xl ${scenariosAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              When to Arrange for Business Valuation Services
            </h2>
            <p className="text-body mb-8">
              If you or your spouse owned the business before you got married,
              you don't have to divide your assets. You should arrange for
              business valuation if:
            </p>
            <div className="grid gap-4">
              {valuationScenarios.map((item) => (
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

        {/* Side-by-Side */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
                alt="Attorney discussing business valuation with client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">
                  Experienced Guidance for Business Owners
                </h3>
                <p className="text-body">
                  Dividing business assets in a divorce requires specialized
                  knowledge and careful analysis. Our attorneys work with
                  experienced valuation professionals to determine the true
                  worth of your business, ensuring you make informed decisions.
                </p>
                <p className="text-body">
                  We help many couples make important decisions about their
                  divorce business assets by working to accurately assess the
                  business' value and protect each party's interests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valuation Factors */}
        <section className="section-padding bg-card">
          <div
            ref={factorsAnim.ref}
            className={`container max-w-4xl ${factorsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Key Valuation Factors</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {valuationFactors.map((factor) => (
                <div key={factor.title} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "hsl(var(--secondary))" }}
                    >
                      <factor.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">
                      {factor.title}
                    </h3>
                  </div>
                  <p className="text-body text-base">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offset Image with Accent Block */}
        <section className="section-padding">
          <div className="container max-w-5xl">
            <div className="relative">
              <div
                className="absolute top-6 left-0 w-1/3 h-4/5 rounded-lg hidden md:block"
                style={{ backgroundColor: "hsl(var(--navy))" }}
              />
              <div className="relative md:ml-12">
                <img
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80"
                  alt="Financial analysis for business valuation"
                  className="w-full md:w-4/5 h-72 md:h-96 object-cover rounded-lg relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="section-padding bg-card">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">
                  Business Interests Quiz
                </h2>
              </div>
              <p className="text-body">
                Test your knowledge of business interests in Ohio divorce law
                with this quick 3-question check.
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

        {/* FAQ */}
        <section className="section-padding">
          <div
            ref={faqAnim.ref}
            className={`container max-w-2xl ${faqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">
                  Common Questions About Business Interests in Divorce
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often from business
                owners facing divorce.
              </p>
            </div>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Protect Your Business in Divorce
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              Your business is your livelihood. Call us for a free consultation
              to discuss strategies for protecting it.
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

export default BusinessInterests;
