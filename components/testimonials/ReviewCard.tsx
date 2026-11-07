"use client";

import React from "react";
import { CheckCircle2, Star } from "lucide-react";

export interface PatientReview {
  id: number;
  headline: string;
  name: string;
  location: string;
  initials: string;
  department: string;
  consultationType: string;
  rating: number;
  quote: string;
  highlight: string;
  dateBadge: string;
  isVerified: boolean;
  hospitalAffiliation: string;
}

interface ReviewCardProps {
  review: PatientReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article
      className="relative w-[320px] sm:w-[380px] md:w-[410px] h-[385px] sm:h-[395px] rounded-[24px] p-6 sm:p-7 bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 select-none group overflow-hidden"
    >
      {/* Decorative Subtle Watermark Quote Mark */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-5 text-neutral-100/90 font-serif text-6xl select-none pointer-events-none transition-colors group-hover:text-neutral-200/70"
      >
        &ldquo;
      </span>

      {/* Top Block: Category Badge + Verified Pill */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-800 border border-neutral-200/70">
            {review.department}
          </span>

          {review.isVerified && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/70 shadow-2xs"
              title="Verified post-consultation clinical record"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
              <span>Verified Patient</span>
            </span>
          )}
        </div>

        {/* Star Rating & Hospital Network Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5" aria-label={`Rated ${review.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-[11.5px] font-bold text-neutral-900">
            {review.rating.toFixed(1)}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[11px] text-neutral-500 font-medium truncate max-w-[170px]">
            {review.hospitalAffiliation}
          </span>
        </div>

        {/* Bold Pull-Quote Headline (Fast Skimmability) */}
        <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-neutral-900 tracking-tight leading-snug mb-2 group-hover:text-black transition-colors line-clamp-2">
          &ldquo;{review.headline}&rdquo;
        </h4>

        {/* Patient Review Body */}
        <p className="text-[12.5px] sm:text-[13px] text-neutral-600 leading-relaxed font-normal line-clamp-3">
          {review.quote}
        </p>

        {/* Clinical Highlight Pill */}
        <div className="mt-3.5">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-neutral-700 font-medium bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">{review.highlight}</span>
          </span>
        </div>
      </div>

      {/* Author Footer: Avatar + Name + Consultation Context */}
      <footer className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1c1c1c] via-[#222222] to-[#0a0a0a] text-white flex items-center justify-center text-xs font-bold ring-2 ring-neutral-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <h5 className="text-[13px] font-bold text-neutral-900 leading-tight truncate">
              {review.name}
            </h5>
            <p className="text-[10.5px] text-neutral-400 font-medium truncate">
              {review.location} • {review.dateBadge}
            </p>
          </div>
        </div>

        <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider shrink-0 hidden sm:inline">
          {review.consultationType.split(" ")[0]}
        </span>
      </footer>
    </article>
  );
}
