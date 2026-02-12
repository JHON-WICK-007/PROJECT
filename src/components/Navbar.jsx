import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Handle scroll effect — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down & past threshold — hide navbar
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        // Scrolling up — show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Table", path: "/book-table" },
    { name: "Menu", path: "/menu" },
    { name: "Cart", path: "/cart" },
    { name: "Order Status", path: "/order-status" },
    { name: "Profile", path: "/profile" },
    { name: "Payment", path: "/payment" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled
        ? "bg-black/95 shadow-2xl shadow-black/50"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Underline */}
          <Link to="/" className="flex items-center space-x-3 group logo-container">
            <div className="logo-circle w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/50 transition-all duration-500">
              <span className="logo-text text-2xl font-bold text-black transition-transform duration-500">R</span>
            </div>
            <div className="relative">
              <span className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                Restaurant
              </span>
              {/* Yellow underline */}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 font-medium transition-all duration-300 nav-link ${isActive(link.path)
                  ? "text-yellow-500"
                  : "text-gray-300 hover:text-white"
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2.5 text-white font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-yellow-500 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/98 border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-3">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-5 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(link.path)
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-white/10 my-4"></div>

              {/* Auth Buttons - Mobile */}
              <Link
                to="/login"
                className="block px-5 py-3 text-center text-white font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-5 py-3 text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg shadow-lg shadow-yellow-500/30"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;