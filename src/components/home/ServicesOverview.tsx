import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Feather, HandHeart, HandCoins, Landmark, Scroll, Flame, Leaf, HeartHandshake, Sprout, Gem, ShieldBan, Compass, Wheat, Anchor, Mountain, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    title: "Divorce",
    description: "Borshchak Law provides individualized, vigorous representation to protect you, your family, and your assets throughout the divorce process. Your future is our priority.",
    href: "/divorce",
    icon: Feather,
  },
  {
    title: "Child Custody",
    description: "Child custody is among the most stressful areas of family law. Our attorneys guide you through the legal process to protect your rights and your child's well-being.",
    href: "/custody",
    icon: HandHeart,
  },
  {
    title: "Child Support",
    description: "Child support is an ongoing obligation made for the benefit of a child following separation. We work to ensure the interests of you and your child are protected.",
    href: "/child-support",
    icon: HandCoins,
  },
  {
    title: "Property & Assets",
    description: "We pursue a fair and equitable division of marital assets with our client's objectives at the forefront. Our firm works closely with forensic examiners, accountants, CPAs, business valuators, real estate agents, appraisers, and other professionals to ensure our strategy is supported by data and built around your goals.",
    href: "/assets",
    icon: Landmark,
  },
  {
    title: "Prenuptial Agreement",
    description: "A prenuptial agreement protects both parties' interests before marriage. Our team drafts clear, enforceable agreements that provide peace of mind for your future.",
    href: "/prenuptial-agreement",
    icon: Scroll,
  },
  {
    title: "Annulment",
    description: "Annulment treats a marriage as though it never existed. We help you determine eligibility and navigate the specific legal requirements of this process.",
    href: "/annulment",
    icon: Flame,
  },
  {
    title: "Dissolution",
    description: "When both parties agree, dissolution offers a faster, less adversarial path to ending a marriage. We streamline the process to minimize stress and expense.",
    href: "/dissolution",
    icon: Leaf,
  },
  {
    title: "Mediation",
    description: "Mediation allows families to resolve disputes outside the courtroom. Our experienced mediators help you reach agreements that work for everyone involved.",
    href: "/mediation",
    icon: HeartHandshake,
  },
  {
    title: "Post-Decree Matters",
    description: "Life changes after a decree is finalized. Our team helps you modify custody, support, shared parenting plans, and other orders to reflect your current circumstances.",
    href: "/post-decree-matters",
    icon: Sprout,
  },
  {
    title: "Spousal Support",
    description: "Spousal support determinations consider each party's contributions and needs. We advocate for outcomes that fairly reflect your role in the marriage.",
    href: "/spousal-support",
    icon: Gem,
  },
  {
    title: "Contempt Proceedings",
    description: "When a court order is violated, contempt proceedings hold the other party accountable. We pursue enforcement to ensure compliance with existing orders.",
    href: "/contempt-proceedings",
    icon: ShieldBan,
  },
  {
    title: "Legal Separation",
    description: "Legal separation establishes boundaries for finances, custody, and property without ending the marriage. We help you understand if this option fits your situation.",
    href: "/legal-separation",
    icon: Compass,
  },
  {
    title: "Business Interests",
    description: "Dividing business interests in a family law matter requires expert valuation and strategy. We work to preserve and protect your commercial assets.",
    href: "/business-interests",
    icon: Wheat,
  },
  {
    title: "Court Order Enforcement",
    description: "When the other party fails to follow court orders, swift legal action is needed. We pursue enforcement to protect your rights and your family's stability.",
    href: "/enforcement-of-court-orders",
    icon: Anchor,
  },
  {
    title: "Civil Protection Orders",
    description: "Whether you need to obtain or defend against a protection order, our attorneys provide skilled representation to safeguard your safety and your rights.",
    href: "/civil-protection-orders",
    icon: Mountain,
  },
  {
    title: "Father's Rights",
    description: "Fathers deserve equal consideration in custody and support matters. We advocate vigorously to protect your parental rights and your relationship with your children.",
    href: "/fathers-rights",
    icon: Crown,
  },
];

const ServicesOverview = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");
  const isHovered = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Auto-play with pause on hover
    const interval = setInterval(() => {
      if (!isHovered.current) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div
        ref={sectionAnim.ref}
        className={`container ${sectionAnim.className}`}
      >
        <div className="text-center mb-12">
          <h2 className="heading-section text-foreground mb-3">Our Practice Areas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive legal support for Columbus, Ohio families at every stage of life
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4"
                  >
                    <div className="bg-white rounded-xl border border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 min-h-[480px] flex flex-col items-center text-center">
                      {/* Icon circle */}
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                        style={{ backgroundColor: "hsl(var(--green-accent) / 0.15)" }}
                      >
                        <Icon className="w-9 h-9" style={{ color: "hsl(var(--green-accent))" }} />
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-trust-navy mb-4">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                        {service.description}
                      </p>

                      {/* Learn More button */}
                      <Link
                        to={service.href}
                        className="inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 mt-auto"
                        style={{ backgroundColor: "hsl(var(--green-accent))" }}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
            aria-label="Previous services"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
            aria-label="Next services"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesOverview;
