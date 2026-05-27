import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Users, BarChart3, Building2, Headphones, Zap } from 'lucide-react';

const UseCases = () => {
  const cases = [
    {
      icon: ShoppingCart,
      industry: "E-Commerce",
      title: "Recomendaciones Personalizadas",
      description: "Agentes IA que conocen el historial del cliente y recomiendan productos aumentando ticket promedio en 45%.",
      results: ["45% incremento en AOV", "60% reducción de devoluciones", "Satisfacción cliente 98%"]
    },
    {
      icon: Users,
      industry: "Recursos Humanos",
      title: "Reclutamiento Automatizado",
      description: "Sistema de IA que evalúa CVs, conduce entrevistas prelininares y puntúa candidatos 10x más rápido.",
      results: ["80% menos tiempo en screening", "Mejor calidad de candidatos", "Reducción de sesgo"]
    },
    {
      icon: Headphones,
      industry: "Atención al Cliente",
      title: "Soporte Multicanal",
      description: "Agentes de voz IA que manejan llamadas en 15+ idiomas, sin tiempo de espera ni horarios limitados.",
      results: ["Disponibilidad 24/7", "Costo 70% menor", "CSAT score +35 puntos"]
    },
    {
      icon: BarChart3,
      industry: "Finanzas",
      title: "Análisis de Fraude",
      description: "Detección en tiempo real de transacciones fraudulentas con 99.8% de precisión y cero falsos positivos.",
      results: ["99.8% precisión", "Detección <50ms", "Pérdidas 90% menores"]
    },
    {
      icon: Building2,
      industry: "Real Estate",
      title: "Visitas Virtuales",
      description: "Tours inmersivos con IA que responden preguntas, agendas visitas y califican leads automáticamente.",
      results: ["40% más conversiones", "Citas agendadas 5x más rápido", "Tiempo de venta 60% menos"]
    },
    {
      icon: Zap,
      industry: "Manufactura",
      title: "Mantenimiento Predictivo",
      description: "Sistemas que predicen fallas de equipos antes de ocurrir, evitando costosos paros productivos.",
      results: ["95% reducción de downtime", "Ahorro 35% en mantenimiento", "Eficiencia operacional +50%"]
    }
  ];

  return (
    <section id="casos" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Casos de Uso
            </span>
            {' '}Reales
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empresas líderes en diferentes industrias ya están transformando sus operaciones con nuestras soluciones de IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-green-600/20 rounded-3xl p-8 hover:border-green-600/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl group-hover:shadow-lg group-hover:shadow-green-600/25"
                >
                  <useCase.icon className="text-white" size={28} />
                </motion.div>
                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                  {useCase.industry}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {useCase.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-gray-700">
                <div className="text-sm font-semibold text-green-400 mb-3">Resultados Obtenidos:</div>
                {useCase.results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-gray-400 text-sm">{result}</span>
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
          className="mt-20 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Cuál es tu industria?
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Tenemos soluciones específicas para cada sector. Descubre cómo podemos transformar tu negocio.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold"
          >
            Ver Solución Para Mi Industria
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
