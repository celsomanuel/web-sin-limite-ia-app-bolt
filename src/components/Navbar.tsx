import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Sin Límite IA Logo" 
                className="w-20 h-15 object-contain"
              />
            </div>
            <div>
              <span className="text-white font-bold text-xl">Sin Límite</span>
              <span className="text-cyan-400 font-bold text-xl ml-1">IA</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Servicios
            </a>
            <a href="#agentes-voz" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Agentes de Voz
            </a>
            <a href="#automatizaciones" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Automatizaciones
            </a>
            <a href="#casos" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Casos de Uso
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium"
            >
              Contactar
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-cyan-500/20"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#servicios" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Servicios
              </a>
              <a href="#agentes-voz" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Agentes de Voz
              </a>
              <a href="#automatizaciones" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Automatizaciones
              </a>
              <a href="#casos" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Casos de Uso
              </a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium w-fit">
              <span
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
                className="cursor-pointer"
              >
                Contactar
              </span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;