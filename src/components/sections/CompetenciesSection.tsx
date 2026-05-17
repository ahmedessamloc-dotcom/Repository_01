'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { competencies } from '@/lib/portfolio-data';
import { GOLD, fadeUp, staggerContainer } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';

export default function CompetenciesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="competencies" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={'Core Competencies'} subtitle={'Skills & Expertise'} />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : {}}
          className="grid gap-6 sm:gap-10 md:grid-cols-3"
        >
          {competencies.map((comp, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="rounded-lg border border-white/5 p-4 sm:p-6"
              style={{ backgroundColor: 'var(--c-surface-dark)' }}
            >
              <h3
                className="mb-6 font-[family-name:var(--font-playfair)] text-lg font-semibold"
                style={{ color: GOLD }}
              >
                {comp.category}
              </h3>
              <div className="h-[1px] w-12 mb-6" style={{ backgroundColor: GOLD }} />
              <ul className="space-y-3">
                {comp.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Partners Section
// =============================================================================

