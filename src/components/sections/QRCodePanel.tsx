'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Link2, Check, Globe, Phone, Linkedin, User, Mail, QrCode, Maximize2, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GOLD, SITE_URL, SHARE_TITLE, SHARE_TEXT, ENCODED_SITE_URL, ENCODED_SHARE_TEXT, ENCODED_SHARE_TITLE } from '@/components/shared/constants';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

export default function QRCodePanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const qrItems = useMemo(() => [
    {
      id: 'portfolio',
      label: 'Website',
      sublabel: 'Scan to visit website',
      value: 'https://ahmed-essam-profile.vercel.app/',
      icon: <Globe size={20} />,
      color: GOLD,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      sublabel: 'Chat directly',
      value: `https://wa.me/201223773261?text=${encodeURIComponent("Hello Ahmed, I'm [your name] and came across your portfolio and would like to connect.")}`,
      icon: <Phone size={20} />,
      color: '#25D366',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      sublabel: 'Connect professionally',
      value: 'https://linkedin.com/in/ahmed-essam-helal',
      icon: <Linkedin size={20} />,
      color: '#0A66C2',
    },
    {
      id: 'vcard',
      label: 'Save Contact',
      sublabel: 'Add to phonebook',
      value: `BEGIN:VCARD\nVERSION:3.0\nFN:Ahmed Essam\nORG:Design & Development Management\nTEL;TYPE=CELL:+201223773261\nEMAIL:arch_a_essam@yahoo.com\nURL:https://ahmed-essam-profile.vercel.app/\nURL:https://linkedin.com/in/ahmed-essam-helal\nADR;TYPE=WORK:;;Cairo;Egypt\nTITLE:Project Manager\nEND:VCARD`,
      icon: <User size={20} />,
      color: '#E67E22',
    },
    {
      id: 'email',
      label: 'Email',
      sublabel: 'Send a message',
      value: `mailto:arch_a_essam@yahoo.com?subject=${encodeURIComponent('Architectural Inquiry')}`,
      icon: <Mail size={20} />,
      color: '#EA4335',
    },
  ], []);

  const selectedItem = qrItems.find((item) => item.id === selectedQR);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) setSelectedQR(null); onOpenChange(v); }}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-white/10 bg-[var(--bg-primary)]"
      >
        <DialogTitle className="sr-only">QR Codes — Connect with Ahmed Essam</DialogTitle>
        <DialogDescription className="sr-only">Tap an option to enlarge its QR code for scanning</DialogDescription>

        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${GOLD}22` }}
            >
              <QrCode size={20} style={{ color: GOLD }} />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white">
                {'Scan & Connect'}
              </h2>
              <p className="text-xs text-white/40">
                {'Tap an option to enlarge the QR code'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!selectedQR ? (
            /* ===== Card Grid — overview ===== */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {qrItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedQR(item.id)}
                  className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/5 p-4 transition-all duration-300 hover:border-white/20 active:scale-95"
                  style={{ backgroundColor: 'var(--c-surface-dark)' }}
                >
                  {/* Icon circle */}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/80">{item.label}</p>
                    <p className="mt-0.5 text-[10px] text-white/30">{item.sublabel}</p>
                  </div>
                  {/* Tap hint */}
                  <div className="flex items-center gap-1 text-[9px] text-white/20">
                    <Maximize2 size={10} />
                    <span>Tap to scan</span>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : selectedItem ? (
            /* ===== Enlarged QR view ===== */
            <motion.div
              key="enlarged"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Back button */}
              <button
                onClick={() => setSelectedQR(null)}
                className="mb-6 flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
              >
                <ChevronLeft size={14} />
                <span>All options</span>
              </button>

              {/* QR Code with luxury frame */}
              <div className="relative">
                {/* Outer glow */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-40 blur-xl"
                  style={{ backgroundColor: selectedItem.color }}
                />
                {/* Card */}
                <div
                  className="relative flex flex-col items-center rounded-3xl border p-6 sm:p-8"
                  style={{
                    backgroundColor: 'var(--c-surface-dark)',
                    borderColor: `${selectedItem.color}44`,
                  }}
                >
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-2.5">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${selectedItem.color}22` }}
                    >
                      <span style={{ color: selectedItem.color }}>{selectedItem.icon}</span>
                    </div>
                    <div>
                      <p className="text-base font-medium text-white">{selectedItem.label}</p>
                      <p className="text-[10px] text-white/30">{selectedItem.sublabel}</p>
                    </div>
                  </div>

                  {/* Large QR */}
                  <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
                    <QRCode
                      value={selectedItem.value}
                      size={220}
                      level="M"
                      fgColor="#0A0A0A"
                      bgColor="#ffffff"
                    />
                  </div>

                  {/* Footer hint */}
                  <p className="mt-5 text-[11px] text-white/30">
                    Point your camera at the QR code above to scan
                  </p>
                </div>
              </div>

              {/* Quick-switch buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {qrItems
                  .filter((item) => item.id !== selectedQR)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedQR(item.id)}
                      className="flex items-center gap-1.5 rounded-full border border-white/5 px-3 py-1.5 text-[11px] text-white/40 transition-all duration-200 hover:border-white/15 hover:text-white/70"
                      style={{ backgroundColor: 'var(--c-surface-dark)' }}
                    >
                      <span style={{ color: item.color }}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Tip — only show on grid view */}
        {!selectedQR && (
          <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: `${GOLD}11`, borderLeft: `3px solid ${GOLD}` }}>
            <span className="text-[11px] text-white/50">
              Tap any option to enlarge its QR code for easy scanning.
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

