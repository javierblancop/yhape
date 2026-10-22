import React from 'react';

interface SpiderwebGraphicProps {
  className?: string;
  variant?: 'corner-top-left' | 'corner-top-right' | 'corner-bottom-left' | 'corner-bottom-right' | 'center';
  color?: string;
  hasSpider?: boolean;
}

export const SpiderwebGraphic: React.FC<SpiderwebGraphicProps> = ({
  className = 'w-32 h-32',
  variant = 'corner-top-right',
  color = 'currentColor',
  hasSpider = false,
}) => {
  // Flip classes based on corner variant
  let transformClass = '';
  if (variant === 'corner-top-left') transformClass = 'scale-x-[-1]';
  else if (variant === 'corner-bottom-right') transformClass = 'scale-y-[-1]';
  else if (variant === 'corner-bottom-left') transformClass = 'scale-[-1]';

  return (
    <div className={`relative pointer-events-none select-none ${transformClass} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      >
        {/* Radial structural spokes */}
        <line x1="0" y1="0" x2="120" y2="120" stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />
        <line x1="0" y1="0" x2="60" y2="120" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="0" y1="0" x2="120" y2="60" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="0" y1="0" x2="30" y2="120" stroke={color} strokeWidth="1.1" strokeOpacity="0.75" />
        <line x1="0" y1="0" x2="120" y2="30" stroke={color} strokeWidth="1.1" strokeOpacity="0.75" />
        <line x1="0" y1="0" x2="90" y2="120" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="120" y2="90" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="120" y2="0" stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />
        <line x1="0" y1="0" x2="0" y2="120" stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />

        {/* Concentric curved webbing arcs (Ring 1 - Inner) */}
        <path
          d="M 18 0 Q 18 18 0 18"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.85"
        />
        {/* Ring 2 */}
        <path
          d="M 36 0 Q 36 36 0 36"
          stroke={color}
          strokeWidth="1.3"
          strokeOpacity="0.85"
        />
        {/* Ring 3 */}
        <path
          d="M 54 0 Q 54 54 0 54"
          stroke={color}
          strokeWidth="1.4"
          strokeOpacity="0.85"
        />
        {/* Ring 4 */}
        <path
          d="M 72 0 Q 72 72 0 72"
          stroke={color}
          strokeWidth="1.4"
          strokeOpacity="0.9"
        />
        {/* Ring 5 */}
        <path
          d="M 90 0 Q 90 90 0 90"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.9"
        />
        {/* Ring 6 */}
        <path
          d="M 108 0 Q 108 108 0 108"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.95"
        />
        {/* Ring 7 - Outer edge */}
        <path
          d="M 120 15 Q 115 115 15 120"
          stroke={color}
          strokeWidth="1.6"
          strokeOpacity="0.95"
        />

        {/* Additional decorative cross-threads */}
        <path
          d="M 27 0 Q 26 27 0 27"
          stroke={color}
          strokeWidth="0.9"
          strokeOpacity="0.7"
        />
        <path
          d="M 45 0 Q 43 45 0 45"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.75"
        />
        <path
          d="M 63 0 Q 60 63 0 63"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.75"
        />
        <path
          d="M 81 0 Q 77 81 0 81"
          stroke={color}
          strokeWidth="1.1"
          strokeOpacity="0.8"
        />
        <path
          d="M 99 0 Q 94 99 0 99"
          stroke={color}
          strokeWidth="1.1"
          strokeOpacity="0.8"
        />
      </svg>

      {/* Optional Spider perched on the web */}
      {hasSpider && (
        <div className="absolute bottom-2 right-2 text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
          🕷️
        </div>
      )}
    </div>
  );
};
