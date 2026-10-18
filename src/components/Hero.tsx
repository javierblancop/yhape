import React from 'react';
import { Calendar, ArrowDown, MapPin, Heart, Sparkles, Utensils, MessageCircle, ShoppingBag, ExternalLink, Instagram, Star, Play } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { RestaurantStatusLegend } from './RestaurantStatusLegend';
import { YhapeLogo } from './YhapeLogo';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenQRCode?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-100/90 via-emerald-100/60 to-orange-100/70 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-amber-200">
      
      {/* Decorative colorful ambient glow circles for vibrant tropical feel */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-5 w-80 h-80 bg-rose-300/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-64 h-64 bg-teal-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Notice Badge: Reservas y Pedidos Únicamente por WhatsApp */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-emerald-400 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black text-stone-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="bg-emerald-600 text-white text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-md">
              Aviso Oficial
            </span>
            <span>La reserva de mesas y todos los pedidos son <strong>ÚNICAMENTE por WhatsApp</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black text-emerald-950 bg-amber-300 hover:bg-amber-400 px-3 py-1.5 rounded-xl transition-transform hover:scale-105 shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-900" />
              <span>wa.me/c/34673706031</span>
              <ExternalLink className="w-3 h-3 text-emerald-900" />
            </a>

            {/* Direct Instagram Reel Link */}
            <a
              href={RESTAURANT_INFO.social.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 px-3 py-1.5 rounded-xl transition-transform hover:scale-105 shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Ver Reel de YHAPE</span>
              <Play className="w-3 h-3 fill-white" />
            </a>
          </div>
        </div>

        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Story, Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Location & Brand Subtitle Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black tracking-wide uppercase w-fit shadow-md">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Calle La Nogalera 105, Torremolinos · Málaga</span>
              </div>

              <a
                href="#resenas"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-300 shadow-xs text-xs font-bold text-stone-800 hover:bg-amber-50 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>4.9 / 5 en Google Maps</span>
              </a>
            </div>

            {/* Display Headline with colorful gradient text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.08] text-balance">
              <span className="text-stone-950">Tapas, picoteo y sabor </span>
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                brasileño
              </span>
              <span className="text-stone-950"> bajo el sol de Torremolinos.</span>
            </h1>

            {/* Official Brand Identity Callout */}
            <div className="p-3.5 bg-white/80 rounded-2xl border-2 border-amber-400/80 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl border border-amber-300 p-0.5 shrink-0 shadow-2xs overflow-hidden">
                <img
                  src="/images/yhape-logo.svg"
                  alt="YHAPE Logotipo Oficial"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                  Logotipo Oficial de YHAPE
                </p>
                <p className="text-sm font-black text-[#3A1C0E]">
                  TAPAS &amp; PICOTEO <span className="font-serif italic font-normal text-stone-600 text-xs">by K. Saez</span>
                </p>
              </div>
            </div>

            {/* Body Description */}
            <p className="text-lg sm:text-xl text-stone-800 leading-relaxed max-w-2xl font-medium">
              Bienvenido a <strong className="font-black text-[#3A1C0E]">YHAPE Tapas &amp; Picoteo</strong> en Calle La Nogalera. Disfruta del auténtico <span className="font-bold text-amber-950 bg-amber-200/90 px-2 py-0.5 rounded-md">«Sabor que te lleva a Brasil»</span>: <span className="font-bold text-orange-950 bg-orange-100/90 px-2 py-0.5 rounded-md">calabresa acebolada con farofa</span>, <span className="font-bold text-orange-950 bg-orange-100/90 px-2 py-0.5 rounded-md">coxinhas gourmet</span>, pastéis crujientes, mandioca frita, <span className="font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md">tapiocas 100% sin gluten</span>, <span className="font-bold text-purple-900 bg-purple-100/80 px-2 py-0.5 rounded-md">açaí puro amazónico</span>, y churros con dulce de leche artesanal.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary: WhatsApp Catalog direct link */}
              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5 border border-amber-400"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-950" />
                <span>Pedir en Catálogo WhatsApp</span>
                <span className="text-xs bg-emerald-900 text-white px-2 py-0.5 rounded-full">wa.me</span>
              </a>

              {/* Secondary: Table Reservation via WhatsApp */}
              <button
                type="button"
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-yellow-300" />
                <span>Reservar Mesa por WhatsApp</span>
              </button>

              {/* Dynamic Menu Button */}
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-bold text-stone-800 bg-white hover:bg-stone-50 border-2 border-stone-300 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Utensils className="w-4 h-4 text-emerald-700" />
                <span>Ver Menú &amp; Carta</span>
              </a>
            </div>

            {/* Live Restaurant Open/Closed Status Legend */}
            <div className="pt-2">
              <RestaurantStatusLegend variant="card" />
            </div>

            {/* Colorful Trust Strip */}
            <div className="pt-4 border-t-2 border-amber-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5 font-black text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-lg">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                Ingredientes 100% Naturales
              </span>
              <span className="text-amber-950 bg-amber-100 px-2.5 py-1 rounded-lg font-bold">
                🌾 Opciones Sin Gluten
              </span>
              <span className="text-purple-950 bg-purple-100 px-2.5 py-1 rounded-lg font-bold">
                🌱 Bowls Veganos
              </span>
              <RestaurantStatusLegend variant="chip" />
              <a 
                href="https://wa.me/34673706031"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 px-3 py-1 rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs"
                title="Escribir al WhatsApp oficial de YHAPE"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp: +34 673 70 60 31</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase with Official Logo Badge Overlay */}
          <div className="lg:col-span-5 relative flex flex-col justify-center space-y-4">
            
            {/* Colorful glow border with hero photo */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl p-1.5 bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 group">
              <div className="relative rounded-[22px] overflow-hidden bg-stone-100">
                <img
                  src="/images/yhape_hero_spread_1792219574249.jpg"
                  alt="Mesa con açaí bowl fresco, tapioca y zumos naturales en terraza de YHAPE Torremolinos"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Official Logo Badge inside photo */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border-2 border-amber-400 max-w-[140px] text-center">
                  <img
                    src="/images/yhape-logo.svg"
                    alt="YHAPE Tapas & Picoteo"
                    className="w-full h-auto object-contain"
                  />
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block mt-1">
                    Calle La Nogalera
                  </span>
                </div>

                {/* Colorful gradient scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/35 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider bg-amber-400 text-stone-950 px-3 py-1 rounded-full font-black shadow-sm">
                        ☀️ Terraza Soleada
                      </span>
                      <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        La Nogalera 105
                      </span>
                    </div>
                    <p className="text-2xl font-black font-display text-white drop-shadow-md leading-tight">
                      Tapas y picoteo artesanal bajo el sol de Torremolinos
                    </p>
                    <p className="text-xs text-amber-100 font-medium">
                      Desayunos revitalizantes, brunch artesanal brasileño y tapas para compartir.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={RESTAURANT_INFO.whatsappCatalogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Pedir por WhatsApp</span>
                      </a>

                      <a
                        href={RESTAURANT_INFO.social.instagramReelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-md transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Ver en Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Reel Banner Card */}
            <a
              href={RESTAURANT_INFO.social.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-r from-purple-900 via-pink-900 to-amber-950 text-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-pink-400/50 hover:border-pink-300 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-pink-300">
                        Instagram Oficial Reel
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                    </div>
                    <p className="text-sm font-black text-white group-hover:text-yellow-300 transition-colors">
                      ¡Descubre el ambiente y las tapas de YHAPE en vídeo!
                    </p>
                    <p className="text-xs text-pink-200/80">
                      @yhape.torremolinos · Tapas &amp; Picoteo by K. Saez
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-xl text-xs font-black shrink-0">
                  <span>Abrir Reel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>

          </div>

        </div>

        {/* 4-Column Feature Strip with Authentic Menu Highlights */}
        <div className="mt-14 pt-10 border-t-2 border-amber-300/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Croquetas & Salgados */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border-2 border-orange-300 hover:border-orange-400 hover:shadow-md transition-all space-y-1.5 shadow-xs">
            <div className="text-2xl">🥟</div>
            <h2 className="text-sm sm:text-base font-black text-orange-950 font-display">
              01. Croquetas &amp; Salgados
            </h2>
            <p className="text-xs text-orange-900 leading-relaxed font-semibold">
              Coxinhas de pollo cremoso (3,50€), risoles de jamón y queso, kibes y mix surtido recién frito.
            </p>
          </div>

          {/* Card 2: Pasteles de Feria */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 border-2 border-amber-300 hover:border-amber-400 hover:shadow-md transition-all space-y-1.5 shadow-xs">
            <div className="text-2xl">🥟</div>
            <h2 className="text-sm sm:text-base font-black text-amber-950 font-display">
              02. Pasteles de Feria
            </h2>
            <p className="text-xs text-amber-900 leading-relaxed font-semibold">
              Masa fina crujiente y burbujeante: carne, queso fundido, pollo o pizza desde 5,00€.
            </p>
          </div>

          {/* Card 3: Burgers & Tapas */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-100 to-amber-50 border-2 border-red-300 hover:border-red-400 hover:shadow-md transition-all space-y-1.5 shadow-xs">
            <div className="text-2xl">🍔</div>
            <h2 className="text-sm sm:text-base font-black text-red-950 font-display">
              03. Burger &amp; Tapas
            </h2>
            <p className="text-xs text-red-900 leading-relaxed font-semibold">
              Menú Cheeseburger con patatas y bebida (13,90€), tapa de calabresa con farofa y yuca frita.
            </p>
          </div>

          {/* Card 4: Churros & Açaí */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-100 to-rose-50 border-2 border-purple-300 hover:border-purple-400 hover:shadow-md transition-all space-y-1.5 shadow-xs">
            <div className="text-2xl">🍧</div>
            <h2 className="text-sm sm:text-base font-black text-purple-950 font-display">
              04. Churros, Açaí &amp; Postres
            </h2>
            <p className="text-xs text-purple-900 leading-relaxed font-semibold">
              Mini churros con dulce de leche (5,00€), bowls de açaí puro amazónico y tarta de limão.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
