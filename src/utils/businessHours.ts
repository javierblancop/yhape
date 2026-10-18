import { useState, useEffect } from 'react';

export interface RestaurantStatus {
  isOpen: boolean;
  isKitchenOpen: boolean;
  status: 'open' | 'kitchen-closed' | 'closed';
  badgeColor: string;
  dotColor: string;
  shortLabel: string;
  legend: string;
  subLegend: string;
  currentTimeString: string;
  scheduleString: string;
}

/**
 * Gets the current time in Torremolinos, Spain (Europe/Madrid timezone)
 */
export function getMadridCurrentTime(): { hours: number; minutes: number; timeString: string } {
  try {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Europe/Madrid',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(new Date());
    const hourPart = parts.find(p => p.type === 'hour')?.value ?? '00';
    const minutePart = parts.find(p => p.type === 'minute')?.value ?? '00';
    const hours = parseInt(hourPart, 10);
    const minutes = parseInt(minutePart, 10);
    return {
      hours,
      minutes,
      timeString: `${hourPart.padStart(2, '0')}:${minutePart.padStart(2, '0')}`,
    };
  } catch (err) {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      timeString: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    };
  }
}

/**
 * Calculates whether YHAPE is Open, Kitchen Closed, or Closed based on 12:30 - 22:00 schedule
 */
export function getRestaurantStatus(): RestaurantStatus {
  const { hours, minutes, timeString } = getMadridCurrentTime();
  const currentTotalMinutes = hours * 60 + minutes;

  const openMinutes = 12 * 60 + 30; // 12:30 (750 mins)
  const kitchenCloseMinutes = 21 * 60 + 30; // 21:30 (1290 mins)
  const closeMinutes = 22 * 60; // 22:00 (1320 mins)

  const scheduleString = '12:30 - 22:00 (Cocina hasta 21:30)';

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < kitchenCloseMinutes) {
    // Fully open: 12:30 to 21:30
    return {
      isOpen: true,
      isKitchenOpen: true,
      status: 'open',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-400',
      dotColor: 'bg-emerald-500',
      shortLabel: 'Abierto Ahora',
      legend: '🟢 ¡ABIERTO AHORA! · Horario de 12:30 a 22:00h',
      subLegend: 'Cocina en servicio activo. ¡Pasa por Calle La Nogalera 105 o pide por WhatsApp!',
      currentTimeString: timeString,
      scheduleString,
    };
  } else if (currentTotalMinutes >= kitchenCloseMinutes && currentTotalMinutes < closeMinutes) {
    // Between 21:30 and 22:00: kitchen closed, local closing soon
    return {
      isOpen: true,
      isKitchenOpen: false,
      status: 'kitchen-closed',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-400',
      dotColor: 'bg-amber-500',
      shortLabel: 'Abierto · Últimos pedidos',
      legend: '🟡 ABIERTO · Últimos pedidos (Cocina cerrada a 21:30, local cierra a 22:00h)',
      subLegend: 'Local abierto para recoger pedidos y bebidas hasta las 22:00h.',
      currentTimeString: timeString,
      scheduleString,
    };
  } else {
    // Closed (before 12:30 or after 22:00)
    return {
      isOpen: false,
      isKitchenOpen: false,
      status: 'closed',
      badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
      dotColor: 'bg-rose-500',
      shortLabel: 'Cerrado Ahora',
      legend: '🔴 CERRADO AHORA · Abrimos a las 12:30h (Horario: 12:30 - 22:00h)',
      subLegend: 'Puedes consultar el catálogo y reservar mesa o pedir por WhatsApp para cuando abramos.',
      currentTimeString: timeString,
      scheduleString,
    };
  }
}

/**
 * Hook that auto-refreshes every 30 seconds to maintain real-time accuracy
 */
export function useRestaurantStatus(): RestaurantStatus {
  const [status, setStatus] = useState<RestaurantStatus>(getRestaurantStatus);

  useEffect(() => {
    const update = () => setStatus(getRestaurantStatus());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
