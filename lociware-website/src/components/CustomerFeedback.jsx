import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CustomerFeedback.css';

export default function CustomerFeedback() {
  const feedbacks = [
    {
      rating: 5,
      text: "Lociware has been a game changer for our business. The service is fantastic, and we’ve been able to streamline our operations significantly!",
      author: "Jack Black",
    },
    {
      rating: 4,
      text: "Excellent customer service and a top-tier product! Our team loves using the platform, and the support team is always there when needed.",
      author: "Sarah Lee",
    },
    {
      rating: 4,
      text: "Using Lociware's service has improved our daily operations. I couldn't imagine working without it anymore!",
      author: "Michael Scott",
    },
    {
      rating: 5,
      text: "The platform is user-friendly, and the team is very responsive to any requests we have. Very satisfied with the experience!",
      author: "Angela Martin",
    },
    {
      rating: 4,
      text: "Fantastic platform! It helps us stay organized and makes collaboration a breeze. I highly recommend it!",
      author: "Dwight Schrute",
    },
    {
      rating: 4,
      text: "Great product! It has simplified our workflows, and the customer support team is always available to assist.",
      author: "Jim Halpert",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 10000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [feedbacks.length]);

  // Handle manual navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length);
  };

  // Carousel variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
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
        <div className="carousel-container">
          <button className="carousel-arrow left" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="feedback-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {getStars(feedbacks[currentIndex].rating)}
              <p>{feedbacks[currentIndex].text}</p>
              <h4>- {feedbacks[currentIndex].author}</h4>
            </motion.div>
          </AnimatePresence>
          <button className="carousel-arrow right" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
        {/* Navigation dots */}
        <div className="carousel-dots">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Big Card with Image */}
      <motion.div
        className="big-feedback-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src="/partnerImage.png" alt="Happy Customers" className="big-card-image" />
        <div className="big-card-overlay">
        </div>
      </motion.div>
    </section>
  );
}