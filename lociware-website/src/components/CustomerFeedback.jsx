import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import './CustomerFeedback.css';

export default function CustomerFeedback() {
  const getStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaStar key={i} className="star-icon empty" />);
      }
    }
    return stars;
  };

  return (
    <section className="customer-feedback">
      <motion.div
        className="feedback-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="feedback-title">What Our Customers Say</h2>
        <div className="feedback-cards">
          {/* Card 1 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {getStars(5)} {/* 5 stars */}
            <p>"Lociware has been a game changer for our business. The service is fantastic, and we’ve been able to streamline our operations significantly!"</p>
            <h4>- Jack Black</h4>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {getStars(4)} {/* 4 stars */}
            <p>"Excellent customer service and a top-tier product! Our team loves using the platform, and the support team is always there when needed."</p>
            <h4>- Sarah Lee</h4>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            {getStars(4)} {/* 4 stars */}
            <p>"Using Lociware's service has improved our daily operations. I couldn't imagine working without it anymore!"</p>
            <h4>- Michael Scott</h4>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {getStars(5)} {/* 5 stars */}
            <p>"The platform is user-friendly, and the team is very responsive to any requests we have. Very satisfied with the experience!"</p>
            <h4>- Angela Martin</h4>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {getStars(4)} {/* 4 stars */}
            <p>"Fantastic platform! It helps us stay organized and makes collaboration a breeze. I highly recommend it!"</p>
            <h4>- Dwight Schrute</h4>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            className="feedback-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            {getStars(4)} {/* 4 stars */}
            <p>"Great product! It has simplified our workflows, and the customer support team is always available to assist."</p>
            <h4>- Jim Halpert</h4>
          </motion.div>
        </div>
      </motion.div>

      {/* Big Card with Image */}
      <motion.div
          className="big-feedback-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src="/big-image.jpg" alt="Happy Customers" className="big-card-image" />
          <div className="big-card-overlay">
            <h3>Trusted by Thousands of Customers</h3>
            <p>Join our growing community of satisfied clients and experience the best service in the industry.</p>
          </div>
        </motion.div>
    </section>
  );
}
