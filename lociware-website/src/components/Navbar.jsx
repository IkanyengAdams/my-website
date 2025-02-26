import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom"; // Detect the current route

export default function Navbar({ navbarRef, infoRef, servicesRef, safetyRef, contactRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current route

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("Menu state:", !isMenuOpen); // Debugging output
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      console.log("Menu closed"); // Debugging
    }
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    } else {
      // If ref is null (e.g., on /privacy-policy), navigate to homepage
      if (location.pathname === "/privacy-policy") {
        window.location.href = "/";
        closeMenu();
      }
    }
  };

  // Close mobile menu when the route changes
  useEffect(() => {
    closeMenu();
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
        {isMenuOpen && (
          <motion.ul
            key="menu"
            className="nav-links"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <li><span onClick={() => scrollToSection(navbarRef)}>Home</span></li>
            <li><span onClick={() => scrollToSection(infoRef)}>About Us</span></li>
            <li><span onClick={() => scrollToSection(servicesRef)}>Services</span></li>
            <li><span onClick={() => scrollToSection(contactRef)}>Contact Us</span></li>
            <li><span onClick={() => scrollToSection(safetyRef)}>Safety</span></li>
            <li><a href="#">News</a></li>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <ul className="nav-links desktop">
        <li><span onClick={() => scrollToSection(navbarRef)}>Home</span></li>
        <li><span onClick={() => scrollToSection(infoRef)}>About Us</span></li>
        <li><span onClick={() => scrollToSection(servicesRef)}>Services</span></li>
        <li><span onClick={() => scrollToSection(contactRef)}>Contact Us</span></li>
        <li><span onClick={() => scrollToSection(safetyRef)}>Safety</span></li>
        <li><a href="#">News</a></li>
      </ul>
    </nav>
  );
}
