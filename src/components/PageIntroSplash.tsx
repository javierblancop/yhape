import React, { useState, useEffect } from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const PageIntroSplash: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [fadingOut, setFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Check if splash was already shown in this tab session
    const hasSeenSplash = sessionStorage.getItem('yhape_intro_shown');
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Begin fade-out after 1.8 seconds
    const timerFade = setTimeout(() => {
      setFadingOut(true);
    }, 1800);

    // Completely unmount after transition completes
    const timerDismiss = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('yhape_intro_shown', 'true');
    }, 2500);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerDismiss);
    };
  }, []);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('yhape_intro_shown', 'true');
    }, 400);
  };

  if (!showSplash) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a YHAPE Torremolinos"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#2c241c] via-[#1a140f] to-[#0c2e22] text-white transition-all duration-700 ease-in-out ${
        fadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Logo Card Container */}
      <div className="relative max-w-sm w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-amber-400/60 shadow-2xl text-center space-y-6 transform transition-transform">
        
        {/* Halloween festive badge (Enlarged) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-purple-500 text-stone-950 font-black text-xs uppercase tracking-widest shadow-lg border-2 border-orange-300">
          <span className="text-lg animate-bounce">🎃</span>
          <span>¡FIESTAS DE HALLOWEEN 2026!</span>
          <span className="text-lg">👻</span>
        </div>

        {/* The Official YHAPE Logo with glowing frame */}
        <div className="relative mx-auto w-48 sm:w-56 h-32 sm:h-36 bg-white rounded-2xl p-3 shadow-xl border-2 border-amber-300 flex items-center justify-center">
          <img
            src="/images/yhape-logo.svg"
            alt="Logotipo Oficial YHAPE Tapas & Picoteo"
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform hover:scale-105"
          />
          <span className="absolute -top-3 -right-3 text-3xl animate-bounce">🎃</span>
        </div>

        {/* Slogan and Brand Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            YHAPE TAPAS &amp; PICOTEO
          </h1>
          <p className="text-xs font-bold text-amber-300 tracking-wider uppercase">
            by K. Saez
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-sm text-orange-200 font-extrabold">
            <span className="text-xl">🦇</span>
            <span>Tapas de Terror &amp; Caipirinhas de Vampiro</span>
            <span className="text-xl">🕷️</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">
            Calle La Nogalera, 105 · Torremolinos
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 h-full rounded-full animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>

        {/* Skip button for instant access */}
        <button
          type="button"
          onClick={handleSkip}
          className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer border border-white/20 hover:border-white/40"
        >
          Entrar directamente a la Carta →
        </button>

      </div>
    </div>
  );
};
