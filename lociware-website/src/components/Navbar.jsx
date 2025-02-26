import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom'; // Import useLocation to detect the current route

export default function Navbar({ navbarRef, infoRef, servicesRef, safetyRef, contactRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location to handle navigation on all pages

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    } else {
      // If ref is null (e.g., on /privacy-policy), do nothing or navigate to homepage
      if (location.pathname === '/privacy-policy') {
        window.location.href = '/'; // Navigate to homepage if on privacy policy page
        closeMenu();
      }
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu(); // Close menu when navigating to a new route
  }, [location]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => scrollToSection(navbarRef)}>
        <img src="/lociware_logo2.png" alt="Logo" className="logo-img" />
      </div>
      <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.ul
            className="nav-links"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <li><a onClick={() => scrollToSection(navbarRef)}>Home</a></li>
            <li><a onClick={() => scrollToSection(infoRef)}>About Us</a></li>
            <li><a onClick={() => scrollToSection(servicesRef)}>Services</a></li>
            <li><a onClick={() => scrollToSection(safetyRef)}>Safety</a></li>
            <li><a onClick={() => scrollToSection(contactRef)}>Contact Us</a></li>
            <li><a href="#">News</a></li>
          </motion.ul>
        ) : (
          <ul className="nav-links desktop">
            <li><a onClick={() => scrollToSection(navbarRef)}>Home</a></li>
            <li><a onClick={() => scrollToSection(infoRef)}>About Us</a></li>
            <li><a onClick={() => scrollToSection(servicesRef)}>Services</a></li>
            <li><a onClick={() => scrollToSection(safetyRef)}>Safety</a></li>
            <li><a onClick={() => scrollToSection(contactRef)}>Contact Us</a></li>
            <li><a href="#">News</a></li>
          </ul>
        )}
      </AnimatePresence>
    </nav>
  );
}