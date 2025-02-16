import React, { useState } from "react";

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
      closeMenu(); // Close menu when clicking a link
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
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li><a onClick={() => scrollToSection(navbarRef)}>Home</a></li>
        <li><a onClick={() => scrollToSection(infoRef)}>About Us</a></li>
        <li><a onClick={() => scrollToSection(servicesRef)}>Services</a></li>
        <li><a onClick={() => scrollToSection(safetyRef)}>Safety</a></li>
        <li><a onClick={() => scrollToSection(contactRef)}>Contact Us</a></li>
        <li><a href="#">News</a></li>
      </ul>
    </nav>
  );
}
