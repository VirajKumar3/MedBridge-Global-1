"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorCard from "@/components/doctors/DoctorCard";
import { DOCTORS_DATA, SPECIALTIES_DATA } from "@/lib/medical-data";
import { Search, Filter, Stethoscope, CheckCircle, RefreshCw } from "lucide-react";

export default function DoctorsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialtyId === selectedSpecialty;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doctor.name.toLowerCase().includes(q) ||
        doctor.specialtyName.toLowerCase().includes(q) ||
        doctor.title.toLowerCase().includes(q) ||
        doctor.areasOfExpertise.some((area) => area.toLowerCase().includes(q)) ||
        doctor.bio.toLowerCase().includes(q);

      return matchesSpecialty && matchesSearch;
    });
  }, [searchQuery, selectedSpecialty]);

  return (
    <main className="min-h-screen bg-white text-[#080808] flex flex-col selection:bg-neutral-200">
      <Navbar />

      {/* Directory Hero Header */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[#FAFAFA] border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 block mb-2">
              PHYSICIAN DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080808] leading-tight mb-4">
              Find a Specialist
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Connect with board-certified physicians, department directors, and clinical specialists across our synchronized healthcare ecosystem.
            </p>
          </div>

          {/* Search Bar & Specialty Filters */}
          <div className="mt-8 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by physician name, specialty, condition, or keyword..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Specialty Pills Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedSpecialty("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === "all"
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                All Specialties ({DOCTORS_DATA.length})
              </button>
              {Object.values(SPECIALTIES_DATA).map((spec) => {
                const count = DOCTORS_DATA.filter((d) => d.specialtyId === spec.id).length;
                const isSelected = selectedSpecialty === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    {spec.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Cards Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Metrics */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-100 text-xs text-neutral-600">
            <span>
              Showing <strong>{filteredDoctors.length}</strong> verified physician{filteredDoctors.length !== 1 ? "s" : ""}
            </span>
            {(searchQuery || selectedSpecialty !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                }}
                className="inline-flex items-center gap-1 font-semibold text-neutral-800 hover:text-black"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">No doctors match your criteria</h3>
              <p className="text-xs text-neutral-600 mb-6">
                Try adjusting your search terms or select another specialty to view available physicians.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                }}
                className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

