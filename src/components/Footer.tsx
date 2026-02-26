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
            <p className="text-primary-foreground/70 text-base leading-relaxed mb-6">
              Dedicated family law attorneys serving Columbus and Central Ohio.
            </p>
            <div className="space-y-3">
              <a href="tel:+16146624043" className="flex items-center gap-3 text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                614-662-4043
              </a>
              <a href="mailto:info@borshchaklawgroup.com" className="flex items-center gap-3 text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@borshchaklawgroup.com
              </a>
              <div className="flex items-start gap-3 text-base text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>1650 Lake Shore Drive, Suite 380<br />Columbus, OH 43204</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-semibold text-base uppercase tracking-wider mb-4 text-primary-foreground/90">Practice Areas</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/divorce" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Divorce
                </Link>
              </li>
              <li>
                <Link to="/custody" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Child Custody & Parenting
                </Link>
              </li>
              <li>
                <Link to="/assets" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Property & Asset Division
                </Link>
              </li>
              <li>
                <Link to="/mediation" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Mediation & Alternative Resolution
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base uppercase tracking-wider mb-4 text-primary-foreground/90">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-base uppercase tracking-wider mb-4 text-primary-foreground/90">Get Started</h4>
            <p className="text-base text-primary-foreground/70 mb-4">
              Schedule your free, confidential consultation today.
            </p>
            <a href="tel:+16146624043" className="btn-cta text-base px-6 py-3 w-full md:w-auto inline-flex items-center gap-2">
              Call Us Now: 614-662-4043
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/40 leading-relaxed mb-6">
            The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship.
          </p>
          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Borshchak Law Group. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <span>Licensed to Practice Law in Ohio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
