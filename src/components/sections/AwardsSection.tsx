'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';
import { awards, projects, type Project } from '@/lib/portfolio-data';
import { GOLD, fadeUp, staggerContainer, scaleIn } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProjectDetailDialog = dynamic(() => import('@/components/sections/ProjectDetailDialog'));
const ImageLightbox = dynamic(() => import('@/components/shared/ImageLightbox'));

export default function AwardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getAwardIcon = (title: string) => {
    if (title === '1ST PLACE') return <Trophy size={24} style={{ color: GOLD }} />;
    if (title === '2ND PLACE') return <Award size={24} style={{ color: 'var(--c-text-muted)' }} />;
    return <Star size={24} style={{ color: 'var(--c-text-muted)' }} />;
  };

  const getAwardBorderColor = (title: string) => {
    if (title === '1ST PLACE') return GOLD;
    if (title === '2ND PLACE') return '#A0A0A0';
    return '#707070';
  };

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setDialogOpen(false); // Close dialog so Radix focus trap doesn't block lightbox
    setTimeout(() => setLightboxOpen(true), 50);
  }, []);

  // Helper: match an award project name to its actual project (exact-first, then fuzzy)
  const findProjectForAward = useCallback((awardProjectName: string) => {
    // 1. Exact title match
    const exact = projects.find((p) => p.title === awardProjectName);
    if (exact) return exact;
    // 2. Award name is a substring of the project title (e.g. "Center" trimming)
    const substring = projects.find((p) =>
      p.title.toLowerCase().includes(awardProjectName.toLowerCase().replace('center', '').trim())
    );
    if (substring) return substring;
    // 3. Project title first word is contained in award name — but require the word to be at least 4 chars to avoid false positives (e.g. "al" in "dhofar")
    const fuzzy = projects.find((p) => {
      const firstWord = p.title.toLowerCase().split(' ')[0];
      return firstWord.length >= 4 && awardProjectName.toLowerCase().includes(firstWord);
    });
    return fuzzy || null;
  }, []);

  // Lookup map: award project name → first image
  const awardProjectImages = useMemo(() => {
    const map: Record<string, string> = {};
    awards.forEach((award) => {
      const found = findProjectForAward(award.project);
      if (found) map[award.project] = found.images[0];
    });
    return map;
  }, [findProjectForAward]);

  const handleAwardClick = useCallback((awardProjectName: string) => {
    const found = findProjectForAward(awardProjectName);
    if (found) {
      setSelectedProject(found);
      setDialogOpen(true);
    }
  }, [findProjectForAward]);

  return (
    <section id="awards" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={'Awards & Recognition'} subtitle={'Competition Results'} />

        {/* ARCHPLAN Tribute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 rounded-lg border border-[#C9A96E]15 p-5 sm:p-6 bg-[var(--bg-card)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={18} style={{ color: GOLD }} />
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-semibold" style={{ color: GOLD }}>{'Where It All Began — ARCHPLAN'}</h4>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {'Archplan Consulting Group is where Ahmed Essam\'s professional journey in architecture began — a firm renowned for its commitment to design excellence and innovative project delivery. Founded with a vision to transform the built environment, Archplan provided the foundational training ground that shaped Ahmed\'s approach to project management, design coordination, and client relationships. The firm\'s portfolio spans residential, commercial, and institutional projects across the Middle East, establishing standards of quality that continue to influence Ahmed\'s work today.'}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : {}}
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              onClick={() => handleAwardClick(award.project)}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/5 p-4 sm:p-6 transition-all duration-500 hover:shadow-lg"
              style={{ backgroundColor: 'var(--c-surface-dark)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = getAwardBorderColor(award.title) + '66';
                e.currentTarget.style.boxShadow = `0 0 30px ${getAwardBorderColor(award.title)}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Thumbnail */}
              {awardProjectImages[award.project] && (
                <div className="relative mb-3 h-28 w-full overflow-hidden rounded-md sm:mb-4 sm:h-36">
                  <Image
                    src={awardProjectImages[award.project]}
                    alt={award.project}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}

              {/* Icon */}
              <div className="mb-4 flex items-center justify-between">
                {getAwardIcon(award.title)}
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest"
                  style={{
                    borderColor: getAwardBorderColor(award.title) + '44',
                    color: getAwardBorderColor(award.title),
                  }}
                >
                  {award.title}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#C9A96E]">
                {award.project}
              </h3>
              <p className="mt-2 text-xs tracking-wider" style={{ color: GOLD }}>
                {award.type}
              </p>
              <div className="mt-3 text-[11px] text-white/40">{award.year}</div>

              {/* Click hint */}
              <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: GOLD }}>
                <ExternalLink size={12} />
                View Project
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project dialog & lightbox for award clicks */}
        <ProjectDetailDialog
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onOpenLightbox={openLightbox}
        />
        <ImageLightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => {
            setLightboxOpen(false);
            if (selectedProject) setDialogOpen(true);
          }}
        />
      </div>
    </section>
  );
}

// =============================================================================
// Competencies Section
// =============================================================================

