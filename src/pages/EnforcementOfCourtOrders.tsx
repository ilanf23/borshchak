import { useState } from "react";
import {
  Phone,
  ChevronDown,
  HelpCircle,
  DollarSign,
  Clock,
  Users,
  Gavel,
  ShieldAlert,
  FileWarning,
  Scale,
  AlertTriangle,
  CheckCircle,
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

const contemptReasons = [
  {
    title: "Not Paying Child or Spousal Support",
    icon: DollarSign,
    description:
      <>When a party fails to make court-ordered support payments, the receiving party can file a motion for contempt to compel payment. Under <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.05" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.05</a>, Ohio courts take support obligations seriously because they directly affect the financial well-being of children and former spouses. The court may order wage garnishment, intercept tax refunds, suspend professional or driver's licenses, or impose other enforcement measures to ensure compliance. An experienced attorney can help you document the arrearage and pursue every available remedy under Ohio law.</>,
  },
  {
    title: "Not Following an Ordered Visitation Schedule",
    icon: Clock,
    description:
      "Refusing to follow the court-ordered parenting time schedule, including denying visitation, failing to return children on time, or unilaterally changing pickup and drop-off arrangements, is one of the most common bases for enforcement action in Ohio family courts. Courts recognize that consistent parenting time is critical for a child's emotional stability and development. If the other parent is interfering with your court-ordered time, the court can modify the schedule, award make-up parenting time, or hold the violating party in contempt. An attorney can help you keep detailed records and present a compelling case to the judge.",
  },
  {
    title: "Not Relinquishing Marital Property",
    icon: ShieldAlert,
    description:
      "When a party refuses to transfer property as ordered in the divorce decree, such as a home, vehicle, retirement account, or financial asset, enforcement proceedings can compel compliance. Ohio law requires strict adherence to property division orders, and courts have broad authority to enforce them. The court can order the transfer, impose sanctions, or award attorney fees to the party seeking enforcement. Having legal counsel ensures that all necessary documentation, such as QDROs for retirement accounts or deed transfers for real property, is handled correctly and efficiently.",
  },
  {
    title: "Not Following Judge Rulings on Divorce or Custody",
    icon: Gavel,
    description:
      "Disregarding any aspect of a judge's ruling on divorce or child custody matters can result in enforcement action. This includes orders about legal decision-making authority, relocation restrictions, communication requirements, or other specific provisions of the decree. Ohio courts expect parties to follow all terms of their orders, not just the ones they agree with. Willful violations can lead to contempt findings, fines, or even jail time in egregious cases. An attorney experienced in enforcement can help you identify the specific violations and pursue the appropriate legal remedy.",
  },
];

const consequences = [
  {
    label: "Sanctions or Attorney Fees",
    icon: DollarSign,
    description:
      "The violating party may be ordered to pay financial sanctions and cover the other party's attorney fees for bringing the enforcement action.",
  },
  {
    label: "Wage Garnishment",
    icon: FileWarning,
    description:
      "For support-related violations, the court can order that payments be deducted directly from the violator's wages.",
  },
  {
    label: "Jail Time",
    icon: AlertTriangle,
    description:
      "In serious cases of willful noncompliance, the court may sentence the offending party to jail as a means of enforcing the order.",
  },
];

const provingContempt = [
  {
    step: "Knowledge of the Order",
    description:
      "The party knew about the court order and its requirements.",
  },
  {
    step: "Willful Violation",
    description:
      "The party willingly violated the order, not through accident or inability.",
  },
  {
    step: "No Valid Excuse",
    description:
      "The party does not have a valid excuse or justification for the violation.",
  },
];

const quizQuestions = [
  {
    question:
      "What should you do if someone is not complying with a court order?",
    options: [
      "Wait and hope they eventually comply",
      "File for contempt of court and request enforcement",
      "Confront them directly",
      "Nothing can be done",
    ],
    correctIndex: 1,
    explanation:
      "When a party fails to follow a court order, you may file for contempt of court and request that the court take steps to enforce the order.",
  },
  {
    question:
      "What three things must be proven to establish contempt in Ohio?",
    options: [
      "Intent, motive, and opportunity",
      "Knowledge of the order, willful violation, and no valid excuse",
      "Financial ability, written notice, and witness testimony",
      "Prior offenses, severity, and duration",
    ],
    correctIndex: 1,
    explanation:
      "Proving contempt in Ohio requires showing that the party knew about the order, that they willingly violated the order, and that they do not have a valid excuse for the violation.",
  },
  {
    question:
      "What consequences can result from being found in contempt?",
    options: [
      "Only a verbal warning",
      "Sanctions, attorney fees, wage garnishment, or jail",
      "Automatic divorce",
      "Community service only",
    ],
    correctIndex: 1,
    explanation:
      "If found in contempt, a party could be ordered to pay sanctions or attorney fees, have wages garnished, or in some cases be sentenced to jail.",
  },
];

const faqItems = [
  {
    question: "What can I do if my ex isn't following the court order?",
    answer:
      "You can file a motion for contempt of court, asking the judge to enforce the existing order. The court has broad powers to compel compliance including fines, wage garnishment, license suspension, and even jail time for willful violations.",
  },
  {
    question: "How long does an enforcement action take?",
    answer:
      "The timeline varies depending on the complexity and the court's schedule. Simple enforcement motions may be heard within a few weeks. More complex cases involving hidden assets or interstate issues may take several months to resolve.",
  },
  {
    question: "Can I enforce a court order from another state?",
    answer:
      "Yes. Under the Uniform Interstate Family Support Act (UIFSA) and the Full Faith and Credit Clause, Ohio courts can enforce valid court orders from other states. The process may involve registering the foreign order in Ohio before enforcement.",
  },
  {
    question: "What if my ex claims they can't afford to comply?",
    answer:
      "Inability to pay is a defense to contempt, but the burden is on the non-complying party to prove it. The court will examine their financial records, employment status, and efforts to find work. Voluntary unemployment or underemployment is not a valid excuse.",
  },
  {
    question: "Do I need a lawyer to enforce a court order?",
    answer:
      "While you can file a motion on your own, having an attorney significantly improves your chances of success. An experienced enforcement attorney knows how to present evidence effectively, navigate procedural requirements, and pursue all available remedies.",
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

const EnforcementOfCourtOrders = () => {
  const { openConsultation } = useConsultation();
  const reasonsAnim = useScrollAnimation();
  const consequencesAnim = useScrollAnimation();
  const provingAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* 1. Hero */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Columbus, OH Enforcement Attorneys
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Enforcement of Court Orders Attorney in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              When a party fails to follow a court order, you may file for
              contempt of court and request that the court take steps to enforce
              the order. Our attorneys are ready to help.
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

        {/* ---------------------------------------------------------------- */}
        {/* 2. Intro */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">
              When Court Orders Are Not Followed
            </h2>
            <div className="space-y-4 text-body">
              <p>
                What do you do if a party is failing to comply with a court
                order in Ohio? When a party fails to follow a court order, you
                may file for contempt of court and request that the court take
                steps to enforce the order. Violations of protection orders may
                be prosecuted under <a href="https://codes.ohio.gov/ohio-revised-code/section-2919.27" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 2919.27</a>, and
                support enforcement is governed by <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.05" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.05</a>.
              </p>
              <p>
                Before filing a contempt, it is essential that there is proof to
                back up your claim. Our Columbus-based family law attorneys at
                Borshchak Law Group can help you gather the necessary evidence
                and take the proper steps to present the strongest possible
                case.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Edge-to-Edge Image */}
        {/* ---------------------------------------------------------------- */}
        <img
          src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1600&q=80"
          alt="Courthouse columns representing enforcement proceedings"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* ---------------------------------------------------------------- */}
        {/* 4. Reasons for Filing (expandable cards - bg-secondary) */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={reasonsAnim.ref}
            className={`container max-w-4xl ${reasonsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Common Reasons for Filing Contempt
            </h2>
            <p className="text-body mb-8">
              A few reasons for filing for contempt include the following. Tap
              each to learn more.
            </p>
            <div
              className={`grid gap-4 ${reasonsAnim.isVisible ? "stagger-visible" : "stagger-children"}`}
            >
              {contemptReasons.map((item) => (
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

        {/* ---------------------------------------------------------------- */}
        {/* 5. Full-Bleed Quote */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }}
          />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p
              className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              "Proving a contempt in Ohio requires showing that the party knew
              about the order, willingly violated it, and does not have a valid
              excuse."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Ohio Family Law
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. What Happens After Filing */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">
              What Happens After You File?
            </h2>
            <div className="space-y-4 text-body">
              <p>
                If a contempt is filed, a hearing will be held where the court
                will hear testimony, review evidence submitted, and then make a
                ruling on whether or not the offending party violated the court
                order.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 7. Proving Contempt */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div
            ref={provingAnim.ref}
            className={`container max-w-4xl ${provingAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Three Elements to Prove Contempt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {provingContempt.map((item, idx) => (
                <div key={item.step} className="card-elevated text-center">
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <span className="text-2xl font-bold text-primary">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="heading-subsection text-xl mb-3">
                    {item.step}
                  </h3>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Side-by-Side */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm bg-card">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="heading-subsection">
                  Taking the Proper Steps
                </h3>
                <p className="text-body">
                  Call us today to discuss the proper steps for pursuing
                  enforcement of your court order. Our Columbus-based family law
                  attorneys at Borshchak Law Group are ready to assist you.
                </p>
                <p className="text-body">
                  Having experienced legal counsel helps ensure your case is
                  presented with the right evidence and legal arguments to
                  support your enforcement action.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1200&q=80"
                alt="Attorney guiding client through enforcement process"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 9. Consequences */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div
            ref={consequencesAnim.ref}
            className={`container max-w-4xl ${consequencesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">
              Potential Consequences of Contempt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {consequences.map((item) => (
                <div key={item.label} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "hsl(var(--secondary))" }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-lg">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 10. Quiz (bg-card) */}
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
                Understanding enforcement law gives you confidence. See where
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
        {/* 11. FAQ */}
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
                  Common Questions About Enforcement in Ohio
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
        {/* 12. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Court Orders Exist to Be Followed
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If your ex isn't complying, you have legal options. Call us for a
              free consultation to discuss enforcement.
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

export default EnforcementOfCourtOrders;
