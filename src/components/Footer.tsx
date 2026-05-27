import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Servicios': [
      'Agentes de Voz IA',
      'Automatizaciones',
      'Chatbots Avanzados',
      'Análisis de Datos',
      'Soluciones Custom'
    ],
    'Industrias': [
      'E-commerce',
      'Servicios Financieros',
      'Salud y Medicina',
      'Educación',
      'Inmobiliaria'
    ],
    'Recursos': [
      'Blog',
      'Casos de Estudio',
      'Documentación',
      'API Reference',
      'Centro de Ayuda'
    ],
    'Empresa': [
      'Sobre Nosotros',
      'Equipo',
      'Carreras',
      'Prensa',
      'Contacto'
    ]
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="relative">
                <Cpu className="text-cyan-400" size={32} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                />
              </div>
              <div>
                <span className="text-white font-bold text-xl">Sin Límite</span>
                <span className="text-cyan-400 font-bold text-xl ml-1">IA</span>
              </div>
            </motion.div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformamos empresas con inteligencia artificial avanzada. 
              Especialistas en agentes de voz, automatizaciones y soluciones personalizadas.
            </p>
            
            <div className="flex items-center space-x-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Teléfono",
                info: "+1 (829) 805-9191"
              },
              {
                icon: Mail,
                title: "Email",
                info: "info@sinlimiteia.com"
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Santo Domingo, Republica Dominicana"
              }
            ].map((contact, index) => (
              <div key={index} className="flex items-center space-x-3">
                <contact.icon className="text-cyan-400" size={20} />
                <div>
                  <div className="text-gray-400 text-sm">{contact.title}</div>
                  <div className="text-white font-medium">{contact.info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Sin Límite IA. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;