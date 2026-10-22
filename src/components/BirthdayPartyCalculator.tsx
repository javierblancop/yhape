import React from 'react';
import { PartyPopper, MessageCircle, ShoppingBag, ExternalLink, Sparkles, Cake, Gift, Heart, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';

export const BirthdayPartyCalculator: React.FC = () => {
  const handleAskBudgetWhatsApp = () => {
    const msg = 
      `*🎉 ¡HOLA YHAPE TORREMOLINOS! QUIERO PEDIR PRESUPUESTO PARA FIESTA / REUNIÓN*\n\n` +
      `¡Hola! 👋 Me gustaría solicitar información y presupuesto personalizado para organizar una fiesta o reunión con vosotros.\n\n` +
      `📍 *Lugar:* Calle La Nogalera 105, Torremolinos / Para Llevar\n` +
      `📖 *Catálogo:* ${RESTAURANT_INFO.whatsappCatalogUrl}\n\n` +
      `¿Podéis indicarme opciones de bandejas de salgados, tartas artesanales y disponibilidad? ¡Muchas gracias!`;
    openWhatsAppMessage(msg);
  };

  return (
    <section id="packs-fiesta" className="relative py-16 bg-gradient-to-br from-amber-100/60 via-rose-50/50 to-emerald-50/50 border-b border-amber-300 overflow-hidden scroll-mt-20">
      
      {/* Decorative festive background accents */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-10 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md">
            <PartyPopper className="w-4 h-4 text-white" />
            <span>Celebraciones, Cumpleaños &amp; Eventos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 font-display tracking-tight text-balance">
            Fiestas y Reuniones en YHAPE
          </h2>
          <p className="text-base sm:text-lg text-stone-800 font-semibold max-w-2xl mx-auto">
            ¿Tienes un cumpleaños, reunión familiar o celebración con amigos? Pide tu presupuesto personalizado directamente por WhatsApp y nosotros nos encargamos de todo.
          </p>
        </div>

        {/* Main Clean Card: Visual Showcase + Direct WhatsApp Quote Request */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Festive Image Showcase */}
            <div className="relative h-72 md:h-auto min-h-[280px] bg-stone-100 overflow-hidden group">
              <img
                src="/images/yhape_tarta_cumpleanos_1792219591690.jpg"
                alt="Tartas artesanales y catering para fiestas en YHAPE Torremolinos"
                className="w-full h-full object-cover animate-ken-burns transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
                <span className="inline-block bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md w-max shadow-sm">
                  Catering &amp; Repostería Artesanal
                </span>
                <p className="text-xl font-black font-display leading-tight text-white drop-shadow-sm">
                  Sabor que te lleva a Brasil ♡
                </p>
                <p className="text-xs text-amber-200 font-medium">
                  Calle La Nogalera 105, Torremolinos
                </p>
              </div>
            </div>

            {/* Right: Informational Content & WhatsApp Button */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Presupuestos a Medida</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-display leading-snug">
                  Pide tu presupuesto para fiestas o reuniones por WhatsApp
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                  Preparamos opciones deliciosas adaptadas al número de personas y a tu gusto para celebrar en nuestra terraza o para llevar:
                </p>

                {/* Feature Bullets */}
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800 font-semibold">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-black text-base shrink-0">🎂</span>
                    <span><strong>Tartas artesanales personalizadas:</strong> de brigadeiro, red velvet, frutas frescas y lazo decorativo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-orange-600 font-black text-base shrink-0">🥟</span>
                    <span><strong>Bandejas de salgados artesanos:</strong> coxinhas crujientes, risoles, pasteles y kibes recién fritos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-600 font-black text-base shrink-0">🍬</span>
                    <span><strong>Mesa dulce brasileña:</strong> brigadeiros gourmet tradicionales y beijinhos de coco.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-orange-100 via-amber-100 to-purple-100 border-2 border-orange-400 text-stone-950 shadow-sm">
                    <span className="text-3xl shrink-0 animate-bounce">🎃</span>
                    <span className="text-xs sm:text-sm leading-snug">
                      <strong className="text-orange-950 font-black block text-sm pb-0.5">¡Especial Fiestas de Halloween & Disfraces! 👻 🦇</strong>
                      Catering de bandejas de 50 o 100 salgados artesanos, coxinhas y caipirinhas para tus fiestas privadas en Torremolinos.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleAskBudgetWhatsApp}
                  className="animate-shimmer w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Pedir Presupuesto por WhatsApp (+34 {RESTAURANT_INFO.phone})</span>
                </button>

                <a
                  href={RESTAURANT_INFO.whatsappCatalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-stone-900 bg-amber-300 hover:bg-amber-400 border border-amber-400 transition-colors cursor-pointer text-center"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-900" />
                  <span>Ver Catálogo Oficial en WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <p className="text-[11px] text-center text-stone-500 font-medium leading-normal pt-1">
                  Atención directa y personalizada. Recomendamos consultar disponibilidad con antelación para grupos y encargos.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
