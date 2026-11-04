import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Send, 
  Sparkles,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQRCode?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onOpenQRCode }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  // Determine current website URL
  const currentUrl = typeof window !== 'undefined' && window.location.href
    ? window.location.href.split('#')[0]
    : 'https://ais-pre-6mwy54prje252cfiqkqmzf-392940219417.europe-west2.run.app';

  const shareTitle = 'YHAPE Tapas & Picoteo | Torremolinos';
  const shareText = '¡Descubre YHAPE Tapas & Picoteo en La Nogalera, Torremolinos! Auténtica gastronomía brasileña, coxinhas artesanas, açaí puro amazónico y caipirinhas.';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  // Social share links
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialChannels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300',
      description: 'Enviar a amigos o grupos',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100 border-blue-300',
      description: 'Publicar en tu muro',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-stone-900 hover:bg-black text-white',
      textColor: 'text-stone-900',
      bgColor: 'bg-stone-100 hover:bg-stone-200 border-stone-300',
      description: 'Compartir en X',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-50 hover:bg-sky-100 border-sky-300',
      description: 'Enviar por Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden transform transition-transform animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 p-5 sm:p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/20 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 text-amber-200 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Compartir Restaurante</span>
          </div>

          <h3 id="share-modal-title" className="text-xl sm:text-2xl font-black font-display leading-tight text-white drop-shadow-xs">
            ¡Comparte YHAPE con tus amigos!
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-sm mx-auto font-medium">
            Tapas brasileñas, coxinhas y açaí en Calle La Nogalera 105, Torremolinos
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Quick Native Share Button (if supported) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <Share2 className="w-4 h-4" />
              <span>Abrir Menú de Compartir del Móvil</span>
            </button>
          )}

          {/* Social Network Channels Grid */}
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-stone-500">
              Compartir directamente en redes sociales:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {socialChannels.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 ${channel.bgColor} transition-all cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 group`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${channel.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className={`text-sm font-black ${channel.textColor} leading-tight`}>
                        {channel.name}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">
                        {channel.description}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Direct Copy Link Input */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              O copia el enlace directo a la página:
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-300">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-transparent px-3 py-1.5 text-xs font-mono text-stone-700 outline-none select-all truncate"
                aria-label="Enlace de la página para copiar"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-black text-white hover:scale-105'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-yellow-300" />
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

          {/* QR Code cross-action */}
          {onOpenQRCode && (
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                <QrCode className="w-4 h-4 text-amber-600 shrink-0" />
                <span>¿Quieres que lo escaneen en mesa?</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQRCode();
                }}
                className="text-xs font-black text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Ver Código QR</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
