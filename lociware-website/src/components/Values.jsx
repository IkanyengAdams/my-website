import React from 'react';

export default function Values() {
  return (
    <section className="values">
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
    </section>
  );
}
