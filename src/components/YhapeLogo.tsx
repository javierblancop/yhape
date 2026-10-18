import React from 'react';

interface YhapeLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'horizontal' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const YhapeLogo: React.FC<YhapeLogoProps> = ({
  className = '',
  variant = 'compact',
  size = 'md',
}) => {
  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-2xl bg-white border-2 border-amber-500 shadow-md overflow-hidden p-1 ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
        } ${className}`}
      >
        <img
          src="/images/yhape-logo.svg"
          alt="YHAPE Tapas & Picoteo Logo"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={`relative bg-white rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-amber-400 max-w-sm mx-auto overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:border-amber-500 ${className}`}
      >
        <img
          src="/images/yhape-logo.svg"
          alt="YHAPE Tapas & Picoteo by K. Saez"
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
        />
        <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between text-[11px] font-bold text-amber-900 tracking-wider uppercase">
          <span>Torremolinos</span>
          <span className="text-amber-500">✦</span>
          <span>Calle La Nogalera 105</span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-amber-500 p-0.5 shadow-md shrink-0 overflow-hidden">
          <img
            src="/images/yhape-logo.svg"
            alt="YHAPE Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-[#3A1C0E] font-display leading-none">
            YHAPE
          </span>
          <span className="text-[11px] font-black text-amber-600 tracking-[0.2em] uppercase mt-0.5">
            TAPAS &amp; PICOTEO
          </span>
          <span className="text-[11px] text-[#5A2912] font-serif italic font-medium -mt-0.5">
            by K. Saez
          </span>
        </div>
      </div>
    );
  }

  // Default: 'compact' navigation header style
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-amber-500/90 p-0.5 shadow-md shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
        <img
          src="/images/yhape-logo.svg"
          alt="YHAPE Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl sm:text-[26px] font-black tracking-tight text-[#3A1C0E] font-display leading-none group-hover:text-amber-700 transition-colors">
            YHAPE
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        </div>
        <span className="text-[10px] font-extrabold text-amber-600 tracking-[0.18em] uppercase -mt-0.5">
          TAPAS &amp; PICOTEO
        </span>
        <span className="text-[10px] text-[#5A2912] font-serif italic font-semibold -mt-0.5 hidden xs:inline">
          by K. Saez
        </span>
      </div>
    </div>
  );
};
