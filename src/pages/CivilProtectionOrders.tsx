import { useState } from "react";
import {
  Phone,
  ChevronDown,
  HelpCircle,
  ShieldAlert,
  FileText,
  Users,
  AlertTriangle,
  Scale,
  Home,
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

const cpoTypes = [
  {
    title: "Domestic Violence Civil Protection Order (DVCPO)",
    icon: ShieldAlert,
    description:
      "Filed under Ohio Revised Code § 3113.31, a DVCPO protects family or household members from domestic violence. This includes current or former spouses, people who have lived together, parents of the same child, and other family or household members. The court can order the respondent to stay away from the petitioner's home, workplace, and school, and can grant temporary custody of children. A DVCPO is the most common type of civil protection order sought in Ohio domestic relations courts.",
  },
  {
    title: "Civil Stalking Protection Order (CSPO)",
    icon: AlertTriangle,
    description:
      "Filed under Ohio Revised Code § 2903.214, a CSPO protects any person from a pattern of conduct that causes mental distress or makes the victim believe the offender will cause physical harm. Unlike a DVCPO, the petitioner does not need to be a family or household member of the respondent. This order is commonly used for harassment by neighbors, coworkers, or acquaintances. Courts evaluate whether the respondent's behavior constitutes a pattern of conduct that a reasonable person would find threatening or distressing.",
  },
  {
    title: "Sexually Oriented Offense Protection Order (SOOPO)",
    icon: Scale,
    description:
      "Also filed under Ohio Revised Code § 2903.214, a SOOPO protects victims of sexually oriented offenses. The petitioner must demonstrate that the respondent committed or attempted to commit a sexually oriented offense. These orders provide similar protections as other CPOs, including no-contact and stay-away provisions. An SOOPO can be filed regardless of whether criminal charges have been brought against the respondent, giving victims an independent civil remedy.",
  },
];

const provisions = [
  {
    label: "Stay-Away Orders",
    icon: Home,
    description:
      "The respondent must stay a specified distance from the petitioner's residence, workplace, school, and other frequented locations. Courts can tailor the distance and specific locations based on the circumstances of each case, providing comprehensive geographic protection for the petitioner and their family members.",
  },
  {
    label: "No-Contact Orders",
    icon: FileText,
    description:
      "Prohibits the respondent from contacting the petitioner by any means, including phone, text, email, social media, or through third parties. This includes indirect contact through friends, family members, or coworkers. Any attempt to communicate, even through seemingly innocuous messages, can constitute a violation of the order.",
  },
  {
    label: "Temporary Custody",
    icon: Users,
    description:
      "In DVCPO cases, the court may grant temporary custody of minor children to the petitioner to protect the children's safety. The court can also establish visitation schedules with appropriate safeguards, including supervised visitation if necessary. These temporary custody provisions remain in effect for the duration of the protection order.",
  },
  {
    label: "Exclusive Use of Residence",
    icon: Home,
    description:
      "The petitioner may be granted exclusive use of the shared residence, and the respondent may be ordered to vacate. This provision ensures the petitioner and any children can remain safely in their home without fear of confrontation. The court can also order the respondent to continue paying mortgage or rent on the shared residence.",
  },
];

const quizQuestions = [
  {
    question: "How long can a Civil Protection Order last in Ohio?",
    options: [
      "30 days",
      "6 months",
      "Up to 5 years",
      "Permanently with no renewal",
    ],
    correctIndex: 2,
    explanation:
      "In Ohio, a full Civil Protection Order can last up to 5 years. The petitioner can request a renewal before the order expires if the threat continues.",
  },
  {
    question:
      "What happens if someone violates a Civil Protection Order in Ohio?",
    options: [
      "Nothing, it is only a suggestion",
      "A small fine only",
      "It is a criminal offense that can result in arrest and jail time",
      "The order is automatically canceled",
    ],
    correctIndex: 2,
    explanation:
      "Violating a CPO in Ohio is a criminal offense under ORC § 2919.27. A first offense is a first-degree misdemeanor punishable by up to 180 days in jail. Repeat violations can be charged as a felony.",
  },
  {
    question: "Can a CPO be granted on the same day it is filed?",
    options: [
      "No, a full hearing is always required first",
      "Yes, the court can issue an ex parte (temporary) order the same day",
      "Only if both parties are present",
      "Only in criminal cases",
    ],
    correctIndex: 1,
    explanation:
      "Ohio courts can issue an ex parte (temporary) protection order on the same day the petition is filed if the petitioner demonstrates an immediate and present danger. A full hearing is then scheduled within 7 to 10 days.",
  },
];

const faqItems = [
  {
    question: "What is a Civil Protection Order (CPO)?",
    answer:
      "A CPO is a court order that prohibits an abuser from contacting, threatening, or coming near the victim. In Ohio, CPOs are available to family or household members who have experienced domestic violence, stalking, or sexually oriented offenses.",
  },
  {
    question: "How quickly can I get a protection order?",
    answer:
      "Ohio courts can issue an ex parte (temporary) protection order the same day you file if there is immediate danger. A full hearing is then scheduled within 7 to 10 days, where both parties can present evidence before a final CPO is issued.",
  },
  {
    question: "How long does a CPO last?",
    answer:
      "A Civil Protection Order in Ohio can last up to five years. Before it expires, you can petition the court for renewal if you still fear for your safety. Violations of a CPO are criminal offenses that can result in arrest.",
  },
  {
    question: "What if the abuser violates the protection order?",
    answer:
      "Violating a CPO is a criminal offense in Ohio. You should call 911 immediately if you feel unsafe. The abuser can be arrested, charged with a crime, and face additional penalties including jail time, fines, and an extended protection order.",
  },
  {
    question: "Can a CPO affect custody arrangements?",
    answer:
      "Yes. A CPO can include provisions regarding custody, visitation, and temporary support. The court may restrict the abuser's parenting time or require supervised visitation. The existence of a CPO is also a significant factor in any subsequent custody determination.",
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

const CivilProtectionOrders = () => {
  const { openConsultation } = useConsultation();
  const typesAnim = useScrollAnimation();
  const provisionsAnim = useScrollAnimation();
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
              Columbus, OH Civil Protection Order Attorneys
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Civil Protection Orders in Ohio
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Whether you need to obtain a protection order or defend against
              one, our attorneys provide knowledgeable guidance through every
              step of the process.
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
              What Is a Civil Protection Order?
            </h2>
            <div className="space-y-4 text-body">
              <p>
                A Civil Protection Order (CPO) is a court order designed to
                protect individuals from domestic violence, stalking, or
                sexually oriented offenses. In Ohio, CPOs are governed by
                specific statutes that allow victims to seek immediate judicial
                protection from threatening or harmful behavior.
              </p>
              <p>
                CPOs can require the respondent to stay away from the
                petitioner, vacate a shared residence, have no contact by any
                means, and comply with temporary custody arrangements.
                Violating a CPO is a criminal offense in Ohio that can result
                in arrest and imprisonment.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Side-by-Side Image */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1453847668862-487637052f8a?w=1200&q=80"
                alt="Woman looking thoughtfully out window"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">
                  How the CPO Process Works
                </h3>
                <p className="text-body">
                  The process begins when the petitioner files a petition with
                  the court describing the threats or acts of violence. If the
                  court finds an immediate and present danger, it can issue an{" "}
                  <strong>
                    ex parte (temporary) order the same day
                  </strong>
                  , providing immediate protection before the respondent is
                  even notified.
                </p>
                <p className="text-body">
                  The respondent is then served with the temporary order, and a{" "}
                  <strong>
                    full hearing is scheduled within 7 to 10 days
                  </strong>
                  . At the hearing, both parties can present evidence and
                  testimony. If the court grants the full CPO, it can last{" "}
                  <strong>up to 5 years</strong> and may be renewed.
                </p>
                <p className="text-body">
                  Whether you are seeking protection or responding to a
                  petition, having an experienced attorney ensures your rights
                  are fully represented throughout this process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Types of CPOs */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-secondary">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Types of Protection Orders in Ohio
            </h2>
            <p className="text-body mb-8">
              Ohio law provides several types of civil protection orders
              depending on the relationship between the parties and the nature
              of the threat. Tap each type to learn more.
            </p>
            <div className="grid gap-4">
              {cpoTypes.map((item) => (
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
        <section className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }}
          />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p
              className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              "A protection order is one of the most powerful tools Ohio courts
              provide to keep individuals safe from harm."
            </p>
            <p
              className="mt-4 text-base"
              style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
            >
              Ohio Revised Code § 3113.31
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. Provisions */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding bg-card">
          <div
            ref={provisionsAnim.ref}
            className={`container max-w-4xl ${provisionsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-8">What a CPO Can Include</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {provisions.map((item) => (
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
        {/* 7. Violations Section */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">
              Violations and Consequences
            </h2>
            <div className="space-y-4 text-body">
              <p>
                Violating a Civil Protection Order is a criminal offense under
                Ohio Revised Code § 2919.27. A first violation is charged as a{" "}
                <strong>first-degree misdemeanor</strong>, carrying up to 180
                days in jail and a $1,000 fine. Subsequent violations or
                violations involving physical harm can be elevated to a{" "}
                <strong>felony of the fifth degree</strong>, carrying up to 12
                months in prison.
              </p>
              <p>
                Law enforcement officers are authorized to arrest the
                respondent without a warrant if they have reasonable cause to
                believe a CPO has been violated. The court may also modify the
                existing order to impose stricter conditions.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. Quiz */}
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
                  Test Your Knowledge
                </h2>
              </div>
              <p className="text-body">
                Understanding Ohio protection order law gives you confidence.
                See where you stand with this quick 3-question check.
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
                  Common Questions About Protection Orders
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
        {/* 10. Final CTA */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1495837174058-628aafc7d610?w=1600&q=80"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="container max-w-2xl text-center relative z-10">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Your Safety Comes First
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              If you or your children are in danger, a protection order can
              help. Call us now for immediate assistance.
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

export default CivilProtectionOrders;
