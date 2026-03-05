import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import bgImage from "@/assets/hero-office.jpg";

const audiences = [
  {
    title: "Navigating Divorce",
    description:
      "Whether contested or uncontested, we provide clear guidance at every stage, protecting your interests while working toward an efficient resolution.",
  },
  {
    title: "Child Custody & Parenting Time",
    description:
      "Custody and parenting time decisions have lasting impact. We advocate strategically for arrangements that serve your children's best interests.",
  },
  {
    title: "Property & Asset Division",
    description:
      "From real estate and retirement accounts to business interests, we pursue a fair and equitable division of marital assets on your behalf.",
  },
  {
    title: "Post-Decree Matters",
    description:
      "Circumstances evolve after a decree is finalized. When court orders require modification or enforcement, we act promptly to protect your interests.",
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
              Trusted by Ohio Families
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
              Whatever your situation, you do not have to navigate it alone. From
              downtown Columbus to communities across Central Ohio, our firm has
              guided families through complex legal matters with care and
              professionalism.
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
