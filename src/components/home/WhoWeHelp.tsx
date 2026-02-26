import { Users, Briefcase, ShieldAlert, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useConsultation } from "@/contexts/ConsultationContext";

const personas = [
  {
    number: "01",
    icon: Users,
    title: "Parents navigating divorce or custody",
    description:
      "Your relationship with your children and your financial security are on the line. We build a clear strategy from day one — so you're never reacting, only moving forward.",
  },
  {
    number: "02",
    icon: Briefcase,
    title: "Professionals with complex assets",
    description:
      "Business interests, stock options, real estate, and retirement accounts require more than a standard approach. We protect what you've built while keeping your case discreet.",
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Individuals in high-conflict disputes",
    description:
      "When the other side is combative, you need an attorney who won't back down. We've litigated hundreds of contentious cases and know how to protect you under pressure.",
  },
];

const WhoWeHelp = () => {
  const headerAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation(0.1);
  const { openConsultation } = useConsultation();

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container">
        <div
          ref={headerAnim.ref}
          className={`text-center max-w-2xl mx-auto mb-12 ${headerAnim.className}`}
        >
          <h2 className="heading-section mb-4">Who We Help</h2>
          <p className="text-body">
            Every family situation is different. We've handled them all.
          </p>
        </div>

        <div
          ref={cardsAnim.ref}
          className={`grid md:grid-cols-3 gap-6 stagger-children ${cardsAnim.isVisible ? "stagger-visible" : ""}`}
        >
          {personas.map((persona) => (
            <div
              key={persona.number}
              className="bg-navy rounded-lg p-8 flex flex-col group hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <persona.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-serif text-4xl font-semibold text-green leading-none">
                  {persona.number}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-medium text-primary-foreground mb-4 leading-snug">
                {persona.title}
              </h3>

              <p className="text-primary-foreground/70 text-base leading-relaxed flex-1 mb-8">
                {persona.description}
              </p>

              <button
                onClick={openConsultation}
                className="inline-flex items-center gap-2 text-base font-medium text-green group-hover:gap-3 transition-all duration-200"
              >
                Schedule a free consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
