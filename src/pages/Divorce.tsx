import { useState, useRef } from "react";
import {
  Phone,
  CheckCircle2,
  Scale,
  Users,
  Home,
  Gavel,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Lock,
  Wine,
  Heart,
  HeartOff,
  UserX,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCTA from "@/components/AnimatedCTA";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import divorceBgImage from "@/assets/service-bg-divorce.jpg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const faultGrounds = [
  {
    title: "Gross Neglect of Duty",
    icon: HeartOff,
    description:
      "Under Ohio law, 'gross neglect of duty' occurs when a spouse neglects the fundamental marital obligations of respect, fidelity, and support. This is more than occasional disagreement; the neglect must be severe and sustained enough that it substantially undermines the marriage. Courts look at patterns of behavior such as financial abandonment, refusal to contribute to the household, or persistent emotional withdrawal. Your attorney will help you document these patterns to build a strong case.",
  },
  {
    title: "Extreme Cruelty",
    icon: AlertTriangle,
    description:
      "Ohio courts define extreme cruelty as conduct that makes it 'unsafe or improper for the parties to reside together as husband and wife.' This ground covers a wide range of behavior including physical abuse, ongoing emotional manipulation, threats, financial control, and verbal abuse. You do not need to show physical injuries; a documented pattern of controlling or degrading behavior can be sufficient. Protective orders and police reports, if any, can strengthen your case significantly.",
  },
  {
    title: "Adultery",
    icon: Heart,
    description:
      "Adultery is a fault ground meaning one spouse's infidelity contributed to the breakdown of the marriage. Ohio law does not require direct proof such as photographs; circumstantial evidence showing opportunity and inclination can be enough. Courts may consider adultery when making decisions about spousal support and, in some cases, property division. Your attorney can advise you on what evidence is needed and how it may affect the outcome of your case.",
  },
  {
    title: "Bigamy",
    icon: Users,
    description:
      "Bigamy occurs when one spouse enters the marriage while still legally married to another person. Under Ohio law, this is not only a ground for divorce but also a criminal offense. If you discover that your spouse did not legally end a prior marriage before marrying you, the court can grant a divorce on this basis. In some circumstances, the marriage may also be subject to annulment.",
  },
  {
    title: "Willful Desertion",
    icon: UserX,
    description:
      "Also known as abandonment, willful desertion occurs when one spouse leaves the marital home and remains absent for at least one continuous year without the other spouse's consent. The absence must be voluntary and without justification. If your spouse left due to domestic violence or unsafe conditions, the court may not consider it desertion. Your attorney will evaluate the circumstances to determine whether this ground applies to your situation.",
  },
  {
    title: "Fraudulent Contract",
    icon: ShieldAlert,
    description:
      "A fraudulent contract ground arises when one spouse was deceived or coerced into the marriage. This can include situations where your spouse hid significant debts, concealed prior marriages or children, misrepresented their identity, or used threats or duress to force the marriage. The fraud must relate to an essential aspect of the marriage, not minor misrepresentations. Courts take these claims seriously and may also consider annulment in addition to divorce.",
  },
  {
    title: "Habitual Drunkenness",
    icon: Wine,
    description:
      "Under Ohio law, habitual drunkenness means more than occasional alcohol use; it refers to a persistent pattern of excessive drinking or substance abuse that disrupts the marriage. You must demonstrate that your spouse's drinking or drug use is habitual rather than isolated, and that it has had a measurable impact on your family life, finances, or safety. Medical records, witness testimony, and documented incidents can all serve as evidence for this ground.",
  },
  {
    title: "Imprisonment",
    icon: Lock,
    description:
      "If your spouse is confined to a state or federal correctional institution at the time you file for divorce, Ohio law recognizes this as a ground for divorce. The imprisonment must be in effect at the time of filing. This ground provides a straightforward path to divorce when your spouse's incarceration makes the continuation of the marriage impractical. The court can proceed even without your spouse's active participation in the case.",
  },
  {
    title: "Separate Living Without Cohabitation",
    icon: Home,
    description:
      "Ohio allows divorce on the ground that the spouses have lived separately and apart without cohabitation for at least one year without interruption. This means no shared residence and no resumption of marital relations during that period. Even brief reconciliation attempts can reset the one-year clock. This is often used when neither spouse wants to allege fault but a full dissolution isn't possible because the parties can't agree on all terms.",
  },
];

const quizQuestions = [
  {
    question:
      "What is the minimum residency requirement to file for divorce in Ohio?",
    options: ["3 months", "6 months", "1 year", "2 years"],
    correctIndex: 1,
    explanation:
      "Either you or your spouse must have lived in Ohio for at least six months to file for divorce.",
  },
  {
    question:
      "What is the difference between a 'divorce' and a 'dissolution' in Ohio?",
    options: [
      "There is no difference",
      "A dissolution requires proving fault",
      "A dissolution requires both parties to agree on all issues",
      "A divorce is automatically faster in every case",
    ],
    correctIndex: 2,
    explanation:
      "A dissolution (no-fault divorce) requires both parties to agree on all issues. A divorce involves one spouse filing a lawsuit and can be resolved through negotiations or court.",
  },
  {
    question: "How does Ohio divide marital property?",
    options: [
      "Always 50/50",
      "The higher earner gets more",
      "Equitably: fair but not always equal",
      "The court doesn't get involved",
    ],
    correctIndex: 2,
    explanation:
      "Ohio uses equitable distribution, meaning the court aims for a fair division considering each party's contributions, but it's not always an equal 50/50 split.",
  },
];

const faqItems = [
  {
    question: "How long does a divorce take in Ohio?",
    answer:
      "An uncontested divorce or dissolution can be finalized in as little as 4-6 weeks after filing. A contested divorce typically takes 6-12 months, depending on the complexity of issues like property division, custody, and support. Cases that go to trial can take longer.",
  },
  {
    question: "How much does a divorce cost in Ohio?",
    answer:
      "Costs vary widely depending on whether the divorce is contested or uncontested. An uncontested dissolution is generally the least expensive option. During your free consultation, we'll provide a transparent fee estimate based on your specific situation.",
  },
  {
    question: "Do I have to go to court for a divorce?",
    answer:
      "Not necessarily. In a dissolution (no-fault), only a brief final hearing is required. In an uncontested divorce, court appearances may be minimal. Contested divorces may require multiple hearings. Your attorney handles most proceedings on your behalf.",
  },
  {
    question: "What happens to our house in a divorce?",
    answer:
      "Ohio uses equitable distribution, meaning the court divides marital property fairly but not always equally. The house may be sold and proceeds split, one spouse may buy out the other, or it may be awarded to one spouse as part of the overall division.",
  },
  {
    question: "Can I get divorced if my spouse doesn't agree?",
    answer:
      "Yes. You do not need your spouse's permission to file for divorce in Ohio. If your spouse refuses to participate, you can still proceed. The court can grant a default judgment after proper service and waiting periods.",
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

const Divorce = () => {
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
            src={divorceBgImage}
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
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Columbus, OH Divorce Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Your Future Doesn't Have to Be Defined by This Moment
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Divorce is one of the hardest things you'll ever go through. You
              deserve an attorney who listens first, explains clearly, and
              fights for what matters most to you.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <AnimatedCTA delay={0.6}>
                <a href="tel:+16146624043" className="btn-cta">
                  <Phone className="w-5 h-5 mr-2" />
                  Free Consultation: 614-662-4043
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
            <h2 className="heading-section mb-6">You're Not Alone in This</h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                If you're reading this page, you're already doing the hard
                thing. You're looking for answers. That takes courage.
              </p>
              <p>
                Every year, thousands of Ohio families go through this same
                process. The uncertainty, the questions about your children,
                your home, your future. It's completely normal to feel
                overwhelmed.
              </p>
              <p>
                We've guided many families through exactly what you're
                facing right now. Before we talk about the law, we want you to
                know: <strong>you are not alone in this.</strong>
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Trusted
                </p>
                <p className="text-body-sm text-base">By Ohio Families</p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Always
                </p>
                <p className="text-body-sm text-base">
                  Confidential & Judgment-Free
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
                  src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=1200&q=80"
                  alt="Woman looking thoughtfully out window"
                  className="w-full h-72 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div
                ref={imageRightAnim.ref}
                className={`space-y-4 ${imageRightAnim.isVisible ? "scroll-visible-right" : "scroll-hidden-right"}`}
              >
                <h3 className="heading-subsection">
                  The Right Choice Depends on Your Situation
                </h3>
                <p className="text-body">
                  No two families are the same. The path that's right for your
                  neighbor may not be right for you. During your free
                  consultation, we'll walk through your specific circumstances
                  and help you understand which approach is best suited to
                  your situation, on your timeline, within your budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Divorce vs Dissolution */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={methodsAnim.ref}
            className={`container max-w-4xl ${methodsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">
              Two Paths Forward: Which Fits Your Situation?
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
                    <Gavel className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Ohio Divorce (Contested or Uncontested)
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  If you and your spouse can't agree on all terms, or if there
                  are fault-based issues at play, a traditional divorce may be
                  the right path. You file the case, and the court helps resolve
                  what you can't settle on your own.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    One party files against the other
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Fault-based or no-fault (incompatibility) grounds available
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Court decides unresolved issues
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
                    <Scale
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Dissolution (No-Fault)
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  If you and your spouse can agree on everything, including custody,
                  property, and support, dissolution is typically faster, less
                  expensive, and less adversarial. You both file together and
                  attend a brief final hearing.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Both parties must agree
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    No fault needs to be proven
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Typically faster & less costly
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">
                    Ohio Residency Requirement
                  </h4>
                  <p className="text-body text-base">
                    To file for either divorce or dissolution in Ohio, either
                    you or your spouse must have lived in the state for at least{" "}
                    <strong>six months</strong>. For a no-fault dissolution, you
                    don't need to prove wrongdoing, only that the marriage can't
                    be saved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Legal Grounds for Fault Divorce */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={groundsAnim.ref}
            className={`container max-w-4xl ${groundsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Understanding Your Legal Options: Grounds for Divorce
            </h2>
            <p className="text-body mb-8">
              Ohio law recognizes nine grounds for fault-based divorce under{" "}
              <strong>Section 3105.01 of the Ohio Revised Code</strong>. Tap
              any ground below to understand how it might apply to your
              situation.
            </p>
            <div
              className={`grid gap-4 ${groundsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {faultGrounds.map((ground) => (
                <ExpandableCard
                  key={ground.title}
                  title={ground.title}
                  icon={ground.icon}
                >
                  {ground.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              Every case is unique. Having experienced legal guidance is
              essential, especially since fault can have a significant impact on
              the outcome.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')",
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
              "Every ending is also a beginning. You just don't know it at the
              time."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Mitch Albom
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Common Divorce Matters - Full-Bleed Upgrade */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')" }}
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
              What Your Divorce Will Address
            </h2>
            <p
              className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Every divorce involves decisions about these four critical areas.
              Understanding them now puts you in a stronger position.
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
                  Division of Property
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Ohio courts use equitable distribution: fair but not always
                  equal. Marital property includes assets acquired during the
                  marriage. The court may consider misconduct when dividing
                  property.
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
                  Alimony & Spousal Support
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Spousal support isn't automatic in Ohio. When parties can't
                  agree, the court decides eligibility, amount, and duration,
                  ensuring both parties can maintain a reasonable standard of
                  living.
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
                  Parental Rights
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Ohio courts divide parental rights based on the child's best
                  interest. Shared parenting doesn't always mean equal time. The
                  court may privately interview the child about their
                  preferences.
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
                  Child Support
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Ohio uses child support guidelines based on the number of
                  children, combined parental income, medical costs, and
                  childcare expenses. The court can deviate from standard
                  calculations when fairness requires it.
                </p>
              </div>
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
                <h2 className="heading-section mb-0">How Prepared Are You?</h2>
              </div>
              <p className="text-body">
                Understanding Ohio divorce law gives you confidence. See where
                you stand with this quick 3-question check.
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
                  Common Questions About Divorce in Ohio
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
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80"
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
              You Deserve a Fresh Start
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              The first step is the hardest, but you don't have to take it
              alone. Call us for a free, confidential consultation. We'll listen
              to your situation, explain your options, and help you see a clear
              path forward.
            </p>
            <div ref={ctaRef} className="flex justify-center">
              {ctaInView ? (
                <AnimatedCTA delay={0.3}>
                  <a
                    href="tel:+16146624043"
                    className="btn-cta text-xl px-12 py-5"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now: 614-662-4043
                  </a>
                </AnimatedCTA>
              ) : (
                <div className="opacity-0">
                  <a
                    href="tel:+16146624043"
                    className="btn-cta text-xl px-12 py-5"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now: 614-662-4043
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

export default Divorce;
