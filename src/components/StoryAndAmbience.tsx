import React from 'react';
import { Heart, Sparkles, Sun, Leaf, Award } from 'lucide-react';

export const StoryAndAmbience: React.FC = () => {
  return (
    <section id="filosofia" className="py-16 bg-gradient-to-b from-white via-amber-50/40 to-emerald-50/30 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Bento with colorful gradient borders */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 aspect-4/3 bg-stone-100 transform hover:scale-102 transition-transform">
                <img
                  src="/src/assets/images/yhape_tapioca_fit_1792219576272.jpg"
                  alt="Tapioca artesanal saludable rellena de aguacate en YHAPE"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-orange-300 aspect-1/1 bg-stone-100 transform hover:scale-102 transition-transform">
                <img
                  src="/src/assets/images/yhape_salgados_fiesta_1792219576390.jpg"
                  alt="Salgados y brigadeiros gourmet tradicionales"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-purple-300 aspect-1/1 bg-stone-100 transform hover:scale-102 transition-transform">
                <img
                  src="/src/assets/images/yhape_acai_bowl_1792219575515.jpg"
                  alt="Açai bowl orgánico con frutas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-emerald-300 aspect-4/3 bg-stone-100 transform hover:scale-102 transition-transform">
                <img
                  src="/src/assets/images/yhape_poke_bowl_saludable_1792219591423.jpg"
                  alt="Poke bowl de quinoa y salmón"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nuestra Historia & Pasión Tropical</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
                Comer bien y celebrar la vida: la esencia viva de YHAPE.
              </h2>
            </div>

            <p className="text-base text-stone-700 leading-relaxed font-normal">
              En el corazón de Torremolinos, en la emblemática Calle La Nogalera, nació <strong className="font-extrabold text-emerald-900">YHAPE</strong> con un propósito transparente: demostrar que la comida verdaderamente saludable, viva y nutritiva puede convivir en perfecta armonía con el calor de la repostería artesanal y la alegría brasileña.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed font-medium">
              Aquí no creemos en ultraprocesados. Seleccionamos açai salvaje sin azúcares añadidos, amasamos tapioca pura de yuca en plancha directa (naturalmente sin gluten), asamos al horno nuestras coxinhas fit y preparamos a mano cada tarta con dedicación para que tus desayunos, meriendas y cumpleaños sean inolvidables.
            </p>

            {/* 3 Value Pillars with vibrant color themes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Materia Prima Real & Proximidad</h4>
                  <p className="text-xs text-emerald-800 font-medium">Aguacates de la Axarquía, frutas frescas de la huerta andaluza y superalimentos certificados.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">Tradición Artesanal Brasileña</h4>
                  <p className="text-xs text-amber-800 font-medium">Masa casera cocinada a fuego lento, brigadeiros enrollados a mano y pasteles con cariño.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-rose-50/80 border border-rose-200">
                <div className="p-2.5 rounded-xl bg-rose-500 text-white shadow-xs shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-950">Inclusivo con Alergias & Dietas</h4>
                  <p className="text-xs text-rose-800 font-medium">Opciones celíacas, veganas, sin lactosa y keto claramente identificadas en nuestra carta.</p>
                </div>
              </div>

              {/* Colorful WhatsApp Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between gap-3 shadow-md">
                <div className="text-xs space-y-0.5">
                  <div className="font-black text-amber-300 uppercase tracking-wide">
                    Atención Directa por WhatsApp
                  </div>
                  <p className="text-emerald-100 font-medium">
                    Pregúntanos por alérgenos, disponibilidad de tartas o reserva tu mesa.
                  </p>
                </div>
                <a
                  href="https://wa.me/34673706031"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-yellow-300 text-stone-950 font-black text-xs whitespace-nowrap shadow-xs transition-colors shrink-0"
                >
                  WhatsApp: 673 70 60 31
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
