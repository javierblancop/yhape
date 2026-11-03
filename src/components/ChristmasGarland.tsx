import React from 'react';

interface ChristmasGarlandProps {
  className?: string;
  variant?: 'top-banner' | 'corner-left' | 'corner-right' | 'card-border';
}

export const ChristmasGarland: React.FC<ChristmasGarlandProps> = ({
  className = 'w-full h-8',
  variant = 'top-banner',
}) => {
  if (variant === 'corner-right') {
    return (
      <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          {/* Pine Branch in Corner */}
          <path d="M120 0 Q70 20 50 60 Q30 90 0 100" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <path d="M120 0 Q80 30 70 80 Q60 100 20 120" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
          {/* Pine needles */}
          <path d="M110 5 L95 18 M100 12 L85 24 M90 18 L75 32 M80 26 L65 42 M70 34 L55 52 M60 44 L45 62 M50 56 L35 74 M40 68 L25 86" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M115 15 L102 30 M105 25 L92 40 M95 35 L82 50 M85 45 L72 60 M75 55 L62 70 M65 65 L52 80 M55 75 L42 90" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Hanging Red and Gold Christmas Baubles */}
          <line x1="95" y1="18" x2="95" y2="40" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="95" cy="46" r="8" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="93" cy="44" r="2.5" fill="#fca5a5" />

          <line x1="68" y1="36" x2="68" y2="65" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="68" cy="72" r="9" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="66" cy="70" r="3" fill="#fef9c3" />

          <line x1="42" y1="64" x2="42" y2="92" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="42" cy="98" r="7" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />

          {/* Golden Christmas Star */}
          <path d="M108 8 L110 13 L115 14 L111 18 L112 23 L108 20 L104 23 L105 18 L101 14 L106 13 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  if (variant === 'corner-left') {
    return (
      <div className={`pointer-events-none select-none scale-x-[-1] ${className}`} aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          <path d="M120 0 Q70 20 50 60 Q30 90 0 100" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <path d="M120 0 Q80 30 70 80 Q60 100 20 120" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 5 L95 18 M100 12 L85 24 M90 18 L75 32 M80 26 L65 42 M70 34 L55 52 M60 44 L45 62 M50 56 L35 74 M40 68 L25 86" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M115 15 L102 30 M105 25 L92 40 M95 35 L82 50 M85 45 L72 60 M75 55 L62 70 M65 65 L52 80 M55 75 L42 90" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <line x1="95" y1="18" x2="95" y2="40" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="95" cy="46" r="8" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="93" cy="44" r="2.5" fill="#fef9c3" />

          <line x1="68" y1="36" x2="68" y2="65" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="68" cy="72" r="9" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="66" cy="70" r="3" fill="#fca5a5" />

          <line x1="42" y1="64" x2="42" y2="92" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="42" cy="98" r="7" fill="#16a34a" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M108 8 L110 13 L115 14 L111 18 L112 23 L108 20 L104 23 L105 18 L101 14 L106 13 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // Top banner festoon garland
  return (
    <div className={`pointer-events-none select-none flex items-center justify-between overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-sm">
        {/* Curved Garland Rope */}
        <path d="M0 5 Q 125 35, 250 5 Q 375 35, 500 5 Q 625 35, 750 5 Q 875 35, 1000 5" stroke="#15803d" strokeWidth="4" fill="none" />
        <path d="M0 8 Q 125 38, 250 8 Q 375 38, 500 8 Q 625 38, 750 8 Q 875 38, 1000 8" stroke="#166534" strokeWidth="3" fill="none" />

        {/* Baubles hanging at the dips */}
        <circle cx="125" cy="36" r="6" fill="#dc2626" stroke="#fef08a" strokeWidth="1" />
        <circle cx="375" cy="36" r="6" fill="#eab308" stroke="#fef08a" strokeWidth="1" />
        <circle cx="625" cy="36" r="6" fill="#dc2626" stroke="#fef08a" strokeWidth="1" />
        <circle cx="875" cy="36" r="6" fill="#16a34a" stroke="#fef08a" strokeWidth="1" />

        {/* Golden Bows / Stars at the peaks */}
        <circle cx="250" cy="6" r="4" fill="#fbbf24" />
        <circle cx="500" cy="6" r="4" fill="#fbbf24" />
        <circle cx="750" cy="6" r="4" fill="#fbbf24" />
      </svg>
    </div>
  );
};
