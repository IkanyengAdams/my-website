import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa'; // Import the icons
import { motion } from 'framer-motion'; // Import Framer Motion

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in'); // Initially apply fade-in

  // Array of content to alternate
  const content = [
    { title: 'Shuttle Hire & Transfers', description: 'Premium Service & Unmatched Safety' },
    { title: 'Corporate Transport', description: 'Efficient & Professional Service' },
    { title: 'Airport Transfers', description: 'On-time Arrival & Comfortable Rides' },
    { title: 'Event Shuttle Services', description: 'Reliable & Safe Group Transportation' },
  ];

  // Effect to switch content every 5 seconds with smooth transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeClass(''); // Reset the fade effect momentarily
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length); // Change content
        setFadeClass('fade-in'); // Reapply the fade-in effect after the brief reset
      }, 800); // Short delay to reset fade-in effect
    }, 3500); // Switch content every 3.5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [content.length]);

  return (
    <section className="hero">
      {/* Current Hero Content with fade-in effect */}
      <div className={`hero-content ${fadeClass}`}>
        <h1>{content[currentIndex].title}</h1>
        <p>{content[currentIndex].description}</p>
      </div>

      {/* Social Media Icons with Framer Motion */}
      <div className="social-icons">
        <motion.a
          href="https://www.facebook.com/lociware"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
        >
          <FaFacebookF />
        </motion.a>

        <motion.a
          href="https://x.com/lociware"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
        >
          <FaTwitter />
        </motion.a>

        <motion.a
          href="https://www.instagram.com/lociware.shuttles/#"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
        >
          <FaInstagram />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/company/lociware-shuttles/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
        >
          <FaLinkedinIn />
        </motion.a>

        <motion.a
          href="https://www.tiktok.com/@lociware.shuttles"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
        >
          <FaTiktok />
        </motion.a>
      </div>
    </section>
  );
}
