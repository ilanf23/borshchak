import { useState } from "react";
import {
  Phone,
  ChevronDown,
  HelpCircle,
  Gavel,
  DollarSign,
  Clock,
  ShieldAlert,
  FileWarning,
  Ban,
  Scale,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import lawyerworking from "@/assets/lawyerworking.jpg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const contemptExamples = [
  {
    title: "Failure to Pay Child or Spousal Support",
    icon: DollarSign,
    description:
      "When a parent or former spouse fails to make court-ordered support payments, the receiving party can file a motion for contempt. The court may order wage garnishment, impose fines, or even jail time to enforce compliance. Repeated or prolonged non-payment demonstrates a pattern of willful disobedience that courts take very seriously. An experienced attorney can help you document missed payments and present a compelling case for enforcement.",
  },
  {
    title: "Violating a Visitation Schedule",
    icon: Clock,
    description:
      "Refusing to follow the court-ordered parenting time schedule, whether by denying visitation or failing to return children on time, constitutes contempt. The court takes these violations seriously to protect the child's relationship with both parents. Even subtle interference, such as scheduling conflicting activities during the other parent's time or badmouthing the other parent, can be addressed through contempt proceedings. Documenting each violation with dates, times, and witnesses strengthens your case significantly.",
  },
  {
    title: "Refusing to Relinquish Marital Property",
    icon: ShieldAlert,
    description:
      "When a party refuses to transfer property as ordered in the divorce decree, such as a vehicle, real estate, or financial accounts, the other party can seek a contempt finding to enforce the order. Property division orders are legally binding, and refusal to comply can result in significant penalties including fines and incarceration. The court may also award attorney fees to the party forced to bring the enforcement action. Our attorneys can help you compel compliance and recover the assets you are entitled to.",
  },
  {
    title: "Ignoring Custody or Divorce Rulings",
    icon: Gavel,
    description:
      "Disregarding any aspect of a judge's ruling on divorce or child custody matters can result in contempt proceedings. This includes failing to follow requirements about relocation, communication, or decision-making authority. Courts expect full compliance with every provision of their orders, not just the ones a party finds convenient. When violations occur, swift legal action sends a clear message that court orders must be respected and followed.",
  },
];

const consequences = [
  {
    label: "Fines",
    icon: DollarSign,
    description:
      "Monetary penalties imposed to compel compliance with the court order. Fines can accumulate daily until the violating party obeys, creating strong financial incentive to comply. The court has broad discretion in setting fine amounts based on the severity of the violation.",
  },
  {
    label: "Imprisonment",
    icon: Ban,
    description:
      "Jail time may be ordered for willful and repeated violations of court orders. In civil contempt, the person holds the 'keys to their own cell'; they can be released by complying with the order. Criminal contempt sentences are fixed and serve as punishment for past disobedience.",
  },
  {
    label: "Wage Garnishment",
    icon: FileWarning,
    description:
      "In child support cases, the court can order direct deductions from the violator's paycheck. This ensures consistent, automatic payment going forward and is one of the most effective enforcement tools available. The court can also intercept tax refunds and place liens on property.",
  },
  {
    label: "Corrective Orders",
    icon: Scale,
    description:
      "Additional court orders designed to remedy the contempt and prevent future violations. These may include modified custody arrangements, make-up parenting time, or stricter reporting requirements. The court tailors corrective orders to address the specific nature of the violation.",
  },
];

const quizQuestions = [
  {
    question: "What must be proven to find someone in contempt of court?",
    options: [
      "That they forgot about the court order",
      "That they willfully ignored a court order",
      "That they disagreed with the ruling",
      "That they missed one payment",
    ],
    correctIndex: 1,
    explanation:
      "To find a violation of a court order, the offended party must prove that the offender willfully ignored the court's order. Accidental or unintentional noncompliance may not qualify as contempt.",
  },
  {
    question: "Which of the following can result from a contempt finding?",
    options: [
      "Only a verbal warning",
      "Fines, imprisonment, or wage garnishment",
      "Automatic divorce",
      "Loss of citizenship",
    ],
    correctIndex: 1,
    explanation:
      "Consequences for contempt of court include fines, imprisonment, wage garnishment (especially in child support cases), and other corrective measures to enforce compliance.",
  },
  {
    question:
      "Can contempt proceedings be used to enforce a visitation schedule?",
    options: [
      "No, visitation is not enforceable",
      "Only if both parents agree",
      "Yes, violating a court-ordered schedule can lead to contempt",
      "Only in cases involving child support",
    ],
    correctIndex: 2,
    explanation:
      "Failing to follow a court-ordered visitation schedule is a common basis for contempt proceedings. The court enforces parenting time orders to protect the child's best interests.",
  },
];

const faqItems = [
  {
    question: "What is contempt of court in family law?",
    answer:
      "Contempt of court occurs when a party willfully disobeys a valid court order. In family law, this commonly involves failure to pay child support or spousal support, violating custody or visitation orders, or refusing to comply with property division terms.",
  },
  {
    question: "What are the penalties for contempt?",
    answer:
      "Penalties can include fines, jail time (up to 30 days for civil contempt), payment of the other party's attorney fees, wage garnishment, and license suspension. The severity depends on the nature and duration of the violation.",
  },
  {
    question: "What is the difference between civil and criminal contempt?",
    answer:
      "Civil contempt is designed to compel compliance; the person can 'purge' the contempt by obeying the order. Criminal contempt is punishment for past disobedience. In family law, civil contempt is more common and gives the violating party an opportunity to comply.",
  },
  {
    question: "Can I file for contempt without a lawyer?",
    answer:
      "While you can file a contempt motion yourself, the process involves strict procedural requirements. A family law attorney ensures your motion is properly drafted, evidence is correctly presented, and your rights are fully protected throughout the hearing.",
  },
  {
    question: "How long does a contempt proceeding take?",
    answer:
      "A contempt hearing is typically scheduled within a few weeks to a couple of months after filing. The hearing itself may last a few hours. Complex cases with multiple violations or disputed facts may require additional hearings.",
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

const ContemptProceedings = () => {
  const { openConsultation } = useConsultation();
  const examplesAnim = useScrollAnimation();
  const consequencesAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();

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
              Columbus, OH Contempt Proceedings Attorneys
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Contempt Proceedings Attorney in Columbus
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              When the opposing party refuses to follow the court's decision,
              that may constitute contempt. Our attorneys help enforce court
              orders and protect your rights.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-334-6851
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
              What Is Contempt of Court?
            </h2>
            <div className="space-y-4 text-body">
              <p>
                Emotionally charged family law proceedings do not always wrap up
                neatly. The opposing party's refusal to follow the court's
                decision may be an act of court contempt. Under <a href="https://codes.ohio.gov/ohio-revised-code/section-2705.02" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 2705.02</a>, to find a violation of
                a court order, the offended party must prove that the offender
                willfully ignored a court order.
              </p>
              <p>
                Contempt proceedings provide a legal mechanism to enforce court
                orders when one party fails to comply. Whether the issue
                involves unpaid support, custody violations, or protection order
                violations under <a href="https://codes.ohio.gov/ohio-revised-code/section-2919.27" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 2919.27</a>, or property
                disputes, the court has tools to compel compliance and hold
                violators accountable.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Side-by-Side Image + Text */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={lawyerworking}
                alt="Attorney in a face-to-face consultation with a client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">
                  Protecting Your Court-Ordered Rights
                </h3>
                <p className="text-body">
                  When someone disregards a court order, you have the right to
                  seek enforcement. Our experienced attorneys understand the
                  urgency of these situations and work diligently to hold the
                  violating party accountable, whether the issue involves
                  support payments, custody arrangements, or property transfers.
                </p>
                <p className="text-body">
                  We guide you through every step of the contempt process, from
                  filing the motion to presenting evidence in court, ensuring
                  your rights and your family's well-being are protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. What Qualifies as Contempt - Expandable Cards */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={examplesAnim.ref}
            className={`container max-w-4xl ${examplesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              What Qualifies as Family Court Contempt?
            </h2>
            <p className="text-body mb-8">
              Court contempt can include many things. Tap each category to learn
              more about common violations.
            </p>
            <div className="grid gap-4">
              {contemptExamples.map((item) => (
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
              "url('https://images.unsplash.com/photo-1494022299300-899b96e49893?w=1600&q=80')",
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
              "The offended party must prove that the offender willfully ignored
              a court order to establish contempt."
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
        {/* 6. Consequences */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={consequencesAnim.ref}
            className={`container max-w-4xl ${consequencesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">Consequences of Contempt</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {consequences.map((item) => (
                <div key={item.label} className="card-elevated">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "hsl(var(--secondary))",
                      }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">
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
        {/* 7. Quiz */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="heading-section mb-0">
                  Contempt Proceedings Quiz
                </h2>
              </div>
              <p className="text-body">
                Understanding contempt law helps you protect your rights. See
                where you stand with this quick 3-question check.
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
        {/* 8. FAQ */}
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
                  Common Questions About Contempt Proceedings
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
        {/* 9. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Hold Them Accountable
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              When court orders are ignored, contempt proceedings can compel
              compliance. Call us for a free consultation.
            </p>
            <a
              href="tel:+16143346851"
              className="btn-cta text-xl px-12 py-5"
            >
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

export default ContemptProceedings;
