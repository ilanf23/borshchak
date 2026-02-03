import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-end gap-6 py-2 text-sm text-muted-foreground border-b border-border/50">
          <a href="tel:+16145551234" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            (614) 555-1234
          </a>
          <span>Columbus, Ohio</span>
        </div>
        
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold text-primary">Morrison Family Law</span>
              <span className="text-xs text-muted-foreground tracking-wide">Columbus, Ohio</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/divorce" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Divorce
            </Link>
            <Link to="/custody" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Custody
            </Link>
            <Link to="/assets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Property Division
            </Link>
            <Link to="/mediation" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Mediation
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/process" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Our Process
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+16145551234" className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary">
              <Phone className="w-5 h-5" />
            </a>
            <Link to="/contact" className="btn-cta text-sm px-5 py-2.5">
              <Calendar className="w-4 h-4 mr-2" />
              Free Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
