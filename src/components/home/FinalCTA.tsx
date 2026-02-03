import { Calendar, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container max-w-3xl text-center">
        <h2 className="heading-section mb-4">
          You Don't Have to Navigate This Alone
        </h2>
        <p className="text-body text-lg mb-8">
          The hardest part is often making that first call. Schedule a free, confidential consultation to discuss your situation with an experienced family law attorney. No obligation, no pressure—just honest guidance about your options.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link to="/contact" className="btn-cta text-lg px-10 py-4">
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </Link>
          <a href="tel:+16145551234" className="btn-secondary text-lg px-8 py-4">
            <Phone className="w-5 h-5 mr-2" />
            (614) 555-1234
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>All consultations are confidential and protected by attorney-client privilege</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
