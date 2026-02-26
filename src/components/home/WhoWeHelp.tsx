import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import imgDivorce from "@/assets/services/divorce.jpg";
import imgChildCustody from "@/assets/services/child-custody.jpg";
import imgChildSupport from "@/assets/services/child-support.jpg";
import imgPrenuptial from "@/assets/services/prenuptial.jpg";
import imgAnnulment from "@/assets/services/annulment.jpg";
import imgDissolution from "@/assets/services/dissolution.jpg";
import imgPostDecree from "@/assets/services/post-decree.jpg";
import imgSpousalSupport from "@/assets/services/spousal-support.jpg";
import imgContempt from "@/assets/services/contempt.jpg";
import imgLegalSeparation from "@/assets/services/legal-separation.jpg";
import imgBusinessInterests from "@/assets/services/business-interests.jpg";
import imgEnforcement from "@/assets/services/enforcement.jpg";
import imgCivilProtection from "@/assets/services/civil-protection.jpg";

const services = [
  { label: "Divorce", href: "/divorce", image: imgDivorce },
  { label: "Child Custody", href: "/custody", image: imgChildCustody },
  { label: "Child Support", href: "/child-support", image: imgChildSupport },
  { label: "Prenuptial Agreement", href: "/prenuptial-agreement", image: imgPrenuptial },
  { label: "Annulment", href: "/annulment", image: imgAnnulment },
  { label: "Dissolution", href: "/dissolution", image: imgDissolution },
  { label: "Post-Decree Matters", href: "/post-decree-matters", image: imgPostDecree },
  { label: "Spousal Support", href: "/spousal-support", image: imgSpousalSupport },
  { label: "Contempt Proceedings", href: "/contempt-proceedings", image: imgContempt },
  { label: "Legal Separation", href: "/legal-separation", image: imgLegalSeparation },
  { label: "Business Interests", href: "/business-interests", image: imgBusinessInterests },
  { label: "Enforcement of Court Orders", href: "/enforcement-of-court-orders", image: imgEnforcement },
  { label: "Civil Protection Orders", href: "/contact", image: imgCivilProtection },
];

const WhoWeHelp = () => {
  const headerAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.05);

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container">
        <div
          ref={headerAnim.ref}
          className={`text-center max-w-2xl mx-auto mb-12 ${headerAnim.className}`}
        >
          <h2 className="heading-section mb-4">Legal Services</h2>
          <p className="text-body">
            Comprehensive family law representation across every area that matters to your family.
          </p>
        </div>

        <div
          ref={gridAnim.ref}
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 stagger-children ${gridAnim.isVisible ? "stagger-visible" : ""}`}
        >
          {services.map((service) => (
            <Link
              key={service.href + service.label}
              to={service.href}
              className="group relative h-44 md:h-52 rounded-lg overflow-hidden block"
            >
              <img
                src={service.image}
                alt={service.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span className="font-serif text-center text-white text-lg md:text-xl font-medium leading-tight drop-shadow-md">
                  {service.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
