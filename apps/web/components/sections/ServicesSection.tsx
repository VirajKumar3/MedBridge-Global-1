"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE_CONFIG, ServiceCardData } from "@/lib/site-config";

export default function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const current = scrollContainerRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 300; // estimated card + gap
    const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Left Heading, Right Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-xl">
            <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold tracking-tight text-[#080808] leading-[1.08] mb-3">
              Everything you need for<br className="hidden sm:inline" /> better health — in one place.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed max-w-lg">
              Healthcare should feel connected, not complicated. Explore coordinated services, experienced professionals, and modern diagnostics in one seamless experience.
            </p>
          </div>

          {/* Carousel Outlined Pill Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll services left"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "border-neutral-300 text-neutral-900 hover:border-black hover:bg-neutral-50 active:scale-95"
                  : "border-neutral-200 text-neutral-300 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll services right"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "border-neutral-300 text-neutral-900 hover:border-black hover:bg-neutral-50 active:scale-95"
                  : "border-neutral-200 text-neutral-300 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 pt-1"
          style={{ scrollbarWidth: "none" }}
        >
          {SITE_CONFIG.services.map((service: ServiceCardData) => (
            <div
              key={service.id}
              className="flex-none snap-start w-[240px] sm:w-[260px] md:w-[280px] h-[340px] sm:h-[360px] relative rounded-[18px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 bg-neutral-100"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 280px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium tracking-wider uppercase text-white border border-white/20">
                  {service.category}
                </span>
              </div>

              {/* Content in bottom-left */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-[16px] sm:text-[17px] font-semibold tracking-tight mb-1 leading-snug">
                  {service.title}
                </h3>
                <p className="text-neutral-300 text-[12px] leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

