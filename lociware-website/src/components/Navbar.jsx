import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ navbarRef, infoRef, servicesRef, safetyRef, contactRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    }
  };

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