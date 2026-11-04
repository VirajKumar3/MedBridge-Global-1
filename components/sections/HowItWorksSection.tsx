import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-2 block">
              SEAMLESS COORDINATION
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-[#080808]">
              How Connected Care Operates
            </h2>
          </div>
          <p className="text-[13px] sm:text-[14px] text-neutral-600 max-w-md">
            A three-step continuum designed to guide you from initial inquiry to structured long-term health resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.journey.map((step) => (
            <div
              key={step.step}
              className="relative p-8 rounded-[20px] bg-[#F7F7F7] border border-neutral-200/70 flex flex-col justify-between"
            >
              <div>
                <span className="text-[28px] font-light text-neutral-400 block mb-6 font-mono">
                  {step.step}
                </span>
                <h3 className="text-[18px] font-semibold text-[#080808] mb-3">
                  {step.title}
                </h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-neutral-700 text-[12px] font-medium">
                <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                <span>Verified patient milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

