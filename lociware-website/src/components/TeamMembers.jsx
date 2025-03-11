import React, { useState } from 'react';

export default function TeamMembers() {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className="team-members">
      <h2 className="team-title">OUR TEAM MEMBERS</h2>
      <p className="team-description">Your Safety Is Our Top Priority</p>

      {/* First Row - Always Visible */}
      <div className="team-cards">
        <div className="team-card">
          <img src="/Sinazo_Vuzane2.jpg" alt="Team Member 1" className="team-image" />
          <h3>SINAZO VUZANE</h3>
          <p>General Manager</p>
        </div>
        <div className="team-card">
          <img src="/Jacobus_Mudau2.jpg" alt="Team Member 2" className="team-image" />
          <h3>JACOBUS MUDAU</h3>
          <p>Operations Manager</p>
        </div>
        <div className="team-card">
          <img src="/Lebogang_Selao2.jpg" alt="Team Member 3" className="team-image" />
          <h3>LEBOGANG SELAO</h3>
          <p>HSSE Manager</p>
        </div>
      </div>

      {/* Hidden Team Members - Shown on Button Click */}
      {showMore && (
        <div className="team-cards more-team">
          <div className="team-card">
            <img src="/Joseph_Mohomi2.jpg" alt="Team Member 4" className="team-image" />
            <h3>JOSEPH MOHOMI</h3>
            <p>Accounts Manager</p>
          </div>
          <div className="team-card">
            <img src="/Mphile_Dlamini2.jpg" alt="Team Member 6" className="team-image" />
            <h3>MPHILE DLAMINI</h3>
            <p>Office Admin</p>
          </div>
          <div className="team-card">
          <img src="/team7.jpeg" alt="Team Member 5" className="team-image" />
            <h3>NTSEWA PHUTHI</h3>
            <p>Ops Controller</p>
          </div>

          <div className="team-card">
            <img src="/team6.png" alt="Team Member 7" className="team-image" />
            <h3>ERFAAN BASTRA</h3>
            <p>Ops Controller</p>
          </div>
          <div className="team-card">
            <img src="/team5.png" alt="Team Member 8" className="team-image" />
            <h3>Operational Team</h3>
            <p>Team</p>
            
          </div>
          <div className="team-card">
            <img src="/lociware-ops-team.jpg" alt="Team Member 9" className="team-image" />
            <h3>Operational Team</h3>
            <p>Team</p>
            
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button className="team-button" onClick={handleToggle}>
        {showMore ? "Show Less" : "Meet the Rest of the Team"}
      </button>

      {/* Branding Message */}
      <p className="team-message">
        At Lociware, we pride ourselves in delivering extensive services to fulfill all of your needs with first-rate customer care.  
        By offering exceptional service with meticulous attention to detail, we have developed into a leading and trusted provider of ground transportation in South Africa.  
        Our goal is to make your travels safe, effortless, and always on schedule.
      </p>
    </section>
  );
}
