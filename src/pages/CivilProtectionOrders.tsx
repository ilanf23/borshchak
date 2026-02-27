import { useState } from "react";
import { Phone, ChevronDown, ChevronUp, ArrowRight, HelpCircle, Trophy, ShieldAlert, FileText, Clock, Users, Gavel, AlertTriangle, Scale, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useConsultation } from "@/contexts/ConsultationContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const cpoTypes = [
  {
    title: "Domestic Violence Civil Protection Order (DVCPO)",
    icon: ShieldAlert,
    description: "Filed under Ohio Revised Code § 3113.31, a DVCPO protects family or household members from domestic violence. This includes current or former spouses, people who have lived together, parents of the same child, and other family or household members. The court can order the respondent to stay away from the petitioner's home, workplace, and school, and can grant temporary custody of children.",
  },
  {
    title: "Civil Stalking Protection Order (CSPO)",
    icon: AlertTriangle,
    description: "Filed under Ohio Revised Code § 2903.214, a CSPO protects any person from a pattern of conduct that causes mental distress or makes the victim believe the offender will cause physical harm. Unlike a DVCPO, the petitioner does not need to be a family or household member of the respondent. This order is commonly used for harassment by neighbors, coworkers, or acquaintances.",
  },
  {
    title: "Sexually Oriented Offense Protection Order (SOOPO)",
    icon: Scale,
    description: "Also filed under Ohio Revised Code § 2903.214, a SOOPO protects victims of sexually oriented offenses. The petitioner must demonstrate that the respondent committed or attempted to commit a sexually oriented offense. These orders provide similar protections as other CPOs, including no-contact and stay-away provisions.",
  },
];

const provisions = [
  { label: "Stay-Away Orders", icon: Home, description: "The respondent must stay a specified distance from the petitioner's residence, workplace, school, and other frequented locations." },
  { label: "No-Contact Orders", icon: FileText, description: "Prohibits the respondent from contacting the petitioner by any means — phone, text, email, social media, or through third parties." },
  { label: "Temporary Custody", icon: Users, description: "In DVCPO cases, the court may grant temporary custody of minor children to the petitioner to protect the children's safety." },
  { label: "Exclusive Use of Residence", icon: Home, description: "The petitioner may be granted exclusive use of the shared residence, and the respondent may be ordered to vacate." },
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
    explanation: "In Ohio, a full Civil Protection Order can last up to 5 years. The petitioner can request a renewal before the order expires if the threat continues.",
  },
  {
    question: "What happens if someone violates a Civil Protection Order in Ohio?",
    options: [
      "Nothing, it is only a suggestion",
      "A small fine only",
      "It is a criminal offense that can result in arrest and jail time",
      "The order is automatically canceled",
    ],
    correctIndex: 2,
    explanation: "Violating a CPO in Ohio is a criminal offense under ORC § 2919.27. A first offense is a first-degree misdemeanor punishable by up to 180 days in jail. Repeat violations can be charged as a felony.",
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
    explanation: "Ohio courts can issue an ex parte (temporary) protection order on the same day the petition is filed if the petitioner demonstrates an immediate and present danger. A full hearing is then scheduled within 7 to 10 days.",
  },
];

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
      className="card-bordered hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-subsection text-lg">{title}</h4>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-body text-base">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CPOQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = quizQuestions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
          <Trophy className="w-10 h-10" style={{ color: "hsl(var(--green-accent))" }} />
        </div>
        <h3 className="heading-section text-3xl">You scored {score}/{quizQuestions.length}!</h3>
        <p className="text-body">
          {score === 3
            ? "Excellent understanding of protection orders in Ohio."
            : score >= 2
            ? "Good knowledge! A consultation can clarify the details."
            : "Protection order law can be complex. Let our team guide you."}
        </p>
        <a href="tel:+16146624043" className="btn-cta inline-flex">
          <Phone className="w-5 h-5 mr-2" />
          Get Your Free Consultation
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-medium text-muted-foreground">Question {currentQ + 1} of {quizQuestions.length}</span>
        <div className="flex gap-1">
          {quizQuestions.map((_, i) => (
            <div key={i} className="w-8 h-1.5 rounded-full" style={{ backgroundColor: i <= currentQ ? "hsl(var(--green-accent))" : "hsl(var(--border))" }} />
          ))}
        </div>
      </div>
      <h3 className="heading-subsection text-2xl">{q.question}</h3>
      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          let borderColor = "hsl(var(--border))";
          let bgColor = "transparent";
          if (answered && idx === q.correctIndex) { borderColor = "hsl(var(--green-accent))"; bgColor = "hsla(152, 45%, 38%, 0.08)"; }
          else if (answered && idx === selected && idx !== q.correctIndex) { borderColor = "hsl(var(--destructive))"; bgColor = "hsla(0, 72%, 51%, 0.05)"; }
          else if (idx === selected) { borderColor = "hsl(var(--primary))"; }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className="text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 text-body text-lg" style={{ borderColor, backgroundColor: bgColor }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg" style={{ backgroundColor: "hsl(var(--secondary))" }}>
          <p className="text-body text-base"><strong>{selected === q.correctIndex ? "Correct!" : "Not quite."}</strong> {q.explanation}</p>
        </motion.div>
      )}
      {answered && (
        <button onClick={handleNext} className="btn-cta">
          {currentQ < quizQuestions.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      )}
    </div>
  );
};

const CivilProtectionOrders = () => {
  const { openConsultation } = useConsultation();
  const typesAnim = useScrollAnimation();
  const provisionsAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const quizAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in" style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}>
              Columbus, OH Civil Protection Order Attorneys
            </p>
            <h1 className="heading-hero mb-6 opacity-0 animate-fade-in" style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}>
              Civil Protection Orders in Ohio
            </h1>
            <p className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              Whether you need to obtain a protection order or defend against one, our attorneys provide knowledgeable guidance through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "550ms" }}>
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-card" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">What Is a Civil Protection Order?</h2>
            <div className="space-y-4 text-body">
              <p>
                A Civil Protection Order (CPO) is a court order designed to protect individuals from domestic violence, stalking, or sexually oriented offenses. In Ohio, CPOs are governed by specific statutes that allow victims to seek immediate judicial protection from threatening or harmful behavior.
              </p>
              <p>
                CPOs can require the respondent to stay away from the petitioner, vacate a shared residence, have no contact by any means, and comply with temporary custody arrangements. Violating a CPO is a criminal offense in Ohio that can result in arrest and imprisonment.
              </p>
            </div>
          </div>
        </section>

        {/* Edge-to-Edge Image */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
          alt="Legal documents representing civil protection orders"
          className="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />

        {/* Types of CPOs */}
        <section className="section-padding">
          <div
            ref={typesAnim.ref}
            className={`container max-w-4xl ${typesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">Types of Protection Orders in Ohio</h2>
            <p className="text-body mb-8">
              Ohio law provides several types of civil protection orders depending on the relationship between the parties and the nature of the threat. Tap each type to learn more.
            </p>
            <div className="grid gap-4">
              {cpoTypes.map((item) => (
                <ExpandableCard key={item.title} title={item.title} icon={item.icon}>
                  {item.description}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section
          className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80')" }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(215, 45%, 22%, 0.75)" }} />
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic" style={{ color: "hsl(var(--primary-foreground))" }}>
              "A protection order is one of the most powerful tools Ohio courts provide to keep individuals safe from harm."
            </p>
            <p className="mt-4 text-base" style={{ color: "hsla(40, 30%, 98%, 0.7)" }}>Ohio Revised Code § 3113.31</p>
          </div>
        </section>

        {/* Provisions */}
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
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-subsection text-xl">{item.label}</h3>
                  </div>
                  <p className="text-body text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Side-by-Side: The Process */}
        <section className="section-padding-sm">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                alt="Attorney discussing protection order options with client"
                className="w-full h-72 md:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="heading-subsection">How the CPO Process Works</h3>
                <p className="text-body">
                  The process begins when the petitioner files a petition with the court describing the threats or acts of violence. If the court finds an immediate and present danger, it can issue an <strong>ex parte (temporary) order the same day</strong>, providing immediate protection before the respondent is even notified.
                </p>
                <p className="text-body">
                  The respondent is then served with the temporary order, and a <strong>full hearing is scheduled within 7 to 10 days</strong>. At the hearing, both parties can present evidence and testimony. If the court grants the full CPO, it can last <strong>up to 5 years</strong> and may be renewed.
                </p>
                <p className="text-body">
                  Whether you are seeking protection or responding to a petition, having an experienced attorney ensures your rights are fully represented throughout this process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Violations Section */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Violations and Consequences</h2>
            <div className="space-y-4 text-body">
              <p>
                Violating a Civil Protection Order is a criminal offense under Ohio Revised Code § 2919.27. A first violation is charged as a <strong>first-degree misdemeanor</strong>, carrying up to 180 days in jail and a $1,000 fine. Subsequent violations or violations involving physical harm can be elevated to a <strong>felony of the fifth degree</strong>, carrying up to 12 months in prison.
              </p>
              <p>
                Law enforcement officers are authorized to arrest the respondent without a warrant if they have reasonable cause to believe a CPO has been violated. The court may also modify the existing order to impose stricter conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Offset Image with Accent Block */}
        <section className="section-padding bg-card">
          <div className="container max-w-5xl">
            <div className="relative">
              <div className="absolute top-6 left-0 w-1/3 h-4/5 rounded-lg hidden md:block" style={{ backgroundColor: "hsl(var(--navy))" }} />
              <div className="relative md:ml-12">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                  alt="Legal professional reviewing protection order documents"
                  className="w-full md:w-4/5 h-72 md:h-96 object-cover rounded-lg relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="section-padding">
          <div
            ref={quizAnim.ref}
            className={`container max-w-2xl ${quizAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-base font-medium text-primary">Test Your Knowledge</span>
              </div>
              <h2 className="heading-section">Protection Order Quiz</h2>
              <p className="text-body text-sm italic mt-1">For informational purposes only. This is not legal advice.</p>
            </div>
            <div className="card-elevated">
              <CPOQuiz />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-3xl text-center ${ctaAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-6" style={{ color: "hsl(var(--primary-foreground))" }}>
              Protect Yourself and Your Family
            </h2>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto" style={{ color: "hsla(40, 30%, 98%, 0.8)" }}>
              Whether you need to obtain a protection order or are responding to one, our experienced attorneys are ready to help. Contact us today for a free, confidential consultation.
            </p>
            <a href="tel:+16146624043" className="btn-cta inline-flex text-lg">
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
