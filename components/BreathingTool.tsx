
import React, { useState, useEffect } from 'react';

const BreathingTool: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          switch (phase) {
            case 'Inhale': setPhase('Hold'); return 4;
            case 'Hold': setPhase('Exhale'); return 4;
            case 'Exhale': setPhase('Pause'); return 4;
            case 'Pause': setPhase('Inhale'); return 4;
            default: return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const getScale = () => {
    if (phase === 'Inhale') return 'scale-110 sm:scale-125 bg-blue-100/50 dark:bg-blue-900/20';
    if (phase === 'Hold') return 'scale-110 sm:scale-125 bg-blue-200/50 dark:bg-blue-800/30';
    if (phase === 'Exhale') return 'scale-100 bg-blue-50/50 dark:bg-slate-900/40';
    return 'scale-100 bg-blue-50/50 dark:bg-slate-900/40';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 space-y-8 md:space-y-12 w-full max-w-full overflow-hidden">
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-100 mb-2">Box Breathing</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Focus on the circle. Just follow the rhythm.</p>
      </div>

      <div className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64">
        <div 
          className={`absolute w-full h-full rounded-full transition-all duration-[4000ms] ease-in-out ${getScale()} border border-blue-200 dark:border-blue-800 shadow-inner`}
        />
        <div className="relative z-10 text-center">
          <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 transition-opacity duration-500">{phase}</p>
          <p className="text-base sm:text-lg text-blue-400 dark:text-blue-500">{counter}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md px-4">
        {(['Inhale', 'Hold', 'Exhale', 'Pause'] as const).map((p) => (
          <div 
            key={p} 
            className={`h-1 sm:h-1.5 rounded-full transition-colors duration-500 ${phase === p ? 'bg-blue-400 dark:bg-blue-500 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`}
          />
        ))}
      </div>
      
      <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold pt-4">
        Steady your heart, Arno
      </p>
    </div>
  );
};

export default BreathingTool;
