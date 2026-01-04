
import React, { useState, useEffect } from 'react';

const DAILY_QUOTES = [
  "Today is a new opportunity to choose peace, Arno.",
  "You are capable of navigating any emotion that arises today, Arno.",
  "Arno, your heart is a sanctuary. Keep it calm today.",
  "May your day be as beautiful and resilient as you are, Arno.",
  "Today, Arno, remember that your breath is your anchor.",
  "You don't have to carry everything today, Arno. It's okay to let go.",
  "Arno, trust the process of your own healing and growth.",
  "Let kindness be your guide in every moment today, Arno.",
  "Arno, you are a masterpiece in progress. Be patient with yourself."
];

interface DailyGreetingProps {
  onDismiss: () => void;
}

const DailyGreeting: React.FC<DailyGreetingProps> = ({ onDismiss }) => {
  const [quote, setQuote] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setQuote(DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-1000 ${
      isVisible ? 'bg-white/40 dark:bg-slate-950/60 backdrop-blur-xl opacity-100' : 'bg-transparent backdrop-blur-0 opacity-0'
    }`}>
      <div className={`max-w-xl w-full bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-800/50 shadow-[0_30px_100px_rgba(0,0,0,0.1)] rounded-[3rem] p-12 text-center transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'
      }`}>
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-rose-200 dark:bg-rose-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center relative z-10 mx-auto">
            <i className="fa-solid fa-sun text-3xl text-rose-500 dark:text-rose-400 animate-spin-slow"></i>
          </div>
        </div>

        <h2 className="text-sm font-bold text-rose-400 dark:text-rose-300 uppercase tracking-[0.3em] mb-4">Daily Intention</h2>
        
        <p className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-10 text-balance italic">
          "{quote}"
        </p>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mx-auto mb-10"></div>

        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 800);
          }}
          className="group relative px-10 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full font-bold overflow-hidden transition-all hover:shadow-2xl active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10">Talk to Aion, Arno</span>
        </button>
        
        <p className="mt-6 text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">
          I'm waiting for you inside
        </p>
      </div>
    </div>
  );
};

export default DailyGreeting;
