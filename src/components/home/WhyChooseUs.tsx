import { UserCheck, MessageCircle, Target, Heart, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const differentiators = [
  {
    icon: UserCheck,
    title: "Direct Attorney Access",
    description: "You always know who is handling your case and have a direct line to your attorney — never handed off to paralegals for substantive legal work.",
    stat: "3",
    statLabel: "dedicated family law attorneys"
  },
  {
    icon: MessageCircle,
    title: "Responsive Communication",
    description: "Calls and emails returned promptly. You're never left wondering about the status of your case.",
    stat: "<24hr",
    statLabel: "average response time"
  },
  {
    icon: Target,
    title: "Strategic Planning From Day One",
    description: "We build your case strategy upfront, not just react to the other side.",
    stat: "500+",
    statLabel: "cases strategically planned"
  },
  {
    icon: Heart,
    title: "Calm, Human Guidance",
    description: "We understand the emotional weight and help you make clear decisions.",
    stat: "4.8★",
    statLabel: "from 147+ Google reviews"
  }
];

const WhyChooseUs = () => {
  const headerAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.1);

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-12 ${headerAnim.className}`}
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-base font-medium mb-4">
            <Star className="w-4 h-4 fill-accent" />
            What Sets Us Apart
          </div>
          <h2 className="heading-section text-primary-foreground mb-4">
            Why Clients Choose Borshchak Law Group
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            These are what our clients consistently say in their reviews.
          </p>
        </div>
        
        {/* Differentiators Grid */}
        <div
          ref={gridAnim.ref}
          className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto stagger-children ${gridAnim.isVisible ? "stagger-visible" : ""}`}
        >
          {differentiators.map((item, index) => (
            <div 
              key={index} 
              className="group bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-foreground text-xl mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70 text-base leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-accent">{item.stat}</span>
                    <span className="text-sm text-primary-foreground/50 uppercase tracking-wider">{item.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
