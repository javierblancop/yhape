import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChristmasGarland } from './ChristmasGarland';

export const ChristmasDecor: React.FC = () => {
  const [decorVisible, setDecorVisible] = useState(true);

  // Snowflakes with randomized positions, sizes, and delays
  const snowflakes = [
    { id: 1, left: '5%', size: 'text-base sm:text-xl', delay: 0, duration: 11 },
    { id: 2, left: '15%', size: 'text-xs sm:text-sm', delay: 2, duration: 14 },
    { id: 3, left: '25%', size: 'text-lg sm:text-2xl', delay: 4, duration: 10 },
    { id: 4, left: '38%', size: 'text-sm sm:text-base', delay: 1, duration: 13 },
    { id: 5, left: '50%', size: 'text-xl sm:text-3xl', delay: 3, duration: 12 },
    { id: 6, left: '62%', size: 'text-xs sm:text-sm', delay: 5, duration: 15 },
    { id: 7, left: '75%', size: 'text-lg sm:text-2xl', delay: 0.5, duration: 10.5 },
    { id: 8, left: '88%', size: 'text-sm sm:text-base', delay: 2.5, duration: 13.5 },
    { id: 9, left: '95%', size: 'text-base sm:text-xl', delay: 4.5, duration: 11.5 },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setDecorVisible(!decorVisible)}
        className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-40 bg-stone-950/90 hover:bg-stone-900 text-amber-300 hover:text-amber-200 border-2 border-red-500/80 p-2 sm:px-3 sm:py-2 rounded-2xl shadow-2xl backdrop-blur-md text-[11px] font-black flex items-center gap-1.5 transition-all transform hover:scale-105 cursor-pointer pointer-events-auto"
        title="Mostrar u ocultar motivos de Navidad"
        aria-label="Alternar motivos de Navidad"
      >
        <span className="text-base sm:text-lg animate-bounce">🎄</span>
        <span className="hidden sm:inline">Navidad YHAPE</span>
        {decorVisible ? (
          <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded-full">Activo</span>
        ) : (
          <span className="text-[10px] bg-stone-700 text-stone-300 font-bold px-1.5 py-0.5 rounded-full">Oculto</span>
        )}
      </button>

      {decorVisible && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
          
          {/* ======================================================== */}
          {/* 1. CHRISTMAS PINE & BAUBLE GARLANDS IN TOP CORNERS       */}
          {/* ======================================================== */}
          
          {/* Top-Right Christmas Pine Branch & Baubles */}
          <div className="absolute top-0 right-0 w-44 sm:w-72 h-44 sm:h-72 opacity-90 select-none pointer-events-none transition-all">
            <ChristmasGarland
              variant="corner-right"
              className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(220,38,38,0.4)]"
            />
          </div>

          {/* Top-Left Christmas Pine Branch & Baubles */}
          <div className="absolute top-0 left-0 w-44 sm:w-72 h-44 sm:h-72 opacity-90 select-none pointer-events-none transition-all">
            <ChristmasGarland
              variant="corner-left"
              className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(34,197,94,0.4)]"
            />
          </div>

          {/* ======================================================== */}
          {/* 2. GENTLE FLOATING SNOWFLAKES (Winter Torremolinos Glow) */}
          {/* ======================================================== */}
          {snowflakes.map((flake) => (
            <motion.div
              key={flake.id}
              initial={{ y: -40, opacity: 0 }}
              animate={{
                y: ['0vh', '105vh'],
                x: [0, (flake.id % 2 === 0 ? 25 : -25), 0],
                rotate: [0, 360],
                opacity: [0, 0.85, 0.9, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: flake.duration,
                delay: flake.delay,
                ease: 'linear',
              }}
              style={{ left: flake.left }}
              className={`absolute top-0 ${flake.size} text-white/90 select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}
            >
              ❄️
            </motion.div>
          ))}

          {/* ======================================================== */}
          {/* 3. FLOATING CHRISTMAS TREE (Top Left)                    */}
          {/* ======================================================== */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              y: [0, -18, 5, 0],
              rotate: [-4, 5, -3, 0],
              scale: [1, 1.06, 0.98, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: 'easeInOut',
            }}
            className="absolute top-36 sm:top-44 left-3 sm:left-10 select-none z-30"
          >
            <div className="relative group">
              <span className="text-5xl sm:text-7xl filter drop-shadow-[0_0_25px_rgba(34,197,94,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                🎄
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-black bg-stone-950/85 text-amber-300 px-2 py-0.5 rounded-full border border-red-500 whitespace-nowrap shadow-lg">
                ¡Navidad en YHAPE!
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 4. FLOATING SANTA & GIFT (Top Right)                     */}
          {/* ======================================================== */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [0, -26, 6, 0],
              x: [0, -14, 10, 0],
              rotate: [0, -6, 5, 0],
              scale: [1, 1.05, 0.97, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6.5,
              ease: 'easeInOut',
            }}
            className="absolute top-44 sm:top-52 right-3 sm:right-12 select-none z-30"
          >
            <div className="relative">
              <span className="text-5xl sm:text-7xl filter drop-shadow-[0_0_25px_rgba(239,68,68,0.95)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
                🎅
              </span>
              <span className="absolute -top-3 -right-2 text-2xl sm:text-3xl animate-pulse">
                ✨
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 5. FLOATING GOLDEN BELLS & RED BOW (Mid-Page)            */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [0, 25, 0],
              y: [0, -16, 0],
              rotate: [-8, 8, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute top-[52%] left-3 sm:left-14 select-none z-30 hidden md:block"
          >
            <div className="relative flex items-center gap-1">
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_20px_rgba(245,158,11,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                🔔
              </span>
              <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                🎀
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 6. SNOWMAN & GIFT BOX (Mid-Right)                        */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [0, -20, 0],
              y: [0, -18, 0],
              rotate: [5, -5, 5],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
              delay: 1.2,
            }}
            className="absolute top-[68%] right-3 sm:right-14 select-none z-30 hidden md:block"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                ⛄
              </span>
              <span className="text-3xl sm:text-4xl animate-bounce filter drop-shadow-[0_0_15px_rgba(239,68,68,0.85)]">
                🎁
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* 7. BOTTOM SHOOTING STAR & REINDEER                       */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [0, 18, 0],
              y: [0, -15, 0],
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
                ⭐
              </span>
              <span className="text-4xl sm:text-6xl filter drop-shadow-[0_0_20px_rgba(180,83,9,0.9)]">
                🦌
              </span>
            </div>
          </motion.div>

        </div>
      )}
    </>
  );
};
