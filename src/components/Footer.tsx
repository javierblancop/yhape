import React from 'react';
import { Calendar, Phone, MapPin, MessageCircle, Heart, QrCode, Sparkles, ShoppingBag, ExternalLink, Instagram, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { YhapeLogo } from './YhapeLogo';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenMyReservations: () => void;
  onOpenQRCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenReservation, 
  onOpenMyReservations,
  onOpenQRCode,
}) => {
  return (
    <footer className="bg-gradient-to-b from-stone-900 via-stone-950 to-black text-stone-300 pt-16 pb-12 border-t-8 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info with Official Logo */}
          <div className="space-y-4 md:col-span-2">
            <div className="bg-white rounded-2xl p-3 inline-block shadow-lg border border-amber-400">
              <YhapeLogo variant="horizontal" />
            </div>
            
            <p className="text-sm text-stone-300 max-w-sm leading-relaxed font-medium">
              Restaurante de comida saludable, picoteo y brunch brasileño en Calle La Nogalera 105, Torremolinos, Málaga.
            </p>

            {/* Social links row including Reel */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.social.instagramReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white px-3.5 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver Reel en Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="#resenas"
                className="bg-stone-800 hover:bg-stone-700 text-amber-300 px-3.5 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border border-stone-700 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9★ Google Maps</span>
              </a>
            </div>

            <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-amber-500/40 text-xs text-amber-200 space-y-1.5">
              <div className="font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Atención, Reservas &amp; Pedidos</span>
              </div>
              <p className="text-stone-300 font-medium">
                Gestionados <strong>ÚNICAMENTE por WhatsApp</strong> al <strong className="text-white font-mono">{RESTAURANT_INFO.phone}</strong>.
              </p>
            </div>

            <div className="text-xs text-stone-400 space-y-1.5 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp: <strong className="text-amber-300 font-mono">{RESTAURANT_INFO.phone}</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80 font-medium">
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">
                  🍽️ Menú &amp; Carta
                </a>
              </li>
              <li>
                <a href="#packs-fiesta" className="text-amber-300 hover:text-white transition-colors font-bold flex items-center gap-1">
                  <span>🎂</span>
                  <span>Packs de Cumpleaños & Tartas</span>
                </a>
              </li>
              <li>
                <a href="#resenas" className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Reseñas de Clientes (4.9★)</span>
                </a>
              </li>
              <li>
                <a href="#filosofia" className="hover:text-amber-300 transition-colors">
                  🌱 Filosofía &amp; Ingredientes
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-amber-300 transition-colors">
                  📍 Horarios y Torremolinos
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenQRCode}
                  className="hover:text-white transition-colors text-left text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Código QR para Mesas & Link</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenMyReservations}
                  className="hover:text-white transition-colors text-left text-emerald-300 cursor-pointer font-medium"
                >
                  Consultar Mis Reservas
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Actions: WhatsApp only */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Canal WhatsApp Oficial
            </h4>
            <div className="space-y-2.5">
              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-3 text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-yellow-300 rounded-2xl transition-all cursor-pointer shadow-lg transform hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Catálogo de WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenReservation}
                className="w-full flex items-center justify-center gap-2 py-3 px-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-2xl transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Reservar Mesa por WhatsApp</span>
              </button>

              <button
                onClick={onOpenQRCode}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-amber-300 border border-emerald-700 hover:bg-emerald-900/60 rounded-xl transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Descargar QR para Mesas</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 border-t border-emerald-900/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>© {new Date().getFullYear()} YHAPE Torremolinos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-300 font-bold">Comida saludable & artesanal</span>
            <span aria-hidden="true">·</span>
            <span>Calle La Nogalera 105, Torremolinos, Málaga</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
