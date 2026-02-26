import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, DollarSign, Clock, GraduationCap, Heart, Briefcase, Calendar, Scale, TrendingUp, Home, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const courtFactors = [
  {
    title: "Income and Earning Ability",
    icon: TrendingUp,
    description: "The court examines each party's current income and their capacity to earn. This includes employment history, job skills, and potential for future earnings growth.",
  },
  {
    title: "Age and Physical Condition",
    icon: Heart,
    description: "The age, physical health, and emotional condition of both spouses play a role. Health issues that limit earning capacity can increase the likelihood of a spousal support award.",
  },
  {
    title: "Education and Training Needs",
    icon: GraduationCap,
    description: "The court considers what education or training the requesting spouse needs to obtain appropriate employment and become self-sufficient after the divorce.",
  },
  {
    title: "Duration of Marriage",
    icon: Calendar,
    description: "The duration of the marriage is a key factor. Longer marriages may result in more substantial and longer-lasting support awards. Shorter marriages may result in limited or no support, depending on the parties' circumstances. There is no fixed formula — each case is evaluated individually.",
  },
  {
    title: "Standard of Living",
    icon: Home,
    description: "The lifestyle the couple maintained during the marriage is a key factor. The court aims to help the lower-earning spouse maintain a reasonable approximation of that standard.",
  },
  {
    title: "Assets and Liabilities",
    icon: DollarSign,
    description: "The relative assets and debts of each party, including retirement benefits, are evaluated to determine the financial picture and appropriate support levels.",
  },
];

const supportTypes = [
  {
    title: "Temporary Spousal Support",
    description: "Payments made before and during divorce proceedings. One spouse may be ordered to pay while the case is pending. This does not guarantee continued support after the divorce is finalized.",
    icon: Clock,
  },
  {
    title: "Permanent Spousal Support",
    description: "Ordered when the divorce is finalized. May involve a one-time asset transfer or monthly payments. 'Permanent' means the court makes the lasting decision, not that payments continue forever. Modifications may be possible through a separate proceeding.",
    icon: Scale,
  },
];

const taxExclusions = [
  "Child support payments",
  "Payments to maintain the payor's property",
  "Non-cash property settlements",
  "Voluntary payments not mandated by the separation agreement",
];

const quizQuestions = [
  {
    question: "Is spousal support automatic in an Ohio divorce?",
    options: [
      "Yes, it is always awarded",
      "No, it depends on income differences and other factors",
      "Only if the marriage lasted over 10 years",
      "Only for women",
    ],
    correctIndex: 1,
    explanation: "Spousal support is not automatic in Ohio. The court considers multiple factors including income disparity, marriage duration, and each party's earning ability before making a determination.",
  },
  {
    question: "Under current federal tax law, how is spousal support treated?",
    options: [
      "Deductible by the payor, taxable to the receiver",
      "Not deductible and not taxable (for orders after Jan 1, 2019)",
      "Both parties split the tax burden equally",
      "Only taxable if payments exceed $50,000",
    ],
    correctIndex: 1,
    explanation: "For spousal support orders issued after January 1, 2019, alimony is no longer deductible from the paying party's income and is not considered taxable income to the receiving party.",
  },
  {
    question: "Can a working spouse seek spousal support in Ohio?",
    options: [
      "No, only unemployed spouses qualify",
      "Yes, if there is a significant income disparity",
      "Only during the first year after divorce",
      "Only if they have children",
    ],
    correctIndex: 1,
    explanation: "A working spouse may still be entitled to spousal support if there is a significant income difference. The court considers multiple factors beyond just employment status.",
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

const SpousalSupportQuiz = () => {
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
            ? "Excellent understanding of Ohio spousal support law."
            : score >= 2
            ? "Good knowledge! A consultation can clarify the specifics."
            : "Spousal support law is nuanced. Let our team guide you."}
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

const SpousalSupport = () => {
  const { openConsultation } = useConsultation();
  const factorsAnim = useScrollAnimation();
  const typesAnim = useScrollAnimation();
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
              Columbus, OH Spousal Support Lawyers
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Spousal Support Lawyer in Columbus
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              Spousal support (alimony) helps the lower-earning spouse maintain financial stability after divorce. Whether you're seeking or contesting support, our attorneys protect your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* What Is Spousal Support */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is Spousal Support?</h2>
            <div className="space-y-4 text-body">
              <p>
                Spousal support is an arrangement where one former spouse pays money to the other. In Ohio, the obligation to pay lies with the party that earns a higher income. This applies regardless of gender: both men and women may be required to pay or eligible to receive spousal support.
              </p>
              <p>
                The purpose is to help the receiving spouse maintain a reasonable standard of living similar to what they enjoyed during the marriage. Under Ohio law, spousal support payments are not automatic. The court considers multiple factors before making a determination.
              </p>
            </div>
          </div>
        </section>

        {/* Style 4: Full-Bleed Edge-to-Edge */}
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
          alt="Legal documents representing spousal support proceedings"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Who Qualifies */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Who Qualifies for Spousal Support?</h2>
            <div className="space-y-4 text-body">
              <p>
                Spousal support compensates either divorcing spouse for loss of wages or reduced earning ability. In today's employment landscape, more women work and some out-earn their husbands. Some men choose to stay home and raise children.
              </p>
              <p>
                For this reason, spousal support is no longer gender-specific. The former spouse who makes spousal support payments is typically the higher earner, regardless of whether they are the husband or wife. Each case is evaluated on its individual circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Style 3: Side-by-Side (Text Left, Image Right) */}
        <section className="section-padding-sm bg-card">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">Securing Your Financial Future</h3>
                <p className="text-body">
                  The financial implications of divorce can be overwhelming. Whether you're the higher or lower earner, having experienced legal counsel ensures the spousal support arrangement is fair, sustainable, and reflective of your circumstances.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney discussing financial matters with client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Court Factors */}
        <section className="section-padding">
          <div
            ref={factorsAnim.ref}
            className={`container max-w-4xl ${factorsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Factors the Court Considers</h2>
            <p className="text-body mb-8">
              Ohio courts evaluate several factors under Ohio R.C. 3105.18 when determining spousal support. Tap each factor to learn more.
            </p>
            <div className="grid gap-4">
              {courtFactors.map((factor) => (
                <ExpandableCard key={factor.title} title={factor.title} icon={factor.icon}>
                  {factor.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Style 1: Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed" style={{ color: "hsl(var(--primary-foreground))" }}>
              Under Ohio R.C. 3105.18, courts weigh fourteen statutory factors when determining spousal support — including length of marriage, income disparity, and each party's earning capacity.
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Ohio Revised Code § 3105.18</p>
          </div>
        </section>

        {/* Types of Spousal Support */}
        <section className="section-padding bg-card">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Types of Spousal Support in Ohio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {supportTypes.map((type) => (
                <div key={type.title} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">{type.title}</h3>
                  </div>
                  <p className="text-body text-base">{type.description}</p>
                </div>
              ))}
            </div>

            {/* Modification */}
            <div className="mt-10">
              <h3 className="heading-subsection text-2xl mb-4">Can Spousal Support Be Modified?</h3>
              <div className="space-y-4 text-body">
                <p>
                  Whether spousal support can be modified depends on the original court order. If the order's terms allow future modification, the court will evaluate current circumstances to determine if a change is warranted.
                </p>
                <p>
                  Common reasons for modification include a significant change in either party's income or the receiving party's cohabitation with a new partner. If the receiving spouse or either party dies, payments stop automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Section */}
        <section className="section-padding bg-navy">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6" style={{ color: "hsl(var(--primary-foreground))" }}>
              Spousal Support and Taxes
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                For spousal support orders issued <strong>after January 1, 2019</strong>, alimony is no longer deductible from the paying party's income and is not considered taxable income to the receiving party. Orders issued before this date follow the previous tax rules.
              </p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
              <h3 className="text-lg font-serif font-medium mb-4" style={{ color: "hsl(var(--green-accent))" }}>
                The IRS Definition of Spousal Support Excludes:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {taxExclusions.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 shrink-0 mt-1" style={{ color: "hsl(var(--green-accent))" }} />
                    <span className="text-base" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Don't Face Divorce Alone</h2>
            <div className="space-y-4 text-body">
              <p>
                The divorce process can be overwhelming, especially when financial matters come into play. A spousal support attorney at Borshchak Law Group in Columbus can help you navigate the complexities of alimony law.
              </p>
              <p>
                We understand the financial implications of divorce and are committed to providing knowledgeable, dedicated legal counsel as you navigate the financial aspects of your divorce. Contact us to discuss your case with one of our attorneys.
              </p>
            </div>
            <div className="mt-8">
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* Style 5: Offset Image with Green Accent Block */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div className="absolute top-4 -left-4 w-full h-full rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
              <img
                src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=1200&q=80"
                alt="Couple reviewing spousal support documents"
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
              <p className="text-body">How much do you know about spousal support in Ohio? Take this quick 3-question quiz.</p>
            </div>
            <div className="card-elevated">
              <SpousalSupportQuiz />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpousalSupport;
