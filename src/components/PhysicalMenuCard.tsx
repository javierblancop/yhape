import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { MessageCircle, Sparkles, AlertCircle, ShoppingBag, ZoomIn, Check, Share2 } from 'lucide-react';

interface PhysicalMenuCardProps {
  onDirectOrderWhatsApp?: (dishName: string, price: string) => void;
}

export const PhysicalMenuCard: React.FC<PhysicalMenuCardProps> = ({ onDirectOrderWhatsApp }) => {
  const [activeSide, setActiveSide] = useState<'both' | 'side1' | 'side2'>('both');
  const [selectedImageZoom, setSelectedImageZoom] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

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

  const handleOrder = (name: string, price: string) => {
    if (onDirectOrderWhatsApp) {
      onDirectOrderWhatsApp(name, price);
      return;
    }
    const text = encodeURIComponent(
      `¡Hola YHAPE Torremolinos! 👋 Quiero pedir de la carta física:\n🍽️ *${name}* (${price})\n📍 Calle La Nogalera 105\n\n¿Tenéis disponible para preparar? ¡Gracias!`
    );
    window.open(`https://wa.me/34673706031?text=${text}`, '_blank');
  };

  return (
    <div className="bg-amber-50/50 rounded-3xl p-4 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
      {/* View Switcher Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Carta Física Oficial Plastificada</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            Carta Original de YHAPE Torremolinos
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Precios, raciones y opciones oficiales en Calle La Nogalera 105.
          </p>
        </div>

        {/* Side Tabs Selector + Share Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <div className="grid grid-cols-3 sm:flex items-center p-1 bg-white rounded-2xl border-2 border-amber-300 shadow-xs w-full sm:w-auto">
            <button
              onClick={() => setActiveSide('both')}
              className={`px-2 sm:px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                activeSide === 'both'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <span>📖 Ambas</span>
            </button>
            <button
              onClick={() => setActiveSide('side1')}
              className={`px-2 sm:px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                activeSide === 'side1'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <span>📜 Cara 1</span>
            </button>
            <button
              onClick={() => setActiveSide('side2')}
              className={`px-2 sm:px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                activeSide === 'side2'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              <span>🍧 Cara 2</span>
            </button>
          </div>

          {/* Share Button on physical card */}
          <button
            type="button"
            onClick={handleShareMenu}
            className="px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 bg-white hover:bg-amber-100 text-stone-900 border-2 border-amber-300 shadow-xs hover:shadow-md transform hover:scale-102"
            title="Compartir enlace de la carta con amigos"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">¡Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CARA 1: MENÚ COMPLETO (CROQUETAS, PASTEL, BURGER, TAPAS) */}
      {/* ======================================================== */}
      {(activeSide === 'side1' || activeSide === 'both') && (
        <div className="mt-8 bg-[#fdf9f0] border-4 border-[#e4d0b1] rounded-3xl p-6 sm:p-10 shadow-xl max-w-5xl mx-auto relative overflow-hidden font-sans text-stone-900">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-4 text-amber-700 opacity-60 text-lg">✿ ❀ ✿</div>
          <div className="absolute top-3 right-4 text-amber-700 opacity-60 text-lg">✿ ❀ ✿</div>

          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-dashed border-[#d9bf9a] space-y-1">
            <h2 className="text-3xl sm:text-5xl font-black tracking-widest text-[#2c241c] font-display uppercase">
              YHAPE
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.25em] font-bold text-amber-900 uppercase">
              ✈ TAPAS &amp; PICOTEO ✈
            </p>
            <div className="pt-2">
              <span className="inline-block bg-[#2c241c] text-[#fdf9f0] px-4 py-1.5 rounded-lg text-sm sm:text-base font-black tracking-wider uppercase">
                MENÚ COMPLETO / FULL MENU
              </span>
            </div>
          </div>

          {/* Main 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 pt-8">
            
            {/* COLUMN LEFT */}
            <div className="space-y-8">
              {/* SECTION: PARA PICAR CROQUETAS */}
              <div className="bg-white/80 p-5 rounded-2xl border border-[#e4d0b1] shadow-2xs space-y-4">
                <div className="border-b border-amber-300 pb-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#2c241c] tracking-tight uppercase flex items-center justify-between">
                    <span>PARA PICAR CROQUETAS</span>
                    <span className="text-xs font-bold text-amber-800 lowercase">to share croquettes</span>
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* Coxinha */}
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5">
                    <div>
                      <div className="font-black text-stone-900 flex items-center gap-1.5">
                        <span className="text-emerald-700 font-bold">➔</span>
                        <span>Coxinha Brasileña</span>
                        <span className="text-[10px] text-stone-400">🇪🇸 / 🇧🇷</span>
                      </div>
                      <p className="text-xs text-stone-600 font-medium">Bolita de masa rellena de pollo cremoso / Fried dough filled with creamy chicken</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-base text-stone-900">3,50€</span>
                      <button 
                        onClick={() => handleOrder('Coxinha Brasileña', '3,50€')}
                        className="block mt-1 text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Risoles */}
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5">
                    <div>
                      <div className="font-black text-stone-900 flex items-center gap-1.5">
                        <span className="text-emerald-700 font-bold">➔</span>
                        <span>Risoles Brasileños</span>
                        <span className="text-[10px] text-stone-400">🇪🇸 / 🇧🇷</span>
                      </div>
                      <p className="text-xs text-stone-600 font-medium">Empanadilla rellena de carne, jamón y queso / Stuffed pastries filled with meat, ham &amp; cheese</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-base text-stone-900">3,50€</span>
                      <button 
                        onClick={() => handleOrder('Risoles Brasileños', '3,50€')}
                        className="block mt-1 text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Kibe */}
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5">
                    <div>
                      <div className="font-black text-stone-900 flex items-center gap-1.5">
                        <span className="text-emerald-700 font-bold">➔</span>
                        <span>Kibe de Carne</span>
                        <span className="text-[10px] text-stone-400">🇪🇸 / 🇧🇷</span>
                      </div>
                      <p className="text-xs text-stone-600 font-medium">Albóndiga de bulgur rellena de ternera sazonada / Bulgur ball filled with seasoned beef</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-base text-stone-900">3,50€</span>
                      <button 
                        onClick={() => handleOrder('Kibe de Carne', '3,50€')}
                        className="block mt-1 text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Mix */}
                  <div className="flex items-start justify-between gap-3 bg-amber-100/70 p-2.5 rounded-xl border border-amber-300">
                    <div>
                      <div className="font-black text-stone-900 flex items-center gap-1.5">
                        <span className="text-amber-700 font-bold">★</span>
                        <span>Mix de Croquetas (6 uds)</span>
                      </div>
                      <p className="text-xs text-stone-700 font-medium">Selección de 6 croquetas surtidas / Assortment of 6 mixed croquettes</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-lg text-emerald-900">6,50€</span>
                      <button 
                        onClick={() => handleOrder('Mix de Croquetas (6 uds)', '6,50€')}
                        className="block mt-1 text-[10px] bg-emerald-800 hover:bg-emerald-900 text-white font-black px-2.5 py-1 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: MENÚ CHEESEBURGER */}
              <div className="bg-white/80 p-5 rounded-2xl border border-[#e4d0b1] shadow-2xs space-y-4">
                <div className="border-b border-amber-300 pb-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#2c241c] tracking-tight uppercase flex items-center gap-2">
                    <span>👑 MENÚ CHEESEBURGER</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Full Combo */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-100/80 to-amber-200/60 border-2 border-amber-400">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-black text-stone-950 text-sm sm:text-base">
                          CHEESEBURGER + PATATA FRITA + BEBIDA
                        </h4>
                        <p className="text-xs text-amber-950 font-semibold mt-0.5">
                          Carne, Queso, Mayonesa YHAPE, Lechuga, Tomate + Bebida
                        </p>
                        <p className="text-[11px] text-stone-600 italic">
                          Beef, Cheese, YHAPE Mayonnaise, Lettuce, Tomato + Drink (Coca-Cola, Fanta, Sprite, Nestea)
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black font-mono text-2xl text-emerald-900">13,90€</span>
                        <button 
                          onClick={() => handleOrder('Menú Cheeseburger + Patata + Bebida', '13,90€')}
                          className="block mt-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-black px-3 py-1 rounded-lg cursor-pointer"
                        >
                          Pedir Menú
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Burger Only */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div>
                      <h4 className="font-black text-stone-900 text-sm">
                        SOLO CHEESEBURGER / CHEESEBURGER ONLY
                      </h4>
                      <p className="text-xs text-stone-600 font-medium">
                        Carne, Queso, Mayonesa YHAPE, Lechuga, Tomate
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-lg text-stone-900">9,90€</span>
                      <button 
                        onClick={() => handleOrder('Solo Cheeseburger', '9,90€')}
                        className="block mt-1 text-[10px] bg-stone-800 hover:bg-stone-900 text-white font-bold px-2.5 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN RIGHT */}
            <div className="space-y-8">
              {/* SECTION: PASTEL */}
              <div className="bg-white/80 p-5 rounded-2xl border border-[#e4d0b1] shadow-2xs space-y-4">
                <div className="border-b border-amber-300 pb-2 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-black text-[#2c241c] tracking-tight uppercase">
                    PASTEL BRASILEÑO
                  </h3>
                  <span className="text-xs font-black bg-amber-400 text-stone-950 px-2 py-0.5 rounded-md">
                    DESDE 5,00€
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-black text-stone-900">🐂 Carne / Beef</div>
                      <span className="text-[11px] text-stone-500">Masa crujiente</span>
                    </div>
                    <span className="font-black font-mono text-sm text-stone-900">5,00€</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-black text-stone-900">🧀 Queso / Cheese</div>
                      <span className="text-[11px] text-stone-500">Mozzarella fundido</span>
                    </div>
                    <span className="font-black font-mono text-sm text-stone-900">5,00€</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-black text-stone-900">🍗 Pollo / Chicken</div>
                      <span className="text-[11px] text-stone-500">Pollo desmechado</span>
                    </div>
                    <span className="font-black font-mono text-sm text-stone-900">5,00€</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-black text-stone-900">🍕 Pizza / Pizza</div>
                      <span className="text-[11px] text-stone-500">Queso, jamón, orégano</span>
                    </div>
                    <span className="font-black font-mono text-sm text-stone-900">5,00€</span>
                  </div>
                </div>

                {/* Special options */}
                <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-300 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-black text-amber-950">
                    ★ Opciones Especiales / Special Options:
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                    <span>• Carne con Queso (Beef with cheese)</span>
                    <span className="font-mono font-black text-stone-900">5,60€</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                    <span>• Pollo con Queso (Chicken with cheese)</span>
                    <span className="font-mono font-black text-stone-900">5,60€</span>
                  </div>
                </div>

                {/* Extras Pastel */}
                <div className="flex items-center justify-between gap-2 pt-2 text-[11px] font-bold text-stone-700 border-t border-stone-200">
                  <span>Extras: Extra Queso <strong className="text-stone-950 font-mono">0,80€</strong></span>
                  <span>Extra Vinagrete <strong className="text-stone-950 font-mono">0,80€</strong></span>
                </div>
              </div>

              {/* SECTION: TAPAS */}
              <div className="bg-white/80 p-5 rounded-2xl border border-[#e4d0b1] shadow-2xs space-y-4">
                <div className="border-b border-amber-300 pb-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#2c241c] tracking-tight uppercase">
                    TAPAS DE PICOTEO
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Yuca */}
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5">
                    <div>
                      <h4 className="font-black text-stone-900">Tapa de Yuca (Fried Cassava)</h4>
                      <p className="text-xs text-stone-600 font-medium">Bastones de mandioca ultracrujientes</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-base text-stone-900">5,50€</span>
                      <button 
                        onClick={() => handleOrder('Tapa de Yuca', '5,50€')}
                        className="block mt-1 text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Calabresa */}
                  <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5 bg-amber-50/80 p-2 rounded-xl">
                    <div>
                      <h4 className="font-black text-stone-950">Tapa de Salchicha Ahumada Brasileña (Calabresa)</h4>
                      <p className="text-xs text-stone-700 font-medium">Acompañada de harina de yuca (farofa) y ensalada vinagrete</p>
                      <p className="text-[10px] text-stone-500 italic">Served with cassava flour and vinaigrette salad</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-lg text-emerald-900">7,50€</span>
                      <button 
                        onClick={() => handleOrder('Tapa de Salchicha Calabresa', '7,50€')}
                        className="block mt-1 text-[10px] bg-emerald-800 hover:bg-emerald-900 text-white font-black px-2.5 py-1 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Patatas Fritas */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-black text-stone-900">Tapa de Patatas Fritas (French Fries Portion)</h4>
                      <p className="text-xs text-stone-600 font-medium">Ración generosa recién hecha</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black font-mono text-base text-stone-900">5,50€</span>
                      <button 
                        onClick={() => handleOrder('Tapa de Patatas Fritas', '5,50€')}
                        className="block mt-1 text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>

                  {/* Extras Tapas */}
                  <div className="flex items-center justify-between gap-2 pt-2 text-[11px] font-bold text-stone-700 border-t border-stone-200">
                    <span>Extra Vinagrete: <strong className="text-stone-950 font-mono">1,00€</strong></span>
                    <span>Extra Harina Yuca: <strong className="text-stone-950 font-mono">0,80€</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-[#d9bf9a] text-center text-xs text-stone-600 space-y-1">
            <p className="font-bold text-stone-800">
              YHAPE TAPAS &amp; PICOTEO · <span className="text-amber-800">Sabor que te lleva a Brasil ♡</span>
            </p>
            <p className="text-[11px] text-stone-500">
              {RESTAURANT_INFO.allergenNotice}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CARA 2: CHURROS, MENÚ DE POSTRES Y AÇAÍ BOWLS            */}
      {/* ======================================================== */}
      {(activeSide === 'side2' || activeSide === 'both') && (
        <div className="mt-8 bg-[#fdf9f0] border-4 border-[#e4d0b1] rounded-3xl p-6 sm:p-10 shadow-xl max-w-5xl mx-auto relative overflow-hidden font-sans text-stone-900">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-4 text-amber-700 opacity-60 text-lg">✿ ❀ ✿</div>
          <div className="absolute top-3 right-4 text-amber-700 opacity-60 text-lg">✿ ❀ ✿</div>

          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-dashed border-[#d9bf9a] space-y-1">
            <h2 className="text-3xl sm:text-5xl font-black tracking-widest text-[#2c241c] font-display uppercase">
              YHAPE
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.25em] font-bold text-amber-900 uppercase">
              ✈ TAPAS &amp; SNACKS ✈
            </p>
          </div>

          {/* Top Row: Mini Churros & Churros Grandes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Mini Churros */}
            <div className="bg-white/85 p-5 rounded-2xl border-2 border-amber-300 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="inline-block text-[11px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded mb-1">
                  En Vaso · To Go
                </div>
                <h3 className="text-2xl font-black text-stone-900 font-display">
                  MINI CHURROS
                </h3>
                <p className="text-xs text-amber-950 font-bold mt-1">
                  Relleno de Dulce de Leche en vaso
                </p>
                <p className="text-[11px] text-stone-500 italic">
                  Filled with dulce de leche in a cup ♡
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-200">
                <span className="font-mono text-3xl font-black text-amber-900">5,00€</span>
                <button
                  onClick={() => handleOrder('Mini Churros en vaso', '5,00€')}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Pedir Churros
                </button>
              </div>
            </div>

            {/* Churros Grandes */}
            <div className="bg-white/85 p-5 rounded-2xl border-2 border-amber-300 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="inline-block text-[11px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded mb-1">
                  Por Unidades · Large Churros
                </div>
                <h3 className="text-2xl font-black text-stone-900 font-display">
                  CHURROS GRANDES
                </h3>
                <p className="text-xs text-amber-950 font-bold mt-1">
                  Elegir 3 rellenos / Choose 3 fillings:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2 text-[11px] font-bold text-stone-700">
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🍓 Fresa</span>
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🍌 Plátano</span>
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🍯 Dulce de Leche</span>
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🥥 Coco Rallado</span>
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🥛 Leche Condensada</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-200">
                <span className="font-mono text-3xl font-black text-amber-900">5,50€</span>
                <button
                  onClick={() => handleOrder('Churros Grandes (3 rellenos)', '5,50€')}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Pedir Churros
                </button>
              </div>
            </div>
          </div>

          {/* Middle Row: Menú de Postres */}
          <div className="mt-8 bg-white/85 p-6 rounded-2xl border border-[#e4d0b1] shadow-2xs space-y-4">
            <div className="text-center pb-2 border-b border-amber-300">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-wide uppercase">
                Menú de Postres / Dessert Menu
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-stone-900 text-xs sm:text-sm">Tarta de Queso</h4>
                  <p className="text-[10px] text-stone-500 italic">Cheesecake</p>
                </div>
                <span className="font-mono font-black text-lg text-emerald-900 mt-2">5,00€</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-stone-900 text-xs sm:text-sm">Tarta de Limão</h4>
                  <p className="text-[10px] text-stone-500 italic">Lime pie brasileña</p>
                </div>
                <span className="font-mono font-black text-lg text-emerald-900 mt-2">5,00€</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-stone-900 text-xs sm:text-sm">Brigadeiro</h4>
                  <p className="text-[10px] text-stone-500 italic">Chocolate artesano</p>
                </div>
                <span className="font-mono font-black text-lg text-emerald-900 mt-2">2,50€</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-stone-900 text-xs sm:text-sm">Beijinho</h4>
                  <p className="text-[10px] text-stone-500 italic">Coco y leche cond.</p>
                </div>
                <span className="font-mono font-black text-lg text-emerald-900 mt-2">2,50€</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Açaí Bowls */}
          <div className="mt-8 bg-white/85 p-6 rounded-2xl border-2 border-purple-300 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-purple-200 pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-purple-950 font-display uppercase flex items-center gap-2">
                  <span>🍇 AÇAÍ BOWLS</span>
                  <span className="text-xs font-bold text-purple-700 font-sans lowercase">bowls brasileños</span>
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-black">
                <span className="bg-purple-100 text-purple-950 px-3 py-1 rounded-lg border border-purple-300 font-mono">
                  350 grs: 10,50€
                </span>
                <span className="bg-purple-200 text-purple-950 px-3 py-1 rounded-lg border border-purple-300 font-mono">
                  500 grs: 13,50€
                </span>
                <span className="bg-amber-100 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-300 font-mono">
                  Extra Topping: 0,80€
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Copacabana */}
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                <h4 className="font-black text-purple-950 text-sm flex items-center gap-1.5">
                  <span>🌴 Bowl Copacabana</span>
                </h4>
                <ul className="text-xs text-stone-700 space-y-1 font-medium">
                  <li>• Açaí puro amazónico</li>
                  <li>• Granola crujiente</li>
                  <li>• Plátano, Mango &amp; Kiwi</li>
                  <li>• Coco rallado</li>
                  <li>• Crema de cacao</li>
                </ul>
                <button
                  onClick={() => handleOrder('Açaí Bowl Copacabana (350g)', '10,50€')}
                  className="w-full mt-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Pedir Copacabana
                </button>
              </div>

              {/* Bowls Brasileños */}
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                <h4 className="font-black text-purple-950 text-sm flex items-center gap-1.5">
                  <span>🇧🇷 Bowls Brasileños</span>
                </h4>
                <ul className="text-xs text-stone-700 space-y-1 font-medium">
                  <li>• Açaí puro amazónico</li>
                  <li>• Leche en polvo (Leite Ninho)</li>
                  <li>• Granola artesana</li>
                  <li>• Plátano &amp; Fresa fresca</li>
                  <li>• Leche condensada</li>
                </ul>
                <button
                  onClick={() => handleOrder('Açaí Bowl Brasileños (350g)', '10,50€')}
                  className="w-full mt-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Pedir Brasileño
                </button>
              </div>

              {/* Bowl Pasión */}
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                <h4 className="font-black text-purple-950 text-sm flex items-center gap-1.5">
                  <span>💛 Bowl Pasión</span>
                </h4>
                <ul className="text-xs text-stone-700 space-y-1 font-medium">
                  <li>• Açaí puro amazónico</li>
                  <li>• Crema de maracuyá</li>
                  <li>• Fresa &amp; Plátano</li>
                  <li>• Coco rallado</li>
                  <li>• Dulce de leche</li>
                </ul>
                <button
                  onClick={() => handleOrder('Açaí Bowl Pasión (350g)', '10,50€')}
                  className="w-full mt-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Pedir Pasión
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-[#d9bf9a] text-center text-xs text-stone-600 space-y-1">
            <p className="font-bold text-stone-800">
              YHAPE TAPAS &amp; SNACKS · <span className="text-amber-800">Torremolinos (Calle La Nogalera 105)</span>
            </p>
            <p className="text-[11px] text-stone-500">
              May contain: Gluten, Dairy and nuts. We have allergy information available - please ask our staff.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
