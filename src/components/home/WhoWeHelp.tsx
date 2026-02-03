import { Users, Briefcase, AlertTriangle } from "lucide-react";
import whoWeHelpBg from "@/assets/who-we-help-family.png";

const personas = [
  {
    icon: Users,
    title: "Parents navigating divorce or custody",
    description: "We protect your rights, your finances, and your future."
  },
  {
    icon: Briefcase,
    title: "Professionals with complex assets",
    description: "We protect your rights, your finances, and your future."
  },
  {
    icon: AlertTriangle,
    title: "High-conflict family disputes",
    description: "We protect your rights, your finances, and your future."
  }
];

const WhoWeHelp = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={whoWeHelpBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section mb-4">Who We Help</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div key={index} className="card-elevated text-center bg-accent/10 backdrop-blur-sm border-accent/20">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-5">
                <persona.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="heading-subsection mb-3">{persona.title}</h3>
              <p className="text-body-sm">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
