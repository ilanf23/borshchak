import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Divorce",
    description: "Strategic representation for contested and uncontested divorce proceedings. We protect your assets, parental rights, and future.",
    href: "/divorce",
    features: ["Asset protection", "Spousal support", "Settlement negotiation"]
  },
  {
    title: "Child Custody & Parenting",
    description: "Establishing custody arrangements that protect your relationship with your children while promoting their wellbeing.",
    href: "/custody",
    features: ["Custody modification", "Parenting plans", "Relocation cases"]
  },
  {
    title: "Property & Asset Division",
    description: "Fair division of marital property, from family homes to complex investment portfolios and business interests.",
    href: "/assets",
    features: ["Business valuation", "Retirement accounts", "Hidden asset discovery"]
  },
  {
    title: "Mediation & Alternative Resolution",
    description: "Not every case needs a courtroom battle. We guide productive negotiations that save time, money, and stress.",
    href: "/mediation",
    features: ["Collaborative divorce", "Mediation support", "Settlement conferences"]
  }
];

const ServicesOverview = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section mb-4">Our Practice Areas</h2>
          <p className="text-body">
            Focused expertise in the areas of family law that matter most. Every case receives strategic attention tailored to your specific situation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.href}
              className="card-bordered group hover:bg-card hover:shadow-sm transition-all duration-200"
            >
              <h3 className="heading-subsection mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-body-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-secondary px-3 py-1 rounded-full text-foreground">
                    {feature}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
