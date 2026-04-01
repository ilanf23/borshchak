import { Target, Brain, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const items = [
  {
    icon: Target,
    title: "Attention to Detail",
    description:
      "The strength of a case often lives in the details. We pride ourselves on thorough preparation, careful review of every document, and leaving nothing to chance.",
  },
  {
    icon: Brain,
    title: "Calculated Decision-Making",
    description:
      "We are not just strategic - we are calculated. Every recommendation we make is grounded in data, legal precedent, and a clear-eyed assessment of risk and outcome.",
  },
  {
    icon: MapPin,
    title: "Central Ohio Focused",
    description:
      "From downtown Columbus to communities across Franklin, Delaware, Pickaway, Licking, Union, Madison, and Fairfield counties - we know these courts, these judges, and this community.",
  },
];

const WhyChooseUs = () => {
  const headerAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.1);

  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div
          ref={headerAnim.ref}
          className={`text-center max-w-2xl mx-auto mb-12 ${headerAnim.className}`}
        >
          <h2 className="heading-section">Why Clients Choose Us</h2>
        </div>

        <div
          ref={gridAnim.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${gridAnim.className}`}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="card-bordered text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
