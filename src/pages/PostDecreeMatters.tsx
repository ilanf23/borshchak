import { useState } from "react";
import {
  Phone,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Users,
  DollarSign,
  Heart,
  Home,
  Gavel,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import lawyerworking6 from "@/assets/lawyerworking-6.jpg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const postDecreeTypes = [
  {
    title: "Child Custody Modifications",
    icon: Users,
    description:
      <>Circumstances change after divorce. If you or your former spouse has relocated, remarried, or experienced a shift in work schedule, the original custody arrangement may no longer serve your child's best interests. Under <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.04" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.04(E)</a>, Ohio courts allow modifications when there is a substantial change in circumstances. Our attorneys will help you document the changes and present a compelling case to the court.</>,
  },
  {
    title: "Child Support Modifications",
    icon: DollarSign,
    description:
      "If either parent's income has changed significantly, whether through job loss, promotion, disability, or retirement, child support obligations can be adjusted. Ohio law permits modification when the recalculated amount differs by at least 10% from the current order. We will review your financial situation, calculate the potential new amount, and guide you through the modification process from start to finish.",
  },
  {
    title: "Spousal Support (Alimony) Modifications",
    icon: Heart,
    description:
      <>A sudden loss of assets, change in employment, or remarriage of the receiving spouse can warrant a modification to spousal support. Under <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.18" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3105.18(E)</a>, the original decree must allow for future modification for the court to consider changes. Our attorneys will review your decree's language, assess whether your circumstances qualify, and advocate for a fair adjustment that reflects your current reality.</>,
  },
  {
    title: "Property Division Disputes",
    icon: Home,
    description:
      "If your former spouse failed to transfer property as ordered, hid assets during the original proceedings, or is not complying with the division terms, you can seek enforcement or correction through the court. These disputes can involve real estate, retirement accounts, business interests, and personal property. We will work to ensure you receive everything you were awarded in the original decree.",
  },
  {
    title: "Contempt of Court",
    icon: Gavel,
    description:
      "When a former spouse willfully violates a court order, such as refusing visitation, withholding support payments, or ignoring property transfer deadlines, the court can hold them in contempt. Penalties may include fines, jail time, or attorney fee awards. Our firm regularly handles contempt motions and works to hold non-compliant parties accountable.",
  },
  {
    title: "Relocation Issues",
    icon: RefreshCw,
    description:
      "If a custodial parent wishes to move out of state or a significant distance, they must obtain court approval. The court evaluates how the move affects the child's relationship with the non-custodial parent and whether the move is in the child's best interest. Whether you are the parent seeking to relocate or the parent opposing the move, we can help you navigate this sensitive process.",
  },
];

const modificationVsEnforcement = [
  {
    aspect: "Purpose",
    modification: "Changes the terms of the original court order to reflect new circumstances.",
    enforcement: "Compels compliance with the existing court order as written.",
  },
  {
    aspect: "When to File",
    modification: "When a substantial change in circumstances has occurred (job loss, relocation, remarriage).",
    enforcement: "When your former spouse is violating or ignoring the existing court order.",
  },
  {
    aspect: "Court Standard",
    modification: "Must prove a 'change in circumstances' that justifies altering the order.",
    enforcement: "Must prove the other party is willfully not complying with the order.",
  },
  {
    aspect: "Possible Outcomes",
    modification: "Revised custody schedule, adjusted support amounts, or updated property terms.",
    enforcement: "Contempt findings, fines, wage garnishment, jail time, or attorney fee awards.",
  },
];

const quizQuestions = [
  {
    question: "When can you seek to modify custody or support in a post-decree proceeding in Ohio?",
    options: [
      "Any time you want a change",
      "Only within 1 year of the divorce",
      "When there is a substantial change in circumstances",
      "Only if both parties agree",
    ],
    correctIndex: 2,
    explanation: "Ohio courts require a substantial change in circumstances to modify custody or support after a divorce decree. However, it is important to understand that property division generally cannot be modified after a decree is final - unless the court specifically retained jurisdiction over that issue, or both parties agree to a change. Custody modifications require a substantial change in circumstances plus a best interest finding. Parenting time alone requires only a best interest determination.",
  },
  {
    question: "What is the difference between modification and enforcement?",
    options: [
      "They are the same thing",
      "Modification changes the order; enforcement compels compliance",
      "Enforcement changes the order; modification compels compliance",
      "Neither involves going back to court",
    ],
    correctIndex: 1,
    explanation: "Modification seeks to change the terms of the original order, while enforcement asks the court to compel the other party to follow the existing order.",
  },
  {
    question: "What can happen if your ex-spouse violates a court order?",
    options: [
      "Nothing, court orders are suggestions",
      "They may face contempt charges, fines, or jail time",
      "The order is automatically voided",
      "You must renegotiate privately",
    ],
    correctIndex: 1,
    explanation: "Willful violation of a court order can result in contempt of court charges, which may carry penalties including fines, jail time, and payment of the other party's attorney fees.",
  },
];

const faqItems = [
  {
    question: "What are post-decree matters?",
    answer: "Post-decree matters involve any legal issues that arise after a divorce, dissolution, or custody order has been finalized. Common examples include modifications to custody, child support, or spousal support, as well as enforcement of existing court orders.",
  },
  {
    question: "When can I modify a court order?",
    answer: "It depends on what type of order you are seeking to modify. For custody modifications - including modifications to a Shared Parenting Plan - Ohio courts require a substantial change in circumstances of the child or either parent since the original order was issued. You may also seek termination of a Shared Parenting Plan entirely, which the court can grant if it is in the child's best interest. For parenting time modifications alone, the court applies only the best interest standard - a substantial change in circumstances is not required. For child support, modification is available when the calculated amount differs by at least 10% from the current order. Property division generally cannot be modified after a final decree unless both parties agree or the court specifically retained jurisdiction.",
  },
  {
    question: "How do I enforce a court order my ex isn't following?",
    answer: "You can file a motion for contempt of court, asking the judge to compel compliance. The court has various enforcement tools including wage garnishment, license suspension, fines, and even jail time for willful non-compliance.",
  },
  {
    question: "Can I relocate with my children after divorce?",
    answer: "If the move would significantly change the custody arrangement, you may need to file a motion to modify the custody order. Ohio courts evaluate relocation requests based on the child's best interests, the reason for the move, and the impact on the other parent's relationship with the child.",
  },
  {
    question: "Do I need the same attorney who handled my divorce?",
    answer: "No. While continuity can be helpful, you are free to hire any family law attorney for post-decree matters. What matters most is finding an attorney experienced in modifications and enforcement who understands your current situation.",
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

const PostDecreeMatters = () => {
  const { openConsultation } = useConsultation();
  const typesAnim = useScrollAnimation();
  const compAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{ color: "hsla(40, 30%, 98%, 0.85)", animationDelay: "100ms" }}
            >
              Columbus, OH Post-Decree Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Post-Decree Matters Lawyer in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              If your former spouse has violated your divorce decree, or your circumstances have changed, you need an experienced attorney for post-decree enforcement or modification. Don't let your ex-spouse take advantage of you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-334-6851
              </a>
            </div>
          </div>
        </section>

        {/* What Are Post-Decree Matters */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Are Post-Decree Matters?</h2>
            <div className="space-y-4 text-body">
              <p>
                Post-decree matters arise when issues develop after a divorce or dissolution has been finalized. Life doesn't stop when a judge signs a decree: jobs change, people relocate, children grow, and sometimes one party simply stops following the court's orders.
              </p>
              <p>
                Ohio law provides mechanisms to address these changes through either <strong>modifications</strong> (changing the terms of the original order) or <strong>enforcement actions</strong> (compelling compliance with existing orders). For example, custody modifications are governed by <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.04" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.04</a>, while spousal support modifications fall under <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.18" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3105.18</a>. Borshchak Law Group handles both types of post-decree matters in Columbus.
              </p>
            </div>

            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">Don't Wait to Act</h4>
                  <p className="text-body text-base">
                    If your former spouse is violating the terms of your divorce decree, time matters. The longer violations go unaddressed, the harder they can be to remedy. Contact an attorney as soon as you recognize a problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side (Image Left, Text Right) */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={lawyerworking6}
                alt="Attorney discussing post-decree options with a client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">Your Divorce Decree Is Legally Binding</h3>
                <p className="text-body">
                  A divorce decree is a court order. When your former spouse fails to comply with custody schedules, support payments, or property transfers, you have legal options. Our attorneys help you hold them accountable and protect your rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Post-Decree Matters */}
        <section className="section-padding bg-secondary">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Common Post-Decree Issues</h2>
            <p className="text-body mb-8">
              Post-decree matters can involve any aspect of your original divorce agreement. Tap each category to learn more about how we can help.
            </p>
            <div className="grid gap-4">
              {postDecreeTypes.map((type) => (
                <ExpandableCard key={type.title} title={type.title} icon={type.icon}>
                  {type.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505778276668-26b3ff7af103?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "Your divorce was already stressful enough. Don't let your ex-spouse take advantage of a hard-won agreement."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>We help you enforce what's rightfully yours</p>
          </div>
        </section>

        {/* Modification vs Enforcement Comparison */}
        <section className="section-padding bg-navy">
          <div
            ref={compAnim.ref}
            className={`container max-w-4xl ${compAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Modification vs. Enforcement
            </h2>
            <div className="grid gap-6">
              {modificationVsEnforcement.map((item) => (
                <div key={item.aspect} className="grid md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                      {item.aspect}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Modification</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {item.modification}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Enforcement</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {item.enforcement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Protect What You Worked Hard to Achieve</h2>
            <div className="space-y-4 text-body">
              <p>
                You worked hard to reach a reasonable agreement during your divorce. Whether your former spouse is ignoring custody schedules, falling behind on support, or refusing to transfer property, our attorneys will fight to enforce your rights.
              </p>
              <p>
                If your own circumstances have changed and you need to modify the original terms, we can help you build a strong case for the court. Either way, acting quickly is essential to protecting your interests and your children's well-being.
              </p>
            </div>
            <div className="mt-8">
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-334-6851
              </a>
            </div>
          </div>
        </section>

        {/* Quiz */}
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
              <p className="text-body">How much do you know about post-decree matters in Ohio? Take this quick 3-question quiz.</p>
              <p className="text-body text-sm italic mt-1">For informational purposes only. This is not legal advice.</p>
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
                  Common Questions About Post-Decree Matters
                </h2>
              </div>
              <p className="text-body">
                Answers to the questions we hear most often.
              </p>
            </div>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">Life Changed? Your Court Order Can Too.</h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">Post-decree modifications protect your rights as circumstances evolve. Call us for a free consultation.</p>
            <a href="tel:+16143346851" className="btn-cta text-xl px-12 py-5"><Phone className="w-5 h-5 mr-2" />Call Us Now: 614-334-6851</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PostDecreeMatters;
