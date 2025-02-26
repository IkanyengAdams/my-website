import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";

// Service data with local images, corrected order
const services = [
  { 
    title: "Airport Transfers", 
    description: "Seamless and reliable transportation to and from airports, ensuring you arrive on time and in style.",
    images: ["/tambo.jpg", "/pilanesburg.png", "/lanseria.jpg"]
  },
  { 
    title: "Countrywide Transportation", 
    description: "Comprehensive travel solutions across the country, tailored for comfort and efficiency.",
    images: ["/cape-town.jpg", "/sun-city.jpg", "/durban.jpg"]
  },
  { 
    title: "Corporate Travel", 
    description: "Professional transportation for business needs, ensuring punctuality and professionalism.",
    images: ["/coporate.png", "/coporate1.png", "/coporate2.png"]
  },
  { 
    title: "Chauffeur Service", 
    description: "Luxury chauffeur-driven rides for a personalized and safe travel experience.",
    images: ["/coporate3.png"] // Single image for last three services
  },
  { 
    title: "Special Event Hire", 
    description: "Premium vehicle hire for events, making your special occasions unforgettable.",
    images: ["/image11.png"] // Single image
  },
  { 
    title: "Executive Travel", 
    description: "High-end travel solutions for executives, combining luxury and reliability.",
    images: ["/image17.png"] // Single image
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which image is hovered

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false, // Use slide instead of fade for better visibility with indicators
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: (dots) => (
      <div className="custom-dots">
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="dot"></button>
    ),
  };

  // Custom Arrow Components for react-slick
  function CustomNextArrow(props) {
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

  function CustomPrevArrow(props) {
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
      <motion.h2 
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{}}
      >
        OUR SERVICE OFFERING
      </motion.h2>
      <motion.p 
        className="services-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{}}
      >
        Discover Our Premium Transportation Solutions
      </motion.p>
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{}}
          >
            <div className="card-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className={`image-container ${service.images.length > 1 ? 'carousel' : 'single'}`}>
                {service.images.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {service.images.map((image, idx) => (
                      <div key={idx} className="image-slide">
                        <motion.img 
                          src={image.startsWith('http') ? image : process.env.PUBLIC_URL + image} 
                          alt={`${service.title} ${idx + 1}`} 
                          className="service-image" 
                          onError={(e) => {
                            console.error(`Image failed to load: ${image}`);
                            e.target.style.display = 'none'; // Hide broken images
                            e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found"; // Fallback placeholder
                            console.log('Fallback image applied for:', image); // Additional logging
                          }} 
                          loading="lazy" // Lazy load images for performance
                          onMouseEnter={() => setHoveredIndex(idx)} // Set hovered index on mouse enter
                          onMouseLeave={() => setHoveredIndex(null)} // Reset on mouse leave
                          initial={{ opacity: 1 }}
                          animate={{
                            opacity: hoveredIndex === idx ? 0.7 : 1, // Slightly fade current image on hover
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        {hoveredIndex === idx && idx < service.images.length - 1 && (
                          <motion.div 
                            className="next-image-preview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.5, x: 0 }} // Slide in next image preview
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img 
                              src={service.images[(idx + 1) % service.images.length].startsWith('http') 
                                ? service.images[(idx + 1) % service.images.length] 
                                : process.env.PUBLIC_URL + service.images[(idx + 1) % service.images.length]} 
                              alt={`${service.title} ${idx + 2}`} 
                              className="preview-image" 
                              onError={(e) => {
                                console.error(`Preview image failed to load: ${service.images[(idx + 1) % service.images.length]}`);
                                e.target.style.display = 'none'; // Hide broken preview images
                                e.target.src = "https://via.placeholder.com/800x500?text=Preview+Not+Found"; // Fallback for preview
                              }}
                            />
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="single-image">
                    <img 
                      src={service.images[0].startsWith('http') ? service.images[0] : process.env.PUBLIC_URL + service.images[0]} 
                      alt={`${service.title} 1`} 
                      className="single-service-image" 
                      onError={(e) => {
                        console.error(`Single image failed to load: ${service.images[0]}`);
                        e.target.style.display = 'none'; // Hide broken images
                        e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found"; // Fallback placeholder
                        console.log('Fallback image applied for:', service.images[0]); // Additional logging
                      }} 
                      loading="lazy" // Lazy load images for performance
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}