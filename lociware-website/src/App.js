import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Info from './components/Info';
import AboutUs from './components/AboutUs';
import Values from './components/Values';
import Services from './components/Services';
import Safety from './components/Safety';
import TeamMembers from './components/TeamMembers';
import CustomerFeedback from './components/CustomerFeedback';
import Footer from './components/Footer';
import './styles.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function App() {
  const navbarRef = useRef(null);
  const infoRef = useRef(null); // This should point to Info, not AboutUs
  const servicesRef = useRef(null);
  const safetyRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="App">
      <Navbar
        navbarRef={navbarRef}
        infoRef={infoRef} // This now correctly points to Info
        servicesRef={servicesRef}
        safetyRef={safetyRef}
        contactRef={contactRef}
      />
      <div ref={navbarRef}><Hero /></div>
      <div ref={infoRef}><Info /></div>
      <Values />
      <AboutUs /> 
      <div ref={servicesRef}><Services /></div>
      <div ref={contactRef}><Contact /></div>
      <div ref={safetyRef}><Safety /></div>
      <TeamMembers />
      <CustomerFeedback />
      <Footer />
    </div>
  );
}

export default App;
