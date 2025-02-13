import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Branding & Description */}
        <div className="footer-section">
          <h2>Shuttle Hire & Transfers</h2>
          <p>Reliable, safe, and affordable transportation services across South Africa.</p>
        </div>

        {/* Right Section - Contact & Social Media */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@lociware.co.za</p>
          <p>Phone: +(27) 10 213 0024</p>
          
          <div className="footer-socials">
            <a href="https://www.facebook.com/lociware" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://x.com/lociware" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/lociware.shuttles/#" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/lociware-shuttles/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.tiktok.com/@lociware.shuttles" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Shuttle Hire & Transfers. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
