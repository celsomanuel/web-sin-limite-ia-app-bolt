import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, TrendingUp, Zap, Cog, BarChart3 } from 'lucide-react';

const TechShowcase = () => {
  const comparison = {
    without: [
      "Leads sin responder fuera de horario",
      "Procesos manuales lentos",
      "Seguimiento inconsistente",
      "Citas perdidas y olvidadas",
      "Costos operativos altos",
      "Dependencia excesiva del personal"
    ],
    with: [
      "Atención automática 24/7",
      "Seguimiento instantáneo de clientes",
      "Reservas y citas automatizadas",
      "Ventas y soporte sin interrupciones",
      "Menos errores operativos",
      "Más tiempo para enfocarte en crecer"
    ]
  };

  const impact = [
    { metric: "70%", label: "Reducción en costos operativos" },
    { metric: "24/7", label: "Disponibilidad continua" },
    { metric: "3x", label: "Mayor velocidad operativa" },
    { metric: "80%", label: "Menos tiempo en tareas repetitivas" }
  ];

  const process = [
    {
      number: "1",
      title: "Analizamos tu negocio",
      description: "Detectamos procesos repetitivos, cuellos de botella y oportunidades de automatización.",
      icon: BarChart3
    },
    {
      number: "2",
      title: "Diseñamos tu solución IA",
      description: "Creamos agentes de voz, chatbots o automatizaciones adaptadas a tu operación.",
      icon: Cog
    },
    {
      number: "3",
      title: "Implementamos y conectamos",
      description: "Integramos con WhatsApp, CRM, calendarios, formularios, APIs y herramientas existentes.",
      icon: Zap
    },
    {
      number: "4",
      title: "Escalas sin límites",
      description: "Tu sistema opera 24/7 mientras monitoreas métricas y resultados.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(3, 102, 214, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Tu negocio funcionando
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              24/7, incluso mientras duermes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre la diferencia que IA puede hacer en tu operación
          </p>
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Tu negocio hoy vs con Sin Límite IA
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-red-900/20 to-black/50 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8"
            >
              <h4 className="text-2xl font-bold text-white mb-8">Sin Automatización</h4>
              <div className="space-y-4">
                {comparison.without.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <X className="text-red-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* With */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-green-900/20 to-black/50 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8"
            >
              <h4 className="text-2xl font-bold text-white mb-8">Con Sin Límite IA</h4>
              <div className="space-y-4">
                {comparison.with.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Impacto real que puedes esperar
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                  {item.metric}
                </div>
                <div className="text-gray-300 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Cómo trabajamos contigo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                        <span className="text-white font-bold text-lg">{step.number}</span>
                      </div>
                      <IconComponent className="text-cyan-400" size={24} />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting Line */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Comienza Tu Transformación Ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechShowcase;