'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Share2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { NAV_LINKS, GOLD } from '@/components/shared/constants';
import GlobalSearchOverlay from '@/components/shared/GlobalSearchOverlay';

function useIsScrolled(threshold = 60) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY > threshold;
      if (scrolled !== isScrolled) setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold, isScrolled]);
  return isScrolled;
}

export default function Navigation() {
  const isScrolled = useIsScrolled();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Determine active section from pathname
  const activeSection = (() => {
    if (pathname === '/') return 'Home';
    const match = NAV_LINKS.find((l) => l.href === pathname);
    return match ? match.label : '';
  })();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileOpen]);

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 ${mobileOpen ? 'z-[10000]' : 'z-50'} w-full transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ borderBottom: isScrolled ? `1px solid ${GOLD}` : '1px solid transparent' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" onClick={() => setLogoOpen(true)} className="flex items-center gap-2 transition-transform duration-500 logo-pulse-repeat hover:scale-105">
          <Image src="/my-logo.webp" alt="Logo" width={120} height={120} priority className="h-16 w-auto object-contain md:h-20" />
        </Link>

        <Dialog open={logoOpen} onOpenChange={setLogoOpen}>
          <DialogContent className="border-[#C9A96E]22 bg-[var(--bg-primary)] sm:max-w-md rounded-2xl p-0 overflow-hidden">
            <DialogTitle className="sr-only">Ahmed Essam — Project Manager — Design & Development Management</DialogTitle>
            <div className="relative flex flex-col items-center py-10 px-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #C9A96E 0%, transparent 70%)' }} />
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 mb-6"
              >
                <Image src="/my-logo.webp" alt="Ahmed Essam Logo" width={200} height={200} className="h-36 w-auto object-contain sm:h-44 drop-shadow-[0_0_40px_rgba(201,169,110,0.3)]" />
              </motion.div>
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 text-center"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold" style={{ color: GOLD }}>
                  Ahmed Essam
                </h3>
                <p className="mt-2 text-xs sm:text-sm tracking-[0.15em] uppercase" style={{ color: 'var(--c-text-muted)' }}>
                  {'Project Manager — Design & Development Management'}
                </p>
                <div className="mt-4 mx-auto h-[1px] w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }} />
                <p className="mt-4 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--c-text-muted)' }}>
                  {'20 Years of Excellence in Architecture, Design & Project Management across 6+ Countries'}
                </p>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs md:text-sm tracking-wider uppercase transition-colors duration-300"
              style={{
                color: activeSection === link.label ? GOLD : 'var(--c-text-secondary)',
                fontWeight: activeSection === link.label ? 600 : 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => {
                if (activeSection !== link.label) e.currentTarget.style.color = '';
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-share-dialog'))}
            className="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{ color: 'var(--c-text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-secondary)')}
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{ color: 'var(--c-text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-secondary)')}
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} color={GOLD} /> : <Menu size={24} color={GOLD} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 backdrop-blur-md md:hidden mobile-nav-overlay"
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain flex flex-col gap-1 px-6 py-4 scrollbar-thin">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-start text-sm tracking-wider uppercase transition-colors"
                  style={{
                    color: activeSection === link.label ? GOLD : 'var(--c-text-secondary)',
                    fontWeight: activeSection === link.label ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); window.dispatchEvent(new CustomEvent('open-share-dialog')); }}
                className="flex items-center gap-2 py-3 text-start text-sm tracking-wider uppercase transition-colors"
                style={{ color: 'var(--c-text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-secondary)')}
              >
                <Share2 size={18} />
                <span>{'Share'}</span>
              </button>
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="flex items-center gap-2 py-3 text-start text-sm tracking-wider uppercase transition-colors"
                style={{ color: 'var(--c-text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-secondary)')}
              >
                <Search size={18} />
                <span>{'Search'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <GlobalSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
