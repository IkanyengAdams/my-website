import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.section 
      className="contact-section" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      {/* Title */}
      <h2 className="contact-title">Contact Us</h2>

      {/* Contact Card */}
      <div className="contact-card">
        <div className="contact-container">
          {/* Left Column - Contact Information */}
          <div className="contact-info">
            <div className="contact-column">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <a 
                  href="https://www.google.com/maps?q=59+Woodlands+Avenue,+Hurlingham,+Sandton,+2196" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span>59 Woodlands Avenue, Hurlingham, Sandton, 2196</span>
                </a>
              </div>
              <div className="contact-item">
                <FaPhoneAlt />
                <a href="tel:+27102130024" className="contact-link">
                  <span>+(27) 10 213 0024</span>
                </a>
              </div>
            </div>

            <div className="contact-column">
              <div className="contact-item">
                <FaRegClock />
                <span>Mon-Fri: 08:00 - 17:00, Sat-Sun: 08:00 - 13:00</span>
              </div>
              <div className="contact-item">
                <FaPhoneAlt />
                <a href="tel:+27102130024" className="contact-link">
                  <span>24/7 Booking Line : +(27) 10 213 0024</span>
                </a>
              </div>
            </div>

            {/* Map Image - Clickable */}
            <motion.div 
              className="contact-map"
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
            >
              <a 
                href="https://www.google.com/maps?q=59+Woodlands+Avenue,+Hurlingham,+Sandton,+2196" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src="/map.png" alt="Map Location" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Contact Image */}
          <motion.div 
            className="contact-image"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
          >
            <img src="/image11.png" alt="Contact" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
