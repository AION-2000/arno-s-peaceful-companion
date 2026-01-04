
import React, { useState } from 'react';
import { generateMeditationSteps } from '../services/geminiService';

const THEMES = [
  { id: 'anger', label: 'Release Anger', icon: 'fa-fire-burner', color: 'rose' },
  { id: 'calm', label: 'Deep Calm', icon: 'fa-water', color: 'blue' },
  { id: 'sleep', label: 'Restful Mind', icon: 'fa-moon', color: 'indigo' },
  { id: 'love', label: 'Self-Love', icon: 'fa-heart', color: 'pink' },
];

const GuidedMeditation: React.FC = () => {
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const startMeditation = async (themeLabel: string) => {
    setIsLoading(true);
    setActiveTheme(themeLabel);
    try {
      const result = await generateMeditationSteps(themeLabel);
      setSteps(result);
      setCurrentStep(0);
    } catch (error) {
      console.error("Failed to load meditation", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished
      setSteps([]);
      setActiveTheme(null);
    }
  };

  const reset = () => {
    setSteps([]);
    setActiveTheme(null);
    setCurrentStep(0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-100 dark:border-indigo-900/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">Preparing a peaceful space for you, Arno...</p>
      </div>
    );
  }

  if (steps.length > 0) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center animate-in fade-in zoom-in duration-700">
        <div className="mb-8">
          <span className="px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
            {activeTheme}
          </span>
        </div>

        <div className="relative min-h-[250px] flex items-center justify-center px-6">
          <p key={currentStep} className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-100 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {steps[currentStep]}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i === currentStep ? 'w-12 bg-indigo-500' : i < currentStep ? 'w-4 bg-indigo-200 dark:bg-indigo-800' : 'w-4 bg-slate-100 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={reset}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={nextStep}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-700/50 rounded-[2.5rem] p-10 md:p-14 shadow-xl">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Soulful Journeys</h3>
        <p className="text-slate-500 dark:text-slate-400">Arno, pick a guide that speaks to your heart right now.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => startMeditation(t.label)}
            className="flex items-center gap-6 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all group text-left"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              t.color === 'rose' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' :
              t.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' :
              t.color === 'pink' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-500' :
              'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500'
            } group-hover:scale-110 duration-500`}>
              <i className={`fa-solid ${t.icon} text-xl`}></i>
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">{t.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">5-step guided script</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500 italic">
          "The soul usually knows what to do to heal itself. The challenge is to silence the mind."
        </p>
      </div>
    </div>
  );
};

export default GuidedMeditation;
