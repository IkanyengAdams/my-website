import React from 'react';
import { FaCar, FaShieldAlt, FaFirstAid, FaFireExtinguisher, FaStethoscope, FaShekelSign } from 'react-icons/fa'; 
import './Safety.css';

export default function Safety() {
  return (
    <section className="safety">
      {/* Title */}
      <h2 className="safety-title">Rules That Save Lives</h2>

      <div className="safety-content">
        <p>Following safety rules can help you avoid accidents and ensure that everyone on the road stays safe. Here are some essential rules:</p>
        <ul>
          <li>Always wear your seatbelt.</li>
          <li>Obey the speed limits.</li>
          <li>Never use your phone while driving.</li>
          <li>Ensure your vehicle is regularly maintained.</li>
          <li>Respect traffic signs and signals.</li>
        </ul>
      </div>

      <div className="safety-sections">
        {/* Drivers Section */}
        <div className="safety-section">
          <h3 className="section-title">OUR CHAUFFEURS</h3>
          <div className="section-content">
            <p>
              All new Chauffeurs undergo an extensive induction program where they are fully trained and accredited with the below certification during their recruitment:
            </p>
            <ul>
              <li><FaStethoscope /> Medical assessment – fitness to work certificate (annually)</li>
              <li><FaCar /> Defensive driving training (every second year)</li>
              <li><FaFirstAid /> First aid training (every three years)</li>
              <li><FaFireExtinguisher /> Firefighting training (every second year)</li>
            </ul>
            <p>In-house trainings include fatigue and journey management training (weekly)</p>
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="safety-section">
          <h3 className="section-title">OUR VEHICLES</h3>
          <div className="section-content">
            <p>
              Our daily Vehicle Monitoring of movements, surroundings, environment, accidents, and incidents ensures the safety of our Customers and Chauffeurs at all times.
            </p>
           <ul>
              <li><FaCar /> Monitoring of vehicle movements</li>
              <li><FaShieldAlt /> Safeguarding health and safety</li>
              <li><FaFireExtinguisher /> Unacceptable driving behavior</li>
              <li><FaCar /> Monitor fatigue driving</li>
              <li><FaStethoscope /> Incident/accident investigation</li>
              <li><FaShieldAlt /> Deterring, preventing, and detecting crimes (hijacking)</li>
            </ul>
           </div>
          </div>
        </div>
    </section>
  );
}
