'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Building2, ChevronRight, ExternalLink, Trophy, Star, Globe, ZoomIn, MapPin, FileDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { projects, type Project } from '@/lib/portfolio-data';
import { GOLD, GOLD_LIGHT } from '@/components/shared/constants';
import Image from 'next/image';
import { Maximize2, Lock, ChevronLeft } from 'lucide-react';

export default function ProjectDetailDialog({ project, open, onOpenChange, onOpenLightbox }: { project: Project | null; open: boolean; onOpenChange: (v: boolean) => void; onOpenLightbox?: (images: string[], index: number) => void }) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-white/10 bg-[var(--bg-primary)] sm:max-w-4xl rounded-lg p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-playfair)] text-2xl text-white">
            {project.title}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2 pt-2">
            <Badge
              className="border-[#C9A96E]66 bg-[#C9A96E]15 text-[#C9A96E]"
            >
              {project.category}
            </Badge>
            <span className="text-xs text-white/50">{project.year}</span>
            <span className="text-xs text-white/30">•</span>
            <span className="text-xs text-white/50">{project.location}</span>
            {project.budget && (
              <>
                <span className="text-xs text-white/30">•</span>
                <span className="text-xs font-medium" style={{ color: GOLD }}>{project.budget}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Image gallery — clickable to enlarge */}
        {project.images.length > 0 ? (
          <>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className="group/img relative aspect-[16/10] cursor-zoom-in overflow-hidden border border-white/5 transition-colors duration-300 hover:border-[#C9A96E]44"
                  onClick={(e) => { e.stopPropagation(); onOpenLightbox?.(project.images, i); }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Zoom overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/img:bg-black/30">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100">
                      <Maximize2 size={14} color="white" />
                      <span className="text-xs text-white">{'Enlarge'}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-[10px] tracking-wider text-white/30">{'Click any image to enlarge'}</p>
          </>
        ) : (
          <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-white/10 p-8" style={{ backgroundColor: 'var(--c-surface-dark)' }}>
            <div className="text-center">
              <Lock size={24} className="mx-auto mb-2 text-white/20" />
              <p className="text-xs tracking-wider text-white/30">{'CONFIDENTIAL — Images not available'}</p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>
            {'Description'}
          </h4>
          <p className="text-sm leading-relaxed text-white/70">{project.description}</p>
        </div>

        {/* Role & Scope */}
        <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: GOLD_LIGHT }}>
          <h4 className="mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>
            {'Role & Scope'}
          </h4>
          <p className="text-sm leading-relaxed text-white/70">{project.role}</p>
        </div>

        {/* Client */}
        <div className="mt-4 flex items-center gap-2">
          <Building2 size={14} style={{ color: GOLD }} />
          <span className="text-xs text-white/50">{'Client:'}</span>
          <span className="text-xs text-white/80">{project.client}</span>
        </div>

        {/* Website & Portfolio Links */}
        {(project.websiteLink || project.portfolioLink) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.websiteLink && (
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs transition-all duration-300 hover:border-[#C9A96E]44 hover:bg-[#C9A96E]08"
                style={{ color: 'var(--c-text-secondary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={13} style={{ color: GOLD }} />
                {'Visit Website'}
                <ExternalLink size={10} style={{ color: GOLD }} />
              </a>
            )}
            {project.portfolioLink && (
              <a
                href={project.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex items-center gap-2.5 rounded-xl border border-[#C9A96E]44 px-5 py-3 text-sm font-medium tracking-wide transition-all duration-500 hover:border-[#C9A96E]88 hover:shadow-[0_0_30px_rgba(201,169,110,0.15)] overflow-hidden"
                style={{ color: GOLD }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C9A96E]/10 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
                {/* Play icon circle */}
                <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#C9A96E]55 bg-[#C9A96E]10 transition-all duration-300 group-hover/cta:bg-[#C9A96E]20 group-hover/cta:border-[#C9A96E]88 group-hover/cta:scale-110">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: GOLD, marginLeft: '1px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="relative">{project.portfolioLinkLabel || 'View Portfolio'}</span>
                <ExternalLink size={12} className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </a>
            )}
          </div>
        )}

        {project.award && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#C9A96E]33 p-3">
            <Trophy size={16} style={{ color: GOLD }} />
            <span className="text-xs font-medium" style={{ color: GOLD }}>{project.award}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Projects Section
// =============================================================================

