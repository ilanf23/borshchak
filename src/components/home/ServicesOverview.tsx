import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Divorce & Legal Separation",
    href: "/divorce"
  },
  {
    title: "Child Custody & Parenting Plans",
    href: "/custody"
  },
  {
    title: "Property & Asset Division",
    href: "/assets"
  },
  {
    title: "Mediation & Alternative Resolution",
    href: "/mediation"
  }
];

const ServicesOverview = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="heading-section">Family Law Services</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.href}
              className="card-bordered group hover:bg-card hover:shadow-sm transition-all duration-200 text-center py-8"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                {service.title}
              </h3>
              <span className="inline-flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
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
