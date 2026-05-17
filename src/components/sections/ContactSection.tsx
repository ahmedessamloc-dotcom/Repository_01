'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Linkedin, MapPin, Send } from 'lucide-react';
import { aboutData } from '@/lib/portfolio-data';
import { GOLD, GOLD_LIGHT, fadeUp, staggerContainer } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, ChevronRight, QrCode } from 'lucide-react';
import dynamic from 'next/dynamic';

const QRCodePanel = dynamic(() => import('@/components/sections/QRCodePanel'));

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [qrOpen, setQrOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);

  // Listen for open-qr-dialog event from floating button or any other trigger
  useEffect(() => {
    const handler = () => setQrOpen(true);
    window.addEventListener('open-qr-dialog', handler);
    return () => window.removeEventListener('open-qr-dialog', handler);
  }, []);

  const contactItems = [
    { icon: <Phone size={18} />, label: 'Phone', value: aboutData.phone, href: `tel:${aboutData.phone.replace(/\s/g, '')}` },
    { icon: <Mail size={18} />, label: 'Email', value: aboutData.email, href: `mailto:${aboutData.email}` },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', value: aboutData.linkedin, href: `https://${aboutData.linkedin}` },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={'Contact'} subtitle={'Get in Touch'} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 mb-8 flex justify-center"
        >
          <button onClick={() => setLogoOpen(true)} className="cursor-pointer transition-transform duration-300 hover:scale-105 logo-pulse-repeat">
            <Image src="/my-logo.webp" alt="Logo" width={180} height={180} className="h-24 w-auto object-contain sm:h-32" />
          </button>
        </motion.div>

        {/* Logo Dialog */}
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

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : {}}
          className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-5"
        >
          {/* Photo column */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Gold accent frame */}
              <div className="absolute -inset-3 rounded-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}44, transparent, ${GOLD}22)` }} />
              <div className="relative w-[240px] aspect-[3/4] overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                <Image
                  src="/ahmed-connect.webp"
                  alt="Ahmed Essam"
                  fill
                  className="object-contain"
                  sizes="240px"
                  priority
                />
              </div>
              {/* Gold corner accent */}
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-tl-lg" style={{ backgroundColor: GOLD }} />
            </div>
          </motion.div>

          {/* Contact info column */}
          <div className="flex flex-col justify-center lg:col-span-3">
            <motion.p
              variants={fadeUp}
              className="mb-6 text-sm leading-relaxed text-white/50 sm:mb-8"
            >
              Available for architectural consulting, project management, and design collaboration opportunities.
              Let&apos;s discuss how I can gain experience from your firm and add value to your projects.
            </motion.p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.label === 'LinkedIn' || item.label === 'Location' ? '_blank' : undefined}
                  rel={item.label === 'LinkedIn' || item.label === 'Location' ? 'noopener noreferrer' : undefined}
                  variants={fadeUp}
                  className="group flex items-center gap-3 rounded-lg border border-white/5 p-3 sm:p-4 transition-all duration-500 hover:border-[#C9A96E]44"
                  style={{ backgroundColor: 'var(--c-surface-dark)' }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-10 sm:w-10"
                    style={{ backgroundColor: GOLD_LIGHT }}
                  >
                    <div style={{ color: GOLD }}>{item.icon}</div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-widest uppercase text-white/40">{item.label}</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
                      {item.value}
                    </p>
                  </div>
                  <div className="ml-auto shrink-0 text-white/30 transition-colors duration-300 group-hover:text-white/50">
                    {item.label === 'Phone' && <ExternalLink size={12} />}
                    {item.label === 'Email' && <Send size={12} />}
                    {item.label === 'LinkedIn' && <ExternalLink size={12} />}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* QR Scan & Connect Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <button
            onClick={() => setQrOpen(true)}
            className="group relative flex items-center gap-3 rounded-2xl border px-6 py-4 transition-all duration-500 sm:px-8"
            style={{
              backgroundColor: 'var(--c-surface-dark)',
              borderColor: `${GOLD}33`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}88`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${GOLD}22, 0 0 60px ${GOLD}11`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}33`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${GOLD}15 45%, ${GOLD}25 50%, ${GOLD}15 55%, transparent 60%)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2.5s ease-in-out infinite',
              }}
            />
            <div
              className="relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${GOLD}22` }}
            >
              <QrCode size={22} style={{ color: GOLD }} />
            </div>
            <div className="relative text-left">
              <p className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
                {'Scan & Connect'}
              </p>
              <p className="text-[10px] tracking-wider text-white/30">
                QR Codes — Portfolio, WhatsApp, LinkedIn & More
              </p>
            </div>
            <ChevronRight
              size={16}
              className="relative ml-2 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/50"
            />
          </button>
        </motion.div>

        <QRCodePanel open={qrOpen} onOpenChange={setQrOpen} />


      </div>
    </section>
  );
}

// =============================================================================
// Footer
// =============================================================================

