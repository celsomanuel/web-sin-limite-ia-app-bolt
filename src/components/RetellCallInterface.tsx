import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Loader2, RefreshCw, AlertCircle, Settings } from 'lucide-react';
import { useRetellWebClient } from '../hooks/useRetellWebClient';

interface RetellCallInterfaceProps {
  agentName: string;
  webhookUrl: string;
  agentColor: {
    bg: string;
    border: string;
    text: string;
    dot: string;
    button: string;
  };
  onClose?: () => void;
}

const RetellCallInterface: React.FC<RetellCallInterfaceProps> = ({
  agentName,
  webhookUrl,
  agentColor,
  onClose
}) => {
  const { callState, startCall, stopCall, formatDuration, clearError, requestMicrophonePermission } = useRetellWebClient();

  const handleStartCall = async () => {
    clearError(); // Clear any previous errors
    
    // Check microphone permission first
    if (callState.microphonePermission !== 'granted') {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }
    }
    
    await startCall(webhookUrl, agentName);
  };

  const handleStopCall = () => {
    stopCall();
    if (onClose) {
      onClose();
    }
  };

  const handleRetry = () => {
    clearError();
    handleStartCall();
  };

  const getMicrophoneStatusMessage = () => {
    switch (callState.microphonePermission) {
      case 'granted':
        return 'Micrófono listo';
      case 'denied':
        return 'Micrófono bloqueado - Se necesita acceso';
      case 'prompt':
        return 'Se solicitará acceso al micrófono';
      case 'checking':
        return 'Verificando micrófono...';
      default:
        return 'Estado del micrófono desconocido';
    }
  };

  const getMicrophoneIcon = () => {
    switch (callState.microphonePermission) {
      case 'granted':
        return <Mic className="text-green-400" size={16} />;
      case 'denied':
        return <MicOff className="text-red-400" size={16} />;
      case 'checking':
        return <Loader2 className="text-yellow-400 animate-spin" size={16} />;
      default:
        return <Settings className="text-gray-400" size={16} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-gradient-to-br ${agentColor.bg} backdrop-blur-xl border ${agentColor.border} rounded-3xl p-8 max-w-md mx-auto`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={callState.isCallActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: callState.isCallActive ? Infinity : 0 }}
          className="relative inline-block mb-4"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            callState.isCallActive ? agentColor.button : 
            callState.error ? 'bg-red-600' : 'bg-gray-700'
          }`}>
            {callState.error ? (
              <AlertCircle className="text-white" size={28} />
            ) : (
              <Phone className="text-white" size={28} />
            )}
          </div>
          
          {callState.isCallActive && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-0 border-2 ${agentColor.border} rounded-full`}
                  animate={{ scale: [1, 2 + i * 0.5], opacity: [0.7, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        <h3 className={`text-2xl font-bold ${agentColor.text} mb-2`}>
          {agentName}
        </h3>
        
        <div className="text-gray-300">
          {callState.isConnecting && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="animate-spin" size={16} />
              <span>Conectando...</span>
            </div>
          )}
          {callState.isCallActive && (
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 ${agentColor.dot} rounded-full animate-pulse`} />
                <span>Llamada activa</span>
              </div>
              <div className="text-sm">
                Duración: {formatDuration(callState.callDuration)}
              </div>
            </div>
          )}
          {!callState.isCallActive && !callState.isConnecting && !callState.error && (
            <span>Listo para llamar</span>
          )}
          {callState.error && (
            <span className="text-red-300">Error de conexión</span>
          )}
        </div>
      </div>

      {/* Microphone Status */}
      <div className="mb-6">
        <div className={`bg-gradient-to-r ${
          callState.microphonePermission === 'granted' ? 'from-green-900/30 to-green-800/30 border-green-500/30' :
          callState.microphonePermission === 'denied' ? 'from-red-900/30 to-red-800/30 border-red-500/30' :
          'from-gray-900/30 to-gray-800/30 border-gray-500/30'
        } border rounded-2xl p-3`}>
          <div className="flex items-center justify-center space-x-2">
            {getMicrophoneIcon()}
            <span className={`text-sm ${
              callState.microphonePermission === 'granted' ? 'text-green-300' :
              callState.microphonePermission === 'denied' ? 'text-red-300' :
              'text-gray-300'
            }`}>
              {getMicrophoneStatusMessage()}
            </span>
          </div>
          
          {callState.microphonePermission === 'denied' && (
            <div className="mt-2 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={requestMicrophonePermission}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                Permitir Micrófono
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Agent Status */}
      <AnimatePresence>
        {callState.isAgentTalking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`bg-gradient-to-r ${agentColor.bg} border ${agentColor.border} rounded-2xl p-4 mb-6 text-center`}
          >
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className={`w-3 h-3 ${agentColor.dot} rounded-full`}
              />
              <span className={`${agentColor.text} font-medium`}>
                El agente está hablando...
              </span>
            </div>
            
            {/* Voice visualization */}
            <div className="flex items-center justify-center space-x-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 ${agentColor.dot} rounded-full`}
                  animate={{ height: [8, 24, 8] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {callState.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-900/50 border border-red-500/50 rounded-2xl p-4 mb-6"
          >
            <div className="text-red-400 text-center">
              <div className="font-semibold mb-2 flex items-center justify-center space-x-2">
                <AlertCircle size={18} />
                <span>Error de conexión</span>
              </div>
              <div className="text-sm mb-4 leading-relaxed">{callState.error}</div>
              
              {/* Retry button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 mx-auto transition-colors"
              >
                <RefreshCw size={14} />
                <span>Reintentar</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Controls */}
      <div className="flex justify-center space-x-4">
        {!callState.isCallActive && !callState.isConnecting ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartCall}
            disabled={!!callState.error || callState.microphonePermission === 'denied'}
            className={`${
              callState.error || callState.microphonePermission === 'denied'
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : `${agentColor.button} hover:shadow-lg`
            } text-white p-4 rounded-full transition-all flex items-center space-x-2 px-6`}
          >
            <Phone size={20} />
            <span>
              {callState.error ? 'Error' : 
               callState.microphonePermission === 'denied' ? 'Micrófono Requerido' :
               'Iniciar Llamada'}
            </span>
          </motion.button>
        ) : (
          <>
            {callState.isConnecting && (
              <motion.button
                disabled
                className="bg-gray-600 text-gray-300 p-4 rounded-full flex items-center space-x-2 px-6"
              >
                <Loader2 className="animate-spin" size={20} />
                <span>Conectando...</span>
              </motion.button>
            )}
            
            {callState.isCallActive && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 text-gray-300 p-4 rounded-full hover:bg-gray-600 transition-colors"
                  title="Silenciar micrófono"
                >
                  <Mic size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 text-gray-300 p-4 rounded-full hover:bg-gray-600 transition-colors"
                  title="Silenciar altavoz"
                >
                  <Volume2 size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStopCall}
                  className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                  title="Finalizar llamada"
                >
                  <PhoneOff size={20} />
                </motion.button>
              </>
            )}
          </>
        )}
      </div>

      {/* Call Info */}
      {callState.callId && (
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-400">
            Call ID: {callState.callId}
          </div>
        </div>
      )}

      {/* Close Button */}
      {onClose && !callState.isCallActive && (
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Cerrar
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default RetellCallInterface;