/**
 * WhatsApp integration utility for YHAPE Torremolinos
 * Safely triggers WhatsApp links without triggering popup blocker issues in iframes.
 */

export const YHAPE_WHATSAPP_NUMBER = '34673706031';
export const YHAPE_CATALOG_URL = 'https://wa.me/c/34673706031';

export function openExternalLink(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    try {
      document.body.removeChild(link);
    } catch {
      // ignore
    }
  }, 100);
}

export function openWhatsAppMessage(messageText: string) {
  const encoded = encodeURIComponent(messageText);
  const url = `https://wa.me/${YHAPE_WHATSAPP_NUMBER}?text=${encoded}`;
  openExternalLink(url);
}
