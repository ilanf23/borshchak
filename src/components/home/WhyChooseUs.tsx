import { MessageSquare, Target, Shield, Clock } from "lucide-react";

const differentiators = [
  {
    icon: MessageSquare,
    title: "Direct Attorney Communication",
    description: "You work directly with your attorney—not a paralegal passing messages. When you call, we answer."
  },
  {
    icon: Target,
    title: "Strategic, Not Reactive",
    description: "We don't just respond to the other side. We build a case strategy from day one designed to achieve your specific goals."
  },
  {
    icon: Shield,
    title: "Courtroom Confidence",
    description: "While we pursue settlement when possible, we're fully prepared to go to trial. Opposing counsel knows this."
  },
  {
    icon: Clock,
    title: "Realistic Timelines",
    description: "No false promises. We set honest expectations about duration, costs, and likely outcomes from your first consultation."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-section mb-4">
              Why Clients Choose Morrison Family Law
            </h2>
            <p className="text-body mb-8">
              You're not looking for the cheapest attorney or the flashiest website. You need someone who will fight intelligently for your interests while treating you as a person, not a case number.
            </p>
            
            <div className="space-y-6">
              {differentiators.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card-elevated bg-card">
            <blockquote className="text-lg text-foreground italic mb-6 leading-relaxed">
              "After interviewing five attorneys, I knew within minutes that this was the firm for me. They were honest about my case's challenges but confident in their strategy. Two years later, I have full custody and a fair settlement."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-medium text-primary">JR</span>
              </div>
              <div>
                <p className="font-medium text-foreground">James R.</p>
                <p className="text-sm text-muted-foreground">Custody & Divorce Client, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
