import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  MessageCircle,
  UtensilsCrossed,
  Layers
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // The public hosted URL from AI Studio Cloud Run metadata
  const defaultPublicUrl = 'https://ais-pre-6mwy54prje252cfiqkqmzf-392940219417.europe-west2.run.app';
  
  // Use actual origin if available, or fallback to the Cloud Run pre URL
  const baseUrl = typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app')
    ? window.location.origin
    : defaultPublicUrl;

  const [destination, setDestination] = useState<'carta' | 'whatsapp' | 'home'>('carta');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const printCardRef = useRef<HTMLDivElement>(null);

  const getTargetUrl = () => {
    if (destination === 'carta') return `${baseUrl}#menu`;
    if (destination === 'whatsapp') return RESTAURANT_INFO.whatsappCatalogUrl;
    return baseUrl;
  };

  const currentUrl = getTargetUrl();

  useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 600,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#1a140f', // Deep espresso black/brown for maximum scanner readability
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
    link.download = `yhape-torremolinos-qr-mesa-${tableNumber ? `mesa-${tableNumber}` : 'carta'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      {/* Embedded print CSS to print ONLY the table tent card cleanly */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-table-card, #printable-table-card * {
            visibility: visible;
          }
          #printable-table-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 480px;
            box-shadow: none !important;
            border: 3px solid #b45309 !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-gradient-to-r from-amber-50 via-white to-emerald-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-stone-950 rounded-2xl shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 font-display">
                Código QR de la Carta para Imprimir en Mesas
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                Diseño optimizado para peanas, metacrilatos y cartas de mesa
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Controls Bar: Destination & Optional Table Number */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block">
                  Destino del Código QR:
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDestination('carta')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      destination === 'carta'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    🍽️ Ver Carta Completa (#menu)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestination('whatsapp')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      destination === 'whatsapp'
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    💬 Catálogo WhatsApp Oficial
                  </button>
                </div>
              </div>

              {/* Table Number Customizer */}
              <div className="space-y-1 sm:text-right">
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block">
                  Nº de Mesa (opcional):
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ej: Terraza 4"
                  className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-300 rounded-xl text-base sm:text-xs font-bold text-stone-900 focus:outline-hidden focus:border-amber-500 max-w-full sm:max-w-[140px]"
                />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* PRINTABLE TABLE CARD (EXPOSITOR DE MESA)                 */}
          {/* ======================================================== */}
          <div 
            id="printable-table-card"
            ref={printCardRef}
            className="p-6 sm:p-8 bg-[#fdfaf3] rounded-3xl border-4 border-[#d4a373] text-center flex flex-col items-center space-y-4 shadow-xl max-w-md mx-auto relative overflow-hidden"
          >
            {/* Top Floral Corner Ornaments */}
            <div className="absolute top-2 left-3 text-amber-700 opacity-60 text-base">✿ ❀ ✿</div>
            <div className="absolute top-2 right-3 text-amber-700 opacity-60 text-base">✿ ❀ ✿</div>

            {/* Official Logo Display */}
            <div className="w-36 h-20 bg-white rounded-xl p-1.5 shadow-xs border border-amber-300 flex items-center justify-center">
              <img
                src="/images/yhape-logo.svg"
                alt="YHAPE Tapas & Picoteo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black font-display text-stone-950 tracking-tight">
                YHAPE TAPAS &amp; PICOTEO
              </h3>
              <p className="text-xs font-bold text-amber-900 tracking-widest uppercase">
                by K. Saez · Torremolinos
              </p>
              <div className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mt-1">
                <span>Sabor que te lleva a Brasil ♡</span>
              </div>
            </div>

            {/* Optional Table Number Badge */}
            {tableNumber && (
              <div className="bg-[#2c241c] text-white px-4 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                Mesa / Table: {tableNumber}
              </div>
            )}

            {/* Scannable Callout Badge */}
            <div className="bg-emerald-800 text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm space-y-0.5">
              <div>📲 ESCANEA PARA VER LA CARTA</div>
              <div className="text-[10px] text-emerald-200 font-semibold lowercase">scan to view our menu</div>
            </div>

            {/* High-Resolution QR Code Container */}
            <div className="p-3.5 bg-white rounded-2xl shadow-md border-2 border-amber-300 inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`Código QR de la Carta de YHAPE`}
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-lg"
                />
              ) : (
                <div className="w-52 h-52 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                  Generando QR...
                </div>
              )}
            </div>

            {/* Specialties Summary */}
            <p className="text-[11px] text-stone-700 font-bold max-w-xs leading-tight">
              Tapas de Boteco · Pasteles de Feria · Salgados · Menú Burger · Açaí Bowls · Churros
            </p>

            {/* WhatsApp Ordering Note */}
            <div className="p-2.5 bg-white/90 rounded-xl border border-amber-300 text-stone-800 text-[11px] flex items-center gap-2 font-bold w-full justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700 shrink-0" />
              <span>Pedidos por WhatsApp: +34 {RESTAURANT_INFO.phone}</span>
            </div>

            {/* Footer Address */}
            <div className="text-[11px] text-stone-600 flex items-center justify-center gap-1 pt-1 border-t border-amber-200 w-full font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Calle La Nogalera, 105 · Torremolinos</span>
            </div>
          </div>

          {/* Direct Link Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-stone-700">
              Enlace que abre este Código QR:
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
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
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

          {/* Action Buttons: Print Table Card & Download QR PNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-yellow-300 shadow-md transition-all cursor-pointer transform hover:scale-102 border border-amber-300"
            >
              <Printer className="w-4 h-4 text-stone-950" />
              <span>Imprimir Cartel de Mesa (A4 / A5)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all cursor-pointer transform hover:scale-102"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Imagen QR (PNG)</span>
            </button>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 font-medium">
            Colócalo en soportes de metacrilato o madera en tus mesas de terraza e interior.
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
