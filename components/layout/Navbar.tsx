"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // check initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? "pt-2.5 sm:pt-3" : "pt-4 md:pt-6"
      } px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-[1400px] mx-auto">
        <nav
          aria-label="Main Navigation"
          className={`relative flex items-center justify-between rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out ${
            isScrolled
              ? "px-4 py-2 md:px-5 md:py-2.5 scale-[0.985]"
              : "px-5 py-3 md:px-7 md:py-3.5 scale-100"
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full py-0.5"
          >
            {/* Subtle connectivity emblem */}
            <div
              className={`rounded-full bg-black flex items-center justify-center text-white font-semibold tracking-tighter transition-all duration-300 ${
                isScrolled ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-[11px]"
              }`}
            >
              <span className="inline-block transform scale-90">MB</span>
            </div>
            <span
              className={`font-semibold tracking-tight text-[#080808] transition-all duration-300 ${
                isScrolled ? "text-[14px] sm:text-[15px]" : "text-[15px] sm:text-[16px]"
              }`}
            >
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Center Links */}
          <ul
            className={`hidden md:flex items-center text-medium text-[#444444] transition-all duration-300 ${
              isScrolled ? "space-x-5 text-[12px]" : "space-x-7 text-[13px]"
            }`}
          >
            {SITE_CONFIG.navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors duration-200 tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded px-1.5 py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="#appointment"
              className={`inline-flex items-center justify-center font-medium tracking-wider uppercase rounded-full bg-[#050505] text-white hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                isScrolled
                  ? "text-[10px] px-4 py-2"
                  : "text-[11px] px-5 py-2.5"
              }`}
            >
              BOOK APPOINTMENT
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="#appointment"
              className={`inline-flex items-center justify-center font-medium tracking-wider uppercase rounded-full bg-[#050505] text-white transition-all duration-300 ${
                isScrolled ? "text-[9px] px-2.5 py-1.5" : "text-[10px] px-3 py-1.5"
              }`}
            >
              BOOK
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 rounded-full text-neutral-800 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-xl transition-all duration-300">
            <ul className="flex flex-col space-y-3 text-[14px] font-medium text-neutral-700">
              {SITE_CONFIG.navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-neutral-100 hover:text-black transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-neutral-100">
                <Link
                  href="#appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center text-[12px] font-medium uppercase tracking-wider py-3 rounded-full bg-[#050505] text-white hover:bg-neutral-800 transition-colors"
                >
                  BOOK APPOINTMENT
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
