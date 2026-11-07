"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const { eyebrow, headlineLine1, headlineLine2, headlineLine3, description, stats } =
    SITE_CONFIG.hero;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-16"
    >
      {/* Outer Framed Hero Canvas */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full rounded-[28px] md:rounded-[36px] overflow-hidden min-h-[580px] lg:min-h-[660px] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 border border-white/60 shadow-[0_4px_35px_-8px_rgba(0,0,0,0.04)]"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 75% 35%, #E5ECEB 0%, #EFE8E2 40%, #F1E5E2 75%, #F7F3F0 100%)",
          }}
        >
          {/* Subtle overlay texture/light reflection */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none" />

          {/* Soft ambient backlight behind doctor matching warm beige & blush palette */}
          <div
            className="absolute bottom-[-10%] right-[-2%] sm:right-[2%] md:right-[6%] lg:right-[10%] xl:right-[12%] w-[380px] sm:w-[460px] md:w-[520px] lg:w-[580px] xl:w-[620px] h-[88%] rounded-full pointer-events-none z-0 opacity-75 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(241, 229, 226, 0.75) 0%, rgba(239, 232, 226, 0.6) 45%, rgba(229, 236, 235, 0.3) 70%, transparent 85%)",
            }}
          />

          {/* Blonde Female Doctor Seated Hero Photograph in Center-Right */}
          <div
            className="absolute bottom-0 right-[1%] sm:right-[4%] md:right-[8%] lg:right-[12%] xl:right-[15%] w-[310px] sm:w-[390px] md:w-[460px] lg:w-[510px] xl:w-[560px] h-[82%] sm:h-[88%] md:h-[92%] lg:h-[95%] xl:h-[96%] pointer-events-none select-none z-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 12%, black 100%)",
              maskImage:
                "linear-gradient(to top, transparent 0%, black 12%, black 100%)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 94% 92% at 50% 50%, black 72%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 94% 92% at 50% 50%, black 72%, transparent 100%)",
              }}
            >
              <Image
                src="/images/Smiling Blonde Doctor Portrait.png"
                alt="Smiling blonde female doctor in a white coat with stethoscope in a modern healthcare setting"
                fill
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 640px) 310px, (max-width: 768px) 390px, (max-width: 1024px) 460px, (max-width: 1280px) 510px, 560px"
                className="object-contain object-bottom"
              />
            </motion.div>
          </div>

          {/* Main Hero Two-Column Layout */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-start max-w-xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-4 md:mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-neutral-800">
                  {eyebrow}
                </span>
              </motion.div>

              {/* Large Crisp Uppercase Headline without background interference */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-[-0.035em] uppercase leading-[0.93] text-[#080808] text-[44px] sm:text-[56px] md:text-[66px] lg:text-[74px] xl:text-[80px] mb-8"
              >
                <span className="block">{headlineLine1}</span>
                <span className="block">{headlineLine2}</span>
                <span className="block">{headlineLine3}</span>
              </motion.h1>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center gap-3.5 mb-10"
              >
                <Link
                  href={SITE_CONFIG.hero.primaryCta.href}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#050505] text-white text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {SITE_CONFIG.hero.primaryCta.label}
                </Link>
                <Link
                  href={SITE_CONFIG.hero.secondaryCta.href}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#080808] border border-neutral-300/80 text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow"
                >
                  {SITE_CONFIG.hero.secondaryCta.label}
                </Link>
              </motion.div>
            </div>

            {/* Right Side Statistics Column (Stacked vertically on Desktop, right-aligned) */}
            <div className="lg:col-span-5 flex flex-col lg:items-end justify-start pt-2 lg:pt-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35, staggerChildren: 0.1 }}
                className="grid grid-cols-2 lg:flex lg:flex-col gap-6 sm:gap-8 lg:space-y-6 lg:gap-0 lg:text-right"
              >
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col lg:items-end bg-white/40 lg:bg-transparent p-3 lg:p-0 rounded-2xl backdrop-blur-xs lg:backdrop-blur-none border border-white/50 lg:border-none"
                  >
                    <div className="text-[34px] sm:text-[40px] lg:text-[44px] font-light tracking-tight text-[#080808] leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-medium tracking-normal text-neutral-700 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Hero Bottom Row: Description on Left & Scroll Indicator on Right */}
          <div className="relative z-20 pt-8 sm:pt-12 mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[13px] sm:text-[14px] text-neutral-800 leading-relaxed max-w-md font-normal"
            >
              {description}
            </motion.p>

            {/* Scroll Indicator button */}
            <motion.a
              href="#services"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              aria-label="Scroll to services section"
              className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-800/30 text-neutral-800 hover:bg-black/5 hover:border-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-black"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
