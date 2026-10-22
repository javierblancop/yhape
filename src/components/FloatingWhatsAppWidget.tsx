import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Calendar, X, Sparkles, Phone, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FloatingWhatsAppWidgetProps {
  onOpenReservation: () => void;
}

export const FloatingWhatsAppWidget: React.FC<FloatingWhatsAppWidgetProps> = ({
  onOpenReservation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end">
      {/* Expanded Quick Action Popover */}
      {isOpen && (
        <div 
          className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          role="dialog"
          aria-label="Atención por WhatsApp"
        >
          {/* Header with Brazilian Gradient */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-black font-display tracking-wide text-white">
                  WhatsApp Oficial YHAPE
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  <span>Pedidos y Reservas Únicamente por WhatsApp</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Cerrar menú de WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick options list */}
          <div className="p-4 bg-stone-50 space-y-2.5">
            <p className="text-xs text-stone-600 font-medium leading-relaxed bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              👋 <strong>¡Hola!</strong> En YHAPE gestionamos todas las reservas de mesas y pedidos <strong>únicamente por WhatsApp</strong> (+34 673 70 60 31). Elige cómo podemos ayudarte:
            </p>

            {/* Option 1: WhatsApp Catalog Link */}
            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-400 shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-stone-950" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-stone-900 group-hover:text-emerald-800">
                    Catálogo de Productos
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    wa.me/c/34673706031
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Option 2: Table Reservation via WhatsApp */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenReservation();
              }}
              className="w-full group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-teal-50 border border-teal-200 hover:border-teal-400 shadow-xs transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-stone-900 group-hover:text-teal-800">
                    Reservar Mesa por WhatsApp
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Terraza o Salón en Torremolinos
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 group-hover:translate-x-0.5 transition-transform">
                ➔
              </span>
            </button>

            {/* Option 3: Direct WhatsApp chat */}
            <a
              href="https://wa.me/34673706031?text=Hola%20YHAPE%2C%20quisiera%20hacer%20una%20consulta%20o%20pedido%20para%20vuestro%20local%20en%20Calle%20La%20Nogalera"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-amber-300 fill-amber-300" />
                <div className="text-left">
                  <div className="text-xs font-black text-white">
                    Abrir Chat Directo
                  </div>
                  <div className="text-[11px] text-emerald-100 font-mono">
                    +34 673 70 60 31
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300">
                Escribir ➔
              </span>
            </a>
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-stone-100 text-[10px] text-stone-500 text-center font-medium border-t border-stone-200">
            📍 Calle La Nogalera, 105, Torremolinos
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 pl-3 pr-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/50 border-2 border-white transition-all transform hover:scale-105 cursor-pointer"
        aria-label="Abrir opciones de WhatsApp para pedidos y reservas"
      >
        {/* Pulsing indicator */}
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-white text-white" />

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-black tracking-wider text-amber-200 leading-none">
            Pedidos & Reservas
          </span>
          <span className="text-xs font-black leading-tight">
            Únicamente WhatsApp
          </span>
        </div>
      </button>
    </div>
  );
};
