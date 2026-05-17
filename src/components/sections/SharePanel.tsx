'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Check, ChevronRight, FileDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GOLD, SITE_URL, SHARE_TITLE, SHARE_TEXT, ENCODED_SITE_URL, ENCODED_SHARE_TEXT, ENCODED_SHARE_TITLE } from '@/components/shared/constants';

// =============================================================================

/* SVG brand icons — inline to avoid extra dependencies */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);

const LinkedInShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.2 5.428 3.077 7.14V22l3.033-1.664c.924.256 1.914.395 2.942.395 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm.989 12.44l-2.548-2.718 4.972 0-2.424 2.718zm-5.467-2.718 5.467 5.82-5.467-5.82zm7.292 0 2.424-2.718 2.424 2.718-2.424 2.718-2.424-2.718zm2.424-2.718-4.972 0 2.548-2.718 2.424 2.718z"/></svg>
);

const EmailShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const SmsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const GoogleDriveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12.01 2.99 4.39 15.48H0l7.61-12.49zm4.33 0L8.72 15.48l3.87 6.53h4.76l3.87-6.53zm-4.33 10.49 3.25-5.38h-6.5z"/></svg>
);

const PDF_ITEMS = [
  { label: 'CV', url: 'https://drive.google.com/uc?export=download&id=1gWqKYc0i9tVAoSJgN7PKoi1WLUGibiCP', fileName: 'Ahmed_Essam_CV.pdf' },
  { label: 'Portfolio', url: 'https://drive.google.com/uc?export=download&id=16WWk7Lw-SY-wELQTL2-l_dw_dVuXlExz', fileName: 'Ahmed_Essam_Portfolio.pdf' },
  { label: 'Projects List', url: 'https://drive.google.com/uc?export=download&id=164SZ9PbrOARqV8fpkCoVCWiWfjljVOVf', fileName: 'Ahmed_Essam_Projects_List.pdf' },
];

interface ShareOption {
  name: string;
  color: string;
  icon: React.ReactNode;
  getUrl: () => string;
  isCopy?: boolean;
  isNative?: boolean;
}

export default function SharePanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [copied, setCopied] = useState(false);

  const shareOptions = useMemo<ShareOption[]>(() => [
    {
      name: 'WhatsApp',
      color: '#25D366',
      icon: <WhatsAppIcon />,
      getUrl: () => `https://wa.me/?text=${ENCODED_SHARE_TEXT}%20${ENCODED_SITE_URL}`,
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      icon: <FacebookIcon />,
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${ENCODED_SITE_URL}`,
    },
    {
      name: 'Messenger',
      color: '#0084FF',
      icon: <MessengerIcon />,
      getUrl: () => `https://www.facebook.com/dialog/send?link=${ENCODED_SITE_URL}&app_id=&redirect_uri=${ENCODED_SITE_URL}`,
    },
    {
      name: 'X (Twitter)',
      color: 'var(--c-text-muted)',
      icon: <TwitterXIcon />,
      getUrl: () => `https://twitter.com/intent/tweet?url=${ENCODED_SITE_URL}&text=${ENCODED_SHARE_TEXT}`,
    },
    {
      name: 'Instagram',
      color: '#E4405F',
      icon: <InstagramIcon />,
      getUrl: () => 'https://www.instagram.com/',
    },
    {
      name: 'Telegram',
      color: '#26A5E4',
      icon: <TelegramIcon />,
      getUrl: () => `https://t.me/share/url?url=${ENCODED_SITE_URL}&text=${ENCODED_SHARE_TEXT}`,
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      icon: <LinkedInShareIcon />,
      getUrl: () => `https://www.linkedin.com/sharing/share-offsite/?url=${ENCODED_SITE_URL}`,
    },
    {
      name: 'Message',
      color: '#34C759',
      icon: <SmsIcon />,
      getUrl: () => `sms:?body=${ENCODED_SHARE_TEXT}%20${ENCODED_SITE_URL}`,
      isNative: true,
    },
    {
      name: 'Email',
      color: `${GOLD}`,
      icon: <EmailShareIcon />,
      getUrl: () => `mailto:?subject=${ENCODED_SHARE_TITLE}&body=${ENCODED_SHARE_TEXT}%0A%0A${ENCODED_SITE_URL}`,
      isNative: true,
    },
    {
      name: 'Google Drive',
      color: '#4285F4',
      icon: <GoogleDriveIcon />,
      getUrl: () => 'https://drive.google.com/',
    },
  ], []);

  const handleCopy = async (option: ShareOption) => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: create temporary input
      const input = document.createElement('input');
      input.value = SITE_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClick = (option: ShareOption) => {
    if (option.isCopy) {
      handleCopy(option);
      return;
    }
    const url = option.getUrl();
    if (option.isNative) {
      window.open(url, '_self');
    } else {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const [activePdfIdx, setActivePdfIdx] = useState<number | null>(null);
  const [copiedPdf, setCopiedPdf] = useState<string | null>(null);

  // Reset activePdfIdx when dialog closes
  useEffect(() => {
    if (!open) setActivePdfIdx(null);
  }, [open]);

  const getPdfShareUrl = (pdf: typeof PDF_ITEMS[number]) =>
    pdf.url.startsWith('/') ? `${typeof window !== 'undefined' ? window.location.origin : ''}${pdf.url}` : pdf.url;

  const getPdfShareText = (pdf: typeof PDF_ITEMS[number]) =>
    `Check out the ${pdf.label} of Ahmed Essam — Project Manager — Design & Development Management`;

  const pdfSharePlatforms = [
    { name: 'WhatsApp', color: '#25D366', icon: <WhatsAppIcon /> },
    { name: 'Telegram', color: '#26A5E4', icon: <TelegramIcon /> },
    { name: 'Facebook', color: '#1877F2', icon: <FacebookIcon /> },
    { name: 'X (Twitter)', color: 'var(--c-text-muted)', icon: <TwitterXIcon /> },
    { name: 'LinkedIn', color: '#0A66C2', icon: <LinkedInShareIcon /> },
    { name: 'Email', color: GOLD, icon: <EmailShareIcon /> },
    { name: 'Message', color: '#34C759', icon: <SmsIcon /> },
  ];

  const handlePdfSharePlatform = (pdf: typeof PDF_ITEMS[number], platform: typeof pdfSharePlatforms[number]) => {
    const shareUrl = getPdfShareUrl(pdf);
    const shareText = getPdfShareText(pdf);
    const encUrl = encodeURIComponent(shareUrl);
    const encText = encodeURIComponent(shareText);
    let url = '';
    switch (platform.name) {
      case 'WhatsApp': url = `https://wa.me/?text=${encText}%20${encUrl}`; break;
      case 'Telegram': url = `https://t.me/share/url?url=${encUrl}&text=${encText}`; break;
      case 'Facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`; break;
      case 'X (Twitter)': url = `https://twitter.com/intent/tweet?url=${encUrl}&text=${encText}`; break;
      case 'LinkedIn': url = `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`; break;
      case 'Email': url = `mailto:?subject=${encodeURIComponent('Ahmed Essam — ' + pdf.label)}&body=${encText}%0A%0A${encUrl}`; window.open(url, '_self'); return;
      case 'Message': url = `sms:?body=${encText}%20${encUrl}`; window.open(url, '_self'); return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPdfLink = async (pdf: typeof PDF_ITEMS[number]) => {
    const shareUrl = getPdfShareUrl(pdf);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopiedPdf(pdf.label);
    setTimeout(() => setCopiedPdf(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-black/95 p-0 backdrop-blur-xl sm:max-w-lg flex max-h-[85vh] flex-col">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle className="flex items-center gap-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: `${GOLD}22`, border: `1px solid ${GOLD}44` }}>
              <Share2 size={18} style={{ color: GOLD }} />
            </div>
            <span className="font-[family-name:var(--font-playfair)] text-xl">{'Share Portfolio'}</span>
          </DialogTitle>
          <DialogDescription className="text-white/40">
            {"Share Ahmed Essam's architecture portfolio with your network"}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content area — works on mobile & PC */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Copy link bar */}
          <div className="mx-6 mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
            <Link2 size={14} className="flex-shrink-0 text-white/30" />
            <span className="min-w-0 flex-1 truncate text-xs text-white/50">{SITE_URL}</span>
            <button
              onClick={() => handleCopy(shareOptions[0])}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:opacity-80"
              style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
            >
              {copied ? (
                <>
                  <Check size={12} />
                  {'Copied'}
                </>
              ) : (
                <>
                  <Link2 size={12} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Social grid */}
          <div className="grid grid-cols-4 gap-2 px-6 py-4 sm:grid-cols-4">
            {shareOptions.map((option, idx) => (
              <motion.button
                key={option.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => handleClick(option)}
                className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] active:scale-95"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${option.color}18` }}
                >
                  <div style={{ color: option.color }}>{option.icon}</div>
                </div>
                <span className="text-[10px] font-medium tracking-wide text-white/50 group-hover:text-white/70">
                  {option.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Share PDFs Section */}
          <div className="border-t border-white/5 px-6 py-4">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">{'Share Documents'}</p>
            <div className="flex flex-col gap-2">
              {PDF_ITEMS.map((pdf, idx) => {
                const isActive = activePdfIdx === idx;
                const isCopied = copiedPdf === pdf.label;
                return (
                  <div key={pdf.label}>
                    {/* PDF button row */}
                    <button
                      onClick={() => setActivePdfIdx(isActive ? null : idx)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                        isActive
                          ? 'border-[#C9A96E]/30 bg-[#C9A96E]/[0.08]'
                          : 'border-white/5 bg-white/[0.03] hover:border-[#C9A96E]/15 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${GOLD}15` }}>
                        <FileDown className="h-4 w-4" style={{ color: GOLD }} />
                      </div>
                      <span className="flex-1 text-left text-[12px] font-medium text-white/70">{pdf.label}</span>
                      <span className="text-[9px] text-white/30 uppercase tracking-wider">{pdf.fileName}</span>
                      <ChevronRight size={14} className={`shrink-0 text-white/30 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Platform selector (expanded) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 ml-4 grid grid-cols-4 gap-1.5 pb-1">
                            {pdfSharePlatforms.map((platform) => (
                              <button
                                key={platform.name}
                                onClick={() => handlePdfSharePlatform(pdf, platform)}
                                className="group flex flex-col items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] active:scale-95 cursor-pointer"
                              >
                                <div
                                  className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                                  style={{ backgroundColor: `${platform.color}15` }}
                                >
                                  <div style={{ color: platform.color }} className="[&_svg]:h-3.5 [&_svg]:w-3.5">{platform.icon}</div>
                                </div>
                                <span className="text-[8px] font-medium tracking-wide text-white/40 group-hover:text-white/60">
                                  {platform.name}
                                </span>
                              </button>
                            ))}
                            {/* Copy link */}
                            <button
                              onClick={() => handleCopyPdfLink(pdf)}
                              className="group flex flex-col items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2 transition-all duration-200 hover:border-[#C9A96E]/20 hover:bg-[#C9A96E]/[0.04] active:scale-95 cursor-pointer"
                            >
                              <div className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: `${GOLD}15` }}>
                                {isCopied ? <Check size={12} style={{ color: GOLD }} /> : <Link2 size={12} style={{ color: GOLD }} />}
                              </div>
                              <span className="text-[8px] font-medium tracking-wide text-white/40 group-hover:text-white/60">
                                {isCopied ? 'Copied' : 'Copy'}
                              </span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="border-t border-white/5 px-6 py-3">
            <p className="text-center text-[10px] tracking-wide text-white/20">
              Tap any platform to share the portfolio or documents
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Hero Section
// =============================================================================

