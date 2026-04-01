import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const counties = [
  "Franklin",
  "Delaware",
  "Pickaway",
  "Licking",
  "Union",
  "Madison",
  "Fairfield",
];

const CourtInfoSection = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");

  return (
    <section className="section-padding bg-navy">
      <div className="container">
        <div ref={sectionAnim.ref} className={sectionAnim.className}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-green font-medium tracking-wide uppercase text-sm mb-2">
                Courts We Practice In
              </p>
              <h2
                className="heading-section"
                style={{ color: "hsl(var(--primary-foreground))" }}
              >
                Know Your Local Family Court
              </h2>
            </div>
            <Link
              to="/court-info"
              className="group inline-flex items-center gap-2 text-lg font-medium text-green hover:text-white transition-colors shrink-0"
            >
              Full court directory
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* County pills + CTA card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* County grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {counties.map((county) => (
                <div
                  key={county}
                  className={`rounded-lg py-4 px-4 text-center transition-transform hover:scale-105 ${
                    county === "Franklin"
                      ? "border-2 col-span-2 sm:col-span-1"
                      : "border border-white/15 bg-white/5"
                  }`}
                  style={
                    county === "Franklin"
                      ? {
                          borderColor: "hsl(var(--green-accent))",
                          backgroundColor: "hsla(var(--green-accent), 0.12)",
                        }
                      : undefined
                  }
                >
                  {county === "Franklin" && (
                    <MapPin
                      className="w-4 h-4 mx-auto mb-1"
                      style={{ color: "hsl(var(--green-accent))" }}
                    />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      county === "Franklin" ? "text-white" : "text-white/80"
                    }`}
                  >
                    {county} County
                  </span>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <Link
              to="/court-info"
              className="group rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-all p-6 flex flex-col justify-center"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Court Addresses, Phone Numbers &amp; Links
              </h3>
              <p className="text-white/65 text-sm mb-4">
                Find domestic relations court details for all 7 counties we
                serve — including forms, e-filing, and parenting time schedules.
              </p>
              <span className="inline-flex items-center gap-1.5 text-green font-medium text-base">
                View court directory
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourtInfoSection;
