import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
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
import Chatbot from './components/Chatbot'; // Import Chatbot
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import PrivacyPolicy from './components/PrivacyPolicy'; // Create or import a PrivacyPolicy component (see below)
import './styles.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  const navbarRef = useRef(null);
  const infoRef = useRef(null); // Correctly points to Info
  const servicesRef = useRef(null);
  const safetyRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <Router> {/* Wrap the app in Router */}
      <div className="App">
        <Navbar
          navbarRef={navbarRef}
          infoRef={infoRef} // Correctly points to Info
          servicesRef={servicesRef}
          safetyRef={safetyRef}
          contactRef={contactRef}
        />
        <Routes> {/* Define routes for navigation */}
          <Route path="/" element={
            <>
              <div ref={navbarRef}><Hero /></div>
              <div ref={infoRef}><Info /></div>
              <Values />
              <AboutUs />
              <div ref={servicesRef}><Services /></div>
              <div ref={contactRef}><Contact /></div>
              <div ref={safetyRef}><Safety /></div>
              <TeamMembers />
              <CustomerFeedback />
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* New route for POPI/Privacy */}
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
        {/* Render Chatbot and ScrollToTop as fixed overlays across all pages */}
        <Chatbot />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;