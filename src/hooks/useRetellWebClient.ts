import { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

export interface CallState {
  isCallActive: boolean;
  isConnecting: boolean;
  isAgentTalking: boolean;
  callId: string | null;
  error: string | null;
  callDuration: number;
  microphonePermission: 'granted' | 'denied' | 'prompt' | 'checking';
}

export const useRetellWebClient = () => {
  const retellWebClient = useRef<RetellWebClient | null>(null);
  const [callState, setCallState] = useState<CallState>({
    isCallActive: false,
    isConnecting: false,
    isAgentTalking: false,
    callId: null,
    error: null,
    callDuration: 0,
    microphonePermission: 'prompt'
  });
  const callStartTime = useRef<number | null>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  // Check microphone permissions
  const checkMicrophonePermission = async () => {
    try {
      setCallState(prev => ({ ...prev, microphonePermission: 'checking' }));
      
      // Check if navigator.permissions is available
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setCallState(prev => ({ ...prev, microphonePermission: permission.state as any }));
        
        // Listen for permission changes
        permission.onchange = () => {
          setCallState(prev => ({ ...prev, microphonePermission: permission.state as any }));
        };
        
        return permission.state === 'granted';
      } else {
        // Fallback: try to access microphone directly
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
          setCallState(prev => ({ ...prev, microphonePermission: 'granted' }));
          return true;
        } catch (error) {
          setCallState(prev => ({ ...prev, microphonePermission: 'denied' }));
          return false;
        }
      }
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      setCallState(prev => ({ ...prev, microphonePermission: 'denied' }));
      return false;
    }
  };

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      console.log('🎤 Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000
        } 
      });
      
      // Keep the stream active briefly to ensure permission is granted
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 1000);
      
      setCallState(prev => ({ ...prev, microphonePermission: 'granted' }));
      console.log('✅ Microphone permission granted');
      return true;
    } catch (error) {
      console.error('❌ Microphone permission denied:', error);
      setCallState(prev => ({ 
        ...prev, 
        microphonePermission: 'denied',
        error: 'Se necesita acceso al micrófono para realizar llamadas. Por favor, permite el acceso al micrófono en tu navegador.'
      }));
      return false;
    }
  };

  useEffect(() => {
    // Check microphone permission on mount
    checkMicrophonePermission();

    // Initialize Retell Web Client with enhanced configuration
    try {
      retellWebClient.current = new RetellWebClient();
      console.log('🚀 Retell Web Client initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Retell Web Client:', error);
      setCallState(prev => ({
        ...prev,
        error: 'Error al inicializar el cliente de voz. Por favor, recarga la página.'
      }));
      return;
    }

    // Set up event listeners
    const client = retellWebClient.current;

    client.on('call_connecting', () => {
      console.log('🔄 Call connecting...');
      setCallState(prev => ({
        ...prev,
        isConnecting: true,
        error: null
      }));
    });

    client.on('call_started', () => {
      console.log('📞 Call started successfully');
      callStartTime.current = Date.now();
      
      setCallState(prev => ({
        ...prev,
        isCallActive: true,
        isConnecting: false,
        error: null
      }));

      // Start duration timer
      durationInterval.current = setInterval(() => {
        if (callStartTime.current) {
          const duration = Math.floor((Date.now() - callStartTime.current) / 1000);
          setCallState(prev => ({ ...prev, callDuration: duration }));
        }
      }, 1000);
    });

    client.on('call_ended', () => {
      console.log('📴 Call ended');
      
      setCallState(prev => ({
        ...prev,
        isCallActive: false,
        isConnecting: false,
        isAgentTalking: false,
        callId: null,
        callDuration: 0
      }));

      callStartTime.current = null;
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
    });

    client.on('user_start_talking', () => {
      console.log('🎤 User started talking');
      setCallState(prev => ({ ...prev, isAgentTalking: false }));
    });

    client.on('user_stop_talking', () => {
      console.log('🤐 User stopped talking');
    });

    client.on('agent_start_talking', () => {
      console.log('🗣️ Agent started talking');
      setCallState(prev => ({ ...prev, isAgentTalking: true }));
    });

    client.on('agent_stop_talking', () => {
      console.log('🤐 Agent stopped talking');
      setCallState(prev => ({ ...prev, isAgentTalking: false }));
    });

    client.on('audio', (audio) => {
      console.log('🔊 Audio event:', audio);
    });

    client.on('update', (update) => {
      console.log('📊 Call update:', update);
    });

    client.on('error', (error) => {
      console.error('❌ Retell error occurred:', error);
      
      let errorMessage = 'Ocurrió un error durante la llamada';
      
      if (error.message?.includes('microphone') || error.message?.includes('audio')) {
        errorMessage = 'Error de micrófono. Verifica que el micrófono esté conectado y que hayas dado permisos.';
      } else if (error.message?.includes('network') || error.message?.includes('connection')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setCallState(prev => ({
        ...prev,
        error: errorMessage,
        isConnecting: false
      }));

      // Auto-stop call on error
      if (client) {
        client.stopCall();
      }
    });

    // Cleanup on unmount
    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
      if (client) {
        client.stopCall();
      }
    };
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startCall = async (webhookUrl: string, agentName: string) => {
    if (!retellWebClient.current) {
      console.error('❌ Retell client not initialized');
      setCallState(prev => ({
        ...prev,
        error: 'Sistema no inicializado. Por favor, recarga la página.',
        isConnecting: false
      }));
      return;
    }

    // Check and request microphone permission before starting call
    console.log('🎤 Checking microphone permission before call...');
    const hasPermission = await requestMicrophonePermission();
    
    if (!hasPermission) {
      console.error('❌ Microphone permission required');
      return;
    }

    try {
      console.log(`🔄 Starting call with ${agentName}...`);
      
      setCallState(prev => ({
        ...prev,
        isConnecting: true,
        error: null
      }));

      // Retry logic for webhook calls
      let lastError: Error | null = null;
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`📡 Calling webhook (attempt ${attempt}/${maxRetries}): ${webhookUrl}`);
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

          const response = await fetch(webhookUrl, {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              action: 'initiate_retell_call',
              agent_name: agentName,
              timestamp: new Date().toISOString(),
              source: 'website_retell_integration',
              attempt: attempt,
              client_info: {
                url: window.location.href,
                userAgent: navigator.userAgent,
                microphonePermission: callState.microphonePermission,
                audioContext: typeof AudioContext !== 'undefined' ? 'supported' : 'not_supported'
              }
            }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          console.log(`📊 Webhook response status: ${response.status}`);

          if (!response.ok) {
            let errorText = '';
            let errorDetails = '';
            
            try {
              const responseText = await response.text();
              errorText = responseText;
              
              // Try to parse as JSON for more details
              try {
                const errorJson = JSON.parse(responseText);
                errorDetails = errorJson.message || errorJson.error || responseText;
              } catch {
                errorDetails = responseText;
              }
            } catch {
              errorDetails = 'No se pudo obtener detalles del error';
            }

            // Provide more specific error messages based on status code
            let userMessage = '';
            let shouldRetry = true;

            switch (response.status) {
              case 500:
                userMessage = attempt < maxRetries 
                  ? `El servidor del agente está experimentando problemas. Reintentando... (${attempt}/${maxRetries})`
                  : 'El agente no está disponible en este momento. El servidor está experimentando problemas técnicos.';
                break;
              case 502:
              case 503:
                userMessage = attempt < maxRetries
                  ? `El servicio no está disponible temporalmente. Reintentando... (${attempt}/${maxRetries})`
                  : 'El servicio del agente no está disponible. Por favor, intenta más tarde.';
                break;
              case 504:
                userMessage = attempt < maxRetries
                  ? `Tiempo de espera agotado. Reintentando... (${attempt}/${maxRetries})`
                  : 'El servidor tardó demasiado en responder. Por favor, intenta más tarde.';
                break;
              case 404:
                userMessage = 'El agente solicitado no fue encontrado. Verifica la configuración.';
                shouldRetry = false;
                break;
              case 429:
                userMessage = attempt < maxRetries
                  ? `Demasiadas solicitudes. Esperando antes de reintentar... (${attempt}/${maxRetries})`
                  : 'Demasiadas solicitudes. Por favor, espera unos minutos antes de intentar nuevamente.';
                break;
              case 401:
              case 403:
                userMessage = 'Error de autorización. Contacta al soporte técnico.';
                shouldRetry = false;
                break;
              default:
                userMessage = attempt < maxRetries
                  ? `Error del servidor (${response.status}). Reintentando... (${attempt}/${maxRetries})`
                  : `Error del servidor (${response.status}). Por favor, contacta al soporte técnico.`;
            }

            // Update UI with current attempt status
            if (attempt < maxRetries && shouldRetry) {
              setCallState(prev => ({
                ...prev,
                error: userMessage
              }));
            }

            const error = new Error(userMessage);
            error.name = `WebhookError${response.status}`;
            (error as any).status = response.status;
            (error as any).details = errorDetails;
            (error as any).shouldRetry = shouldRetry;
            
            throw error;
          }

          const data = await response.json();
          console.log('📋 Webhook response:', data);

          // Validate response format
          if (!data.access_token) {
            throw new Error('Token de acceso no recibido del servidor. El agente puede estar mal configurado.');
          }

          console.log(`🎫 Access token received, starting Retell call...`);
          
          // Start the call with Retell
          await retellWebClient.current.startCall({
            accessToken: data.access_token,
            // Enhanced audio configuration
            audioConfig: {
              sampleRate: 48000,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });

          setCallState(prev => ({
            ...prev,
            callId: data.call_id || null
          }));

          console.log('✅ Call initiated successfully');
          return; // Success, exit retry loop

        } catch (error) {
          lastError = error as Error;
          console.error(`❌ Attempt ${attempt} failed:`, error);

          // Handle fetch-specific errors (CORS, network, etc.)
          if (error instanceof TypeError && error.message === 'Failed to fetch') {
            const corsError = new Error(
              attempt < maxRetries
                ? `Problema de conexión con el servidor. Reintentando... (${attempt}/${maxRetries})`
                : 'No se puede conectar con el servidor del agente. Esto puede deberse a: 1) El servidor n8n no está disponible, 2) Problemas de CORS en el servidor, 3) Tu conexión a internet. Por favor, contacta al administrador del sistema.'
            );
            corsError.name = 'CORSError';
            (corsError as any).shouldRetry = true;
            lastError = corsError;

            // Update UI with current attempt status
            if (attempt < maxRetries) {
              setCallState(prev => ({
                ...prev,
                error: corsError.message
              }));
            }
          }

          // Check if we should retry
          const shouldRetry = (error as any).shouldRetry !== false;

          // If this is the last attempt or we shouldn't retry, don't wait
          if (attempt === maxRetries || !shouldRetry) {
            break;
          }

          // Wait before retrying, with exponential backoff
          const delay = retryDelay * Math.pow(1.5, attempt - 1);
          console.log(`⏳ Waiting ${delay}ms before retry...`);

          await sleep(delay);
        }
      }

      // If we get here, all retries failed
      throw lastError || new Error('Falló después de múltiples intentos');

    } catch (error) {
      console.error('❌ Failed to start call after all retries:', error);

      let userFriendlyMessage = 'No se pudo conectar con el agente.';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          userFriendlyMessage = 'La conexión tardó demasiado. Verifica tu conexión a internet e intenta nuevamente.';
        } else if (error.name === 'CORSError') {
          // Use the message from CORS errors as they're already user-friendly
          userFriendlyMessage = error.message;
        } else if (error.name?.startsWith('WebhookError')) {
          // Use the message from webhook errors as they're already user-friendly
          userFriendlyMessage = error.message;
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          userFriendlyMessage = 'Error de conexión con el servidor. Posibles causas: 1) El servidor n8n no está disponible, 2) Problemas de configuración CORS, 3) Tu conexión a internet. Contacta al administrador del sistema.';
        } else if (error.message.includes('Token de acceso')) {
          userFriendlyMessage = 'Error de configuración del agente. Por favor, contacta al soporte técnico.';
        } else if (error.message.includes('Falló después de múltiples intentos')) {
          userFriendlyMessage = 'No se pudo establecer la conexión después de varios intentos. El servicio puede estar temporalmente no disponible.';
        } else if (error.message.includes('microphone') || error.message.includes('audio')) {
          userFriendlyMessage = 'Error de micrófono. Asegúrate de que el micrófono esté conectado y funcionando correctamente.';
        } else {
          // For other errors, show a generic message but log the details
          userFriendlyMessage = 'Error inesperado al conectar con el agente. Por favor, intenta nuevamente.';
          console.error('Unexpected error details:', error);
        }
      }

      setCallState(prev => ({
        ...prev,
        isConnecting: false,
        error: userFriendlyMessage
      }));
    }
  };

  const stopCall = () => {
    if (retellWebClient.current) {
      console.log('🛑 Stopping call...');
      retellWebClient.current.stopCall();
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const clearError = () => {
    setCallState(prev => ({ ...prev, error: null }));
  };

  return {
    callState,
    startCall,
    stopCall,
    formatDuration,
    clearError,
    checkMicrophonePermission,
    requestMicrophonePermission
  };
};