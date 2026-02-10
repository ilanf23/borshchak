import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src={logo} 
              alt="Borshchak Law Group" 
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Award-winning family law advocates serving Columbus and Central Ohio.
            </p>
            <div className="space-y-3">
              <a href="tel:+13803240878" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                380-324-0878
              </a>
              <a href="mailto:info@borshchaklawgroup.com" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@borshchaklawgroup.com
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>250 Civic Center Dr, Suite 400<br />Columbus, OH 43215</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">Practice Areas</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/divorce" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Divorce
                </Link>
              </li>
              <li>
                <Link to="/custody" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Child Custody & Parenting
                </Link>
              </li>
              <li>
                <Link to="/assets" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Property & Asset Division
                </Link>
              </li>
              <li>
                <Link to="/mediation" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Mediation & Alternative Resolution
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">Get Started</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Schedule your free, confidential consultation today.
            </p>
            <a href="tel:+13803240878" className="btn-cta text-sm px-6 py-3 w-full md:w-auto inline-flex items-center gap-2">
              Call Us Now: 380-324-0878
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Borshchak Law Group. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <span>Ohio State Bar Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
