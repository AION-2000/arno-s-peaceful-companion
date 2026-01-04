
import React, { useState, useRef, useEffect } from 'react';
import { getEmpatheticResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const VentRoom: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => (prev + ' ' + finalTranscript).trim());
        }
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    if (isListening) recognitionRef.current.stop();
    else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (isListening) recognitionRef.current.stop();

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getEmpatheticResponse(input);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm right here, Arno. I might have tripped over my words, but I'm still listening. Tell me more." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[65vh] max-h-[600px] w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="bg-rose-50 dark:bg-rose-900/20 p-4 border-b border-rose-100 dark:border-rose-900/30 flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <i className="fa-solid fa-heart text-xs sm:text-base"></i>
            Heart to Heart with Aion
          </h3>
          <p className="text-[10px] sm:text-xs text-rose-500 dark:text-rose-500/80">I'm right here for you, Arno. Tell me everything.</p>
        </div>
        {isListening && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-500 text-white rounded-full text-[8px] sm:text-[10px] font-bold uppercase animate-pulse">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></span>
            Listening
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 dark:bg-slate-900/20 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 dark:text-slate-500 px-4">
            <i className="fa-solid fa-comments text-3xl sm:text-4xl mb-4 text-rose-200 dark:text-rose-900/40"></i>
            <p className="text-sm sm:text-base">I'm all ears, Arno.<br/>What's on your heart today?</p>
            <p className="text-[10px] sm:text-xs mt-2 italic opacity-60">You can speak to me by clicking the mic.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] sm:max-w-[80%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-rose-500 text-white rounded-br-none shadow-md' 
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 shadow-sm border border-slate-100 dark:border-slate-600 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-600 text-xs sm:text-sm italic">
              Arno, I'm listening...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2 items-center shrink-0">
        <button 
          onClick={toggleListening}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0 ${
            isListening 
            ? 'bg-rose-500 text-white ring-4 ring-rose-100 dark:ring-rose-900/30' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
          title={isListening ? "Stop listening" : "Start speaking"}
        >
          <i className={`fa-solid ${isListening ? 'fa-microphone-lines text-sm sm:text-base' : 'fa-microphone text-sm sm:text-base'}`}></i>
        </button>
        
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isListening ? "Go ahead, Arno..." : "Talk to me..."}
          className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-900 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/50 transition-all text-xs sm:text-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600"
        />
        
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 shrink-0"
        >
          <i className="fa-solid fa-paper-plane text-sm sm:text-base"></i>
        </button>
      </div>
    </div>
  );
};

export default VentRoom;
