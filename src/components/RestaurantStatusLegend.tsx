import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useRestaurantStatus } from '../utils/businessHours';

interface RestaurantStatusLegendProps {
  variant?: 'banner' | 'chip' | 'card';
  className?: string;
}

export const RestaurantStatusLegend: React.FC<RestaurantStatusLegendProps> = ({
  variant = 'chip',
  className = '',
}) => {
  const status = useRestaurantStatus();

  if (variant === 'banner') {
    return (
      <div className={`w-full py-2 px-4 transition-colors ${
        status.status === 'open' 
          ? 'bg-emerald-600 text-white' 
          : status.status === 'kitchen-closed'
            ? 'bg-amber-500 text-stone-950 font-bold'
            : 'bg-stone-900 text-stone-100'
      } ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status.status === 'open' ? 'bg-emerald-300' : status.status === 'kitchen-closed' ? 'bg-amber-300' : 'bg-rose-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                status.status === 'open' ? 'bg-emerald-200' : status.status === 'kitchen-closed' ? 'bg-amber-200' : 'bg-rose-500'
              }`} />
            </span>
            <span className="font-extrabold tracking-wide uppercase">
              {status.status === 'open' ? '¡Local Abierto!' : status.status === 'kitchen-closed' ? 'Últimos Pedidos' : 'Local Cerrado'}
            </span>
            <span className="hidden md:inline font-normal opacity-90">·</span>
            <span className="hidden md:inline font-medium">
              {status.subLegend}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="bg-black/20 px-2.5 py-0.5 rounded-md font-mono">
              ⏰ Horario: 12:30 - 22:00h
            </span>
            <span className="opacity-80">
              Hora local: {status.currentTimeString}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-2xl border-2 transition-all ${status.badgeColor} ${className}`}>
        <div className="flex items-start gap-3">
          <div className="relative flex h-3.5 w-3.5 mt-1 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.dotColor}`} />
            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${status.dotColor}`} />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h4 className="text-sm font-black tracking-tight font-display">
                {status.legend}
              </h4>
              <span className="text-[11px] font-mono font-bold bg-white/70 px-2 py-0.5 rounded-md border border-stone-200">
                Hora actual: {status.currentTimeString}
              </span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {status.subLegend}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default 'chip'
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black shadow-xs ${status.badgeColor} ${className}`}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.dotColor}`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status.dotColor}`} />
      </span>
      <span>{status.shortLabel}</span>
      <span className="text-[11px] font-normal opacity-75 font-mono">
        (12:30 - 22:00)
      </span>
    </div>
  );
};
