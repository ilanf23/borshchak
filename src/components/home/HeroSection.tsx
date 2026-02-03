import { Calendar, Phone } from "lucide-react";
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center py-20 md:py-28 lg:py-36">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-medium tracking-tight text-white mb-6 drop-shadow-lg">
            Award-Winning Family Law Attorneys in Columbus, Ohio
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-white/95 mb-10 drop-shadow-md">
            Compassionate, strategic legal guidance for divorce, custody, and complex family law matters.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button onClick={openConsultation} className="btn-cta">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Free Consultation
            </button>
          </div>
          
          {/* Secondary */}
          <a href="tel:+13803240878" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            <span>Or call: <span className="font-medium text-white">380-324-0878</span></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
