'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Linkedin } from 'lucide-react';
import { aboutData, mapLocations } from '@/lib/portfolio-data';
import { GOLD, GOLD_LIGHT, fadeUp } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import GoldLine from '@/components/shared/GoldLine';
import { ExternalLink } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });
  // Dynamic stats computed from data
  const aboutStats = useMemo(() => {
    const cities = new Set(mapLocations.map((l) => l.city));
    const countries = new Set(mapLocations.map((l) => l.country));
    return [
      { value: 20, suffix: '+', label: 'Years Experience' },
      { value: 150, suffix: '+', label: 'Projects Completed' },
      { value: countries.size, suffix: '', label: 'Countries' },
      { value: cities.size, suffix: '', label: 'Cities' },
      { value: 1.5, suffix: 'B+', label: 'Portfolio Value (Last 10 Yrs)' },
    ];
  }, []);

  return (
    <section id="about" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={'About Me'} subtitle={'Background & Expertise'} />

        <div ref={ref}>
          {/* Photo beside bio */}
          <div className="mt-4 grid gap-6 md:grid-cols-[280px_1fr] items-start">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative mx-auto w-full max-w-[240px] md:mx-0"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ border: `1px solid ${GOLD}33` }}
              >
                <Image
                  src={aboutData.portrait}
                  alt="Ahmed Essam Portrait"
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <h3
                className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl"
              >
                {aboutData.name}
              </h3>
              <p className="mt-1 text-sm tracking-wider" style={{ color: GOLD }}>
                {aboutData.title}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-white/70">
                {aboutData.bio}
              </p>

              {/* Specialty badges — clickable to filter projects */}
              <div className="mt-6 flex flex-wrap gap-2">
                {aboutData.specialties.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('filter-projects', { detail: s }));
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="rounded-full border px-4 py-2 text-xs tracking-wider transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor : 'var(--c-border-subtle)',
                      color : 'var(--c-text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = GOLD;
                      e.currentTarget.style.color = 'var(--c-text-primary)';
                      e.currentTarget.style.borderColor = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--c-text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--c-border-subtle)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-10 grid grid-cols-3 gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-5"
          >
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                animate={statsInView ? 'visible' : {}}
                className="text-center"
              >
                <div
                  className="font-[family-name:var(--font-playfair)] text-2xl font-bold sm:text-3xl"
                  style={{ color: GOLD }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div className="mt-1 text-[10px] tracking-wider uppercase text-white/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact info */}
          <GoldLine />
          <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
            <a
              href={`tel:${aboutData.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-3 rounded-lg border border-white/5 p-3 sm:p-4 transition-all duration-500 hover:border-[#C9A96E]44"
              style={{ backgroundColor: 'var(--c-surface-dark)' }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: GOLD_LIGHT }}>
                <Phone size={16} style={{ color: GOLD }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-white/40">Phone</p>
                <p className="mt-0.5 text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">{aboutData.phone}</p>
              </div>
              <ExternalLink size={12} className="ml-auto shrink-0 text-white/30" />
            </a>
            <a
              href={`mailto:${aboutData.email}`}
              className="group flex items-center gap-3 rounded-lg border border-white/5 p-3 sm:p-4 transition-all duration-500 hover:border-[#C9A96E]44"
              style={{ backgroundColor: 'var(--c-surface-dark)' }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: GOLD_LIGHT }}>
                <Mail size={16} style={{ color: GOLD }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-white/40">Email</p>
                <p className="mt-0.5 text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">{aboutData.email}</p>
              </div>
              <ExternalLink size={12} className="ml-auto shrink-0 text-white/30" />
            </a>
            <a
              href={`https://${aboutData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-white/5 p-3 sm:p-4 transition-all duration-500 hover:border-[#C9A96E]44"
              style={{ backgroundColor: 'var(--c-surface-dark)' }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: GOLD_LIGHT }}>
                <Linkedin size={16} style={{ color: GOLD }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-white/40">LinkedIn</p>
                <p className="mt-0.5 truncate text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">{aboutData.linkedin}</p>
              </div>
              <ExternalLink size={12} className="ml-auto shrink-0 text-white/30" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
