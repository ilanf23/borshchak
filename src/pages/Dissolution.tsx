import { useState } from "react";
import { Phone, CheckCircle2, Scale, FileText, ChevronDown, HelpCircle, Users, Clock, DollarSign, Heart, Home, Baby, CreditCard, FileCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const requirements = [
  {
    title: "Agree to All Terms Mutually",
    icon: Users,
    description: "Both parties must agree in advance on property distribution, debt division, child support, and spousal support. They should also agree to child-related issues such as visitation and custody. An experienced dissolution attorney can help you and your spouse discuss and resolve these matters before filing.",
  },
  {
    title: "Sign All Documents",
    icon: FileCheck,
    description: "Both parties must sign relevant documents including the separation agreement and dissolution petition. If you have children and plan to share parenting, the court will require a shared parenting plan dictating all parenting responsibilities and rights.",
  },
  {
    title: "Attend the Court Hearing",
    icon: Scale,
    description: "You and your partner must be physically present during the dissolution hearing. If the court cannot hear your case within 90 days due to absence, it must dismiss or convert the case to a divorce, leading to more time and expense.",
  },
  {
    title: "No Extramarital Offspring",
    icon: Baby,
    description: "Ohio presumes that children born during marriage are the husband's. If there are questions about paternity or the wife is pregnant, dissolution may still be possible but may require additional procedures. An attorney can advise on how these circumstances affect your case.",
  },
  {
    title: "Residency Requirement",
    icon: Home,
    description: <>The husband or wife must have been residing in Ohio for six or more months before filing. This is required under <a href="https://codes.ohio.gov/ohio-revised-code/section-3105.62" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Rev. Code § 3105.62</a>.</>,
  },
];

const requiredDocuments = [
  "Petition for dissolution",
  "Separation agreement",
  "Affidavit of property",
  "Affidavit of expenses and income",
  "Parenting proceeding affidavit",
  "Shared parenting plan",
  "Health insurance affidavit",
  "Confidential disclosure form",
  "Certificate of assignment",
  "Waiver of service",
  "Decree of dissolution",
  "Acknowledgment of legal representation",
  "Judgment entry",
];

const separationAgreementItems = [
  { label: "Spousal Support", icon: DollarSign },
  { label: "Child Support", icon: Heart },
  { label: "Division of Marital & Separate Property", icon: Home },
  { label: "Division of Marital Debt", icon: CreditCard },
  { label: "Allocation of Parental Rights", icon: Users },
  { label: "Parenting Time", icon: Baby },
];

const differences = [
  {
    aspect: "Agreement",
    dissolution: "Both parties must agree on all legal issues. Several states call this an 'uncontested divorce.'",
    divorce: "Involves prolonged proceedings and a trial before a final hearing. Often referred to as a 'contested divorce.'",
  },
  {
    aspect: "Speed & Ease",
    dissolution: "Does not force you into the many steps that come with divorce. Hearing must occur within 30 to 90 days of filing.",
    divorce: "You must go through all the legal steps. Finalizing the procedure takes significantly more time.",
  },
  {
    aspect: "Expenses",
    dissolution: "Does not require separate filings. The filing fee ($150 to $400 depending on county) may be split between both parties if they agree to do so — but this is not required.",
    divorce: "You bear the filing cost alone. The process is more complex, so you often require a lawyer.",
  },
];

const quizQuestions = [
  {
    question: "What is required for a dissolution of marriage in Ohio?",
    options: [
      "Only one spouse needs to agree",
      "Both spouses must agree on all terms",
      "A trial before a judge is mandatory",
      "You must be separated for one year first",
    ],
    correctIndex: 1,
    explanation: "Ohio dissolution requires both parties to mutually agree on all issues including property, support, and custody before filing a joint petition.",
  },
  {
    question: "How long after filing must the dissolution hearing occur?",
    options: [
      "Within 30 days",
      "Between 30 and 90 days",
      "Within 6 months",
      "There is no time limit",
    ],
    correctIndex: 1,
    explanation: "After filing the petition, at least 30 days must pass before the hearing, but the judge must hear your case within 90 days of filing.",
  },
  {
    question: "What happens if one spouse doesn't attend the dissolution hearing?",
    options: [
      "The hearing proceeds without them",
      "It is rescheduled automatically",
      "The case may be dismissed or converted to divorce",
      "The other spouse receives a default judgment",
    ],
    correctIndex: 2,
    explanation: "If a spouse does not attend, the hearing may be continued to a later date depending on the circumstances. However, if the court cannot hear the case within 90 days of filing, it must dismiss the case or convert it to a divorce — which typically costs more time and money.",
  },
];

const faqItems = [
  {
    question: "What is the difference between dissolution and divorce in Ohio?",
    answer: "A dissolution requires both spouses to agree on all terms, including property division, custody, support, and debt allocation, before filing. A divorce can be filed unilaterally and allows the court to resolve disputed issues. Dissolution is generally faster and less expensive.",
  },
  {
    question: "How long does a dissolution take in Ohio?",
    answer: "Once both parties have signed the separation agreement and filed the petition, a dissolution hearing is typically scheduled within 30 to 90 days. The entire process can be completed in as little as 4 to 6 weeks if all paperwork is in order.",
  },
  {
    question: "Can a dissolution be converted to a divorce?",
    answer: "Yes. If the parties cannot agree on all terms during the dissolution process, either spouse can withdraw and file for divorce instead. This allows the court to step in and make decisions on contested issues.",
  },
  {
    question: "Do both spouses need a lawyer for dissolution?",
    answer: "While not legally required, it is strongly recommended that each spouse have independent legal counsel. One attorney cannot represent both parties due to conflicts of interest. Having your own lawyer ensures the agreement is fair and that you understand your rights.",
  },
  {
    question: "What happens at the dissolution hearing?",
    answer: "At the final hearing, both spouses appear before the judge and confirm they agree to the terms of the separation agreement. The judge reviews the agreement, asks questions to ensure both parties understand it, and then grants the dissolution. The hearing typically lasts 15 to 30 minutes.",
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

const Dissolution = () => {
  const { openConsultation } = useConsultation();
  const reqAnim = useScrollAnimation();
  const diffAnim = useScrollAnimation();
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
              style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
            >
              Columbus, OH Dissolution Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Dissolution of Marriage Lawyer in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Ending a marriage doesn't have to be a stress-filled journey. If you and your spouse agree on all terms, dissolution offers a faster, more affordable alternative to divorce in Ohio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-334-6851
              </a>
            </div>
          </div>
        </section>

        {/* What Is Dissolution */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is a Dissolution of Marriage in Ohio?</h2>
            <div className="space-y-4 text-body">
              <p>
                Marriage dissolution in Ohio is a no-fault proceeding where both husband and wife mutually agree to end their marriage legally. Both parties file a joint petition to terminate the marriage after signing a separation agreement, as required under{" "}<a href="https://codes.ohio.gov/ohio-revised-code/section-3105.63" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3105.63</a>.
              </p>
              <p>
                Unlike divorce, dissolution allows you to skip many costly steps. But you and your spouse must satisfy certain requirements, and you need to file all the required documents properly to avoid issues down the road.
              </p>
            </div>

            {/* Separation Agreement Items */}
            <div className="mt-8">
              <h3 className="heading-subsection text-xl mb-4">The Separation Agreement Covers:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {separationAgreementItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg text-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side (Text Left, Image Right) */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">A Simpler Path Forward</h3>
                <p className="text-body">
                  When both spouses are on the same page, dissolution provides a streamlined legal process. Borshchak Law Group helps you navigate the paperwork, negotiate terms, and present your case to the court with confidence.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
                alt="Two people talking calmly"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* How to File */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">How to File for Dissolution in Ohio</h2>
            <div className="space-y-4 text-body">
              <p>
                The first step is to obtain the standardized forms from the Ohio Judicial System. The Petition for Dissolution of Marriage and Waiver of Summons are the key documents. Confirm with the court clerk that you have all required forms.
              </p>
              <p>
                Both spouses are considered "petitioners" in Ohio dissolution law. You can file with the Court of Common Pleas in the county where you or your spouse have been living for the past 90 days. Filing fees range from <strong>$150 to $400</strong> depending on the county, and you and your spouse can split the charges.
              </p>
            </div>

            {/* Required Documents */}
            <div className="card-elevated mt-8">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary shrink-0 mt-1" />
                <h4 className="heading-subsection text-lg">Required Documents</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {requiredDocuments.map((doc) => (
                  <div key={doc} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                    <span className="text-body text-base">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Court Forms by County */}
            <h3 className="heading-subsection mt-10 mb-4">
              Access Court Forms by County
            </h3>
            <p className="text-body mb-6">
              The following county courts provide standardized dissolution forms
              online. Your attorney can help you identify which forms apply to
              your case and ensure they are completed correctly.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-bordered">
                <h4 className="heading-subsection text-lg mb-2">
                  Franklin County
                </h4>
                <p className="text-body text-base mb-1">
                  Franklin County Court of Common Pleas, Domestic Relations and
                  Juvenile Division
                </p>
                <p className="text-body text-sm mb-3">
                  373 South High Street, 4th Floor, Columbus, Ohio 43215
                </p>
                <a
                  href="https://drj.fccourts.org/Court-Services/Forms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:opacity-80"
                >
                  Access Franklin County Forms →
                </a>
              </div>
              <div className="card-bordered">
                <h4 className="heading-subsection text-lg mb-2">
                  Delaware County
                </h4>
                <p className="text-body text-base mb-1">
                  Delaware County Domestic Relations Court
                </p>
                <p className="text-body text-sm mb-3">
                  117 N. Union St., 400 Level, Delaware, Ohio 43015
                </p>
                <a
                  href="https://domestic.co.delaware.oh.us/forms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:opacity-80"
                >
                  Access Delaware County Forms →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">How Long Does Dissolution Take?</h2>
            <div className="space-y-4 text-body">
              <p>
                The timeline depends on how quickly you and your spouse reach a separation agreement. Once you've agreed and filed the petition, at least <strong>30 days</strong> must pass before the court hearing commences. The judge must hear your case within <strong>90 days</strong> of filing.
              </p>
              <p>
                At the hearing, the judge reviews the agreement and inquires about parenting, liabilities, and assets. If both parties are satisfied and in agreement, the judge grants the decision, and the separation agreement becomes a court order per Ohio Rev. Code §§{" "}<a href="https://codes.ohio.gov/ohio-revised-code/section-3105.64" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">3105.64</a>,{" "}<a href="https://codes.ohio.gov/ohio-revised-code/section-3105.65" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">3105.65</a>.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="card-bordered text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">30 Days</p>
                <p className="text-sm text-muted-foreground mt-1">Minimum wait after filing</p>
              </div>
              <div className="card-bordered text-center">
                <Scale className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">90 Days</p>
                <p className="text-sm text-muted-foreground mt-1">Maximum time to hearing</p>
              </div>
              <div className="card-bordered text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-serif font-bold text-primary">$150-$400</p>
                <p className="text-sm text-muted-foreground mt-1">Filing fee (split between spouses)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Bleed Background with Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "A smooth dissolution begins with the right guidance and mutual agreement."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Let our experienced attorneys simplify the process</p>
          </div>
        </section>

        {/* Requirements */}
        <section className="section-padding bg-secondary">
          <div
            ref={reqAnim.ref}
            className={`container max-w-4xl ${reqAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Requirements for Dissolution in Ohio</h2>
            <p className="text-body mb-8">
              For dissolution to proceed, both parties must meet all of the following requirements. Tap each to learn more about what's involved.
            </p>
            <div className="grid gap-4">
              {requirements.map((req) => (
                <ExpandableCard key={req.title} title={req.title} icon={req.icon}>
                  {req.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Full-Bleed Edge-to-Edge */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
          alt="Legal books and scales of justice"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Dissolution vs Divorce Comparison */}
        <section className="section-padding bg-navy">
          <div
            ref={diffAnim.ref}
            className={`container max-w-4xl ${diffAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-10"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Dissolution vs. Divorce in Ohio
            </h2>
            <div className="grid gap-6">
              {differences.map((diff) => (
                <div key={diff.aspect} className="grid md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: "hsla(40, 30%, 98%, 0.08)" }}>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                      {diff.aspect}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Dissolution</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.dissolution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "hsla(40, 30%, 98%, 0.5)" }}>Divorce</p>
                    <p className="text-base leading-relaxed" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
                      {diff.divorce}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Having a Lawyer */}
        <section className="section-padding bg-card">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-4xl ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">Why You Need a Dissolution Attorney</h2>
            <div className="space-y-4 text-body">
              <p>
                You can file for dissolution in Ohio without an attorney's help. But going the DIY path can put you at a disadvantage, even if you've agreed with your spouse.
              </p>
              <p>
                An experienced lawyer ensures you have satisfied all the requirements and can pinpoint mistakes you might overlook during the filing process. They'll help you gather and complete all the required forms in one sitting, saving you the back-and-forth that courts demand.
              </p>
              <p>
                With our family law attorneys in Columbus, we walk with you from working out a separation agreement to ensuring you've met all the requirements and filed the petition. Contact us today for a no-cost consultation.
              </p>
              <p>
                Perhaps most importantly, an attorney can strategically evaluate
                what the agreement actually means for your future. Beyond
                reviewing the terms, we assess the consequences of each
                provision — the financial exposure, the restrictions, and the
                long-term implications. When children are involved, this means
                projecting what the agreement looks like not just today, but over
                the next 3 to 10 years. Parenting time schedules, support
                obligations, and decision-making rights all evolve as children
                grow. An experienced dissolution attorney helps you see around
                corners before you sign.
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

        {/* Image with Caption Bar */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <img
              src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=1200&q=80"
              alt="Couple reviewing legal documents together"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
            />
            <p className="text-center text-sm text-muted-foreground italic mt-3">
              A dissolution of marriage allows both spouses to move forward together, with less conflict and lower costs.
            </p>
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
              <p className="text-body">How much do you know about dissolution in Ohio? Take this quick 3-question quiz.</p>
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
                <h2 className="heading-section mb-0">Common Questions About Dissolution</h2>
              </div>
              <p className="text-body">Answers to the questions we hear most often.</p>
            </div>
            <PracticeAreaFAQ items={faqItems} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Ready to Move Forward Together?
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If you and your spouse agree it's time, dissolution can give you both a fresh start. Call us for a free consultation to see if dissolution is right for you.
            </p>
            <a href="tel:+16143346851" className="btn-cta text-xl px-12 py-5">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 614-334-6851
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dissolution;
