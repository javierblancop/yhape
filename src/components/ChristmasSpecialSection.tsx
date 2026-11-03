import React from 'react';
import { MessageCircle, ShoppingBag, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';
import { ChristmasGarland } from './ChristmasGarland';

interface ChristmasSpecialSectionProps {
  onOpenReservation: () => void;
}

interface ChristmasDish {
  id: string;
  name: string;
  festiveName: string;
  tag: string;
  price: string;
  emoji: string;
  image: string;
  description: string;
  highlights: string[];
  whatsappMessage: string;
}

const CHRISTMAS_DISHES: ChristmasDish[] = [
  {
    id: 'combo-natal-brasileiro',
    name: 'Banquete de Navidad Brasileño',
    festiveName: 'Bandeja de Coxinhas & Salgados con Caipirinha Dorada',
    tag: 'Especial Nochebuena & Reyes',
    price: '16,50€',
    emoji: '🎄',
    image: '/images/yhape_salgados_fiesta_1792219576390.jpg',
    description: 'Surtido navideño festivo de coxinhas crujientes de pollo cremoso, risoles dorados y kibes con toque de hierbabuena fresca, maridado con nuestra Caipirinha festiva especial.',
    highlights: ['Surtido de salgados artesanos', 'Caipirinha especial de fiesta', 'Salsa especial YHAPE'],
    whatsappMessage: '¡Hola YHAPE! 🎄 Quiero pedir el Banquete de Navidad Brasileño (Salgados + Caipirinha por 16,50€). ¿Tenéis mesa disponible o para llevar?',
  },
  {
    id: 'caipirinha-navidena',
    name: 'Caipirinha Navideña de Frutas Rojas & Canela',
    festiveName: 'Cachaça Premium con Frutos del Bosque & Menta',
    tag: 'Brindis Festivo',
    price: '6,50€',
    emoji: '🥂',
    image: '/images/yhape_hero_spread_1792219574249.jpg',
    description: 'Nuestra auténtica caipirinha brasileña vestida de fiesta: lima recién macerada, cachaça artesanal de caña, infusión de frutos rojos y aroma festivo de canela y menta fresca.',
    highlights: ['Cachaça artesanal de caña', 'Frutos rojos naturales', 'Brindis perfecto de Navidad'],
    whatsappMessage: '¡Hola YHAPE! 🍹 Quiero pedir la Caipirinha Navideña de Frutas Rojas (6,50€). ¡Muchas gracias!',
  },
  {
    id: 'acai-estrella-navidad',
    name: 'Açaí Bowl Estrella de Navidad',
    festiveName: 'Açaí Puro con Nieve de Coco, Fresa & Brigadeiro Blanco',
    tag: 'Bowl Navideño',
    price: '10,50€',
    emoji: '⭐',
    image: '/images/yhape_acai_bowl_1792219575515.jpg',
    description: 'Açaí silvestre amazónico 100% puro decorado como un paisaje navideño: lluvia de nieve de coco rallado fresco, fresas silvestres rojas, brigadeiro artesanal y granola dorada.',
    highlights: ['Açaí 100% puro amazónico', 'Nieve de coco fresco', 'Brigadeiro blanco festivo'],
    whatsappMessage: '¡Hola YHAPE! 🍇 Me gustaría pedir el Açaí Bowl Estrella de Navidad (10,50€) para disfrutar en terraza. ¡Gracias!',
  },
  {
    id: 'churros-navidenos-dulce-leche',
    name: 'Churros Festivos con Nieve de Azúcar & Dulce de Leche',
    festiveName: 'Mini Churros Crujientes con Canela y Topping Dorado',
    tag: 'Dulce Tradicional',
    price: '5,50€',
    emoji: '🎁',
    image: '/images/yhape_churros.jpg',
    description: 'Vaso de mini churros artesanos dorados recién fritos con dulce de leche fundido, lluvia nevada de canela y azúcar glass, perfectos para compartir en estas fiestas.',
    highlights: ['Fritos al momento', 'Dulce de leche cremoso', 'Ideal para tardes de invierno'],
    whatsappMessage: '¡Hola YHAPE! 🍯 Quiero un vaso de Churros Festivos de Navidad con dulce de leche (5,50€). ¡Muchas gracias!',
  },
];

export const ChristmasSpecialSection: React.FC<ChristmasSpecialSectionProps> = ({
  onOpenReservation,
}) => {
  return (
    <section
      id="navidad"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#180a0a] via-[#1a1c14] to-[#0d1f18] text-white overflow-hidden border-t-4 border-b-4 border-red-600 shadow-2xl scroll-mt-20"
    >
      {/* Decorative Realistic Pine & Bauble Garlands in Section Corners */}
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 opacity-80 pointer-events-none select-none z-10">
        <ChristmasGarland variant="corner-right" className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 opacity-80 pointer-events-none select-none z-10">
        <ChristmasGarland variant="corner-left" className="w-full h-full" />
      </div>

      {/* Ambient festive background glows */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-5 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 z-20">
        
        {/* Header with Christmas Motifs */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]">🎄</span>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl border-2 border-amber-300 ring-4 ring-red-400/20">
              <span>⭐</span>
              <span>¡ESPECIAL FIESTAS DE NAVIDAD &amp; FIN DE AÑO!</span>
              <span>🎅</span>
            </div>
            <span className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]" style={{ animationDelay: '0.2s' }}>🎁</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white drop-shadow-lg">
            Sabor Brasileño en tus Fiestas de Navidad
          </h2>

          <div className="flex items-center justify-center gap-2.5 text-2xl sm:text-3xl">
            <span>✨</span>
            <span>🎄</span>
            <span>🎅</span>
            <span>⭐</span>
            <span>🦌</span>
            <span>🎁</span>
            <span>🥂</span>
          </div>

          <p className="text-base sm:text-lg text-amber-100/95 font-medium max-w-2xl mx-auto leading-relaxed">
            ¡Celebra la magia de la Navidad en Calle La Nogalera 105, Torremolinos! Tapas festivas, cócteles especiales y catering para tus comidas de empresa, Nochebuena y celebraciones familiares.
          </p>
        </div>

        {/* Christmas Party & Group Banner */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-700 via-amber-700 to-emerald-800 shadow-2xl border-4 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Decorative Corner Garland on Banner */}
          <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-40 pointer-events-none select-none">
            <ChristmasGarland variant="corner-right" className="w-full h-full" />
          </div>

          <div className="flex items-center gap-5 text-center md:text-left relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-black/50 border-2 border-amber-300 flex items-center justify-center text-5xl sm:text-6xl shrink-0 shadow-2xl">
              🎅
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="bg-black/70 text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-full border border-amber-400">
                  🎄 Cenas de Empresa &amp; Reuniones
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-200">
                  🎉 ¡Celebra las Fiestas en YHAPE!
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                ¿Organizas tu comida de Navidad o cena de amigos?
              </h3>
              <p className="text-xs sm:text-base text-amber-50 font-medium max-w-xl">
                Reserva tu mesa en el centro peatonal de Torremolinos o pide tus bandejas de 50 o 100 salgados artesanales para llevar a tus celebraciones con reserva directa por WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-amber-50 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-amber-300 active:scale-95"
            >
              <Calendar className="w-5 h-5 text-red-600" />
              <span>🎄 Reservar Mesa de Navidad</span>
            </button>

            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-stone-950 hover:bg-black text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-amber-500 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>Catálogo Navideño</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Christmas Featured Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHRISTMAS_DISHES.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group bg-stone-900/95 rounded-3xl overflow-hidden border-2 border-red-500/50 hover:border-amber-400 shadow-xl flex flex-col justify-between transition-colors"
            >
              {/* Image & Price */}
              <div className="relative aspect-4/3 w-full bg-stone-800 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

                {/* Top Emoji badge (Enlarged) */}
                <div className="absolute top-3 left-3 bg-stone-950/95 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-amber-400 flex items-center gap-2">
                  <span className="text-xl">{dish.emoji}</span>
                  <span className="text-[11px] text-amber-300 font-extrabold uppercase tracking-wider">{dish.tag}</span>
                </div>

                {/* Price */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-white font-black font-mono px-3 py-1 rounded-xl shadow-lg border border-white/20">
                  {dish.price}
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-base font-black font-display leading-tight drop-shadow-md text-amber-200">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1">
                    {dish.festiveName}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-stone-900">
                <p className="text-xs text-stone-300 font-medium line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1 pt-1 border-t border-stone-800">
                  {dish.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-amber-200/90 font-semibold">
                      <span className="text-red-400">⭐</span>
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => openWhatsAppMessage(dish.whatsappMessage)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pedir por WhatsApp</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Catering for Christmas & Holiday Gatherings Callout */}
        <div className="p-6 rounded-3xl bg-stone-900/90 border-2 border-emerald-500/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span className="text-4xl shrink-0">🎁</span>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-black text-amber-200 font-display">
                ¿Celebraciones y Cenas Navideñas en Casa o Empresa?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-medium max-w-2xl">
                Encarga nuestras bandejas festivas de 50 o 100 salgados artesanales (coxinhas, risoles, kibes) recién hechos y tartas brasileñas de brigadeiro para Nochebuena, Navidad y Nochevieja. Te lo preparamos todo listo para servir.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const msg = `¡Hola YHAPE! 🎄 Queremos encargar catering de salgados navideños para nuestra comida/cena de Navidad en Torremolinos. ¿Podéis darnos presupuesto? ¡Gracias!`;
              openWhatsAppMessage(msg);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            <span>Pedir Presupuesto Navidad ➔</span>
          </button>
        </div>

      </div>
    </section>
  );
};
