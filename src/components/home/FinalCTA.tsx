import { Phone } from "lucide-react";
import happyFamilyCta from "@/assets/happy-family-cta.png";

const FinalCTA = () => {
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

      <div className="container max-w-2xl text-center relative z-10">
        <h2 className="heading-section mb-4 text-white drop-shadow-lg">
          You Don't Have to Go Through This Alone
        </h2>
        <p className="text-lg text-white/90 mb-8 drop-shadow">
          Family law is one of the most personal and stressful areas of law. We walk with you through every stage, protect your interests, and help you make clear decisions during a difficult time.
        </p>
        
        <a href="tel:+16146624043" className="btn-cta text-xl px-10 py-4">
          <Phone className="w-5 h-5 mr-2" />
          Call Us Now: 614-662-4043
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
