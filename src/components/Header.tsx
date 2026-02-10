import { Phone, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useConsultation } from "@/contexts/ConsultationContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Flyout link with animated dropdown
const FlyoutLink = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <button className="relative inline-flex h-12 items-center justify-center px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors">
        {children}
        {content && <ChevronDown className="ml-1 w-3.5 h-3.5" />}
        <span
          style={{
            transform: open ? "scaleX(1)" : "scaleX(0)",
            backgroundColor: "hsl(var(--green-accent))",
          }}
          className="absolute -bottom-1 left-4 right-4 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out"
        />
      </button>
      <AnimatePresence>
        {open && content && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-[52px] z-50"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div
              className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t"
              style={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <div
              className="overflow-hidden rounded-lg border shadow-lg"
              style={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AttorneysFlyout = () => (
  <div className="w-56 p-2">
    <Link to="/attorneys/dmitriy-borshchak" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Dmitriy Borshchak
    </Link>
    <Link to="/attorneys/hank-sonderman" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Hank Sonderman
    </Link>
    <Link to="/attorneys/keri-reeves" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Keri Reeves
    </Link>
  </div>
);

const LegalServicesFlyout = () => (
  <div className="w-56 p-2">
    <Link to="/divorce" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Divorce & Legal Separation
    </Link>
    <Link to="/custody" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Child Custody
    </Link>
    <Link to="/assets" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Property Division
    </Link>
    <Link to="/mediation" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Mediation
    </Link>
  </div>
);

const ContactFlyout = () => (
  <div className="w-48 p-2">
    <Link to="/contact" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Contact Us
    </Link>
    <Link to="/process" className="block px-4 py-2.5 text-base text-foreground hover:bg-secondary rounded-md transition-colors">
      Our Process
    </Link>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openConsultation } = useConsultation();
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-5">
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={logo} 
              alt="Borshchak Law Group" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden lg:flex items-center gap-0">
            <FlyoutLink content={<AttorneysFlyout />}>Attorneys</FlyoutLink>
            <FlyoutLink content={<LegalServicesFlyout />}>Legal Services</FlyoutLink>
            <Link 
              to="/resources" 
              className="inline-flex h-12 items-center justify-center px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link 
              to="/resources" 
              className="inline-flex h-12 items-center justify-center px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <FlyoutLink content={<ContactFlyout />}>Contact</FlyoutLink>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+13803240878" className="hidden sm:flex btn-cta text-base px-6 py-3 whitespace-nowrap">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </a>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors">
                  <Menu className="w-7 h-7" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>
                    <img src={logo} alt="Borshchak Law Group" className="h-10 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  {/* Attorneys */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-2 text-left font-medium hover:bg-secondary rounded-md transition-colors">
                      Attorneys
                      <ChevronDown className="w-4 h-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      <Link to="/attorneys/dmitriy-borshchak" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Dmitriy Borshchak
                      </Link>
                      <Link to="/attorneys/hank-sonderman" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Hank Sonderman
                      </Link>
                      <Link to="/attorneys/keri-reeves" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Keri Reeves
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Legal Services */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-2 text-left font-medium hover:bg-secondary rounded-md transition-colors">
                      Legal Services
                      <ChevronDown className="w-4 h-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      <Link to="/divorce" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Divorce & Legal Separation
                      </Link>
                      <Link to="/custody" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Child Custody
                      </Link>
                      <Link to="/assets" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Property Division
                      </Link>
                      <Link to="/mediation" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Mediation
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Simple Links */}
                  <Link to="/resources" onClick={() => setIsOpen(false)} className="py-3 px-2 font-medium hover:bg-secondary rounded-md transition-colors">
                    Testimonials
                  </Link>
                  <Link to="/resources" onClick={() => setIsOpen(false)} className="py-3 px-2 font-medium hover:bg-secondary rounded-md transition-colors">
                    Blog
                  </Link>

                  {/* Contact */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-2 text-left font-medium hover:bg-secondary rounded-md transition-colors">
                      Contact
                      <ChevronDown className="w-4 h-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Contact Us
                      </Link>
                      <Link to="/process" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Our Process
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <a href="tel:+13803240878" className="btn-cta w-full justify-center text-sm px-5 py-3">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us Now: 380-324-0878
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
