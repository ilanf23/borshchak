import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-office.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-background to-secondary/50 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24 lg:py-28">
          {/* Content */}
          <div className="max-w-xl">
            <h1 className="heading-hero mb-6">
              Award-Winning Family Law Attorneys in Columbus, Ohio
            </h1>
            <p className="text-body text-lg mb-8">
              Compassionate, strategic legal guidance for divorce, custody, and complex family law matters.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link to="/contact" className="btn-cta">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Consultation
              </Link>
            </div>
            
            {/* Secondary */}
            <a href="tel:+13803240878" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>Or call: <span className="font-medium text-foreground">380-324-0878</span> (24/7)</span>
            </a>
          </div>
          
          {/* Video */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/GbBf903XVh4?autoplay=1&mute=1&loop=1&playlist=GbBf903XVh4&controls=0&showinfo=0&rel=0&modestbranding=1"
                title="Borshchak Law Group"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-navy/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
