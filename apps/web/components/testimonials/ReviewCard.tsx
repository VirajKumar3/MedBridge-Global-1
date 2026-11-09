"use client";

import React from "react";
import { Star, Check } from "lucide-react";

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
  shortQuote?: string;
  highlight: string;
  dateBadge: string;
  isVerified: boolean;
  hospitalAffiliation: string;
}

interface ReviewCardProps {
  review: PatientReview;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ReviewCard({
  review,
  isActive = false,
  onClick,
}: ReviewCardProps) {
  // Curated concise review (maximum 15-20 words) for visual focus
  const reviewText = review.shortQuote || review.quote;

  return (
    <article
      onClick={onClick}
      className={`group relative h-full min-h-[300px] sm:min-h-[320px] rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer select-none overflow-hidden ${
        isActive
          ? "bg-white border border-[#7657FF]/35 shadow-[0_24px_54px_-16px_rgba(23,21,31,0.08)] ring-1 ring-[#7657FF]/15 sm:scale-[1.02] z-10"
          : "bg-[#F8F7FC] border border-neutral-200/60 hover:border-neutral-300/90 hover:bg-white/80 opacity-80 hover:opacity-100 shadow-none z-0"
      }`}
    >
      {/* Active Subtle Accent Line */}
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#7657FF] to-transparent rounded-full"
        />
      )}

      {/* Top Row: 5-Star Rating + Small Verified Patient Indicator */}
      <div className="flex items-center justify-between gap-3">
        {/* Star Rating */}
        <div
          className="flex items-center gap-1"
          aria-label={`Rated ${review.rating} out of 5 stars`}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
            />
          ))}
        </div>

        {/* Small Verified Patient Indicator */}
        {review.isVerified && (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
            <span>Verified patient</span>
          </div>
        )}
      </div>

      {/* Middle Content: The Review Text (Hero Focus) */}
      <div className="my-6">
        <p
          className={`transition-colors duration-300 ${
            isActive
              ? "text-[16.5px] sm:text-[18px] text-[#17151F] font-medium leading-relaxed tracking-tight"
              : "text-[15px] sm:text-[16px] text-[#17151F]/75 font-normal leading-relaxed"
          }`}
        >
          &ldquo;{reviewText}&rdquo;
        </p>
      </div>

      {/* Bottom Row: Avatar + Name + Medical Specialty */}
      <div className="pt-5 border-t border-neutral-200/60 flex items-center gap-3.5">
        {/* Elegant Avatar with Initials */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
            isActive
              ? "bg-[#17151F] text-white ring-2 ring-[#A99AFF]/40 shadow-xs"
              : "bg-neutral-800 text-neutral-200 ring-1 ring-neutral-300"
          }`}
          aria-hidden="true"
        >
          {review.initials}
        </div>

        {/* Patient Details */}
        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold text-[#17151F] tracking-tight leading-tight truncate">
            {review.name}
          </h4>
          <p className="text-[12px] text-neutral-500 font-medium truncate mt-0.5">
            {review.department}
          </p>
        </div>
      </div>
    </article>
  );
}
