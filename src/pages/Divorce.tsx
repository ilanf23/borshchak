import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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
import awardAvvoClientsChoice from "@/assets/award-avvo-clients-choice.png";
import awardExpertise from "@/assets/award-expertise.png";
import awardTop40Under40 from "@/assets/award-top40-under40.png";
import awardTop10FamilyLaw from "@/assets/award-top10-family-law.png";
import award10BestClientSatisfaction from "@/assets/award-10best-client-satisfaction.png";
import lawyerworking1 from "@/assets/lawyerworking-1.jpg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const faultGrounds = [
  {
    title: "Gross Neglect of Duty",
    icon: HeartOff,
    description:
      "This ground generally refers to serious failure to fulfill marital obligations. Whether it applies depends on the facts, the available proof, and the overall strategy in the case.",
  },
  {
    title: "Extreme Cruelty",
    icon: AlertTriangle,
    description:
      "Extreme cruelty can involve serious mistreatment within the marriage. The legal significance of this ground depends on the evidence and how the case is being presented.",
  },
  {
    title: "Adultery",
    icon: Heart,
    description:
      "Adultery is one of the statutory grounds for divorce in Ohio. In some cases, it may matter more to settlement posture or case strategy than to the final outcome on every issue.",
  },
  {
    title: "Bigamy",
    icon: Users,
    description:
      "Ohio law recognizes as a ground that either party had a husband or wife living at the time of the marriage from which divorce is sought.",
  },
  {
    title: "Willful Desertion",
    icon: UserX,
    description:
      "Ohio law states this as willful absence of the adverse party for one year. Whether it applies turns on the timeline and facts of the separation.",
  },
  {
    title: "Fraudulent Contract",
    icon: ShieldAlert,
    description:
      "This ground involves fraud related to the marriage contract itself. These claims are highly fact specific and should be evaluated carefully.",
  },
  {
    title: "Habitual Drunkenness",
    icon: Wine,
    description:
      "Habitual drunkenness is a statutory ground for divorce in Ohio. The court will still focus on the actual evidence and the broader issues in the case.",
  },
  {
    title: "Imprisonment",
    icon: Lock,
    description:
      "Ohio law recognizes imprisonment of the adverse party in a state or federal correctional institution at the time of filing as a ground for divorce.",
  },
  {
    title: "Separate Living Without Cohabitation",
    icon: Home,
    description:
      "Ohio law allows divorce when spouses have lived separate and apart, without interruption and without cohabitation, for one year.",
  },
];

const quizQuestions = [
  {
    question:
      "What is the minimum residency requirement to file for divorce in Ohio?",
    options: ["3 months", "6 months", "1 year", "2 years"],
    correctIndex: 1,
    explanation:
      "Ohio requires the plaintiff in a divorce action to have been a resident of the state for at least six months immediately before filing.",
  },
  {
    question:
      "Is spousal support automatic in every Ohio divorce?",
    options: ["Yes", "No"],
    correctIndex: 1,
    explanation:
      "Ohio courts may award reasonable spousal support if requested, but it is not automatic.",
  },
  {
    question:
      "What standard does an Ohio court use when deciding parenting issues involving children?",
    options: [
      "Equal time in every case",
      "The parent who files first",
      "The best interests of the child",
      "The child's preference alone",
    ],
    correctIndex: 2,
    explanation:
      "Under Ohio Revised Code Section 3109.04(F)(1), courts use the child's best interests standard when allocating parental rights and responsibilities.",
  },
];

const faqItems = [
  {
    question: "How long does a divorce take in Ohio?",
    answer:
      "It depends on the level of agreement, the complexity of the issues, and the court's schedule. The Ohio Supreme Court has established general timelines: divorces without children should ideally resolve within 9 to 12 months, while divorces involving children should resolve within 18 months. Many cases resolve by negotiated agreement before trial, which can significantly shorten the timeline. Heavily contested cases that proceed to trial will take longer. The earlier you have experienced legal representation, the better positioned you are to move efficiently through the process.",
  },
  {
    question: "How much does a divorce cost in Ohio?",
    answer:
      "The cost depends on the issues involved, the level of conflict, and how much court involvement is required. Cases involving disputes over parenting, support, or property usually require more time and work than cases resolved by agreement.",
  },
  {
    question: "Do I have to go to court for a divorce?",
    answer:
      "In a divorce, yes — more often than not, you will need to appear in court. Divorce proceedings are conducted before a judge, particularly when issues are contested. Dissolution is different. In a dissolution, both spouses agree on all terms in advance and the court appearance is typically a brief, uncontested hearing. If avoiding court is important to you, dissolution may be worth exploring if you and your spouse are in agreement.",
  },
  {
    question: "What happens to our house in a divorce?",
    answer:
      "That depends on whether the home is marital or separate property, how much equity exists, whether one spouse wants to keep it, and what overall division is equitable under Ohio law.",
  },
  {
    question: "Can I get divorced if my spouse does not agree?",
    answer:
      "Yes, potentially. A dissolution requires agreement by both spouses. A divorce does not. Ohio law allows a divorce action to proceed on recognized legal grounds even if the other spouse does not want the divorce.",
  },
  {
    question: "What is the difference between marital and separate property in Ohio?",
    answer:
      "Marital property includes all assets and debts accumulated during the marriage and is subject to division. Separate property — such as assets owned before the marriage, inheritances, or gifts received by one spouse — is generally not subject to division, but the party claiming it must be able to trace and prove it. If separate property has been commingled with marital assets, it can lose its separate character. An experienced attorney will work to identify and protect your separate property throughout the divorce process.",
  },
  {
    question: "Does Ohio recognize same-sex divorce?",
    answer:
      "Yes. Following the Supreme Court's decision in Obergefell v. Hodges, same-sex couples in Ohio have the same rights to marry — and to divorce — as any other couple. All the same legal processes, property division rules, custody standards, and support considerations apply equally to same-sex divorces in Ohio.",
  },
  {
    question: "What if my divorce involves significant assets or a business?",
    answer: (
      <>
        High-asset divorces involving business interests, investment portfolios, real estate holdings, stock options, or complex financial arrangements require specialized legal and financial expertise. Borshchak Law Group works with forensic accountants, business valuators, CPAs, and other experts to ensure your assets are accurately valued and fairly divided.
        <span> <Link to="/high-asset-divorce" className="text-accent underline hover:opacity-80">Learn more about high-asset divorce →</Link></span>
      </>
    ),
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
  const custodyAnim = useScrollAnimation();
  const relatedAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const teamAnim = useScrollAnimation();
  const assetDivisionAnim = useScrollAnimation();
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
              Clear Guidance for the Next Chapter of Your Life
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Divorce can affect your children, your finances, your home, and
              your future. You need clear answers, a practical strategy, and an
              attorney who understands what is at stake.
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
            <h2 className="heading-section mb-6">You Are Not Alone in This</h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                If you are on this page, you are probably looking for answers at
                a difficult time. That is completely normal.
              </p>
              <p>
                At Borshchak Law Group, we help clients in Columbus and Central
                Ohio understand their options, protect what matters most, and
                move forward with a clearer plan.
              </p>
              <p>
                Divorce is one of the most emotionally charged experiences a
                person can face — especially when children are involved. Strong
                emotions can lead to decisions that feel right in the moment but
                carry long-term consequences. Our job is to help you stay
                grounded. We work tirelessly to ensure every client we represent
                makes calculated, informed decisions that protect their future
                and insulate them from unnecessary risk.
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
                  Confidential
                </p>
                <p className="text-body-sm text-base">
                  Private and Judgment Free
                </p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Strategic
                </p>
                <p className="text-body-sm text-base">
                  Your Goals Shape Our Approach
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
                  src={lawyerworking1}
                  alt="Attorney Dmitriy Borshchak meeting with a client in Columbus"
                  className="w-full h-72 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div
                ref={imageRightAnim.ref}
                className={`space-y-4 ${imageRightAnim.isVisible ? "scroll-visible-right" : "scroll-hidden-right"}`}
              >
                <h3 className="heading-subsection">
                  The Right Path Depends on Your Situation
                </h3>
                <p className="text-body">
                  Some cases are resolved through agreement. Others involve
                  disputes over property, support, parenting, or the terms of
                  the divorce itself. During your consultation, we can help you
                  understand which path fits your situation, timeline, and
                  priorities.
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
            <h2 className="heading-section mb-4">
              Two Paths Forward: Which Fits Your Situation?
            </h2>
            <p className="text-body text-lg mb-10">
              In Ohio, ending a marriage usually happens through either divorce
              or dissolution. The right option depends on whether both spouses
              agree on all major terms. Ohio law recognizes multiple grounds for
              divorce, including incompatibility unless denied, and allows
              dissolution when both spouses file together with a full agreement.
            </p>
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
                    Ohio Divorce
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A divorce begins when one spouse files a complaint asking the
                  court to end the marriage. It may be contested or uncontested,
                  and it can involve disputes over parenting, support, property,
                  debt, or legal grounds. Ohio law allows divorce on specific
                  causes, including incompatibility unless denied by either
                  party.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    One spouse files the case
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Can be contested or uncontested
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    May involve court decisions on unresolved issues
                  </div>
                </div>
              </div>

              <Link to="/dissolution" className="block">
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
                      Dissolution
                    </h3>
                  </div>
                  <p className="text-body text-lg mb-4">
                    A dissolution is a joint filing. Both spouses must fully agree
                    on all terms before filing, including property division,
                    support, and parenting arrangements if children are involved.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-body text-base">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--green-accent))" }}
                      />
                      Both spouses file together
                    </div>
                    <div className="flex items-start gap-2 text-body text-base">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--green-accent))" }}
                      />
                      Full agreement is required in advance
                    </div>
                    <div className="flex items-start gap-2 text-body text-base">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--green-accent))" }}
                      />
                      Often more efficient and less adversarial
                    </div>
                  </div>
                </div>
              </Link>
            </div>

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
                    Contested Divorce
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  A contested divorce occurs when spouses cannot agree on one or
                  more major issues — such as property division, parenting
                  arrangements, or spousal support. The court steps in to resolve
                  disputed matters, which typically means more time, more cost,
                  and a greater need for experienced legal representation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Court decides unresolved issues
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Requires strong legal advocacy
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Can involve hearings, discovery, and trial
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
                    Uncontested Divorce
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  An uncontested divorce occurs when both spouses agree on all
                  major issues but one spouse initiates the filing. Unlike
                  dissolution, an uncontested divorce still follows the divorce
                  process — but agreement on terms can significantly reduce time
                  and cost.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    One spouse files, both agree on terms
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Faster and less expensive than contested
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Still follows the divorce process, not dissolution
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
                    To file for divorce in Ohio, the plaintiff must have lived
                    in the state for at least{" "}
                    <strong>six months</strong> immediately before filing.
                  </p>
                </div>
              </div>
            </div>
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
              Most divorce cases come down to a few major issues.
              Understanding them early can help you make better decisions
              throughout the process.
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
                  Property Division
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Ohio follows an equitable division framework for marital
                  property. Courts often begin with equal division, but may
                  divide property differently if equal division would be
                  inequitable. Courts may also address financial misconduct,
                  including concealment, dissipation, or fraudulent transfer of
                  assets.
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
                  Spousal Support
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.8)" }}
                >
                  Spousal support is not automatic in Ohio. If requested, the
                  court may award reasonable support after considering statutory
                  factors such as income, earning ability, age, health, duration
                  of the marriage, standard of living, assets, debts, and other
                  relevant circumstances. Temporary support may also be awarded
                  while the case is pending.
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
                  Under{" "}
                  <a
                    href="https://codes.ohio.gov/ohio-revised-code/section-3109.04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                    style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                  >
                    Ohio Revised Code Section 3109.04(F)(1)
                  </a>
                  , the court may allocate parental rights and responsibilities
                  based on the child's best interests. Depending on the
                  circumstances, the court may approve shared parenting or
                  designate one parent as residential parent and legal custodian.
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
                  Child support is typically determined under Ohio's statutory
                  framework and depends on the facts of the case, including
                  income and parenting arrangements. If children are involved,
                  support should be evaluated as part of the overall divorce
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Team Approach */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={teamAnim.ref}
            className={`container max-w-4xl ${teamAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              A Team Approach to Your Case
            </h2>
            <p className="text-body mb-10">
              Some divorce cases involve complicated financial situations — closely
              held business interests, stock options, deferred compensation, real
              estate holdings, trusts, or complex tax consequences. In these
              matters, legal expertise alone is not enough. At Borshchak Law Group,
              we work closely with a network of outside professionals to ensure our
              strategy is supported by expert analysis and hard data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  Forensic Accountants
                </h3>
                <p className="text-body text-base">
                  Uncovering hidden assets, tracing funds, and analyzing complex
                  financial records to ensure nothing is missed.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  CPAs &amp; Tax Experts
                </h3>
                <p className="text-body text-base">
                  Evaluating the tax implications of asset division, spousal
                  support, and settlement terms so you understand the full
                  financial picture.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  Business Valuators
                </h3>
                <p className="text-body text-base">
                  Providing defensible, court-ready valuations of businesses,
                  partnerships, and professional practices.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  Real Estate Appraisers
                </h3>
                <p className="text-body text-base">
                  Accurately valuing the marital home and all real property
                  interests to support a fair division.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  Child Psychologists
                </h3>
                <p className="text-body text-base">
                  Offering expert insight on parenting arrangements and the best
                  interests of children in contested custody matters.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">
                  Other Expert Witnesses
                </h3>
                <p className="text-body text-base">
                  Including forensic examiners, former FBI agents, and other
                  specialists when the complexity of a case demands it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Understanding Asset Division */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={assetDivisionAnim.ref}
            className={`container max-w-4xl ${assetDivisionAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Understanding Asset Division in an Ohio Divorce
            </h2>

            <div className="card-elevated mb-6">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="heading-subsection mb-2">
                    Marital Property vs. Separate Property
                  </h3>
                  <p className="text-body text-base">
                    In Ohio, all property acquired during the marriage is presumed to be marital property and subject to division — unless a party can prove otherwise. Separate property includes assets owned before the marriage, inheritances, and gifts received by one spouse, provided they have not been commingled with marital assets. Ohio courts will equally divide marital assets and debts unless such equal division would be unfair. A detail-oriented attorney will trace, identify, and establish your separate property so that it is protected and your spouse does not receive property to which they are not entitled.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated mb-6">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="heading-subsection mb-2">
                    Dividing Assets in a Long-Term Marriage
                  </h3>
                  <p className="text-body text-base">
                    Divorces involving marriages of 20 years or longer carry unique challenges. The amount of accumulated property — real estate, retirement accounts, pensions, investments, and personal assets — requires thorough identification and valuation. For older couples, issues like Social Security benefits, retirement income, and healthcare coverage add further complexity. These financial decisions can have life-altering consequences if not handled carefully by an experienced attorney.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated mb-6">
              <div className="flex items-start gap-3">
                <Gavel className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="heading-subsection mb-2">
                    When a Divorce Decree Can Be Modified
                  </h3>
                  <p className="text-body text-base">
                    Most divorce settlements are final once approved by the court. However, certain terms can be revisited if the court retained jurisdiction to modify them. Spousal support and child-related matters are the most common areas subject to post-decree modification. Property division, on the other hand, generally cannot be modified after a final decree unless both parties agree or the court specifically retained jurisdiction over those terms.
                  </p>
                  <Link to="/post-decree-matters" className="text-accent underline hover:opacity-80 text-sm mt-2 inline-block">
                    Learn more about Post-Decree Matters →
                  </Link>
                </div>
              </div>
            </div>
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
              className="text-2xl md:text-3xl font-serif font-medium leading-relaxed"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              A divorce case is not just about ending a marriage. It is about
              resolving the issues that shape what comes next.
            </p>
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
              Ohio law allows divorce on specific legal grounds. In many cases,
              incompatibility is the most practical route. In others, the facts
              may shape strategy, negotiations, or the issues that need to be
              addressed in court. Ohio lists causes including adultery, extreme
              cruelty, gross neglect of duty, habitual drunkenness, imprisonment
              at the time of filing, living separate and apart for one year
              without cohabitation, and incompatibility unless denied.
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
              Every case is different. The right legal strategy depends on the
              facts, the evidence, and the issues that matter most in your case.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8b. Related Practice Areas */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={relatedAnim.ref}
            className={`container max-w-4xl text-center ${relatedAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold tracking-wide uppercase mb-6"
              style={{ color: "hsl(var(--primary))" }}
            >
              Divorce often involves issues that extend well beyond the marriage
              itself.
            </h2>
            <p className="text-body text-lg max-w-3xl mx-auto mb-12">
              Understanding how Ohio law handles these related matters can help
              you prepare for the decisions ahead. Under{" "}
              <a
                href="https://codes.ohio.gov/ohio-revised-code/section-3109.04"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                Ohio Revised Code Section 3109.04(F)(1)
              </a>
              , the court allocates parental rights and responsibilities based
              on the child's best interests.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              <Link
                to="/custody"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Child Custody
              </Link>
              <Link
                to="/child-support"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Child Support
              </Link>
              <Link
                to="/spousal-support"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Spousal Support
              </Link>
              <Link
                to="/assets"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Property & Assets
              </Link>
              <Link
                to="/high-asset-divorce"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                High Asset Divorce
              </Link>
              <Link
                to="/dissolution"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Dissolution
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link
                to="/contempt-proceedings"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Contempt Proceedings
              </Link>
              <Link
                to="/post-decree-matters"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--secondary))",
                  color: "hsl(var(--primary))",
                }}
              >
                Post-Decree Matters
              </Link>
              <a
                href="tel:+16143346851"
                className="block py-3 px-4 text-xs md:text-sm font-bold tracking-widest uppercase text-center transition-all duration-200 rounded hover:opacity-80"
                style={{
                  backgroundColor: "hsl(var(--accent))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Request a Consultation
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 9. Quiz */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding-sm bg-card"
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
                Understanding the basics of Ohio divorce law can help you ask
                better questions and make informed decisions.
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
        <section className="pt-20 md:pt-28 pb-16 md:pb-24">
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
        {/* Award Badges */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm bg-card">
          <div className="container">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">
              Recognized for Excellence
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <img src={awardAvvoClientsChoice} alt="Avvo Clients' Choice" className="h-16 object-contain opacity-80" />
              <img src={awardExpertise} alt="Expertise" className="h-16 object-contain opacity-80" />
              <img src={awardTop40Under40} alt="Top 40 Under 40" className="h-16 object-contain opacity-80" />
              <img src={awardTop10FamilyLaw} alt="Top 10 Family Law" className="h-16 object-contain opacity-80" />
              <img src={award10BestClientSatisfaction} alt="10 Best Client Satisfaction" className="h-16 object-contain opacity-80" />
            </div>
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
              Get Clear Answers About Your Options
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If you are considering divorce in Columbus or Central Ohio, start
              by getting reliable information about your rights, your options,
              and the issues most likely to affect your future.
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

export default Divorce;
