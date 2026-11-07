"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import ReviewCard, { PatientReview } from "./ReviewCard";

export const PATIENT_REVIEWS_DATA: PatientReview[] = [
  {
    id: 1,
    headline: "Echo reports and care plan ready within 24 hours.",
    name: "Ananya R.",
    location: "Bangalore",
    initials: "AR",
    department: "Cardiology",
    consultationType: "Cardiac Evaluation & 2D Echo",
    rating: 5.0,
    quote:
      "The coordination between my cardiologist and the diagnostic team was exceptional. My echo reports and medication plan were ready within 24 hours without repeating tests.",
    highlight: "Zero redundant tests • 24-hr turnaround",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "Apollo Hospital Network",
  },
  {
    id: 2,
    headline: "Unhurried consultation with a clear non-surgical plan.",
    name: "Vikram S.",
    location: "Mumbai",
    initials: "VS",
    department: "Orthopedics & Spine",
    consultationType: "Spine Consultation & Joint Rehab",
    rating: 5.0,
    quote:
      "Consulting with my specialist was completely unhurried. He explained my MRI scans in plain terms and provided a non-surgical joint rehabilitation plan that worked.",
    highlight: "Clear MRI review • Non-surgical plan",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "Fortis Healthcare Network",
  },
  {
    id: 3,
    headline: "Synchronized records gave our family complete peace of mind.",
    name: "Meera K.",
    location: "New Delhi",
    initials: "MK",
    department: "Internal Medicine",
    consultationType: "Comprehensive Metabolic Workup",
    rating: 5.0,
    quote:
      "Having all my lab records and follow-ups coordinated under one profile gave my family total peace of mind. The care team genuinely listened to every symptom.",
    highlight: "Synchronized profile • Empathetic listening",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "Max Healthcare Network",
  },
  {
    id: 4,
    headline: "Systematic diagnosis with proactive 48-hour follow-up.",
    name: "Dev K.",
    location: "Hyderabad",
    initials: "DK",
    department: "Neurology",
    consultationType: "Migraine & Neuro-Vascular Follow-Up",
    rating: 5.0,
    quote:
      "My neurologist systematically ruled out acute triggers and adjusted my preventative regimen. The care coordinator followed up 48 hours later to check my response.",
    highlight: "Systematic diagnosis • 48-hr coordinator check",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "Manipal Hospital Network",
  },
  {
    id: 5,
    headline: "Targeted clinical therapy with visible progress in 3 weeks.",
    name: "Sneha T.",
    location: "Pune",
    initials: "ST",
    department: "Dermatology",
    consultationType: "Clinical Dermatology & Targeted Care",
    rating: 5.0,
    quote:
      "Dr. Agarwal took the time to review my full history before prescribing targeted therapies. My condition showed noticeable, healthy improvement in three weeks.",
    highlight: "Personalized therapy • Visible progress",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "MedBridge Specialized Clinic",
  },
  {
    id: 6,
    headline: "Effortless booking with zero waiting room delays.",
    name: "Rohit P.",
    location: "Chennai",
    initials: "RP",
    department: "Family Medicine",
    consultationType: "Preventative Health Intake & Review",
    rating: 5.0,
    quote:
      "Booking an appointment was effortless. Our primary physician reviewed both my preventive blood panels and lifestyle goals with total clarity and zero rush.",
    highlight: "Zero waiting delays • Clear preventative advice",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "Apollo Primary Network",
  },
  {
    id: 7,
    headline: "Gentle, observant pediatric care that comforted my child.",
    name: "Pooja L.",
    location: "Gurgaon",
    initials: "PL",
    department: "Pediatrics",
    consultationType: "Pediatric Developmental Assessment",
    rating: 5.0,
    quote:
      "The pediatric team made my daughter feel calm immediately. The physician was gentle, observant, and gave us an actionable, practical dietary management plan.",
    highlight: "Gentle pediatric care • Actionable plan",
    dateBadge: "Verified Parent Review",
    isVerified: true,
    hospitalAffiliation: "Rainbow Children's Network",
  },
  {
    id: 8,
    headline: "Digital scans shared directly with my specialist before I left.",
    name: "Naveen J.",
    location: "Kolkata",
    initials: "NJ",
    department: "Diagnostic Imaging",
    consultationType: "High-Resolution MRI & Radiologist Review",
    rating: 5.0,
    quote:
      "The imaging center was prompt, courteous, and modern. My digital scans were shared directly with my orthopedist before I even left the clinic premises.",
    highlight: "Instant digital sharing • Modern imaging suite",
    dateBadge: "Verified Visit",
    isVerified: true,
    hospitalAffiliation: "MedBridge Advanced Diagnostics",
  },
];

export default function PatientTestimonialsCarousel() {
  const reviews = PATIENT_REVIEWS_DATA;
  const count = reviews.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cardStep, setCardStep] = useState(434); // card width + gap

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const tempPauseUntilRef = useRef(0);
  const pointerStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const prefersReducedMotionRef = useRef(false);

  // Measure card dimensions dynamically on mount and window resize
  const measureStep = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector("article");
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const isMobile = window.innerWidth < 640;
      const gap = isMobile ? 16 : 24;
      const step = cardWidth + gap;
      setCardStep(step);
    }
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);

    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener("change", handler);
      return () => {
        window.removeEventListener("resize", measureStep);
        mediaQuery.removeEventListener("change", handler);
      };
    }

    return () => {
      window.removeEventListener("resize", measureStep);
    };
  }, [measureStep]);

  // Main animation frame loop for seamless right-to-left marquee motion
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const speed = 0.52; // Pixels per frame at 60fps (~31px/sec)

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      const singleSetWidth = count * cardStep;
      const isTemporarilyPaused = now < tempPauseUntilRef.current;
      const shouldAutoScroll =
        !isHovered &&
        !isUserPaused &&
        !isDragging &&
        !isTemporarilyPaused &&
        !prefersReducedMotionRef.current &&
        singleSetWidth > 0;

      if (shouldAutoScroll) {
        targetOffsetRef.current += speed * (dt / 16.67);
      }

      // Smooth interpolation (lerp) for silky transitions when clicking Prev/Next/Dots
      const diff = targetOffsetRef.current - currentOffsetRef.current;
      currentOffsetRef.current += diff * 0.12;

      // Wrap offsets modulo singleSetWidth to maintain seamless infinite loop
      if (singleSetWidth > 0) {
        if (targetOffsetRef.current >= singleSetWidth) {
          targetOffsetRef.current -= singleSetWidth;
          currentOffsetRef.current -= singleSetWidth;
        } else if (targetOffsetRef.current < 0) {
          targetOffsetRef.current += singleSetWidth;
          currentOffsetRef.current += singleSetWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${currentOffsetRef.current}px, 0, 0)`;
      }

      // Calculate which card is closest to the left focal position for pagination indicators
      if (singleSetWidth > 0 && cardStep > 0) {
        const normalized =
          ((currentOffsetRef.current % singleSetWidth) + singleSetWidth) %
          singleSetWidth;
        const currentIdx = Math.floor((normalized + cardStep * 0.4) / cardStep) % count;
        setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [count, cardStep, isHovered, isUserPaused, isDragging]);

  const pauseTemporarily = (ms = 4000) => {
    tempPauseUntilRef.current = performance.now() + ms;
  };

  // Navigation: Next Card
  const handleNext = () => {
    pauseTemporarily(4500);
    const step = cardStep;
    const nextIdx = Math.floor(targetOffsetRef.current / step) + 1;
    targetOffsetRef.current = nextIdx * step;
  };

  // Navigation: Previous Card
  const handlePrev = () => {
    pauseTemporarily(4500);
    const step = cardStep;
    const prevIdx = Math.ceil(targetOffsetRef.current / step) - 1;
    targetOffsetRef.current = prevIdx * step;
  };

  // Navigation: Jump to specific dot index
  const handleDotClick = (index: number) => {
    pauseTemporarily(4500);
    const step = cardStep;
    const singleSetWidth = count * step;
    const currentCycle = Math.floor(targetOffsetRef.current / singleSetWidth);
    targetOffsetRef.current = currentCycle * singleSetWidth + index * step;
  };

  // Pointer/Touch Drag handlers for desktop drag & mobile swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    pointerStartXRef.current = e.clientX;
    dragStartOffsetRef.current = currentOffsetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - pointerStartXRef.current;
    let nextOffset = dragStartOffsetRef.current - delta;
    const singleSetWidth = count * cardStep;
    if (singleSetWidth > 0) {
      if (nextOffset >= singleSetWidth) {
        nextOffset -= singleSetWidth;
        dragStartOffsetRef.current -= singleSetWidth;
      } else if (nextOffset < 0) {
        nextOffset += singleSetWidth;
        dragStartOffsetRef.current += singleSetWidth;
      }
    }
    currentOffsetRef.current = nextOffset;
    targetOffsetRef.current = nextOffset;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    pauseTemporarily(2000);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Patient Testimonials"
      className="w-full relative select-none"
    >
      {/* 1. Header with Eyebrow, Title, Trust Signals & Unified Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-500">
              PATIENT PERSPECTIVES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-[36px] font-bold tracking-tight text-[#080808] leading-tight mb-2.5">
            Real Experiences. Better Care.
          </h3>

          <p className="text-xs sm:text-[14px] text-neutral-600 leading-relaxed font-normal mb-3.5 max-w-xl">
            Hear how coordinated healthcare and specialist-led care make a difference in patients&rsquo; journeys.
          </p>

          {/* Trust Metric Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-600 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 font-semibold shadow-2xs">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              4.9 / 5.0 Average Rating
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60">
              15,000+ Consultations Coordinated
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold">
              100% Verified Clinical Care
            </span>
          </div>
        </div>

        {/* Consolidated Control Pod (Play/Pause + Prev/Next Arrows) */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
          {/* Pause / Play State Toggle Button */}
          <button
            type="button"
            onClick={() => setIsUserPaused((prev) => !prev)}
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold border border-neutral-200/90 shadow-2xs hover:border-black transition-all cursor-pointer"
            title={isUserPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            aria-label={isUserPaused ? "Resume carousel movement" : "Pause carousel movement"}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isUserPaused ? "bg-amber-400" : "bg-emerald-500 animate-pulse"
              }`}
            />
            {isUserPaused ? (
              <>
                <Play className="w-3 h-3 fill-neutral-700" />
                <span className="text-[11.5px]">Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 fill-neutral-700" />
                <span className="text-[11.5px]">Auto-scroll</span>
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 border border-neutral-200/70">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous patient review"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-neutral-900 hover:text-white border border-neutral-200/60 flex items-center justify-center text-neutral-800 transition-all shadow-2xs active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next patient review"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-neutral-900 hover:text-white border border-neutral-200/60 flex items-center justify-center text-neutral-800 transition-all shadow-2xs active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Seamless Looping Carousel Track (Clean edges, no aggressive white overlays) */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Patient review carousel. Use arrow keys to navigate."
        className={`relative w-full overflow-hidden py-4 -my-4 focus:outline-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
      >
        {/* Carousel Flex Container (3 sets of 8 cards rendered for seamless infinite looping) */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {/* Set 1: Screen-reader accessible primary cards */}
          {reviews.map((review) => (
            <ReviewCard
              key={`set1-${review.id}`}
              review={review}
            />
          ))}

          {/* Set 2: Seamless loop duplicates (hidden from screen reader to avoid repetitive reading) */}
          <div className="flex gap-4 sm:gap-6" aria-hidden="true" tabIndex={-1}>
            {reviews.map((review) => (
              <ReviewCard
                key={`set2-${review.id}`}
                review={review}
              />
            ))}
          </div>

          {/* Set 3: Seamless buffer duplicates */}
          <div className="flex gap-4 sm:gap-6" aria-hidden="true" tabIndex={-1}>
            {reviews.map((review) => (
              <ReviewCard
                key={`set3-${review.id}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Progress Bar + Active Slide Indicator + Verification Disclaimer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-100">
        {/* Slide Counter & Interactive Pill Pagination */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-neutral-900 tracking-tight">
            {String(activeIndex + 1).padStart(2, "0")} <span className="text-neutral-300 font-normal">/</span> {String(count).padStart(2, "0")}
          </span>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Patient review slides"
          >
            {reviews.map((review, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Jump to review by ${review.name} (${review.department})`}
                  onClick={() => handleDotClick(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isCurrent
                      ? "w-7 h-2 bg-neutral-900 shadow-2xs"
                      : "w-2 h-2 bg-neutral-200 hover:bg-neutral-400"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Discreet Legal & Service Standard Disclaimer */}
        <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-normal text-center sm:text-right">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span>Demonstrative clinical feedback summaries curated from verified care surveys. Individual outcomes vary.</span>
        </div>
      </div>
    </motion.section>
  );
}
