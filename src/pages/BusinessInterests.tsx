import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, Building2, DollarSign, Users, Briefcase, Scale, TrendingUp, FileText, Handshake, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const valuationScenarios = [
  {
    title: "Co-Own and Continue Operations",
    icon: Handshake,
    description: "Both spouses want to maintain ownership of the business and continue operating it together after the divorce. A proper valuation ensures both parties understand the full worth of the enterprise and can structure a fair co-ownership agreement.",
  },
  {
    title: "Buyout Your Spouse's Share",
    icon: DollarSign,
    description: "One spouse wants to retain full ownership by purchasing the other's interest. A business valuation determines the fair market value so the buyout price is equitable and legally defensible.",
  },
  {
    title: "Sell the Business and Split Profits",
    icon: TrendingUp,
    description: "Both parties agree to sell the business and divide the proceeds. An accurate valuation helps set the right asking price and ensures both spouses receive their fair share from the sale.",
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
    description: "Current and historical revenue, profit margins, and cash flow are examined to determine the earning capacity and financial health of the business.",
  },
  {
    title: "Assets and Liabilities",
    icon: Scale,
    description: "All tangible and intangible assets, including equipment, inventory, intellectual property, and outstanding debts, are factored into the valuation.",
  },
  {
    title: "Market Conditions",
    icon: Calculator,
    description: "Industry trends, competitive landscape, and market position all influence the fair market value of the business during divorce proceedings.",
  },
  {
    title: "Goodwill and Brand Value",
    icon: Building2,
    description: "The reputation, customer relationships, and brand recognition built over time contribute to the overall value beyond just physical assets.",
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
    explanation: "A business valuation is needed whenever business assets must be divided, bought out, or sold as part of the divorce. This applies regardless of when the business was started or its total value.",
  },
  {
    question: "If you owned a business before marriage, must it be divided in divorce?",
    options: [
      "Yes, all businesses are automatically divided",
      "No, pre-marital business ownership is generally separate property",
      "Only if the business increased in value",
      "Only if both spouses worked in the business",
    ],
    correctIndex: 1,
    explanation: "If you or your spouse owned the business before the marriage, it is generally considered separate property and does not have to be divided. However, any increase in value during the marriage may be subject to division.",
  },
  {
    question: "Which business structures can be affected by divorce proceedings?",
    options: [
      "Only corporations",
      "Only sole proprietorships",
      "Corporations, LLCs, partnerships, limited partnerships, and sole proprietorships",
      "Only publicly traded companies",
    ],
    correctIndex: 2,
    explanation: "All business structures can be affected by divorce, including corporations, LLCs, partnerships, limited partnerships, and sole proprietorships. Each type has unique considerations for valuation and division.",
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

const BusinessQuiz = () => {
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
          {score === 3 ? "Excellent understanding of business interests in divorce." : score >= 2 ? "Good knowledge! A consultation can clarify the specifics." : "Business valuation in divorce is complex. Let our team guide you."}
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

const BusinessInterests = () => {
  const { openConsultation } = useConsultation();
  const scenariosAnim = useScrollAnimation();
  const factorsAnim = useScrollAnimation();
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
              Columbus, OH Business Interests Attorneys
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Business Interests Lawyer in Columbus
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              Divorces are difficult enough without worrying about how to handle a family-owned business. We help you get the most out of your business during a divorce by maximizing its value.
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
            <h2 className="heading-section mb-6">Protecting Your Business in Divorce</h2>
            <div className="space-y-4 text-body">
              <p>
                Contact Borshchak Law Group to help you make important decisions about your divorce business assets in Columbus, Ohio. We take care to maximize the business' value so you can make a wise decision moving forward.
              </p>
              <p>
                Whether you have a corporation, LLC, partnership, limited partnership, or sole proprietorship, our experienced attorneys can guide you through the business valuation process and help protect your interests.
              </p>
            </div>
          </div>
        </section>

        {/* Style 4: Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          alt="Business financial documents and calculations"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Business Types */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-8">Business Structures We Handle</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {businessTypes.map((type) => (
                <div key={type.label} className="card-elevated text-center py-6">
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                    <type.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-base font-medium">{type.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "Your business may be your most valuable asset. You can trust us to make sure you get your fair share after the divorce."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Borshchak Law Group</p>
          </div>
        </section>

        {/* When to Arrange Valuation */}
        <section className="section-padding bg-card">
          <div
            ref={scenariosAnim.ref}
            className={`container max-w-4xl ${scenariosAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">When to Arrange for Business Valuation Services</h2>
            <p className="text-body mb-8">
              If you or your spouse owned the business before you got married, you don't have to divide your assets. You should arrange for business valuation if:
            </p>
            <div className="grid gap-4">
              {valuationScenarios.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
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
                alt="Attorney discussing business valuation with client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Expert Guidance for Business Owners</h3>
                <p className="text-body">
                  Dividing business assets in a divorce requires specialized knowledge and careful analysis. Our attorneys work with experienced valuation professionals to determine the true worth of your business, ensuring you make informed decisions.
                </p>
                <p className="text-body">
                  We help many couples make important decisions about their divorce business assets by taking care to maximize the business' value and protect each party's interests.
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
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <factor.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">{factor.title}</h3>
                  </div>
                  <p className="text-body text-base">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Accent Block */}
        <section className="section-padding">
          <div className="container max-w-5xl">
            <div className="relative">
              <div className="absolute top-6 left-0 w-1/3 h-4/5 rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--navy))" }} />
              <div className="relative md:ml-12">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-base font-medium text-primary">Test Your Knowledge</span>
              </div>
              <h2 className="heading-section">Business Interests Quiz</h2>
            </div>
            <div className="card-elevated">
              <BusinessQuiz />
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
              Protect Your Business Interests
            </h2>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
              Your business is one of your most valuable assets. Contact our experienced attorneys today for a business valuation consultation and ensure your interests are protected.
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

export default BusinessInterests;
