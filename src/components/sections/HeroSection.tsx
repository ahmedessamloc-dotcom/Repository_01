'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { mapLocations, aboutData, projects } from '@/lib/portfolio-data';
import { GOLD } from '@/components/shared/constants';
import type { HeroSlide } from '@/components/shared/types';
import { MapPin, Trophy, ChevronRight, ArrowDown } from 'lucide-react';

// Hero Section — Cinematic Architecture Portfolio
// =============================================================================

// Deterministic shuffle for SSR
function seededShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (i * 7 + 13) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Slideshow whitelist — only images from the uploaded "slide show.rar"
// Oasis always starts first, then randomized with non-consecutive same-project rule
const SINGLE_SHOT_WHITELIST: Record<number, string[]> = {
  1:  ['/portfolio/image3.webp'],                                                                                   // Oasis Skywalk — always first slide
  // 2: Boutique — EXCLUDED
  3:  ['/portfolio/image9.webp', '/portfolio/image10.webp', '/portfolio/image11.webp'],                                 // Ministry of Defense
  4:  ['/portfolio/image12.webp', '/portfolio/image13.webp', '/portfolio/image14.webp', '/portfolio/image15.webp'],       // Wycombe Abbey
  5:  ['/portfolio/image16.webp'],                                                                                    // Spa & Medical Hub
  7:  ['/portfolio/image23.webp', '/portfolio/image24.webp', '/portfolio/image25.webp', '/portfolio/image74.webp', '/portfolio/image75.webp'], // Attorney General
  14: ['/portfolio/image39.webp'],                                                                                    // Vodafone Renovation
  15: ['/portfolio/image41.webp', '/portfolio/image42.webp'],                                                          // Al Okashia
  17: ['/portfolio/image44.webp', '/portfolio/image45.webp'],                                                          // El Saraya Plaza
  18: ['/portfolio/image46.webp', '/portfolio/image47.webp'],                                                          // Neama Oasis
  20: ['/portfolio/image50.webp', '/portfolio/image51.webp'],                                                          // El Karnak Temple Park
  21: ['/portfolio/image55.webp'],                                                                                    // Residential Interior Design 1
  22: ['/portfolio/image52.webp'],                                                                                    // Residential Interior Design 2
  23: ['/portfolio/image53.webp'],                                                                                    // Residential Interior Design 3
  24: ['/portfolio/image62.webp'],                                                                                    // AIB Bank
  31: ['/portfolio/image70.webp', '/portfolio/image71.webp'],                                                          // Lowers Syndicate Club — Alexandria
  32: ['/portfolio/image72.webp'],                                                                                    // Lowers Syndicate Club — Luxor
  33: ['/portfolio/image73.webp'],                                                                                    // Pharma Cure Factory
  34: ['/portfolio/image_e854d031.webp', '/portfolio/image_6e5d4bb4.webp'],                                            // Luxor Children Park
  35: ['/portfolio/image_ed47f6f2.webp'],                                                                              // FPI Training Center
  36: ['/portfolio/image76.webp', '/portfolio/image77.webp'],                                                          // Administrative Compound
  37: ['/portfolio/image78.webp', '/portfolio/image79.webp'],                                                          // Holding Company for Water & Wastewater
  38: ['/portfolio/image80.webp', '/portfolio/image81.webp'],                                                          // New Cairo Club — Admin Building
  39: ['/portfolio/image_9fc76e09.webp'],                                                                              // Ras Sidr Touristic Village Competition
  40: ['/portfolio/image_580efc07.webp'],                                                                              // New Ismailia City Development
  41: ['/portfolio/image54.webp'],                                                                                    // Residential Interior Design 4
  42: ['/portfolio/image58.webp', '/portfolio/image59.webp', '/portfolio/image60.webp', '/portfolio/image61.webp'],       // Residential Interior Design 5
  45: ['/portfolio/image37.webp'],                                                                                    // Residential Exterior 5
  46: ['/portfolio/image66.webp'],                                                                                    // Residential Exterior 6
  47: ['/portfolio/image67.webp'],                                                                                    // Residential Exterior 7
  48: ['/portfolio/image68.webp'],                                                                                    // Residential Exterior 8
};

// Build flat slide array from whitelisted single-shot images only
function buildSlides(): HeroSlide[] {
  const slides: HeroSlide[] = [];
  projects.forEach((p) => {
    const whitelist = SINGLE_SHOT_WHITELIST[p.id];
    if (!whitelist) return; // skip projects not in whitelist (incl. Boutique, Confidential)
    whitelist.forEach((img) => {
      if (!p.images.includes(img)) return; // safety: image must exist in project
      slides.push({
        image: img,
        projectId: p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        award: p.award,
        description: p.description,
        role: p.role,
      });
    });
  });
  return slides;
}

// Shuffle that prevents consecutive slides from the same project
/** Simple seeded PRNG (mulberry32) — deterministic across server & client */
function seededRandom(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SHUFFLE_SEED = 42; // Fixed seed for deterministic shuffle

function nonConsecutiveShuffle<T extends { projectId: number }>(arr: T[]): T[] {
  const rand = seededRandom(SHUFFLE_SEED);
  const result: T[] = [];
  const remaining = [...arr];

  // Group by project
  const byProject = new Map<number, T[]>();
  remaining.forEach((item) => {
    const list = byProject.get(item.projectId) || [];
    list.push(item);
    byProject.set(item.projectId, list);
  });

  let lastProjectId = -1;
  let attempts = 0;
  const maxAttempts = remaining.length * 3;

  while (remaining.length > 0 && attempts < maxAttempts) {
    attempts++;
    // Collect all project IDs that have items remaining and aren't the last shown
    const available = new Map<number, T[]>();
    byProject.forEach((items, pid) => {
      if (items.length > 0 && pid !== lastProjectId) {
        available.set(pid, items);
      }
    });

    // If all remaining are from the same project, just pick one (edge case)
    if (available.size === 0) {
      for (const [pid, items] of byProject) {
        if (items.length > 0) {
          const item = items.shift()!;
          result.push(item);
          lastProjectId = pid;
          const idx = remaining.indexOf(item);
          if (idx !== -1) remaining.splice(idx, 1);
          break;
        }
      }
      continue;
    }

    // Pick a random project from available ones (using seeded random)
    const pids = [...available.keys()];
    const chosenPid = pids[Math.floor(rand() * pids.length)];
    const items = byProject.get(chosenPid)!;
    const item = items.shift()!;
    result.push(item);
    lastProjectId = chosenPid;
    const idx = remaining.indexOf(item);
    if (idx !== -1) remaining.splice(idx, 1);
  }

  // If any remaining (shouldn't happen), append them
  remaining.forEach((item) => result.push(item));

  return result;
}

const ALL_SLIDES = buildSlides();
// Always start with Oasis Skywalk (id:1), then shuffle the rest
const OASIS_SLIDES = ALL_SLIDES.filter((s) => s.projectId === 1);
const OTHER_SLIDES = nonConsecutiveShuffle(ALL_SLIDES.filter((s) => s.projectId !== 1));
const SHUFFLED_SLIDES = [...OASIS_SLIDES, ...OTHER_SLIDES];

// Ken Burns directions — slow zoom/pan applied while each image is displayed
const KEN_BURNS = [
  { scale: 1.08, x: -1.5, y: -1 },
  { scale: 1.12, x: 1, y: 0.5 },
  { scale: 1.06, x: 0.5, y: -1.5 },
  { scale: 1.1, x: -0.8, y: 0.8 },
  { scale: 1.14, x: 1.2, y: -0.5 },
  { scale: 1.07, x: -1, y: 1 },
  { scale: 1.11, x: 0, y: -1.2 },
  { scale: 1.09, x: -0.5, y: -0.8 },
];

const SLIDE_INTERVAL = 8000;       // 8s per slide


export default function HeroSection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataBoxRef = useRef<HTMLDivElement>(null);

  // Dynamic stats from data
  const heroStats = useMemo(() => {
    const cities = new Set(mapLocations.map((l) => l.city));
    const countries = new Set(mapLocations.map((l) => l.country));
    return [
      { value: aboutData.stats.find((s) => s.label.includes('Years'))?.value || '20', label: 'Years' },
      { value: aboutData.stats.find((s) => s.label.includes('Projects'))?.value || '150+', label: 'Projects' },
      { value: String(countries.size), label: 'Countries' },
      { value: String(cities.size), label: 'Cities' },
    ];
  }, []);

  // Single state object for all slideshow state
  const [state, setState] = useState({
    activeIdx: 0,
    mounted: false,
    paused: false,
    kenBurns: KEN_BURNS[0],
    slides: SHUFFLED_SLIDES as HeroSlide[],
    blinking: false, // data box blink animation (hover)
    clickBlink: false, // one-shot blink (click)
    dataBoxHovered: false, // mouse is directly over the data box
  });
  const slidesRef = useRef<HeroSlide[]>(SHUFFLED_SLIDES);

  // Navigate to project in Projects section
  const goToProject = useCallback((slide: HeroSlide) => {
    window.dispatchEvent(new CustomEvent('filter-projects', { detail: slide.category }));
    router.push(`/projects?category=${encodeURIComponent(slide.category)}`);
  }, [router]);

  // Advance to next slide
  const advance = useCallback(() => {
    const total = slidesRef.current.length;
    const next = (idxRef.current + 1) % total;
    idxRef.current = next;
    setState((s) => ({
      ...s,
      activeIdx: next,
      kenBurns: KEN_BURNS[next % KEN_BURNS.length],
    }));
  }, []);

  const startSlideshow = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, SLIDE_INTERVAL);
  }, [advance]);

  // Client mount — start slideshow with same deterministic order (no re-shuffle needed)
  useEffect(() => {
    slidesRef.current = SHUFFLED_SLIDES as HeroSlide[];
    idxRef.current = 0;
    setState({
      activeIdx: 0,
      mounted: true,
      paused: false,
      kenBurns: KEN_BURNS[0],
      slides: SHUFFLED_SLIDES as HeroSlide[],
      blinking: false,
      clickBlink: false,
      dataBoxHovered: false,
    });
    startSlideshow();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (blinkRef.current) clearTimeout(blinkRef.current);
    };
  }, [startSlideshow]);

  // Hover on image area — pause slideshow, start blinking data box
  const handleMouseEnter = useCallback(() => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    if (blinkRef.current) clearTimeout(blinkRef.current);
    setState((s) => ({ ...s, paused: true, blinking: true }));
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Leave image area — resume slideshow, stop blinking
  const handleMouseLeave = useCallback(() => {
    pauseTimeoutRef.current = setTimeout(() => {
      if (blinkRef.current) clearTimeout(blinkRef.current);
      setState((s) => ({ ...s, paused: false, blinking: false, dataBoxHovered: false }));
      startSlideshow();
    }, 1200);
  }, [startSlideshow]);

  // Hover on data box — stop blinking, keep solid, reveal image
  const handleDataBoxEnter = useCallback(() => {
    if (blinkRef.current) clearTimeout(blinkRef.current);
    setState((s) => ({ ...s, blinking: false, dataBoxHovered: true }));
  }, []);

  // Leave data box — restore dim overlay
  const handleDataBoxLeave = useCallback(() => {
    setState((s) => ({ ...s, dataBoxHovered: false }));
  }, []);

  const { activeIdx, paused, kenBurns, slides, mounted, blinking, clickBlink, dataBoxHovered } = state;

  const total = slides.length;
  const current = slides[activeIdx];

  // Click on image area → one-shot blink the data box
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    // Don't blink if the click was on the data box itself
    if ((e.target as HTMLElement).closest('[data-hero-databox]')) return;
    if (blinkRef.current) clearTimeout(blinkRef.current);
    setState((s) => ({ ...s, clickBlink: true }));
    blinkRef.current = setTimeout(() => {
      setState((s) => ({ ...s, clickBlink: false }));
    }, 2000);
  }, []);

  // Click on data box → open project detail dialog directly
  const handleDataBoxClick = useCallback(() => {
    if (current) {
      window.dispatchEvent(new CustomEvent('open-project-detail', { detail: current.projectId }));
    }
  }, [current]);

  return (
    <section
      id="home"
      ref={ref}
      className="hero-dark-context relative flex h-screen flex-col overflow-hidden bg-[var(--bg-primary)]"
    >
      <div className="flex flex-1 flex-col">

        {/* ===== TOP BAR — Minimal brand line ===== */}
        <div className="flex flex-shrink-0 items-center justify-center px-6 pt-5" style={{ flex: '0.5 0 0' }}>
          <div
            className="flex items-center gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <div className="h-[1px] w-8 sm:w-12" style={{ backgroundColor: 'rgba(201,169,110,0.3)' }} />
            <span className="font-[family-name:var(--font-playfair)] text-xs font-light tracking-[0.35em] uppercase text-white/40 sm:text-sm">
              {'Architecture & Engineering'}
            </span>
            <div className="h-[1px] w-8 sm:w-12" style={{ backgroundColor: 'rgba(201,169,110,0.3)' }} />
          </div>
        </div>

        {/* ===== MAIN — Full-width cinematic photo show ===== */}
        <div
          className="hero-showcase relative w-full flex-1 overflow-hidden cursor-pointer"
          style={{ minHeight: 0 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleImageClick}
        >
          {/* Crossfade: all containers in DOM, CSS transitions handle opacity */}
          {mounted && slides.map((slide, i) => (
            <div
              key={`hs-${mounted ? 'c' : 's'}-${i}`}
              className="hero-slide-img absolute inset-0"
              style={{
                opacity: i === activeIdx ? 1 : 0,
                transition: 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s ease',
                zIndex: i === activeIdx ? 1 : 0,
                filter: paused ? 'grayscale(0%) contrast(1) brightness(1)' : 'grayscale(100%) contrast(1.08) brightness(0.9)',
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                decoding="async"
                loading={Math.abs(i - activeIdx) <= 2 || Math.abs(i - activeIdx) >= slides.length - 2 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover"
                style={{
                  transform: i === activeIdx
                    ? `scale(${kenBurns.scale}) translate(${kenBurns.x}%, ${kenBurns.y}%)`
                    : 'scale(1.05) translate(0, 0)',
                  transition: 'transform 12s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              />
            </div>
          ))}

          {/* Dark gradient overlays for text readability */}
          <div className="pointer-events-none absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 35%, transparent 65%, rgba(10,10,10,0.5) 100%)',
          }} />
          <div className="pointer-events-none absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.4) 100%)',
          }} />

          {/* Dim overlay — 50% image transparency during display, removed when hovering data box */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.5)',
              opacity: dataBoxHovered ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* ===== LEFT SIDE — Name & Title (ALWAYS visible) ===== */}
          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 10 }}>
            <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
              <div
                className="max-w-xl"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-40px)',
                  transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                }}
              >
                <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Ahmed Essam
                </h1>
                <div className="mt-3 h-[2px] w-full" style={{ backgroundColor: GOLD }} />
                <p className="mt-3 text-sm font-light tracking-[0.15em] text-white/50 sm:text-base md:text-lg">
                  {'Project Manager — Design & Development Management'}
                </p>
              </div>
            </div>
          </div>

          {/* ===== TOP RIGHT — Project Data (synchronized with image) ===== */}
          <div
            ref={dataBoxRef}
            className="absolute inset-0 flex items-start justify-end pt-6 sm:pt-8 pointer-events-none"
            style={{
              zIndex: 12,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="mr-4 sm:mr-10 md:mr-16 lg:mr-20 max-w-[180px] sm:max-w-[240px] md:max-w-[280px] pointer-events-auto">
              <button
                data-hero-databox="true"
                onClick={(e) => { e.stopPropagation(); handleDataBoxClick(); }}
                onMouseEnter={handleDataBoxEnter}
                onMouseLeave={handleDataBoxLeave}
                className={`group w-full text-left rounded-lg border bg-black/15 p-2.5 backdrop-blur-md sm:p-3 md:p-4 transition-all duration-500 cursor-pointer hover:bg-black/50 ${blinking ? 'data-box-blink' : ''} ${clickBlink ? 'data-box-blink-once' : ''}`}
                style={{
                  borderColor: paused ? 'rgba(201,169,110,0.5)' : 'var(--c-border-subtle)',
                }}
              >
                {/* Project number + category */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-1.5 w-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: paused ? GOLD  : 'var(--c-text-ghost)' }} />
                  <span className="text-[8px] sm:text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-500" style={{ color: paused ? GOLD  : 'var(--c-text-faint)' }}>
                    {current?.category || ''}
                  </span>
                </div>

                {/* Project title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-xs font-semibold leading-tight transition-colors duration-500 sm:text-sm md:text-base" style={{ color: paused ? 'var(--c-text-primary)' : 'var(--c-text-secondary)' }}>
                  {current?.title || ''}
                </h3>

                {/* Location & Year */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] sm:text-[10px] transition-colors duration-500" style={{ color: paused ? 'var(--c-text-muted)' : 'var(--c-text-ghost)' }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} style={{ color: paused ? GOLD  : 'var(--c-text-ghost)', transition: 'color 0.5s' }} />
                    {current?.location || ''}
                  </span>
                  {current?.year && (
                    <>
                      <span className="text-white/25">•</span>
                      <span>{current.year}</span>
                    </>
                  )}
                </div>

                {/* Award badge */}
                {current?.award && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-all duration-500" style={{ backgroundColor: paused ? 'rgba(201,169,110,0.1)' : 'var(--c-text-micro)', border: `1px solid ${paused ? 'rgba(201,169,110,0.18)' : 'var(--c-text-micro)'}` }}>
                    <Trophy size={10} style={{ color: paused ? GOLD  : 'var(--c-text-ghost)', transition: 'color 0.5s' }} />
                    <span className="text-[9px] font-medium tracking-wider transition-colors duration-500" style={{ color: paused ? GOLD  : 'var(--c-text-ghost)' }}>{current.award}</span>
                  </div>
                )}

                {/* View Project CTA — only on hover/pause */}
                <div className="flex items-center gap-1.5 overflow-hidden transition-all duration-400"
                  style={{ maxHeight: paused ? '28px' : '0px', opacity: paused ? 1 : 0, marginTop: paused ? '10px' : '0px' }}>
                  <span className="text-[10px] font-medium tracking-wider" style={{ color: GOLD }}>
                    {'View Project'}
                  </span>
                  <ChevronRight size={12} style={{ color: GOLD }} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* Hover hint — bottom right */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 sm:bottom-6 sm:right-10 md:right-16 pointer-events-none transition-opacity duration-700" style={{ zIndex: 10, opacity: paused ? 0 : 0.6 }}>
            <span className="text-xs sm:text-sm tracking-[0.15em] text-white/50">{'Hover to pause'}</span>
            <span className="text-xs sm:text-sm text-white/25">·</span>
            <span className="text-xs sm:text-sm tracking-[0.15em] text-white/50">{'Click for details'}</span>
          </div>

          {/* Thin gold borders */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px]" style={{ background: 'rgba(201,169,110,0.15)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px]" style={{ background: 'rgba(201,169,110,0.15)' }} />
        </div>

        {/* ===== BOTTOM BAR — Stats & Scroll ===== */}
        <div className="flex flex-shrink-0 flex-col items-center justify-center px-6 pb-8 sm:pb-10" style={{ flex: '0 0 auto' }}>
          <div className="mb-5 flex items-center gap-6 sm:gap-10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-playfair)] text-base font-bold sm:text-lg md:text-xl" style={{ color: GOLD }}>{stat.value}</span>
                <span className="mt-0.5 text-[8px] tracking-[0.25em] uppercase text-white/30 sm:text-[9px]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="flex items-center gap-1"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease 2s',
            }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">{'Explore'}</span>
            <ArrowDown size={12} color={GOLD} />
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// About Section
// =============================================================================

