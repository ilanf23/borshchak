import { useState } from "react";
import {
  Phone,
  CheckCircle2,
  Scale,
  FileText,
  AlertTriangle,
  ChevronDown,
  HelpCircle,
  XCircle,
  ShieldAlert,
  HeartOff,
  UserX,
  Brain,
  Ban,
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

const annulmentGrounds = [
  {
    title: "Bigamy",
    icon: AlertTriangle,
    description:
      "Either spouse was already legally married to another person at the time of the marriage. A person cannot be legally married twice, making the subsequent marriage void. Ohio law treats bigamous marriages as void from the start, meaning there is no time limit to challenge them. If you discover your spouse had a prior undissolved marriage, you may have grounds for annulment regardless of when the marriage took place.",
  },
  {
    title: "Forced Consent",
    icon: ShieldAlert,
    description:
      "One party entered the marriage unwillingly or through threats. Legal marriage must be based on free consent from both individuals. If coercion, intimidation, or duress is proven, the marriage qualifies for annulment under Ohio law. Courts examine the circumstances surrounding the marriage ceremony to determine whether genuine voluntary agreement was present.",
  },
  {
    title: "Fraud",
    icon: UserX,
    description:
      "One party entered the marriage based on material lies told by the other, such as claiming a false identity, fabricating a pregnancy, or concealing a serious criminal history. The fraud must go to the essence of the marriage and be significant enough that the deceived party would not have consented had they known the truth. Ohio courts take a case-by-case approach to evaluating fraud claims.",
  },
  {
    title: "Underage Marriage",
    icon: Ban,
    description:
      "Either spouse was under the legal marriage age as established by Section 3101.01 of Ohio law. If the underage party did not freely continue the marriage after reaching legal age, the case has grounds for annulment. The petition must generally be filed within two years of the underage spouse reaching the age of consent. Parental or guardian involvement at the time of the marriage may also be relevant.",
  },
  {
    title: "Mental Incapacity",
    icon: Brain,
    description:
      "Either spouse was mentally incompetent due to drugs, alcohol, or other conditions and could not provide informed consent at the time of the marriage. If the affected party did not continue the marriage after mental capacity was restored, annulment may be available. Medical records and expert testimony are often critical in establishing this ground. Courts will assess whether the individual understood the nature and consequences of the marriage.",
  },
  {
    title: "Lack of Consummation",
    icon: HeartOff,
    description:
      "Either spouse was physically incapable of consummating the marriage. This must be a permanent condition that existed at the time of the marriage and was unknown to the other party. Ohio courts require medical evidence to support this claim. The inability must be ongoing rather than temporary, and the petitioning spouse must not have been aware of the condition before the ceremony.",
  },
];

const differences = [
  {
    aspect: "Cost",
    divorce:
      "Generally more expensive due to complexity of asset division, custody, and support proceedings.",
    annulment:
      "Typically less expensive because the marriage is treated as if it never existed.",
  },
  {
    aspect: "Spousal Support",
    divorce:
      "The court may award alimony and divide assets equitably between spouses.",
    annulment:
      "Generally no spousal support, because the marriage is declared void from the start. However, courts may still address certain financial matters in limited circumstances.",
  },
  {
    aspect: "Filing Timeline",
    divorce: "Can be filed at any point during the marriage.",
    annulment:
      "For voidable marriages, must generally be filed within two years of the marriage date. Void marriages (such as bigamy) have no time limit.",
  },
  {
    aspect: "Property Division",
    divorce: "Marital property is divided equitably by the court.",
    annulment:
      "Generally no marital property to divide and assets return to their original owners. However, courts may apply equitable principles to jointly acquired property.",
  },
];

const quizQuestions = [
  {
    question: "What does an annulment do legally?",
    options: [
      "Ends a valid marriage",
      "Declares the marriage never legally existed",
      "Separates spouses temporarily",
      "Converts a marriage into a civil union",
    ],
    correctIndex: 1,
    explanation:
      "An annulment cancels a marriage from a legal perspective, meaning the marriage was never valid or technically never existed.",
  },
  {
    question: "How long do you have to file for an annulment in Ohio?",
    options: ["6 months", "1 year", "2 years", "No time limit"],
    correctIndex: 2,
    explanation:
      "For most voidable marriages in Ohio, you must file a petition for annulment within two years from the date the marriage took place. Note that void marriages (such as bigamy) have no time limit.",
  },
  {
    question:
      "Which of the following is NOT a ground for annulment in Ohio?",
    options: [
      "Bigamy",
      "Fraud",
      "Irreconcilable differences",
      "Mental incapacity",
    ],
    correctIndex: 2,
    explanation:
      "Irreconcilable differences are grounds for divorce or dissolution, not annulment. Annulment requires that the marriage was never valid to begin with.",
  },
];

const faqItems = [
  {
    question: "What is the difference between annulment and divorce?",
    answer:
      "An annulment declares the marriage was never legally valid, as if it never existed. A divorce ends a valid marriage. Annulments are only granted under specific circumstances such as fraud, duress, or incapacity. The legal and financial implications differ significantly.",
  },
  {
    question: "How long do I have to file for annulment in Ohio?",
    answer:
      "The time limit depends on the ground. For underage marriage, you must file within two years of reaching legal age. For fraud, within two years of discovery. For other grounds such as bigamy or mental incapacity, there may be no strict deadline, but courts expect prompt action once the issue is known.",
  },
  {
    question:
      "Can I get an annulment if I was married for a short time?",
    answer:
      "The length of the marriage alone does not determine eligibility for annulment. You must prove one of the specific legal grounds recognized by Ohio law. Even a very short marriage requires a valid legal basis for annulment rather than simply a change of heart.",
  },
  {
    question: "What happens to property after an annulment?",
    answer:
      "Because an annulment treats the marriage as if it never existed, property division is handled differently than in divorce. Generally, each party retains what they brought into the marriage. However, courts can make equitable adjustments to prevent unjust outcomes.",
  },
  {
    question:
      "Are children considered legitimate after an annulment?",
    answer:
      "Yes. Ohio law protects children born during an annulled marriage. They are considered legitimate, and both parents retain their parental rights and obligations including custody and child support, just as they would after a divorce.",
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

const Annulment = () => {
  const { openConsultation } = useConsultation();
  const groundsAnim = useScrollAnimation();
  const diffAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* Hero */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
            >
              Columbus, OH Annulment Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Annulment Lawyer in Columbus, Ohio
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              An annulment declares a marriage legally void, as if it never existed. If your marriage was entered under fraud, coercion, or other qualifying conditions, our attorneys can help you pursue an annulment in Ohio.
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
        {/* What Is an Annulment */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is an Annulment?</h2>
            <div className="space-y-4 text-body">
              <p>
                An annulment is a legally accepted procedure that cancels a marriage. From a legal perspective, an annulled marriage was never valid or never technically existed. Unlike divorce, which ends a valid marriage, annulment treats the marriage as if it never happened.
              </p>
              <p>
                In Franklin County and the rest of Ohio, the annulment process cannot proceed if your reasons for termination don't fall under the legally recognized grounds for nullification. Understanding whether your situation qualifies is the critical first step.
              </p>
            </div>

            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Filing Cost in Ohio</h4>
                  <p className="text-body text-base">
                    Court filing fees vary by county and are subject to change. In Columbus and Franklin County, filing fees for an annulment case are approximately <strong>$175</strong>. In Cleveland, filing fees are around <strong>$150</strong>. Verify current fees with the appropriate court. Attorney fees are additional and depend on case complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Full-Bleed Edge-to-Edge */}
        {/* ---------------------------------------------------------------- */}
        <img
          src="https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1600&q=80"
          alt="Open book pages"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* ---------------------------------------------------------------- */}
        {/* Grounds for Annulment */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={groundsAnim.ref}
            className={`container max-w-4xl ${groundsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Grounds for Annulment in Ohio</h2>
            <p className="text-body mb-8">
              Before filing for an annulment, it's important to verify that your marriage qualifies. In Ohio, a voidable marriage can be annulled on the following grounds. Tap each to learn more.
            </p>
            <div className="grid gap-4">
              {annulmentGrounds.map((ground) => (
                <ExpandableCard key={ground.title} title={ground.title} icon={ground.icon}>
                  {ground.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              If you meet one of the conditions above, you can seek an annulment in Ohio by working closely with an experienced annulment attorney.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Side-by-Side (Text Left, Image Right) */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm bg-card">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">Protecting Your Rights From the Start</h3>
                <p className="text-body">
                  Annulment cases involve unique legal complexities that differ significantly from standard divorce proceedings. Whether you're dealing with fraud, coercion, or other qualifying grounds, having experienced legal counsel ensures your case is presented effectively. Our attorneys understand the evidentiary requirements for each ground and will guide you through every step. Protecting your rights from the outset is essential to navigating this process effectively.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&q=80"
                alt="Open book pages representing legal knowledge"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Divorce vs Annulment Comparison */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-navy">
          <div
            ref={diffAnim.ref}
            className={`container max-w-4xl ${diffAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Divorce vs. Annulment: Key Differences
            </h2>
            <div className="grid gap-6">
              {differences.map((diff) => (
                <div key={diff.aspect} className="grid md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2" style={{ color: "hsl(var(--green-accent))" }}>
                      {diff.aspect}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Divorce</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.divorce}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Annulment</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.annulment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "It's a verified war strategy to never go to a battlefield alone."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Let our attorneys stand with you</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA Section */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Get an Annulment Attorney Today</h2>
            <div className="space-y-4 text-body">
              <p>
                Court hearings can be daunting, especially when emotions are involved. At Borshchak Law Group, we provide you with a strong attorney-client relationship to evaluate whether your grounds for annulment qualify under Ohio law and guide you through the process.
              </p>
              <p>
                Our experienced annulment attorneys will walk you through the court proceedings and advocate on your behalf. For most voidable marriages, Ohio law requires filing within <strong>two years</strong> of the marriage date, though certain void marriages (such as bigamy) have no time limit. Don't wait to explore your options.
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

        {/* ---------------------------------------------------------------- */}
        {/* Offset Image with Green Accent Block */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <div className="relative">
              <div
                className="absolute top-4 -left-4 w-full h-full rounded-lg hidden md:block"
                style={{ backgroundColor: "hsl(var(--green-accent))" }}
              />
              <img
                src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80"
                alt="Dramatic sky symbolizing new beginnings"
                className="relative z-10 w-full h-64 md:h-80 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Quiz */}
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
              <p className="text-body">How much do you know about annulment in Ohio? Take this quick 3-question quiz.</p>
              <p className="text-body text-sm italic mt-1">For informational purposes only. This is not legal advice.</p>
            </div>
            <div className="card-elevated">
              <AnimatedQuiz questions={quizQuestions} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ */}
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
                  Common Questions About Annulment in Ohio
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
        {/* Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Understand Your Annulment Options
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If your marriage may not have been legally valid, we can help you explore whether annulment is right for your situation.
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

export default Annulment;
