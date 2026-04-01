import { useState } from "react";
import {
  Phone,
  CheckCircle2,
  Users,
  Shield,
  Home,
  Heart,
  Gavel,
  Scale,
  ChevronDown,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Brain,
  MessageCircle,
  HandHeart,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedQuiz from "@/components/AnimatedQuiz";
import PracticeAreaFAQ from "@/components/PracticeAreaFAQ";
import AnimatedCTA from "@/components/AnimatedCTA";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import lawyerWithKid from "@/assets/lawyerwithkid.jpg";
import lawyerworking7 from "@/assets/lawyerworking-7.jpg";

const custodyTypes = [
  {
    title: "Physical Custody",
    icon: Home,
    description:
      "Physical custody determines where the child lives on a day-to-day basis. The parent with physical custody provides the child's primary residence and handles daily care, including meals, transportation, and routine activities. Courts consider factors such as proximity to school, the child's established routine, and each parent's work schedule. If you are seeking physical custody, documenting your involvement in your child's daily life strengthens your case.",
  },
  {
    title: "Legal Custody",
    icon: Scale,
    description:
      "Legal custody refers to the right to make major decisions about the child's life, including education, healthcare, religious upbringing, and extracurricular activities. A parent with legal custody has authority over these important choices. Ohio courts generally prefer to award joint legal custody unless one parent demonstrates an inability to cooperate. Your attorney can help present evidence supporting your capacity to make sound decisions for your child.",
  },
  {
    title: "Sole Physical Custody",
    icon: Shield,
    description:
      "When one parent is granted sole physical custody, the child lives primarily with that parent. The non-custodial parent typically receives visitation or parenting time, but the child's main home is with the custodial parent. Courts award sole physical custody when it best serves the child's stability and safety, particularly in cases involving relocation, substance abuse, or domestic violence. An experienced custody attorney helps you demonstrate why sole custody is in your child's best interest.",
  },
  {
    title: "Joint Physical Custody",
    icon: Users,
    description:
      "Joint physical custody means the child splits time living with both parents. The schedule doesn't have to be exactly 50/50 \u2014 it's designed around the child's best interests and each parent's availability and living situation. Ohio courts favor arrangements that maintain the child's connections with both parents while minimizing disruption to their education and social life. A well-drafted parenting plan is essential to making joint physical custody work smoothly.",
  },
  {
    title: "Sole Legal Custody",
    icon: Gavel,
    description:
      "With sole legal custody, one parent has exclusive authority to make all major decisions for the child. This is typically granted when one parent is unfit, absent, or when parents are unable to cooperate on decision-making. Courts may also award sole legal custody if there is a history of domestic violence, substance abuse, or one parent's refusal to participate in the child's life. Your attorney will help you present compelling evidence to support this arrangement.",
  },
  {
    title: "Joint Legal Custody",
    icon: HandHeart,
    description:
      "Joint legal custody means both parents share the right and responsibility to make important decisions about the child's welfare. Both parents must communicate and agree on matters like schooling, medical treatment, and religious instruction. While Ohio courts generally favor joint legal custody, it requires a demonstrated ability by both parents to cooperate and communicate effectively. Mediation is often recommended to help parents work through disagreements.",
  },
];

const courtFactors = [
  {
    icon: Users,
    title: "Wishes of the Parents",
    description:
      "Each parent's desires regarding the child's care, including proposed living arrangements and parenting schedules.",
  },
  {
    icon: MessageCircle,
    title: "Child's Wishes",
    description:
      "If the court interviews the child, the child's own wishes and concerns regarding custody and living arrangements.",
  },
  {
    icon: Heart,
    title: "Parent-Child Relationships",
    description:
      "The child's interaction and interrelationship with each parent, siblings, and any other person who may significantly affect the child's well-being.",
  },
  {
    icon: Home,
    title: "Adjustment to Home, School & Community",
    description:
      "How well the child is adjusted to their current home, school, and community environment.",
  },
  {
    icon: Brain,
    title: "Mental & Physical Health",
    description:
      "The mental and physical health of all persons involved, including both parents and the child.",
  },
  {
    icon: Scale,
    title: "Compliance with Court Orders",
    description:
      "Which parent is more likely to honor and facilitate court-approved parenting time with the other parent.",
  },
  {
    icon: AlertTriangle,
    title: "History of Domestic Violence or Abuse",
    description:
      "Any prior convictions or findings involving domestic violence, child abuse, neglect, or sexually oriented offenses by either parent.",
  },
];

const quizQuestions = [
  {
    question:
      "In Ohio, if parents are unmarried, who typically gets initial custody?",
    options: [
      "The father",
      "The mother",
      "Both parents equally",
      "The state decides",
    ],
    correctIndex: 1,
    explanation:
      "Under Ohio law, if parents are unmarried and no court order exists, the mother is presumed to have sole custody of the child.",
  },
  {
    question: "What standard do Ohio courts use to decide custody?",
    options: [
      "Which parent earns more",
      "Best interests of the child",
      "Who filed for custody first",
      "Equal time for both parents",
    ],
    correctIndex: 1,
    explanation:
      "Ohio courts use the 'best interests of the child' standard, weighing factors like safety, parental fitness, and the child's relationships.",
  },
  {
    question: "Can grandparents petition for visitation rights in Ohio?",
    options: [
      "No, never",
      "Only if both parents agree",
      "Yes, if it serves the child's best interest",
      "Only if a parent is deceased",
    ],
    correctIndex: 2,
    explanation:
      "Yes, Ohio law allows grandparents to petition for visitation rights, but they must demonstrate that visitation serves the child's best interest.",
  },
];

const faqItems = [
  {
    question: "How is custody decided in Ohio?",
    answer:
      "Ohio courts determine custody based on the 'best interests of the child' standard. The court considers factors including each parent's health, the child's adjustment to home and school, the wishes of both parents and the child (if old enough), and whether either parent has a history of domestic violence or substance abuse.",
  },
  {
    question: "Can fathers get custody in Ohio?",
    answer:
      "Yes. Ohio law does not favor mothers over fathers. Both parents have equal rights to seek custody. If parents are married, both have equal custodial rights until a court order says otherwise. For unmarried parents, the father must establish paternity before filing for custody.",
  },
  {
    question: "How long does a custody case take?",
    answer:
      "The timeline depends heavily on the level of cooperation between the parties. When both parents are in full agreement, an agreed custody arrangement can be reached relatively quickly — though the timeframe varies based on court scheduling and how promptly documents are prepared and filed. Contested custody cases are a different story. When parents cannot agree, cases often take 6 to 12 months or longer, particularly when evaluations, a Guardian ad Litem, mediation, or trial are involved. The more cooperation there is on both sides, the faster and less expensive the process will be.",
  },
  {
    question: "Can a custody order be changed later?",
    answer:
      "Yes. Either parent can file a motion to modify custody if there has been a substantial change in circumstances since the original order. The court will again use the best-interests standard. Common reasons include relocation, changes in a parent's living situation, or concerns about the child's safety.",
  },
  {
    question: "What is a Guardian ad Litem?",
    answer:
      "A Guardian ad Litem (GAL) is a court-appointed neutral — often a licensed attorney, though some Ohio counties allow non-attorneys — who investigates the circumstances of a custody case and submits a written recommendation to the court regarding custody and parenting time. The GAL interviews both parents, the child, teachers, and other relevant individuals. While their recommendation is not binding, judges give it significant weight. A GAL can also be an invaluable resource in reducing conflict and in-court litigation, even though they do represent an added cost to the proceedings.",
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

const Custody = () => {
  const { openConsultation } = useConsultation();
  const methodsAnim = useScrollAnimation();
  const typesAnim = useScrollAnimation();
  const parentingTimeAnim = useScrollAnimation();
  const galAnim = useScrollAnimation();
  const paternityAnim = useScrollAnimation();
  const factorsAnim = useScrollAnimation();
  const modAnim = useScrollAnimation();
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
              style={{
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Columbus, OH Child Custody Lawyers
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Child Custody in Columbus, OH? Here's How We Protect Your Family
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Custody decisions shape your family for years to come. Whether
              you're navigating an initial determination or modifying an existing
              order, understanding Ohio custody law is essential to protecting
              your relationship with your children.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Free Consultation: 614-334-6851
              </a>
            </div>
          </div>
        </section>

        {/* Custody Allocation Methods */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={methodsAnim.ref}
            className={`container max-w-4xl ${methodsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">
              How Custody Is Allocated in Ohio
            </h2>
            <div className="text-body text-lg mb-8">
              <p className="mb-4">
                Custody refers to the parent or individual who is responsible for
                making major decisions for the children. In Ohio, there are two
                options for custodial designation: sole custody or joint custody.
                Joint custody is commonly referred to as 'shared parenting.' Any
                agreement or decision that awards joint custody to parents will be
                referred to as a Shared Parenting Plan, and will contain all terms
                relating to the allocation of parental rights and
                responsibilities — including child support, parenting time, school
                placement, and more. If parents are awarded joint custody, they
                must work together to reach an agreement regarding all major
                decisions for their children, such as healthcare and schooling.
              </p>
              <p>
                In cases of sole custody, the parent designated as custodian may
                make all major decisions for the children without discussion with
                the other parent. The parent who does not have custody — commonly
                referred to as the non-custodial or non-residential parent — may
                not make major decisions for their children, but they do have the
                right to obtain copies of medical, school, and daycare records. A
                non-residential parent may also attend all school functions to
                which parents are invited.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">Sole Custody</h3>
                </div>
                <p className="text-body text-lg mb-4">
                  One parent holds primary rights and responsibilities for the
                  child. The non-custodial parent may still receive parenting
                  time or visitation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    One parent makes major decisions
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Child primarily resides with custodial parent
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Common when co-parenting isn't feasible
                  </div>
                </div>
              </div>

              <div className="card-bordered hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Users
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Shared Parenting
                  </h3>
                </div>
                <p className="text-body text-lg mb-4">
                  Both parents divide rights and responsibilities through a
                  shared parenting plan approved by the court. This doesn't
                  always mean equal time. It's about shared decision-making.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Both parents share decision-making
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Requires a detailed parenting plan
                  </div>
                  <div className="flex items-start gap-2 text-body text-base">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    Encourages cooperation between parents
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="heading-subsection text-lg mb-2">
                    Ohio Law: Unmarried Parents
                  </h4>
                  <p className="text-body text-base">
                    Under Ohio law, if parents are{" "}
                    <strong>unmarried</strong> and no court order has been
                    issued, the mother is presumed to have sole custody of the
                    child. The father must establish paternity and file for
                    custody or visitation rights through the court. See{" "}
                    <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.04" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ohio Revised Code Section 3109.04</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side (Text Left, Image Right) */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <h3 className="heading-subsection">
                  Protecting Your Family's Future
                </h3>
                <p className="text-body">
                  Every custody decision is guided by one standard: the best
                  interests of your child. Our attorneys work to protect your
                  parental rights while keeping your child's wellbeing at the
                  center of every strategy.
                </p>
              </div>
              <img
                src={lawyerWithKid}
                alt="Attorney Dmitriy Borshchak with his child"
                className="w-full h-72 md:h-96 object-cover rounded-lg order-1 md:order-2"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Types of Custody */}
        <section className="section-padding bg-secondary">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Types of Custody in Ohio
            </h2>
            <p className="text-body mb-8">
              Ohio recognizes several types of custody arrangements. Tap each
              type below to learn how it works and when it applies.
            </p>
            <div className="grid gap-4">
              {custodyTypes.map((type) => (
                <ExpandableCard
                  key={type.title}
                  title={type.title}
                  icon={type.icon}
                >
                  {type.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Guardian Ad Litem */}
        <section className="section-padding bg-secondary">
          <div
            ref={galAnim.ref}
            className={`container max-w-4xl ${galAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Guardian Ad Litem (GAL)
            </h2>
            <p className="text-body mb-10">
              In some instances — whether during a divorce, initial custody
              proceeding, or a post-decree modification — a Guardian ad Litem may
              be appointed by the court on its own or after a request by either
              party. A Guardian ad Litem is often a licensed attorney, though some
              Ohio counties allow non-attorneys to serve in this role.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Scale
                      className="w-5 h-5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-lg">What a GAL Does</h3>
                </div>
                <p className="text-body text-base">
                  The Guardian ad Litem conducts a thorough investigation into the
                  circumstances of the case. This typically includes interviewing
                  both parents, the child, teachers, doctors, and other relevant
                  individuals. The GAL then files a written recommendation with the
                  court regarding custody and parenting time — a recommendation that
                  carries significant weight in the judge's final decision.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Gavel
                      className="w-5 h-5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-lg">When a GAL Is Appointed</h3>
                </div>
                <p className="text-body text-base">
                  A GAL is typically appointed in cases involving allegations of
                  abuse or neglect, high-conflict custody disputes, situations where
                  the child's safety may be at risk, or when neither parent appears
                  to be adequately representing the child's interests. Either party
                  may request a GAL, or the court may appoint one on its own motion.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <FileText
                      className="w-5 h-5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-lg">The Cost of a GAL</h3>
                </div>
                <p className="text-body text-base">
                  While a Guardian ad Litem does represent an added cost to the
                  proceedings, they can also be an invaluable resource. A GAL helps
                  resolve conflicts — large and small — throughout the case, which
                  can actually reduce the amount of in-court litigation and
                  ultimately lower overall costs for both parties.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}
                  >
                    <Shield
                      className="w-5 h-5"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  </div>
                  <h3 className="heading-subsection text-lg">Impact on Your Case</h3>
                </div>
                <p className="text-body text-base">
                  The GAL's written report and recommendation to the court is not
                  binding, but judges give it substantial weight. Understanding the
                  GAL's role and cooperating fully with their investigation is
                  critical. Our attorneys prepare clients thoroughly for GAL
                  interviews and work to ensure your relationship with your children
                  is accurately represented throughout the process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paternity in Ohio */}
        <section className="section-padding bg-card">
          <div
            ref={paternityAnim.ref}
            className={`container max-w-4xl ${paternityAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">
              Paternity in Ohio
            </h2>
            <p className="text-body text-lg mb-10">
              For unmarried parents, establishing paternity is a critical first
              step before pursuing custody or parenting time. Without established
              paternity, a father has no legal rights to custody or visitation —
              and a child may be denied important benefits including inheritance
              rights, access to family medical history, and financial support.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Presumption of Paternity
                  </h3>
                </div>
                <p className="text-body text-lg">
                  If a mother is married at the time of her child's birth, her
                  husband is presumed to be the natural father under Ohio law.
                  This presumption also applies if the child is born within 300
                  days of the finalization of a divorce, dissolution, annulment,
                  or the husband's death. In these cases, paternity does not need
                  to be separately established.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Establishing Paternity
                  </h3>
                </div>
                <p className="text-body text-lg">
                  When paternity is not presumed, it can be established in
                  several ways. Both parents may sign an Acknowledgment of
                  Paternity, which is filed with the Ohio Department of Health.
                  If either parent refuses, paternity may be determined through
                  the Child Support Enforcement Agency (CSEA) or through a court
                  action, both of which may involve DNA testing. Once
                  established, the father gains legal rights to seek custody and
                  parenting time.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-xl">
                    Why It Matters
                  </h3>
                </div>
                <p className="text-body text-lg">
                  Establishing paternity protects everyone involved. It gives the
                  child access to both parents' medical history, inheritance
                  rights, and potential benefits such as Social Security or
                  veterans' benefits. It gives the father the legal standing to
                  seek custody or parenting time. And it ensures both parents
                  share responsibility for the child's financial support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Parenting Time, Visitation, and Companionship Time */}
        <section className="section-padding bg-card">
          <div
            ref={parentingTimeAnim.ref}
            className={`container max-w-4xl ${parentingTimeAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">
              Parenting Time, Visitation, and Companionship Time
            </h2>
            <div className="grid gap-6">
              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">
                  Parenting Time
                </h3>
                <p className="text-body text-lg">
                  Parenting time refers to court-awarded time that a parent
                  spends with their children. When determining a parenting time
                  schedule, the court refers to the best interest factors under
                  Ohio Revised Code Section 3109.04(F)(1), including the wishes
                  of the parents, the mental and physical health of all parties,
                  and whether the child support obligor is current on payments.
                  Parenting time schedules vary widely based on the circumstances
                  of each family.
                </p>
              </div>

              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">
                  Supervised Parenting Time
                </h3>
                <p className="text-body text-lg">
                  In some cases, significant concerns arise about the parenting
                  abilities of one parent — such as substance abuse, domestic
                  violence, or mental health issues. When the court determines
                  that unsupervised contact may pose a risk to the child, it may
                  order supervised parenting time. This means visits occur in the
                  presence of a designated third party or at an approved
                  facility. Supervised parenting time is intended to protect the
                  child while preserving the parent-child relationship.
                </p>
              </div>

              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">
                  Companionship Time
                </h3>
                <p className="text-body text-lg">
                  Companionship time refers to the time a non-parent — such as a
                  grandparent or other relative — is granted with a child by
                  court order. Ohio law recognizes that maintaining these
                  relationships can serve the child's best interests.
                  Companionship time rights are governed by separate statutory
                  provisions and require meeting specific legal standards before
                  the court will intervene.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Courts Decide */}
        <section className="section-padding bg-navy">
          <div
            ref={factorsAnim.ref}
            className={`container max-w-4xl ${factorsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2
              className="heading-section mb-4"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              How Ohio Courts Decide Custody
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
            >
              Under <a href="https://codes.ohio.gov/ohio-revised-code/section-3109.04" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: "hsla(40, 30%, 98%, 0.9)" }}>Ohio Revised Code Section 3109.04</a>, courts apply the
              "best interest of the child" standard when allocating parental
              rights and responsibilities. If either parent seeks shared
              parenting, that parent must demonstrate that shared parenting is
              in the best interest of the minor children. The court considers
              all relevant factors, including but not limited to the following:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {courtFactors.map((factor) => (
                <div
                  key={factor.title}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: "hsla(40, 30%, 98%, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <factor.icon
                      className="w-6 h-6"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                    <h3
                      className="text-xl font-serif font-medium"
                      style={{
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      {factor.title}
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
                  >
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-Bleed Edge-to-Edge */}
        <section>
          <img
            src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1600&q=80"
            alt="Parent and child together"
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
        </section>

        {/* Custody Modification */}
        <section className="section-padding bg-card">
          <div
            ref={modAnim.ref}
            className={`container max-w-4xl ${modAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6">
              Modifying Custody or Parenting Time
            </h2>
            <div className="space-y-6 text-body">
              <p>
                Life changes — and sometimes court orders need to change with
                it. It is important to understand that modification requests are
                not always about changing custody itself. In many cases, a parent
                seeks only to modify their parenting time or visitation schedule,
                which is a separate and distinct process from modifying custody.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">
                    1. Change in Circumstances
                  </h4>
                  <p className="text-body-sm text-base">
                    Relocation, financial change, remarriage, or safety concerns
                    that affect the child.
                  </p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">
                    2. File a Motion
                  </h4>
                  <p className="text-body-sm text-base">
                    Submit a formal modification request to the court with
                    supporting documentation.
                  </p>
                </div>
                <div className="card-bordered text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif font-medium text-lg mb-1 text-foreground">
                    3. Court Review
                  </h4>
                  <p className="text-body-sm text-base">
                    The judge evaluates whether the proposed change serves the
                    child's best interest.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-bordered">
                  <h3 className="heading-subsection text-xl mb-3">
                    Modifying Custody
                  </h3>
                  <p className="text-body text-lg">
                    To modify custody in Ohio, the requesting parent must
                    demonstrate a substantial change in circumstances of the
                    child or either parent since the original order was issued.
                    The court then determines whether the proposed change is in
                    the child's best interest. Common grounds include
                    relocation, remarriage, changes in a parent's living
                    situation, or documented safety concerns. This is a higher
                    legal standard than modifying parenting time alone.
                  </p>
                </div>
                <div className="card-bordered">
                  <h3 className="heading-subsection text-xl mb-3">
                    Modifying Parenting Time
                  </h3>
                  <p className="text-body text-lg">
                    A parent may seek to modify their parenting time or
                    visitation schedule without seeking a full change in
                    custody. In these cases, the court applies the best interest
                    standard under Ohio Revised Code Section 3109.04(F)(1) —
                    without necessarily requiring proof of a substantial change
                    in circumstances. Even if both parents informally agree to a
                    new schedule, that agreement is not legally binding unless it
                    is incorporated into a new court order.
                  </p>
                </div>
              </div>
              <p>
                An experienced custody attorney can help you build a strong case
                for modification and present compelling evidence to the court.
              </p>
            </div>
          </div>
        </section>

        {/* Image with Caption Bar */}
        <section className="section-padding-sm">
          <div className="container max-w-4xl">
            <img
              src={lawyerworking7}
              alt="Attorney providing supportive guidance to a client"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
            />
            <p className="mt-3 text-center text-body-sm italic">
              Every custody decision centers on one priority: your child's
              happiness and stability.
            </p>
          </div>
        </section>

        {/* Quiz */}
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
                <h2 className="heading-section mb-0">Test Your Knowledge</h2>
              </div>
              <p className="text-body">
                How much do you know about child custody in Ohio? Take this
                quick 3-question quiz.
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
                  Common Questions About Child Custody
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
            <img
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Your Child Deserves a Strong Advocate
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              Don't navigate custody alone. Call us for a free consultation
              &mdash; we'll listen to your situation, explain your options, and
              advocate for your family.
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

export default Custody;
