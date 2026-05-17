// =============================================================================
// Shared Types — Portfolio
// =============================================================================

export interface SearchResultItem {
  type: 'project' | 'experience' | 'award' | 'competency' | 'partner' | 'location' | 'section';
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  sectionRoute: string; // Route path to navigate to
  image?: string;
  extra?: Record<string, string>;
}

export interface HeroSlide {
  image: string;
  projectId: number;
  title: string;
  category: string;
  location: string;
  year: string;
  award?: string;
  description: string;
  role: string;
}
