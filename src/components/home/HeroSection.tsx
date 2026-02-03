import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-office.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-background to-secondary/50 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24 lg:py-32">
          {/* Content */}
          <div className="max-w-xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Columbus Family Law Attorneys
            </p>
            <h1 className="heading-hero mb-6">
              Protecting Your Family's Future with Clarity and Care
            </h1>
            <p className="text-body text-lg mb-8">
              Navigating divorce or custody is overwhelming. You need an attorney who understands both the legal complexities and the emotional weight of what you're facing. We provide strategic counsel with personal attention—every step of the way.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/contact" className="btn-cta">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Link>
              <a href="tel:+16145551234" className="btn-secondary">
                <Phone className="w-5 h-5 mr-2" />
                (614) 555-1234
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3">
              <span className="trust-badge">25+ Years Experience</span>
              <span className="trust-badge">500+ Families Helped</span>
              <span className="trust-badge">Franklin County Courts</span>
            </div>
          </div>
          
          {/* Office Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Morrison Family Law office in Columbus, Ohio" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating testimonial */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm text-muted-foreground italic mb-3">
                "They helped me through the hardest time of my life with professionalism and genuine care."
              </p>
              <p className="text-xs font-medium text-foreground">— Sarah M., Columbus</p>
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
