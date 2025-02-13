import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaClock, FaShieldAlt, FaCar, FaGlobe, FaHandshake } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us-container">
        
        {/* Left Image with Fade-in Animation */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="/loci2.png" alt="About Us" />
        </motion.div>

        {/* Right Content */}
        <div className="about-content">
          <h2>NEED A SAFE TRANSFER?</h2>
          <h3>YOU'VE COME TO THE RIGHT PLACE!</h3>
          <p>
            Formed in June 2016 in partnership with Shell South Africa, IDF Capital, and Barlow World Siyakhula, 
            through the Enterprise and Supplier Development program of SHELL SA, Lociware Pty Ltd is a Professional, 
            Reliable, and 100% Black-Owned Managed Chauffeur & Shuttle Service Provider with a strong Health, Safety, 
            Security, and Environmental (HSSE) culture.
          </p>

          {/* Features Section */}
          <div className="about-features">
            {[ 
              { icon: <FaUserTie />, text: "Highly Experienced Staff" },
              { icon: <FaClock />, text: "24/7 Full-Service Transportation" },
              { icon: <FaShieldAlt />, text: "Longstanding Safety Record" },
              { icon: <FaCar />, text: "Large Modern Fleet" },
              { icon: <FaGlobe />, text: "Nationwide Service" },
              { icon: <FaHandshake />, text: "Strong Partner Network" },
            ].map((feature, index) => (
              <motion.div
                className="feature-item"
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}  // Opposite fade direction
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
