import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Trash2, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { Reservation } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onOpenNewReservation: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onOpenNewReservation,
}) => {
  if (!isOpen) return null;

  const [searchCode, setSearchCode] = useState('');

  const displayedReservations = reservations.filter(r => {
    if (!searchCode.trim()) return true;
    const term = searchCode.toLowerCase();
    return (
      r.code.toLowerCase().includes(term) ||
      r.customerName.toLowerCase().includes(term) ||
      r.phone.includes(term)
    );
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-display">
                Mis Reservas de Mesa
              </h2>
              <span className="text-xs text-stone-500">
                Historial y estado de tus reservas en YHAPE
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter if there are reservations */}
        {reservations.length > 0 && (
          <div className="p-4 bg-white border-b border-stone-100">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Buscar por código (ej: YH-1234) o teléfono..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-emerald-600"
              />
            </div>
          </div>
        )}

        {/* Content list */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4">
          {displayedReservations.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-stone-800">
                  {reservations.length === 0 ? 'No tienes reservas activas guardadas' : 'No se encontró ninguna reserva con ese filtro'}
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  {reservations.length === 0 ? 'Puedes reservar mesa online en pocos segundos para disfrutar de nuestra carta saludable.' : 'Revisa el código localizador introducido.'}
                </p>
              </div>
              {reservations.length === 0 && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenNewReservation();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Reservar Mesa Ahora</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {displayedReservations.map((res) => {
                const isConfirmed = res.status === 'confirmada';
                return (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl border border-stone-200/90 bg-stone-50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-white border border-stone-200 px-2 py-0.5 rounded-md text-emerald-800">
                            {res.code}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isConfirmed ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                          }`}>
                            {isConfirmed ? 'Confirmada' : 'Cancelada'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {res.customerName}
                        </h4>
                      </div>

                      {isConfirmed && (
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Seguro que deseas cancelar la reserva ${res.code}?`)) {
                              onCancelReservation(res.id);
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1 p-1 transition-colors cursor-pointer"
                          title="Cancelar reserva"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancelar</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600 pt-1 border-t border-stone-200/70">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Fecha:</span>
                        <span className="font-mono font-medium text-stone-800">{res.date}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Hora:</span>
                        <span className="font-mono font-medium text-stone-800">{res.time}h</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Comensales:</span>
                        <span className="font-mono font-medium text-stone-800">{res.guests} pers.</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Zona:</span>
                        <span className="capitalize font-medium text-stone-800">{res.zone}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-stone-400 block text-[10px]">Motivo:</span>
                        <span className="font-medium text-stone-800 truncate block">{res.occasion}</span>
                      </div>
                    </div>

                    {res.specialRequests && (
                      <div className="text-[11px] text-stone-500 bg-white p-2 rounded-lg border border-stone-200/60">
                        <span className="font-semibold text-stone-700">Nota:</span> {res.specialRequests}
                      </div>
                    )}

                    {isConfirmed && (
                      <div className="pt-2 border-t border-stone-200/60 flex justify-end">
                        <a
                          href={`https://wa.me/34673706031?text=${encodeURIComponent(`Hola YHAPE, quisiera consultar o modificar mi reserva #${res.code} a nombre de ${res.customerName} para el ${res.date} a las ${res.time}h.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-colors"
                        >
                          <span>Consultar por WhatsApp (+34 673 70 60 31)</span>
                          <span className="text-[10px]">➔</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenNewReservation();
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
          >
            + Hacer una nueva reserva
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
