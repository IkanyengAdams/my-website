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

      

      {/* Image Cards Section */}
      <div className="info-cards">
        <div className="info-card">
          <img src="/car-image.jpg" alt="A picture of a car" />
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
