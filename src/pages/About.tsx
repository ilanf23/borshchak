import { Calendar, Phone, Scale, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const About = () => {
  const whyHireAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-base font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Borshchak Law Group | Columbus, Ohio
            </p>
            <h1 className="heading-hero mb-6">
              Divorce Is a Turning Point. We're Here to Make Sure You Land on Your Feet.
            </h1>
            <p className="text-body text-xl">
              At Borshchak Law Group, we know divorce touches every part of your
              life — your finances, your future, and most importantly, your
              children. That's why we specialize in expertly safeguarding your
              assets while fiercely protecting your essential role in your
              children's lives. From the earliest planning stages before filing,
              through every negotiation and court hearing, to the critical
              follow-through once the divorce is final, we stand with you at
              every turn.
            </p>
            <p className="text-body text-lg mt-4">
              Your financial security and your family's well-being are never
              secondary here — they are our top priority, shaping every strategy
              we build for you.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding-sm bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <Scale className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-4xl font-semibold text-primary">Dedicated</div>
                <div className="text-base text-muted-foreground">To Family Law</div>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-4xl font-semibold text-primary">Trusted</div>
                <div className="text-base text-muted-foreground">By Ohio Families</div>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-4xl font-semibold text-primary">5-Star</div>
                <div className="text-base text-muted-foreground">Client Reviews</div>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-4xl font-semibold text-primary">A+</div>
                <div className="text-base text-muted-foreground">BBB Rating</div>
              </div>
              <div>
                <Scale className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-4xl font-semibold text-primary">88</div>
                <div className="text-base text-muted-foreground">Ohio Counties</div>
              </div>
            </div>
            <div className="card-elevated mt-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-body text-sm">
                  Consultations with Dmitriy Borshchak are by paid engagement.
                  Free consultations are available with other members of our
                  team — Hank Sonderman and Keri Reeves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hire a Specialized Family Law Firm */}
        <section className="section-padding bg-card">
          <div
            ref={whyHireAnim.ref}
            className={`container max-w-4xl ${whyHireAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-4">
              Why Hire a Specialized Family Law Firm
            </h2>
            <p className="text-body text-lg mb-10">
              Family law is one of the few areas of the law that is simultaneously
              complex, deeply personal, and emotionally charged. Hiring a firm that
              focuses exclusively on family law — rather than a general practice —
              means every attorney on your case has dedicated their career to
              understanding the law, the courts, and the strategies that produce
              the best outcomes for families like yours.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Experienced Legal Representation
                  </h3>
                </div>
                <p className="text-body text-base">
                  Every case is handled by a licensed family law attorney — never
                  delegated to paralegals for substantive legal work. You get direct
                  attorney involvement from consultation through conclusion.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Strategic Negotiation
                  </h3>
                </div>
                <p className="text-body text-base">
                  Most cases resolve before trial. Our attorneys are skilled
                  negotiators who know how to protect your interests at the table
                  while keeping your goals front and center.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Personalized Emotional Support
                  </h3>
                </div>
                <p className="text-body text-base">
                  We understand that this is one of the most difficult experiences
                  of your life. We bring both legal precision and genuine compassion
                  to every client relationship.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Compliance with Ohio Law
                  </h3>
                </div>
                <p className="text-body text-base">
                  Ohio family law evolves. Our attorneys stay current on statutory
                  changes, case law developments, and local court procedures that
                  affect your case.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Responsive Communication
                  </h3>
                </div>
                <p className="text-body text-base">
                  You will always know who to call. We pride ourselves on timely
                  responses and proactive updates so you are never left wondering
                  about the status of your case.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                  >
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">
                    Protecting Your Future
                  </h3>
                </div>
                <p className="text-body text-base">
                  From asset division to parenting arrangements, we think beyond
                  the immediate outcome — helping you make calculated decisions that
                  protect your financial security and your family's wellbeing for
                  years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Our Philosophy</h2>
            <div className="space-y-6 text-body">
              <p>
                Family law is personal. When someone walks into our office, they're not just bringing a legal problem. They're bringing fear, uncertainty, and often grief about the life they expected. We never forget that.
              </p>
              <p>
                At the same time, family law requires clear-headed strategy. Emotional decisions often lead to regrettable outcomes. Our job is to help you think through decisions rationally while honoring what you're going through emotionally.
              </p>
              <p>
                We've built our practice on direct attorney involvement. Every client has a dedicated attorney handling their case. You'll know exactly who to call, and you'll get answers, not callbacks in three days. Our attorneys take ownership of your matter from start to finish.
              </p>
              <p>
                We pride ourselves on attention to detail. The strength of a
                case often lives in the details — a carefully reviewed financial
                record, a precisely worded parenting plan, a well-timed filing.
                We leave nothing to chance and nothing to assumption.
              </p>
              <p>
                We are not just strategic — we are calculated. Every
                recommendation we make is grounded in data, legal precedent, and
                a clear-eyed assessment of risk and outcome. We help our clients
                make decisions that feel right not just today, but three, five,
                and ten years from now.
              </p>
            </div>
          </div>
        </section>

        {/* Local Focus */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Deep Local Experience</h2>
            <div className="space-y-6 text-body">
              <p>
                We practice almost exclusively in Franklin County and surrounding Central Ohio courts. This focus means we understand local judicial preferences, procedural quirks, and what arguments resonate with the judges who will decide your case.
              </p>
              <p>
                We know the opposing attorneys, the court staff, and the procedures that can expedite or delay your case. This institutional knowledge matters when you need results efficiently.
              </p>
              <p>
                Our office in downtown Columbus is convenient for clients across the metro area, and we offer video consultations for those who prefer them.
              </p>
            </div>
          </div>
        </section>

        {/* Our Attorneys */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Our Attorneys</h2>
            <p className="text-body mb-8">
              Borshchak Law Group is led by Dmitriy Borshchak and supported by a team of experienced family law attorneys. Every case is handled by a licensed attorney and never delegated to paralegals for substantive legal work. Our team is completed by Leigh Tennison, our Executive Assistant, whose responsiveness and care are consistently highlighted in client reviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/attorneys/dmitriy-borshchak" className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <p className="font-serif text-lg font-semibold text-foreground">Dmitriy Borshchak</p>
                <p className="text-sm text-muted-foreground mt-1">Managing Attorney</p>
              </Link>
              <Link to="/attorneys/keri-reeves" className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <p className="font-serif text-lg font-semibold text-foreground">Keri Reeves</p>
                <p className="text-sm text-muted-foreground mt-1">Family Law Attorney</p>
              </Link>
              <Link to="/attorneys/hank-sonderman" className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <p className="font-serif text-lg font-semibold text-foreground">Hank Sonderman</p>
                <p className="text-sm text-muted-foreground mt-1">Family Law Attorney</p>
              </Link>
              <Link to="/attorneys/leigh" className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <p className="font-serif text-lg font-semibold text-foreground">Leigh Tennison</p>
                <p className="text-sm text-muted-foreground mt-1">Executive Assistant</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Meet With Us</h2>
            <p className="text-body mb-8">
              Schedule a consultation to discuss your situation and see if we're the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+16146624043" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
