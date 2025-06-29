import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import CartSidebar from "@/components/CartSidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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
                  <button onClick={() => scrollToSection('hero')} className="text-sm text-left">
                    Home
                  </button>
                  <button onClick={() => scrollToSection('configurator')} className="text-sm text-left">
                    Size Configurator
                  </button>
                  <button onClick={() => scrollToSection('testimonials')} className="text-sm text-left">
                    Testimonials
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-sm text-left">
                    Contact
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Centered on mobile */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-primary" style={{letterSpacing: '-0.02em'}}>BrownHues.in</span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-sm text-primary/80">
              Home
            </button>
            <button onClick={() => scrollToSection('configurator')} className="text-sm text-primary/80">
              Size Configurator
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm text-primary/80">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-primary/80">
              Contact
            </button>
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
