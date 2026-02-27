import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import bgImage from "@/assets/hero-office.jpg";

const audiences = [
  {
    title: "Going Through Divorce",
    description:
      "Whether contested or uncontested, we guide you through every step with clarity while protecting your rights without prolonging the pain.",
  },
  {
    title: "Fighting for Your Children",
    description:
      "Custody and parenting time shape your child's future. We advocate decisively for arrangements that put your family first.",
  },
  {
    title: "Protecting What You've Built",
    description:
      "From the family home to retirement accounts and business interests, we fight for equitable division of everything you've worked for.",
  },
  {
    title: "Moving Forward Post-Decree",
    description:
      "Life changes after divorce. When orders need modification or enforcement, we move quickly to protect your new stability.",
  },
];

const DecorativeDots = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const w = size === "lg" ? "w-7 h-2" : "w-5 h-1.5";
  return (
    <div className="flex justify-center gap-1.5" aria-hidden="true">
      <span
        className={`block ${w} rounded-sm`}
        style={{ backgroundColor: "hsl(var(--green-accent-light))" }}
      />
      <span
        className={`block ${w} rounded-sm`}
        style={{ backgroundColor: "hsl(var(--green-accent))" }}
      />
      <span
        className={`block ${w} rounded-sm`}
        style={{ backgroundColor: "hsl(var(--green-accent-hover))" }}
      />
    </div>
  );
};

const WhoWeHelp = () => {
  const headerAnim = useScrollAnimation(0.1);
  const gridAnim = useScrollAnimation(0.05);

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Deep navy overlay, warm tinted, not pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, hsla(215,50%,10%,0.94) 0%, hsla(215,42%,16%,0.90) 100%)",
        }}
      />

      <div className="relative z-10 py-16 md:py-24">
        <div className="container">
          {/* ── Header ── */}
          <div
            ref={headerAnim.ref}
            className={`text-center max-w-3xl mx-auto mb-14 ${headerAnim.className}`}
          >
            <DecorativeDots size="lg" />

            <h2
              className="mt-6 mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wide uppercase"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "hsl(40 30% 98%)",
                letterSpacing: "0.06em",
              }}
            >
              Trusted by Colorado Families
            </h2>

            {/* Thin accent rule */}
            <div
              className="mx-auto mb-5 h-px w-16"
              style={{ backgroundColor: "hsl(var(--green-accent-light))" }}
            />

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "hsla(40, 30%, 98%, 0.72)" }}
            >
              Whatever brings you here, you don't have to face it alone. We've
              helped hundreds of Colorado families through situations just like
              yours.
            </p>
          </div>

          {/* ── 4-column pillars ── */}
          <div
            ref={gridAnim.ref}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 ${
              gridAnim.isVisible ? "stagger-visible" : "stagger-children"
            }`}
          >
            {audiences.map((item) => (
              <div key={item.title} className="text-center px-2">
                <DecorativeDots size="sm" />

                <h3
                  className="mt-4 mb-3 text-sm md:text-base font-bold uppercase tracking-widest"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "hsl(40 30% 98%)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {item.title}
                </h3>

                {/* Short accent rule under title */}
                <div
                  className="mx-auto mb-3 h-px w-8"
                  style={{ backgroundColor: "hsl(var(--green-accent-light) / 0.5)" }}
                />

                <p
                  className="text-base leading-relaxed"
                  style={{ color: "hsla(40, 30%, 98%, 0.68)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
