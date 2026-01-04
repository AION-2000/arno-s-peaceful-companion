
import React, { useState, useEffect } from 'react';

const AFFIRMATIONS = [
  "Arno, you are stronger than the storm you're feeling right now.",
  "It's okay to not be okay, Arno. This feeling is just a visitor, not a resident.",
  "Arno, your peace is worth protecting. Take all the time you need.",
  "You are deeply loved, Arno, exactly as you are in this moment.",
  "Arno, you handle so much with grace, even when it feels heavy.",
  "Your feelings are valid, Arno, but they don't define your whole day.",
  "Arno, take a deep breath. You are safe, you are held, and you are enough.",
  "You don't have to be perfect to be worthy of love and calm, Arno.",
  "Arno, let go of the things you cannot control. Focus on your breath.",
  "You are a light in this world, Arno. Even lights need to rest sometimes.",
  "Arno, be as kind to yourself as you are to the people you love.",
  "This moment is temporary, Arno. Your inner peace is permanent."
];

const AffirmationCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [index]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
      setIsFading(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="relative w-full max-w-lg">
        {/* Decorative Background Elements */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-rose-100 dark:bg-rose-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[2.5rem] p-12 shadow-2xl border border-white/40 dark:border-slate-700/50 text-center min-h-[300px] flex flex-col items-center justify-center relative z-10 overflow-hidden">
          <i className="fa-solid fa-quote-left text-4xl text-rose-200 dark:text-rose-900/40 mb-6"></i>
          
          <p className={`text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-100 leading-relaxed transition-all duration-500 transform ${
            isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {AFFIRMATIONS[index]}
          </p>

          <i className="fa-solid fa-quote-right text-4xl text-rose-200 dark:text-rose-900/40 mt-6 self-end"></i>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-100 dark:hover:border-rose-900/30 transition-all shadow-sm active:scale-90"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <div className="flex gap-1.5">
          {AFFIRMATIONS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-6 bg-rose-400 dark:bg-rose-500' : 'w-1.5 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-100 dark:hover:border-rose-900/30 transition-all shadow-sm active:scale-90"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
        Gentle reminders for your heart
      </p>
    </div>
  );
};

export default AffirmationCarousel;
