import { Phone, Calendar, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Borshchak Law Group" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>
          
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {/* Attorneys Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground hover:text-primary">
                    Attorneys
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border shadow-lg">
                    <ul className="w-48 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/about" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Our Team
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/about" 
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                          >
                            Dmitriy Borshchak
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
            <a href="tel:+13803240878" className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>Or call: <span className="font-semibold text-foreground">380-324-0878</span> (24/7)</span>
            </a>
            <a href="tel:+13803240878" className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary">
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
