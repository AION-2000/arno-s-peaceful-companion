
import React, { useState } from 'react';
import { generateCalmingImage } from '../services/geminiService';

const MoodBooster: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('a baby panda eating bamboo');

  const topics = [
    'a tiny kitten sleeping in a bed of flowers',
    'a baby elephant playing with bubbles',
    'a magical forest with glowing mushrooms',
    'a golden retriever puppy running on a beach',
    'a cozy cabin in the mountains with a fireplace'
  ];

  const handleBoost = async (selectedTopic?: string) => {
    setLoading(true);
    const t = selectedTopic || topic;
    const result = await generateCalmingImage(t);
    if (result) setImgUrl(result);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-amber-50 dark:border-amber-900/20 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500">Instant Serenity</h3>
        <p className="text-amber-500 dark:text-amber-600/80">Sometimes you just need to see something beautiful.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => handleBoost(t)}
            disabled={loading}
            className="px-4 py-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors disabled:opacity-50 border border-transparent dark:border-amber-900/30"
          >
            {t.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full max-w-sm mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-inner">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-amber-200 dark:border-amber-900/30 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-amber-600 dark:text-amber-500 font-medium animate-pulse text-sm">Crafting happiness...</p>
          </div>
        ) : imgUrl ? (
          <img src={imgUrl} alt="Calming Visual" className="w-full h-full object-cover animate-in fade-in duration-1000" />
        ) : (
          <div className="text-center p-8">
            <i className="fa-solid fa-wand-magic-sparkles text-4xl text-amber-200 dark:text-amber-900/40 mb-4"></i>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Pick a theme to see something magical</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <button 
          onClick={() => handleBoost()}
          disabled={loading}
          className="bg-amber-500 dark:bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-all active:scale-95 disabled:opacity-50"
        >
          Generate New Happiness
        </button>
      </div>
    </div>
  );
};

export default MoodBooster;
