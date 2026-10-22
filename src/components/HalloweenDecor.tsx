import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpiderwebGraphic } from './SpiderwebGraphic';

export const HalloweenDecor: React.FC = () => {
  const [decorVisible, setDecorVisible] = useState(true);

  return (
    <>
      {/* Mini Toggle Floating Button (Allows user to hide/show decor if desired) */}
      <button
        onClick={() => setDecorVisible(!decorVisible)}
        className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-40 bg-stone-950/90 hover:bg-stone-900 text-orange-400 hover:text-orange-300 border-2 border-orange-500/80 p-2 sm:px-3 sm:py-2 rounded-2xl shadow-2xl backdrop-blur-md text-[11px] font-black flex items-center gap-1.5 transition-all transform hover:scale-105 cursor-pointer pointer-events-auto"
        title="Mostrar u ocultar motivos y telarañas de Halloween"
        aria-label="Alternar motivos de Halloween"
      >
        <span className="text-base sm:text-lg animate-bounce">🕸️</span>
        <span className="hidden sm:inline">Halloween &amp; Telarañas</span>
        {decorVisible ? (
          <span className="text-[10px] bg-orange-500 text-stone-950 font-black px-1.5 py-0.5 rounded-full">Activo</span>
        ) : (
          <span className="text-[10px] bg-stone-700 text-stone-300 font-bold px-1.5 py-0.5 rounded-full">Oculto</span>
        )}
      </button>

      {decorVisible && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
          
          {/* ======================================================== */}
          {/* 1. REALISTIC CORNER SPIDERWEBS (High visibility & detail) */}
          {/* ======================================================== */}
          
          {/* Top-Right Big Spiderweb with Glowing Effect */}
          <div className="absolute top-0 right-0 w-48 sm:w-80 h-48 sm:h-80 opacity-65 select-none pointer-events-none transition-all">
            <SpiderwebGraphic
              variant="corner-top-right"
              color="#f97316"
              className="w-full h-full filter drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]"
            />
          </div>

          {/* Top-Left Big Spiderweb with Purple Halloween Glow */}
          <div className="absolute top-0 left-0 w-44 sm:w-72 h-44 sm:h-72 opacity-60 select-none pointer-events-none transition-all">
            <SpiderwebGraphic
              variant="corner-top-left"
              color="#c084fc"
              className="w-full h-full filter drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]"
            />
          </div>

          {/* Bottom-Right Corner Spiderweb with Perched Spider */}
          <div className="absolute bottom-16 sm:bottom-0 right-0 w-36 sm:w-60 h-36 sm:h-60 opacity-55 select-none pointer-events-none transition-all">
            <SpiderwebGraphic
              variant="corner-bottom-right"
              color="#fb923c"
              hasSpider={true}
              className="w-full h-full filter drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]"
            />
          </div>

          {/* Bottom-Left Corner Spiderweb */}
          <div className="absolute bottom-16 sm:bottom-0 left-0 w-36 sm:w-56 h-36 sm:h-56 opacity-50 select-none pointer-events-none transition-all">
            <SpiderwebGraphic
              variant="corner-bottom-left"
              color="#e879f9"
              className="w-full h-full filter drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]"
            />
          </div>

          {/* Hanging Animated Spider from top-right web on silk thread */}
          <motion.div
            initial={{ y: -60 }}
            animate={{
              y: [0, 55, 20, 75, 0],
              rotate: [-6, 10, -8, 6, -6],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'easeInOut',
            }}
            className="absolute top-0 right-16 sm:right-36 flex flex-col items-center select-none z-30"
          >
            {/* Silken spider thread */}
            <div className="w-[1.5px] h-24 sm:h-40 bg-orange-300/80 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
            <span className="text-3xl sm:text-5xl filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] transform -translate-y-2">
              🕷️
            </span>
          </motion.div>

          {/* Second Spider climbing on the left web */}
          <motion.div
            initial={{ y: 20 }}
            animate={{
              y: [0, 35, 10, 0],
              x: [0, 15, -5, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute top-12 left-16 sm:left-32 flex flex-col items-center select-none z-30"
          >
            <div className="w-[1.5px] h-14 sm:h-24 bg-purple-300/80 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
            <span className="text-2xl sm:text-4xl filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transform -translate-y-1">
              🕷️
            </span>
          </motion.div>

          {/* ======================================================== */}
          {/* 2. PROMINENT FLOATING JACK-O'-LANTERN (Extra Large & Glow) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              y: [0, -22, 6, 0],
              rotate: [-6, 6, -4, 0],
              scale: [1, 1.08, 0.98, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: 'easeInOut',
            }}
            className="absolute top-36 sm:top-44 left-3 sm:left-10 select-none z-30"
          >
            <div className="relative group">
              <span className="text-5xl sm:text-7xl filter drop-shadow-[0_0_25px_rgba(249,115,22,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                🎃
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-black bg-stone-950/85 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500 whitespace-nowrap shadow-lg">
                ¡Halloween YHAPE!
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 3. PROMINENT FLOATING GHOST (Extra Large & Spooky Glow)   */}
          {/* ======================================================== */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [0, -30, 8, 0],
              x: [0, -18, 12, 0],
              rotate: [0, -8, 6, 0],
              scale: [1, 1.05, 0.97, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: 'easeInOut',
            }}
            className="absolute top-44 sm:top-52 right-3 sm:right-12 select-none z-30"
          >
            <div className="relative">
              <span className="text-5xl sm:text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.95)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                👻
              </span>
              <span className="absolute -top-3 -right-2 text-2xl sm:text-3xl animate-pulse">
                ✨
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 4. LARGE FLYING BATS ACROSS THE SCREEN                   */}
          {/* ======================================================== */}
          {/* Bat Top Left */}
          <motion.div
            initial={{ x: -20, y: 40, opacity: 0 }}
            animate={{
              x: [0, 45, 10, 0],
              y: [0, -25, 15, 0],
              rotate: [-12, 12, -8, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6.5,
              ease: 'easeInOut',
            }}
            className="absolute top-20 sm:top-28 left-20 sm:left-40 select-none z-30"
          >
            <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]">
              🦇
            </span>
          </motion.div>

          {/* Bat Mid-Right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [0, -35, 15, 0],
              y: [0, -20, 10, 0],
              rotate: [8, -14, 6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            className="absolute top-[52%] right-4 sm:right-16 select-none z-30"
          >
            <div className="relative">
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_18px_rgba(249,115,22,0.85)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
                🦇
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 5. MID-PAGE EXTRA JACK-O'-LANTERN & CANDY                */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -16, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute top-[68%] left-3 sm:left-12 select-none z-30"
          >
            <div className="flex items-center gap-1">
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_20px_rgba(249,115,22,0.9)]">
                🎃
              </span>
              <span className="text-2xl sm:text-4xl animate-bounce filter drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
                🍬
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 6. BOTTOM GHOST & MOON MOTIF                             */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [0, 20, 0],
              y: [0, -18, 0],
              rotate: [-4, 6, -4],
            }}
            transition={{
              repeat: Infinity,
              duration: 7.5,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-28 right-4 sm:right-20 select-none z-30"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-5xl filter drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">
                🌕
              </span>
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]">
                👻
              </span>
            </div>
          </motion.div>

        </div>
      )}
    </>
  );
};
