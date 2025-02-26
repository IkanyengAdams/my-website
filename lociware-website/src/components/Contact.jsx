import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    option: '',
    message: '',
  });

  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle CAPTCHA and form submission (simplified for demo)
  const handleSubmit = (e) => {
    e.preventDefault();
    const correctCaptcha = 15; // 5 + 10 = 15
    if (parseInt(captchaAnswer) !== correctCaptcha) {
      setError('Incorrect CAPTCHA. Please try again.');
      return;
    }
    setError('');
    setIsSubmitted(true);
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', option: '', message: '' });
    setCaptchaAnswer('');
  };

  return (
    <motion.section 
      className="contact-section" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{}}
    >
      <div className="contact-card">
        <h2 className="contact-title">Contacts</h2>
        <p className="contact-subtitle">
          Your inquiries find a swift response through our contacts section. We’re just a message or call away, ready to assist with any queries or assistance you may need. Experience personalized and attentive service at your fingertips.
        </p>
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

            {/* "CONNECT WITH US" title for small screens only */}
            <h3 className="connect-title mobile-only">CONNECT WITH US</h3>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
              <select
                name="option"
                value={formData.option}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Choose your option here</option>
                <option value="inquiry">General Inquiry</option>
                <option value="booking">Booking Request</option>
                <option value="support">Support</option>
              </select>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="form-input message"
                required
              />
              <div className="captcha">
                <span>5 + 10 = </span>
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="captcha-input"
                  placeholder="Enter result"
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              {isSubmitted && <p className="success">Form submitted successfully!</p>}
              <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;