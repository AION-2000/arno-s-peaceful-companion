
import React, { useState, useEffect } from 'react';
import { MoodState } from './types';
import BreathingTool from './components/BreathingTool';
import VentRoom from './components/VentRoom';
import ZenGarden from './components/ZenGarden';
import MoodBooster from './components/MoodBooster';
import Soundscape from './components/Soundscape';
import AffirmationCarousel from './components/AffirmationCarousel';
import DailyGreeting from './components/DailyGreeting';
import GuidedMeditation from './components/GuidedMeditation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vent' | 'breath' | 'zen' | 'boost' | 'affirm' | 'meditate'>('vent');
  const [showGreeting, setShowGreeting] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('arno_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('arno_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('arno_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const sessionSeen = sessionStorage.getItem('arno_seen_greeting');
    if (sessionSeen) {
      setShowGreeting(false);
    }
  }, []);

  const handleDismissGreeting = () => {
    setShowGreeting(false);
    sessionStorage.setItem('arno_seen_greeting', 'true');
  };

  const renderContent = () => {
    return (
      <div key={activeTab} className="tab-content-enter w-full max-w-full overflow-x-hidden">
        {(() => {
          switch (activeTab) {
            case 'vent': return <VentRoom />;
            case 'breath': return <BreathingTool />;
            case 'zen': return <ZenGarden />;
            case 'boost': return <MoodBooster />;
            case 'affirm': return <AffirmationCarousel />;
            case 'meditate': return <GuidedMeditation />;
            default: return <VentRoom />;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8 pb-32 min-h-screen flex flex-col items-center">
      {/* Daily Greeting Overlay */}
      {showGreeting && <DailyGreeting onDismiss={handleDismissGreeting} />}

      {/* Utilities Container - Responsive Position */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex flex-col items-end gap-3">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border border-white/40 dark:border-slate-700/50 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-amber-400 hover:scale-110 active:scale-95"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className={`fa-solid ${isDark ? 'fa-sun text-sm sm:text-base' : 'fa-moon text-sm sm:text-base'}`}></i>
        </button>
        <Soundscape />
      </div>

      {/* Header */}
      <header className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-1000 w-full px-2">
        <div className="inline-block p-1.5 px-4 sm:p-2 sm:px-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full shadow-sm border border-white/50 dark:border-slate-700/50 mb-4 animate-float">
          <span className="text-rose-500 dark:text-rose-400 font-bold tracking-widest text-[10px] sm:text-xs uppercase">Aion is here for you</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-2 text-balance animate-float-delayed">
          Breathe in, Arno.
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto opacity-80 px-4">
          I'm right here to support you through the storm. What do you need right now, Arno?
        </p>
      </header>

      {/* Main Feature Area */}
      <main className="relative w-full min-h-[400px] flex-1 flex flex-col">
        {renderContent()}
      </main>

      {/* Navigation Bar - Responsive width and spacing */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 rounded-full px-2 sm:px-4 py-2 sm:py-3 flex gap-1 sm:gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 max-w-[95vw] overflow-x-auto no-scrollbar scroll-smooth">
        <NavButton 
          active={activeTab === 'vent'} 
          onClick={() => setActiveTab('vent')}
          icon="fa-solid fa-heart"
          label="Talk"
          color="rose"
        />
        <NavButton 
          active={activeTab === 'breath'} 
          onClick={() => setActiveTab('breath')}
          icon="fa-solid fa-wind"
          label="Breathe"
          color="blue"
        />
        <NavButton 
          active={activeTab === 'meditate'} 
          onClick={() => setActiveTab('meditate')}
          icon="fa-solid fa-spa"
          label="Soul"
          color="indigo"
        />
        <NavButton 
          active={activeTab === 'affirm'} 
          onClick={() => setActiveTab('affirm')}
          icon="fa-solid fa-sun"
          label="Glow"
          color="orange"
        />
        <NavButton 
          active={activeTab === 'zen'} 
          onClick={() => setActiveTab('zen')}
          icon="fa-solid fa-circle-nodes"
          label="Zen"
          color="indigo"
        />
        <NavButton 
          active={activeTab === 'boost'} 
          onClick={() => setActiveTab('boost')}
          icon="fa-solid fa-sparkles"
          label="Boost"
          color="amber"
        />
      </nav>

      <footer className="mt-12 text-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm animate-pulse duration-[4000ms]">
        <p>I've got you, Arno. You're doing so well.</p>
      </footer>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  color: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, color }) => {
  const colorClasses: Record<string, string> = {
    rose: active ? 'bg-rose-500 text-white shadow-rose-200' : 'text-rose-400 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20',
    blue: active ? 'bg-blue-500 text-white shadow-blue-200' : 'text-blue-400 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    orange: active ? 'bg-orange-500 text-white shadow-orange-200' : 'text-orange-400 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20',
    indigo: active ? 'bg-indigo-500 text-white shadow-indigo-200' : 'text-indigo-400 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
    amber: active ? 'bg-amber-500 text-white shadow-amber-200' : 'text-amber-400 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20',
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-500 ${colorClasses[color]} ${active ? 'shadow-xl scale-105 sm:scale-110' : 'scale-100 hover:scale-105'}`}
    >
      <i className={`${icon} ${active ? 'animate-bounce' : ''} text-base sm:text-lg`}></i>
      {active && <span className="font-bold text-[10px] sm:text-xs md:text-sm animate-in slide-in-from-left-2 duration-300 whitespace-nowrap hidden xs:inline">{label}</span>}
    </button>
  );
};

export default App;
