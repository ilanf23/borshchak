import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import justiceStatue from "@/assets/law-hero-image.png";

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
    <section className="section-padding overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-0">
        {/* Image on left - bleeds to edge, contains full image */}
        <div className="lg:w-1/2 w-full">
          <div className="lg:ml-[calc(-50vw+50%)] lg:w-[calc(100%+50vw-50%)]">
            <img 
              src={justiceStatue} 
              alt="Lady Justice statue with scales" 
              className="w-full h-auto object-contain lg:rounded-r-xl"
            />
          </div>
        </div>
        
        {/* Services on right with header */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center py-10 lg:py-16 lg:pl-12 px-6 lg:pr-[max(1rem,calc((100vw-1280px)/2+1rem))]">
          <h2 className="heading-section text-center lg:text-left mb-8">Family Law Services</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
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
      </div>
    </section>
  );
};

export default ServicesOverview;
