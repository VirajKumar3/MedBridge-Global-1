"use client";

import React, { useState } from "react";
import { Check, Calendar, ArrowRight } from "lucide-react";

export default function AppointmentCTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "Internal Medicine",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, submit to booking API
    setSubmitted(true);
  };

  return (
    <section id="appointment" className="w-full py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[28px] md:rounded-[36px] p-8 sm:p-12 md:p-16 border border-neutral-200/90 shadow-sm relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #F8F9FA 0%, #F1F4F5 50%, #E9EDEE 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-neutral-300 text-[10px] font-semibold tracking-wider uppercase text-neutral-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>APPOINTMENT INQUIRY</span>
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-bold tracking-tight text-[#080808] leading-tight">
                Connect with the right specialist today.
              </h2>
              <p className="text-[14px] text-neutral-600 leading-relaxed max-w-lg">
                Schedule a coordinated consultation or clinical intake. Our patient concierge will match you with the appropriate specialty team based on your clinical needs.
              </p>

              <div className="pt-2 space-y-2 text-[13px] text-neutral-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-black" />
                  </div>
                  <span>Secure HIPAA-compliant intake coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-black" />
                  </div>
                  <span>In-person and virtual consultation appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-black" />
                  </div>
                  <span>Transparent care plan and direct record sharing</span>
                </div>
              </div>
            </div>

            {/* Right Booking Inquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-[22px] shadow-sm border border-neutral-200">
                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-[18px] font-semibold text-neutral-900">
                      Inquiry Request Received
                    </h3>
                    <p className="text-[13px] text-neutral-600 max-w-sm mx-auto">
                      Thank you, {formData.name || "Patient"}. Our clinical care coordinator will review your request and contact you at {formData.email || "your email"} to confirm schedule availability.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold uppercase hover:bg-neutral-200 transition-colors"
                    >
                      Book another consultation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="patientName"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1"
                      >
                        Patient Full Name
                      </label>
                      <input
                        type="text"
                        id="patientName"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Dr. Eleanor Vance"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="patientEmail"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="patientEmail"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="specialtySelect"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1"
                      >
                        Requested Specialty
                      </label>
                      <select
                        id="specialtySelect"
                        value={formData.specialty}
                        onChange={(e) =>
                          setFormData({ ...formData, specialty: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
                      >
                        <option>Internal Medicine</option>
                        <option>Family Medicine</option>
                        <option>Cardiology</option>
                        <option>Orthopedics</option>
                        <option>Neurology</option>
                        <option>Dermatology</option>
                        <option>Pediatrics</option>
                        <option>Diagnostic Imaging</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="consultNotes"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1"
                      >
                        Clinical Reason / Symptoms (Optional)
                      </label>
                      <textarea
                        id="consultNotes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Describe briefly your reason for visit or preferred consultation timing..."
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#050505] text-white text-[12px] font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>CONFIRM APPOINTMENT REQUEST</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

