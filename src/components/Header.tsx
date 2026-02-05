import { Phone, Calendar, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useConsultation } from "@/contexts/ConsultationContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openConsultation } = useConsultation();
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={logo} 
              alt="Borshchak Law Group" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {/* Attorneys Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground hover:text-primary">
                    Attorneys
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border shadow-lg">
                    <ul className="w-56 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/attorneys/dmitriy-borshchak" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Dmitriy Borshchak
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/about" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Hank Sonderman
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/about" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Keri Reeves
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Legal Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground hover:text-primary">
                    Legal Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border shadow-lg">
                    <ul className="w-56 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/divorce" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Divorce & Legal Separation
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/custody" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Child Custody
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/assets" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Property Division
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/mediation" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Mediation
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Testimonials */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/resources" 
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Testimonials
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/resources" 
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground hover:text-primary">
                    Contact
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border shadow-lg">
                    <ul className="w-48 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/contact" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Contact Us
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/process" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Our Process
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+13803240878" className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary">
              <Phone className="w-5 h-5" />
            </a>
            <button onClick={openConsultation} className="hidden sm:flex btn-cta text-sm px-5 py-2.5 whitespace-nowrap">
              <Calendar className="w-4 h-4 mr-2" />
              Free Consultation
            </button>
            <a href="tel:+13803240878" className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              <Phone className="w-4 h-4" />
              <span>Or call: <span className="font-semibold text-foreground">380-324-0878</span></span>
            </a>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors">
                  <Menu className="w-6 h-6" />
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
                      <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
                        Hank Sonderman
                      </Link>
                      <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-2 text-muted-foreground hover:text-foreground transition-colors">
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
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        openConsultation();
                      }}
                      className="btn-cta w-full justify-center text-sm px-5 py-3"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Free Consultation
                    </button>
                    <a href="tel:+13803240878" className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>380-324-0878</span>
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
