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
              alt="Map of the 7 Central Ohio counties served by Borshchak Law Group"
              className="w-full max-w-md mx-auto"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-green font-medium tracking-wide uppercase text-sm mb-2">
              Serving Central Ohio
            </p>
            <h2 className="heading-section mb-4">
              Proudly Serving Families Across 7 Ohio Counties
            </h2>
            <div className="space-y-4 text-body text-lg">
              <p>
                Borshchak Law Group represents families throughout Central Ohio,
                including Franklin, Delaware, Pickaway, Licking, Union, Madison,
                and Fairfield counties. Whether you are in Columbus or the
                surrounding communities, our team is ready to help.
              </p>
              <p>
                We understand that family law matters affect every part of your
                life. No matter which county your case is filed in, you deserve
                an attorney who knows the local courts and is prepared to fight
                for your interests.
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
