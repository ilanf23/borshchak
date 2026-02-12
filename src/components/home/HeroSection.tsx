import { Phone } from "lucide-react";
import { useConsultation } from "@/contexts/ConsultationContext";

const HeroSection = () => {
  const { openConsultation } = useConsultation();

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.youtube.com/embed/GbBf903XVh4?autoplay=1&mute=1&loop=1&playlist=GbBf903XVh4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[150%] md:h-[150%] pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center py-20 md:py-28 lg:py-36">
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-medium tracking-tight text-white mb-6 drop-shadow-lg opacity-0 animate-slide-up">
            Award-Winning Family Law Attorneys in Columbus, Ohio
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/95 mb-10 drop-shadow-md opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            Compassionate, strategic legal guidance for divorce, custody, and complex family law matters.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <a href="tel:+16146624043" className="btn-cta">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 614-662-4043
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
