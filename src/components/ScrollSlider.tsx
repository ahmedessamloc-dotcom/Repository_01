'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

const GOLD = '#C9A96E';

// =============================================================================
// ScrollSlider — simplified for multi-page architecture
// Features:
//   1. Top progress bar showing scroll position
//   2. Scroll-to-top button
// =============================================================================

export default function ScrollSlider() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
      setShowTopBtn(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Top Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[9990] h-[3px] w-full"
        style={{ backgroundColor: 'rgba(201, 169, 110, 0.08)' }}
      >
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, ${GOLD}, #E8D5B0)`,
            boxShadow: '0 0 10px rgba(201, 169, 110, 0.5)',
          }}
        />
      </div>

      {/* Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed z-[9980] flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-[#C9A96E]/40 hover:bg-black/80 active:scale-90 ${
          showTopBtn
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{
          right: '14px',
          bottom: '100px',
          width: '40px',
          height: '40px',
          boxShadow: showTopBtn ? '0 4px 16px rgba(0,0,0,0.4)' : 'none',
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} style={{ color: GOLD }} />
      </button>
    </>
  );
}
