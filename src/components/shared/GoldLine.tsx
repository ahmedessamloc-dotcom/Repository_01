'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GOLD } from '@/components/shared/constants';

export default function GoldLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={isInView ? { width: '100%' } : {}}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="h-[1px] w-full"
      style={{ backgroundColor: GOLD }}
    />
  );
}
