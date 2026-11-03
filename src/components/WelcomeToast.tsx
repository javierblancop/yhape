import React, { useState, useEffect } from 'react';
import { Utensils, X, Sparkles, ArrowRight, Heart } from 'lucide-react';

interface WelcomeToastProps {
  onNavigateToMenu?: () => void;
}

export const WelcomeToast: React.FC<WelcomeToastProps> = ({ onNavigateToMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('yhape_welcome_toast_dismissed');
    if (dismissed) {
      return;
    }

    // Trigger toast after exactly 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('yhape_welcome_toast_dismissed', 'true');
  };

  const handleGoToMenu = () => {
    handleDismiss();
    if (onNavigateToMenu) {
      onNavigateToMenu();
    } else {
      const menuSection = document.getElementById('menu') || document.getElementById('carta');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-24 right-4 sm:right-6 sm:bottom-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-amber-400 ring-4 ring-amber-100 transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-6"
    >
      {/* Top Banner Tag (Enlarged) */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-red-200">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-red-200 via-amber-200 to-emerald-200 px-3 py-1 rounded-full border border-red-300 shadow-xs">
          <span className="text-base animate-bounce">🎄</span>
          <span>¡Especial Fiestas de Navidad!</span>
          <span className="text-base">⭐</span>
        </span>
        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-3.5">
        {/* YHAPE Official Logo Emblem */}
        <div className="w-13 h-13 rounded-2xl bg-amber-50 border-2 border-red-400 p-1 shrink-0 overflow-hidden shadow-xs flex items-center justify-center relative">
          <img
            src="/images/yhape-logo.svg"
            alt="YHAPE Logo"
            className="w-full h-full object-contain"
          />
          <span className="absolute -top-1.5 -right-1.5 text-base animate-pulse">🎄</span>
        </div>

        <div className="space-y-1 flex-1">
          <h4 className="text-sm font-black text-stone-900 font-display leading-tight flex items-center gap-1.5">
            YHAPE Tapas &amp; Picoteo
            <span className="text-sm">🎅</span>
          </h4>
          <p className="text-[10px] text-red-700 font-extrabold uppercase tracking-wider">
            by K. Saez · Calle La Nogalera
          </p>
          <p className="text-xs text-stone-600 leading-snug pt-0.5 font-medium">
            ¡Celebra las fiestas con nosotros! Edición especial: <strong className="text-red-950">Banquete Navideño Brasileño</strong>, caipirinhas festivas y catering para tus cenas.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2">
        <button
          onClick={handleGoToMenu}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 hover:from-red-700 hover:to-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform hover:scale-102 cursor-pointer"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Ver Menú &amp; Navidad 🎄</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleDismiss}
          className="px-3 py-2 text-xs font-bold text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
        >
          Más tarde
        </button>
      </div>
    </div>
  );
};
