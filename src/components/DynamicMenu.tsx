import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ExternalLink, 
  ShoppingBag, 
  AlertCircle, 
  Share2, 
  Check, 
  Search, 
  X, 
  ChevronRight,
  Flame,
  Utensils
} from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';
import { PhysicalMenuCard } from './PhysicalMenuCard';
import { InteractiveDishGallery } from './InteractiveDishGallery';

interface DynamicMenuProps {
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
}

export const DynamicMenu: React.FC<DynamicMenuProps> = ({
  items,
  onSelectDish,
  onQuickAdd,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleShareMenu = async () => {
    const shareUrl = typeof window !== 'undefined' 
      ? (window.location.origin ? `${window.location.origin}#menu` : window.location.href)
      : 'https://yhape.es#menu';

    const shareData = {
      title: 'Carta Oficial de YHAPE Torremolinos',
      text: '¡Mira la carta oficial de YHAPE Tapas & Picoteo en Torremolinos! Tapas brasileñas, pasteles crujientes, cheeseburger, açaí bowls y churros 🥟🇧🇷',
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing with Web Share API:', err);
        } else {
          return;
        }
      }
    }

    // Fallback: Copy link to clipboard
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Real-time search filter across name, ingredients, descriptions, tags, allergens, and toppings
  const matchingDishes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return items.filter((dish) => {
      const inName = dish.name.toLowerCase().includes(query);
      const inDesc = dish.description.toLowerCase().includes(query);
      const inTagline = dish.tagline.toLowerCase().includes(query);
      const inCategory = dish.category.toLowerCase().includes(query);
      const inTags = dish.tags.some(t => t.toLowerCase().includes(query));
      const inAllergens = dish.allergens.some(a => a.toLowerCase().includes(query));
      const inBases = dish.customizationOptions?.bases?.some(b => b.toLowerCase().includes(query));
      const inToppings = dish.customizationOptions?.extraToppings?.some(t => t.name.toLowerCase().includes(query));
      return inName || inDesc || inTagline || inCategory || inTags || inAllergens || inBases || inToppings;
    });
  }, [items, searchQuery]);

  const handleOrderFromSearch = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    const msg = 
      `*¡HOLA YHAPE! QUIERO PEDIR DE LA CARTA:*\n` +
      `🍽️ *1x ${dish.name}* (${dish.price.toFixed(2)}€)\n` +
      `📌 *Detalle:* ${dish.tagline}\n` +
      `📍 *Establecimiento:* Calle La Nogalera 105, Torremolinos\n` +
      `📖 *Catálogo:* ${RESTAURANT_INFO.whatsappCatalogUrl}\n\n` +
      `¿Podéis confirmarme disponibilidad para preparar este pedido? ¡Muchas gracias!`;
    openWhatsAppMessage(msg);
  };

  return (
    <section id="menu" className="py-16 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 border-b border-stone-200 scroll-mt-20">
      <div id="carta" className="scroll-mt-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Gastronomía Brasileña Viva &amp; Artesanal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
              Carta Física Oficial de YHAPE
            </h2>
            <p className="text-sm sm:text-base text-stone-700 font-medium">
              Consulta nuestra carta original con todos los precios, raciones y opciones tal como se sirven en nuestro local de Calle La Nogalera 105, Torremolinos.
            </p>
          </div>

          <div className="shrink-0 flex items-center flex-wrap gap-2.5">
            {/* Native Web Share Button */}
            <button
              type="button"
              onClick={handleShareMenu}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 border-2 border-stone-200 hover:border-emerald-300 cursor-pointer transform hover:scale-102"
              title="Compartir enlace de la carta con amigos"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span className="text-emerald-700">¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>Compartir Carta</span>
                </>
              )}
            </button>

            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-yellow-300 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 border border-amber-300 cursor-pointer transform hover:scale-102"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Catálogo WhatsApp Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* WhatsApp Official Catalog & Ordering Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl border-2 border-emerald-400">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-md font-bold">
              <MessageCircle className="w-8 h-8 text-emerald-950 fill-emerald-950" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                <span>Canal Exclusivo de Pedidos y Reservas</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-display">
                Haz tu pedido o reserva únicamente por WhatsApp (+34 673 70 60 31)
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Accede a nuestro catálogo completo oficial en WhatsApp: fotos, opciones y atención directa.
              </p>
            </div>
          </div>

          <a
            href={RESTAURANT_INFO.whatsappCatalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-yellow-300 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all whitespace-nowrap cursor-pointer transform hover:scale-105 inline-flex items-center gap-2 border border-amber-300"
          >
            <ShoppingBag className="w-4 h-4 text-stone-950" />
            <span>Abrir Catálogo: wa.me/c/34673706031</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ======================================================== */}
        {/* BUSCADOR EN TIEMPO REAL POR PLATO O INGREDIENTES        */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 font-display">
                  Buscador de Platos e Ingredientes
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Encuentra al instante cualquier plato, relleno o ingrediente en nuestra carta
                </p>
              </div>
            </div>

            {searchQuery.trim() !== '' && (
              <span className="text-xs font-black px-3 py-1 bg-amber-100 text-amber-950 rounded-full border border-amber-300">
                {matchingDishes.length} {matchingDishes.length === 1 ? 'plato encontrado' : 'platos encontrados'}
              </span>
            )}
          </div>

          {/* Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-amber-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Escribe un plato o ingrediente (ej: coxinha, queso, açaí, dulce de leche, yuca, maracuyá...)"
              className="w-full pl-12 pr-12 py-3.5 bg-stone-50 hover:bg-white focus:bg-white border-2 border-stone-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 rounded-2xl text-sm sm:text-base font-semibold text-stone-900 transition-all shadow-inner outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-all cursor-pointer"
                aria-label="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Term Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 text-xs">
            <span className="text-stone-400 font-bold shrink-0 text-[11px] mr-1">Sugerencias:</span>
            {['Coxinha', 'Pastel de Queso', 'Cheeseburger', 'Açaí', 'Churros', 'Calabresa', 'Yuca Frita', 'Brigadeiro', 'Sin Gluten'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                  searchQuery.toLowerCase() === term.toLowerCase()
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs'
                    : 'bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-950 border-stone-200'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Live Search Results Panel */}
          {searchQuery.trim() !== '' && (
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-stone-600">
                  Resultados para «{searchQuery}»:
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-rose-700 hover:text-rose-900 font-bold cursor-pointer"
                >
                  Cerrar resultados
                </button>
              </div>

              {matchingDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto p-1">
                  {matchingDishes.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => onSelectDish(dish)}
                      className="group p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50/70 border-2 border-stone-200 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-600">
                              {dish.category}
                            </span>
                            <span className="font-mono font-black text-sm text-emerald-800 shrink-0">
                              {dish.price.toFixed(2)}€
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-stone-900 truncate mt-1 group-hover:text-amber-900 transition-colors">
                            {dish.name}
                          </h4>
                          <p className="text-[11px] text-stone-600 line-clamp-1 font-medium">
                            {dish.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Matching Snippet / Ingredient details */}
                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed bg-white/80 p-2 rounded-lg border border-stone-100">
                        {dish.description}
                      </p>

                      <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                        <button
                          type="button"
                          onClick={(e) => handleOrderFromSearch(e, dish)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectDish(dish)}
                          className="flex items-center justify-center gap-0.5 py-1.5 px-2.5 bg-white hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-bold border border-stone-300 transition-colors cursor-pointer"
                        >
                          <span>Detalles</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 space-y-2">
                  <p className="text-sm font-bold text-stone-700">
                    No hemos encontrado ningún plato con «{searchQuery}».
                  </p>
                  <p className="text-xs text-stone-500 font-medium">
                    Prueba a buscar por ingredientes como: queso, pollo, dulce de leche, carne, yuca o açaí.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl cursor-pointer"
                  >
                    <span>Limpiar búsqueda</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Authentic Brazilian Slogan & Allergen Notice from Physical Menu */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">🇧🇷</span>
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider shadow-2xs">
                <span>Sabor que te lleva a Brasil</span>
              </div>
              <p className="text-xs text-amber-950 font-bold mt-1">
                Tapas de boteco, salgados artesanos, pasteles crujientes, bowls de açaí puro y churros con dulce de leche
              </p>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-2 text-xs text-stone-700 bg-white/95 px-3.5 py-2.5 rounded-xl border border-amber-300 shrink-0 shadow-2xs max-w-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-[11px] leading-tight font-medium text-stone-700">
              <strong className="text-stone-900 font-bold">Información de alérgenos:</strong> {RESTAURANT_INFO.allergenNotice}
            </span>
          </div>
        </div>

        {/* 1. CARTA FÍSICA OFICIAL (Cara 1 & Cara 2) */}
        <div>
          <PhysicalMenuCard />
        </div>

        {/* 2. IMÁGENES INTERACTIVAS DE NUESTROS PLATOS (Después de la Carta Física) */}
        <div className="pt-6 border-t-2 border-dashed border-amber-200">
          <InteractiveDishGallery />
        </div>

      </div>
    </section>
  );
};
