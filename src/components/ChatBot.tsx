"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Send,
  User,
  Loader2,
  Trash2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Download,
  Globe,
  FileText,
  ListChecks,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const BOT_AVATAR = "/ahmed-connect.webp";

const DOWNLOAD_CV_URL =
  "https://drive.google.com/uc?export=download&id=1gWqKYc0i9tVAoSJgN7PKoi1WLUGibiCP";
const DOWNLOAD_PORTFOLIO_URL =
  "https://drive.google.com/uc?export=download&id=16WWk7Lw-SY-wELQTL2-l_dw_dVuXlExz";
const DOWNLOAD_PROJECTS_URL =
  "https://drive.google.com/uc?export=download&id=164SZ9PbrOARqV8fpkCoVCWiWfjljVOVf";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ParsedSegment {
  type: "text" | "image";
  content: string;
  alt?: string;
}

const WELCOME_MESSAGE_EN = `I'm pleased you're here! I can help you explore **Ahmed Essam's** portfolio — **48 projects**, **20+ years** of experience, and **6 awards** across 6 countries. Try the suggestions below or ask me anything!`;

const WELCOME_MESSAGE_AR = `يسعدني وجودك هنا! يمكنني مساعدتك في استكشاف محفظة **أحمد عصام** — **48 مشروعاً**، و**أكثر من 20 عاماً** من الخبرة، و**6 جوائز** عبر 6 دول. جرب الاقتراحات أدناه أو اسألني أي شيء!`;

// =============================================================================
// Parse message content into text + image segments
// =============================================================================

function parseMessageContent(content: string): ParsedSegment[] {
  const segments: ParsedSegment[] = [];
  // Match ![alt](src) patterns — including paths with spaces
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    // Text before the image
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    segments.push({
      type: "image",
      content: match[2].trim(),
      alt: match[1].trim() || "Project image",
    });
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last image
  if (lastIndex < content.length) {
    segments.push({ type: "text", content: content.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "text", content }];
}

// =============================================================================
// Floating AI Chatbot Widget — Portfolio Assistant
// =============================================================================

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [showHiBubble, setShowHiBubble] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const hiIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check voice support on mount + theme hydration
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      setVoiceSupported(!!SpeechRecognition);
      setTtsSupported(!!window.speechSynthesis);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          role: "assistant",
          content: isArabic ? WELCOME_MESSAGE_AR : WELCOME_MESSAGE_EN,
        },
      ]);
    }
  }, [isOpen, hasOpened]);

  // -------------------------------------------------------------------------
  // Lightbox navigation
  // -------------------------------------------------------------------------
  const openLightbox = useCallback(
    (images: { src: string; alt: string }[], startIndex: number) => {
      setLightboxImages(images);
      setLightboxIndex(startIndex);
      setLightboxOpen(true);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setLightboxIndex(0);
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
  }, [lightboxImages.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
  }, [lightboxImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);

  // -----------------------------------------------------------------
  // Zoom & Pan state for chatbot lightbox
  // -----------------------------------------------------------------
  const [chatScale, setChatScale] = useState(1);
  const [chatPos, setChatPos] = useState({ x: 0, y: 0 });
  const [chatFs, setChatFs] = useState(false);
  const chatImgRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatScaleRef = useRef(1);
  const chatPosRef = useRef({ x: 0, y: 0 });
  const chatPinchRef = useRef({ dist: 0, scale: 1 });
  const chatPanRef = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });
  const chatLastTapRef = useRef(0);

  useEffect(() => { chatScaleRef.current = chatScale; }, [chatScale]);
  useEffect(() => { chatPosRef.current = chatPos; }, [chatPos]);

  useEffect(() => {
    setChatScale(1); setChatPos({ x: 0, y: 0 });
    chatScaleRef.current = 1; chatPosRef.current = { x: 0, y: 0 };
    chatLastTapRef.current = 0;
  }, [lightboxIndex, lightboxOpen]);

  useEffect(() => {
    const h = () => setChatFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  useEffect(() => {
    if (!lightboxOpen && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, [lightboxOpen]);

  const chatResetZoom = useCallback(() => { setChatScale(1); setChatPos({ x: 0, y: 0 }); }, []);
  const chatZoomIn = useCallback(() => setChatScale((s) => Math.min(s + 0.5, 5)), []);
  const chatZoomOut = useCallback(() => {
    setChatScale((s) => { const ns = Math.max(s - 0.5, 1); if (ns <= 1) setChatPos({ x: 0, y: 0 }); return ns; });
  }, []);
  const chatToggleFs = useCallback(() => {
    if (!chatContainerRef.current) return;
    if (!document.fullscreenElement) chatContainerRef.current.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const el = chatImgRef.current;
    if (!el || !lightboxOpen) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = e.deltaY > 0 ? -0.25 : 0.25;
      setChatScale((s) => { const ns = Math.min(Math.max(s + d, 1), 5); if (ns <= 1) setChatPos({ x: 0, y: 0 }); return ns; });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        chatPinchRef.current = { dist: Math.hypot(dx, dy), scale: chatScaleRef.current };
      } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - chatLastTapRef.current < 300) {
          chatLastTapRef.current = 0;
          if (chatScaleRef.current > 1) { setChatScale(1); setChatPos({ x: 0, y: 0 }); } else setChatScale(2.5);
          e.preventDefault(); return;
        }
        chatLastTapRef.current = now;
        if (chatScaleRef.current > 1) {
          chatPanRef.current = { active: true, sx: e.touches[0].clientX, sy: e.touches[0].clientY, px: chatPosRef.current.x, py: chatPosRef.current.y };
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ns = Math.min(Math.max(chatPinchRef.current.scale * (dist / chatPinchRef.current.dist), 1), 5);
        setChatScale(ns); if (ns <= 1) setChatPos({ x: 0, y: 0 });
      } else if (e.touches.length === 1 && chatPanRef.current.active) {
        e.preventDefault();
        setChatPos({ x: chatPanRef.current.px + e.touches[0].clientX - chatPanRef.current.sx, y: chatPanRef.current.py + e.touches[0].clientY - chatPanRef.current.sy });
      }
    };

    const onTouchEnd = () => { chatPanRef.current.active = false; };
    const onDblClick = () => { if (chatScaleRef.current > 1) { setChatScale(1); setChatPos({ x: 0, y: 0 }); } else setChatScale(2.5); };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('dblclick', onDblClick);
    return () => { el.removeEventListener('wheel', onWheel); el.removeEventListener('touchstart', onTouchStart); el.removeEventListener('touchmove', onTouchMove); el.removeEventListener('touchend', onTouchEnd); el.removeEventListener('dblclick', onDblClick); };
  }, [lightboxOpen, lightboxIndex]);

  // -----------------------------------------------------------------
  // Send message to API
  // -------------------------------------------------------------------------
  const sendMessage = async (text?: string, retryCount = 0) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const MAX_RETRIES = 2;
    const RETRY_DELAY = 1500;

    try {
      // Add frontend timeout (30s) — abort if server takes too long
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          language: isArabic ? "arabic" : "english",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        // Server returned error — retry if under limit
        if (retryCount < MAX_RETRIES) {
          setIsLoading(false);
          setTimeout(() => {
            // Remove the user message we just added, and re-send
            setMessages((prev) => {
              const filtered = prev.filter((_, i) => i < prev.length - 1);
              return filtered;
            });
            // Re-add and retry
            setTimeout(() => {
              setMessages(updatedMessages);
              setIsLoading(true);
              sendMessageInternal(updatedMessages, retryCount + 1);
            }, 50);
          }, RETRY_DELAY);
          return;
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isArabic
              ? "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى."
              : "Sorry, I encountered an issue. Please try again.",
          },
        ]);
      }
    } catch (err: unknown) {
      // Handle abort (timeout) or network error — retry if under limit
      const isTimeout = err instanceof Error && err.name === "AbortError";
      if (retryCount < MAX_RETRIES) {
        setIsLoading(false);
        setTimeout(() => {
          setMessages(updatedMessages);
          setIsLoading(true);
          sendMessageInternal(updatedMessages, retryCount + 1);
        }, RETRY_DELAY);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isArabic
            ? isTimeout
              ? "انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى."
              : "خطأ في الاتصال. يرجى التحقق من الشبكة والمحاولة مرة أخرى."
            : isTimeout
              ? "Response timed out. Please try again."
              : "Connection error. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Internal send — uses existing messages array (for retries)
  const sendMessageInternal = async (
    msgs: Message[],
    retryCount: number
  ) => {
    const MAX_RETRIES = 2;
    const RETRY_DELAY = 1500;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: msgs,
          language: isArabic ? "arabic" : "english",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        if (retryCount < MAX_RETRIES) {
          setIsLoading(false);
          setTimeout(() => {
            setIsLoading(true);
            sendMessageInternal(msgs, retryCount + 1);
          }, RETRY_DELAY);
          return;
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isArabic
              ? "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى."
              : "Sorry, I encountered an issue. Please try again.",
          },
        ]);
      }
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      if (retryCount < MAX_RETRIES) {
        setIsLoading(false);
        setTimeout(() => {
          setIsLoading(true);
          sendMessageInternal(msgs, retryCount + 1);
        }, RETRY_DELAY);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isArabic
            ? isTimeout
              ? "انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى."
              : "خطأ في الاتصال. يرجى التحقق من الشبكة والمحاولة مرة أخرى."
            : isTimeout
              ? "Response timed out. Please try again."
              : "Connection error. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------------------
  // Voice input (Speech-to-Text)
  // -------------------------------------------------------------------------
  const startListening = useCallback(() => {
    if (!voiceSupported) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = isArabic ? "ar-SA" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [voiceSupported, isArabic]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // -------------------------------------------------------------------------
  // Text-to-Speech (read last assistant message)
  // -------------------------------------------------------------------------
  const speakLastMessage = useCallback(() => {
    if (!ttsSupported || isSpeaking) return;

    const lastAssistantMsg = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    if (!lastAssistantMsg) return;

    window.speechSynthesis.cancel();

    const cleanText = lastAssistantMsg.content
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // strip image markdown
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/### (.*?)(\n|$)/g, "$1. ")
      .replace(/## (.*?)(\n|$)/g, "$1. ")
      .replace(/^- (.*?)(\n|$)/gm, "$1. ")
      .replace(/\n/g, ". ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "")
      .replace(/&gt;/g, "")
      .replace(/&#8226;/g, "")
      .replace(/<br\s*\/?>/g, ". ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isArabic ? "ar-SA" : "en-US";
    utterance.rate = isArabic ? 0.95 : 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [ttsSupported, isSpeaking, messages, isArabic]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Stop speaking and listening when panel closes
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      // Clear hi bubble when chat opens
      setShowHiBubble(false);
    }
  }, [isOpen]);

  // -----------------------------------------------------------------
  // "Hi" notification bubble — show twice then permanently stop
  // -----------------------------------------------------------------
  useEffect(() => {
    if (isOpen) return;

    let showCount = 0;
    const MAX_SHOWS = 2;

    const showBubble = () => {
      if (showCount >= MAX_SHOWS) return;
      showCount++;
      setShowHiBubble(true);
      hiTimeoutRef.current = setTimeout(() => setShowHiBubble(false), 3000);
    };

    // First show after 10s, second after 20s, then stop
    const initialDelay = setTimeout(showBubble, 10000);
    hiIntervalRef.current = setInterval(showBubble, 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(hiIntervalRef.current!);
      clearTimeout(hiTimeoutRef.current!);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        role: "assistant",
        content: isArabic ? WELCOME_MESSAGE_AR : WELCOME_MESSAGE_EN,
      },
    ]);
  };

  const toggleLanguage = () => {
    const newArabic = !isArabic;
    setIsArabic(newArabic);
    if (messages.length <= 1 && messages[0]?.role === "assistant") {
      setMessages([
        {
          role: "assistant",
          content: newArabic ? WELCOME_MESSAGE_AR : WELCOME_MESSAGE_EN,
        },
      ]);
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  // -------------------------------------------------------------------------
  // Format text-only content (no images — images are rendered separately)
  // -------------------------------------------------------------------------
  const formatText = (text: string) => {
    // First remove image markdown so it doesn't render as text
    const clean = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
    return clean
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="chatbot-strong font-semibold">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /### (.*?)(\n|$)/g,
        '<div class="text-xs font-bold text-[#C9A96E] mt-3 mb-1 uppercase tracking-wider">$1</div>'
      )
      .replace(
        /## (.*?)(\n|$)/g,
        '<div class="text-sm font-bold text-[#C9A96E] mt-3 mb-1">$1</div>'
      )
      .replace(
        /^- (.*?)(\n|$)/gm,
        '<div class="flex gap-2 ml-1"><span class="text-[#C9A96E] mt-0.5">&#8226;</span><span>$1</span></div>'
      )
      .replace(/\n/g, "<br />");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
          isOpen
            ? "bg-[#1a1a1a] border border-[#C9A96E]/30 hover:bg-[#222]"
            : "bg-gradient-to-br from-[#C9A96E] to-[#a88a4e] hover:scale-110 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-[#C9A96E]" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Pulse ring when closed */}
      {!isOpen && (
        <span className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 animate-ping rounded-full bg-[#C9A96E]/20 pointer-events-none" />
      )}

      {/* "Hi" notification bubble — small, only "Hi" text */}
      {!isOpen && showHiBubble && (
        <div
          className="fixed bottom-6 right-[4.5rem] z-[9998] flex items-center"
          style={{
            animation: "slideUp 0.3s ease-out",
          }}
        >
          <div
            className="rounded-xl rounded-br-sm px-3 py-1.5 shadow-lg border cursor-pointer"
            style={{
              backgroundColor: "var(--chat-hi-bubble-bg)",
              borderColor: "var(--border-accent)",
            }}
            onClick={() => {
              setIsOpen(true);
              setShowHiBubble(false);
            }}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {isArabic ? "مرحباً! 👋 يمكنني مساعدتك؟" : "Hi! 👋 Can I help you?"}
            </p>
          </div>
          {/* Arrow pointing RIGHT toward the chat icon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-2.5 h-2.5 rotate-45"
            style={{
              backgroundColor: "var(--chat-hi-bubble-bg)",
              borderTop: "1px solid var(--border-accent)",
              borderRight: "1px solid var(--border-accent)",
            }}
          />
        </div>
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[9999] flex flex-col overflow-hidden rounded-2xl shadow-2xl border transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{
          width: "min(400px, calc(100vw - 3rem))",
          height: "min(580px, calc(100vh - 8rem))",
          backgroundColor: "var(--chat-panel-bg)",
          borderColor: "var(--border-accent)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{
            background: "var(--chat-header-bg)",
            borderColor: "var(--border-accent)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[#C9A96E]/40">
              <Image
                src={BOT_AVATAR}
                alt="Ahmed Essam"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Ahmed Essam
              </h3>
              <p className="text-[10px] text-white/40">
                {isArabic
                  ? "مساعد المحفظة المهنية — اسألني أي شيء"
                  : "Portfolio Assistant — Ask me anything"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              onClick={toggleLanguage}
              className="chatbot-icon-btn flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors cursor-pointer"
              title={isArabic ? "Switch to English" : "التبديل للعربية"}
            >
              <Languages className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowDownloads(!showDownloads)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                showDownloads
                  ? "text-[#C9A96E] bg-[#C9A96E]/10"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
              title={
                isArabic
                  ? "تنزيل السيرة الذاتية والمحفظة"
                  : "Download CV, Portfolio & Projects"
              }
            >
              <Download className="h-4 w-4" />
            </button>
            {messages.length > 1 && (
              <button
                onClick={clearChat}
                className="chatbot-icon-btn flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors cursor-pointer"
                title={isArabic ? "مسح المحادثة" : "Clear chat"}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-icon-btn flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Downloads Panel */}
        {showDownloads && (
          <div
            className="px-4 py-3 border-b shrink-0"
            style={{
              borderColor: "var(--border-accent)",
              background: "var(--chat-suggestion-bg)",
            }}
          >
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
              {isArabic ? "تنزيلات" : "Downloads"}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() =>
                  handleDownload(DOWNLOAD_CV_URL, "Ahmed_Essam_CV.pdf")
                }
                className="chatbot-download-btn flex flex-col items-center gap-1.5 rounded-lg border border-[#C9A96E]/20 px-2 py-2.5 text-[11px] text-white/70 hover:bg-[#C9A96E]/10 hover:text-white hover:border-[#C9A96E]/40 transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#C9A96E] shrink-0" />
                <span className="text-center leading-tight">
                  {isArabic ? "السيرة الذاتية" : "CV"}
                </span>
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    DOWNLOAD_PORTFOLIO_URL,
                    "Ahmed_Essam_Portfolio.pdf"
                  )
                }
                className="chatbot-download-btn flex flex-col items-center gap-1.5 rounded-lg border border-[#C9A96E]/20 px-2 py-2.5 text-[11px] text-white/70 hover:bg-[#C9A96E]/10 hover:text-white hover:border-[#C9A96E]/40 transition-all cursor-pointer"
              >
                <Globe className="h-4 w-4 text-[#C9A96E] shrink-0" />
                <span className="text-center leading-tight">
                  {isArabic ? "المحفظة" : "Portfolio"}
                </span>
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    DOWNLOAD_PROJECTS_URL,
                    "Ahmed_Essam_Projects_List.pdf"
                  )
                }
                className="chatbot-download-btn flex flex-col items-center gap-1.5 rounded-lg border border-[#C9A96E]/20 px-2 py-2.5 text-[11px] text-white/70 hover:bg-[#C9A96E]/10 hover:text-white hover:border-[#C9A96E]/40 transition-all cursor-pointer"
              >
                <ListChecks className="h-4 w-4 text-[#C9A96E] shrink-0" />
                <span className="text-center leading-tight">
                  {isArabic ? "قائمة المشاريع" : "Projects"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-chat"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--chat-scroll-thumb) transparent",
          }}
        >
          {messages.map((msg, i) => {
            const segments = parseMessageContent(msg.content);
            const msgImages = segments
              .filter((s) => s.type === "image")
              .map((s) => ({ src: s.content, alt: s.alt || "" }));
            const hasImages = msgImages.length > 0;
            const hasText = segments.some((s) => s.type === "text" && s.content.trim());

            return (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#C9A96E]/30 mt-0.5">
                      <Image
                        src={BOT_AVATAR}
                        alt="Ahmed Essam"
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "chatbot-user-msg bg-gradient-to-br from-[#C9A96E] to-[#a88a4e] text-white rounded-br-md"
                        : "chatbot-bot-msg bg-white/[0.04] text-white/80 rounded-bl-md border border-white/[0.04]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <>
                        {/* Render text content */}
                        {hasText && (
                          <div
                            className={`prose-sm chatbot-msg-content [&_strong]:text-white [&_strong]:font-semibold [&_div]:text-white/70 ${
                              isArabic ? "text-right" : ""
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: formatText(msg.content),
                            }}
                          />
                        )}

                        {/* Render image thumbnails */}
                        {hasImages && (
                          <div
                            className={`mt-2 flex gap-1.5 overflow-x-auto pb-1 ${
                              msgImages.length > 1
                                ? "flex-nowrap"
                                : "flex-wrap"
                            }`}
                            style={{
                              scrollbarWidth: "thin",
                              scrollbarColor:
                                "var(--chat-scroll-thumb) transparent",
                            }}
                          >
                            {msgImages.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() =>
                                  openLightbox(msgImages, imgIdx)
                                }
                                className="chatbot-img-thumb group/img relative shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-[#C9A96E]/40 transition-all duration-200 cursor-pointer"
                                style={{
                                  width: msgImages.length === 1
                                    ? "100%"
                                    : "120px",
                                  height: msgImages.length === 1
                                    ? "auto"
                                    : "80px",
                                  aspectRatio:
                                    msgImages.length === 1
                                      ? "16/10"
                                      : undefined,
                                }}
                                title={
                                  isArabic
                                    ? "اضغط لتكبير الصورة"
                                    : "Click to enlarge"
                                }
                              >
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  className="w-full h-full object-cover transition-transform duration-200 group-hover/img:scale-105"
                                  loading="lazy"
                                />
                                {/* Zoom overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                                  <ZoomIn className="h-5 w-5 text-white/0 group-hover/img:text-white/80 transition-all duration-200" />
                                </div>
                                {/* Image counter badge */}
                                {msgImages.length > 1 && (
                                  <div className="absolute bottom-1 right-1 bg-black/60 rounded-full px-1.5 py-0.5 text-[9px] text-white/70">
                                    {imgIdx + 1}/{msgImages.length}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 mt-0.5">
                      <User className="h-3.5 w-3.5 text-white/60" />
                    </div>
                  )}
                </div>
            );
          })}

          {/* Suggested questions — show after welcome message only */}
          {messages.length === 1 && messages[0]?.role === "assistant" && (
            <div className="pt-1 pb-2">
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2 px-1">
                {isArabic ? "جرب أن تسأل" : "Try asking"}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {(isArabic
                  ? [
                      "ما هي المشاريع الحائزة على جوائز؟",
                      "أرني صور مشروع أواسيس",
                      "لخص الخبرة المهنية",
                      "ما هي الكفاءات والمهارات؟",
                      "كم عدد المشاريع وفي أي دول؟",
                      "أرني مشاريع الضيافة",
                    ]
                  : [
                      "What are the awarded projects?",
                      "Show me Oasis Skywalk images",
                      "Summarize career experience",
                      "What are the key competencies?",
                      "How many projects and in which countries?",
                      "Show me hospitality projects",
                    ]
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    className="chatbot-suggestion text-left text-[11px] text-white/45 px-2.5 py-2 rounded-lg border border-white/[0.04] hover:border-[#C9A96E]/20 hover:bg-[#C9A96E]/[0.04] hover:text-white/70 transition-all cursor-pointer leading-snug"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex gap-2.5">
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#C9A96E]/30 mt-0.5">
                <Image
                  src={BOT_AVATAR}
                  alt="Ahmed Essam"
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <div className="chatbot-loading bg-white/[0.04] border border-white/[0.04] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 text-[#C9A96E] animate-spin" />
                  <span className="text-xs text-white/40">
                    {isArabic ? "يفكر..." : "Thinking..."}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="border-t px-3 py-3 shrink-0"
          style={{ borderColor: "var(--border-accent)" }}
        >
          <div className="chatbot-input-box flex items-end gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 focus-within:border-[#C9A96E]/20 transition-colors">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!voiceSupported || isLoading}
              className={`chatbot-icon-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${
                isListening
                  ? "bg-red-500/20 text-red-400 animate-pulse"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
              title={
                isArabic
                  ? isListening
                    ? "إيقاف التسجيل"
                    : "إدخال صوتي"
                  : isListening
                  ? "Stop listening"
                  : "Voice input"
              }
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isArabic ? "اسأل عن المحفظة..." : "Ask about the portfolio..."
              }
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/25 outline-none leading-tight"
              style={{ maxHeight: "80px", minHeight: "20px" }}
              dir={isArabic ? "rtl" : "ltr"}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height =
                  Math.min(target.scrollHeight, 80) + "px";
              }}
            />
            {ttsSupported && messages.length > 0 && (
              <button
                onClick={isSpeaking ? stopSpeaking : speakLastMessage}
                className={`chatbot-icon-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all cursor-pointer ${
                  isSpeaking
                    ? "text-[#C9A96E] bg-[#C9A96E]/15"
                    : "text-white/30 hover:text-white/60 hover:bg-white/5"
                }`}
                title={
                  isArabic
                    ? isSpeaking
                      ? "إيقاف القراءة"
                      : "اقرأ الرد"
                    : isSpeaking
                    ? "Stop reading"
                    : "Read response aloud"
                }
              >
                {isSpeaking ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            )}
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                background: input.trim()
                  ? "linear-gradient(135deg, #C9A96E, #a88a4e)"
                  : "transparent",
              }}
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
          <p className="text-[9px] text-white/15 text-center mt-2">
            {isArabic
              ? "مساعد المحفظة — المعرفة من الموقع والوثائق فقط"
              : "Portfolio assistant — knowledge from website & documents only"}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Image Lightbox */}
      {/* ========================================================================= */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          ref={chatContainerRef}
          className="fixed inset-0 z-[99999] flex items-center justify-center select-none"
          onClick={() => { if (chatScaleRef.current <= 1.01) closeLightbox(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95" />

          {/* Close */}
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            {lightboxImages.length > 1 && (
              <div className="bg-black/50 rounded-full px-3 py-1.5 text-xs text-white/70 border border-white/10">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-20 z-20 flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); chatZoomOut(); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" aria-label="Zoom out"><ZoomOut className="h-4 w-4" /></button>
            {chatScale > 1.01 && <button onClick={(e) => { e.stopPropagation(); chatResetZoom(); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" aria-label="Reset zoom"><RotateCcw className="h-3.5 w-3.5" /></button>}
            <button onClick={(e) => { e.stopPropagation(); chatZoomIn(); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" aria-label="Zoom in"><ZoomIn className="h-4 w-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); chatToggleFs(); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" aria-label="Fullscreen">{chatFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button>
          </div>

          {/* Prev */}
          {lightboxImages.length > 1 && chatScale <= 1.01 && (
            <button onClick={(e) => { e.stopPropagation(); lightboxPrev(); }} className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Image with zoom/pan */}
          <div
            ref={chatImgRef}
            key={lightboxIndex}
            className="relative overflow-hidden rounded-lg z-[1]"
            style={{ maxWidth: chatFs ? '100vw' : '90vw', maxHeight: chatFs ? '100vh' : '85vh', width: chatFs ? '100vw' : 'auto', height: chatFs ? '100vh' : 'auto', touchAction: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxIndex].src}
              alt={lightboxImages[lightboxIndex].alt}
              draggable={false}
              className="max-w-full max-h-full object-contain rounded-lg pointer-events-none"
              style={{ transform: `translate(${chatPos.x}px, ${chatPos.y}px) scale(${chatScale})`, transformOrigin: 'center center', maxWidth: chatFs ? '100vw' : '90vw', maxHeight: chatFs ? '100vh' : '85vh' }}
            />
            {lightboxImages[lightboxIndex].alt && chatScale <= 1.01 && (
              <p className="text-center text-sm text-white/60 mt-3 max-w-md mx-auto">
                {lightboxImages[lightboxIndex].alt}
              </p>
            )}
          </div>

          {/* Next */}
          {lightboxImages.length > 1 && chatScale <= 1.01 && (
            <button onClick={(e) => { e.stopPropagation(); lightboxNext(); }} className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
