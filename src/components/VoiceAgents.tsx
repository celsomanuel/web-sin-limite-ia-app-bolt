import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Brain, Headphones, Mic, Volume2, PhoneCall, PhoneOff } from 'lucide-react';
import RetellCallInterface from './RetellCallInterface';

interface VoiceAgentsProps {
  triggerCall?: boolean;
  onCallTriggered?: () => void;
}

const VoiceAgents = ({ triggerCall = false, onCallTriggered }: VoiceAgentsProps) => {
  const [activeCallInterface, setActiveCallInterface] = useState<string | null>(null);

  const getAgentColor = (agentType: string) => {
    const colors = {
      'josefina': { 
        bg: 'from-cyan-900/80 to-blue-900/80', 
        border: 'border-cyan-500/50', 
        text: 'text-cyan-400', 
        dot: 'bg-cyan-400',
        button: 'bg-gradient-to-r from-cyan-500 to-blue-600'
      },
      'sales': { 
        bg: 'from-green-900/80 to-emerald-900/80', 
        border: 'border-green-500/50', 
        text: 'text-green-400', 
        dot: 'bg-green-400',
        button: 'bg-gradient-to-r from-green-500 to-emerald-600'
      },
      'customer-service': { 
        bg: 'from-blue-900/80 to-cyan-900/80', 
        border: 'border-blue-500/50', 
        text: 'text-blue-400', 
        dot: 'bg-blue-400',
        button: 'bg-gradient-to-r from-blue-500 to-cyan-600'
      },
      'technical-support': { 
        bg: 'from-purple-900/80 to-violet-900/80', 
        border: 'border-purple-500/50', 
        text: 'text-purple-400', 
        dot: 'bg-purple-400',
        button: 'bg-gradient-to-r from-purple-500 to-violet-600'
      },
      'reservations': { 
        bg: 'from-orange-900/80 to-red-900/80', 
        border: 'border-orange-500/50', 
        text: 'text-orange-400', 
        dot: 'bg-orange-400',
        button: 'bg-gradient-to-r from-orange-500 to-red-600'
      },
      'real-estate': { 
        bg: 'from-indigo-900/80 to-purple-900/80', 
        border: 'border-indigo-500/50', 
        text: 'text-indigo-400', 
        dot: 'bg-indigo-400',
        button: 'bg-gradient-to-r from-indigo-500 to-purple-600'
      }
    };
    return colors[agentType] || colors['customer-service'];
  };

  const getAgentConfig = (agentType: string) => {
    const configs = {
      'josefina': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Voz-SinLimiteIA',
        name: 'Josefina - Agente Principal'
      },
      'sales': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Pedidos',
        name: 'Agente de Ventas'
      },
      'customer-service': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Atencion-al-Cliente',
        name: 'Agente de Atención al Cliente'
      },
      'technical-support': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Soporte-Tecnico',
        name: 'Agente de Soporte Técnico'
      },
      'reservations': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Reservas',
        name: 'Agente de Reservas'
      },
      'real-estate': {
        url: 'https://n8n-ai.iasinlimite.com/webhook/Agent-Real-Steta',
        name: 'Agente de Real Estate'
      }
    };
    return configs[agentType];
  };

  const initiateRetellCall = (agentType: string) => {
    console.log(`🎯 Initiating Retell call with ${agentType}`);
    setActiveCallInterface(agentType);
  };

  const closeCallInterface = () => {
    setActiveCallInterface(null);
  };

  // Handle trigger from floating button
  React.useEffect(() => {
    if (triggerCall) {
      setActiveCallInterface('josefina');
      onCallTriggered?.();
    }
  }, [triggerCall, onCallTriggered]);

  return (
    <section id="agentes-voz" className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Título reducido en 10% y en una sola línea */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Agentes de{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Voz IA
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conversaciones naturales, respuestas inteligentes y atención 24/7. 
            Nuestros agentes de voz transforman la experiencia del cliente.
          </p>
        </motion.div>

        {/* Josefina - Main Agent Button (centered and aligned with text) - REDUCED 25% */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center mb-16"
        >
          {/* Main Josefina Button - Reduced from 200px to 150px (25% reduction) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => initiateRetellCall('josefina')}
            className="relative rounded-full bg-gray-900 border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50 flex items-center justify-center group overflow-hidden cursor-pointer"
            style={{ width: '150px', height: '150px' }}
          >
            {/* Outer ring with enhanced glow */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-border" />
            
            {/* Inner circle with Josefina's image - Reduced from 150px to 112px */}
            <div className="rounded-full bg-white flex items-center justify-center relative overflow-hidden"
                 style={{ width: '112px', height: '112px' }}>
              <img 
                src="/image copy copy copy copy copy copy copy copy copy.png" 
                alt="Josefina - Agente Principal de Servicios" 
                className="object-contain z-10"
                style={{ width: '98px', height: '98px' }}
              />
              
              {/* Enhanced pulse animation for main agent */}
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeOut"
                }}
                className="absolute inset-0 rounded-full bg-cyan-400 opacity-40"
              />

              {/* Premium LIVE indicator - Adjusted size */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                ● LIVE
              </div>
            </div>

            {/* Multiple ripple effects for premium feel */}
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

            {/* Premium call icon overlay - Adjusted position and size */}
            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 shadow-lg">
              <PhoneCall className="text-white" size={16} />
            </div>

            {/* Floating particles around Josefina - Adjusted positions */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-60"
                style={{
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.button>

          {/* Text below Josefina - Perfectly centered and aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6"
          >
            <span className="text-cyan-400 font-bold text-2xl block mb-2">
              Habla con Josefina
            </span>
            <span className="text-cyan-300 text-lg block mb-4">
              Nuestro Agente de Servicios
            </span>
            <div className="flex items-center justify-center space-x-2 text-cyan-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Disponible ahora • Llamada en vivo</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: "Atención al Cliente",
              description: "Resuelve consultas, procesa pedidos y brinda soporte técnico con conversaciones naturales.",
              features: ["Disponible 24/7", "Múltiples idiomas", "Integración CRM"]
            },
            {
              icon: MessageSquare,
              title: "Ventas Telefónicas",
              description: "Califica leads, agenda citas y cierra ventas con técnicas de persuasión avanzadas.",
              features: ["Seguimiento automático", "Scripts personalizados", "Análisis de conversión"]
            },
            {
              icon: Brain,
              title: "Asistente Virtual",
              description: "Agenda citas, confirma reservas y gestiona calendarios con inteligencia contextual.",
              features: ["Sincronización calendarios", "Recordatorios automáticos", "Reprogramación inteligente"]
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6"
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
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call Buttons Section with Sound Wave Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center relative"
        >
          {/* Sound Wave Equalizer positioned behind the 5 agents */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="flex items-center justify-center space-x-1 w-full max-w-5xl h-80">
              {/* Left side equalizer */}
              <div className="flex items-center space-x-1 flex-1 justify-end">
                {[...Array(80)].map((_, i) => (
                  <motion.div
                    key={`left-${i}`}
                    className="bg-gradient-to-t from-cyan-400 via-blue-500 to-purple-600 rounded-sm"
                    style={{
                      width: '3px',
                      minHeight: '6px',
                    }}
                    animate={{
                      height: [
                        Math.random() * 100 + 30,
                        Math.random() * 250 + 50,
                        Math.random() * 180 + 40,
                        Math.random() * 280 + 60,
                        Math.random() * 140 + 35,
                        Math.random() * 220 + 55,
                      ]
                    }}
                    transition={{
                      duration: 2.0 + Math.random() * 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.03,
                    }}
                  />
                ))}
              </div>

              {/* Center gap for content */}
              <div className="w-96" />

              {/* Right side equalizer */}
              <div className="flex items-center space-x-1 flex-1 justify-start">
                {[...Array(80)].map((_, i) => (
                  <motion.div
                    key={`right-${i}`}
                    className="bg-gradient-to-b from-purple-600 via-blue-500 to-cyan-400 rounded-sm"
                    style={{
                      width: '3px',
                      minHeight: '6px',
                    }}
                    animate={{
                      height: [
                        Math.random() * 120 + 35,
                        Math.random() * 270 + 55,
                        Math.random() * 200 + 45,
                        Math.random() * 300 + 65,
                        Math.random() * 160 + 40,
                        Math.random() * 240 + 60,
                      ]
                    }}
                    transition={{
                      duration: 2.2 + Math.random() * 1.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.025,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content with higher z-index */}
          <div className="relative z-10">
            {/* Title with reduced size for better hierarchy */}
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Otros{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Agentes Especializados
              </span>
            </h3>
            
            {/* Subtitle matching the main section style */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Cada agente está entrenado para tareas específicas. 
              Haz clic en cualquier agente para iniciar una llamada en vivo con IA.
            </p>

            {/* Top Row - 2 buttons with increased spacing (84px = 60px + 40% more) */}
            <div className="flex justify-center gap-15 mb-12">
              {[
                { 
                  id: 1, 
                  label: "Atención al Cliente", 
                  color: "from-blue-500 to-cyan-500", 
                  useImage: "customer", 
                  isDemo: true,
                  agentType: 'customer-service' as const
                },
                { 
                  id: 2, 
                  label: "Ventas", 
                  color: "from-green-500 to-emerald-500", 
                  useImage: "sales", 
                  isDemo: true,
                  agentType: 'sales' as const
                }
              ].map((button, index) => (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                  style={{ marginLeft: index > 0 ? '84px' : '0' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => button.isDemo ? initiateRetellCall(button.agentType) : undefined}
                    className={`relative w-42 h-42 rounded-full bg-gray-900 border-4 ${
                      button.isDemo 
                        ? (button.agentType === 'sales' 
                            ? 'border-green-500 shadow-lg shadow-green-500/25' 
                            : 'border-blue-500 shadow-lg shadow-blue-500/25')
                        : 'border-gray-700'
                    } flex items-center justify-center mb-6 group overflow-hidden ${
                      button.isDemo ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{ width: '168px', height: '168px' }}
                  >
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full border-4 border-transparent ${
                      button.isDemo 
                        ? (button.agentType === 'sales'
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600')
                        : 'bg-gradient-to-r from-gray-800 to-gray-900'
                    } bg-clip-border`} />
                    
                    {/* Inner circle with image */}
                    <div className="w-30 h-30 rounded-full bg-white flex items-center justify-center relative overflow-hidden"
                         style={{ width: '120px', height: '120px' }}>
                      {button.useImage === "customer" ? (
                        <img 
                          src="/image.png" 
                          alt="Customer Service AI Robot" 
                          className="w-27 h-27 object-contain z-10"
                          style={{ width: '108px', height: '108px' }}
                        />
                      ) : button.useImage === "sales" ? (
                        <img 
                          src="/image copy copy copy.png" 
                          alt="Sales AI Robot with Laptop" 
                          className="w-27 h-27 object-contain z-10"
                          style={{ width: '108px', height: '108px' }}
                        />
                      ) : (
                        <Headphones className="text-white z-10" size={42} />
                      )}
                      
                      {/* Pulse animation - enhanced for demo buttons */}
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                        transition={{ 
                          duration: button.isDemo ? 1.5 : 2, 
                          repeat: Infinity, 
                          delay: index * 0.2 
                        }}
                        className={`absolute inset-0 rounded-full ${
                          button.useImage === "customer" ? 'bg-blue-400' : 
                          button.useImage === "sales" ? 'bg-green-400' :
                          `bg-gradient-to-r ${button.color}`
                        } opacity-30`}
                      />

                      {/* Live indicator for demo buttons */}
                      {button.isDemo && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                          LIVE
                        </div>
                      )}
                    </div>

                    {/* Enhanced ripple effect for demo buttons */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${
                        button.isDemo 
                          ? (button.agentType === 'sales' ? 'border-green-400/70' : 'border-blue-400/70')
                          : 'border-cyan-400/50'
                      } opacity-0 group-hover:opacity-100`}
                      animate={{ scale: [1, 1.2], opacity: [0, 1, 0] }}
                      transition={{ duration: button.isDemo ? 0.8 : 1, repeat: Infinity }}
                    />

                    {/* Call icon overlay for demo buttons */}
                    {button.isDemo && (
                      <div className={`absolute bottom-2 right-2 ${
                        button.agentType === 'sales' ? 'bg-green-500' : 'bg-blue-500'
                      } rounded-full p-2`}>
                        <PhoneCall className="text-white" size={16} />
                      </div>
                    )}
                  </motion.button>

                  <span className={`font-medium text-lg ${
                    button.isDemo 
                      ? (button.agentType === 'sales' ? 'text-green-400' : 'text-blue-400')
                      : 'text-white'
                  }`}>
                    {button.label}
                    {button.isDemo && (
                      <span className={`block text-sm ${
                        button.agentType === 'sales' ? 'text-green-300' : 'text-blue-300'
                      } mt-1`}>
                        ¡Presiona el Botón!
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row - 3 buttons with increased spacing and live functionality */}
            <div className="flex justify-center" style={{ gap: '84px' }}>
              {[
                { 
                  id: 3, 
                  label: "Soporte Técnico", 
                  color: "from-purple-600 to-purple-800", 
                  useImage: "technical",
                  isDemo: true,
                  agentType: 'technical-support' as const
                },
                { 
                  id: 4, 
                  label: "Reservas", 
                  color: "from-orange-500 to-red-500", 
                  useImage: "reservations",
                  isDemo: true,
                  agentType: 'reservations' as const
                },
                { 
                  id: 5, 
                  label: "Real State", 
                  color: "from-indigo-600 to-purple-800", 
                  useImage: "information",
                  isDemo: true,
                  agentType: 'real-estate' as const
                }
              ].map((button, index) => (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => button.isDemo ? initiateRetellCall(button.agentType) : undefined}
                    className={`relative w-42 h-42 rounded-full bg-gray-900 border-4 ${
                      button.isDemo 
                        ? (button.agentType === 'technical-support' 
                            ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                            : button.agentType === 'reservations'
                            ? 'border-orange-500 shadow-lg shadow-orange-500/25'
                            : 'border-indigo-500 shadow-lg shadow-indigo-500/25')
                        : 'border-gray-700'
                    } flex items-center justify-center mb-6 group overflow-hidden ${
                      button.isDemo ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{ width: '168px', height: '168px' }}
                  >
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full border-4 border-transparent ${
                      button.isDemo 
                        ? (button.agentType === 'technical-support'
                            ? 'bg-gradient-to-r from-purple-600 to-violet-600'
                            : button.agentType === 'reservations'
                            ? 'bg-gradient-to-r from-orange-600 to-red-600'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600')
                        : 'bg-gradient-to-r from-gray-800 to-gray-900'
                    } bg-clip-border`} />
                    
                    {/* Inner circle with image */}
                    <div className="w-30 h-30 rounded-full bg-white flex items-center justify-center relative overflow-hidden"
                         style={{ width: '120px', height: '120px' }}>
                      {button.useImage === "technical" ? (
                        <img 
                          src="/image copy.png" 
                          alt="Technical Support IA Agent" 
                          className="w-27 h-27 object-contain z-10"
                          style={{ width: '108px', height: '108px' }}
                        />
                      ) : button.useImage === "reservations" ? (
                        <img 
                          src="/image copy copy copy copy.png" 
                          alt="Reservations AI Robot with Phone" 
                          className="w-27 h-27 object-contain z-10"
                          style={{ width: '108px', height: '108px' }}
                        />
                      ) : button.useImage === "information" ? (
                        <img 
                          src="/image copy copy.png" 
                          alt="Real Estate AI Robot with Heart" 
                          className="w-27 h-27 object-contain z-10"
                          style={{ width: '108px', height: '108px' }}
                        />
                      ) : (
                        <Headphones className="text-white z-10" size={42} />
                      )}
                      
                      {/* Pulse animation - enhanced for demo buttons */}
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                        transition={{ 
                          duration: button.isDemo ? 1.5 : 2, 
                          repeat: Infinity, 
                          delay: (index + 2) * 0.2 
                        }}
                        className={`absolute inset-0 rounded-full ${
                          button.useImage === "technical" ? 'bg-purple-400' : 
                          button.useImage === "reservations" ? 'bg-orange-400' :
                          button.useImage === "information" ? 'bg-indigo-400' :
                          `bg-gradient-to-r ${button.color}`
                        } opacity-30`}
                      />

                      {/* Live indicator for demo buttons */}
                      {button.isDemo && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                          LIVE
                        </div>
                      )}
                    </div>

                    {/* Enhanced ripple effect for demo buttons */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${
                        button.isDemo 
                          ? (button.agentType === 'technical-support' ? 'border-purple-400/70' : 
                             button.agentType === 'reservations' ? 'border-orange-400/70' :
                             'border-indigo-400/70')
                          : 'border-cyan-400/50'
                      } opacity-0 group-hover:opacity-100`}
                      animate={{ scale: [1, 1.2], opacity: [0, 1, 0] }}
                      transition={{ duration: button.isDemo ? 0.8 : 1, repeat: Infinity }}
                    />

                    {/* Call icon overlay for demo buttons */}
                    {button.isDemo && (
                      <div className={`absolute bottom-2 right-2 ${
                        button.agentType === 'technical-support' ? 'bg-purple-500' : 
                        button.agentType === 'reservations' ? 'bg-orange-500' :
                        'bg-indigo-500'
                      } rounded-full p-2`}>
                        <PhoneCall className="text-white" size={16} />
                      </div>
                    )}
                  </motion.button>

                  <span className={`font-medium text-lg ${
                    button.isDemo 
                      ? (button.agentType === 'technical-support' ? 'text-purple-400' : 
                         button.agentType === 'reservations' ? 'text-orange-400' :
                         'text-indigo-400')
                      : 'text-white'
                  }`}>
                    {button.label}
                    {button.isDemo && (
                      <span className={`block text-sm ${
                        button.agentType === 'technical-support' ? 'text-purple-300' : 
                        button.agentType === 'reservations' ? 'text-orange-300' :
                        'text-indigo-300'
                      } mt-1`}>
                        ¡Presiona el Botón!
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Demo Completa del Sistema
          </h3>
          <p className="text-gray-300 mb-8">
            ¿Quieres ver todas las funcionalidades? Agenda una demo personalizada con nuestro equipo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2"
            >
              <Phone size={20} />
              <span>Agendar Demo</span>
            </motion.button>
            
            
          </div>
        </motion.div>
      </div>

      {/* Retell Call Interface Modal */}
      <AnimatePresence>
        {activeCallInterface && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeCallInterface();
              }
            }}
          >
            <RetellCallInterface
              agentName={getAgentConfig(activeCallInterface)?.name || 'Agente IA'}
              webhookUrl={getAgentConfig(activeCallInterface)?.url || ''}
              agentColor={getAgentColor(activeCallInterface)}
              onClose={closeCallInterface}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VoiceAgents;