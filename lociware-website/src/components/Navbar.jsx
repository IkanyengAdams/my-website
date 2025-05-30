import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Navbar({ navbarRef, infoRef, servicesRef, safetyRef, contactRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    } else if (location.pathname === "/privacy-policy") {
      window.location.href = "/";
      closeMenu();
    }
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  // Use window width to determine menu type
  const getMenuClass = () => {
    const width = window.innerWidth;
    if (width >= 781 && width <= 1076) {
      return 'top';
    } else if (width < 781) {
      return 'mobile';
    }
    return 'desktop'; // Not used here but for clarity
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => scrollToSection(navbarRef)}>
        <img src="/lociware_logo.png" alt="Logo" className="logo-img" />
      </div>

      <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            key="menu"
            className={`nav-links ${getMenuClass()}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <li>
              <span onClick={() => scrollToSection(navbarRef)} className="nav-item">
                <i className="fas fa-home"></i> HOME
              </span>
            </li>
            <li>
              <span onClick={() => scrollToSection(infoRef)} className="nav-item">
                <i className="fas fa-info-circle"></i> ABOUT
              </span>
            </li>
            <li>
              <span onClick={() => scrollToSection(servicesRef)} className="nav-item">
                <i className="fas fa-briefcase"></i> SERVICES
              </span>
            </li>
            <li>
              <span onClick={() => scrollToSection(contactRef)} className="nav-item">
                <i className="fas fa-envelope"></i> CONTACT
              </span>
            </li>
            <li>
              <a
                href="https://www.instagram.com/lociware.shuttles/#"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                <i className="fas fa-shield-alt"></i> CSI
              </a>
            </li>
            <li>
              <a
                href="https://lociware.blogspot.com/2025/03/blog-post.html"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                <i className="fas fa-newspaper"></i> NEWS
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <ul className="nav-links desktop">
        <li>
          <motion.span 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            onClick={() => scrollToSection(navbarRef)}
            className="nav-item"
          >
            <i className="fas fa-home"></i> Home
          </motion.span>
        </li>
        <li>
          <motion.span 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            onClick={() => scrollToSection(infoRef)}
            className="nav-item"
          >
            <i className="fas fa-info-circle"></i> About Us
          </motion.span>
        </li>
        <li>
          <motion.span 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            onClick={() => scrollToSection(servicesRef)}
            className="nav-item"
          >
            <i className="fas fa-briefcase"></i> Services
          </motion.span>
        </li>
        <li>
          <motion.span 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            onClick={() => scrollToSection(contactRef)}
            className="nav-item"
          >
            <i className="fas fa-envelope"></i> Contact Us
          </motion.span>
        </li>
        <li>
          <motion.a 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            href="https://www.instagram.com/lociware.shuttles/#"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            <i className="fas fa-shield-alt"></i> CSI
          </motion.a>
        </li>
        <li>
          <motion.a 
            whileHover={{ scale: 1.1, color: '#4CAF50' }}
            href="https://lociware.blogspot.com/2025/03/blog-post.html"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            <i className="fas fa-newspaper"></i> News
          </motion.a>
        </li>
      </ul>
    </nav>
  );
}