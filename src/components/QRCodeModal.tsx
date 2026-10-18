import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { X, QrCode, Copy, Check, Download, Printer, ExternalLink, Share2, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // The public hosted URL from AI Studio Cloud Run metadata
  const defaultPublicUrl = 'https://ais-pre-6mwy54prje252cfiqkqmzf-392940219417.europe-west2.run.app';
  
  // Use actual origin if in production, or fallback to the Cloud Run pre URL
  const baseUrl = typeof window !== 'undefined' && window.location.origin.includes('run.app')
    ? window.location.origin
    : defaultPublicUrl;

  const [destination, setDestination] = useState<'home' | 'carta' | 'packs' | 'whatsapp'>('carta');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const getTargetUrl = () => {
    if (destination === 'carta') return `${baseUrl}#carta`;
    if (destination === 'packs') return `${baseUrl}#packs-fiesta`;
    if (destination === 'whatsapp') return RESTAURANT_INFO.whatsappCatalogUrl;
    return baseUrl;
  };

  const currentUrl = getTargetUrl();

  useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#064e3b', // Deep emerald matching YHAPE branding
        light: '#ffffff',
      },
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [currentUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `yhape-torremolinos-qr-${destination}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-display">
                Enlace Público & Código QR Gratuito
              </h2>
              <span className="text-xs text-stone-500">
                Alojado en la nube y listo para usar en mesas y redes
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

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Hosting Status Indicator */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-start gap-3">
            <div className="p-1 bg-emerald-700 text-white rounded-md mt-0.5 shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-emerald-950">
                Tu página web ya está alojada y funcionando gratis online
              </span>
              <p className="text-emerald-800 leading-relaxed">
                Está desplegada en servidores de Google Cloud Run con conexión cifrada SSL (HTTPS) las 24 horas del día. Cualquier cliente puede abrirla desde su móvil escaneando este código.
              </p>
            </div>
          </div>

          {/* Destination Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              ¿A qué sección quieres dirigir el Código QR?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setDestination('carta')}
                className={`py-2 px-2.5 text-xs font-bold rounded-xl border-2 text-center transition-all cursor-pointer ${
                  destination === 'carta'
                    ? 'border-emerald-600 bg-emerald-100/90 text-emerald-950 shadow-xs'
                    : 'border-stone-200 text-stone-600 hover:bg-emerald-50/50'
                }`}
              >
                🥗 Carta & Menú
              </button>
              <button
                type="button"
                onClick={() => setDestination('home')}
                className={`py-2 px-2.5 text-xs font-bold rounded-xl border-2 text-center transition-all cursor-pointer ${
                  destination === 'home'
                    ? 'border-amber-500 bg-amber-100/90 text-amber-950 shadow-xs'
                    : 'border-stone-200 text-stone-600 hover:bg-amber-50/50'
                }`}
              >
                ☀️ Portada & Mesa
              </button>
              <button
                type="button"
                onClick={() => setDestination('packs')}
                className={`py-2 px-2.5 text-xs font-bold rounded-xl border-2 text-center transition-all cursor-pointer ${
                  destination === 'packs'
                    ? 'border-rose-500 bg-rose-100/90 text-rose-950 shadow-xs'
                    : 'border-stone-200 text-stone-600 hover:bg-rose-50/50'
                }`}
              >
                🎂 Cumpleaños
              </button>
              <button
                type="button"
                onClick={() => setDestination('whatsapp')}
                className={`py-2 px-2.5 text-xs font-bold rounded-xl border-2 text-center transition-all cursor-pointer ${
                  destination === 'whatsapp'
                    ? 'border-teal-600 bg-teal-100/90 text-teal-950 shadow-xs'
                    : 'border-stone-200 text-stone-600 hover:bg-teal-50/50'
                }`}
              >
                💬 Catálogo WhatsApp
              </button>
            </div>
          </div>

          {/* QR Display Card (Can be printed) */}
          <div 
            ref={printRef}
            className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center flex flex-col items-center space-y-4"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 font-display">
                <span>YHAPE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span className="text-stone-500 font-medium">Torremolinos</span>
              </div>
              <h3 className="text-sm font-bold text-stone-800">
                {destination === 'carta' && 'Escanea para ver la Carta Digital y Pedir'}
                {destination === 'home' && 'Escanea para Reservar Mesa y Conócenos'}
                {destination === 'packs' && 'Escanea para Encargar Tartas y Salados'}
                {destination === 'whatsapp' && 'Escanea para abrir el Catálogo Oficial de WhatsApp'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Apunta con la cámara de tu smartphone
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-200/90 inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`Código QR para ${currentUrl}`}
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                  Generando QR...
                </div>
              )}
            </div>

            <div className="text-[11px] text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Calle la Nogalera, 105 · Tel. {RESTAURANT_INFO.phone}</span>
            </div>
          </div>

          {/* Link Copy Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Enlace Web Directo:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-stone-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  copied
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons: Download & Print */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Imagen QR (PNG)</span>
            </button>

            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Probar en Otra Pestaña</span>
            </a>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Ideal para imprimir en caballetes de mesa, pegatinas o cartas físicas.
          </span>
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
