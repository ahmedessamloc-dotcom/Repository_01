'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { projects, mapLocations, projectCategories, type Project } from '@/lib/portfolio-data';
import { GOLD, fadeUp, staggerContainer } from '@/components/shared/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { ssr: false });
const ProjectDetailDialog = dynamic(() => import('@/components/sections/ProjectDetailDialog'));
const ImageLightbox = dynamic(() => import('@/components/shared/ImageLightbox'));

const MAP_CATEGORY_COLORS: Record<string, string> = {
  'Hospitality & Tourism': '#C9A96E',
  'Commercial & Mixed-Use': '#60A5FA',
  'Residential': '#34D399',
  'Educational': '#F59E0B',
  'Institutional': '#A78BFA',
  'Healthcare': '#FB7185',
  'Urban Planning': '#22D3EE',
  'Interior Design': '#E879F9',
  'Religious & Cultural': '#FBBF24',
};

function getMapCatColor(cat: string): string {
  return MAP_CATEGORY_COLORS[cat] || GOLD;
}

export default function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProjectId, setSelectedProjectId] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mapCategory, setMapCategory] = useState('All');
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProjectId(project);
    setDialogOpen(true);
  }, []);

  const openLightbox = useCallback((images: string[], index: number) => {
    setDialogOpen(false); // Close dialog so Radix focus trap doesn't block lightbox
    setLightboxImages(images);
    setLightboxIndex(index);
    setTimeout(() => setLightboxOpen(true), 50);
  }, []);

  const allMapCategories = ['All', ...projectCategories];

  // Dynamic stats from data — filtered by category
  const mapStats = useMemo(() => {
    const filteredProjectTitles = new Set<string>();
    const filteredCities = new Set<string>();
    const filteredCountries = new Set<string>();

    mapLocations.forEach((loc) => {
      const matching = mapCategory === 'All'
        ? loc.projects
        : loc.projects.filter((pName) => {
            const found = projects.find((p) => p.title === pName);
            return found && found.category === mapCategory;
          });
      if (matching.length > 0) {
        filteredCities.add(loc.city);
        filteredCountries.add(loc.country);
        matching.forEach((p) => filteredProjectTitles.add(p));
      }
    });

    return {
      cities: filteredCities.size,
      countries: filteredCountries.size,
      projects: filteredProjectTitles.size,
    };
  }, [mapCategory]);

  return (
    <section id="map" className="py-16 px-4 sm:py-24 sm:px-6 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={'Global Presence'} subtitle={'Project Locations'} />

        {/* Category Filter Tabs — colored by category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap justify-center gap-2"
        >
          {allMapCategories.map((cat) => {
            const catColor = cat === 'All' ? GOLD : getMapCatColor(cat);
            const isActive = mapCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setMapCategory(cat)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs tracking-wider transition-all duration-300"
                style={{
                  borderColor: isActive ? catColor  : 'var(--c-border-subtle)',
                  backgroundColor: isActive ? `${catColor}20` : 'transparent',
                  color: isActive ? catColor  : 'var(--c-text-muted)',
                  boxShadow: isActive ? `0 0 12px ${catColor}30, inset 0 0 8px ${catColor}10` : 'none',
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: catColor,
                    boxShadow: isActive ? `0 0 6px ${catColor}` : `0 0 3px ${catColor}66`,
                  }}
                />
                {cat}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden border border-white/5 bg-[var(--bg-card)]"
        >
          <div className="h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <InteractiveMap onProjectClick={handleProjectClick} activeCategory={mapCategory} />
          </div>

          {/* Floating buttons moved to fixed position at page level */}

          {/* Stats overlay — colored by active category */}
          <div className="absolute bottom-3 left-3 z-[1000] flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-black/80 px-3 py-2 backdrop-blur-md sm:bottom-4 sm:left-4 sm:gap-3 sm:px-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{
                backgroundColor: mapCategory === 'All' ? GOLD : getMapCatColor(mapCategory),
                boxShadow: `0 0 8px ${mapCategory === 'All' ? GOLD : getMapCatColor(mapCategory)}66`,
              }} />
              <span className="text-[10px] sm:text-[11px] text-white/70">
                <strong style={{ color: mapCategory === 'All' ? GOLD : getMapCatColor(mapCategory) }}>{mapStats.cities}</strong> {'Cities'}
              </span>
            </div>
            <div style={{ width: '1px', height: '14px', backgroundColor : 'var(--c-text-micro)' }} />
            <span className="text-[11px] text-white/70">
              <strong style={{ color: mapCategory === 'All' ? GOLD : getMapCatColor(mapCategory) }}>{mapStats.countries}</strong> {'Countries'}
            </span>
            <div style={{ width: '1px', height: '14px', backgroundColor : 'var(--c-text-micro)' }} />
            <span className="text-[11px] text-white/70">
              <strong style={{ color: mapCategory === 'All' ? GOLD : getMapCatColor(mapCategory) }}>{mapStats.projects}</strong> {'Projects'}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-center text-[11px] tracking-wider text-white/30"
        >
          {'Click markers to explore projects at each location'}
        </motion.p>
      </div>

      <ProjectDetailDialog
        project={selectedProjectId}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onOpenLightbox={openLightbox}
      />
      <ImageLightbox
        images={lightboxImages}
        startIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}

// =============================================================================
// Experience Section
// =============================================================================

const TYPE_COLORS: Record<string, string> = {
  Consulting: '#C9A96E',
  'Project Management': '#8B7355',
  Freelance: '#A0A0A0',
  Management: '#C9A96E',
  Design: '#D4AF37',
};

