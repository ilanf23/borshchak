import { UserCheck, MessageCircle, Target, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import whyAttorneyAccess from "@/assets/why-attorney-access.jpg";
import whyCommunication from "@/assets/why-communication.jpg";
import whyStrategicPlanning from "@/assets/why-strategic-planning.jpg";
import whyGuidance from "@/assets/why-guidance.jpg";

const differentiators = [
  {
    icon: UserCheck,
    ordinal: "01",
    title: "Your Attorney Knows Your Name",
    description:
      "At larger firms, your case becomes a file number. Here, you work directly with one of three dedicated attorneys who knows every detail of your situation \u2014 from the first call to the final order.",
    tagline: "3 dedicated attorneys, zero hand-offs",
    image: whyAttorneyAccess,
  },
  {
    icon: MessageCircle,
    ordinal: "02",
    title: "We Answer Before the Worry Sets In",
    description:
      "Waiting days for a callback while your future hangs in the balance is unacceptable. Every call and email is returned within hours, not days. You will never be left wondering what is happening with your case.",
    tagline: "Every message returned within 24 hours",
    image: whyCommunication,
  },
  {
    icon: Target,
    ordinal: "03",
    title: "Strategy First, Surprises Never",
    description:
      "Before a single document is filed, we map out your entire case strategy together. You will understand the timeline, the possible outcomes, and exactly what we recommend at each decision point. Over 500 families have trusted this approach.",
    tagline: "500+ cases planned before filing day one",
    image: whyStrategicPlanning,
  },
  {
    icon: Heart,
    ordinal: "04",
    title: "Steady Hands in an Unsteady Time",
    description:
      "Family law is deeply personal. We provide frank, honest counsel while treating you with the patience and respect this moment demands. Our clients consistently describe the experience as one of clarity and relief.",
    tagline: "Rated 4.8 stars across 147+ Google reviews",
    image: whyGuidance,
  },
];

function Strip({
  item,
  index,
}: {
  item: (typeof differentiators)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const imageDirection = isEven ? "left" : "right";
  const imageAnim = useScrollAnimation(0.15, imageDirection);
  const textAnim = useScrollAnimation(0.15, "up");

  return (
    <div className="relative">
      <div
        className={cn(
          "flex flex-col md:flex-row items-center gap-8 md:gap-14 lg:gap-20",
          !isEven && "md:flex-row-reverse"
        )}
      >
        {/* Oversized ordinal — decorative, desktop only */}
        <span
          className={cn(
            "hidden md:block absolute top-1/2 -translate-y-1/2 text-[10rem] lg:text-[13rem] font-bold leading-none select-none pointer-events-none transition-opacity duration-1000",
            "text-transparent [-webkit-text-stroke:1.5px_hsl(var(--accent)/0.18)]",
            isEven ? "-left-6 lg:-left-10" : "-right-6 lg:-right-10",
            imageAnim.isVisible ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          {item.ordinal}
        </span>

        {/* Photo — slides in from its side */}
        <div
          ref={imageAnim.ref}
          className={cn(
            "w-full md:w-[42%] flex-shrink-0",
            imageAnim.className
          )}
        >
          <div className="relative rounded-xl overflow-hidden border-2 border-accent/30">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>

        {/* Text block — fades up with staggered children */}
        <div
          ref={textAnim.ref}
          className="flex-1 min-w-0"
        >
          {/* Ordinal + line */}
          <div
            className={cn(
              "flex items-center gap-4 mb-5 transition-all duration-700 ease-out",
              textAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="text-accent font-semibold text-lg tracking-wider">
              {item.ordinal}
            </span>
            <div
              className={cn(
                "h-px flex-1 bg-accent/30 origin-left transition-transform duration-700 ease-out",
                textAnim.isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{ transitionDelay: "400ms" }}
            />
          </div>

          <h3
            className={cn(
              "font-['Playfair_Display'] text-2xl md:text-3xl text-navy font-semibold mb-4 leading-snug transition-all duration-700 ease-out",
              textAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "350ms" }}
          >
            {item.title}
          </h3>

          <p
            className={cn(
              "font-['Lora'] text-lg md:text-xl text-navy/70 leading-relaxed mb-6 transition-all duration-700 ease-out",
              textAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            {item.description}
          </p>

          {/* Icon + tagline */}
          <div
            className={cn(
              "flex items-center gap-3 text-accent transition-all duration-700 ease-out",
              textAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "650ms" }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm md:text-base font-medium tracking-wide">
              {item.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* Separator line between strips (not after last) */}
      {index < differentiators.length - 1 && (
        <div className="mt-12 md:mt-16 mx-auto w-2/3 h-px bg-accent/15" />
      )}
    </div>
  );
}

const WhyChooseUs = () => {
  const headerAnim = useScrollAnimation();

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(40 30% 96%) 0%, hsl(140 15% 92%) 50%, hsl(40 30% 96%) 100%)",
      }}
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent/20" />
      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20" />

      <div className="container relative z-10">
        {/* Left-aligned header */}
        <div
          ref={headerAnim.ref}
          className={cn("mb-16 md:mb-20 max-w-2xl", headerAnim.className)}
        >
          <span className="uppercase text-accent text-sm font-semibold tracking-[0.15em] mb-3 block">
            The Borshchak Difference
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-navy font-bold leading-tight">
            Four Commitments We Make to Every Client
          </h2>
        </div>

        {/* Strips */}
        <div className="flex flex-col gap-12 md:gap-16">
          {differentiators.map((item, index) => (
            <Strip key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
