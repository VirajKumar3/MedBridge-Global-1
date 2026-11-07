"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { useBooking } from "@/components/booking/BookingContext";

export default function AppointmentCTASection() {
  const { openBooking } = useBooking();

  return (
    <section id="appointment" className="w-full py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[28px] md:rounded-[36px] overflow-hidden border border-neutral-200/90 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)] relative"
          style={{
            background:
              "linear-gradient(135deg, #F9F9F8 0%, #F5F3EF 50%, #EFEBE7 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-neutral-200 text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-800 w-fit mb-5 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-neutral-900" />
                <span>DIRECT ACCESS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080808] leading-tight mb-4">
                Your Health Deserves<br />Expert Attention.
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg mb-8">
                Connect directly with board-certified physicians, review clinical reports, and receive continuous follow-up care in one synchronized platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#050505] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK AN APPOINTMENT</span>
                </button>

                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#080808] border border-neutral-300 text-xs font-semibold tracking-wider uppercase hover:bg-neutral-50 transition-all shadow-xs"
                >
                  <Search className="w-4 h-4 text-neutral-700" />
                  <span>FIND A SPECIALIST</span>
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>HIPAA-Compliant & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Same-Week In-Person & Virtual</span>
                </div>
              </div>
            </div>

            {/* Right Large Image Side */}
            <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[540px]">
              <Image
                src="/images/cta-board-certified-doctor.jpg"
                alt="Distinguished board-certified medical specialist at MedBridge Global"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#F9F9F8]/50 lg:via-transparent lg:to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
