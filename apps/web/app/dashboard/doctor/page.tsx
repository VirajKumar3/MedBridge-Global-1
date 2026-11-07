"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  ShieldCheck,
  FileText,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Users,
  Eye,
  Award,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface PatientQueueItem {
  id: string;
  patientName: string;
  ageGender: string;
  timeSlot: string;
  type: string;
  chiefComplaint: string;
  status: "Checked In" | "Confirmed" | "Completed";
}

const TODAY_QUEUE: PatientQueueItem[] = [
  {
    id: "PT-8821",
    patientName: "Vikram Sharma",
    ageGender: "46 / M",
    timeSlot: "10:00 AM",
    type: "Follow-Up Consultation",
    chiefComplaint: "Review of cervical spine MRI scans & non-surgical therapy response.",
    status: "Checked In",
  },
  {
    id: "PT-9043",
    patientName: "Meera Kapoor",
    ageGender: "38 / F",
    timeSlot: "11:30 AM",
    type: "Diagnostic Review",
    chiefComplaint: "Metabolic workup discussion and preventative treatment reconciliation.",
    status: "Confirmed",
  },
  {
    id: "PT-9122",
    patientName: "Ananya Roy",
    ageGender: "52 / F",
    timeSlot: "02:00 PM",
    type: "Specialist Follow-Up",
    chiefComplaint: "Neuro-vascular assessment following 2D echocardiogram reports.",
    status: "Confirmed",
  },
  {
    id: "PT-9380",
    patientName: "Naveen Joshi",
    ageGender: "61 / M",
    timeSlot: "03:45 PM",
    type: "Diagnostic Consultation",
    chiefComplaint: "Evaluation of high-resolution digital imaging scans.",
    status: "Confirmed",
  },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const { user, isLoading, openAuthModal } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  // Route & Role protection
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        openAuthModal("login", "doctor");
      } else if (user.role === "patient") {
        router.replace("/dashboard/patient");
      }
    }
  }, [user, isLoading, openAuthModal, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-neutral-500 font-medium">Loading Clinician Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center px-4 py-36">
          <Stethoscope className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Physician Sign-In Required</h2>
          <p className="text-xs text-neutral-600 mb-6">
            Please log in with your verified medical credentials to access your patient schedule.
          </p>
          <button
            type="button"
            onClick={() => openAuthModal("login", "doctor")}
            className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Sign In as Doctor
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  // Cross-role protection warning
  if (user.role === "patient") {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center px-4 py-36">
          <AlertCircle className="w-12 h-12 text-neutral-900 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Patient Account Detected</h2>
          <p className="text-xs text-neutral-600 mb-6">
            You are signed in as a patient. The Clinician Portal is reserved for verified medical professionals.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard/patient")}
            className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Go to Patient Dashboard
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#080808] flex flex-col selection:bg-neutral-200">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-16 md:pb-24 flex-1">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Clinician Header Banner */}
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-neutral-200/90 shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
                  DOCTOR PORTAL
                </span>
                {user.verificationStatus === "VERIFIED" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Board License #{user.licenseNumber || "MED-IN-884920"}
                  </span>
                ) : user.verificationStatus === "REJECTED" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-800 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200/70">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    License Review Rejected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    License Verification Pending #{user.licenseNumber || "SUBMITTED"}
                  </span>
                )}
                <span className="text-xs text-neutral-400 font-medium">
                  {user.hospitalAffiliation || "MedBridge Clinical Partner Network"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                {user.specialization || "Clinical Specialist"} • Professional Email: {user.email}
              </p>
            </div>

            {/* Availability Status Toggle */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 shrink-0">
              <div className="text-left">
                <span className="text-[11px] font-bold text-neutral-800 block">
                  {isAvailable ? "Accepting Consultations" : "Offline / In Surgery"}
                </span>
                <span className="text-[10.5px] text-neutral-500">
                  {isAvailable ? "Online & In-Clinic Slots Active" : "Patient intake paused"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className="text-neutral-900 hover:text-black transition-colors cursor-pointer"
                title="Toggle clinical availability"
              >
                {isAvailable ? (
                  <ToggleRight className="w-8 h-8 text-emerald-600 fill-emerald-100" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-neutral-400" />
                )}
              </button>
            </div>
          </div>

          {/* Verification Status Banner */}
          {user.verificationStatus === "PENDING" && (
            <div className="mb-8 p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5 text-amber-950 shadow-2xs">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Medical Registration Verification In Progress
                </h3>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Your medical registration ID <strong>#{user.licenseNumber}</strong> is currently being verified against the National Medical Council registry. Full clinical write access (such as issuing electronic prescriptions and publishing public consultation slots) will be unlocked once approved.
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-neutral-500 block mb-1">TODAY&rsquo;S CONSULTATIONS</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">4</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">1 Checked-in, 3 Upcoming</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-neutral-500 block mb-1">ACTIVE PATIENTS</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">248</span>
              <p className="text-[11px] text-neutral-500 mt-1">Under coordinated management</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-neutral-500 block mb-1">PENDING REPORTS</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">3</span>
              <p className="text-[11px] text-amber-700 font-medium mt-1">Awaiting clinical sign-off</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-neutral-500 block mb-1">PATIENT RATING</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">4.96 <span className="text-sm font-normal text-neutral-400">/ 5.0</span></span>
              <p className="text-[11px] text-neutral-500 mt-1">From 98 verified reviews</p>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (2 Cols): Today's Patient Schedule */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="p-6 sm:p-7 rounded-[24px] bg-white border border-neutral-200/90 shadow-2xs">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Today&rsquo;s Consultation Schedule</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Synchronized intake notes & patient health records
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                    {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {TODAY_QUEUE.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-black transition-all hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-900">
                            {item.patientName}
                          </span>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            ({item.ageGender})
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.status === "Checked In"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-neutral-200/80 text-neutral-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-600 font-normal">
                          {item.chiefComplaint}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-neutral-700">
                            <Clock className="w-3 h-3 text-neutral-500" />
                            {item.timeSlot}
                          </span>
                          <span>•</span>
                          <span>{item.type}</span>
                          <span>•</span>
                          <span className="font-mono">{item.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Start Visit
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          History
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Sign-off Panel */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white border border-neutral-200/90 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-neutral-900">Awaiting Clinical Sign-Off</h3>
                  <span className="text-xs text-neutral-400">Diagnostic Integration</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">
                        Brain & Spine High-Res MRI Report — Patient #PT-8821
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Dr. Rajesh Patel, MD (Imaging) • Uploaded 2 hours ago
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-neutral-200 hover:border-black text-neutral-900 transition-colors"
                    >
                      Review & Approve
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">
                        Comprehensive Metabolic Bloodwork — Patient #PT-9043
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        MedBridge Central Pathology Labs • Verified today
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-neutral-200 hover:border-black text-neutral-900 transition-colors"
                    >
                      Review & Approve
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (1 Col): Clinical Tools & Practice Info */}
            <div className="space-y-6">
              
              {/* Practice Summary */}
              <div className="p-6 rounded-[24px] bg-white border border-neutral-200/90 shadow-2xs">
                <h3 className="text-sm font-bold text-neutral-900 mb-3">Clinical Profile & Credentials</h3>
                
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-neutral-400 block font-medium">Physician Name:</span>
                    <span className="text-neutral-900 font-semibold">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-medium">Primary Specialty:</span>
                    <span className="text-neutral-900 font-semibold">{user.specialization || "Neurology"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-medium">Registration / License:</span>
                    <span className="text-neutral-900 font-semibold font-mono">{user.licenseNumber || "MED-IN-884920"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-medium">Hospital Affiliation:</span>
                    <span className="text-neutral-900 font-semibold">{user.hospitalAffiliation || "Manipal Hospital Network"}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Credentials Active & Verified for 2026</span>
                  </div>
                </div>
              </div>

              {/* Quick Clinical Actions */}
              <div className="p-6 rounded-[24px] bg-[#0c0c0c] text-white shadow-xs">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 block mb-1">
                  PRACTICE ACTIONS
                </span>
                <h4 className="text-base font-bold text-white mb-2">Clinician Shortcuts</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-4">
                  Quick tools to manage consultation slots, digital prescriptions, and coordinated referrals.
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Update Available Hours</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Send Care Coordinator Referral</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <Link
                    href="/doctors"
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>View Public Doctor Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

