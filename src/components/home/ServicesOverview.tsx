import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import justiceStatue from "@/assets/law-hero-image.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    title: "Divorce & Legal Separation",
    description: "Navigate the divorce process with clarity. We handle contested and uncontested divorces, legal separations, and post-decree modifications.",
    href: "/divorce"
  },
  {
    title: "Child Custody & Parenting Plans",
    description: "Protect your relationship with your children. We advocate for fair custody arrangements and parenting time that prioritize your child's wellbeing.",
    href: "/custody"
  },
  {
    title: "Property & Asset Division",
    description: "Ensure equitable division of marital assets. We handle complex cases involving businesses, retirement accounts, and real estate.",
    href: "/assets"
  },
  {
    title: "Mediation & Alternative Resolution",
    description: "Resolve disputes outside the courtroom. Our mediation services save time, reduce costs, and preserve relationships.",
    href: "/mediation"
  }
];

const ServicesOverview = () => {
  const imageAnim = useScrollAnimation(0.1, "left");
  const cardsAnim = useScrollAnimation(0.1, "right");

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image on left */}
          <div
            ref={imageAnim.ref}
            className={`lg:w-1/2 w-full ${imageAnim.className}`}
          >
            <img 
              src={justiceStatue} 
              alt="Lady Justice statue with scales" 
              className="w-full h-auto object-contain rounded-xl max-h-[600px]"
            />
          </div>
          
          {/* Services on right with header */}
          <div
            ref={cardsAnim.ref}
            className={`lg:w-1/2 w-full flex flex-col justify-center ${cardsAnim.className}`}
          >
            <h2 className="heading-section text-center mb-8">Family Law Services</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Link 
                  key={index} 
                  to={service.href}
                  className="card-bordered group hover:bg-card hover:shadow-sm transition-all duration-200 py-6 px-6 text-left hover:-translate-y-1"
                >
                  <h3 className="font-medium text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-base text-muted-foreground group-hover:text-primary transition-colors">
                    Learn more <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
