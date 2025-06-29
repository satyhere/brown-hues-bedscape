import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import CartSidebar from "@/components/CartSidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Handle navigation for non-home pages
  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      const sectionId = path.substring(1);
      scrollToSection(sectionId);
    } else {
      window.location.href = path;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-accent/10 rounded-md">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-sm text-left hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="#configurator" className="text-sm text-left hover:text-primary" onClick={() => handleNavigation('#configurator')}>
                    Size Configurator
                  </Link>
                  <Link to="#testimonials" className="text-sm text-left hover:text-primary" onClick={() => handleNavigation('#testimonials')}>
                    Testimonials
                  </Link>
                  <Link to="#contact" className="text-sm text-left hover:text-primary" onClick={() => handleNavigation('#contact')}>
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Centered on mobile */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-primary" style={{letterSpacing: '-0.02em'}}>BrownHues.in</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-primary/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="#configurator" className="text-sm text-primary/80 hover:text-primary transition-colors" onClick={(e) => {
              e.preventDefault();
              handleNavigation('#configurator');
            }}>
              Size Configurator
            </Link>
            <Link to="#testimonials" className="text-sm text-primary/80 hover:text-primary transition-colors" onClick={(e) => {
              e.preventDefault();
              handleNavigation('#testimonials');
            }}>
              Testimonials
            </Link>
            <Link to="#contact" className="text-sm text-primary/80 hover:text-primary transition-colors" onClick={(e) => {
              e.preventDefault();
              handleNavigation('#contact');
            }}>
              Contact
            </Link>
          </nav>
          
          {/* Cart - Show on both mobile and desktop */}
          <div className="flex items-center gap-2">
            <CartSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
