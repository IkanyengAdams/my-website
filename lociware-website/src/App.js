import React, { useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Added for routing (if not already installed)
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
import Chatbot from './components/Chatbot'; // Import the Chatbot component
import ScrollToTop from './components/ScrollToTop'; // Import the new ScrollToTop component
import './styles.css';

function App() {
  const navbarRef = useRef(null);
  const infoRef = useRef(null); // This should point to Info, not AboutUs
  const servicesRef = useRef(null);
  const safetyRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <Router> {/* Wrap the app in Router for potential routing */}
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
        {/* Render Chatbot as a fixed overlay across all pages */}
        <Chatbot />
        {/* Render ScrollToTop as a fixed overlay across all pages */}
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;