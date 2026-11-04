"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  HeartPulse,
  Activity,
  Bone,
  Brain,
  Sparkles,
  Baby,
  Scan,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

// Map icon name string to Lucide component
const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  HeartPulse,
  Activity,
  Bone,
  Brain,
  Sparkles,
  Baby,
  Scan,
};

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="w-full py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold tracking-tight text-[#080808] leading-[1.08] mb-3">
              Expert care across<br />every major specialty
            </h2>
            <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed max-w-lg">
              Access experienced medical professionals across a broad range of disciplines through a connected healthcare experience.
            </p>
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-3">
            <Link
              href="#appointment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#050505] text-white text-[11px] font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all duration-200 shadow-sm"
            >
              BOOK APPOINTMENT
            </Link>
            <Link
              href="#appointment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#080808] border border-neutral-300 text-[11px] font-semibold tracking-wider uppercase hover:bg-neutral-50 transition-all duration-200"
            >
              FIND A DOCTOR
            </Link>
          </div>
        </div>

        {/* 4-column desktop grid / 2-column tablet / 1-or-2 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SITE_CONFIG.specialties.map((spec) => {
            const Icon = iconMap[spec.iconName] || Stethoscope;
            return (
              <Link
                key={spec.id}
                href={spec.href}
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-[14px] bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-transparent hover:border-neutral-300/60 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 text-neutral-800">
                    <Icon className="w-5 h-5 text-neutral-800 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-medium text-[#080808] group-hover:text-black transition-colors">
                      {spec.name}
                    </h3>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

