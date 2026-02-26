import { Phone } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import happyFamilyCta from "@/assets/happy-family-cta.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import AnimatedCTA from "@/components/AnimatedCTA";

const FinalCTA = () => {
  const contentAnim = useScrollAnimation(0.2);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={happyFamilyCta}
          alt="Happy family together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div
        ref={contentAnim.ref}
        className={`container max-w-2xl text-center relative z-10 ${contentAnim.className}`}
      >
        <h2 className="heading-section mb-4 text-white drop-shadow-lg">
          You Don't Have to Go Through This Alone
        </h2>
        <p className="text-lg text-white/90 mb-8 drop-shadow">
          Family law is one of the most personal and stressful areas of law. We walk with you through every stage, protect your interests, and help you make clear decisions during a difficult time.
        </p>

        <div ref={ctaRef} className="flex justify-center">
          {ctaInView ? (
            <AnimatedCTA delay={0.3}>
              <a href="tel:+16146624043" className="btn-cta text-xl px-12 py-5">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </AnimatedCTA>
          ) : (
            <div className="opacity-0">
              <a href="tel:+16146624043" className="btn-cta text-xl px-12 py-5">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 614-662-4043
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
