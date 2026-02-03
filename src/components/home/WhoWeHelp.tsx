import { Users, Briefcase, Building2 } from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "Parents Navigating Divorce",
    description: "When children are involved, every decision matters. We help you protect custody rights, establish fair parenting plans, and minimize conflict—so your children come first.",
    situations: ["Contested custody battles", "Relocation disputes", "Parenting time modifications"]
  },
  {
    icon: Briefcase,
    title: "Professionals with Complex Finances",
    description: "Executives, physicians, and high-earners face unique challenges in divorce. We understand equity compensation, retirement accounts, and the nuances of dividing substantial assets.",
    situations: ["Stock options & RSUs", "Pension division", "Spousal support calculations"]
  },
  {
    icon: Building2,
    title: "Business Owners",
    description: "Your business is your life's work. We help protect your company from being undervalued or divided unfairly, while still achieving equitable outcomes.",
    situations: ["Business valuation disputes", "Protecting private companies", "Partnership considerations"]
  }
];

const WhoWeHelp = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section mb-4">Who We Help</h2>
          <p className="text-body">
            We focus on clients facing significant family law decisions—people whose cases demand strategic thinking, not cookie-cutter solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div key={index} className="card-elevated">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-5">
                <audience.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="heading-subsection mb-3">{audience.title}</h3>
              <p className="text-body-sm mb-4">{audience.description}</p>
              <ul className="space-y-2">
                {audience.situations.map((situation, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {situation}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
