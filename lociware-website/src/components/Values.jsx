import React from "react";
import { motion, useInView } from "framer-motion";

export default function Values() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-100px" });

  return (
    <section className="values" ref={ref}>
      <div className="values-card">
        {/* Image */}
        <div className="values-image-container">
          <img src="/loci1.png" alt="Our Values" className="values-image" />
        </div>

        {/* Text Content */}
        <div className="values-text">
          <h2>Our Values</h2>
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
      </div>

      {/* Circular Layout for Values */}
      <div className="values-circle-container">
        {/* Big Circle (Center) */}
        <motion.div
          className="big-circle"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          Values
        </motion.div>

        {/* Small Circles */}
        {["Batho Pele (Putting People First)", "Safety", "Integrity", "Honesty", "Respect"].map((value, index) => (
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
    </section>
  );
}
