import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, UtensilsCrossed, Package, Bike, ExternalLink } from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

type OrderType = 'local' | 'takeaway' | 'delivery';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('local');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 25 ? 0 : 2.50) : 0;
  const total = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = () => {
    let orderTypeText = '';
    if (orderType === 'local') orderTypeText = '🍽️ Consumir en el Local (Torremolinos)';
    if (orderType === 'takeaway') orderTypeText = '🛍️ Para Recoger (Take Away)';
    if (orderType === 'delivery') orderTypeText = '🛵 Entrega a Domicilio en Torremolinos';

    let msg = `*¡HOLA YHAPE! QUIERO HACER UN PEDIDO*\n\n`;
    msg += `*Tipo de Pedido:* ${orderTypeText}\n`;
    if (clientName) msg += `*Cliente:* ${clientName}\n`;
    if (clientPhone) msg += `*Teléfono:* ${clientPhone}\n`;
    if (orderType === 'delivery' && deliveryAddress) {
      msg += `*Dirección de Entrega:* ${deliveryAddress}\n`;
    }
    msg += `\n*DETALLE DE PLATOS:*\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.quantity}x ${item.menuItem.name}* (${(item.unitPrice * item.quantity).toFixed(2)}€)\n`;
      if (item.selectedBase) msg += `   - Base: ${item.selectedBase}\n`;
      if (item.selectedSweetener) msg += `   - Endulzante: ${item.selectedSweetener}\n`;
      if (item.selectedExtras.length > 0) {
        msg += `   - Extras: ${item.selectedExtras.map(e => e.name).join(', ')}\n`;
      }
      if (item.specialNotes) msg += `   - Nota: ${item.specialNotes}\n`;
    });

    msg += `\n*Subtotal:* ${subtotal.toFixed(2)}€\n`;
    if (orderType === 'delivery') {
      msg += `*Envío:* ${deliveryFee === 0 ? 'GRATIS (Supera 25€)' : `${deliveryFee.toFixed(2)}€`}\n`;
    }
    msg += `*TOTAL APROX.:* ${total.toFixed(2)}€\n`;

    if (notes) {
      msg += `\n*Comentarios Adicionales:* ${notes}\n`;
    }

    msg += `\n*Catálogo Oficial:* ${RESTAURANT_INFO.whatsappCatalogUrl}\n`;
    msg += `*Establecimiento:* Calle La Nogalera 105, Torremolinos`;

    openWhatsAppMessage(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l-2 border-emerald-400">
          
          {/* Header with Brazilian Gradient */}
          <div className="p-5 border-b border-amber-200 flex items-center justify-between bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-500 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-white text-emerald-800 rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-base font-black text-white font-display">
                  Tu Pedido para WhatsApp
                </h2>
                <span className="text-xs text-amber-200 font-mono tabular-nums font-bold">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'} seleccionados
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
              aria-label="Cerrar panel de pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Exclusive Notice Banner */}
          <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-950 font-black">
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
              <span>Pedidos <strong>ÚNICAMENTE por WhatsApp</strong></span>
            </div>
            <a
              href={RESTAURANT_INFO.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black text-emerald-950 bg-amber-300 hover:bg-amber-400 px-2.5 py-1 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
            >
              <span>Ver Catálogo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black text-stone-900 font-display">
                    Tu lista de pedido está vacía
                  </p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto font-medium">
                    Añade bowls de açaí, tapiocas sin gluten o salgados de la carta, o visita el catálogo de WhatsApp.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={RESTAURANT_INFO.whatsappCatalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-900 fill-emerald-900" />
                    <span>Abrir Catálogo de WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Explorar la Carta Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200/90 flex gap-3 hover:border-amber-300 transition-colors"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-black text-stone-900 leading-tight">
                            {item.menuItem.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization details */}
                        <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                          {item.selectedBase && (
                            <p className="line-clamp-1">Base: {item.selectedBase}</p>
                          )}
                          {item.selectedSweetener && (
                            <p className="line-clamp-1">Endulzante: {item.selectedSweetener}</p>
                          )}
                          {item.selectedExtras.length > 0 && (
                            <p className="line-clamp-1 text-emerald-700 font-medium">
                              +{item.selectedExtras.map(e => e.name).join(', ')}
                            </p>
                          )}
                          {item.specialNotes && (
                            <p className="italic text-stone-400 text-[10px]">
                              "{item.specialNotes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-1">
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-black text-emerald-800 tabular-nums">
                          {(item.unitPrice * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] font-bold text-stone-400 hover:text-rose-600 transition-colors pt-1 cursor-pointer block text-right w-full"
                >
                  Vaciar lista
                </button>
              </div>
            )}

            {/* Order Settings Form when items exist */}
            {items.length > 0 && (
              <div className="pt-4 border-t-2 border-stone-200 space-y-4 text-xs">
                
                {/* Order Type Selector */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 uppercase tracking-wide text-[11px]">
                    ¿Dónde lo disfrutarás?
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrderType('local')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                        orderType === 'local'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <UtensilsCrossed className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                      <span>En Local</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                        orderType === 'takeaway'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Package className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                      <span>Para Llevar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                        orderType === 'delivery'
                          ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Bike className="w-4 h-4 mx-auto mb-1 text-teal-700" />
                      <span>A Domicilio</span>
                    </button>
                  </div>
                </div>

                {/* Customer Contact */}
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Tu Nombre:
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej: David"
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Teléfono WhatsApp:
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ej: 673 70 60 31"
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-600 font-medium"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Dirección en Torremolinos:
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Calle, número, piso..."
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-600 font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Notas para cocina (opcional):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Alergias, cambio de cubiertos..."
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Drawer Footer Checkout (WhatsApp Only) */}
          {items.length > 0 && (
            <div className="p-5 border-t-2 border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-bold">{subtotal.toFixed(2)}€</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-stone-600">
                    <span>Envío</span>
                    <span className="font-mono tabular-nums font-bold">
                      {deliveryFee === 0 ? 'GRATIS' : `${deliveryFee.toFixed(2)}€`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Estimado</span>
                  <span className="font-mono tabular-nums text-emerald-800 text-lg">
                    {total.toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* Primary Action: Send to WhatsApp */}
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 shadow-xl transition-all cursor-pointer transform hover:scale-102"
              >
                <MessageCircle className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Enviar Pedido por WhatsApp ({RESTAURANT_INFO.phone})</span>
              </button>

              {/* Direct Link to Catalog */}
              <a
                href={RESTAURANT_INFO.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-emerald-950 bg-amber-200 hover:bg-amber-300 border border-amber-300 transition-colors cursor-pointer text-center"
              >
                <span>Abrir Catálogo Oficial: wa.me/c/34673706031</span>
              </a>

              <p className="text-[11px] text-center text-stone-500 font-medium leading-normal">
                Al pulsar se abrirá WhatsApp con el resumen listo para confirmación de cocina.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
