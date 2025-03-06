import React, { useState, useEffect } from 'react';
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
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, id: '' });

  // Fetch CAPTCHA from backend on mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/captcha');
      const data = await response.json();
      setCaptcha(data);
    } catch (err) {
      console.error('Error fetching CAPTCHA:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captchaAnswer, captchaId: btoa(JSON.stringify({ num1: captcha.num1, num2: captcha.num2 })) }), // Encode CAPTCHA numbers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const result = await response.json();
      console.log(result.message);
      setIsSubmitted(true);

      // Reset form and fetch new CAPTCHA
      setFormData({ name: '', email: '', phone: '', option: '', message: '' });
      setCaptchaAnswer('');
      fetchCaptcha();
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
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

            <h3 className="connect-title mobile-only">CONNECT WITH US</h3>
          </div>

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
                <span>{captcha.num1} + {captcha.num2} = </span>
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