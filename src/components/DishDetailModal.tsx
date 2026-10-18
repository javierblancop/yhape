import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, Award, AlertCircle, ShoppingBag, MessageCircle, ExternalLink } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    dish: MenuItem,
    quantity: number,
    selectedBase?: string,
    selectedSweetener?: string,
    selectedExtras?: { name: string; price: number }[],
    notes?: string
  ) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedBase, setSelectedBase] = useState<string>(
    dish.customizationOptions?.bases?.[0] || ''
  );
  const [selectedSweetener, setSelectedSweetener] = useState<string>(
    dish.customizationOptions?.sweetener?.[0] || ''
  );
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some(e => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const itemUnitPrice = dish.price + extrasTotal;
  const totalPrice = itemUnitPrice * quantity;

  const handleOrderViaWhatsApp = () => {
    let msg = `*¡HOLA YHAPE! QUIERO PEDIR:*\n\n`;
    msg += `🍽️ *${quantity}x ${dish.name}* (${totalPrice.toFixed(2)}€)\n`;
    if (selectedBase) msg += `   - Base: ${selectedBase}\n`;
    if (selectedSweetener) msg += `   - Endulzante: ${selectedSweetener}\n`;
    if (selectedExtras.length > 0) {
      msg += `   - Extras: ${selectedExtras.map(e => e.name).join(', ')}\n`;
    }
    if (specialNotes.trim()) {
      msg += `   - Nota cocina: ${specialNotes.trim()}\n`;
    }
    msg += `\n*TOTAL ESTIMADO:* ${totalPrice.toFixed(2)}€\n`;
    msg += `*Catálogo:* ${RESTAURANT_INFO.whatsappCatalogUrl}\n`;
    msg += `\n¿Podéis confirmarme disponibilidad para preparar este pedido en Calle La Nogalera 105, Torremolinos? ¡Gracias!`;

    openWhatsAppMessage(msg);
  };

  const handleConfirm = () => {
    onAddToCart(
      dish,
      quantity,
      selectedBase || undefined,
      selectedSweetener || undefined,
      selectedExtras,
      specialNotes.trim() || undefined
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-400 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-stone-700 hover:text-stone-900 shadow-md hover:bg-white transition-all cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto divide-y divide-stone-100">
          
          {/* Header Image */}
          <div className="relative h-64 sm:h-76 w-full bg-stone-100">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-black">
                {dish.portionSize} · YHAPE Torremolinos
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white drop-shadow-md">
                {dish.name}
              </h2>
            </div>
          </div>

          {/* Description & Tags */}
          <div className="p-6 space-y-4">
            
            {/* Notice that orders are only by WhatsApp */}
            <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-300 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-950 font-black">
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                <span>Pedidos <strong>ÚNICAMENTE por WhatsApp (+34 673 70 60 31)</strong></span>
              </div>
              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-black text-emerald-950 bg-amber-300 hover:bg-amber-400 px-2.5 py-1 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs whitespace-nowrap"
              >
                <span>Catálogo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              {dish.description}
            </p>

            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 pt-1 font-bold">
              <span className="text-emerald-900 uppercase tracking-wide">
                Categoría: {dish.category}
              </span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              {dish.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span className="capitalize text-stone-800">{tag.replace('-', ' ')}</span>
                  {idx < dish.tags.length - 1 && <span aria-hidden="true" className="text-amber-400">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Nutritional Macro Strip with vibrant colors */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border-2 border-amber-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-800">
                <span className="flex items-center gap-1.5 text-stone-900">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  Valores Nutricionales
                </span>
                <span className="font-mono tabular-nums font-black text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-lg border border-amber-300">
                  {dish.calories} kcal
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-300 text-center shadow-xs">
                  <span className="block text-[11px] font-black text-emerald-900">Proteína</span>
                  <span className="text-base font-black text-emerald-700 font-mono tabular-nums">{dish.protein}g</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-amber-300 text-center shadow-xs">
                  <span className="block text-[11px] font-black text-amber-900">Carbohidratos</span>
                  <span className="text-base font-black text-amber-700 font-mono tabular-nums">{dish.carbs}g</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-orange-300 text-center shadow-xs">
                  <span className="block text-[11px] font-black text-orange-900">Grasas Buenas</span>
                  <span className="text-base font-black text-orange-700 font-mono tabular-nums">{dish.fat}g</span>
                </div>
              </div>

              {dish.allergens.length > 0 ? (
                <div className="pt-2 text-[11px] text-amber-950 bg-amber-100 p-2.5 rounded-xl border border-amber-300 flex items-center gap-1.5 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Alérgenos declarados: <strong className="font-black text-stone-900">{dish.allergens.join(', ')}</strong></span>
                </div>
              ) : (
                <div className="pt-2 text-[11px] text-emerald-950 bg-emerald-100 p-2.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 font-black">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 stroke-[3]" />
                  <span>Plato libre de los principales alérgenos declarados</span>
                </div>
              )}
            </div>

            {/* Customization Options */}
            {dish.customizationOptions?.bases && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800">
                  1. Elige tu Base o Preparación:
                </label>
                <div className="space-y-1.5">
                  {dish.customizationOptions.bases.map((base) => (
                    <label 
                      key={base} 
                      className={`flex items-center justify-between p-3 rounded-xl border-2 text-sm cursor-pointer transition-all ${
                        selectedBase === base 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' 
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="base-selection"
                          checked={selectedBase === base}
                          onChange={() => setSelectedBase(base)}
                          className="text-emerald-700 focus:ring-emerald-500"
                        />
                        <span>{base}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {dish.customizationOptions?.sweetener && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800">
                  2. Endulzante a tu gusto:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {dish.customizationOptions.sweetener.map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSelectedSweetener(sw)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold text-center transition-all cursor-pointer ${
                        selectedSweetener === sw
                          ? 'border-emerald-600 bg-emerald-100 text-emerald-950'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dish.customizationOptions?.extraToppings && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800">
                  Extras & Toppings Opcionales:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dish.customizationOptions.extraToppings.map((extra) => {
                    const isChecked = selectedExtras.some(e => e.name === extra.name);
                    return (
                      <button
                        key={extra.name}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border-2 text-xs text-left transition-all cursor-pointer ${
                          isChecked 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' 
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span>{extra.name}</span>
                        </div>
                        <span className="font-mono tabular-nums text-stone-800 font-bold">
                          +{extra.price.toFixed(2)}€
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="pt-2 space-y-1.5">
              <label htmlFor="special-notes" className="text-xs font-black uppercase tracking-wider text-stone-800">
                Instrucciones para cocina (opcional):
              </label>
              <input
                id="special-notes"
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Ej: sin cebolla, aliño aparte, sin hielo..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:outline-hidden focus:border-emerald-600 font-medium"
              />
            </div>

          </div>
        </div>

        {/* Sticky Bottom Actions Bar: Direct WhatsApp + Add to List */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t-2 border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Quantity Stepper */}
          <div className="flex items-center justify-center gap-2 bg-white border-2 border-stone-200 rounded-xl p-1 shrink-0 self-center sm:self-auto">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono tabular-nums font-black text-sm text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            {/* Primary Action 1: Send directly to WhatsApp */}
            <button
              type="button"
              onClick={handleOrderViaWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md transition-all cursor-pointer transform hover:scale-102"
              title="Pedir directamente por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir por WhatsApp · <span className="font-mono tabular-nums">{totalPrice.toFixed(2)}€</span></span>
            </button>

            {/* Action 2: Add to Cart Drawer List */}
            <button
              type="button"
              onClick={handleConfirm}
              className={`flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                addedSuccess 
                  ? 'bg-amber-400 border-amber-500 text-stone-950' 
                  : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir a lista</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
