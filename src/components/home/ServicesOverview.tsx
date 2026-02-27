import { ArrowRight, Scale, Users, DollarSign, Building2, FileText, Gavel, BookOpen, Handshake, FileClock, Heart, ShieldAlert, Briefcase, ShieldCheck, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  { title: "Divorce", description: "Contested, uncontested, and post-decree modifications.", href: "/divorce", icon: Scale },
  { title: "Child Custody", description: "Fair custody arrangements that put your child first.", href: "/custody", icon: Users },
  { title: "Child Support", description: "Calculations, modifications, and enforcement.", href: "/child-support", icon: DollarSign },
  { title: "Property & Assets", description: "Equitable division of businesses, retirement, and real estate.", href: "/assets", icon: Building2 },
  { title: "Prenuptial Agreement", description: "Protect both parties' interests before marriage.", href: "/prenuptial-agreement", icon: FileText },
  { title: "Annulment", description: "Determine eligibility and navigate the legal process.", href: "/annulment", icon: Gavel },
  { title: "Dissolution", description: "A faster, less adversarial path when both parties agree.", href: "/dissolution", icon: BookOpen },
  { title: "Mediation", description: "Resolve disputes outside the courtroom.", href: "/mediation", icon: Handshake },
  { title: "Post-Decree Matters", description: "Modify custody, support, and other orders.", href: "/post-decree-matters", icon: FileClock },
  { title: "Spousal Support", description: "Outcomes that reflect your contributions and needs.", href: "/spousal-support", icon: Heart },
  { title: "Contempt Proceedings", description: "Enforce court orders when they're violated.", href: "/contempt-proceedings", icon: ShieldAlert },
  { title: "Legal Separation", description: "Legal boundaries for finances, custody, and property.", href: "/legal-separation", icon: Scale },
  { title: "Business Interests", description: "Valuation, division, and preservation of commercial assets.", href: "/business-interests", icon: Briefcase },
  { title: "Court Order Enforcement", description: "Hold the other party accountable to court orders.", href: "/enforcement", icon: ShieldCheck },
  { title: "Civil Protection Orders", description: "Obtain or defend against protection orders.", href: "/civil-protection-orders", icon: ShieldAlert },
  { title: "Father's Rights", description: "Equal consideration in custody and support matters.", href: "/fathers-rights", icon: UserCheck },
];

const ServicesOverview = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");

  return (
    <section className="py-14 md:py-20 bg-secondary/30">
      <div className="container">
        <div
          ref={sectionAnim.ref}
          className={sectionAnim.className}
        >
          <div className="text-center mb-10">
            <h2 className="heading-section text-foreground mb-3">Family Law Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive legal support for every stage of your family's journey
            </p>
          </div>

          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children ${sectionAnim.isVisible ? "stagger-visible" : ""}`}>
            {services.map((service, index) => {
              const Icon = service.icon;
              const [bgColor, textColor] = service.color.split(" ");
              return (
                <Link
                  key={index}
                  to={service.href}
                  className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start border border-transparent hover:border-primary/10"
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 ${bgColor}`}>
                    <Icon className={`w-5.5 h-5.5 ${textColor}`} />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                    {service.title}
                  </h3>
                  <span className="inline-flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                    Explore <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
