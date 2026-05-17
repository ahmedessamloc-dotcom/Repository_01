'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { partners } from '@/lib/portfolio-data';
import { GOLD, fadeUp, staggerContainer } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="network" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={'Professional Network'} subtitle={'Clients & Collaborators'} />

        <div ref={ref}>
          {/* All partners in a single unified grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Offices & Firms */}
            <div className="mb-8">
              <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-center" style={{ color: GOLD }}>
                Offices & Firms
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {partners[0].entries.map((entry, i) => {
                  const Wrapper = entry.link ? 'a' : 'div';
                  const linkProps = entry.link ? { href: entry.link, target: '_blank' as const, rel: 'noopener noreferrer' as const } : {};
                  return (
                    <motion.div
                      key={entry.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={`group flex flex-col items-center justify-center gap-2 rounded-lg border border-white/5 px-3 py-3 text-center transition-all duration-300 hover:border-[#C9A96E]44 hover:bg-[#C9A96E]08 sm:px-4 sm:py-4 ${entry.link ? 'cursor-pointer' : ''}`}
                      style={{ backgroundColor: 'var(--c-surface-dark)' }}
                      {...(entry.link ? { onClick: () => window.open(entry.link!, '_blank') } : {})}
                    >
                      {entry.logo ? (
                        <>
                          <div className="relative h-10 w-full">
                            <Image
                              src={entry.logo}
                              alt={entry.name}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-110"
                              sizes="120px"
                            />
                          </div>
                          <span className="text-[10px] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                            {entry.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white">
                          {entry.name}
                        </span>
                      )}
                      {entry.link && (
                        <ExternalLink size={10} className="text-[#C9A96E]/40 transition-all duration-300 group-hover:text-[#C9A96E]" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-auto mb-8 h-[1px] max-w-xs" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />

            {/* Commercial Brands */}
            <div className="mb-8">
              <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-center" style={{ color: GOLD }}>
                Commercial Brands
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {partners[1].entries.map((entry, i) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-white/5 px-3 py-3 text-center transition-all duration-300 hover:border-[#C9A96E]44 hover:bg-[#C9A96E]08 sm:px-4 sm:py-4"
                    style={{ backgroundColor: 'var(--c-surface-dark)' }}
                  >
                    {entry.logo ? (
                      <>
                        <div className="relative h-10 w-full">
                          <Image
                            src={entry.logo}
                            alt={entry.name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                            sizes="120px"
                          />
                        </div>
                        <span className="text-[10px] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                          {entry.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white">
                        {entry.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-auto mb-8 h-[1px] max-w-xs" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />

            {/* Government & Institutional */}
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-center" style={{ color: GOLD }}>
                Government & Institutional
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {partners[2].entries.map((entry, i) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-white/5 px-3 py-3 text-center transition-all duration-300 hover:border-[#C9A96E]44 hover:bg-[#C9A96E]08 sm:px-4 sm:py-4"
                    style={{ backgroundColor: 'var(--c-surface-dark)' }}
                  >
                    {entry.logo ? (
                      <>
                        <div className="relative h-10 w-full">
                          <Image
                            src={entry.logo}
                            alt={entry.name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                            sizes="120px"
                          />
                        </div>
                        <span className="text-[10px] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                          {entry.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white">
                        {entry.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Download Section
// =============================================================================

