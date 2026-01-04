
import React, { useState, useRef, useEffect } from 'react';

interface SoundOption {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const SOUNDS: SoundOption[] = [
  { id: 'rain', name: 'Rain', icon: 'fa-cloud-showers-heavy', url: 'https://www.soundjay.com/nature/rain-07.mp3' },
  { id: 'forest', name: 'Forest', icon: 'fa-tree', url: 'https://www.soundjay.com/nature/forest-1.mp3' },
  { id: 'ocean', name: 'Ocean', icon: 'fa-water', url: 'https://www.soundjay.com/nature/ocean-wave-1.mp3' },
  { id: 'birds', name: 'Birds', icon: 'fa-dove', url: 'https://www.soundjay.com/nature/sounds/birds-chirping-05.mp3' }
];

interface SoundState {
  playing: boolean;
  volume: number;
}

const Soundscape: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mix, setMix] = useState<Record<string, SoundState>>(() => {
    const saved = localStorage.getItem('arno_sound_mix');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const resetMix: Record<string, SoundState> = {};
        Object.keys(parsed).forEach(key => {
          resetMix[key] = { ...parsed[key], playing: false };
        });
        return resetMix;
      } catch (e) {
        console.error("Failed to parse sound mix", e);
      }
    }
    return SOUNDS.reduce((acc, s) => ({
      ...acc,
      [s.id]: { playing: false, volume: 0.4 }
    }), {});
  });

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    localStorage.setItem('arno_sound_mix', JSON.stringify(mix));
  }, [mix]);

  const toggleSound = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    const isCurrentlyPlaying = mix[id].playing;
    
    if (!isCurrentlyPlaying) {
      audio.volume = mix[id].volume;
      audio.play().catch(err => console.error(`Error playing ${id}:`, err));
    } else {
      audio.pause();
    }

    setMix(prev => ({
      ...prev,
      [id]: { ...prev[id], playing: !isCurrentlyPlaying }
    }));
  };

  const updateVolume = (id: string, volume: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = volume;
    }
    setMix(prev => ({
      ...prev,
      [id]: { ...prev[id], volume }
    }));
  };

  const isAnyPlaying = (Object.values(mix) as SoundState[]).some(s => s.playing);

  return (
    <div className="flex flex-col items-end gap-3 relative">
      {SOUNDS.map(sound => (
        <audio
          key={sound.id}
          ref={el => audioRefs.current[sound.id] = el}
          src={sound.url}
          loop
          crossOrigin="anonymous"
          preload="auto"
        />
      ))}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border border-white/40 dark:border-slate-700/50 backdrop-blur-md ${
          isAnyPlaying 
            ? 'bg-indigo-500 text-white animate-pulse' 
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
        } hover:scale-110 active:scale-95`}
        title="Atmosphere Mixer"
      >
        <i className={`fa-solid ${isAnyPlaying ? 'fa-sliders text-sm sm:text-base' : 'fa-music text-sm sm:text-base'}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-12 sm:top-14 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-4 sm:p-6 rounded-[2rem] shadow-2xl border border-slate-200/50 dark:border-slate-800/50 w-[80vw] max-w-[280px] animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-100 uppercase tracking-widest">Mixer</h4>
              <p className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Arno's peace</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <i className="fa-solid fa-times text-sm"></i>
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {SOUNDS.map((sound) => {
              const state = mix[sound.id];
              return (
                <div key={sound.id} className="space-y-2">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                        state.playing 
                          ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                      }`}>
                        <i className={`fa-solid ${sound.icon} text-xs sm:text-sm`}></i>
                      </div>
                      <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight ${
                        state.playing ? 'text-slate-700 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'
                      }`}>
                        {sound.name}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => toggleSound(sound.id)}
                      className={`text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full transition-all ${
                        state.playing 
                          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {state.playing ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {state.playing && (
                    <div className="flex items-center gap-2 px-1 animate-in slide-in-from-top-1 duration-300">
                      <i className="fa-solid fa-volume-low text-[8px] sm:text-[10px] text-slate-300 dark:text-slate-700"></i>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={state.volume}
                        onChange={(e) => updateVolume(sound.id, parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                      <i className="fa-solid fa-volume-high text-[8px] sm:text-[10px] text-slate-300 dark:text-slate-700"></i>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isAnyPlaying && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-600 italic">Select a sound to begin</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Soundscape;
