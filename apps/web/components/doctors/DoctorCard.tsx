"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Doctor } from "@/lib/medical-data";
import { Star, Calendar, ArrowRight, Award, Clock } from "lucide-react";
import { useBooking } from "@/components/booking/BookingContext";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { openBooking } = useBooking();

  return (
    <div className="group rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Photo & Badge */}
      <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-neutral-800 shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{doctor.rating}</span>
            <span className="text-neutral-400 font-normal">({doctor.reviewsCount})</span>
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs text-[11px] font-medium text-white shadow-xs">
            <Clock className="w-3 h-3 text-neutral-300" />
            <span>{doctor.experienceYears} yrs exp</span>
          </span>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <span className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase text-neutral-500 mb-1">
            {doctor.specialtyName}
          </span>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-[#080808] leading-snug group-hover:text-neutral-700 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-xs text-neutral-600 mt-1 font-medium line-clamp-1">
            {doctor.title}
          </p>

          {/* Key Qualifications */}
          <div className="mt-3.5 pt-3.5 border-t border-neutral-100 flex items-start gap-2">
            <Award className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-neutral-600 line-clamp-2 leading-relaxed">
              {doctor.qualifications.join(" • ")}
            </p>
          </div>

          {/* Availability */}
          <div className="mt-2.5 flex items-center gap-2 text-[11.5px] text-neutral-500">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{doctor.availability}</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              openBooking({
                specialtyId: doctor.specialtyId,
                doctorId: doctor.id,
              })
            }
            className="flex-1 py-2.5 px-3 rounded-full bg-[#050505] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all text-center shadow-xs cursor-pointer"
          >
            Book Visit
          </button>
          <Link
            href={`/doctors/${doctor.id}`}
            className="inline-flex items-center justify-center p-2.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:border-black transition-all"
            aria-label={`View full profile of ${doctor.name}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

