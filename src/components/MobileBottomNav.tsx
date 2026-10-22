import React from 'react';
import { Utensils, Calendar, MessageCircle, QrCode, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface MobileBottomNavProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenQRCode: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
  onOpenQRCode,
}) => {
  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] pb-safe transition-all"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1.5 max-w-md mx-auto">
        {/* Tab 1: Menú & Halloween (Extra Large & Highly Visible) */}
        <a
          href="#halloween"
          className="flex flex-col items-center justify-center gap-0.5 h-full text-orange-700 hover:text-orange-950 active:scale-95 transition-transform relative bg-orange-100/70 rounded-2xl mx-1 my-1 border border-orange-300 shadow-2xs"
          aria-label="Ir al Especial de Halloween y Menú"
        >
          <div className="relative flex items-center justify-center">
            <span className="text-2xl animate-bounce filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">🎃</span>
            <span className="absolute -top-1 -right-2 text-[10px] animate-pulse">✨</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-tight text-orange-950">
            Halloween
          </span>
        </a>

        {/* Tab 2: Reservar Mesa */}
        <button
          type="button"
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center gap-1 h-full text-stone-700 hover:text-emerald-700 active:scale-95 transition-transform cursor-pointer"
          aria-label="Reservar Mesa por WhatsApp"
        >
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span className="text-[11px] font-black uppercase tracking-tight text-stone-900">
            Reservar
          </span>
        </button>

        {/* Tab 3: Raised Central WhatsApp Action Button */}
        <a
          href={RESTAURANT_INFO.whatsappCatalogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 group active:scale-95 transition-transform"
          aria-label="Abrir WhatsApp oficial de YHAPE"
          title="WhatsApp Oficial: wa.me/c/34673706031"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 border-3 border-white group-hover:scale-105 transition-all">
            <MessageCircle className="w-6 h-6 fill-white text-white" />
          </div>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-tighter mt-1">
            WhatsApp
          </span>
        </a>

        {/* Tab 4: QR Mesas */}
        <button
          type="button"
          onClick={onOpenQRCode}
          className="flex flex-col items-center justify-center gap-1 h-full text-stone-700 hover:text-amber-700 active:scale-95 transition-transform cursor-pointer"
          aria-label="Ver Código QR para mesas"
        >
          <QrCode className="w-5 h-5 text-amber-600" />
          <span className="text-[11px] font-black uppercase tracking-tight text-stone-900">
            QR Mesas
          </span>
        </button>

        {/* Tab 5: Mi Pedido / Carrito */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 h-full text-stone-700 hover:text-emerald-700 active:scale-95 transition-transform cursor-pointer"
          aria-label={`Ver pedido actual (${cartItemCount} platos)`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-black uppercase tracking-tight text-stone-900">
            Pedido
          </span>
        </button>
      </div>
    </nav>
  );
};
