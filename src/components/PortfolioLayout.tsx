'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Share2, QrCode } from 'lucide-react';
import { GOLD } from '@/components/shared/constants';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/Footer';

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false });
const ScrollSlider = dynamic(() => import('@/components/ScrollSlider'), { ssr: false });
const SharePanel = dynamic(() => import('@/components/sections/SharePanel'));
const QRCodePanel = dynamic(() => import('@/components/sections/QRCodePanel'));

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const shareHandler = () => setShareOpen(true);
    const qrHandler = () => setQrOpen(true);
    window.addEventListener('open-share-dialog', shareHandler);
    window.addEventListener('open-qr-dialog', qrHandler);
    return () => {
      window.removeEventListener('open-share-dialog', shareHandler);
      window.removeEventListener('open-qr-dialog', qrHandler);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navigation />
      <main className="flex-1 pt-0">
        {children}
      </main>
      <Footer />

      {/* Share Panel */}
      <SharePanel open={shareOpen} onOpenChange={setShareOpen} />

      {/* QR Code Panel */}
      <QRCodePanel open={qrOpen} onOpenChange={setQrOpen} />

      {/* Floating share/QR buttons */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-3">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-share-dialog'))}
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: GOLD, boxShadow: `0 4px 24px ${GOLD}44` }}
          aria-label="Share Portfolio"
        >
          <Share2 size={20} className="text-black" />
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-qr-dialog'))}
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: GOLD, boxShadow: `0 4px 24px ${GOLD}44` }}
          aria-label="Scan QR Codes"
        >
          <QrCode size={20} className="text-black" />
        </button>
      </div>

      {/* AI Portfolio Chatbot */}
      <ChatBot />

      {/* Scroll Slider — progress bar + back-to-top */}
      <ScrollSlider />
    </div>
  );
}
