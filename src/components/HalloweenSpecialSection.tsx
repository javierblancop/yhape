import React from 'react';
import { MessageCircle, ShoppingBag, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';
import { SpiderwebGraphic } from './SpiderwebGraphic';

interface HalloweenSpecialSectionProps {
  onOpenReservation: () => void;
}

interface HalloweenDish {
  id: string;
  name: string;
  spookyName: string;
  tag: string;
  price: string;
  emoji: string;
  image: string;
  description: string;
  highlights: string[];
  whatsappMessage: string;
}

const HALLOWEEN_DISHES: HalloweenDish[] = [
  {
    id: 'combo-calavera',
    name: 'Combo Calavera Brasileña',
    spookyName: '4 Coxinhas Gourmet + Caipirinha Sangrienta',
    tag: 'Especial Halloween',
    price: '14,50€',
    emoji: '🎃',
    image: '/images/yhape_salgados_fiesta_1792219576390.jpg',
    description: 'El combo estrella de la fiesta: cuatro coxinhas crujientes de pollo cremoso acompañadas de nuestra Caipirinha sangrienta de fresas naturales y cachaça brasileña.',
    highlights: ['4 Coxinhas artesanales', 'Caipirinha de Vampiro', 'Salsa brava especial'],
    whatsappMessage: '¡Hola YHAPE! 🎃 Quiero pedir el Combo Calavera de Halloween (4 coxinhas + Caipirinha por 14,50€). ¿Tenéis mesa o para llevar?',
  },
  {
    id: 'caipirinha-vampiro',
    name: 'Caipirinha Sangrienta de Vampiro',
    spookyName: 'Cachaça Brasileña con Fresas Silvestres',
    tag: 'Cóctel de Halloween',
    price: '6,50€',
    emoji: '🧛',
    image: '/images/yhape_hero_spread_1792219574249.jpg',
    description: 'Nuestra célebre caipirinha brasileña con lima macerada, cachaça premium y un coulis de fresas rojas sangrantes con hielo frappé.',
    highlights: ['Cachaça artesanal de caña', 'Fresas naturales', '100% refrescante'],
    whatsappMessage: '¡Hola YHAPE! 🍹 Quiero pedir la Caipirinha Sangrienta de Vampiro de Halloween (6,50€). ¡Gracias!',
  },
  {
    id: 'acai-embrujado',
    name: 'Açaí Bowl Embrujado de Medianoche',
    spookyName: 'Açaí Puro con Brigadeiro Negro & Frutas',
    tag: 'Bowl Temático',
    price: '10,50€',
    emoji: '👻',
    image: '/images/yhape_acai_bowl_1792219575515.jpg',
    description: 'Açaí silvestre amazónico de color violeta oscuro, acompañado de granola crujiente, brigadeiro artesanal de chocolate negro, plátano y dulce de leche.',
    highlights: ['Açaí 100% puro salvaje', 'Brigadeiro oscuro', 'Superalimento energizante'],
    whatsappMessage: '¡Hola YHAPE! 🍇 Me gustaría pedir el Açaí Bowl Embrujado de Medianoche (10,50€) para disfrutar en terraza. ¡Gracias!',
  },
  {
    id: 'churros-telarana',
    name: 'Churros Telaraña con Dulce de Leche',
    spookyName: 'Mini Churros con Lluvia de Chocolate & Dulce de Leche',
    tag: 'Dulce Temático',
    price: '5,50€',
    emoji: '🕸️',
    image: '/images/yhape_churros.jpg',
    description: 'Vaso de mini churros dorados recién fritos con dulce de leche fundido, decorados con finos hilos de chocolate artesanal estilo telaraña.',
    highlights: ['Fritos al momento', 'Dulce de leche cremoso', 'Ideal para compartir'],
    whatsappMessage: '¡Hola YHAPE! 🍯 Quiero un vaso de Churros Telaraña de Halloween con dulce de leche (5,50€). ¡Muchas gracias!',
  },
];

export const HalloweenSpecialSection: React.FC<HalloweenSpecialSectionProps> = ({
  onOpenReservation,
}) => {
  return (
    <section
      id="halloween"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#1a140f] via-[#241710] to-[#121915] text-white overflow-hidden border-t-4 border-b-4 border-orange-500 shadow-2xl scroll-mt-20"
    >
      {/* Decorative Realistic Cobwebs in Section Corners */}
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 opacity-50 pointer-events-none select-none z-10">
        <SpiderwebGraphic variant="corner-top-right" color="#f97316" hasSpider={true} className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 opacity-40 pointer-events-none select-none z-10">
        <SpiderwebGraphic variant="corner-top-left" color="#a855f7" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 sm:w-60 h-40 sm:h-60 opacity-35 pointer-events-none select-none z-10">
        <SpiderwebGraphic variant="corner-bottom-right" color="#f97316" className="w-full h-full" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-orange-600/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-5 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 z-20">
        
        {/* Header with Extra Large Halloween Motifs */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-[0_0_15px_rgba(249,115,22,0.9)]">🎃</span>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl border-2 border-orange-300 ring-4 ring-orange-400/20">
              <span>🦇</span>
              <span>¡ESPECIAL FIESTAS DE HALLOWEEN 2026!</span>
              <span>👻</span>
            </div>
            <span className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" style={{ animationDelay: '0.2s' }}>👻</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white drop-shadow-lg">
            Sabor Brasileño en la Noche de Halloween
          </h2>

          <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl">
            <span>🕸️</span>
            <span>🦇</span>
            <span>🎃</span>
            <span>🧛</span>
            <span>👻</span>
            <span>🕷️</span>
          </div>

          <p className="text-base sm:text-lg text-orange-200/95 font-medium max-w-2xl mx-auto leading-relaxed">
            ¡Celebra las fiestas de Halloween en Calle La Nogalera 105, Torremolinos! Tapas temáticas, cócteles sangrientos y catering para tus fiestas de disfraces.
          </p>
        </div>

        {/* Halloween Party Banner (Bigger & High Visibility) */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-purple-800 shadow-2xl border-4 border-orange-400 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Decorative Corner Spiderweb on Banner */}
          <SpiderwebGraphic variant="corner-top-right" color="#ffedd5" className="w-32 sm:w-48 h-32 sm:h-48 opacity-25 absolute top-0 right-0 pointer-events-none" />
          
          <div className="flex items-center gap-5 text-center md:text-left relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-black/60 border-2 border-orange-300 flex items-center justify-center text-5xl sm:text-6xl shrink-0 shadow-2xl">
              🦇
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="bg-black/70 text-orange-300 text-xs font-black uppercase px-3 py-1 rounded-full border border-orange-400">
                  🎃 Pack Fiesta de Disfraces
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-200">
                  🎉 ¡Ven con tu disfraz a YHAPE!
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                ¿Organizas una fiesta o quieres cenar en nuestra terraza?
              </h3>
              <p className="text-xs sm:text-base text-orange-100 font-medium max-w-xl">
                Reserva tu mesa en pleno centro peatonal de Torremolinos o pide tus bandejas de 50 o 100 salgados para llevar a tu fiesta de disfraces con reserva directa por WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-orange-50 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-orange-300 active:scale-95"
            >
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>🎃 Reservar Mesa de Halloween</span>
            </button>

            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-stone-950 hover:bg-black text-orange-300 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-orange-500 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              <span>Catálogo de Halloween</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Halloween Featured Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HALLOWEEN_DISHES.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group bg-stone-900/90 rounded-3xl overflow-hidden border-2 border-orange-500/40 hover:border-orange-400 shadow-xl flex flex-col justify-between transition-colors"
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
                <div className="absolute top-3 left-3 bg-stone-950/95 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-orange-400 flex items-center gap-2">
                  <span className="text-xl">{dish.emoji}</span>
                  <span className="text-[11px] text-orange-300 font-extrabold uppercase tracking-wider">{dish.tag}</span>
                </div>

                {/* Price */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 text-sm font-black font-mono px-3 py-1 rounded-xl shadow-lg border border-white/20">
                  {dish.price}
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-base font-black font-display leading-tight drop-shadow-md text-orange-200">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1">
                    {dish.spookyName}
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
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-orange-200/90 font-semibold">
                      <span className="text-orange-400">🕷️</span>
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

        {/* Catering for Halloween Costume Parties Callout */}
        <div className="p-6 rounded-3xl bg-stone-900/80 border-2 border-purple-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span className="text-4xl shrink-0">🧛‍♂️</span>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-black text-purple-200 font-display">
                ¿Fiesta de Disfraces en Casa o Local?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-medium max-w-2xl">
                Encarga nuestras bandejas especiales de 50 o 100 salgados (coxinhas, risoles, kibes) recién hechos y tartas artesanales de brigadeiro oscuro. Te lo preparamos todo listo para servir.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const msg = `¡Hola YHAPE! 🎃 Queremos encargar catering de salgados para nuestra fiesta de disfraces de Halloween en Torremolinos. ¿Podéis darnos presupuesto? ¡Gracias!`;
              openWhatsAppMessage(msg);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            <span>Pedir Presupuesto Fiesta ➔</span>
          </button>
        </div>

      </div>
    </section>
  );
};
