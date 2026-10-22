import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Download, MessageCircle, Sparkles, ChevronRight, ChevronLeft, HeartHandshake, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiningZone, Reservation } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppMessage } from '../utils/whatsapp';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationCreated: (res: Reservation) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  onReservationCreated,
}) => {
  if (!isOpen) return null;

  // Wizard state: 1 = Details (Date, Guests, Time), 2 = Zone, 3 = Guest contact, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Today's ISO date string
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [guests, setGuests] = useState<number>(2);
  const [time, setTime] = useState<string>('14:00');
  const [zone, setZone] = useState<DiningZone>('terraza');
  const [occasion, setOccasion] = useState<string>('Casual / Comida saludable');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    { label: 'Almuerzo / Comida', times: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'] },
    { label: 'Merienda, Café & Dulces', times: ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'] },
    { label: 'Cena', times: ['20:00', '20:30', '21:00', '21:30'] },
  ];

  const handleFinishReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    let zoneName = '';
    if (zone === 'terraza') zoneName = '☀️ Terraza Soleada Calle La Nogalera';
    if (zone === 'salon') zoneName = '🌿 Salón Tropical Climatizado';
    if (zone === 'fiesta') zoneName = '🎂 Mesa Especial de Cumpleaños';

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `YH-${randomSuffix}`;

    const msg = 
      `*¡HOLA YHAPE! QUIERO RESERVAR UNA MESA*\n\n` +
      `*Solicitud:* #${code}\n` +
      `*Nombre:* ${customerName.trim()}\n` +
      (phone.trim() ? `*Teléfono:* ${phone.trim()}\n` : '') +
      `*Fecha:* ${date}\n` +
      `*Hora:* ${time}h\n` +
      `*Comensales:* ${guests} personas\n` +
      `*Zona deseada:* ${zoneName}\n` +
      `*Motivo / Ocasión:* ${occasion}\n` +
      (specialRequests.trim() ? `*Peticiones especiales:* ${specialRequests.trim()}\n` : '') +
      `\n¿Tenéis disponibilidad para confirmarme esta mesa en Calle La Nogalera, Torremolinos? ¡Muchas gracias!`;

    openWhatsAppMessage(msg);

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      code,
      customerName: customerName.trim(),
      phone: phone.trim() || 'WhatsApp',
      email: email.trim(),
      date,
      time,
      guests,
      zone,
      occasion,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(newRes);
    onReservationCreated(newRes);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setStep(4);
  };

  const handleDirectQuickWhatsApp = () => {
    const msg = `¡Hola YHAPE! Quisiera reservar una mesa en vuestro establecimiento de Calle La Nogalera 105, Torremolinos.`;
    openWhatsAppMessage(msg);
  };

  // Download .ics calendar event
  const downloadCalendarFile = () => {
    if (!confirmedReservation) return;
    const [year, month, day] = confirmedReservation.date.split('-');
    const [hour, minute] = confirmedReservation.time.split(':');
    
    const startStr = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String(Number(hour) + 2).padStart(2, '0');
    const endStr = `${year}${month}${day}T${endHour}${minute}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//YHAPE Torremolinos//Reserva de Mesa//ES',
      'BEGIN:VEVENT',
      `UID:${confirmedReservation.code}@yhape.com`,
      `DTSTAMP:${startStr}Z`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:Reserva en YHAPE Torremolinos (${confirmedReservation.guests} personas)`,
      `DESCRIPTION:Reserva confirmada #${confirmedReservation.code}. Zona: ${confirmedReservation.zone}. Tel: ${RESTAURANT_INFO.phone}`,
      `LOCATION:${RESTAURANT_INFO.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `reserva-yhape-${confirmedReservation.code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp notification
  const sendWhatsAppConfirmation = () => {
    if (!confirmedReservation) return;
    let zoneName = '';
    if (confirmedReservation.zone === 'terraza') zoneName = '☀️ Terraza Nogalera';
    if (confirmedReservation.zone === 'salon') zoneName = '🌿 Salón Tropical Climatizado';
    if (confirmedReservation.zone === 'fiesta') zoneName = '🎂 Mesa Especial de Cumpleaños';

    const msg = 
      `*HOLA YHAPE! CONFIRMO MI RESERVA DE MESA*\n\n` +
      `*Código:* ${confirmedReservation.code}\n` +
      `*Nombre:* ${confirmedReservation.customerName}\n` +
      `*Fecha:* ${confirmedReservation.date}\n` +
      `*Hora:* ${confirmedReservation.time}\n` +
      `*Comensales:* ${confirmedReservation.guests} personas\n` +
      `*Zona:* ${zoneName}\n` +
      `*Motivo:* ${confirmedReservation.occasion}\n` +
      (confirmedReservation.specialRequests ? `*Peticiones especiales:* ${confirmedReservation.specialRequests}\n` : '') +
      `\n¡Nos vemos pronto en Calle La Nogalera, Torremolinos!`;

    openWhatsAppMessage(msg);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-emerald-400 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Brazilian Gradient */}
        <div className="p-5 border-b border-amber-200 flex items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white text-emerald-800 rounded-2xl shadow-sm">
              <Calendar className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-display">
                Reserva tu Mesa en YHAPE
              </h2>
              <span className="text-xs text-amber-200 font-medium">
                Calle La Nogalera 105, Torremolinos
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Notice: Reservas ÚNICAMENTE por WhatsApp */}
        <div className="px-5 py-3 bg-amber-50 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-black text-amber-950">
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Reservas gestionadas <strong>ÚNICAMENTE por WhatsApp</strong> (+34 673 70 60 31)</span>
          </div>
          
          <button
            type="button"
            onClick={handleDirectQuickWhatsApp}
            className="text-[11px] font-black text-emerald-950 bg-emerald-200 hover:bg-emerald-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
          >
            <span>WhatsApp Directo</span>
            <span>➔</span>
          </button>
        </div>

        {/* Step Progress Indicator (when not confirmed) */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between text-xs text-stone-500 font-bold">
            <span className={step >= 1 ? 'text-emerald-800 font-black' : ''}>1. Comensales & Hora</span>
            <span aria-hidden="true" className="text-emerald-300">→</span>
            <span className={step >= 2 ? 'text-emerald-800 font-black' : ''}>2. Ambiente</span>
            <span aria-hidden="true" className="text-emerald-300">→</span>
            <span className={step >= 3 ? 'text-emerald-800 font-black' : ''}>3. Enviar a WhatsApp</span>
          </div>
        )}

        {/* Step Contents */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* STEP 1: Date, Time & Number of Guests */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Guests Count Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-700" />
                  Número de Comensales:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-2 rounded-xl text-xs font-black font-mono tabular-nums border-2 transition-all cursor-pointer ${
                        guests === num
                          ? 'border-emerald-600 bg-emerald-100 text-emerald-950 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {num} {num === 1 ? 'persona' : 'pers.'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label htmlFor="res-date" className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  Fecha de la Reserva:
                </label>
                <input
                  id="res-date"
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-semibold"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  Hora Deseada:
                </label>
                <div className="space-y-3">
                  {timeSlots.map((group) => (
                    <div key={group.label} className="space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                        {group.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono tabular-nums font-bold border-2 transition-all cursor-pointer ${
                              time === t
                                ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                                : 'border-stone-200 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Zone Selector */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-stone-900 font-display">
                  ¿En qué ambiente prefieres tu mesa?
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Calle La Nogalera 105, Torremolinos. Elige tu zona preferida:
                </p>
              </div>

              <div className="space-y-3">
                
                {/* Terraza */}
                <div
                  onClick={() => setZone('terraza')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    zone === 'terraza'
                      ? 'border-amber-400 bg-amber-50 shadow-md ring-2 ring-amber-300'
                      : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-3xl pt-0.5">☀️</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-amber-950">Terraza Calle La Nogalera</h4>
                      {zone === 'terraza' && (
                        <span className="text-[10px] bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-full font-black">
                          Seleccionada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">
                      Ambiente al aire libre bajo el sol de Málaga. Ideal para disfrutar de bowls de açaí, batidos y aperitivos.
                    </p>
                  </div>
                </div>

                {/* Salón Botánico */}
                <div
                  onClick={() => setZone('salon')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    zone === 'salon'
                      ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300'
                      : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-3xl pt-0.5">🌿</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-emerald-950">Salón Tropical Climatizado</h4>
                      {zone === 'salon' && (
                        <span className="text-[10px] bg-emerald-700 text-white px-2.5 py-0.5 rounded-full font-black">
                          Seleccionada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                      Espacio interior relajante, climatizado, con plantas y música ambiente acogedora.
                    </p>
                  </div>
                </div>

                {/* Zona Cumpleaños / Fiesta */}
                <div
                  onClick={() => setZone('fiesta')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    zone === 'fiesta'
                      ? 'border-rose-400 bg-rose-50 shadow-md ring-2 ring-rose-300'
                      : 'border-stone-200 hover:border-rose-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-3xl pt-0.5">🎂</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-rose-950">Mesa de Cumpleaños & Celebración</h4>
                      {zone === 'fiesta' && (
                        <span className="text-[10px] bg-rose-600 text-white px-2.5 py-0.5 rounded-full font-black">
                          Seleccionada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed font-medium">
                      Mesa para grupos festivos con opción de servicio de tarta con lazo, salgados y brigadeiros.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Customer Details Form */}
          {step === 3 && (
            <form id="reservation-form" onSubmit={handleFinishReservation} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-stone-900 font-display">
                  Datos de contacto para tu reserva por WhatsApp
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Al pulsar el botón se abrirá WhatsApp con el mensaje completo redactado para confirmación inmediata con el personal de YHAPE.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label htmlFor="cust-name" className="block text-xs font-black text-stone-800 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    id="cust-name"
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Laura Gómez"
                    className="w-full text-base sm:text-sm px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cust-phone" className="block text-xs font-black text-stone-800 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="cust-phone"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: 612 345 678"
                      className="w-full text-base sm:text-sm px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-semibold"
                    />
                  </div>

                  <div>
                    <label htmlFor="cust-email" className="block text-xs font-black text-stone-800 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      id="cust-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full text-base sm:text-sm px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cust-occasion" className="block text-xs font-black text-stone-800 mb-1">
                    Motivo de la visita / Ocasión
                  </label>
                  <select
                    id="cust-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-base sm:text-sm px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-bold"
                  >
                    <option value="Casual / Comida saludable">Comida / Brunch casual</option>
                    <option value="Celebración de Cumpleaños">¡Cumpleaños!</option>
                    <option value="Aniversario">Aniversario en pareja</option>
                    <option value="Reunión de Amigos / Familia">Reunión de amigos o familia</option>
                    <option value="Comida de Trabajo">Comida de trabajo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cust-requests" className="block text-xs font-black text-stone-800 mb-1">
                    Peticiones especiales (opcional)
                  </label>
                  <textarea
                    id="cust-requests"
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Ej: Necesitamos trona para bebé, comensal celíaco, mesa junto a la ventana..."
                    className="w-full text-base sm:text-sm px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-emerald-600 font-semibold"
                  />
                </div>
              </div>

              {/* Summary box before submitting */}
              <div className="p-3.5 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl border-2 border-amber-200 text-xs space-y-1.5 text-stone-700">
                <div className="font-black text-stone-900">Resumen de tu solicitud:</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-bold">
                  <span>📅 {date}</span>
                  <span aria-hidden="true" className="text-amber-400">·</span>
                  <span className="font-mono tabular-nums">⏰ {time}h</span>
                  <span aria-hidden="true" className="text-amber-400">·</span>
                  <span className="font-mono tabular-nums">👥 {guests} comensales</span>
                  <span aria-hidden="true" className="text-amber-400">·</span>
                  <span className="capitalize">{zone}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed State */}
          {step === 4 && confirmedReservation && (
            <div className="py-2 space-y-6 text-center">
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  ¡Solicitud Enviada a WhatsApp!
                </span>
                <h3 className="text-2xl font-black text-stone-900 font-display pt-2">
                  Te esperamos en YHAPE, {confirmedReservation.customerName}
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto font-medium">
                  Tu reserva ha sido enviada al chat de WhatsApp oficial (+34 673 70 60 31) para confirmación inmediata con el equipo de sala.
                </p>
              </div>

              {/* Confirmation Card */}
              <div className="bg-stone-50 border-2 border-dashed border-emerald-400 rounded-2xl p-5 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-xs text-stone-500 font-bold uppercase">Localizador de Reserva</span>
                  <span className="text-base font-mono font-black text-emerald-800">
                    #{confirmedReservation.code}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block font-medium">Fecha & Hora</span>
                    <strong className="text-stone-800 font-mono">
                      {confirmedReservation.date} · {confirmedReservation.time}h
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Comensales</span>
                    <strong className="text-stone-800 font-mono">
                      {confirmedReservation.guests} personas
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Zona Seleccionada</span>
                    <strong className="text-stone-800 capitalize">
                      {confirmedReservation.zone}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Establecimiento</span>
                    <strong className="text-stone-800">
                      Calle La Nogalera 105
                    </strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={sendWhatsAppConfirmation}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Reenviar a WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={downloadCalendarFile}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-stone-50 border-2 border-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Añadir a Calendario (.ics)</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <span>Continuar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="reservation-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer transform hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Enviar Reserva por WhatsApp</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
