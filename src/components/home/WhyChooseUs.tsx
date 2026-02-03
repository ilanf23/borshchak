import { UserCheck, MessageCircle, Target, Heart } from "lucide-react";

const differentiators = [
  {
    icon: UserCheck,
    title: "Direct access to your attorney",
    description: "You work with Dmitriy—not passed to juniors or paralegals."
  },
  {
    icon: MessageCircle,
    title: "Extremely responsive communication",
    description: "Calls and emails returned promptly. You're never left wondering."
  },
  {
    icon: Target,
    title: "Strategic planning, not reactive lawyering",
    description: "We build a case strategy from day one, not just respond to the other side."
  },
  {
    icon: Heart,
    title: "Calm, human guidance",
    description: "We understand the emotional weight and help you make clear decisions."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-section mb-10 text-center">
            Why Clients Choose Borshchak Law Group
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
