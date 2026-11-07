"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  LogOut,
  User,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useBooking } from "@/components/booking/BookingContext";

export default function Navbar() {
  const { user, openAuthModal, logout } = useAuth();
  const { openBooking } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-out ${
        isScrolled ? "pt-2 sm:pt-2.5" : "pt-3 sm:pt-4 md:pt-5"
      }`}
    >
      <div className="w-[92%] sm:w-[88%] md:w-[84%] lg:w-[78%] xl:w-[72%] max-w-[1060px] pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className={`relative flex items-center justify-between rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/70 shadow-[0_4px_22px_-2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out px-3.5 sm:px-5 md:px-6 ${
            isScrolled ? "h-[52px] sm:h-[54px] md:h-[56px]" : "h-[58px] sm:h-[60px] md:h-[62px]"
          }`}
        >
          {/* Brand Logo (Left) */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full shrink-0 py-1"
            aria-label="MedBridge Home"
          >
            <Image
              src="/images/medbridge-logo.png"
              alt="MedBridge"
              width={927}
              height={193}
              priority
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? "h-[22px] sm:h-[24px] md:h-[25px] lg:h-[27px]"
                  : "h-[25px] sm:h-[27px] md:h-[29px] lg:h-[31px]"
              }`}
            />
          </Link>

          {/* Desktop Center Links (Centered horizontally & vertically) */}
          <ul
            className={`hidden md:flex items-center font-medium text-[#444444] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isScrolled ? "gap-3 lg:gap-4.5 text-[11.5px] lg:text-[12px]" : "gap-3.5 lg:gap-5 text-[12px] lg:text-[12.5px]"
            }`}
          >
            {SITE_CONFIG.navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors duration-200 tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded px-1.5 py-1 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action: Log In & Get Started OR Authenticated User Profile */}
          <div className="hidden md:flex items-center shrink-0 gap-1.5 sm:gap-2">
            {!user ? (
              <>
                {/* Minimal Log In Text Button */}
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "patient")}
                  className={`font-semibold text-neutral-700 hover:text-black transition-colors duration-200 cursor-pointer rounded-full hover:bg-neutral-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                    isScrolled ? "text-[11px] px-2.5 py-1.5" : "text-xs px-3 py-1.5"
                  }`}
                >
                  Log In
                </button>

                {/* Premium Black Rounded Get Started Button */}
                <button
                  type="button"
                  onClick={() => openAuthModal("select-role")}
                  className={`inline-flex items-center justify-center font-semibold rounded-full bg-[#0a0a0a] text-white hover:bg-neutral-800 transition-all duration-200 shadow-xs hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black cursor-pointer whitespace-nowrap ${
                    isScrolled
                      ? "text-[11px] px-3.5 py-1.5"
                      : "text-xs px-4 md:px-5 py-2"
                  }`}
                >
                  Get Started
                </button>
              </>
            ) : (
              /* Authenticated User Profile Dropdown */
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-neutral-200/90 hover:border-black bg-white transition-all cursor-pointer shadow-2xs hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.avatar || user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-neutral-900 max-w-[90px] lg:max-w-[110px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      user.role === "doctor"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    {user.role === "doctor" ? "Dr." : "Patient"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.14)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                      <p className="text-xs font-bold text-neutral-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-[10.5px] text-neutral-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href={user.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{user.role === "doctor" ? "Doctor Dashboard" : "Patient Portal"}</span>
                    </Link>

                    <Link
                      href="/appointments"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Appointments & Records</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openBooking();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors text-left cursor-pointer"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Book New Appointment</span>
                    </button>

                    <div className="my-1 border-t border-neutral-100" />

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger & Fast Action */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal("select-role")}
                className={`inline-flex items-center justify-center font-semibold rounded-full bg-[#0a0a0a] text-white transition-all duration-300 cursor-pointer ${
                  isScrolled ? "text-[10px] px-3 py-1.5" : "text-[11px] px-3.5 py-1.5"
                }`}
              >
                Get Started
              </button>
            ) : (
              <Link
                href={user.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}
                className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold"
              >
                {user.avatar || user.name.slice(0, 2).toUpperCase()}
              </Link>
            )}

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
          <div className="md:hidden mt-2 p-5 rounded-[22px] bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.12)] transition-all duration-300">
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

              <li className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
                {!user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal("login", "patient");
                      }}
                      className="w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-black transition-colors"
                    >
                      Log In (Patient or Doctor)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal("select-role");
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-neutral-50 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                        <p className="text-[10px] text-neutral-400">{user.email}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 uppercase">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href={user.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full block text-center py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Open {user.role === "doctor" ? "Doctor Dashboard" : "Patient Portal"}
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
