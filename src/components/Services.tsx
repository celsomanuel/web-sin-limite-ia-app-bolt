import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cog, Smartphone, Database, Cloud, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Automatizaciones Inteligentes",
      description: "Optimiza procesos empresariales con IA que aprende y se adapta a tu negocio.",
      features: ["Workflows personalizados", "Integración APIs", "Machine Learning"]
    },
    {
      icon: Smartphone,
      title: "Chatbots Avanzados",
      description: "Asistentes conversacionales que entienden contexto y emociones.",
      features: ["NLP avanzado", "Multi-plataforma", "Análisis de sentimientos"]
    },
    {
      icon: Database,
      title: "Análisis de Datos IA",
      description: "Convierte datos en insights accionables con algoritmos de última generación.",
      features: ["Predicciones precisas", "Dashboards interactivos", "Reportes automáticos"]
    },
    {
      icon: Cloud,
      title: "Soluciones en la Nube",
      description: "Infraestructura escalable y segura para tus aplicaciones de IA.",
      features: ["Alta disponibilidad", "Escalado automático", "Backup continuo"]
    },
    {
      icon: Cog,
      title: "Integración de Sistemas",
      description: "Conectamos tu IA con sistemas existentes sin interrupciones.",
      features: ["APIs RESTful", "Webhooks", "Sincronización en tiempo real"]
    },
    {
      icon: Shield,
      title: "IA Segura y Ética",
      description: "Desarrollamos IA responsable con los más altos estándares de seguridad.",
      features: ["Encriptación end-to-end", "Auditorías de sesgo", "Cumplimiento GDPR"]
    }
  ];

  return (
    <section id="servicios" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones completas de IA diseñadas para impulsar tu negocio hacia el futuro digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-purple-600/20 rounded-3xl p-8 hover:border-purple-600/40 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl mb-6 group-hover:shadow-lg group-hover:shadow-purple-600/25"
              >
                <service.icon className="text-white" size={28} />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="mt-6 text-purple-600 font-semibold cursor-pointer"
              >
                Saber más →
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-6 rounded-full text-xl font-semibold"
          >
            Solicitar Consulta Gratuita
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;