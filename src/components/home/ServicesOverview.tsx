import { ArrowRight, Scale, Users, Building2, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import serviceBgDivorce from "@/assets/service-bg-divorce.jpg";
import serviceBgCustody from "@/assets/service-bg-custody.jpg";
import serviceBgAssets from "@/assets/service-bg-assets.jpg";
import serviceBgMediation from "@/assets/service-bg-mediation.jpg";

const services = [
  {
    title: "Divorce & Legal Separation",
    description: "Navigate the divorce process with clarity. We handle contested and uncontested divorces, legal separations, and post-decree modifications.",
    href: "/divorce",
    icon: Scale,
    bg: serviceBgDivorce,
  },
  {
    title: "Child Custody & Parenting Plans",
    description: "Protect your relationship with your children. We advocate for fair custody arrangements and parenting time that prioritize your child's wellbeing.",
    href: "/custody",
    icon: Users,
    bg: serviceBgCustody,
  },
  {
    title: "Property & Asset Division",
    description: "Ensure equitable division of marital assets. We handle complex cases involving businesses, retirement accounts, and real estate.",
    href: "/assets",
    icon: Building2,
    bg: serviceBgAssets,
  },
  {
    title: "Mediation & Alternative Resolution",
    description: "Resolve disputes outside the courtroom. Our mediation services save time, reduce costs, and preserve relationships.",
    href: "/mediation",
    icon: Handshake,
    bg: serviceBgMediation,
  },
];

const ServicesOverview = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");

  return (
    <section className="section-padding bg-navy">
      <div className="container">
        <div
          ref={sectionAnim.ref}
          className={sectionAnim.className}
        >
          <div className="text-center mb-12">
            <h2 className="heading-section text-primary-foreground mb-4">Family Law Services</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "hsla(40, 30%, 98%, 0.85)" }}>
              Comprehensive legal support for every stage of your family's journey
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${sectionAnim.isVisible ? "stagger-visible" : ""}`}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={service.href}
                  className="group relative rounded-lg border-t-4 border-t-green overflow-hidden hover:-translate-y-1 transition-all duration-200 hover:shadow-lg shadow-sm min-h-[280px] flex flex-col"
                >
                  <img
                    src={service.bg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-card/90 group-hover:bg-card/85 transition-all duration-200" />
                  <div className="relative z-10 p-6 flex flex-col flex-1">
                    <Icon className="w-8 h-8 text-green mb-4" />
                    <h3 className="font-medium text-lg text-card-foreground group-hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-base text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
