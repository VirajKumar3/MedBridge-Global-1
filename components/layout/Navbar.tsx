"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full pt-4 md:pt-6 px-4 sm:px-6 lg:px-8 z-50">
      <div className="max-w-[1400px] mx-auto">
        <nav
          aria-label="Main Navigation"
          className="relative flex items-center justify-between px-5 py-3 md:px-7 md:py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] transition-all"
        >
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full py-1"
          >
            {/* Subtle connectivity emblem */}
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-semibold tracking-tighter">
              <span className="inline-block transform scale-90">MB</span>
            </div>
            <span className="font-semibold text-[15px] sm:text-[16px] tracking-tight text-[#080808]">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Center Links */}
          <ul className="hidden md:flex items-center space-x-7 text-[13px] font-medium text-[#444444]">
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
              className="inline-flex items-center justify-center text-[11px] font-medium tracking-wider uppercase px-5 py-2.5 rounded-full bg-[#050505] text-white hover:bg-neutral-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
            >
              BOOK APPOINTMENT
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="#appointment"
              className="inline-flex items-center justify-center text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full bg-[#050505] text-white"
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

