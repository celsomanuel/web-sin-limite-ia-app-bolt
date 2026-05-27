import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, Shield, Workflow, BarChart3 } from 'lucide-react';

const Automations = () => {
  const automations = [
    {
      icon: Workflow,
      title: "Workflows Inteligentes",
      description: "Automatiza procesos complejos con lógica basada en IA que se adapta a nuevas situaciones.",
      benefits: ["Reducción de tiempo 80%", "Cero errores humanos", "Escalabilidad ilimitada"]
    },
    {
      icon: Clock,
      title: "Procesamiento en Tiempo Real",
      description: "Ejecuta automatizaciones al instante sin retrasos, incluso con miles de transacciones simultáneas.",
      benefits: ["Latencia <100ms", "Procesamiento 24/7", "Sin downtime"]
    },
    {
      icon: TrendingUp,
      title: "Optimización Continua",
      description: "Los sistemas aprenden y mejoran automáticamente con cada interacción.",
      benefits: ["Mejora progresiva", "Auto-ajuste de parámetros", "ROI creciente"]
    },
    {
      icon: Shield,
      title: "Seguridad Integrada",
      description: "Cada automatización incluye validación de datos, auditoría y cumplimiento normativo.",
      benefits: ["Encriptación E2E", "Auditorías automáticas", "GDPR compliant"]
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzados",
      description: "Visualiza el rendimiento de tus automatizaciones con dashboards inteligentes en tiempo real.",
      benefits: ["Métricas precisas", "Alertas inteligentes", "Reportes automáticos"]
    },
    {
      icon: Zap,
      title: "Integraciones Sin Límite",
      description: "Conecta con cualquier sistema existente. Soportamos 1000+ integraciones nativas.",
      benefits: ["APIs RESTful", "Webhooks", "Sincronización bidireccional"]
    }
  ];

  return (
    <section id="automatizaciones" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Automatizaciones
            </span>
            {' '}Inteligentes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforma procesos manuales en automatizaciones impulsadas por IA. Ahorra horas, reduce errores y escala sin límites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((automation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-blue-600/20 rounded-3xl p-8 hover:border-blue-600/40 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/25"
              >
                <automation.icon className="text-white" size={28} />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {automation.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {automation.description}
              </p>

              <div className="space-y-3">
                {automation.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-gray-400">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            ¿Cuánto podrías ahorrar?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 rounded-xl p-6"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">40h</div>
              <div className="text-gray-300">Horas mensuales ahorradas</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/40 rounded-xl p-6"
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-300">Reducción de errores</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/40 rounded-xl p-6"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">300%</div>
              <div className="text-gray-300">Aumento de productividad</div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold"
          >
            Automatizar Procesos Ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Automations;
