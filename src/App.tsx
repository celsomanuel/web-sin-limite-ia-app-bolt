import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VoiceAgents from './components/VoiceAgents';
import Services from './components/Services';
import Automations from './components/Automations';
import UseCases from './components/UseCases';
import TechShowcase from './components/TechShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingJosefinaButton from './components/FloatingJosefinaButton';

function App() {
  const [triggerJosefinaCall, setTriggerJosefinaCall] = useState(false);

  const handleFloatingButtonClick = () => {
    setTriggerJosefinaCall(true);
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <VoiceAgents triggerCall={triggerJosefinaCall} onCallTriggered={() => setTriggerJosefinaCall(false)} />
      <Services />
      <Automations />
      <UseCases />
      <TechShowcase />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingJosefinaButton onCallClick={handleFloatingButtonClick} />
    </div>
  );
}

export default App;