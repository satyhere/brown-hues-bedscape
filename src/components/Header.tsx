import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Dynamic scroll effect
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const headerBg = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.95)"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navigateHome = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      style={{ 
        backdropFilter: scrolled ? "blur(12px)" : "blur(0)",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        boxShadow: scrolled ? "0 8px 24px 0 rgba(180,150,125,0.06)" : "none"
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span 
            onClick={navigateHome}
            className="text-5xl font-bold cursor-pointer select-none tracking-tight text-primary"
            style={{ fontFamily: 'inherit' }}
          >
            brownhues<span className="text-accent">.co</span>
          </span>
        </motion.div>
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-7 text-lg"
          >
            <a href="#" className="story-link font-semibold">Home</a>
            <a href="#configurator" className="story-link font-semibold">Configurator</a>
            <a href="#testimonials" className="story-link font-semibold">Testimonials</a>
            <a href="#contact" className="story-link font-semibold">Contact</a>
          </motion.nav>
        )}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <motion.button
            whileHover={{ scale: 1.09 }}
            className="mr-3 glass-button p-2 rounded-full shadow"
          >
            <ShoppingBag className="h-6 w-6 text-primary" />
          </motion.button>
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="glass-button p-2 rounded-full"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </motion.div>
      </div>
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
            <ul className="space-y-4 text-lg">
              <li><a href="#" className="block py-2 font-semibold" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#configurator" className="block py-2 font-semibold" onClick={() => setMobileMenuOpen(false)}>Configurator</a></li>
              <li><a href="#testimonials" className="block py-2 font-semibold" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
              <li><a href="#contact" className="block py-2 font-semibold" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};
export default Header;
