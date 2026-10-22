import React, { useState } from 'react';
import { MenuItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';
import { 
  Sparkles, 
  ZoomIn, 
  MessageCircle, 
  Info, 
  X, 
  ExternalLink,
  ChevronRight,
  Heart,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  categoryKey: string;
  priceDisplay: string;
  image: string;
  badges: string[];
  description: string;
  highlights: string[];
  allergens: string[];
  options?: string[];
  whatsappMessage: string;
}

const SHOWCASE_ITEMS: InteractiveShowcaseItem[] = [
  {
    id: 'pasteles-feira',
    title: 'Pasteles Brasileños de Feria',
    subtitle: 'Pastel de Feira Crocante',
    categoryLabel: 'Pasteles de Feria',
    categoryKey: 'pasteles',
    priceDisplay: 'Desde 5,00€',
    image: '/images/yhape_pastel.jpg',
    badges: ['🔥 Frito al Momento', '🧀 Queso Fundido', '🇧🇷 100% Paulista'],
    description: 'Nuestra masa artesanal ultrafina y burbujeante, frita al momento para una textura crujiente insuperable. Rellenos generosos de carne picada sazonada, queso fundido, pollo o pizza.',
    highlights: [
      'Carne de ternera sazonada (5,00€)',
      'Queso mozzarella fundido con orégano (5,00€)',
      'Pollo desmechado jugoso (5,00€)',
      'Especial: Carne o Pollo con Queso fundido (5,60€)',
      'Acompañado de ensalada Vinagrete fresca (+0,80€)'
    ],
    allergens: ['Gluten', 'Lácteos (opción queso/pizza)'],
    options: ['Carne', 'Queso', 'Pollo', 'Pizza', 'Carne con Queso', 'Pollo con Queso'],
    whatsappMessage: '¡Hola YHAPE! 👋 Quiero pedir Pasteles Brasileños de Feria recién hechos. ¿Tenéis disponibles para preparar ahora?',
  },
  {
    id: 'cheeseburger-combo',
    title: 'Menú Cheeseburger Artesanal',
    subtitle: 'Con Patatas Fritas & Refresco',
    categoryLabel: 'Hamburguesas',
    categoryKey: 'burgers',
    priceDisplay: '13,90€ Menú · 9,90€ Solo',
    image: '/images/yhape_cheeseburger.jpg',
    badges: ['👑 Menú Completo', '🥩 Vacuno 100%', '🍟 Patatas & Bebida'],
    description: 'Hamburguesa casera con carne de vacuno de primera a la plancha, queso cheddar fundido, mayonesa artesanal secreta YHAPE, lechuga y tomate en pan suave tostado. Incluye ración de patatas y bebida.',
    highlights: [
      'Carne de vacuno jugosa a la plancha',
      'Queso cheddar fundido y mayonesa YHAPE',
      'Ración de patatas fritas crujientes incluida',
      'Bebida fría a elegir (Coca-Cola, Fanta, Sprite, Nestea o Guaraná)'
    ],
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    options: ['Menú Completo (13,90€)', 'Solo Cheeseburger (9,90€)'],
    whatsappMessage: '¡Hola YHAPE! 👋 Quiero pedir el Menú Cheeseburger completo con patatas y refresco. ¿Me confirmáis disponibilidad?',
  },
  {
    id: 'churros-dulce-leche',
    title: 'Churros Rellenos con Dulce de Leche',
    subtitle: 'Mini en Vaso & Grandes Unidades',
    categoryLabel: 'Churros',
    categoryKey: 'churros',
    priceDisplay: '5,00€ Vaso · 5,50€ Grandes',
    image: '/images/yhape_churros.jpg',
    badges: ['🍯 Dulce de Leche', '🍓 Toppings a Elegir', '☕ Ideal Merienda'],
    description: 'Churros dorados y crujientes espolvoreados con azúcar. Pídelos en vaso para llevar rellenos de dulce de leche o en unidades grandes con hasta 3 rellenos y frutas frescas.',
    highlights: [
      'Mini Churros en vaso rellenos de dulce de leche (5,00€)',
      'Churros grandes con 3 rellenos a elegir (5,50€)',
      'Rellenos disponibles: Fresa natural, Plátano, Dulce de leche, Coco rallado y Leche condensada',
      'Masa frita al momento bien crujiente'
    ],
    allergens: ['Gluten', 'Lácteos'],
    options: ['Mini Churros en vaso (5,00€)', 'Churros Grandes 3 rellenos (5,50€)'],
    whatsappMessage: '¡Hola YHAPE! 👋 Quiero pedir Churros con dulce de leche recién hechos. ¿Podéis preparármelos? ¡Gracias!',
  },
  {
    id: 'acai-bowls-amazon',
    title: 'Açaí Bowls Brasileños',
    subtitle: 'Copacabana, Pasión & Tradicional',
    categoryLabel: 'Açaí Bowls',
    categoryKey: 'acai',
    priceDisplay: '10,50€ (350g) · 13,50€ (500g)',
    image: '/images/yhape_acai_bowl_1792219575515.jpg',
    badges: ['🍇 Açaí Puro Salvaje', '🍌 Fruta Fresca', '⚡ Energía 100%'],
    description: 'Puro açaí silvestre amazónico de textura cremosa y refrescante servido en bol con frutas frescas, granola crujiente y complementos tradicionales brasileños.',
    highlights: [
      'Bowl Copacabana: Açaí, granola, plátano, mango, kiwi, coco rallado y crema de cacao',
      'Bowls Brasileños: Açaí, leche en polvo (leite Ninho), granola, plátano, fresa y leche condensada',
      'Bowl Pasión: Açaí, crema de maracuyá, fresas, plátano, coco rallado y dulce de leche',
      'Tamaños: 350 grs (10,50€) y 500 grs (13,50€) · Extra topping: 0,80€'
    ],
    allergens: ['Frutos secos', 'Lácteos (según bowl)'],
    options: ['Bowl Copacabana', 'Bowl Brasileño con Leite Ninho', 'Bowl Pasión con Maracuyá'],
    whatsappMessage: '¡Hola YHAPE! 👋 Me gustaría pedir un Açaí Bowl de la carta oficial. ¿Me indicáis opciones disponibles?',
  },
  {
    id: 'salgados-croquetas',
    title: 'Croquetas & Salgados Brasileños',
    subtitle: 'Coxinha, Risoles & Kibe de Carne',
    categoryLabel: 'Croquetas & Salgados',
    categoryKey: 'salados',
    priceDisplay: '3,50€ Unidad · 6,50€ Mix (6 uds)',
    image: '/images/yhape_salgados_fiesta_1792219576390.jpg',
    badges: ['🥟 Coxinha de Pollo', '⭐ Mix 6 Unidades', '💛 Crujiente'],
    description: 'El aperitivo brasileño más célebre: masa artesana dorada con relleno cremoso de pollo en forma de gota (coxinha), risoles de jamón y queso fundido, y albóndiga de trigo bulgur con ternera (kibe).',
    highlights: [
      'Coxinha Brasileña rellena de pollo cremoso (3,50€)',
      'Risoles Brasileños rellenos de carne, jamón y queso (3,50€)',
      'Kibe de Carne especiado con menta (3,50€)',
      'Mix de Croquetas (6 unidades surtidas por 6,50€)'
    ],
    allergens: ['Gluten', 'Lácteos'],
    options: ['Coxinha (3,50€)', 'Risoles (3,50€)', 'Kibe (3,50€)', 'Mix 6 Croquetas (6,50€)'],
    whatsappMessage: '¡Hola YHAPE! 👋 Quiero pedir una ración de Coxinhas / Salgados brasileños. ¿Están recién hechos?',
  },
  {
    id: 'tapas-calabresa-yuca',
    title: 'Tapas de Calabresa & Yuca Frita',
    subtitle: 'Con Farofa de Mandioca & Vinagrete',
    categoryLabel: 'Tapas & Picoteo',
    categoryKey: 'tapas',
    priceDisplay: '7,50€ Calabresa · 5,50€ Yuca',
    image: '/images/yhape_hero_spread_1792219574249.jpg',
    badges: ['🇧🇷 Tapa de Boteco', '🌿 Harina de Yuca', '🥗 Vinagrete Casera'],
    description: 'La tapa reina de los bares brasileños: salchicha linguiça calabresa ahumada laminada y dorada, acompañada de harina de yuca tostada a la mantequilla y ensalada fresca vinagrete.',
    highlights: [
      'Tapa de Salchicha Ahumada Calabresa con farofa y vinagrete (7,50€)',
      'Tapa de Yuca Frita crujiente por fuera y tierna por dentro (5,50€)',
      'Tapa de Patatas Fritas doradas (5,50€)',
      'Extra Vinagrete (+1,00€) y Extra Farofa de Yuca (+0,80€)'
    ],
    allergens: ['Puede contener trazas de gluten'],
    options: ['Tapa de Salchicha Calabresa (7,50€)', 'Tapa de Yuca Frita (5,50€)', 'Tapa Patatas Fritas (5,50€)'],
    whatsappMessage: '¡Hola YHAPE! 👋 Quiero pedir una Tapa de Salchicha Calabresa con farofa y vinagrete en terraza. ¡Gracias!',
  },
  {
    id: 'reposteria-tartas',
    title: 'Tartas Caseras & Bombones Brasileños',
    subtitle: 'Tarta de Queso, Limão & Brigadeiros',
    categoryLabel: 'Postres',
    categoryKey: 'postres',
    priceDisplay: '5,00€ Tartas · 2,50€ Bombón',
    image: '/images/yhape_tarta_cumpleanos_1792219591690.jpg',
    badges: ['🍰 Tarta de Limão', '🍫 Brigadeiro Puro', '🥥 Beijinho de Coco'],
    description: 'Repostería artesanal recién horneada: suave tarta de queso con frutos rojos, tarta brasileña de lima con crema dulce de leche condensada, y bombones brigadeiro y beijinho.',
    highlights: [
      'Tarta de Queso artesanal con coulis (5,00€)',
      'Tarta de Limão tradicional brasileña (5,00€)',
      'Brigadeiro de chocolate y leche condensada (2,50€)',
      'Beijinho de coco aromático con clavo dulce (2,50€)'
    ],
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    options: ['Tarta de Limão (5,00€)', 'Tarta de Queso (5,00€)', 'Brigadeiro (2,50€)', 'Beijinho (2,50€)'],
    whatsappMessage: '¡Hola YHAPE! 👋 Me gustaría pedir postres caseros (Tarta de Limão / Brigadeiros). ¿Cuáles tenéis listos hoy?',
  },
];

export const InteractiveDishGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<InteractiveShowcaseItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filterCategories = [
    { key: 'todos', label: 'Todos los Platos' },
    { key: 'pasteles', label: 'Pasteles de Feria' },
    { key: 'burgers', label: 'Cheeseburger' },
    { key: 'churros', label: 'Churros' },
    { key: 'acai', label: 'Açaí Bowls' },
    { key: 'salados', label: 'Croquetas' },
    { key: 'tapas', label: 'Tapas de Boteco' },
    { key: 'postres', label: 'Postres' },
  ];

  const filteredItems = activeFilter === 'todos' 
    ? SHOWCASE_ITEMS 
    : SHOWCASE_ITEMS.filter(item => item.categoryKey === activeFilter);

  const handleOrder = (item: InteractiveShowcaseItem) => {
    openWhatsAppMessage(item.whatsappMessage);
  };

  return (
    <div className="space-y-8 pt-8">
      {/* Header of Interactive Gallery */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black uppercase tracking-wider border border-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Galería Fotográfica Interactiva</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight">
          Nuestras Especialidades en Imágenes
        </h3>
        <p className="text-sm sm:text-base text-stone-600 font-medium">
          Toca o haz clic sobre cualquier fotografía para ampliarla, conocer sus ingredientes, rellenos y pedirla directamente por WhatsApp al restaurante.
        </p>

        {/* Filter chips with horizontal swipe on mobile */}
        <div className="flex items-center sm:justify-center gap-2 pt-3 overflow-x-auto pb-2 scrollbar-none max-w-full px-2">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveFilter(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === cat.key
                  ? 'bg-emerald-700 text-white shadow-xs scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Grid with Zoom & Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-white rounded-3xl overflow-hidden border-2 border-stone-200 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with Badges */}
            <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                <span className="bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                  {item.categoryLabel}
                </span>
                {item.badges.slice(0, 1).map((b, i) => (
                  <span key={i} className="bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs hidden sm:inline-block">
                    {b}
                  </span>
                ))}
              </div>

              {/* Price Tag Pill */}
              <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-xs text-white text-xs font-mono font-black px-3 py-1.5 rounded-xl shadow-md border border-white/20">
                {item.priceDisplay}
              </div>

              {/* Interactive Zoom Indicator */}
              <div className="absolute bottom-3 right-3 bg-white/90 group-hover:bg-amber-400 text-stone-900 p-2 rounded-xl shadow-md transition-all transform group-hover:scale-110">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Image Title on Bottom Overlay */}
              <div className="absolute bottom-3 left-3 right-14 text-white">
                <h4 className="text-base sm:text-lg font-black font-display leading-tight drop-shadow-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-amber-200 font-medium line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Card Content & Interactive Buttons */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-stone-600 font-medium line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Highlights Preview */}
              <div className="space-y-1 pt-1 border-t border-stone-100">
                {item.highlights.slice(0, 2).map((h, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-700 font-semibold">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrder(item);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  title="Pedir directamente por WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Pedir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-300 transition-colors cursor-pointer"
                >
                  <span>Ver Detalle</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE MODAL FOR SELECTED DISH                      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm transition-all"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-400 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-stone-700 hover:text-stone-950 shadow-md cursor-pointer transition-all hover:scale-105"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative aspect-16/9 w-full bg-stone-200 overflow-hidden shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="inline-block bg-amber-400 text-stone-950 text-xs font-black uppercase px-2.5 py-0.5 rounded-md mb-1.5 shadow-sm">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white drop-shadow-sm">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200 font-medium">
                    {selectedItem.subtitle} · <strong className="font-mono text-white text-base">{selectedItem.priceDisplay}</strong>
                  </p>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {selectedItem.badges.map((b, i) => (
                    <span
                      key={i}
                      className="bg-amber-100 text-amber-950 text-xs font-black px-3 py-1 rounded-lg border border-amber-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-black text-stone-400 mb-1">
                    Descripción del Plato
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Options & Highlights */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-black text-amber-950">
                    Opciones y Detalles en Carta:
                  </h4>
                  <ul className="text-xs text-stone-800 space-y-1.5 font-semibold">
                    {selectedItem.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold shrink-0">➔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Allergens notice */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Alérgenos:</strong> {selectedItem.allergens.join(', ')}. Consulta a nuestro personal para más detalles.
                  </span>
                </div>
              </div>

              {/* Modal Sticky Footer Actions */}
              <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-stone-500 font-semibold block">Precio en Carta Oficial</span>
                  <span className="text-xl font-black font-mono text-emerald-900">{selectedItem.priceDisplay}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleOrder(selectedItem)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer transform hover:scale-102"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Pedir por WhatsApp (+34 673 70 60 31)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
