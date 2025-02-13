import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaDollarSign, FaCar, FaGlobeAmericas } from 'react-icons/fa'; // Importing the icons

export default function Info() {
  return (
    <section className="info">
      {/* About Us Title */}
      <h2 className="info-title">About Us</h2>

      <div className="info-content">
        {/* Safety First */}
        <div className="info-item">
          <motion.div
            className="info-icon-container"
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FaShieldAlt className="info-icon" />
          </motion.div>
          <h3>Safety First</h3>
          <p>Experienced staff and professionally trained chauffeurs, putting your safety first always.</p>
        </div>

        {/* Competitive Rates */}
        <div className="info-item">
          <motion.div
            className="info-icon-container"
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FaDollarSign className="info-icon" />
          </motion.div>
          <h3>Competitive Rates</h3>
          <p>We can offer you the right vehicle at the right price to fit your budget.</p>
        </div>

        {/* Large Fleet */}
        <div className="info-item">
          <motion.div
            className="info-icon-container"
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FaCar className="info-icon" />
          </motion.div>
          <h3>Large Fleet</h3>
          <p>We offer an extensive fleet of vehicles including luxury sedans, MPVs, and coaches.</p>
        </div>

        {/* Nationwide Service */}
        <div className="info-item">
          <motion.div
            className="info-icon-container"
            whileHover={{ rotate: 360 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FaGlobeAmericas className="info-icon" />
          </motion.div>
          <h3>Nationwide Service</h3>
          <p>We cover most of the major centres in South Africa, ensuring you always have comfort and safety.</p>
        </div>
      </div>

      {/* Image Cards Section */}
      <div className="info-cards">
        <div className="info-card">
          <img src="/image8.jpg" alt="A picture of a car" />
          <h3>Reliable Service</h3>
          <p>Our fleet of vehicles guarantees a comfortable and stylish travel experience, ensuring reliability no matter your destination.</p>
        </div>

        <div className="info-card">
          <img src="/loci3.png" alt="A car" />
          <h3>Customer Satisfaction</h3>
          <p>We take pride in providing timely and efficient transportation services, earning the trust of our customers. Experience the difference with our commitment to excellence.</p>
        </div>
      </div>
    </section>
  );
}
