
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateHome = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 glass shadow-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 
            className="text-2xl font-bold cursor-pointer" 
            onClick={navigateHome}
          >
            BrandHues
          </h1>
        </motion.div>

        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-6"
          >
            <a href="#" className="story-link">Home</a>
            <a href="#products" className="story-link">Products</a>
            <a href="#testimonials" className="story-link">Testimonials</a>
            <a href="#contact" className="story-link">Contact</a>
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <button className="mr-4 glass-button p-2 rounded-full">
            <ShoppingBag className="h-5 w-5" />
          </button>
          
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="glass-button p-2 rounded-full"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <nav className="glass py-4 px-4">
            <ul className="space-y-4">
              <li><a href="#" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#products" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Products</a></li>
              <li><a href="#testimonials" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
              <li><a href="#contact" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
