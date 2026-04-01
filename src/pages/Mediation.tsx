import { useState, useRef } from "react";
import {
  Phone,
  CheckCircle2,
  Scale,
  Users,
  Shield,
  FileText,
  MessageCircle,
  Heart,
  Gavel,
  ChevronDown,
  BookOpen,
  HelpCircle,
  HandHeart,
  Clock,
  DollarSign,
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

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const mediationBenefits = [
  {
    title: "Lower Cost",
    icon: DollarSign,
    description:
      "Mediation is significantly less expensive than litigation in most cases. Court battles involve filing fees, discovery costs, expert witnesses, and extensive attorney time that can quickly escalate. Mediation streamlines the process by focusing both parties on resolution rather than combat. Your attorney helps you understand the cost comparison so you can make an informed decision about which path is right for your budget.",
  },
  {
    title: "Faster Resolution",
    icon: Clock,
    description:
      "While a contested divorce can take 6 to 12 months or longer, mediation can often be completed in a matter of weeks. Sessions are scheduled at the convenience of both parties rather than waiting for court dates. The sooner you reach an agreement, the sooner you can move forward with your life. Your attorney ensures the pace of mediation doesn't come at the expense of thoroughness.",
  },
  {
    title: "Greater Control",
    icon: Shield,
    description:
      "In litigation, a judge makes final decisions about your family. In mediation, you and your spouse maintain control over the outcome. You can craft creative solutions tailored to your family's unique needs rather than accepting a one-size-fits-all court ruling. Your attorney helps you evaluate proposals and ensures any agreement truly serves your interests.",
  },
  {
    title: "Preserved Relationships",
    icon: Heart,
    description:
      "Mediation encourages cooperation and communication rather than adversarial combat. This is especially important when children are involved and you'll need to co-parent for years to come. The collaborative nature of mediation can set a positive tone for your post-divorce relationship. Your attorney supports productive dialogue while protecting your rights.",
  },
  {
    title: "Confidentiality",
    icon: FileText,
    description:
      "Unlike court proceedings which are part of the public record, mediation sessions are confidential. What is said during mediation generally cannot be used in court if mediation fails. This privacy encourages honest communication and creative problem-solving. Your attorney helps you understand what protections confidentiality provides and its limitations.",
  },
  {
    title: "Child-Focused Solutions",
    icon: Users,
    description:
      "Mediation allows parents to develop custody and parenting plans that are specifically designed for their children's needs. Rather than a judge who doesn't know your family making decisions, you and your co-parent can create arrangements that reflect your children's schedules, preferences, and wellbeing. Your attorney ensures any parenting plan meets Ohio legal requirements while serving your children's best interests.",
  },
];

const quizQuestions = [
  {
    question: "What is the mediator's role in divorce mediation?",
    options: [
      "To decide who wins",
      "To represent one party",
      "To facilitate negotiation between both parties",
      "To file court documents",
    ],
    correctIndex: 2,
    explanation:
      "A mediator is a neutral third party who facilitates communication and negotiation between both spouses. They do not make decisions or represent either party.",
  },
  {
    question: "Is a mediated agreement legally binding?",
    options: [
      "No, it's just a suggestion",
      "Only if both parties shake hands",
      "Yes, once signed and approved by the court",
      "Only for custody issues",
    ],
    correctIndex: 2,
    explanation:
      "A mediated agreement becomes legally binding once both parties sign it and it is approved by the court as part of the final divorce decree.",
  },
  {
    question: "When is mediation NOT recommended?",
    options: [
      "When both parties want to save money",
      "When there is domestic violence or significant power imbalance",
      "When children are involved",
      "When the marriage was short",
    ],
    correctIndex: 1,
    explanation:
      "Mediation is generally not recommended when there is domestic violence, abuse, or a significant power imbalance between the parties, as it may not result in a fair outcome.",
  },
];

const faqItems = [
  {
    question: "Do I still need my own lawyer during mediation?",
    answer:
      "Absolutely. While the mediator is neutral and cannot give legal advice to either party, your own attorney reviews proposals, identifies potential issues, and ensures any agreement protects your rights. Many people enter mediation without a lawyer and later regret signing an unfavorable agreement.",
  },
  {
    question: "What happens if mediation fails?",
    answer:
      "If mediation does not result in a complete agreement, you can still pursue traditional litigation. Anything discussed during mediation is confidential and generally cannot be used in court. Many couples resolve some issues in mediation and litigate only the remaining disputes.",
  },
  {
    question: "How many mediation sessions will I need?",
    answer:
      "Most mediations are completed in 2 to 5 sessions, though complex cases with significant assets or contested custody may require more. Each session typically lasts 2 to 4 hours. Your attorney can help estimate the number of sessions based on the issues in your case.",
  },
  {
    question: "Can mediation address all divorce issues?",
    answer:
      "Yes. Mediation can address property division, spousal support, child custody, child support, and any other issue that needs to be resolved. If you reach agreement on all issues, the mediator drafts a memorandum of understanding that your attorneys convert into a formal separation agreement.",
  },
  {
    question: "Is mediation appropriate for high-conflict divorces?",
    answer:
      "It depends on the nature of the conflict. If both parties can communicate respectfully with the help of a mediator, mediation can work even in high-conflict situations. However, if there is domestic violence, substance abuse, or one party refuses to negotiate in good faith, litigation may be more appropriate.",
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

const Mediation = () => {
  const { openConsultation } = useConsultation();
  const empathyAnim = useScrollAnimation();
  const imageLeftAnim = useScrollAnimation(0.15, "left");
  const imageRightAnim = useScrollAnimation(0.15, "right");
  const processAnim = useScrollAnimation();
  const benefitsAnim = useScrollAnimation();
  const quoteAnim = useScrollAnimation(0.2, "scale");
  const scenariosAnim = useScrollAnimation();
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
        <section
          className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
          style={{
            backgroundColor: "hsl(var(--primary))",
          }}
        >
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
              Mediation & Alternative Resolution
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Resolution Without the Courtroom Battle
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Not every divorce needs to be a fight. When both parties are
              willing, mediation can achieve fair outcomes faster, with less
              expense and emotional toll. We guide productive negotiations while
              protecting your interests.
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
              There Is a Better Way Forward
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                If you're dreading a long, expensive court battle, you're not
                alone. Many couples feel trapped between giving up what they
                deserve and enduring months of adversarial litigation.
              </p>
              <p>
                Mediation offers a third path, one where you and your spouse
                work together, with professional guidance, to reach an agreement
                that works for both of you. It's not about being soft; it's
                about being smart.
              </p>
              <p>
                We've helped many Ohio families resolve their disputes
                through mediation.{" "}
                <strong>
                  Your attorney is with you every step of the way.
                </strong>
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Often
                </p>
                <p className="text-body-sm text-base">
                  Less Costly Than Litigation
                </p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  High
                </p>
                <p className="text-body-sm text-base">
                  Resolution Rate
                </p>
              </div>
              <div className="card-bordered text-center py-5">
                <p
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: "hsl(var(--green-accent))" }}
                >
                  Weeks
                </p>
                <p className="text-body-sm text-base">
                  Not Months to Resolution
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
                  src="https://images.unsplash.com/photo-1529070538774-1560d23cee86?w=1200&q=80"
                  alt="Two people in conversation"
                  className="w-full h-72 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div
                ref={imageRightAnim.ref}
                className={`space-y-4 ${imageRightAnim.isVisible ? "scroll-visible-right" : "scroll-hidden-right"}`}
              >
                <h3 className="heading-subsection">
                  When Talking It Through Makes More Sense Than Fighting It Out
                </h3>
                <p className="text-body">
                  Mediation isn't about giving in; it's about finding common
                  ground. A trained mediator helps both parties communicate
                  productively, identify shared goals, and negotiate terms that
                  reflect each person's priorities.
                </p>
                <p className="text-body">
                  Your attorney attends every session with you, reviews every
                  proposal, and ensures you never agree to something that
                  doesn't serve your interests. You get the benefits of
                  collaboration with the protection of experienced legal counsel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. How Mediation Works */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={processAnim.ref}
            className={`container max-w-4xl ${processAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">
              How Mediation Works: Three Steps to Resolution
            </h2>
            <div
              className={`grid md:grid-cols-3 gap-6 mb-10 ${processAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
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
                    Choose a Mediator
                  </h3>
                </div>
                <p className="text-body text-lg">
                  Both parties select a neutral, trained mediator, often a
                  retired judge or experienced family law attorney. Your lawyer
                  helps you choose someone well-suited to the issues in your
                  case.
                </p>
              </div>

              <div className="card-bordered transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "hsla(152, 45%, 38%, 0.1)",
                    }}
                  >
                    <MessageCircle
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-xl">Negotiate</h3>
                </div>
                <p className="text-body text-lg">
                  Over a series of structured sessions, the mediator guides
                  discussion on property, custody, support, and other issues.
                  Your attorney reviews every proposal and advises you in real
                  time.
                </p>
              </div>

              <div className="card-bordered transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">Finalize</h3>
                </div>
                <p className="text-body text-lg">
                  Once you reach agreement, the mediator drafts a memorandum of
                  understanding. Your attorney converts it into a formal
                  separation agreement and files it with the court for approval.
                </p>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">
                    Your Attorney's Role in Mediation
                  </h4>
                  <p className="text-body text-base">
                    The mediator is neutral; they don't represent either party.
                    That's why having your own attorney is essential. Under{" "}
                    <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.052" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.052</a>,
                    courts may order mediation in custody disputes. Your lawyer
                    prepares you for each session, evaluates proposals against
                    Ohio law, and ensures the final agreement protects your
                    rights and your children's wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Benefits Expandable Cards */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={benefitsAnim.ref}
            className={`container max-w-4xl ${benefitsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Why Choose Mediation Over Litigation?
            </h2>
            <p className="text-body mb-8">
              Mediation offers meaningful advantages for families who want to
              resolve their disputes with less conflict, less cost, and more
              control.{" "}
              <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.052" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.052</a>{" "}
              also addresses important protections, including domestic violence considerations in court-ordered mediation.
              Tap any benefit below to learn more.
            </p>
            <div
              className={`grid gap-4 ${benefitsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {mediationBenefits.map((benefit) => (
                <ExpandableCard
                  key={benefit.title}
                  title={benefit.title}
                  icon={benefit.icon}
                >
                  {benefit.description}
                </ExpandableCard>
              ))}
            </div>
            <p className="text-body text-base mt-6 italic">
              Mediation isn't right for every situation. During your
              consultation, we'll give you an honest assessment of whether it's
              the best path for your case.
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
              "url('https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=1600&q=80')",
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
              "Peace is not the absence of conflict, but the ability to cope
              with it."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
            >
              Mahatma Gandhi
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Dark Section - When Mediation Works Best */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{
            backgroundColor: "hsl(var(--primary))",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 18%, 0.88)" }}
          />
          <div
            ref={scenariosAnim.ref}
            className={`container max-w-6xl relative z-10 ${scenariosAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
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
              When Mediation Works Best
            </h2>
            <p
              className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
            >
              Mediation is most effective when certain conditions are present.
              Here are the scenarios where it tends to produce the best
              outcomes.
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
                  Both Parties Want Resolution
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Mediation works best when both spouses genuinely want to reach
                  an agreement. Willingness to negotiate in good faith is the
                  single most important factor for success.
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
                  Children Are Involved
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  When you'll need to co-parent for years to come, mediation
                  helps establish a cooperative tone. Children benefit when their
                  parents can communicate respectfully about their needs.
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
                  Privacy Matters
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Court proceedings are public record. If you want to keep
                  financial details, personal matters, and family business out of
                  the public eye, mediation offers confidentiality that
                  litigation cannot.
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
                  Budget Is a Concern
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.9)" }}
                >
                  Litigation costs add up fast: filing fees, discovery,
                  depositions, expert witnesses, and trial preparation. Mediation
                  typically resolves disputes at a fraction of the cost,
                  preserving resources for your family's future.
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
                  Test Your Mediation Knowledge
                </h2>
              </div>
              <p className="text-body">
                Understanding the mediation process helps you make better
                decisions. See how much you already know with this quick check.
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
                  Common Questions About Mediation
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often about the mediation
                process.
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
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80"
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
              Explore a Better Path Forward
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              You don't have to choose between protecting your rights and
              preserving your peace. Call us for a free, confidential
              consultation. We'll assess whether mediation is right for your
              situation and help you understand every option available.
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

export default Mediation;
