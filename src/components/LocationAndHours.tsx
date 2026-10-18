import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Calendar, Navigation, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LocationAndHoursProps {
  onOpenReservation: () => void;
}

export const LocationAndHours: React.FC<LocationAndHoursProps> = ({ onOpenReservation }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Calle la Nogalera, 105, 29620 Torremolinos, Málaga, España')}`;

  return (
    <section id="ubicacion" className="py-16 bg-gradient-to-b from-stone-50 via-amber-50/30 to-emerald-50/20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-sm">
            <span>Visítanos en Torremolinos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight text-balance">
            Encuéntranos en Calle La Nogalera
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-medium">
            Un enclave privilegiado en pleno centro peatonal de La Nogalera, a pocos minutos de la estación de tren Cercanías y la playa.
          </p>
        </div>

        {/* 2-Column Info & Interactive Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            
            {/* Address Card */}
            <div className="p-5 bg-white rounded-3xl border-2 border-emerald-300 shadow-md space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-stone-900">
                    Dirección Oficial YHAPE
                  </h3>
                  <p className="text-xs text-stone-800 leading-relaxed font-bold">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Zona peatonal con terraza exterior soleada y salón climatizado.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-950 py-1"
                >
                  <Navigation className="w-4 h-4 text-emerald-700" />
                  <span>Cómo llegar con Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Telephone & WhatsApp Card with rich green */}
            <div className="p-5 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl border-2 border-amber-300 shadow-md space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-950 rounded-2xl shadow-sm shrink-0">
                  <MessageCircle className="w-6 h-6 fill-emerald-800 text-emerald-800" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-stone-900">
                      WhatsApp & Pedidos
                    </h3>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.2 rounded-full font-black uppercase">
                      Exclusivo
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-900 tracking-wide">
                    {RESTAURANT_INFO.phone}
                  </div>
                  <p className="text-[11px] text-stone-700 font-semibold leading-normal">
                    Las reservas de mesa y los pedidos para llevar o a domicilio se canalizan <strong>únicamente por WhatsApp</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-200 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href={RESTAURANT_INFO.whatsappCatalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-yellow-300 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-950" />
                  <span>Catálogo de WhatsApp</span>
                </a>
                
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-yellow-300" />
                  <span>Reservar</span>
                </button>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="p-5 bg-white rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-700 rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-stone-900">
                    Horario de Apertura
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-stone-700">
                      <span>Lunes a Viernes:</span>
                      <strong className="font-mono text-stone-900 font-bold">{RESTAURANT_INFO.schedule.weekdays}</strong>
                    </div>
                    <div className="flex justify-between text-stone-700">
                      <span>Sábados y Domingos:</span>
                      <strong className="font-mono text-stone-900 font-bold">{RESTAURANT_INFO.schedule.weekends}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-semibold pt-1">
                      <span>Cierre de cocina:</span>
                      <strong className="font-mono">{RESTAURANT_INFO.schedule.kitchenCloses}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-emerald-300 shadow-xl bg-stone-100 flex flex-col">
            <div className="p-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Mapa Interactivo · Torremolinos
                </span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-200 hover:text-white font-bold underline inline-flex items-center gap-1"
              >
                <span>Ver en pantalla completa</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 min-h-[360px] relative">
              <iframe
                title="Ubicación de YHAPE en Torremolinos"
                src="https://maps.google.com/maps?q=Calle%20la%20Nogalera%20105%20Torremolinos%20Malaga&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <span>📍 Calle la Nogalera 105, 29620 Torremolinos</span>
              <span className="text-emerald-800 font-bold">Costa del Sol, Málaga</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
