import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";

// Service data with valid image paths (assuming images are in the public folder)
const services = [
  { 
    title: "AIRPORT TRANSFERS", 
    images: ["/image14.jpg", "/image15.jpg"]
  },
  { 
    title: "COUNTRYWIDE TRANSPORTATION", 
    images: ["/image14.jpg", "/image13.jpg", "/image16.jpg"]
  },
  { 
    title: "CORPORATE TRAVEL", 
    images: ["/image15.jpg", "/image14.jpg", "/image13.jpg"]
  },
  { 
    title: "CHAUFFEUR SERVICE", 
    images: ["/image16.jpg", "/image15.jpg", "/image14.jpg"]
  },
  { 
    title: "SPECIAL EVENT HIRE", 
    images: ["/image17.jpg", "/image13.jpg", "/image14.jpg"]
  },
  { 
    title: "EXECUTIVE TRAVEL", 
    images: ["/image17.jpg", "/image13.jpg", "/image14.jpg"]
  }
];

export default function Services() {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Custom Arrow Components for react-slick
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>›</span> {/* Right arrow symbol */}
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>‹</span> {/* Left arrow symbol */}
      </div>
    );
  }

  return (
    <section className="services-section">
      <h2 className="services-title">OUR SERVICE OFFERING</h2>
      <p className="services-subtitle">See What We Can Do for You</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{}} // Triggers every time in view
          >
            <Slider {...sliderSettings}>
              {service.images.map((image, idx) => (
                <div key={idx} className="image-wrapper">
                  <img 
                    src={process.env.PUBLIC_URL + image} 
                    alt={`${service.title} ${idx + 1}`} 
                    className="service-image" 
                    onError={(e) => {
                      console.error(`Image failed to load: ${process.env.PUBLIC_URL + image}`);
                      e.target.style.display = 'none'; // Hide broken images
                      e.target.src = "/default-image.jpg"; // Fallback to a default image (optional, ensure default-image.jpg exists in public folder)
                    }} 
                    loading="lazy" // Lazy load images for performance
                  />
                </div>
              ))}
            </Slider>
            <div className="service-overlay">
              <h3>{service.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}