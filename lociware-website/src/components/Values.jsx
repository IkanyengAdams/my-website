import React from "react";
import { motion, useInView } from "framer-motion";

export default function Values() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-100px" });

  // Explanations for each value in my own words
  const valueExplanations = {
    "Botho Pele": "Prioritizing compassion and community well-being.",
    "Safety": "Ensuring the security and protection of everyone involved.",
    "Integrity": "Upholding honesty and ethical principles in all actions.",
    "Honesty": "Being truthful and transparent in every interaction.",
    "Respect": "Valuing others and fostering mutual understanding."
  };

  return (
    <section className="values" ref={ref}>
      <div className="values-card">
        {/* Text Content */}
        <div className="values-text">
          <h2>Our Values</h2>
          {/* Image appears here on small screens */}
          <div className="values-image-container mobile-only">
            <img src="/loci1.png" alt="Our Values" className="values-image" />
          </div>
          <p>
            Where <strong>PROFESSIONALISM</strong> meets <strong>COMMITMENT</strong>, we create an exceptional
            experience for you. Our experienced staff and highly professional chauffeurs are committed to
            providing safe, reliable transportation, exceptional customer service, and consistent pricing.
            We provide in-house dispatchers who support our clients every step of the way.
          </p>
          <p>
            Our amazing team is always ready to serve you – whether it’s for business or leisure. You name the
            occasion, and we’ll make the ride flawless, whether close to home or in a new city. We are always there,
            ensuring you receive the best service possible.
          </p>
        </div>

        {/* Image - Hidden on mobile, visible on desktop */}
        <div className="values-image-container desktop-only">
          <img src="/loci1.png" alt="Our Values" className="values-image" />
        </div>
      </div>

      {/* Circular Layout for Values - Moved to bottom, far left with explanations next to them */}
      <div className="values-circle-layout">
        <div className="values-circle-container">
          {/* Big Circle (Center) */}
          <motion.div
            className="big-circle"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Values
          </motion.div>

          {/* Small Circles */}
          {["Botho Pele", "Safety", "Integrity", "Honesty", "Respect"].map((value, index) => (
            <motion.div
              key={index}
              className="small-circle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
        <div className="explanation-container">
          {["Botho Pele", "Safety", "Integrity", "Honesty", "Respect"].map((value, index) => (
            <p key={index} className="value-explanation">
              <strong>{value}:</strong> {valueExplanations[value]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}