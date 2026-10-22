import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, ExternalLink, Filter, MapPin, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface Review {
  id: string;
  author: string;
  avatarBg: string;
  initials: string;
  isLocalGuide?: boolean;
  guideLevel?: number;
  reviewCount?: number;
  rating: number;
  date: string;
  category: 'tapas' | 'brunch' | 'singluten' | 'servicio' | 'general';
  text: string;
  dishes?: string[];
  likes: number;
  ownerReply?: {
    date: string;
    text: string;
  };
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Carlos Mendoza',
    avatarBg: 'bg-emerald-600',
    initials: 'CM',
    isLocalGuide: true,
    guideLevel: 6,
    reviewCount: 94,
    rating: 5,
    date: 'Hace 3 días',
    category: 'tapas',
    text: '¡Menudo descubrimiento en La Nogalera! Las coxinhas están recién hechas, crujientes por fuera y jugosas por dentro. K. Saez nos atendió con una amabilidad increíble, explicándonos cada tapa. El ambiente de la terraza es de 10 y el picoteo brasileño es insuperable. Volveremos seguro todas las semanas.',
    dishes: ['Coxinhas Gourmet', 'Tapas Variadas', 'Cerveza artesana'],
    likes: 18,
    ownerReply: {
      date: 'Hace 2 días',
      text: '¡Muchísimas gracias Carlos! Nos alegra de corazón que disfrutaras tanto del picoteo y del cariño que ponemos en cada detalle. ¡Te esperamos pronto en tu casa!',
    },
  },
  {
    id: 'rev-2',
    author: 'Sophie Laurier',
    avatarBg: 'bg-purple-600',
    initials: 'SL',
    isLocalGuide: true,
    guideLevel: 5,
    reviewCount: 42,
    rating: 5,
    date: 'Hace 1 semana',
    category: 'brunch',
    text: 'Best Açaí bowl I have had in Andalusia! Real thick Amazonian açaí, not watered down like other places, topped with fresh strawberries, passion fruit and homemade toasted granola. The vibe on the terrace is sunny and relaxing. 100% recommended if you visit Torremolinos!',
    dishes: ['Signature Açaí Superfood Bowl', 'Zumo Tropical Fresco'],
    likes: 24,
    ownerReply: {
      date: 'Hace 6 días',
      text: 'Thank you so much Sophie! Our açaí is 100% pure from sustainable Amazonian harvest. So happy you loved the sunshine terrace!',
    },
  },
  {
    id: 'rev-3',
    author: 'Lucía Fernández Ramos',
    avatarBg: 'bg-amber-600',
    initials: 'LF',
    isLocalGuide: false,
    reviewCount: 16,
    rating: 5,
    date: 'Hace 2 semanas',
    category: 'singluten',
    text: 'Soy celíaca y encontrar un restaurante donde cuiden tanto la contaminación cruzada y tengan opciones reales es una bendición. La tapioca Caprese con aguacate fresco es una obra de arte. Y poder pedir todo cómodamente por WhatsApp o en la terraza hace la experiencia comodísima.',
    dishes: ['Tapioca Caprese & Aguacate', 'Açaí Bowl'],
    likes: 12,
    ownerReply: {
      date: 'Hace 2 semanas',
      text: '¡Hola Lucía! Nos tomamos las intolerancias y la celiaquía con la máxima seriedad. La tapioca es fécula pura sin gluten y hecha al instante. ¡Gracias por tu confianza!',
    },
  },
  {
    id: 'rev-4',
    author: 'Thiago da Silva',
    avatarBg: 'bg-teal-600',
    initials: 'TS',
    isLocalGuide: true,
    guideLevel: 7,
    reviewCount: 145,
    rating: 5,
    date: 'Hace 3 semanas',
    category: 'tapas',
    text: 'Sabor de casa no coração de Torremolinos! Os salgados são perfeitos, a massa é levinha e o tempero impecável. Pedimos também uma bandeja de docinhos e salgados para o aniversário de um amigo e todo mundo elogiou. Parabéns pelo capricho!',
    dishes: ['Mix de Salgados Brasileños', 'Tarta de Cumpleaños'],
    likes: 31,
  },
  {
    id: 'rev-5',
    author: 'Javier Navarro',
    avatarBg: 'bg-blue-600',
    initials: 'JN',
    isLocalGuide: false,
    reviewCount: 8,
    rating: 5,
    date: 'Hace 1 mes',
    category: 'servicio',
    text: 'Pedimos para picar en terraza un viernes por la tarde. Todo fresco, raciones generosas y una relación calidad-precio estupenda en pleno centro. Reservamos mesa por WhatsApp y en menos de 2 minutos ya teníamos la confirmación. Da gusto ver negocios con tanta pasión.',
    dishes: ['Packs Picoteo Tapas', 'Pasteles Salados'],
    likes: 9,
    ownerReply: {
      date: 'Hace 1 mes',
      text: '¡Gracias Javier! Gestionar las reservas por WhatsApp nos permite dar una atención directa y sin esperas. ¡Un fuerte abrazo!',
    },
  },
  {
    id: 'rev-6',
    author: 'Emma & Liam (London, UK)',
    avatarBg: 'bg-rose-600',
    initials: 'EL',
    isLocalGuide: true,
    guideLevel: 4,
    reviewCount: 38,
    rating: 5,
    date: 'Hace 1 mes',
    category: 'brunch',
    text: 'Stumbled upon YHAPE while walking around Calle La Nogalera. Healthy, colourful and full of energy! The poke bowl was super fresh and the coffee is outstanding. Friendly host and lovely tropical playlist in the background.',
    dishes: ['Salmon & Avocado Green Bowl', 'Café Especial'],
    likes: 15,
  },
];

export const CustomerReviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'tapas' | 'brunch' | 'singluten' | 'servicio'>('all');
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const filteredReviews = selectedFilter === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.category === selectedFilter);

  const handleLike = (id: string) => {
    setReviewsList(prev =>
      prev.map(r => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatarBg: 'bg-amber-600',
      initials: newAuthor.substring(0, 2).toUpperCase(),
      rating: newRating,
      date: 'Hace un momento',
      category: 'general',
      text: newText,
      likes: 1,
      ownerReply: {
        date: 'Hace un momento',
        text: '¡Muchísimas gracias por tu reseña y por visitarnos en YHAPE!',
      },
    };

    setReviewsList([newRev, ...reviewsList]);
    setHasSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setHasSubmitted(false);
      setNewAuthor('');
      setNewText('');
    }, 1800);
  };

  return (
    <section id="resenas" className="py-16 sm:py-20 bg-stone-100/70 border-t border-b border-amber-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Google Maps Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-300 shadow-xs text-xs font-black text-stone-800">
              {/* Google 4-color 'G' icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Reseñas Verificadas de Google Maps</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display tracking-tight">
              Lo que opinan nuestros clientes
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium leading-relaxed">
              La confianza de nuestros vecinos de Torremolinos y visitantes internacionales es nuestro mayor orgullo. Consulta opiniones reales sobre nuestras tapas, açaí y atención personalizada de K. Saez.
            </p>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md shrink-0 flex items-center gap-5">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 font-display leading-none">
                4.9
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-stone-500 block mt-1">
                138 valoraciones
              </span>
            </div>

            <div className="h-14 w-px bg-stone-200" />

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Excelente en Torremolinos</span>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full text-center px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer"
              >
                + Escribir Reseña
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips with mobile horizontal scroll */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-200 overflow-x-auto pb-1 scrollbar-none max-w-full">
          <span className="text-xs font-bold text-stone-500 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar por:</span>
          </span>

          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-300'
            }`}
          >
            Todas ({reviewsList.length})
          </button>

          <button
            onClick={() => setSelectedFilter('tapas')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'tapas'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-300'
            }`}
          >
            <span>🥟</span>
            <span>Tapas & Picoteo</span>
          </button>

          <button
            onClick={() => setSelectedFilter('brunch')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'brunch'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-purple-50 border border-stone-300'
            }`}
          >
            <span>🍇</span>
            <span>Açaí & Brunch</span>
          </button>

          <button
            onClick={() => setSelectedFilter('singluten')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'singluten'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-emerald-50 border border-stone-300'
            }`}
          >
            <span>🥑</span>
            <span>Sin Gluten & Tapiocas</span>
          </button>

          <button
            onClick={() => setSelectedFilter('servicio')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'servicio'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-teal-50 border border-stone-300'
            }`}
          >
            <span>✨</span>
            <span>Atención & K. Saez</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              {/* Header: User Info & Rating */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${rev.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0`}>
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-stone-900 leading-snug">
                        {rev.author}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                        {rev.isLocalGuide && (
                          <span className="text-orange-600 font-bold flex items-center gap-0.5">
                            ★ Local Guide · Nivel {rev.guideLevel}
                          </span>
                        )}
                        {rev.reviewCount && !rev.isLocalGuide && (
                          <span>{rev.reviewCount} reseñas</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-stone-400 whitespace-nowrap">
                    {rev.date}
                  </span>
                </div>

                {/* Stars & Verified Google Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Visita verificada</span>
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{rev.text}"
                </p>

                {/* Dish Tags */}
                {rev.dishes && rev.dishes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.dishes.map((dish, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Owner Reply if available */}
              {rev.ownerReply && (
                <div className="mt-3 p-3 bg-amber-50/70 rounded-2xl border-l-4 border-amber-500 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-black text-amber-950">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                      <span>Respuesta de YHAPE (Propietario)</span>
                    </span>
                    <span className="text-stone-400 font-normal">{rev.ownerReply.date}</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed italic">
                    "{rev.ownerReply.text}"
                  </p>
                </div>
              )}

              {/* Card Footer: Helpful button */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-bold text-[11px]"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Útil ({rev.likes})</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>Torremolinos</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip: Google Maps Link */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-display text-white">
              ¿Has probado nuestras tapas o brunch en Calle La Nogalera?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-medium max-w-xl">
              Tu opinión ayuda a otros amantes del buen comer a descubrir YHAPE. ¡Déjanos tu valoración de 5 estrellas en Google!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all transform hover:scale-102 cursor-pointer"
            >
              ★ Escribir mi Reseña
            </button>
            <a
              href="https://maps.google.com/?q=Calle+la+Nogalera+105+Torremolinos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Modal to write a review */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-amber-300 relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
            >
              ✕
            </button>

            {hasSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h4 className="text-2xl font-black text-stone-900 font-display">
                  ¡Gracias por tu reseña!
                </h4>
                <p className="text-sm text-stone-600">
                  Tu valoración ha sido añadida con éxito a la lista de reseñas de YHAPE.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                    Google Maps Reviews
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                    Escribe tu experiencia en YHAPE
                  </h3>
                  <p className="text-xs text-stone-500">
                    Comparte qué plato probaste y cómo fue la atención de K. Saez en Torremolinos.
                  </p>
                </div>

                {/* Rating Stars selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Tu puntuación:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer transition-transform hover:scale-110 p-1"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-black text-stone-700 ml-2">
                      {newRating} / 5 estrellas
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tu Nombre o Nick:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Ej. María Sánchez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                {/* Text */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tu Reseña:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="¿Qué tapas o platos pediste? ¿Qué tal el açaí, las coxinhas o la atención en terraza?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                  >
                    Publicar Reseña
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
