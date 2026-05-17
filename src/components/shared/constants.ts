// =============================================================================
// Shared Constants — Portfolio
// =============================================================================

import {
  projects,
  awards,
  experiences,
  competencies,
  partners,
  mapLocations,
  projectCategories,
} from '@/lib/portfolio-data';

export const GOLD = '#C9A96E';
export const GOLD_LIGHT = 'rgba(201, 169, 110, 0.15)';
export const DARK_BG = '#0A0A0A';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Map', href: '/map' },
  { label: 'Experience', href: '/experience' },
  { label: 'Awards', href: '/awards' },
  { label: 'Competencies', href: '/competencies' },
  { label: 'Network', href: '/network' },
  { label: 'Download', href: '/download' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SITE_URL = 'https://ahmed-essam-profile.vercel.app';
export const SHARE_TITLE = 'Ahmed Essam — Architecture & Development Portfolio';
export const SHARE_TEXT = 'Explore the portfolio of Ahmed Essam — Project Manager — Design & Development Management. 20 years, 150+ projects across 6+ countries.';
export const ENCODED_SITE_URL = encodeURIComponent(SITE_URL);
export const ENCODED_SHARE_TEXT = encodeURIComponent(SHARE_TEXT);
export const ENCODED_SHARE_TITLE = encodeURIComponent(SHARE_TITLE);

export const globalSearchHints = (() => {
  const words = new Set<string>();
  const prioritized: string[] = [];
  const add = (w: string) => { if (w && !words.has(w) && w.length >= 3 && w.length <= 25) { words.add(w); prioritized.push(w); } };
  const cats = projectCategories;
  const locs = [...new Set(mapLocations.map((l) => l.country).filter(Boolean))];
  const cities = [...new Set(projects.flatMap((p) => p.location.split(',').map((s) => s.trim()).filter((s) => s.length > 2 && s.length <= 18)))];
  const exps = [...new Set(experiences.map((e) => e.company).filter(Boolean))];
  const skills = competencies.flatMap((c) => c.items).filter((i) => i.length <= 25);
  const awProjs = [...new Set(awards.map((a) => a.project).filter(Boolean))];
  let i = 0;
  while (prioritized.length < 12 && i < 20) {
    if (i < cats.length) add(cats[i]);
    if (i < locs.length) add(locs[i]);
    if (i < cities.length) add(cities[i]);
    if (i < exps.length) add(exps[i]);
    if (i < skills.length) add(skills[i]);
    if (i < awProjs.length) add(awProjs[i]);
    i++;
  }
  return prioritized.slice(0, 12);
})();

// Animation Variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};
