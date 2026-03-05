import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getChatbotResponse } from '../../services/aiService';
import { useTranslation } from 'react-i18next';

interface Message {
  text: string;
  isBot: boolean;
}

export function ChatbotWidget() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize messages when language changes or on mount
  useEffect(() => {
    setMessages([
      { text: t('chatbot.welcome'), isBot: true },
      { text: t('chatbot.help_prompt'), isBot: true }
    ]);
  }, [i18n.language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(userMessage);
      setMessages(prev => [...prev, { text: response || t('chatbot.error_response'), isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: t('chatbot.connection_error'), isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ height: '450px' }}
          >
            <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t('chatbot.title')}</h3>
                <p className="text-xs text-blue-200">{t('chatbot.status_online')}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-2xl text-sm shadow-sm max-w-[85%] ${
                    msg.isBot 
                      ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none self-start' 
                      : 'bg-blue-600 text-white rounded-tr-none self-end'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm max-w-[85%] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>{t('chatbot.typing')}</span>
                </div>
              )}
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot.placeholder')} 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center w-10 h-10 shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 ml-auto"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
