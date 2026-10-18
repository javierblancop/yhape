import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, Menu as MenuIcon, X, BookmarkCheck, QrCode, Sparkles, MessageCircle, ExternalLink, Instagram, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { YhapeLogo } from './YhapeLogo';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenMyReservations: () => void;
  onOpenQRCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
  onOpenMyReservations,
  onOpenQRCode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      {/* Top Festive Promo Strip with Brazilian Colors */}
      <div className="bg-gradient-to-r from-emerald-600 via-yellow-400 to-amber-500 text-stone-950 text-[11px] sm:text-xs font-black py-2 px-4 text-center tracking-wide flex flex-wrap items-center justify-center gap-2 shadow-inner">
        <span className="flex items-center gap-1 bg-emerald-950 text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold shadow-xs">
          <MessageCircle className="w-3 h-3 fill-emerald-400 text-emerald-400" />
          <span>Atención Oficial</span>
        </span>
        <span className="text-stone-950 drop-shadow-xs font-black">
          Pedidos y Reservas ÚNICAMENTE por WhatsApp
        </span>
        <span className="hidden md:inline text-emerald-950 font-bold">
          (+34 673 70 60 31) · Torremolinos
        </span>
        <a 
          href={RESTAURANT_INFO.whatsappCatalogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 hover:text-white px-3 py-1 rounded-full shadow-md font-black hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer ml-1 text-[11px]"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
          <span>Ver Catálogo de Pedidos</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Instagram Reel Direct Pill */}
        <a
          href={RESTAURANT_INFO.social.instagramReelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 hover:opacity-95 text-white px-2.5 py-1 rounded-full shadow-xs font-black hover:scale-105 transition-all inline-flex items-center gap-1 cursor-pointer text-[10px]"
          title="Ver Reel en Instagram"
        >
          <Instagram className="w-3 h-3" />
          <span>Ver Reel</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Brand Zone with Official YHAPE TAPAS & PICOTEO Logo */}
          <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0" aria-label="YHAPE Tapas & Picoteo">
            <YhapeLogo variant="compact" />
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-stone-700">
            <a 
              href="#menu" 
              className="text-stone-800 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 font-extrabold"
            >
              <span>🍽️</span>
              <span>Menú &amp; Carta</span>
            </a>
            <a 
              href="#packs-fiesta" 
              className="text-amber-800 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-100 border border-amber-300/80 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1 font-bold shadow-2xs"
            >
              <span>🎂</span>
              <span>Packs Fiesta</span>
            </a>
            <a 
              href="#resenas" 
              className="text-stone-700 hover:text-amber-700 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>Reseñas 4.9★</span>
            </a>
            <a 
              href="#filosofia" 
              className="text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              🌱 Historia
            </a>
            <a 
              href="#ubicacion" 
              className="text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              📍 Torremolinos
            </a>
            <button
              onClick={onOpenMyReservations}
              className="text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>Mis Reservas</span>
            </button>
          </nav>

          {/* Zone 3: Actions + WhatsApp Catalog + Cart + QR */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Direct WhatsApp Catalog link Button */}
            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-emerald-950 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 border-2 border-emerald-400 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs hover:shadow-md transform hover:-translate-y-0.5"
              title="Abrir Catálogo Oficial de WhatsApp para pedir (wa.me/c/34673706031)"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-600" />
              <span>Catálogo WhatsApp</span>
            </a>

            {/* QR Code Trigger Button */}
            <button
              onClick={onOpenQRCode}
              aria-label="Ver Código QR y enlace para compartir"
              title="Código QR para mesas y enlace público"
              className="p-2 sm:p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-2xs"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
              <span className="hidden xl:inline">Código QR</span>
            </button>

            {/* Cart Button with vibrant badge */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir pedido actual para enviar por WhatsApp"
              className="relative p-2.5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
              title="Tu lista de pedido para enviar por WhatsApp"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Reservar Mesa por WhatsApp */}
            <button
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-yellow-300" />
              <span>Reservar Mesa</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Pedidos y Reservas ÚNICAMENTE por WhatsApp</span>
            </div>
            <p className="text-stone-600">
              Teléfono: <strong className="text-emerald-800">+34 673 70 60 31</strong>
            </p>
            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs transition-colors"
            >
              🛍️ Abrir Catálogo WhatsApp (wa.me/c/34673706031)
            </a>
          </div>

          <nav className="flex flex-col gap-2 font-bold text-stone-700">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-2 font-black text-stone-900"
            >
              <span>🍽️</span>
              <span>Menú &amp; Carta Completa</span>
            </a>
            <a
              href="#packs-fiesta"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-2"
            >
              <span>🎂</span>
              <span>Packs Fiestas & Cumpleaños</span>
            </a>
            <a
              href="#resenas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-amber-50/70 text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-2"
            >
              <span>⭐</span>
              <span>Reseñas de Clientes (4.9★)</span>
            </a>
            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              🌱 Sobre YHAPE
            </a>
            <a
              href="#ubicacion"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              📍 Ubicación & Horarios
            </a>
            <a
              href={RESTAURANT_INFO.social.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 text-purple-950 font-bold transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Ver Reel de YHAPE en Instagram</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyReservations();
              }}
              className="flex items-center gap-2 text-left px-3 py-2 rounded-xl text-stone-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>Mis Reservas Guardadas</span>
            </button>
          </nav>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Reservar Mesa por WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQRCode();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold"
            >
              <QrCode className="w-4 h-4 text-amber-600" />
              <span>Ver Código QR para Mesa</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
