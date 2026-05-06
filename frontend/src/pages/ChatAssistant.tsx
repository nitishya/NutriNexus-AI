import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { askAssistant } from '../services/api';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your NutriNexus AI assistant. How can I help you today?', time: '12:00 PM' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askAssistant('user_123', input);
      const botMessage = { 
        role: 'bot', 
        text: response.recommendation, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reasoning: response.reasoning
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
    >
      {/* Header */}
      <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">NutriNexus AI</h2>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-primary-100 text-primary-700'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-slate-400 px-1">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none animate-pulse text-slate-400 text-sm">
              AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="relative flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your diet..."
            className="flex-1 p-4 pr-12 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatAssistant;
