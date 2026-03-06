import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: '¡Hola! Soy el asistente virtual de Segunda Mirada. ¿En qué te puedo ayudar hoy?', 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat session to maintain history
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the chat session with system instructions
    chatSessionRef.current = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Eres el asistente virtual de "Segunda Mirada", una plataforma médica que ofrece segundas opiniones de especialistas.
        Responde de forma amable, profesional, empática y muy concisa en español.
        
        Información básica sobre el negocio por defecto:
        - Ofrecemos 3 planes: Urgente (respuesta rápida), Premium (análisis detallado) y Social (con cupo limitado para quienes lo necesitan).
        - El proceso es 100% online: el paciente sube sus estudios médicos y recibe un informe detallado de un especialista.
        - No somos una guardia médica ni atendemos emergencias, somos un servicio de consultoría programada para dar tranquilidad sobre diagnósticos previos.
        - Para empezar, el usuario debe hacer clic en "Iniciar Admisión" en la página principal.
        
        Si te preguntan algo específico sobre un diagnóstico médico, aclara que eres un asistente virtual y que el paciente debe iniciar una admisión para que un médico real evalúe su caso.
        Si no sabes la respuesta a algo, di que pronto un humano podrá responder o invita a iniciar el proceso de admisión.`,
      }
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) throw new Error("Chat session not initialized");

      // Send message to Gemini
      const response = await chatSessionRef.current.sendMessage({ message: userText });
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: response.text || 'Lo siento, no pude procesar tu solicitud.', 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: 'Lo siento, estoy teniendo problemas de conexión. Por favor, intenta más tarde.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50 hover:scale-105 active:scale-95"
            aria-label="Abrir chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente Virtual</h3>
                  <p className="text-xs text-blue-100">Segunda Mirada</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-xs text-slate-500">Escribiendo...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <form 
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-transparent border-none focus:outline-none px-3 text-sm text-slate-700 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
