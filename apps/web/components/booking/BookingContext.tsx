"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Image from "next/image";
import AppointmentBookingForm from "./AppointmentBookingForm";
import { X, Calendar } from "lucide-react";

interface BookingOptions {
  specialtyId?: string;
  doctorId?: string;
}

interface BookingContextType {
  openBooking: (options?: BookingOptions) => void;
  closeBooking: () => void;
  isOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<BookingOptions>({});

  const openBooking = (opts?: BookingOptions) => {
    setOptions(opts || {});
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen }}>
      {children}

      {/* Global Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={closeBooking}
          />

          {/* Modal Container: Max-width 840px, rounded-[28px], max-h 90vh with clean internal scroll */}
          <div className="relative w-full max-w-[840px] max-h-[92vh] bg-white rounded-[26px] sm:rounded-[28px] shadow-2xl p-5 sm:p-7 md:p-8 z-10 my-auto overflow-y-auto animate-in zoom-in-95 duration-200 border border-neutral-200/80">
            {/* Top Bar with Brand Logo and Close Button */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/medbridge-logo.png"
                  alt="MedBridge"
                  width={927}
                  height={193}
                  priority
                  className="h-6 sm:h-[26px] w-auto object-contain"
                />
              </div>

              <button
                onClick={closeBooking}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reusable Form */}
            <AppointmentBookingForm
              initialSpecialtyId={options.specialtyId}
              initialDoctorId={options.doctorId}
              onClose={closeBooking}
            />
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
