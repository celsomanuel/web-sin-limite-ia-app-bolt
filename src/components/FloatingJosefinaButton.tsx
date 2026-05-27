import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, X } from 'lucide-react';

interface FloatingJosefinaButtonProps {
  onCallClick: () => void;
}

const FloatingJosefinaButton: React.FC<FloatingJosefinaButtonProps> = ({ onCallClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const voiceAgentsSection = document.getElementById('agentes-voz');

    const handleScroll = () => {
      if (!voiceAgentsSection) return;

      const rect = voiceAgentsSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(!isInView);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed right-6 bottom-6 z-40"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 right-0 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 w-72"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Habla con Josefina</span>
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Nuestro Agente Principal de Servicios está disponible para ayudarte en vivo
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onCallClick();
                    setIsExpanded(false);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <PhoneCall size={18} />
                  <span>Iniciar Llamada</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative rounded-full bg-gray-900 border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50 flex items-center justify-center group overflow-hidden cursor-pointer"
            style={{ width: '120px', height: '120px' }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-border" />

            {/* Inner circle with image */}
            <div className="rounded-full bg-white flex items-center justify-center relative overflow-hidden"
                 style={{ width: '88px', height: '88px' }}>
              <img
                src="/image copy copy copy copy copy copy copy copy copy.png"
                alt="Josefina - Agente Principal"
                className="object-contain z-10"
                style={{ width: '76px', height: '76px' }}
              />

              {/* Pulse animation */}
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 rounded-full bg-cyan-400 opacity-40"
              />

              {/* LIVE indicator */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                ● LIVE
              </div>
            </div>

            {/* Ripple effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-cyan-400/60 opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.4 + i * 0.2], opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Call icon overlay */}
            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 shadow-lg">
              <PhoneCall className="text-white" size={14} />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingJosefinaButton;
