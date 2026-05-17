'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { projects, projectCategories, type Project } from '@/lib/portfolio-data';
import { GOLD, fadeUp, staggerContainer } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { Trophy, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProjectDetailDialog = dynamic(() => import('@/components/sections/ProjectDetailDialog'));
const ImageLightbox = dynamic(() => import('@/components/shared/ImageLightbox'));

export default function ProjectTimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);

  // Sort projects: "Throughout Career" first, then by year descending (handles ranges like "2018–2022")
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.year === 'Throughout Career' && b.year !== 'Throughout Career') return -1;
      if (a.year !== 'Throughout Career' && b.year === 'Throughout Career') return 1;
      // For year ranges (e.g. "2018–2022"), use the start year for sorting
      const getYear = (y: string) => parseInt(y.replace(/[–\-].*$/, ''));
      return getYear(b.year) - getYear(a.year);
    });
  }, []);

  // Group by year
  const projectsByYear = useMemo(() => {
    const groups: { year: string; items: typeof projects }[] = [];
    let currentYear = '';
    for (const p of sortedProjects) {
      if (p.year !== currentYear) {
        currentYear = p.year;
        groups.push({ year: currentYear, items: [p] });
      } else {
        groups[groups.length - 1].items.push(p);
      }
    }
    return groups;
  }, [sortedProjects]);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setDialogOpen(false); // Close dialog so Radix focus trap doesn't block lightbox
    setTimeout(() => setLightboxOpen(true), 50);
  }, []);

  const openProject = useCallback((p: Project) => {
    setSelectedProject(p);
    setDialogOpen(true);
  }, []);

  return (
    <section id="timeline" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={'Project Timeline'} subtitle={'Chronological Journey'} />

        <div ref={ref} className="relative">
          {/* Vertical gold line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute left-6 top-0 w-[1px] md:left-8"
            style={{ backgroundColor: `${GOLD}33` }}
          />

          <div className="space-y-10">
            {projectsByYear.map((group, gi) => {
              // Collapse years 2014–2007 (parse start year for ranges)
              const yearNum = parseInt(group.year.replace(/[–\-].*$/, ''));
              const isCollapsed = !showAllTimeline && !isNaN(yearNum) && yearNum < 2014 && group.year !== 'Throughout Career';
              if (isCollapsed) return null;
              return (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
              >
                {/* Year marker */}
                <div className="relative mb-4 flex items-center gap-4">
                  <div
                    className="absolute left-6 top-1/2 z-10 h-3 w-3 -translate-x-[6px] -translate-y-[6px] rounded-full border-2 sm:left-8 md:left-8"
                    style={{ borderColor: GOLD, backgroundColor: GOLD + '44' }}
                  />
                  <span className="ml-12 sm:ml-14 md:ml-16">
                    <span
                      className="font-[family-name:var(--font-playfair)] text-xl font-bold md:text-2xl"
                      style={{ color: GOLD }}
                    >
                      {group.year}
                    </span>
                    <span className="ml-3 text-[11px] text-white/40">
                      {group.items.length} {group.items.length > 1 ? 'projects' : 'project'}
                    </span>
                  </span>
                </div>

                {/* Project cards for this year */}
                <div className="ml-12 grid gap-3 sm:ml-14 md:ml-16 sm:grid-cols-2">
                  {group.items.map((project) => (
                    <motion.button
                      key={project.id}
                      onClick={() => openProject(project)}
                      className="group relative flex items-start gap-4 rounded-lg border border-white/5 p-4 text-left transition-all duration-300 hover:border-[#C9A96E]44"
                      style={{ backgroundColor: 'var(--c-surface-dark)' }}
                      whileHover={{ x: 4 }}
                    >
                      {/* Thumbnail */}
                      {project.images.length > 0 ? (
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden">
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-md border border-dashed border-white/10" style={{ backgroundColor: 'var(--c-surface-card)' }}>
                          <span className="text-[9px] tracking-wider text-white/30">{'CONFIDENTIAL'}</span>
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#C9A96E]">
                          {project.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/40">
                          <span>{project.category}</span>
                          <span>·</span>
                          <span className="truncate">{project.location}</span>
                        </div>
                        {project.award && (
                          <div className="mt-1.5 flex items-center gap-1">
                            <Trophy size={10} style={{ color: GOLD }} />
                            <span className="text-[9px] font-medium" style={{ color: GOLD }}>AWARD</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight size={14} className="mt-1 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-[#C9A96E]" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* Show All / Show Less toggle */}
        {projectsByYear.some((g) => { const y = parseInt(g.year.replace(/[–\-].*$/, '')); return !isNaN(y) && y < 2014; }) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setShowAllTimeline(!showAllTimeline)}
              className="flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'rgba(201,169,110,0.4)',
                color: GOLD,
                backgroundColor: 'rgba(201,169,110,0.08)',
              }}
            >
              {showAllTimeline ? 'Show Less' : 'Show All Timeline'}
              {showAllTimeline ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </motion.div>
        )}
      </div>

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
    </section>
  );
}

// =============================================================================
// Awards Section
// =============================================================================

