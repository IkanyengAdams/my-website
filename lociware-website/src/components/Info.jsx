import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaDollarSign, FaCar, FaGlobeAmericas, FaUserTie, FaCog, FaUserShield } from 'react-icons/fa'; // Importing the icons

export default function Info() {
  return (
    <section className="info">
      {/* About Us Title */}
      <h2 className="info-title">About Us</h2>

   {/* New Section: Who We Are, What We Do, How We Do It */}
<div className="about-container">
  <motion.div 
    className="about-card" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1 }}
  >
    <FaUserTie className="icon" />
    <h3>Who We Are</h3>
    <p>Lociware is a Professional, Reliable Black-Owned & Managed Shuttle and Chauffeur Service Provider. We are Health, Safety, Security, and Environment (HSSE) Driven.</p>
  </motion.div>

  <motion.div 
    className="about-card" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1 }}
  >
    <FaCog className="icon" />
    <h3>What We Do</h3>
    <p>We provide safe, reliable, efficient, and customized passenger transfers (to and from airports, conferences, meetings, homes, etc.).</p>
  </motion.div>

  <motion.div 
    className="about-card" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1 }}
  >
    <FaUserShield className="icon" />
    <h3>How We Do It</h3>
    <p>The "Live" In-Vehicle Monitoring System (IVMS) allows us to monitor the vehicles' movements and locations.</p>
    <p>We have a trained, dedicated, incentivized, well-rested, and professional workforce centered around a safety culture.</p>
    <p>Our vehicles are regularly maintained under our fleet management process.</p>
  </motion.div>
</div>

      {/* Safety, Pricing, Fleet, Coverage */}
      <div className="info-content">
        <div className="info-item">
          <motion.div className="info-icon-container" whileHover={{ rotate: 360 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <FaShieldAlt className="info-icon" />
          </motion.div>
          <h3>Safety First</h3>
          <p>Experienced staff and professionally trained chauffeurs, putting your safety first always.</p>
        </div>

        <div className="info-item">
          <motion.div className="info-icon-container" whileHover={{ rotate: 360 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <FaDollarSign className="info-icon" />
          </motion.div>
          <h3>Competitive Rates</h3>
          <p>We can offer you the right vehicle at the right price to fit your budget.</p>
        </div>

        <div className="info-item">
          <motion.div className="info-icon-container" whileHover={{ rotate: 360 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <FaCar className="info-icon" />
          </motion.div>
          <h3>Large Fleet</h3>
          <p>We offer an extensive fleet of vehicles including luxury sedans, MPVs, and coaches.</p>
        </div>

        <div className="info-item">
          <motion.div className="info-icon-container" whileHover={{ rotate: 360 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <FaGlobeAmericas className="info-icon" />
          </motion.div>
          <h3>Nationwide Service</h3>
          <p>We cover most of the major centers in South Africa, ensuring you always have comfort and safety.</p>
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

      {/* New Vision & Mission Section */}
<div className="vision-mission-container">
  <motion.div 
    className="vision-card" 
    initial={{ opacity: 0, x: -100 }} 
    animate={{ opacity: 1, x: 0 }} 
    transition={{ duration: 1 }}
  >
    <h3>Our Vision</h3>
    <p>To provide first and foremost safe and quality services in a professional manner that exceeds the expectations of our esteemed customers.</p>
  </motion.div>

  <motion.div 
    className="mission-card" 
    initial={{ opacity: 0, x: 100 }} 
    animate={{ opacity: 1, x: 0 }} 
    transition={{ duration: 1 }}
  >
    <h3>Our Mission</h3>
    <p>To build long term relationships with our customers and clients and provide exceptional customer services by pursuing business through innovation and advanced safety culture.</p>
  </motion.div>
</div>
    </section>
  );
}
