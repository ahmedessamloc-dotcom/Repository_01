'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOLD } from '@/components/shared/constants';

// =============================================================================
// Rotating Quotes
// =============================================================================

const rotatingQuotesData = [
  '"Architecture is the learned game, correct and magnificent, of forms assembled in the light."',
  '"A house is a machine for living in."',
  '"Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep."',
  '"The mother art is architecture. Without an architecture of our own we have no soul of our own civilization."',
  '"Architecture should speak of its time and place, but yearn for timelessness."',
  '"Design is not just what it looks like and feels like. Design is how it works."',
  '"Less is more."',
  '"Details are not secondary elements; they are what define the quality of architecture."',
  '"Architecture begins where engineering ends."',
  '"Every great architect is necessarily a great poet. He must be a great original interpreter of his time, his day, his age."',
];

export default function RotatingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % rotatingQuotesData.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[80px] flex flex-col items-center justify-center">
      <div className="mx-auto mb-4 h-[1px] w-16" style={{ backgroundColor: GOLD }} />
      <p
        className="font-[family-name:var(--font-playfair)] text-lg font-light text-white/50 sm:text-xl md:text-2xl transition-all duration-500"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(-10px)' : 'translateY(0)',
        }}
      >
        {rotatingQuotesData[currentQuote]}
      </p>
      <p
        className="mt-2 text-xs tracking-wider transition-all duration-500"
        style={{
          color: GOLD,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
        }}
      >
        — Ahmed Essam
      </p>
    </div>
  );
}

// =============================================================================
// Contact Section
// =============================================================================

