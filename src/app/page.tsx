'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2, MapPin, Briefcase, Trophy, Star, Globe,
  FileDown, Phone, User, Clock, ChevronRight,
} from 'lucide-react';
import { GOLD, fadeUp, staggerContainer } from '@/components/shared/constants';
import HeroSection from '@/components/sections/HeroSection';

const sectionCards = [
  { label: 'About', href: '/about', icon: <User size={24} />, description: 'Professional background & specialties' },
  { label: 'Projects', href: '/projects', icon: <Building2 size={24} />, description: '150+ projects across 6+ countries' },
  { label: 'Timeline', href: '/timeline', icon: <Clock size={24} />, description: 'Project timeline & milestones' },
  { label: 'Map', href: '/map', icon: <MapPin size={24} />, description: 'Global project distribution' },
  { label: 'Experience', href: '/experience', icon: <Briefcase size={24} />, description: '20 years of professional experience' },
  { label: 'Awards', href: '/awards', icon: <Trophy size={24} />, description: 'Recognition & achievements' },
  { label: 'Competencies', href: '/competencies', icon: <Star size={24} />, description: 'Skills & expertise' },
  { label: 'Network', href: '/network', icon: <Globe size={24} />, description: 'Partners & collaborators' },
  { label: 'Download', href: '/download', icon: <FileDown size={24} />, description: 'CV, Portfolio & documents' },
  { label: 'Contact', href: '/contact', icon: <Phone size={24} />, description: 'Get in touch' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Quick Navigation Grid */}
      <section className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center sm:mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Explore the Portfolio
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-6 h-[2px]"
              style={{ backgroundColor: GOLD }}
            />
            <p className="mt-4 text-sm tracking-widest uppercase" style={{ color: GOLD }}>
              Navigate through each section
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {sectionCards.map((card, index) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                custom={index}
              >
                <Link
                  href={card.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-[#C9A96E]/30 hover:bg-white/[0.05]"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${GOLD}18` }}
                  >
                    <span style={{ color: GOLD }}>{card.icon}</span>
                  </div>
                  <h3 className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white">
                    {card.label}
                  </h3>
                  <p className="text-[11px] leading-snug text-white/30 group-hover:text-white/50 hidden sm:block">
                    {card.description}
                  </p>
                  <ChevronRight size={14} className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C9A96E]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
