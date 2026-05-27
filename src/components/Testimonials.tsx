import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'CEO',
    company: 'TechStart México',
    rating: 5,
    text: 'Sin Límite IA transformó completamente nuestro servicio al cliente. Nuestro agente de voz maneja el 80% de las consultas sin intervención humana.',
    avatar: '👨‍💼'
  },
  {
    name: 'Ana García',
    role: 'Directora de Operaciones',
    company: 'E-commerce Plus',
    rating: 5,
    text: 'La automatización de procesos que implementaron nos ahorró 15 horas semanales. El ROI fue evidente desde el primer mes.',
    avatar: '👩‍💼'
  },
  {
    name: 'Roberto Silva',
    role: 'Fundador',
    company: 'Consultora Digital',
    rating: 5,
    text: 'El chatbot que desarrollaron para nosotros genera leads 24/7. Hemos aumentado nuestras conversiones en un 40%.',
    avatar: '👨‍💻'
  },
  {
    name: 'María López',
    role: 'Gerente de Ventas',
    company: 'Inmobiliaria Premium',
    rating: 5,
    text: 'Su agente de voz califica leads perfectamente y agenda citas automáticamente. Nuestro equipo se enfoca solo en cerrar ventas.',
    avatar: '👩‍💻'
  },
  {
    name: 'Diego Ramírez',
    role: 'CTO',
    company: 'FinTech Solutions',
    rating: 5,
    text: 'La integración con nuestros sistemas fue perfecta. La IA procesa transacciones y responde consultas técnicas con precisión increíble.',
    avatar: '👨‍🔬'
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Casos de{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Éxito
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empresas que ya están transformando su futuro con nuestras soluciones de IA.
          </p>
        </motion.div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex space-x-6"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <Quote className="text-gray-600 mb-4" size={24} />

                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-yellow-400 text-sm font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-gray-800/80 to-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-full px-8 py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">4.9/5</span>
            </div>
            <div className="w-px h-6 bg-gray-600" />
            <div className="text-gray-400">
              Basado en 150+ proyectos exitosos
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;