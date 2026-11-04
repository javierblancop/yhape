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
  MapPin, 
  MessageCircle,
  Share2,
  Smartphone,
  Layers,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShare?: () => void;
}

type DestinationType = 'whatsapp_direct' | 'menu_table' | 'whatsapp_catalog';

const PRESET_TABLES = [
  'Mesa 1',
  'Mesa 2',
  'Mesa 3',
  'Mesa 4',
  'Mesa 5',
  'Mesa 6',
  'Terraza 1',
  'Terraza 2',
  'Terraza 3',
  'Terraza 4',
  'Barra',
];

const BATCH_TABLES = [
  'Mesa 1',
  'Mesa 2',
  'Mesa 3',
  'Mesa 4',
  'Mesa 5',
  'Mesa 6',
  'Terraza 1',
  'Terraza 2',
  'Terraza 3',
  'Terraza 4',
];

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, onOpenShare }) => {
  if (!isOpen) return null;

  // The public hosted URL from AI Studio Cloud Run metadata
  const defaultPublicUrl = 'https://ais-pre-6mwy54prje252cfiqkqmzf-392940219417.europe-west2.run.app';
  
  // Use actual origin if available, or fallback to the Cloud Run pre URL
  const baseUrl = typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('run.app')
    ? window.location.origin
    : defaultPublicUrl;

  // State
  // Default to 'whatsapp_direct' as requested: direct to WhatsApp order for the table
  const [destination, setDestination] = useState<DestinationType>('whatsapp_direct');
  const [selectedTable, setSelectedTable] = useState<string>('Mesa 1');
  const [customTable, setCustomTable] = useState<string>('');
  const [printMode, setPrintMode] = useState<'single' | 'batch'>('single');
  
  // Single QR code data url
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  
  // Batch QR codes cache: { [tableName]: dataUrl }
  const [batchQrUrls, setBatchQrUrls] = useState<Record<string, string>>({});
  
  const [copied, setCopied] = useState<boolean>(false);
  const printContainerRef = useRef<HTMLDivElement>(null);

  // Active table string
  const activeTable = customTable.trim() || selectedTable || 'Mesa 1';

  // Helper to build destination URL
  const buildTargetUrl = (dest: DestinationType, tableStr: string) => {
    const table = tableStr.trim() || 'Mesa 1';
    if (dest === 'whatsapp_direct') {
      const msg = `¡Hola YHAPE! 👋\nEstoy en la *${table}* de Torremolinos y quiero hacer este pedido:\n\n- \n- \n\n¡Muchas gracias!`;
      return `https://wa.me/34673706031?text=${encodeURIComponent(msg)}`;
    }
    if (dest === 'whatsapp_catalog') {
      return RESTAURANT_INFO.whatsappCatalogUrl;
    }
    // 'menu_table': digital web menu with pre-selected table
    return `${baseUrl}?mesa=${encodeURIComponent(table)}#menu`;
  };

  const currentUrl = buildTargetUrl(destination, activeTable);

  // Generate single QR Code whenever URL changes
  useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 700,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#16120e', // Deep rich espresso for maximum scanner readability
        light: '#ffffff',
      },
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating single QR code:', err);
      });
  }, [currentUrl]);

  // Generate Batch QR codes when switching to batch mode
  useEffect(() => {
    if (printMode === 'batch') {
      const generateAllBatch = async () => {
        const results: Record<string, string> = {};
        for (const tbl of BATCH_TABLES) {
          const url = buildTargetUrl(destination, tbl);
          try {
            const dataUrl = await QRCode.toDataURL(url, {
              width: 700,
              margin: 2,
              errorCorrectionLevel: 'H',
              color: {
                dark: '#16120e',
                light: '#ffffff',
              },
            });
            results[tbl] = dataUrl;
          } catch (e) {
            console.error(`Error generating QR for ${tbl}:`, e);
          }
        }
        setBatchQrUrls(results);
      };

      generateAllBatch();
    }
  }, [printMode, destination]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const cleanTable = activeTable.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `yhape-qr-pedido-whatsapp-${cleanTable}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (mode: 'single' | 'batch') => {
    setPrintMode(mode);
    // Allow state to re-render then print
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Reusable component for rendering a single printable card
  const renderCardContent = (tableName: string, qrUrl: string, isBatchItem = false) => (
    <div 
      className={`bg-[#fdfbf7] text-stone-900 border-4 border-amber-600/80 rounded-3xl p-5 sm:p-7 text-center relative overflow-hidden shadow-xl max-w-sm sm:max-w-md mx-auto ${
        isBatchItem ? 'printable-card-page mb-8' : ''
      }`}
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#fdfbf7',
      }}
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-2 left-3 text-amber-700/60 text-sm font-serif">✿ ❀ ✿</div>
      <div className="absolute top-2 right-3 text-amber-700/60 text-sm font-serif">✿ ❀ ✿</div>

      {/* Official YHAPE Logo Badge */}
      <div className="w-36 h-20 bg-white rounded-2xl p-1.5 shadow-sm border border-amber-200 flex items-center justify-center mx-auto mb-2">
        <img
          src="/images/yhape-logo.svg"
          alt="YHAPE Tapas & Picoteo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand & Torremolinos Subtitle */}
      <div className="space-y-0.5 mb-2">
        <h3 className="text-xl sm:text-2xl font-black font-display text-stone-950 tracking-tight leading-tight">
          YHAPE TAPAS &amp; PICOTEO
        </h3>
        <p className="text-[11px] font-bold text-amber-900 uppercase tracking-widest">
          Torremolinos · Calle La Nogalera, 105
        </p>
      </div>

      {/* Table Prominent Identification Badge */}
      <div className="my-2.5 inline-block">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-stone-950 px-5 py-1.5 rounded-2xl shadow-md border-2 border-amber-600">
          <span className="text-sm sm:text-base font-black uppercase tracking-wider">
            📍 {tableName}
          </span>
        </div>
      </div>

      {/* Clear Action Callout */}
      <div className="bg-emerald-800 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wide shadow-sm my-2 max-w-xs mx-auto">
        <div className="flex items-center justify-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-emerald-300 fill-emerald-300" />
          <span>PIDE POR WHATSAPP AQUÍ</span>
        </div>
        <div className="text-[10px] text-emerald-200 font-semibold tracking-normal lowercase">
          {destination === 'whatsapp_direct'
            ? 'escanea para abrir tu pedido en whatsapp'
            : destination === 'menu_table'
            ? 'escanea para ver la carta y pedir por whatsapp'
            : 'escanea para abrir el catálogo de whatsapp'}
        </div>
      </div>

      {/* High-Resolution QR Container */}
      <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-amber-300 inline-block my-2">
        {qrUrl ? (
          <img
            src={qrUrl}
            alt={`Código QR para pedir por WhatsApp desde ${tableName}`}
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
          />
        ) : (
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
            Generando código QR...
          </div>
        )}
      </div>

      {/* 3 Simple Steps for Guests */}
      <div className="bg-white/90 border border-amber-200 rounded-2xl p-2.5 my-2 max-w-xs mx-auto text-left space-y-1">
        <div className="text-[10px] font-bold text-stone-800 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">1</span>
          <span>Apunta con la cámara de tu móvil al código QR</span>
        </div>
        <div className="text-[10px] font-bold text-stone-800 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">2</span>
          <span>Se abrirá WhatsApp con tu mesa asignada</span>
        </div>
        <div className="text-[10px] font-bold text-stone-800 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">3</span>
          <span>Escríbenos tu pedido y te lo servimos en mesa</span>
        </div>
      </div>

      {/* Specialties Highlight */}
      <p className="text-[10px] text-stone-600 font-bold max-w-xs leading-tight mx-auto mb-2">
        Coxinhas · Pasteles de Feria · Salgados · Burgers · Açaí · Churros
      </p>

      {/* WhatsApp Official Contact Badge */}
      <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950 text-[11px] font-black flex items-center gap-2 justify-center w-full">
        <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
        <span>WhatsApp Pedidos: +34 {RESTAURANT_INFO.phone}</span>
      </div>

      {/* Fold / Cut Line Indicator for acrylic table stands */}
      <div className="mt-3 pt-2 border-t-2 border-dashed border-amber-300/80 text-[10px] text-amber-800/80 font-mono tracking-wider flex items-center justify-center gap-1">
        <span>✂ · · · Doblar o insertar en soporte de metacrilato / expositor de mesa · · · ✂</span>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      {/* ========================================================= */}
      {/* PRINT STYLESHEET (Clean, single or batch page print)     */}
      {/* ========================================================= */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 8mm;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-container, #printable-container * {
            visibility: visible !important;
          }
          #printable-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          .printable-card-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            break-inside: avoid !important;
            margin: 20px auto !important;
            max-width: 440px !important;
            border: 3px solid #b45309 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Hidden print container with selected layout */}
      <div id="printable-container" ref={printContainerRef} className="hidden print:block">
        {printMode === 'single' ? (
          <div className="printable-card-page">
            {renderCardContent(activeTable, qrDataUrl)}
          </div>
        ) : (
          BATCH_TABLES.map((tbl) => (
            <div key={tbl} className="printable-card-page">
              {renderCardContent(tbl, batchQrUrls[tbl] || qrDataUrl, true)}
            </div>
          ))
        )}
      </div>

      {/* Main Modal Card */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-gradient-to-r from-amber-100 via-white to-emerald-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-500 text-stone-950 rounded-2xl shadow-sm">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 font-display flex items-center gap-2">
                <span>Código de Mesa para Imprimir (Pedido por WhatsApp)</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  WhatsApp Directo
                </span>
              </h2>
              <span className="text-xs text-stone-600 font-medium">
                Al escanear en la mesa con el móvil, se abre WhatsApp directamente para hacer el pedido
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
          
          {/* Step 1: Select Table */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/90 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px] font-black">1</span>
                  <span>Selecciona la Mesa a Imprimir:</span>
                </label>
                <span className="text-[11px] text-stone-500">
                  Elige una mesa rápida o escribe un nombre personalizado (ej: Terraza 4, Barra, Mesa 12)
                </span>
              </div>

              {/* Custom input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customTable}
                  onChange={(e) => setCustomTable(e.target.value)}
                  placeholder="Otra mesa..."
                  className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-hidden focus:border-amber-500 max-w-[130px]"
                />
                {customTable && (
                  <button
                    type="button"
                    onClick={() => setCustomTable('')}
                    className="text-stone-400 hover:text-stone-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Quick table preset buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESET_TABLES.map((table) => {
                const isActive = !customTable && selectedTable === table;
                return (
                  <button
                    key={table}
                    type="button"
                    onClick={() => {
                      setCustomTable('');
                      setSelectedTable(table);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 shadow-xs border-2 border-amber-600 scale-102'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
                    }`}
                  >
                    {table}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Destination Action */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">2</span>
              <span>Destino al Escanear con el Móvil:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Option A: Direct WhatsApp with Table (Default & Recommended) */}
              <button
                type="button"
                onClick={() => setDestination('whatsapp_direct')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  destination === 'whatsapp_direct'
                    ? 'bg-emerald-50 border-2 border-emerald-600 shadow-sm'
                    : 'bg-white border-stone-200 hover:bg-stone-100/70 text-stone-600'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-black text-xs text-emerald-950 mb-0.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                    <span>Pedido Directo WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Abre WhatsApp al instante con la mesa y plantilla de pedido lista.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-lg inline-block self-start">
                  ⭐ Recomendado
                </div>
              </button>

              {/* Option B: Interactive Digital Menu with Table */}
              <button
                type="button"
                onClick={() => setDestination('menu_table')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  destination === 'menu_table'
                    ? 'bg-amber-50 border-2 border-amber-600 shadow-sm'
                    : 'bg-white border-stone-200 hover:bg-stone-100/70 text-stone-600'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-black text-xs text-amber-950 mb-0.5">
                    <span>🍽️ Carta Web con Mesa</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Abre la carta con fotos y envía el carrito completo a WhatsApp con su mesa.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg inline-block self-start">
                  Fotos &amp; Precios
                </div>
              </button>

              {/* Option C: WhatsApp Catalog */}
              <button
                type="button"
                onClick={() => setDestination('whatsapp_catalog')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  destination === 'whatsapp_catalog'
                    ? 'bg-teal-50 border-2 border-teal-600 shadow-sm'
                    : 'bg-white border-stone-200 hover:bg-stone-100/70 text-stone-600'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-black text-xs text-teal-950 mb-0.5">
                    <span>💬 Catálogo WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Abre el catálogo oficial de productos de WhatsApp Business.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded-lg inline-block self-start">
                  Catálogo Oficial
                </div>
              </button>
            </div>
          </div>

          {/* Quick Print Actions (Top Bar) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 p-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-2xl border border-amber-400 shadow-sm">
            <div className="flex items-center gap-2 text-stone-950 font-black text-xs sm:text-sm">
              <Printer className="w-5 h-5 text-stone-950 shrink-0" />
              <span>Imprimir Carteles de Mesa:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handlePrint('single')}
                className="px-3.5 py-2 bg-stone-950 hover:bg-stone-900 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Imprimir solo {activeTable}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePrint('batch')}
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                title="Imprime de una sola vez los carteles de Mesa 1 a 6 y Terrazas 1 a 4"
              >
                <Layers className="w-4 h-4 text-emerald-300" />
                <span>Imprimir Lote Completo (10 Mesas)</span>
              </button>
            </div>
          </div>

          {/* Table Card Live Interactive Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                Vista Previa del Expositor de Mesa ({activeTable}):
              </label>
              <span className="text-[11px] text-stone-500">
                Formato estándar para soporte A5 / A6 o peana de metacrilato
              </span>
            </div>

            {/* Rendered Live Card Component */}
            {renderCardContent(activeTable, qrDataUrl)}
          </div>

          {/* Generated URL & Direct Test Button */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Enlace que abre este Código QR:</span>
              </label>

              {/* Direct Test Link */}
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-100/70 hover:bg-emerald-200/80 px-2.5 py-1 rounded-lg transition-colors"
                title="Abre el enlace en una pestaña nueva para comprobar cómo funciona en WhatsApp"
              >
                <span>Probar Enlace en WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl font-mono text-stone-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
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
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Row: Download PNG, Share, and Print */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => handlePrint('single')}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-yellow-300 shadow-md transition-all cursor-pointer transform hover:scale-102 border border-amber-300"
            >
              <Printer className="w-4 h-4 text-stone-950" />
              <span>Imprimir Cartel</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all cursor-pointer transform hover:scale-102"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PNG</span>
            </button>

            {onOpenShare && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenShare();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-400 shadow-md transition-all cursor-pointer transform hover:scale-102"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Compartir en Redes</span>
              </button>
            )}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500 font-medium">
            💡 Consejo: Plastifica o coloca el papel en soportes de metacrilato para protegerlo de líquidos en la mesa.
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
