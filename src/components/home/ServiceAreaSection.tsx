import { Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import countyMap from "@/assets/county-map.jpg";

const ServiceAreaSection = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div
          ref={sectionAnim.ref}
          className={`grid md:grid-cols-2 gap-10 items-center ${sectionAnim.className}`}
        >
          {/* Map */}
          <div>
            <img
              src={countyMap}
              alt="Map of Central Ohio counties frequently served by Borshchak Law Group"
              className="w-full max-w-md mx-auto"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-green font-medium tracking-wide uppercase text-sm mb-2">
              Serving All of Ohio
            </p>
            <h2 className="heading-section mb-4">
              Proudly Serving Families Across All 88 Ohio Counties
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                Borshchak Law Group is licensed to practice in all 88 counties
                in Ohio. Based in Central Ohio, we frequently represent families
                in Franklin, Delaware, Pickaway, Licking, Union, Madison,
                and Fairfield counties - but no matter where your case is filed,
                our team is ready to help.
              </p>
              <p>
                We understand that family law matters affect every part of your
                life. Wherever you are in Ohio, you deserve an attorney who knows
                the courts and is prepared to fight for your interests.
              </p>
            </div>
            <a
              href="tel:+16143346851"
              className="inline-flex items-center gap-2 mt-6 font-semibold text-lg transition-opacity hover:opacity-80"
              style={{ color: "hsl(var(--green-accent))" }}
            >
              <Phone className="w-5 h-5" />
              Free Consultation: 614-334-6851
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
