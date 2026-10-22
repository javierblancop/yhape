import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Sparkles, 
  Utensils, 
  MessageCircle, 
  ShoppingBag, 
  ExternalLink, 
  Instagram, 
  Star, 
  Play, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menuData';
import { RestaurantStatusLegend } from './RestaurantStatusLegend';
import { SpiderwebGraphic } from './SpiderwebGraphic';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenQRCode?: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  badge: string;
  floatingBadge1: { name: string; tag: string; img: string };
  floatingBadge2: { name: string; tag: string; img: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-brunch',
    image: '/images/yhape_hero_spread_1792219574249.jpg',
    alt: 'Mesa con açaí bowl fresco, tapioca y zumos naturales en terraza de YHAPE Torremolinos',
    title: 'Tapas y picoteo artesanal bajo el sol de Torremolinos',
    subtitle: 'Brunch brasileño, açaí puro amazónico, tapiocas y zumos naturales recién hechos.',
    badge: '☀️ Terraza Soleada · La Nogalera 105',
    floatingBadge1: {
      name: 'Coxinha de Pollo',
      tag: 'Favorito Brasil 🇧🇷',
      img: '/images/yhape_salgados_fiesta_1792219576390.jpg',
    },
    floatingBadge2: {
      name: 'Churros Dulce de Leche',
      tag: 'Dulce Artesanal 🍯',
      img: '/images/yhape_churros.jpg',
    },
  },
  {
    id: 'slide-pastel',
    image: '/images/yhape_pastel.jpg',
    alt: 'Pastel de feria brasileño crujiente recién frito con relleno de carne y queso',
    title: 'Pasteles de Feria Crocantes & Burbujeantes',
    subtitle: 'Masa fina artesanal frita al momento: carne sazonada, queso fundido, pollo o pizza.',
    badge: '🔥 Frito al Momento · Desde 5,00€',
    floatingBadge1: {
      name: 'Pastel de Carne & Queso',
      tag: 'Crocante Paulista',
      img: '/images/yhape_pastel.jpg',
    },
    floatingBadge2: {
      name: 'Vinagrete Fresca',
      tag: 'Acompañamiento Casero',
      img: '/images/yhape_hero_spread_1792219574249.jpg',
    },
  },
  {
    id: 'slide-cheeseburger',
    image: '/images/yhape_cheeseburger.jpg',
    alt: 'Menú cheeseburger artesanal con patatas fritas crujientes y refresco',
    title: 'Menú Cheeseburger Gourmet YHAPE',
    subtitle: 'Carne de vacuno a la plancha, cheddar fundido, mayonesa secreta YHAPE y patatas.',
    badge: '🍔 Menú Completo · 13,90€ con Refresco',
    floatingBadge1: {
      name: 'Patatas Doradas',
      tag: 'Ración Crujiente',
      img: '/images/yhape_cheeseburger.jpg',
    },
    floatingBadge2: {
      name: 'Guaraná Antarctica',
      tag: 'Refresco Brasileño',
      img: '/images/yhape_hero_spread_1792219574249.jpg',
    },
  },
  {
    id: 'slide-churros',
    image: '/images/yhape_churros.jpg',
    alt: 'Churros dorados rellenos de dulce de leche artesanal con frutas frescas',
    title: 'Churros Rellenos & Dulce de Leche Artesano',
    subtitle: 'En vaso para llevar o grandes unidades con fresas, plátano y leche condensada.',
    badge: '🍯 Dulce Tradicional · Desde 5,00€',
    floatingBadge1: {
      name: 'Mini Churros en Vaso',
      tag: 'Rellenos con Dulce',
      img: '/images/yhape_churros.jpg',
    },
    floatingBadge2: {
      name: 'Açaí Copacabana',
      tag: 'Fruta Amazónica',
      img: '/images/yhape_acai_bowl_1792219575515.jpg',
    },
  },
];

const MARQUEE_ITEMS = [
  { icon: '🥟', text: 'Coxinhas de Pollo Cremoso (3,50€)', tag: 'Brasil 🇧🇷' },
  { icon: '🥟', text: 'Pasteles de Feria Crujientes (5,00€)', tag: 'Recién Hecho' },
  { icon: '🍔', text: 'Menú Cheeseburger con Patatas (13,90€)', tag: 'Gourmet' },
  { icon: '🍯', text: 'Mini Churros con Dulce de Leche (5,00€)', tag: 'Artesanal' },
  { icon: '🍇', text: 'Açaí Bowls Amazónicos Puros', tag: 'Superfood' },
  { icon: '🍹', text: 'Caipirinha Clásica con Cachaça & Lima', tag: 'Cóctel' },
  { icon: '🌴', text: 'Tapa de Mandioca Frita Crujiente (5,50€)', tag: 'Picoteo' },
  { icon: '🥩', text: 'Calabresa Acebolada con Farofa', tag: 'Tapa Boteco' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate photos every 4.5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-100/90 via-emerald-100/60 to-orange-100/70 pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-amber-200">
      
      {/* Decorative colorful ambient glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl pointer-events-none animate-pulse duration-3000" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-5 w-80 h-80 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ======================================================== */}
        {/* BANNER 1: ESPECIAL HALLOWEEN (Extra Large & Highly Visible)*/}
        {/* ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-orange-500 via-purple-600 to-amber-500 animate-gradient-shift shadow-xl border-2 border-orange-400">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 sm:py-4 rounded-[22px] bg-stone-950 text-white animate-shimmer relative overflow-hidden">
            
            {/* Decorative Spiderwebs in Banner Corners */}
            <SpiderwebGraphic variant="corner-top-right" color="#f97316" className="w-24 sm:w-36 h-24 sm:h-36 opacity-35 absolute top-0 right-0 pointer-events-none" />
            <SpiderwebGraphic variant="corner-bottom-left" color="#c084fc" className="w-20 sm:w-28 h-20 sm:h-28 opacity-25 absolute bottom-0 left-0 pointer-events-none" />

            {/* Background Spooky Ambient Decors */}
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 pointer-events-none select-none">
              🎃
            </div>
            <div className="absolute left-1/3 -top-6 text-6xl opacity-15 pointer-events-none select-none">
              🦇
            </div>

            <div className="flex items-center gap-3.5 text-sm sm:text-base font-black text-white relative z-10">
              <span className="text-3xl sm:text-4xl animate-bounce filter drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]">
                🎃
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 text-xs sm:text-sm font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                    ¡Fiestas de Halloween 2026!
                  </span>
                  <span className="text-xl">👻</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 font-medium pt-1">
                  Celebra con nuestras tapas de terror, <strong className="text-orange-400 font-black">Caipirinhas de Vampiro</strong> y packs de catering para disfraces.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 relative z-10">
              <a
                href="#halloween"
                className="text-xs sm:text-sm font-black text-stone-950 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 hover:from-orange-300 hover:to-yellow-300 px-4 py-2.5 rounded-2xl transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2 cursor-pointer transform border-2 border-orange-200"
              >
                <span className="text-lg">🎃</span>
                <span>Ver Menú Especial Halloween</span>
                <span className="text-lg">🕸️</span>
              </a>

              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-black text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 px-4 py-2.5 rounded-2xl transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2 cursor-pointer transform border border-purple-400"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Story, Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            
            {/* Location & Brand Subtitle Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black tracking-wide uppercase w-fit shadow-md">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Calle La Nogalera 105, Torremolinos · Málaga</span>
              </div>

              <a
                href="#resenas"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-300 shadow-xs text-xs font-bold text-stone-800 hover:bg-amber-50 transition-all hover:scale-102"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>4.9 / 5 en Google Maps</span>
              </a>
            </div>

            {/* Display Headline with colorful gradient text */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.12] text-balance">
              <span className="text-stone-950">Tapas, picoteo y sabor </span>
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                brasileño
              </span>
              <span className="text-stone-950"> bajo el sol de Torremolinos.</span>
            </h1>

            {/* Official Brand Identity Callout */}
            <div className="p-3 bg-white/85 backdrop-blur-xs rounded-2xl border-2 border-amber-400/80 shadow-xs flex items-center gap-3">
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
            <p className="text-base sm:text-lg text-stone-800 leading-relaxed max-w-2xl font-medium">
              Bienvenido a <strong className="font-black text-[#3A1C0E]">YHAPE Tapas &amp; Picoteo</strong> en Calle La Nogalera. Disfruta del auténtico <span className="font-bold text-amber-950 bg-amber-200/90 px-2 py-0.5 rounded-md">«Sabor que te lleva a Brasil»</span>: <span className="font-bold text-orange-950 bg-orange-100/90 px-2 py-0.5 rounded-md">calabresa con farofa</span>, <span className="font-bold text-orange-950 bg-orange-100/90 px-2 py-0.5 rounded-md">coxinhas gourmet</span>, pastéis crujientes, mandioca frita, <span className="font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md">tapiocas 100% sin gluten</span>, <span className="font-bold text-purple-900 bg-purple-100/80 px-2 py-0.5 rounded-md">açaí puro amazónico</span> y churros con dulce de leche.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {/* Primary: WhatsApp Catalog direct link with shimmer */}
              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5 border border-amber-400"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-950" />
                <span>Pedir en Catálogo WhatsApp</span>
                <span className="text-xs bg-emerald-900 text-white px-2 py-0.5 rounded-full font-bold">wa.me</span>
              </a>

              {/* Secondary: Table Reservation via WhatsApp */}
              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-yellow-300" />
                <span>Reservar Mesa por WhatsApp</span>
              </button>

              {/* Dynamic Menu Button */}
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-stone-800 bg-white hover:bg-stone-50 border-2 border-stone-300 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Utensils className="w-4 h-4 text-emerald-700" />
                <span>Ver Menú &amp; Carta</span>
              </a>

              {/* Halloween Special Quick Action (Bigger & High Contrast) */}
              <a
                href="#halloween"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 hover:from-orange-300 hover:to-yellow-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-1 border-2 border-orange-300 ring-2 ring-orange-200"
              >
                <span className="text-xl animate-bounce">🎃</span>
                <span>¡Especial Fiestas Halloween!</span>
                <span className="text-xl">👻</span>
              </a>
            </div>

            {/* Live Restaurant Open/Closed Status Legend */}
            <div className="pt-1">
              <RestaurantStatusLegend variant="card" />
            </div>

            {/* Trust Strip */}
            <div className="pt-3 border-t-2 border-amber-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-stone-700">
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

          {/* ======================================================== */}
          {/* RIGHT COLUMN: FOTO CON MOVIMIENTO DINÁMICO & ROTACIÓN    */}
          {/* ======================================================== */}
          <div 
            className="lg:col-span-5 relative flex flex-col justify-center space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* Colorful glow border with hero photo */}
            <div className="relative w-full rounded-3xl overflow-visible shadow-2xl p-1.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-purple-600 animate-gradient-shift group">
              
              {/* Floating Halloween Festive Badge (Highly Visible) */}
              <motion.a
                href="#halloween"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-stone-950 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-2xl border-2 border-orange-400 flex items-center gap-2 z-20 hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-2xl sm:text-3xl animate-bounce">🎃</span>
                <div className="text-left leading-tight">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 block">
                    ¡Halloween 2026! 🦇
                  </span>
                  <span className="text-xs font-black text-white">
                    Tapas &amp; Caipirinhas
                  </span>
                </div>
              </motion.a>
              
              {/* Floating Animated Badge 1: Top Left (Dynamic perpetually animated) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-3.5 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border-2 border-amber-300 items-center gap-2.5 z-20 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-amber-100 shrink-0 border border-amber-200">
                  <img src={activeSlide.floatingBadge1.img} alt={activeSlide.floatingBadge1.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left leading-tight pr-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block">
                    {activeSlide.floatingBadge1.tag}
                  </span>
                  <span className="text-xs font-black text-stone-900">
                    {activeSlide.floatingBadge1.name}
                  </span>
                </div>
              </motion.div>

              {/* Floating Animated Badge 2: Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-3.5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border-2 border-emerald-300 items-center gap-2.5 z-20 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-emerald-100 shrink-0 border border-emerald-200">
                  <img src={activeSlide.floatingBadge2.img} alt={activeSlide.floatingBadge2.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left leading-tight pr-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 block">
                    {activeSlide.floatingBadge2.tag}
                  </span>
                  <span className="text-xs font-black text-stone-900">
                    {activeSlide.floatingBadge2.name}
                  </span>
                </div>
              </motion.div>

              {/* Main Photo Frame with Ken Burns Effect */}
              <div className="relative rounded-[22px] overflow-hidden bg-stone-900 h-[310px] sm:h-[400px] lg:h-[450px]">
                
                {/* Decorative Spooky Corner Spiderweb on Photo */}
                <div className="absolute top-0 left-0 w-28 sm:w-36 h-28 sm:h-36 opacity-50 pointer-events-none select-none z-10">
                  <SpiderwebGraphic variant="corner-top-left" color="#ffffff" hasSpider={true} className="w-full h-full" />
                </div>

                {/* Crossfade Slides with Zoom Motion */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover animate-ken-burns"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Floating Official Logo Badge inside photo */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border-2 border-amber-400 max-w-[140px] text-center z-10 transition-transform group-hover:scale-105">
                  <img
                    src="/images/yhape-logo.svg"
                    alt="YHAPE Tapas & Picoteo"
                    className="w-full h-auto object-contain"
                  />
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block mt-1">
                    Calle La Nogalera
                  </span>
                </div>

                {/* Arrow navigation buttons for slider */}
                <div className="absolute top-1/2 left-2.5 sm:left-3 -translate-y-1/2 z-10">
                  <button
                    type="button"
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/30 shadow-lg active:scale-90"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-2.5 sm:right-3 -translate-y-1/2 z-10">
                  <button
                    type="button"
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-white/30 shadow-lg active:scale-90"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Colorful gradient scrim overlay with active slide text */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                  <div className="space-y-2 pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider bg-amber-400 text-stone-950 px-3 py-1 rounded-full font-black shadow-sm">
                        {activeSlide.badge}
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black font-display text-white drop-shadow-md leading-tight">
                      {activeSlide.title}
                    </p>
                    <p className="text-xs text-amber-100 font-medium">
                      {activeSlide.subtitle}
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

            {/* Thumbnail Navigation Selector */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-8 bg-amber-500 shadow-xs'
                      : 'w-2.5 bg-stone-300 hover:bg-amber-300'
                  }`}
                  aria-label={`Ver diapositiva ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] font-bold text-stone-500 ml-2">
                {currentSlideIndex + 1} / {HERO_SLIDES.length}
              </span>
            </div>

            {/* ======================================================== */}
            {/* BANNER 2: INSTAGRAM REEL CON MOVIMIENTO SHIMMER         */}
            {/* ======================================================== */}
            <a
              href={RESTAURANT_INFO.social.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-shimmer group block bg-gradient-to-r from-purple-900 via-pink-900 to-amber-950 text-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-pink-400/50 hover:border-pink-300 transition-all transform hover:-translate-y-1"
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

        {/* 4-Column Feature Strip */}
        <div className="mt-10 pt-8 border-t-2 border-amber-300/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border-2 border-orange-300 hover:border-orange-400 hover:shadow-md transition-all space-y-1.5 shadow-xs transform hover:-translate-y-1">
            <div className="text-2xl">🥟</div>
            <h2 className="text-sm sm:text-base font-black text-orange-950 font-display">
              01. Croquetas &amp; Salgados
            </h2>
            <p className="text-xs text-orange-900 leading-relaxed font-semibold">
              Coxinhas de pollo cremoso (3,50€), risoles de jamón y queso, kibes y mix surtido recién frito.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 border-2 border-amber-300 hover:border-amber-400 hover:shadow-md transition-all space-y-1.5 shadow-xs transform hover:-translate-y-1">
            <div className="text-2xl">🥟</div>
            <h2 className="text-sm sm:text-base font-black text-amber-950 font-display">
              02. Pasteles de Feria
            </h2>
            <p className="text-xs text-amber-900 leading-relaxed font-semibold">
              Masa fina crujiente y burbujeante: carne, queso fundido, pollo o pizza desde 5,00€.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-100 to-amber-50 border-2 border-red-300 hover:border-red-400 hover:shadow-md transition-all space-y-1.5 shadow-xs transform hover:-translate-y-1">
            <div className="text-2xl">🍔</div>
            <h2 className="text-sm sm:text-base font-black text-red-950 font-display">
              03. Burger &amp; Tapas
            </h2>
            <p className="text-xs text-red-900 leading-relaxed font-semibold">
              Menú Cheeseburger con patatas y bebida (13,90€), tapa de calabresa con farofa y yuca frita.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-100 to-rose-50 border-2 border-purple-300 hover:border-purple-400 hover:shadow-md transition-all space-y-1.5 shadow-xs transform hover:-translate-y-1">
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

      {/* ======================================================== */}
      {/* BANNER 3: MARQUESINA CONTINUA CON MOVIMIENTO INFINITO   */}
      {/* ======================================================== */}
      <div className="mt-8 border-y-2 border-amber-300 bg-amber-400/90 py-2.5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-stone-950 font-black text-xs uppercase tracking-wider whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-950 text-amber-300 text-[10px]">
                {item.tag}
              </span>
              <span className="text-stone-800/40">★</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
