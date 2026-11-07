"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppointmentRecord } from "@/lib/medical-data";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const initialId = searchParams.get("id") || "";

  const [queryInput, setQueryInput] = useState(initialEmail || initialId);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const fetchAppointments = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter your registered email address or appointment reference code.");
      return;
    }
    setError("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      const isId = trimmed.toUpperCase().startsWith("MBG-");
      const url = isId
        ? `/api/appointments?id=${encodeURIComponent(trimmed.toUpperCase())}`
        : `/api/appointments?email=${encodeURIComponent(trimmed.toLowerCase())}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to retrieve appointments.");
      }

      setAppointments(data.appointments || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to search appointments at this time.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialEmail || initialId) {
      fetchAppointments(initialEmail || initialId);
    }
  }, [initialEmail, initialId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments(queryInput);
  };

  return (
    <div>
      {/* Lookup Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 block mb-2">
          PATIENT PORTAL
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#080808] leading-tight mb-3">
          Manage Your Appointments
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Enter your registered email address or appointment reference code (e.g. MBG-2026-XXXX) to access your upcoming consultations.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Enter email (e.g. sarah.connor@example.com) or booking ID"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-full bg-[#050505] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 disabled:bg-neutral-400 transition-all cursor-pointer shadow-xs"
          >
            {isLoading ? "Searching..." : "Lookup Records"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="max-w-3xl mx-auto">
          {appointments.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs text-neutral-600">
                <span>
                  Found <strong>{appointments.length}</strong> scheduled consultation{appointments.length !== 1 ? "s" : ""}
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Confidential Patient Record
                </span>
              </div>

              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                          {apt.id}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-900">
                        {apt.specialtyName} Consultation
                      </h3>
                    </div>

                    <div className="text-right sm:text-right">
                      <div className="text-xs text-neutral-500">Booked On</div>
                      <div className="text-xs font-medium text-neutral-800">
                        {new Date(apt.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs">
                    <div>
                      <span className="text-neutral-500 font-medium block">Attending Physician:</span>
                      <span className="text-neutral-900 font-semibold text-sm">{apt.doctorName}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-medium block">Scheduled Date & Time:</span>
                      <span className="text-neutral-900 font-semibold text-sm">
                        {new Date(apt.date + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at {apt.timeSlot}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-medium block">Patient Name:</span>
                      <span className="text-neutral-900 font-medium">{apt.patientName}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-medium block">Contact Phone:</span>
                      <span className="text-neutral-900 font-medium">{apt.patientPhone}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700">
                    <span className="font-semibold block mb-0.5 text-neutral-900">Chief Reason / Notes:</span>
                    <span>{apt.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-neutral-50 border border-neutral-200 text-center">
              <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 mb-1">No appointments found</h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-6">
                No active appointments were found matching &quot;{queryInput}&quot;. Please verify the email address or book a new appointment.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
              >
                Schedule an Appointment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-white text-[#080808] flex flex-col selection:bg-neutral-200">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-16 md:pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="py-20 text-center text-sm text-neutral-500">Loading portal...</div>}>
            <AppointmentsContent />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}

