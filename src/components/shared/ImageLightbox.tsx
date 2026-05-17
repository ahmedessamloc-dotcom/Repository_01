'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { GOLD } from '@/components/shared/constants';

export default function ImageLightbox({ images, startIndex, open, onClose }: { images: string[]; startIndex: number; open: boolean; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [prevOpen, setPrevOpen] = useState(open);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const pinchRef = useRef({ dist: 0, scale: 1 });
  const panRef = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });
  const lastTapRef = useRef(0);
  const swipeRef = useRef<{ start: number | null; end: number | null }>({ start: null, end: null });

  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    if (open !== prevOpen) {
      setPrevOpen(open);
      if (open) {
        setCurrentIndex(startIndex);
        setScale(1); setPos({ x: 0, y: 0 });
        scaleRef.current = 1; posRef.current = { x: 0, y: 0 };
        lastTapRef.current = 0;
      }
    }
  }, [open]);

  useEffect(() => {
    setScale(1); setPos({ x: 0, y: 0 });
    scaleRef.current = 1; posRef.current = { x: 0, y: 0 };
    lastTapRef.current = 0;
  }, [currentIndex]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [open]);

  const goPrev = useCallback(() => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const goNext = useCallback(() => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose, goPrev, goNext]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  useEffect(() => {
    if (!open && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, [open]);

  const resetZoom = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.5, 5)), []);
  const zoomOut = useCallback(() => {
    setScale((s) => { const ns = Math.max(s - 0.5, 1); if (ns <= 1) setPos({ x: 0, y: 0 }); return ns; });
  }, []);
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const el = imgWrapperRef.current;
    if (!el || !open) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = e.deltaY > 0 ? -0.25 : 0.25;
      setScale((s) => { const ns = Math.min(Math.max(s + d, 1), 5); if (ns <= 1) setPos({ x: 0, y: 0 }); return ns; });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = { dist: Math.hypot(dx, dy), scale: scaleRef.current };
      } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          lastTapRef.current = 0;
          if (scaleRef.current > 1) { setScale(1); setPos({ x: 0, y: 0 }); } else setScale(2.5);
          e.preventDefault(); return;
        }
        lastTapRef.current = now;
        if (scaleRef.current > 1) {
          panRef.current = { active: true, sx: e.touches[0].clientX, sy: e.touches[0].clientY, px: posRef.current.x, py: posRef.current.y };
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ns = Math.min(Math.max(pinchRef.current.scale * (dist / pinchRef.current.dist), 1), 5);
        setScale(ns); if (ns <= 1) setPos({ x: 0, y: 0 });
      } else if (e.touches.length === 1 && panRef.current.active) {
        e.preventDefault();
        setPos({ x: panRef.current.px + e.touches[0].clientX - panRef.current.sx, y: panRef.current.py + e.touches[0].clientY - panRef.current.sy });
      }
    };

    const onTouchEnd = () => { panRef.current.active = false; };
    const onDblClick = () => { if (scaleRef.current > 1) { setScale(1); setPos({ x: 0, y: 0 }); } else setScale(2.5); };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('dblclick', onDblClick);
    return () => { el.removeEventListener('wheel', onWheel); el.removeEventListener('touchstart', onTouchStart); el.removeEventListener('touchmove', onTouchMove); el.removeEventListener('touchend', onTouchEnd); el.removeEventListener('dblclick', onDblClick); };
  }, [open, currentIndex]);

  const handleOuterTouchStart = useCallback((e: React.TouchEvent) => { if (scaleRef.current > 1) return; swipeRef.current.start = e.changedTouches[0].screenX; }, []);
  const handleOuterTouchMove = useCallback((e: React.TouchEvent) => { if (scaleRef.current > 1) return; swipeRef.current.end = e.changedTouches[0].screenX; }, []);
  const handleOuterTouchEnd = useCallback(() => {
    if (scaleRef.current > 1) { swipeRef.current = { start: null, end: null }; return; }
    const { start, end } = swipeRef.current; if (start == null || end == null) return;
    const diff = start - end; if (diff > 50) goNext(); else if (diff < -50) goPrev();
    swipeRef.current = { start: null, end: null };
  }, [goPrev, goNext]);

  if (!open || images.length === 0) return null;
  const isZoomed = scale > 1.01;

  const lightboxContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 flex items-center justify-center lightbox-context select-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999 }}
          onClick={() => { if (scaleRef.current <= 1.01) onClose(); }}
          onTouchStart={handleOuterTouchStart}
          onTouchMove={handleOuterTouchMove}
          onTouchEnd={handleOuterTouchEnd}
        >
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-sm transition-colors hover:bg-white/10 cursor-pointer" style={{ zIndex: 100000 }} aria-label="Close lightbox">
            <X size={22} color="white" />
          </button>

          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-sm">
            <ZoomIn size={14} style={{ color: GOLD }} />
            <span className="text-sm text-white/70"><span style={{ color: GOLD }}>{currentIndex + 1}</span> / {images.length}</span>
          </div>

          <div className="absolute top-4 right-20 z-20 flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); zoomOut(); }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-sm cursor-pointer" aria-label="Zoom out"><ZoomOut size={16} /></button>
            {isZoomed && <button onClick={(e) => { e.stopPropagation(); resetZoom(); }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-sm cursor-pointer" aria-label="Reset zoom"><RotateCcw size={14} /></button>}
            <button onClick={(e) => { e.stopPropagation(); zoomIn(); }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-sm cursor-pointer" aria-label="Zoom in"><ZoomIn size={16} /></button>
            <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-sm cursor-pointer" aria-label="Fullscreen">{isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button>
          </div>

          {!isZoomed && <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-2 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-sm transition-colors hover:bg-white/10 md:left-6 cursor-pointer" style={{ zIndex: 100000 }} aria-label="Previous image"><ChevronLeft size={28} color="white" /></button>}

          <div
            ref={imgWrapperRef}
            key={currentIndex}
            className="relative overflow-hidden rounded-lg"
            style={{ width: isFullscreen ? '100vw' : '85vw', height: isFullscreen ? '100vh' : '80vh', maxWidth: isFullscreen ? '100vw' : '1200px', zIndex: 99999, touchAction: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} decoding="async" draggable={false} className="w-full h-full object-contain pointer-events-none" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transformOrigin: 'center center' }} />
          </div>

          {!isZoomed && <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-2 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-sm transition-colors hover:bg-white/10 md:right-6 cursor-pointer" style={{ zIndex: 100000 }} aria-label="Next image"><ChevronRight size={28} color="white" /></button>}

          {images.length > 1 && !isZoomed && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-sm md:bottom-6" style={{ maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 cursor-pointer" style={{ borderColor: i === currentIndex ? GOLD : 'transparent', opacity: i === currentIndex ? 1 : 0.5 }}>
                  <img src={img} alt={`Thumbnail ${i + 1}`} decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window !== 'undefined') return createPortal(lightboxContent, document.body);
  return lightboxContent;
}
