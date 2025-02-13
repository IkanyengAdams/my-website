import React, { useState } from "react";

export default function Navbar({ navbarRef, infoRef, servicesRef, safetyRef, contactRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => scrollToSection(navbarRef)} style={{ cursor: "pointer" }}>
        <img src="/lociware_logo2.png" alt="Logo" className="logo-img" />
      </div>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      {/* Navigation links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a onClick={() => scrollToSection(navbarRef)}>Home</a></li>
        <li><a onClick={() => scrollToSection(infoRef)}>About Us</a></li> {/* Scrolls to Info */}
        <li><a onClick={() => scrollToSection(servicesRef)}>Services</a></li>
        <li><a onClick={() => scrollToSection(safetyRef)}>Safety</a></li>
        <li><a onClick={() => scrollToSection(contactRef)}>Contact Us</a></li>
        <li><a href="#">News</a></li>
      </ul>
    </nav>
  );
}
