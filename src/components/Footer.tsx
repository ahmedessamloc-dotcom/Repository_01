import React from 'react';
import Image from 'next/image';
import { GOLD } from '@/components/shared/constants';

export default function Footer() {
  return (
    <footer className="border-t px-4 py-6 sm:px-6 sm:py-10 bg-[var(--bg-primary)]" style={{ borderColor: `${GOLD}33` }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">© 2026</span>
          <Image src="/my-logo.webp" alt="Ahmed Essam" width={160} height={48} className="h-10 w-auto object-contain opacity-30" />
          <span className="text-xs text-white/30">. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
