'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Search, ChevronRight } from 'lucide-react';
import { projects, projectCategories, type Project } from '@/lib/portfolio-data';
import { GOLD } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { X, Trophy, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectDetailDialog = dynamic(() => import('@/components/sections/ProjectDetailDialog'));
const ImageLightbox = dynamic(() => import('@/components/shared/ImageLightbox'));

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Listen for filter events from About Me specialty badges
  useEffect(() => {
    const handler = (e: Event) => {
      const category = (e as CustomEvent).detail as string;
      setActiveFilter(category);
    };
    window.addEventListener('filter-projects', handler);
    return () => window.removeEventListener('filter-projects', handler);
  }, []);

  const allCategories = ['All', ...projectCategories];
  const filteredProjects = useMemo(() => {
    let result = activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        [p.title, p.category, p.location, p.client, p.description, p.year, p.role, p.budget, p.award]
          .filter(Boolean)
          .some((field) => (field as string).toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  // Reset category filter when search is active
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (value.trim() && activeFilter !== 'All') {
      setActiveFilter('All');
    }
  }, [activeFilter]);

  const openProject = useCallback((p: Project) => {
    setSelectedProject(p);
    setDialogOpen(true);
  }, []);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setDialogOpen(false); // Close dialog so Radix focus trap doesn't block lightbox
    // Small delay to let dialog close before lightbox opens
    setTimeout(() => setLightboxOpen(true), 50);
  }, []);

  // Listen for open-project-detail events from Hero data box clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const projectId = (e as CustomEvent).detail as number;
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        openProject(project);
      }
    };
    window.addEventListener('open-project-detail', handler);
    return () => window.removeEventListener('open-project-detail', handler);
  }, [openProject]);

  return (
    <section id="projects" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={'Selected Projects'} subtitle={'Portfolio Showcase'} />
        <p className="text-center text-xs sm:text-sm text-white/35 mb-6">
          {'48 featured projects — selected highlights from a career portfolio of 150+ completed projects'}
        </p>

        {/* Section Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-6 max-w-xl"
        >
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--c-text-faint)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search projects by name, location, category, client..."
              className="w-full rounded-full border py-2.5 pl-11 pr-10 text-sm text-white placeholder-white/35 outline-none transition-all duration-300"
              style={{
                backgroundColor: 'var(--c-surface-dark)',
                borderColor: searchQuery ? '#C9A96E' : 'rgba(201,169,110,0.2)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-colors duration-200"
                style={{ color: 'var(--c-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text-muted)')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-[11px] tracking-wide"
              style={{ color: 'var(--c-text-muted)' }}
            >
              {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''} found
            </motion.p>
          )}
        </motion.div>

        {/* Filter Tabs */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="rounded-full border px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs tracking-wider transition-all duration-300"
                style={{
                  borderColor: activeFilter === cat ? GOLD  : 'var(--c-border-subtle)',
                  backgroundColor: activeFilter === cat ? GOLD : 'transparent',
                  color: activeFilter === cat ? 'var(--c-text-primary)' : 'var(--c-text-secondary)',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                if (!showAllProjects && index >= 24) return null;
                return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(index, 23) * 0.05 }}
                  onClick={() => openProject(project)}
                  className="group cursor-pointer overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#C9A96E]44"
                  style={{ backgroundColor: 'var(--c-surface-dark)' }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {project.images.length > 0 ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--c-surface-card) 0%, var(--c-surface-dark) 100%)' }}>
                        <Building2 size={48} style={{ color: 'rgba(201,169,110,0.2)' }} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Project number */}
                    <span
                      className="absolute top-4 left-4 font-[family-name:var(--font-playfair)] text-lg font-bold opacity-60"
                      style={{ color: GOLD }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="border-[#C9A96E]66 bg-[#C9A96E]20 text-[10px] text-[#C9A96E]">
                        {project.category}
                      </Badge>
                    </div>
                    {/* Award badge */}
                    {project.award && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-1">
                        <Trophy size={12} style={{ color: GOLD }} />
                        <span className="text-[10px] font-medium" style={{ color: GOLD }}>
                          {'AWARD'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white transition-colors duration-300 group-hover:text-[#C9A96E] sm:text-lg">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-white/40">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/50">
                      {project.description.substring(0, 120)}...
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: GOLD }}>
                      {'View Details'} <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Show All / Show Less toggle */}
          {!searchQuery.trim() && filteredProjects.length > 24 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'rgba(201,169,110,0.4)',
                  color: GOLD,
                  backgroundColor: 'rgba(201,169,110,0.08)',
                }}
              >
                {showAllProjects ? 'Show Less' : 'Show All Projects'}
                {showAllProjects ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        startIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          // Reopen dialog when lightbox closes so user can continue browsing
          if (selectedProject) setDialogOpen(true);
        }}
      />
    </section>
  );
}

