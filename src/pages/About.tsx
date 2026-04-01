import { Phone, Shield, Users, Scale, Heart, Calendar, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import dmitriyPhoto from "@/assets/dmitriy-borshchak.png";
import hankPhoto from "@/assets/hank-sonderman-hero.png";
import keriPhoto from "@/assets/keri-reeves.jpg";

const About = () => {
  const pillarsAnim = useScrollAnimation();
  const approachAnim = useScrollAnimation();
  const whyHireAnim = useScrollAnimation();
  const teamAnim = useScrollAnimation();
  const galAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1 — HERO */}
        <section className="bg-navy min-h-[70vh] flex items-center">
          <div className="container max-w-4xl py-20">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Why Families in Columbus Choose Borshchak Law Group
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl">
              Divorce and custody cases define futures. We treat them that way.
            </p>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-10">
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-white">A+</div>
                <div className="text-sm text-white/60">BBB</div>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-white">88</div>
                <div className="text-sm text-white/60">Ohio Counties</div>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-white">5-Star</div>
                <div className="text-sm text-white/60">Reviews</div>
              </div>
            </div>
            <a href="tel:+16143346851" className="btn-cta text-lg px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Call Us 614-334-6851
            </a>
          </div>
        </section>

        {/* SECTION 2 — THREE PILLARS */}
        <section className="bg-navy section-padding">
          <div
            ref={pillarsAnim.ref}
            className={`container ${pillarsAnim.className}`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <span className="font-serif text-6xl font-bold text-white/10 absolute -top-2 -left-1">01</span>
                <div className="pt-12">
                  <Shield className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">
                    We Protect What Matters Most
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Your assets, your parenting role, and your financial future. We fight for all of it.
                  </p>
                </div>
              </div>
              <div className="relative">
                <span className="font-serif text-6xl font-bold text-white/10 absolute -top-2 -left-1">02</span>
                <div className="pt-12">
                  <Users className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">
                    We Stand With You Every Step
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    From the first consultation through post-decree follow-up, we never disappear.
                  </p>
                </div>
              </div>
              <div className="relative">
                <span className="font-serif text-6xl font-bold text-white/10 absolute -top-2 -left-1">03</span>
                <div className="pt-12">
                  <Scale className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">
                    We Are Calculated, Not Just Strategic
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Every recommendation is grounded in data, legal precedent, and real risk assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — OUR APPROACH */}
        <section className="section-padding">
          <div
            ref={approachAnim.ref}
            className={`container max-w-4xl ${approachAnim.className}`}
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Our Approach
            </p>
            <h2 className="heading-section mb-6">
              Attention to Detail Changes Outcomes
            </h2>
            <div className="space-y-4 text-body text-lg mb-8">
              <p>
                The strength of a case lives in the details. A carefully reviewed financial record, a precisely worded parenting plan, a well-timed filing. We leave nothing to chance.
              </p>
              <p>
                Ohio family law is also emotionally charged — especially when children are involved. We help clients make calculated decisions that insulate them from risk, not just today but three, five, and ten years from now.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-body text-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                Direct attorney involvement — never paralegal-handled
              </li>
              <li className="flex items-start gap-3 text-body text-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                Licensed in all 88 Ohio counties
              </li>
              <li className="flex items-start gap-3 text-body text-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                Free consultations with Hank & Keri
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4 — WHY HIRE */}
        <section className="section-padding bg-card">
          <div
            ref={whyHireAnim.ref}
            className={`container ${whyHireAnim.className}`}
          >
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="heading-section mb-4">
                Why a Specialized Family Law Firm?
              </h2>
              <p className="text-body text-lg">
                General practice firms handle everything. We handle one thing — and we've dedicated our careers to it.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Experienced Representation</h3>
                </div>
                <p className="text-body text-base">
                  Every case handled by a licensed family law attorney. No paralegals doing substantive work.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Strategic Negotiation</h3>
                </div>
                <p className="text-body text-base">
                  Most cases resolve before trial. We know how to protect you at the table.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Genuine Compassion</h3>
                </div>
                <p className="text-body text-base">
                  We bring legal precision and real human understanding to every client relationship.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Current on Ohio Law</h3>
                </div>
                <p className="text-body text-base">
                  Family law evolves. We stay ahead of statutory changes and local court procedures.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Responsive Communication</h3>
                </div>
                <p className="text-body text-base">
                  You'll always know who to call and never wonder about your case status.
                </p>
              </div>
              <div className="card-bordered">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="heading-subsection text-lg">Protecting Your Future</h3>
                </div>
                <p className="text-body text-base">
                  We think beyond the outcome — helping you make decisions that hold up for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — TEAM */}
        <section className="bg-navy section-padding">
          <div
            ref={teamAnim.ref}
            className={`container ${teamAnim.className}`}
          >
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                The Team Behind Your Case
              </h2>
              <p className="text-lg text-white/70">
                Every case is handled by a licensed attorney. You will always know who is working for you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { photo: dmitriyPhoto, name: "Dmitriy Borshchak", title: "Managing Attorney", link: "/attorneys/dmitriy-borshchak", position: "right 30%" },
                { photo: keriPhoto, name: "Keri Reeves", title: "Family Law Attorney", link: "/attorneys/keri-reeves", position: "center 20%" },
                { photo: hankPhoto, name: "Hank Sonderman", title: "Family Law Attorney", link: "/attorneys/hank-sonderman", position: "right 70%" },
              ].map((attorney) => (
                <div
                  key={attorney.name}
                  className="bg-navy/50 border border-white/10 rounded-xl overflow-hidden"
                >
                  <img
                    src={attorney.photo}
                    alt={attorney.name}
                    className="h-[260px] w-full object-cover"
                    style={{ objectPosition: attorney.position }}
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {attorney.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{attorney.title}</p>
                    <Link
                      to={attorney.link}
                      className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                    >
                      View Profile &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — GAL */}
        <section className="bg-secondary/30 section-padding">
          <div
            ref={galAnim.ref}
            className={`container max-w-5xl ${galAnim.className}`}
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Important to Know
            </p>
            <h2 className="heading-section mb-4">
              What Is a Guardian Ad Litem?
            </h2>
            <p className="text-body text-lg mb-10 max-w-3xl">
              A GAL is a court-appointed neutral — often a licensed attorney — who investigates custody matters and recommends what is in the child's best interest.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">What They Do</h3>
                <p className="text-body">
                  Interviews parents, children, teachers, doctors. Files a written recommendation with the court carrying significant judicial weight.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">When They're Appointed</h3>
                <p className="text-body">
                  High-conflict disputes, child safety concerns, allegations of abuse or neglect, or when the court determines it is in the child's best interest.
                </p>
              </div>
              <div className="card-bordered">
                <h3 className="heading-subsection text-xl mb-3">Cost vs. Value</h3>
                <p className="text-body">
                  A GAL adds cost but can reduce litigation. By resolving conflicts early, they often lower total legal costs for both parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — CTA */}
        <section className="bg-navy section-padding">
          <div
            ref={ctaAnim.ref}
            className={`container max-w-3xl text-center ${ctaAnim.className}`}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work With a Team You Can Trust?
            </h2>
            <p className="text-lg text-white/75 mb-6 leading-relaxed">
              Taking the next step requires a team that will fight for your financial security, protect your relationship with your children, and stand beside you at every stage. Reach out for a confidential consultation.
            </p>
            <p className="text-sm text-white/50 mb-8">
              Free consultations with Hank & Keri. Paid engagements with Dmitriy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+16143346851" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call 614-334-6851
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors font-medium"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
