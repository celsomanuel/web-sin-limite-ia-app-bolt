import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Comienza tu{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Transformación
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Listo para revolucionar tu negocio con IA? Contáctanos y descubre cómo podemos ayudarte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Solicita tu Consulta Gratuita
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Servicio de Interés
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="agentes-voz">Agentes de Voz IA</option>
                  <option value="automatizaciones">Automatizaciones</option>
                  <option value="chatbots">Chatbots Avanzados</option>
                  <option value="analisis-datos">Análisis de Datos IA</option>
                  <option value="solucion-custom">Solución Personalizada</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Send size={20} />
                <span>Enviar Solicitud</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Llámanos",
                  info: "+1 (829) 805-9191",
                  description: "Lun - Vie, 9:30 AM - 6:00 PM"
                },
                {
                  icon: Mail,
                  title: "Escríbenos",
                  info: "info@sinlimiteia.com",
                  description: "Respuesta en menos de 24 horas"
                },
                {
                  icon: MapPin,
                  title: "Visítanos",
                  info: "Santo Domingo",
                  description: "Republica Dominicana"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-purple-600/20 rounded-2xl p-6 flex items-start space-x-4"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-3 rounded-xl">
                    <contact.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {contact.title}
                    </h4>
                    <p className="text-purple-400 font-medium mb-1">
                      {contact.info}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {contact.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.open('https://wa.me/18298059191?text=Hola%20quiero%20chat%20en%20vivo', '_blank');
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Chat en Vivo</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const email = 'info@sinlimiteia.com';
                  const subject = 'Solicitud de Reunión';
                  const body = 'Hola, me gustaría agendar una reunión para discutir nuestras necesidades de IA.';
                  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="w-full border-2 border-cyan-400 text-cyan-400 py-4 rounded-xl font-semibold hover:bg-cyan-400/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Agendar Reunión</span>
              </motion.button>
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 text-center"
            >
              <h4 className="text-white font-semibold text-lg mb-2">
                Respuesta Garantizada
              </h4>
              <p className="text-gray-300 mb-4">
                Te contactamos en menos de 24 horas hábiles
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <div className="text-cyan-400">
                  ⚡ Respuesta rápida
                </div>
                <div className="text-purple-600">
                  🎯 Consulta personalizada
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;